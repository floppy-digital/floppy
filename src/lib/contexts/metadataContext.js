import { useReducer, createContext } from 'react';
import {
  actions,
  initialState,
  metadataReducer,
} from '@/lib/reducers/metadata';

export const metadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(metadataReducer, initialState);

  const value = {
    metadata: state,
    setArtist: (artist) => {
      dispatch({ type: actions.SET_ARTIST, artist });
    },

    setTrack: (track) => {
      dispatch({ type: actions.SET_TRACK, track });
    },

    setAudioURL: (url) => {
      dispatch({ type: actions.SET_AUDIO_URL, url });
    },

    setFrontURL: (url) => {
      dispatch({ type: actions.SET_FRONT_URL, url });
    },

    setBackURL: (url) => {
      dispatch({ type: actions.SET_BACK_URL, url });
    },
  };

  return (
    <metadataContext.Provider value={value}>
      {children}
    </metadataContext.Provider>
  );
};
