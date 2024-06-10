const SET_ADDRESS = "SET_ADDRESS";
const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  address,
});

export const setAuthenticated = (auth) => ({
  type: SET_AUTHENTICATED,
  auth,
});

const initState = {
  address: null,
  authenticated: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address: action.address };
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.auth };
    default:
      return state;
  }
};

export default userReducer;
