const SET_STAMP_FILTER = 'SET_STAMP_FILTER';
const SET_STAMP_COLOR = 'SET_STAMP_COLOR';
const SET_STAMP_SIZE = 'SET_STAMP_SIZE';

export const setFilter = (filter) => ({
  type: SET_STAMP_FILTER,
  filter,
});

export const setColor = (color) => ({
  type: SET_STAMP_COLOR,
  color,
});

export const setSize = (size) => ({
  type: SET_STAMP_SIZE,
  size,
});

const initState = {
  filter:
    'invert(0%) sepia(84%) saturate(7436%) hue-rotate(328deg) brightness(114%) contrast(114%)',
  // filter: null,
  color: '#000000',
  size: 0.375,
};

const stampsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STAMP_FILTER:
      return { ...state, filter: action.filter };
    case SET_STAMP_COLOR:
      return { ...state, color: action.color };
    case SET_STAMP_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};

export default stampsReducer;
