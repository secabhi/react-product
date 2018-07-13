const initialState = {
    testValue : "Test Value One"
  };
  
  export function AddCardReducer(state = initialState, action) {
    console.log("Action recieved", action.payload);
    //console.log(state);
  
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

        case "AURUS_ADDCARD_SUCCESS_RESPONSE" : {
          return {
            ...state,
            response: action.payload

          }
        }


      default:
        return state;
    }
  }