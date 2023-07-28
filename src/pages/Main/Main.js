import React, { useCallback, useEffect, useState } from 'react';
import { Chat } from '../../components';
// import { gptApi } from '../../api/GptApi';
import './Main.css';

export const Main = () => {
  const [isRecordStart, setIsRecordStart] = useState(false);
  const [record, setRecord] = useState({});
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [trascription, setTranscription] = useState('');

  const saveVoice = (e) => {
    const audioChunk = [e.data];
    const voiceBlob = new Blob(audioChunk, {
      type: 'audio/mp3',
    });
    setRecord({
      raw: voiceBlob,
      url: window.URL.createObjectURL(voiceBlob),
    });
  };

  const requestMediaPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.ondataavailable = saveVoice;
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  function startRecordVoice() {
    if (mediaRecorder) {
      setIsRecordStart(true);
      mediaRecorder.start();
    }
  }

  function stopRecordVoice() {
    if (mediaRecorder) {
      setIsRecordStart(false);
      mediaRecorder.stop();
    }
  }

  // const handleUserAudioStop = useCallback( async () => {
  //   try {
  //     const file = new File([record.raw], "audio.mp3");
  //     console.log('file', file);
  //   } catch (error) {
  //     console.error("Ошибка при транскрибации аудио:", error);
  //   }
  // }, [record.raw]);

  function handleMicBtnClick() {
    isRecordStart ? stopRecordVoice() : startRecordVoice();
  }

  useEffect(() => {
    requestMediaPermission();
  }, [requestMediaPermission]);

  // useEffect(() => {
  //   record.raw && handleUserAudioStop();
  // }, [record.raw, handleUserAudioStop ]);

  return (
    <main className='content'>
      <Chat
        isRecordStart={isRecordStart}
        onMicBtnClick={handleMicBtnClick}
        // trascription={trascription}
      />
    </main>
  );
};
