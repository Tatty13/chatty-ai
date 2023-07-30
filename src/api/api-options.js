const {
  REACT_APP_OPENAI_API_KEY = '',
  REACT_APP_SPEECHFLOW_KEY_ID = '',
  REACT_APP_SPEECHFLOW_KEY_SECRET = '',
} = process.env;

const gptApiOptions = {
  baseURL: 'https://api.openai.com/v1',
  errorMessages: {
    getAnswer: 'Unfortunately, it is not possible to get an answer.',
  },
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    Authorization: 'Bearer ' + REACT_APP_OPENAI_API_KEY,
  },
};

console.log('REACT_APP_SPEECHFLOW_KEY_ID', REACT_APP_SPEECHFLOW_KEY_ID);
console.log('REACT_APP_SPEECHFLOW_KEY_SECRET', REACT_APP_SPEECHFLOW_KEY_SECRET);

const speechflowApiOptions = {
  baseURL: 'https://api.speechflow.io/asr/file/v1',
  errorMessages: {
    getTranscription: 'Unfortunately, the audio was not converted to text.',
  },
  headers: {
    keyId: REACT_APP_SPEECHFLOW_KEY_ID,
    keySecret: REACT_APP_SPEECHFLOW_KEY_SECRET,
  },
};

export { gptApiOptions, speechflowApiOptions };
