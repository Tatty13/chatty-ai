import React, { useCallback, useEffect, useState } from 'react';
import { Chat } from '../../components';
import './Main.css';

export const Main = () => {
  const [isRecordStart, setIsRecordStart] = useState(false);
  const [record, setRecord] = useState({});
  const [mediaRecorder, setMediaRecorder] = useState(null);

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

  function handleMicBtnClick() {
    isRecordStart ? stopRecordVoice() : startRecordVoice();
  }

  useEffect(() => {
    requestMediaPermission();
  }, [requestMediaPermission]);

  useEffect(() => {
    record.url && console.log({ record });
  }, [record]);

  return (
    <main className='content'>
      <Chat
        isRecordStart={isRecordStart}
        onMicBtnClick={handleMicBtnClick}
      />
    </main>
  );
};
