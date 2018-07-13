const initialState = {
    startSpinner : false
  };
  
  export function SpinnerReducer(state = initialState, action) {

    switch (action.type) {
      case 'START_SPINNER':
        return {
          ...state,
          startSpinner: action.payload
        };
      default:
        return state;
    }
  }