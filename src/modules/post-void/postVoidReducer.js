const initialState = {
    testValue : "Test Value One",
    loginSuccess: false,
    voidTransactionList: [],
    selectedTransaction: {}
  };
  
export default (state = initialState, action) => {
  switch (action.type) { 
    case 'PV_SUCCESS':
      console.log("PostVoidReducer PV_SUCCESS");
      return {
        ...state,
        transactionData: action.payload
      }

    case 'PV_TRANSACTIONNOTFOUND':
      console.log("PostVoidReducer PV_TRANSACTIONFOUND");
      return {
        ...state,
      }

    case 'LOGIN_REQUEST':
      console.log("PostVoidReducer LOGIN_REQUEST");
      return {
          ...state,
          loginSuccess: true,
      }

    case 'RENDER_POST_VOID_CART':  
      console.log("PostVoidReducer RENDER_POST_VOID_CART");
      return {
        ...state,
        selectedTransaction: action.payload
      }

    case 'TRANSACTION_DETAILS_FETCH_FAILURE':
      console.log("PostVoidReducer TRANSACTION_DETAILS_FETCH_FAILURE");
      return {
        ...state,
        selectedTransaction: {}
      }  

    case 'TRANSACTION_LIST_FETCH_SUCCESS':
      console.log("PostVoidReducer TRANSACTION_LIST_FETCH_SUCCESS");
      return {
        ...state,
        voidTransactionList: action.payload.transactionList
      }

    case 'TRANSACTION_LIST_FETCH_FAILURE':
      console.log("PostVoidReducer TRANSACTION_LIST_FETCH_FAILURE");
      return {
          ...state,
        voidTransactionList: []
      }  

    default:
      return state;
  }
}

 

 
 
   
  
  
  
  