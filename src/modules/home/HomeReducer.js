const initialState = {
  testValue : "Test Value One",
  loginSuccess: false,
  response: "",
  transactionData : null
};

export function HomeReducer(state = initialState, action) {

  switch (action.type) {
    case 'ONE':
      return {
        ...state,
        testValue: "Test Value One Changed",
        loginSuccess: false,
        response: ""
      };
    case 'TWO':
      return {
        ...state,
        loginSuccess: false,
        response: ""
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loginSuccess: true,
        response: action.payload.data,
        userpin: action.payload.userpin
      }
    case 'TRANSACTION_ID_REQUEST':
      return {
        ...state,
        transactionData: action.payload
      }
    default:
      return {
        ...state,
        loginSuccess: false,
        response: ""
      };
  }
}



