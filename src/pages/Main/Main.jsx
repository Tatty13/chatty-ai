import React, { useCallback, useEffect, useRef, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

import './Main.css';
import {
  ChatSendBtn,
  ForwardedMessageList,
  LangSelect,
  MicBtn,
  Preloader,
  TextArea,
} from '../../components';
import { speechflowApi } from '../../api/SpeechflowApi';
import {
  ERROR_COMMON_TEXT,
  ERROR_RECORDING,
  SPEECHFLOW_GET_PROGRESS_CODE,
  SPEECHFLOW_GET_SUCCESS_CODE,
  createMessage,
  getGptBotReply,
} from '../../utils';

export const Main = ({
  onSaveBtnClick,
  savedMessages,
  messages,
  handleMessageAdd,
  textValue,
  setTextValue,
}) => {
  const [isLangListVisible, setIsLangListVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Язык по умолчанию
  const [textRows, setTextRows] = useState(2);
  const [isReadyToGetAnswer, setIsReadyToGetAnswer] = useState(false);

  const [isRecordStart, setIsRecordStart] = useState(false);
  const [record, setRecord] = useState({});
  const [recorder, setRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isRecordLoading, setIsRecordLoading] = useState(false);
  const [isBotAnswerLoading, setIsBotAnswerLoading] = useState(false);

  const messagesContainerRef = useRef(null);

  const toggleLangListVisibility = () => {
    setIsLangListVisible((prevShow) => !prevShow);
  };

  /**
   * @param {string} language
   */
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    toggleLangListVisibility();
  };

  async function startRecordVoice() {
    if (recorder) {
      try {
        setIsRecordStart(true);
        setIsRecordLoading(true);
        await recorder.start();
      } catch (err) {
        setIsRecordStart(false);
        setIsRecordLoading(false);
        handleMessageAdd(createMessage(ERROR_RECORDING, 'error'));
        console.error('Error:', err);
      }
    }
  }

  async function stopRecordVoice() {
    if (recorder) {
      try {
        setIsRecordStart(false);
        const [buffer, blob] = await recorder.stop().getMp3();
        const file = new File(buffer, 'me-at-thevoice.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });

        setRecord({
          raw: blob,
          file: file,
          url: URL.createObjectURL(file),
        });
      } catch (err) {
        setIsRecordLoading(false);
        handleMessageAdd(createMessage(ERROR_RECORDING, 'error'));
        console.error('Error:', err);
      }
    }
  }

  const sendVoiceToSpeechflow = useCallback(
    /**
     * @param {object} record
     * @param {Blob} record.raw
     * @param {File} record.file
     * @param {string} record.url
     */
    async (record) => {
      try {
        const formData = new FormData();
        formData.append('file', record.raw, 'voice.mp3');
        const data = await speechflowApi.sendVoice(formData, selectedLanguage);

        if (!data.taskId) throw new Error('Speechflow sending voice error.');

        let res;
        res = await speechflowApi.getTranscription(data.taskId);
        while (res.code === SPEECHFLOW_GET_PROGRESS_CODE) {
          res = await speechflowApi.getTranscription(data.taskId);
        }

        if (res.code === SPEECHFLOW_GET_SUCCESS_CODE) {
          setTranscription(res.result.trim().replace(/\s+/g, ' '));
        } else {
          throw new Error('Speechflow getting transcription error.');
        }
      } catch (err) {
        handleMessageAdd(createMessage(ERROR_COMMON_TEXT, 'error'));
        console.error('Error sending voice to Speechflow:', err);
      } finally {
        setRecord({});
        setIsRecordLoading(false);
      }
    },
    [selectedLanguage, handleMessageAdd]
  );

  function handleMicBtnClick() {
    isRecordStart ? stopRecordVoice() : startRecordVoice();
  }

  /**
   * @param {String} userMessage
   */
  const handleUserMessageSubmit = async (userMessage) => {
    try {
      const botMessage = await getGptBotReply(userMessage);
      handleMessageAdd(createMessage(botMessage, 'bot'));
    } catch (error) {
      handleMessageAdd(createMessage(ERROR_COMMON_TEXT, 'error'));
      console.error('Error sending message to ChatGPT:', error);
    } finally {
      setIsBotAnswerLoading(false);
    }
  };

  /**
   * @param {Event} evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsReadyToGetAnswer(false);
    handleMessageAdd(createMessage(textValue, 'user'));
    setIsBotAnswerLoading(true);
    handleUserMessageSubmit(textValue);
    setTextValue('');
    setTextRows(1);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const isMicBtnDisabled =
    (isRecordLoading && !isRecordStart) || isBotAnswerLoading;

  useEffect(() => {
    if (transcription) {
      setTextValue(transcription);
      transcription.length > 1 && setIsReadyToGetAnswer(true);
    }
  }, [transcription, setTextValue]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setIsReadyToGetAnswer(textValue.length > 1);
  }, [textValue]);

  useEffect(() => {
    if (record.url) {
      sendVoiceToSpeechflow(record);
    }
  }, [record, sendVoiceToSpeechflow]);

  useEffect(() => {
    const recorder = new MicRecorder({
      bitRate: 128,
    });
    setRecorder(recorder);
  }, []);

  return (
    <section className='chat'>
      <ForwardedMessageList
        messages={messages}
        savedMessages={savedMessages}
        onSaveBtnClick={onSaveBtnClick}
        ref={messagesContainerRef}
      />
      <form
        className='chat__from'
        onSubmit={handleSubmit}>
        <div className='chat__input-wrap'>
          {isRecordLoading && <Preloader place='textarea' />}
          {isBotAnswerLoading && <Preloader place='chat' />}
          <TextArea
            isReadyToGetAnswe={isReadyToGetAnswer}
            setIsReadyToGetAnswer={setIsReadyToGetAnswer}
            textValue={textValue}
            setTextValue={setTextValue}
            textRows={textRows}
            isRecordLoading={isRecordLoading}
          />

          <LangSelect
            onIconClick={toggleLangListVisibility}
            isLangListVisible={isLangListVisible}
            selectedLanguage={selectedLanguage}
            handleLanguageSelect={handleLanguageSelect}
          />
        </div>
        {isReadyToGetAnswer ? (
          <ChatSendBtn isDisabled={isBotAnswerLoading} />
        ) : (
          <MicBtn
            isRecordStart={isRecordStart}
            onClick={handleMicBtnClick}
            isDisabled={isMicBtnDisabled}
          />
        )}
      </form>
    </section>
  );
};
