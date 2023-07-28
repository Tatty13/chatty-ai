const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

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
    keyId: 'wQ0bNBT03X2jWDXH',
    keySecret: 'TJC16xMCCEqT1G4H',
  },
};

export { gptApiOptions, speechflowApiOptions };
