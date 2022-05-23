export const ISVALIDLOGIN = "LOGIN/SETLOGIN";

export const setLogin = login => ({ type: ISVALIDLOGIN, login });

const initalState = {
  isValidLogin: false
};

const isValidLogin = (state = initalState, action) => {
  switch (action.type) {
    case ISVALIDLOGIN:
      return {
        ...state,
        isValidLogin: action.login
      };

    default:
      return state;
  }
};

export default isValidLogin