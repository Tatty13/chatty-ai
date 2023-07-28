import React, { useCallback, useEffect, useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

import { Chat } from '../../components';
import './Main.css';
import { speechflowApi } from '../../api/SpeechflowApi';

export const Main = () => {
  const [isLangListVisible, setIsLangListVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Язык по умолчанию

  const [isRecordStart, setIsRecordStart] = useState(false);
  const [record, setRecord] = useState({});
  const [recorder, setRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');

  const toggleLangListVisibility = () => {
    setIsLangListVisible((prevShow) => !prevShow);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    toggleLangListVisibility();
  };

  async function startRecordVoice() {
    if (recorder) {
      try {
        setIsRecordStart(true);
        await recorder.start();
      } catch (err) {
        console.error(err);
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
        alert('We could not retrieve your message');
        console.log(err);
      }
    }
  }

  const sendVoiceToSpeechflow = useCallback(
    async (record) => {
      try {
        const formData = new FormData();
        formData.append('file', record.raw, 'voice.mp3');

        const data = await speechflowApi.sendVoice(formData, selectedLanguage);

        if (data?.taskId) {
          let res;
          res = await speechflowApi.getTranscription(data.taskId);
          while (res.code === 11001) {
            res = await speechflowApi.getTranscription(data.taskId);
          }
          setRecord({});

          if (res.code === 11000) {
            setTranscription(res.result.trim());
          }
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    [selectedLanguage]
  );

  function handleMicBtnClick() {
    isRecordStart ? stopRecordVoice() : startRecordVoice();
  }

  useEffect(() => {
    const recorder = new MicRecorder({
      bitRate: 128,
    });
    setRecorder(recorder);
  }, []);

  useEffect(() => {
    if (record.url) {
      sendVoiceToSpeechflow(record);
    }
  }, [record, sendVoiceToSpeechflow]);

  return (
    <main className='content'>
      <Chat
        toggleLangListVisibility={toggleLangListVisibility}
        selectedLanguage={selectedLanguage}
        handleLanguageSelect={handleLanguageSelect}
        isLangListVisible={isLangListVisible}
        isRecordStart={isRecordStart}
        onMicBtnClick={handleMicBtnClick}
        transcription={transcription}
      />
    </main>
  );
};
