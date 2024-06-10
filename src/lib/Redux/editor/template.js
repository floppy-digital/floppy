const SET_TEMPLATE_FILTER = 'SET_TEMPLATE_FILTER';
const SET_TEMPLATE_COLOR = 'SET_TEMPLATE_COLOR';

export const setFilter = (filter) => ({
  type: SET_TEMPLATE_FILTER,
  filter,
});

export const setColor = (color) => ({
  type: SET_TEMPLATE_COLOR,
  color,
});

const initState = {
  filter:
    'invert(0%) sepia(84%) saturate(7436%) hue-rotate(328deg) brightness(114%) contrast(114%)',
  // filter: null,
  color: '#000000',
};

const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TEMPLATE_FILTER:
      return { ...state, filter: action.filter };
    case SET_TEMPLATE_COLOR:
      return { ...state, color: action.color };
    default:
      return state;
  }
};

export default templateReducer;
