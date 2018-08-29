const initialState = {
  testValue: "Test Value One",
  loginSuccess: false,
  response: {
    cartItems: {},
    response_code: '',
    response_text: "",
    subTotal: '',
    total: '',
    totalTax: '',
    transactionId: ""
  },
  transactionData: null,
  transFail:false,
};

export function PrintSendReducer(state = initialState, action) {
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
    case 'REPRINT_RECEIPT_SUCCESS':
      return {
        ...state,
        data: action.payload,
        dataFrom: 'REPRINT_RECEIPT_SUCCESS',
      }

      case 'REPRINT_RECEIPT_FAILURE':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'REPRINT_RECEIPT_FAILURE',
      }
      case 'FAILURE':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'FAILURE',
      }
      case 'UPDATE_CLIENT_DETAILS':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'UPDATE_CLIENT_DETAILS',
      }
      case 'CLEAR_PRINT_SEND':{
        console.log('action',action)
        return {
          data: action.payload,
         dataFrom: '',
        }
      }

    default:
      return {
        ...state,
        loginSuccess: false,
        response: ""
      };
  }
}

const initialStatePrintSendDetails = {
  response: {
    cartItems: {},
    response_code: '',
    response_text: "",
    subTotal: '',
    total: '',
    totalTax: '',
    transactionId: ""
  },
  detailsFetchSuccessFlag: false
};

export function PrintSendTransDetailsReducer(state = initialStatePrintSendDetails, action) {

  switch (action.type) {


    case 'RENDER_PRINT_CART':
      return {
        ...state,
        response: action.payload,
        transacID:action.payload.transactionId,

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
const initialStatePrintSendTransList = {
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
  defaultValue : true,
  detailsFetchSuccessFlag: false
};
export function PrintSendGetTransListReducer(state = initialStatePrintSendTransList, action) {
 
  switch (action.type) {

   
    case 'TRANSACTION_LIST_FETCH_SUCCESS':
      return {
        ...state,
        response: action.payload,
        listFetchSuccessFlag : true,
        defaultValue: false //This is to distinguish default response from other responses
      }
      case 'LOGIN_REQUEST':
          // return {
          //     ...state,
          //     response: action.payload
          // }
          return {
            ...state,
            response: action.payload,
            listFetchSuccessFlag : true,
            defaultValue: false //This is to distinguish default response from other responses
          };

    case 'TRANSACTION_LIST_FETCH_FAILURE_PRINT':
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
        transFail:true,
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



