const SET_STICKER_SIZE = 'SET_STICKER_SIZE';

export const setSize = (size) => ({
  type: SET_STICKER_SIZE,
  size,
});

const initState = {
  size: 0.375,
};

const stickersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_STICKER_SIZE:
      return { ...state, size: action.size };
    default:
      return state;
  }
};

export default stickersReducer;
