const initialState = {
    showException : false,
    error:{}
  };
  
  export function ExceptionReducer(state = initialState, action) {
   // debugger;
    switch (action.type) {
      
      case 'SHOW_EXCEPTION':
        return {
          ...state,
          showException: action.payload.showException,
          error: action.payload.error
        };
      default:
        return state;
    }
  }