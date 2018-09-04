const initialState = {
    transactionData : null
  };
  
  
  export function getTransactionDetails(state = initialState, action) {
    switch(action.type) {
      case 'GET_TRANSACTION_DETIALS':
        return action.transactionData

      case 'TL_NOTRANSACTIONFOUND':
        return action.transactionData
        
      default:
        return state;
    }
  }
  
  export function getTransactionId(state = initialState, action) {
    return state.home.transactionData ? state.home.transactionData.transactionNumber: ''
  }