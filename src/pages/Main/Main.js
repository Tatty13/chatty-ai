import React, { useCallback, useEffect, useState } from 'react';
import { Chat } from '../../components';
// import { gptApi } from '../../api/GptApi';
import './Main.css';
import { speechflowApi } from '../../api/SpeechflowApi';

// const MicRecorder = require('mic-recorder-to-mp3');
import MicRecorder from 'mic-recorder-to-mp3';

export const Main = () => {
  const [isRecordStart, setIsRecordStart] = useState(false);
  const [record, setRecord] = useState({});
  // const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recorder, setRecorder] = useState(null);
  // const [trascription, setTranscription] = useState('');

  // const saveVoice = (e) => {
  //   const audioChunk = [e.data];
  //   const voiceBlob = new Blob(audioChunk, {
  //     type: 'audio/mp3',
  //   });
  //   setRecord({
  //     raw: voiceBlob,
  //     url: window.URL.createObjectURL(voiceBlob),
  //   });
  // };

  // const requestMediaPermission = useCallback(async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const mediaRecorder = new MediaRecorder(stream);
  //     setMediaRecorder(mediaRecorder);
  //     mediaRecorder.ondataavailable = saveVoice;
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // }, []);

  function startRecordVoice() {
    // if (mediaRecorder) {
    if (recorder) {
      setIsRecordStart(true);
      // mediaRecorder.start();

      // Start recording. Browser will request permission to use your microphone.
      recorder
        .start()
        .then(() => {
          // something else
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  function stopRecordVoice() {
    // if (mediaRecorder) {
    if (recorder) {
      setIsRecordStart(false);
      // mediaRecorder.stop();

      // Once you are done singing your best song, stop and get the mp3.
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          // do what ever you want with buffer and blob
          // Example: Create a mp3 file and play
          const file = new File(buffer, 'me-at-thevoice.mp3', {
            type: blob.type,
            lastModified: Date.now(),
          });

          setRecord({
            raw: blob,
            file: file,
            url: URL.createObjectURL(file),
          });

          // const player = new Audio(URL.createObjectURL(file));
          // player.play();
        })
        .catch((e) => {
          alert('We could not retrieve your message');
          console.log(e);
        });
    }
  }

  async function sendVoiceToSpeechflow(audioUrl) {
    try {
      // const formData = new FormData();
      // formData.append('file', record.raw, 'voice.mp3');
      // console.log(formData.get('file'));
      // const data = await speechflowApi.sendVoice(formData);

      const data = await speechflowApi.sendVoice(audioUrl);
      console.log('data', data);

      if (data?.taskId) {
        const res = await speechflowApi.getTranscription(data.taskId);
        console.log('res', res);
      }
    } catch (err) {
      console.log('err', err);
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

  // useEffect(() => {
  //   requestMediaPermission();
  // }, [requestMediaPermission]);

  useEffect(() => {
    // New instance
    const recorder = new MicRecorder({
      bitRate: 128,
    });
    setRecorder(recorder);
  }, []);

  // useEffect(() => {
  //   record.raw && handleUserAudioStop();
  // }, [record.raw, handleUserAudioStop ]);

  useEffect(() => {
    if (record.url) {
      console.log('record ', record);
      sendVoiceToSpeechflow(record.file);
    }
  }, [record]);

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
