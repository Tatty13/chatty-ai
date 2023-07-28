// import '../process';
// require('dotenv').config();

const apiKey = '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';

const gptApiOptions = {
  baseURL: 'https://api.openai.com/v1',
  errorMessages: {
    getAnswer: 'Unfortunately, it is not possible to get an answer.',
  },
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    Authorization: 'Bearer ' + apiKey,
  },
};

const speechflowApiOptions = {
  baseURL: 'https://api.speechflow.io/asr/file/v1',
  errorMessages: {
    getTranscription: 'Unfortunately, the audio was not converted to text.',
  },
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'multipart/form-data',
    keyId: 'wQ0bNBT03X2jWDXH',
    keySecret: 'TJC16xMCCEqT1G4H',
  },
};

export { gptApiOptions, speechflowApiOptions };
