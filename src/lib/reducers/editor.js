export const actions = {
  SET_GLOBAL_STAMP: 'SET_GLOBAL_STAMP',
  SET_TEMPLATE: 'SET_TEMPLATE',
  SET_LAYER: 'SET_LAYER',
  SET_OVERLAY: 'SET_OVERLAY',
  SET_OVERLAY_SIZE: 'SET_OVERLAY_SIZE',
  SET_RECORD_NODES: 'SET_RECORD_NODES',
  SET_OVERLAY_FILTER: 'SET_OVERLAY_FILTER',
  SET_BG_NODES: 'SET_BG_NODES',
  SET_CENTERLABEL_NODES: 'SET_CENTERLABEL_NODES',
  SET_FG_NODES: 'SET_FG_NODES',
  SET_FRONT_NODES: 'SET_FRONT_NODES',
  SET_BACK_NODES: 'SET_BACK_NODES',
  SET_CL_STAMP_SIZE: 'SET_CL_STAMP_SIZE',
  SET_CL_STAMP_FILTER: 'SET_CL_STAMP_FILTER',
  SET_CL_STAMP_COLOR: 'SET_CL_STAMP_COLOR',
  SET_CENTERLABEL_FILTER: 'SET_CENTERLABEL_FILTER',
  SET_CENTERLABEL_COLOR: 'SET_CENTERLABEL_COLOR',
  SET_ARTIST_POSITION: 'SET_ARTIST_POSITION',
  SET_ARTIST_FONT: 'SET_ARTIST_FONT',
  SET_ARTIST_FONT_COLOR: 'SET_ARTIST_FONT_COLOR',
  SET_ARTIST_FONT_SIZE: 'SET_ARTIST_FONT_SIZE',
  SET_TRACK_POSITION: 'SET_TRACK_POSITION',
  SET_TRACK_FONT: 'SET_TRACK_FONT',
  SET_TRACK_FONT_COLOR: 'SET_TRACK_FONT_COLOR',
  SET_TRACK_FONT_SIZE: 'SET_TRACK_FONT_SIZE',
  SET_STAMP_FILTER: 'SET_STAMP_FILTER',
  SET_STAMP_COLOR: 'SET_STAMP_COLOR',
  SET_STAMP_SIZE: 'SET_STAMP_SIZE',
  SET_STICKER_SIZE: 'SET_STICKER_SIZE',
  SET_TEMPLATE_FILTER: 'SET_TEMPLATE_FILTER',
  SET_TEMPLATE_COLOR: 'SET_TEMPLATE_COLOR',
};

const initFilter =
  'invert(0%) sepia(84%) saturate(7436%) hue-rotate(328deg) brightness(114%) contrast(114%)';

export const initialState = {
  stamp: null,
  templateImage: null,
  overlay: null,
  layer: 'template',
  overlaySize: 0.5,
  overlayFilter: null,
  bgNode: {},
  bgTextureNode: {},
  recordNode: {},
  clNode: {},
  clTextureNode: {},
  fgNode: {},
  frontNode: {},
  backNode: {},
  cl: {
    stampSize: 0.375,
    stampFilter: initFilter,
    stampColor: '#000000',
    clFilter: null,
    clColor: '#000000',
    artistPosition: [],
    artistFont: { class: 'ff-0', name: 'AddCityboy' },
    artistFontColor: '#000000',
    artistFontSize: 20,
    trackPosition: [],
    trackFont: { class: 'ff-0', name: 'AddCityboy' },
    trackFontColor: '#000000',
    trackFontSize: 20,
  },
  stamps: {
    filter: initFilter,
    color: '#000000',
    size: 0.375,
  },
  stickerSize: 0.375,
  template: {
    filter: initFilter,
    color: '#000000',
  },
};

export const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_GLOBAL_STAMP:
      return { ...state, stamp: action.stamp };
    case actions.SET_TEMPLATE:
      return { ...state, templateImage: action.templateImage };
    case actions.SET_LAYER:
      return { ...state, layer: action.layer };
    case actions.SET_OVERLAY:
      return { ...state, overlay: action.overlay };
    case actions.SET_OVERLAY_SIZE:
      return { ...state, overlaySize: action.size };
    case actions.SET_OVERLAY_FILTER:
      return { ...state, overlayFilter: action.filter };
    case actions.SET_RECORD_NODES:
      return { ...state, recordNode: action.recordNode };
    case actions.SET_BG_NODES:
      return {
        ...state,
        bgNode: action.bgNode,
        bgTextureNode: action.bgTextureNode,
      };
    case actions.SET_CENTERLABEL_NODES:
      return {
        ...state,
        clNode: action.clNode,
        clTextureNode: action.clTextureNode,
      };
    case actions.SET_FG_NODES:
      return { ...state, fgNode: action.fgNode };
    case actions.SET_FRONT_NODES:
      return { ...state, frontNode: action.frontNode };
    case actions.SET_BACK_NODES:
      return { ...state, backNode: action.backNode };
    case actions.SET_CL_STAMP_SIZE:
      return { ...state, cl: { ...state.cl, stampSize: action.size } };
    case actions.SET_CL_STAMP_FILTER:
      return { ...state, cl: { ...state.cl, stampFilter: action.filter } };
    case actions.SET_CL_STAMP_COLOR:
      return { ...state, cl: { ...state.cl, stampColor: action.color } };
    case actions.SET_CENTERLABEL_FILTER:
      return { ...state, cl: { ...state.cl, clFilter: action.filter } };
    case actions.SET_CENTERLABEL_COLOR:
      return { ...state, cl: { ...state.cl, clColor: action.color } };
    case actions.SET_ARTIST_POSITION:
      return { ...state, cl: { ...state.cl, artistPosition: action.position } };
    case actions.SET_ARTIST_FONT:
      return { ...state, cl: { ...state.cl, artistFont: action.font } };
    case actions.SET_ARTIST_FONT_COLOR:
      return { ...state, cl: { ...state.cl, artistFontColor: action.color } };
    case actions.SET_ARTIST_FONT_SIZE:
      return { ...state, cl: { ...state.cl, artistFontSize: action.size } };
    case actions.SET_TRACK_POSITION:
      return { ...state, cl: { ...state.cl, trackPosition: action.position } };
    case actions.SET_TRACK_FONT:
      return { ...state, cl: { ...state.cl, trackFont: action.font } };
    case actions.SET_TRACK_FONT_COLOR:
      return { ...state, cl: { ...state.cl, trackFontColor: action.color } };
    case actions.SET_TRACK_FONT_SIZE:
      return { ...state, cl: { ...state.cl, trackFontSize: action.size } };
    case actions.SET_STAMP_FILTER:
      return { ...state, stamps: { ...state.stamps, filter: action.filter } };
    case actions.SET_STAMP_COLOR:
      return { ...state, stamps: { ...state.stamps, color: action.color } };
    case actions.SET_STAMP_SIZE:
      return { ...state, stamps: { ...state.stamps, size: action.size } };
    case actions.SET_STICKER_SIZE:
      return { ...state, stickerSize: action.size };
    case actions.SET_TEMPLATE_FILTER:
      return {
        ...state,
        template: { ...state.template, filter: action.filter },
      };
    case actions.SET_TEMPLATE_COLOR:
      return { ...state, template: { ...state.template, color: action.color } };
    default:
      return state;
  }
};
