const SET_ARTIST = 'SET_ARTIST';
const SET_TRACK = 'SET_TRACK';
const SET_AUDIO_URL = 'SET_AUDIO_URL';
const SET_FRONT_URL = 'SET_FRONT_URL';
const SET_BACK_URL = 'SET_BACK_URL';

export const setArtist = (artist) => ({
  type: SET_ARTIST,
  artist,
});

export const setTrack = (track) => ({
  type: SET_TRACK,
  track,
});

export const setAudioURL = (url) => ({
  type: SET_AUDIO_URL,
  url,
});

export const setFrontURL = (url) => ({
  type: SET_FRONT_URL,
  url,
});

export const setBackURL = (url) => ({
  type: SET_BACK_URL,
  url,
});

const initState = {
  artist: '',
  track: '',
  audioURL: '',
  frontURL: '',
  backURL: '',
};

const metadataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ARTIST:
      return { ...state, artist: action.artist };
    case SET_TRACK:
      return { ...state, track: action.track };
    case SET_AUDIO_URL:
      return { ...state, audioURL: action.url };
    case SET_FRONT_URL:
      return { ...state, frontURL: action.url };
    case SET_BACK_URL:
      return { ...state, backURL: action.url };
    default:
      return state;
  }
};

export default metadataReducer;
