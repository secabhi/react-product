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
  error_message: '',
  isValid : false
};

export function PrintSendReducer(state = initialState, action) {
  switch (action.type) {


    case 'PV_SUCCESS':
      return {
        ...state,
        transactionData: action.payload,
        error_message: '',
        isValid : true
      }
    case 'PV_TRANSACTIONNOTFOUND':
      return {
        ...state,
        error_message: '',
        isValid : true
      }
    case 'REPRINT_RECEIPT_SUCCESS':
      return {
        ...state,
        data: action.payload,
        dataFrom: 'REPRINT_RECEIPT_SUCCESS',
        error_message: '',
        isValid : true
      }

      case 'SEND_EMAIL_VALIDFAILED':
                return{
                    ...state,
                    data : {},
                    dataFrom : '',
                    error_message: action.message,
                    isValid : false
        }

        case 'RE_PRINT_VALIDFAILED':
          console.log('print send reducer'+JSON.stringify(action))
                return{
                    ...state,
                    data : {},
                    dataFrom : '',
                    error_message: action.message,
                    isValid : false
        }


      case 'REPRINT_RECEIPT_FAILURE':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'REPRINT_RECEIPT_FAILURE',
       error_message: '',
        isValid : true
      }
      case 'FAILURE':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'FAILURE',
       error_message: '',
        isValid : true
      }
      case 'UPDATE_CLIENT_DETAILS':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
       dataFrom: 'UPDATE_CLIENT_DETAILS',
       error_message: '',
        isValid : true
      }
      case 'CLEAR_PRINT_SEND':{
        console.log('action',action)
        return {
          data: action.payload,
         dataFrom: '',
         error_message: '',
        isValid : true
        }
      
      }

    default:
      return {
        ...state,
        loginSuccess: false,
        response: "",
        error_message: '',
        isValid : true
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
  detailsFetchSuccessFlag: false,
  error_message: '',
  isValid : false
};

export function PrintSendTransDetailsReducer(state = initialStatePrintSendDetails, action) {

  switch (action.type) {


    case 'RENDER_PRINT_CART':
      return {
        ...state,
        response: action.payload,
        transacID:action.payload.transactionId,
        dataFrom : 'TRANS_DETAILS_SUCCESS',
        detailsFetchSuccessFlag : true,
        error_message: '',
        isValid : true,
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
        dataFrom : 'TRANS_DETAILS_FAIL',
        detailsFetchSuccessFlag : false,
        error_message: '',
        isValid : true,
      }

      case 'TRANS_DETAILS_VALIDFAILED':
                return{
                  ...state,
                  response: '',
                  listFetchSuccessFlafg : false,
                  dataFrom : '',
                  error_message: action.message,
                  isValid : false

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
        dataFrom:'',
        detailsFetchSuccessFlag : false,
        error_message: '',
        isValid : true,
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
  error_message: '',
  transFail:false,
  isValid : false
};
export function PrintSendGetTransListReducer(state = initialStatePrintSendTransList, action) {
 
  switch (action.type) {

   
    case 'TRANSACTION_LIST_FETCH_SUCCESS':
      return {
        ...state,
        response: action.payload,
        listFetchSuccessFlag : true,
        transFail:false,
        error_message: '',
        isValid : true,
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
            error_message: '',
            isValid : true,
            transFail:false,
            defaultValue: false //This is to distinguish default response from other responses
          };
          
          case 'TRANS_LIST_VALIDFAILED':
                return{
                  ...state,
                  response: '',
                  listFetchSuccessFlafg : false,
                  dataFrom : '',
                  transFail:false,
                  error_message: action.message,
                  isValid : false,

                }

    case 'TRANSACTION_LIST_FETCH_FAILURE_PRINT':
      return {
        ...state,
        response :action.payload,
        listFetchSuccessFlag : false,
        transFail:true,
        defaultValue: false,
        error_message: '',
        isValid : true,
      }

      case 'CLEAR_TRANSLIST_IS_VALID':
      return{
        ...state,
        data: action.payload,
         dataFrom: '',
         transFail:true,
         error_message: '',
         transFail:false,
        isValid : true,
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
        defaultValue: true,
        transFail:false
      };
  }
}



