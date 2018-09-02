const initialState = {
    testValue : "Test Value One",
    loginSuccess: false,
    voidTransactionList: [],
    selectedTransaction: {},
    error: ''
  };
  
export default (state = initialState, action) => {
  switch (action.type) { 
    case 'PV_SUCCESS':
      console.log("PostVoidReducer PV_SUCCESS");
      return {
        ...state,
        transactionData: action.payload,
        error: ''
      }

    case 'PV_TRANSACTIONNOTFOUND':
      console.log("PostVoidReducer PV_TRANSACTIONFOUND");
      return {
        ...state,
        error: ''
      }

    case 'LOGIN_REQUEST':
      console.log("PostVoidReducer LOGIN_REQUEST");
      return {
          ...state,
          loginSuccess: true,
          error: ''
      }

    case 'RENDER_POST_VOID_CART':  
      console.log("PostVoidReducer RENDER_POST_VOID_CART");
      return {
        ...state,
        selectedTransaction: action.payload,
        error: ''
      }

    case 'TRANSACTION_DETAILS_FETCH_FAILURE':
      console.log("PostVoidReducer TRANSACTION_DETAILS_FETCH_FAILURE");
      return {
        ...state,
        error: 'TRANSACTION_DETAILS_FETCH_FAILURE'
      }  

    case 'TRANSACTION_LIST_FETCH_SUCCESS':
      console.log("PostVoidReducer TRANSACTION_LIST_FETCH_SUCCESS");
      return {
        ...state,
        voidTransactionList: action.payload.transactionList,
        error: ''
      }
    case 'TRANSACTION_LIST_FETCH_FAILURE':
      console.log("PostVoidReducer TRANSACTION_LIST_FETCH_FAILURE");
      return {
        ...state,
        error: 'TRANSACTION_LIST_FETCH_FAILURE'
      }  

    default:
      return state;
  }
}

 

 
 
   
  
  
  
  