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
    setTemplate: (templateImage) => {
      dispatch({ type: actions.SET_TEMPLATE, templateImage });
    },
    setLayer: (layer) => {
      dispatch({ type: actions.SET_LAYER, layer });
    },
    setOverlay: (overlay) => {
      dispatch({ type: actions.SET_OVERLAY, overlay });
    },
    setOverlaySize: (size) => {
      dispatch({ type: actions.SET_OVERLAY_SIZE, size });
    },
    setOverlayFilter: (filter) => {
      dispatch({ type: actions.SET_OVERLAY_FILTER, filter });
    },
    setRecordNodes: (recordNode) => {
      dispatch({ type: actions.SET_RECORD_NODES, recordNode });
    },
    setBgNodes: (bgNode, bgTextureNode) => {
      dispatch({ type: actions.SET_BG_NODES, bgNode, bgTextureNode });
    },
    setClNodes: (clNode, clTextureNode) => {
      dispatch({ type: actions.SET_CENTERLABEL_NODES, clNode, clTextureNode });
    },
    setFgNodes: (fgNode) => {
      dispatch({ type: actions.SET_FG_NODES, fgNode });
    },
    setFrontNodes: (front) => {
      dispatch({ type: actions.SET_FRONT_NODES, front });
    },
    setBackNodes: (back) => {
      dispatch({ type: actions.SET_BACK_NODES, back });
    },
    setCLStampSize: (size) => {
      dispatch({ type: actions.SET_CL_STAMP_SIZE, size });
    },
    setCLStampFilter: (filter) => {
      dispatch({ type: actions.SET_CL_STAMP_FILTER, filter });
    },
    setCLStampColor: (color) => {
      dispatch({ type: actions.SET_CL_STAMP_COLOR, color });
    },
    setCenterLabelFilter: (filter) => {
      dispatch({ type: actions.SET_CENTERLABEL_FILTER, filter });
    },
    setCenterLabelColor: (color) => {
      dispatch({ type: actions.SET_CENTERLABEL_COLOR, color });
    },
    setArtistPosition: (position) => {
      dispatch({ type: actions.SET_ARTIST_POSITION, position });
    },
    setArtistFont: (font) => {
      dispatch({ type: actions.SET_ARTIST_FONT, font });
    },
    setArtistFontColor: (color) => {
      dispatch({ type: actions.SET_ARTIST_FONT_COLOR, color });
    },
    setArtistFontSize: (size) => {
      dispatch({ type: actions.SET_ARTIST_FONT_SIZE, size });
    },
    setTrackPosition: (position) => {
      dispatch({ type: actions.SET_TRACK_POSITION, position });
    },
    setTrackFont: (font) => {
      dispatch({ type: actions.SET_TRACK_FONT, font });
    },
    setTrackFontColor: (color) => {
      dispatch({ type: actions.SET_TRACK_FONT_COLOR, color });
    },
    setTrackFontSize: (size) => {
      dispatch({ type: actions.SET_TRACK_FONT_SIZE, size });
    },
    setStampFilter: (filter) => {
      dispatch({ type: actions.SET_STAMP_FILTER, filter });
    },
    setStampColor: (color) => {
      dispatch({ type: actions.SET_STAMP_COLOR, color });
    },
    setStampSize: (size) => {
      dispatch({ type: actions.SET_STAMP_SIZE, size });
    },
    setStickerSize: (size) => {
      dispatch({ type: actions.SET_STICKER_SIZE, size });
    },
    setTemplateFilter: (filter) => {
      dispatch({ type: actions.SET_TEMPLATE_FILTER, filter });
    },
    setTemplateColor: (color) => {
      dispatch({ type: actions.SET_TEMPLATE_COLOR, color });
    },
  };

  return (
    <editorContext.Provider value={value}>{children}</editorContext.Provider>
  );
};
