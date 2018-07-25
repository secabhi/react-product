const initialState = {
    testValue : "Test Value One",
    loginSuccess: false,
    response: {
      cartItems: {},
      response_code:'',
      response_text:"",
      subTotal:'',
      total:'',
      totalTax:'',
      transactionId:""
    },
    transactionData : null
  };
  
  export function PostVoidReducer(state = initialState, action) {
    switch (action.type) {
 
     
      case 'PV_SUCCESS':
        return {
          ...state,
          transactionData: action.payload
        }
        case 'PV_TRANSACTIONNOTFOUND':
        return {
          ...state,
                }
      default:
        return {
          ...state,
          loginSuccess: false,
          response: ""
        };
    }
  }

  const initialStatePostVoidDetails = {
    response: {
      cartItems: {},
      response_code:'',
      response_text:"",
      subTotal:'',
      total:'',
      totalTax:'',
      transactionId:""
    },
    detailsFetchSuccessFlag : false
  };
  
  export function PostVoidTransDetailsReducer(state = initialStatePostVoidDetails, action) {

    switch (action.type) {
 
 
      case 'TRANSACTION_DETAILS_FETCH_SUCCESS':
        return {
          ...state,
          response: action.payload,
          transacID:action.transacID,

          detailsFetchSuccessFlag : true
        }

      case 'TRANSACTION_DETAILS_FETCH_FAILURE':
        return {
          ...state,
          response: {
            cartItems: {},
            response_code:'',
            response_text:"",
            subTotal:'',
            total:'',
            totalTax:'',
            transactionId:""
          },
          detailsFetchSuccessFlag : false
        }
      default:
        return {
          ...state,
          response: {
            cartItems: {},
            response_code:'',
            response_text:"",
            subTotal:'',
            total:'',
            totalTax:'',
            transactionId:""
          },
          detailsFetchSuccessFlag : false
        };
    }
  }
  const initialStatePostVoidTransList = {
    response: {
      transactionList: [
        {
        store: "",
        terminal: "",
        transactionID: "",
        date: "",
        time: "",
        unKnownFiled: "",
        amount: "",
        flag1: true,
        flag2: false,
        flag3: false,
        transactionFile: ""
        },
      ]
    },
    listFetchSuccessFlag : false,
    defaultValue : true
  };
  export function PostVoidGetTransListReducer(state = initialStatePostVoidTransList, action) {
   
    switch (action.type) {
 
     
      case 'TRANSACTION_LIST_FETCH_SUCCESS':
        return {
          ...state,
          response: action.payload,
          listFetchSuccessFlag : true,
          defaultValue: false //This is to distinguish default response from other responses
        }
      case 'TRANSACTION_LIST_FETCH_FAILURE':
        return {
          ...state,
          response : {
            transactionList: [
              {
              store: "",
              terminal: "",
              transactionID: "",
              date: "",
              time: "",
              unKnownFiled: "",
              amount: "",
              flag1: true,
              flag2: false,
              flag3: false,
              transactionFile: ""
              },
            ]
          },
          listFetchSuccessFlag : false,
          defaultValue: false
        }
      default:
        return {
          ...state,
          response: {
            transactionList: [
              {
              store: "",
              terminal: "",
              transactionID: "",
              date: "",
              time: "",
              unKnownFiled: "",
              amount: "",
              flag1: true,
              flag2: false,
              flag3: false,
              transactionFile: ""
              },
            ]
          },
          listFetchSuccessFlag : false,
          defaultValue: true
        };
    }
  }
  
  
  