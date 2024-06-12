import { useReducer, createContext } from 'react';
import { actions, initialState, editorReducer } from '@/lib/reducers/editor';

export const editorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const value = {
    editor: state,
    setStamp: (stamp) => {
      dispatch({ type: actions.SET_GLOBAL_STAMP, stamp });
    },
    setTemplate: (template) => {
      dispatch({ type: actions.SET_TEMPLATE, template });
    },
    setLayer: (layer) => {
      dispatch({ type: actions.SET_LAYER, layer });
    },
    setOverlay: (overlay) => {
      dispatch({ type: actions.SET_OVERLAY, overlay });
    },
    setSize: (size) => {
      dispatch({ type: actions.SET_OVERLAY_SIZE, size });
    },
    setFilter: (filter) => {
      dispatch({ type: actions.SET_OVERLAY_FILTER, filter });
    },
    setRecord: (record) => {
      dispatch({ type: actions.SET_RECORD, record });
    },
    setBg: (bg, bgTexture) => {
      dispatch({ type: actions.SET_BG_NODES, bg, bgTexture });
    },
    setCl: (cl, clTexture) => {
      dispatch({ type: actions.SET_CENTERLABEL_NODES, cl, clTexture });
    },
    setFg: (fg) => {
      dispatch({ type: actions.SET_FG_NODES, fg });
    },
    setFront: (front) => {
      dispatch({ type: actions.SET_FRONT_NODES, front });
    },
    setBack: (back) => {
      dispatch({ type: actions.SET_BACK_NODES, back });
    },
    setStampSize: (size) => {
      dispatch({ type: SET_CL_STAMP_SIZE, size });
    },
    setStampFilter: (filter) => {
      dispatch({ type: SET_CL_STAMP_FILTER, filter });
    },
    setStampColor: (color) => {
      dispatch({ type: SET_CL_STAMP_COLOR, color });
    },
    setCenterLabelFilter: (filter) => {
      dispatch({ type: SET_CENTERLABEL_FILTER, filter });
    },
    setCenterLabelColor: (color) => {
      dispatch({ type: SET_CENTERLABEL_COLOR, color });
    },
    setArtistPosition: (position) => {
      dispatch({ type: SET_ARTIST_POSITION, position });
    },
    setArtistFont: (font) => {
      dispatch({ type: SET_ARTIST_FONT, font });
    },
    setArtistFontColor: (color) => {
      dispatch({ type: SET_ARTIST_FONT_COLOR, color });
    },
    setArtistFontSize: (size) => {
      dispatch({ type: SET_ARTIST_FONT_SIZE, size });
    },
    setTrackPosition: (position) => {
      dispatch({ type: SET_TRACK_POSITION, position });
    },
    setTrackFont: (font) => {
      dispatch({ type: SET_TRACK_FONT, font });
    },
    setTrackFontColor: (color) => {
      dispatch({ type: SET_TRACK_FONT_COLOR, color });
    },
    setTrackFontSize: (size) => {
      dispatch({ type: SET_TRACK_FONT_SIZE, size });
    },
    setFilter: (filter) => {
      dispatch({ type: SET_STAMP_FILTER, filter });
    },
    setColor: (color) => {
      dispatch({ type: SET_STAMP_COLOR, color });
    },
    setSize: (size) => {
      dispatch({ type: SET_STAMP_SIZE, size });
    },
    setSize: (size) => {
      dispatch({ type: SET_STICKER_SIZE, size });
    },
    setFilter: (filter) => {
      dispatch({ type: SET_TEMPLATE_FILTER, filter });
    },
    setColor: (color) => {
      dispatch({ type: SET_TEMPLATE_COLOR, color });
    },
  };

  return (
    <editorContext.Provider value={value}>{children}</editorContext.Provider>
  );
};
