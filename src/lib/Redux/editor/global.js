const SET_GLOBAL_STAMP = 'SET_GLOBAL_STAMP';
const SET_TEMPLATE = 'SET_TEMPLATE';
const SET_LAYER = 'SET_LAYER';
const SET_OVERLAY = 'SET_OVERLAY';
const SET_OVERLAY_SIZE = 'SET_OVERLAY_SIZE';
const SET_RECORD = 'SET_RECORD';
const SET_OVERLAY_FILTER = 'SET_OVERLAY_FILTER';
const SET_BG = 'SET_BG';
const SET_CENTERLABEL = 'SET_CENTERLABEL';
const SET_FG = 'SET_FG';
const SET_FRONT = 'SET_FRONT';
const SET_BACK = 'SET_BACK';

export const setStamp = (stamp) => ({
  type: SET_GLOBAL_STAMP,
  stamp,
});

export const setTemplate = (template) => ({
  type: SET_TEMPLATE,
  template,
});

export const setLayer = (layer) => ({
  type: SET_LAYER,
  layer,
});

export const setOverlay = (overlay) => ({
  type: SET_OVERLAY,
  overlay,
});

export const setSize = (size) => ({
  type: SET_OVERLAY_SIZE,
  size,
});

export const setFilter = (filter) => ({
  type: SET_OVERLAY_FILTER,
  filter,
});

export const setRecord = (record) => ({
  type: SET_RECORD,
  record,
});

export const setBg = (bg, bgTexture) => ({
  type: SET_BG,
  bg,
  bgTexture,
});

export const setCl = (cl, clTexture) => ({
  type: SET_CENTERLABEL,
  cl,
  clTexture,
});

export const setFg = (fg) => ({
  type: SET_FG,
  fg,
});

export const setFront = (front) => ({
  type: SET_FRONT,
  front,
});

export const setBack = (back) => ({
  type: SET_BACK,
  back,
});

const initState = {
  stamp: null,
  template: null,
  overlay: null,
  layer: 'template',
  size: 0.5,
  filter: null,
  bg: {},
  bgTexture: {},
  record: {},
  cl: {},
  clTexture: {},
  fg: {},
  front: {},
  back: {},
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GLOBAL_STAMP:
      return { ...state, stamp: action.stamp };
    case SET_TEMPLATE:
      return { ...state, template: action.template };
    case SET_LAYER:
      return { ...state, layer: action.layer };
    case SET_OVERLAY:
      return { ...state, overlay: action.overlay };
    case SET_OVERLAY_SIZE:
      return { ...state, size: action.size };
    case SET_RECORD:
      return { ...state, record: action.record };
    case SET_OVERLAY_FILTER:
      return { ...state, filter: action.filter };
    case SET_BG:
      return { ...state, bg: action.bg, bgTexture: action.bgTexture };
    case SET_CENTERLABEL:
      return { ...state, cl: action.cl, clTexture: action.clTexture };
    case SET_FG:
      return { ...state, fg: action.fg };
    case SET_FRONT:
      return { ...state, front: action.front };
    case SET_BACK:
      return { ...state, back: action.back };
    default:
      return state;
  }
};

export default editorReducer;
