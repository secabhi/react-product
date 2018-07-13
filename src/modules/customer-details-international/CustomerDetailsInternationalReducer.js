const initialState = {
    testValue : "Test Value One"
  };
  
  export function CustomerDetailsInternationalReducer(state = initialState, action) {

    switch (action.type) {
      case 'ONE':
        return {
          ...state,
          testValue: "Test Value One Changed"
        };
      case 'TWO':
        return {
          ...state,
          response: action.payload
        };
      default:
        return state;
    }
  }