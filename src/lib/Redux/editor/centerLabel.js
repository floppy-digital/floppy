const SET_CL_STAMP_SIZE = 'SET_CL_STAMP_SIZE';
const SET_CL_STAMP_FILTER = 'SET_CL_STAMP_FILTER';
const SET_CL_STAMP_COLOR = 'SET_CL_STAMP_COLOR';
const SET_CENTERLABEL_FILTER = 'SET_CENTERLABEL_FILTER';
const SET_CENTERLABEL_COLOR = 'SET_CENTERLABEL_COLOR';
const SET_ARTIST_POSITION = 'SET_ARTIST_POSITION';
const SET_ARTIST_FONT = 'SET_ARTIST_FONT';
const SET_ARTIST_FONT_COLOR = 'SET_ARTIST_FONT_COLOR';
const SET_ARTIST_FONT_SIZE = 'SET_ARTIST_FONT_SIZE';
const SET_TRACK_POSITION = 'SET_TRACK_POSITION';
const SET_TRACK_FONT = 'SET_TRACK_FONT';
const SET_TRACK_FONT_COLOR = 'SET_TRACK_FONT_COLOR';
const SET_TRACK_FONT_SIZE = 'SET_TRACK_FONT_SIZE';

export const setStampSize = (size) => ({
  type: SET_CL_STAMP_SIZE,
  size,
});

export const setStampFilter = (filter) => ({
  type: SET_CL_STAMP_FILTER,
  filter,
});

export const setStampColor = (color) => ({
  type: SET_CL_STAMP_COLOR,
  color,
});

export const setCenterLabelFilter = (filter) => ({
  type: SET_CENTERLABEL_FILTER,
  filter,
});

export const setCenterLabelColor = (color) => ({
  type: SET_CENTERLABEL_COLOR,
  color,
});

export const setArtistPosition = (position) => ({
  type: SET_ARTIST_POSITION,
  position,
});

export const setArtistFont = (font) => ({
  type: SET_ARTIST_FONT,
  font,
});

export const setArtistFontColor = (color) => ({
  type: SET_ARTIST_FONT_COLOR,
  color,
});

export const setArtistFontSize = (size) => ({
  type: SET_ARTIST_FONT_SIZE,
  size,
});

export const setTrackPosition = (position) => ({
  type: SET_TRACK_POSITION,
  position,
});

export const setTrackFont = (font) => ({
  type: SET_TRACK_FONT,
  font,
});

export const setTrackFontColor = (color) => ({
  type: SET_TRACK_FONT_COLOR,
  color,
});

export const setTrackFontSize = (size) => ({
  type: SET_TRACK_FONT_SIZE,
  size,
});

const initState = {
  stampSize: 0.375,
  stampFilter:
    'invert(0%) sepia(84%) saturate(7436%) hue-rotate(328deg) brightness(114%) contrast(114%)',
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
};

const centerLabelReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CL_STAMP_SIZE:
      return { ...state, stampSize: action.size };
    case SET_CL_STAMP_FILTER:
      return { ...state, stampFilter: action.filter };
    case SET_CL_STAMP_COLOR:
      return { ...state, stampColor: action.color };
    case SET_CENTERLABEL_FILTER:
      return { ...state, clFilter: action.filter };
    case SET_CENTERLABEL_COLOR:
      return { ...state, clColor: action.color };
    case SET_ARTIST_POSITION:
      return { ...state, artistPosition: action.position };
    case SET_ARTIST_FONT:
      return { ...state, artistFont: action.font };
    case SET_ARTIST_FONT_COLOR:
      return { ...state, artistFontColor: action.color };
    case SET_ARTIST_FONT_SIZE:
      return { ...state, artistFontSize: action.size };
    case SET_TRACK_POSITION:
      return { ...state, trackPosition: action.position };
    case SET_TRACK_FONT:
      return { ...state, trackFont: action.font };
    case SET_TRACK_FONT_COLOR:
      return { ...state, trackFontColor: action.color };
    case SET_TRACK_FONT_SIZE:
      return { ...state, trackFontSize: action.size };
    default:
      return state;
  }
};

export default centerLabelReducer;
