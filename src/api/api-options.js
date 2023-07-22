const gptApiOptions = {
  baseURL: '',
  errorMessages: {
    getAnswer: 'Unfortunately, it is not possible to get an answer.',
  },
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
};

const speechflowApiOptions = {
  baseURL: '',
  errorMessages: {
    getTranscription: 'Unfortunately, the audio was not converted to text.',
  },
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
};

export { gptApiOptions, speechflowApiOptions };
