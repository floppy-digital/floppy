export const actions = {
  SET_ARTIST: 'SET_ARTIST',
  SET_TRACK: 'SET_TRACK',
  SET_AUDIO_URL: 'SET_AUDIO_URL',
  SET_FRONT_URL: 'SET_FRONT_URL',
  SET_BACK_URL: 'SET_BACK_URL',
};

export const initialState = {
  artist: '',
  track: '',
  audioURL: '',
  frontURL: '',
  backURL: '',
};

export const metadataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ARTIST:
      return { ...state, artist: action.artist };
    case actions.SET_TRACK:
      return { ...state, track: action.track };
    case actions.SET_AUDIO_URL:
      return { ...state, audioURL: action.url };
    case actions.SET_FRONT_URL:
      return { ...state, frontURL: action.url };
    case actions.SET_BACK_URL:
      return { ...state, backURL: action.url };
    default:
      return state;
  }
};
