const initialState = {
  buttonId: '',
  loginSuccess: false,
  response: "",
  transactionData: null,
  registerInfoData: null,
  salutationData: null,
  dataFrom: '',
  batteryStatus: '',
  getResumeDatas: '',
  getResumeDatasFrom: '',
  navigateToPostVoidDetails: false,
  pedbatteryresp: '',
  bypassRes: null,
  error_message: '',
  isValid: true,
  bypassResp : ''
};

export function HomeReducer(state = initialState, action) {
console.log("Home Reducer:",action.payload);
  switch (action.type) {

    case 'LOGIN_REQUEST':
      return {
        ...state,
        loginSuccess: true,
        response: action.payload.data,
        userpin: action.payload.userpin,
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',
        bypassResp : '',
        error_message: '',
        isValid: true

      }

    case 'LOGIN_REQUEST_CLEAR':
      return {
        ...state,
        loginSuccess: false,
        response: null,
        userpin: '',
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',
        bypassResp : '',
      }

    case 'TRANSACTION_ID_REQUEST':
      return {
        ...state,
        transactionData: action.payload,
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',
        bypassResp : '',
        dataFrom: 'TRANSACTION_ID_REQUEST',
        error_message: '',
        isValid: true,
      }
    case 'GET_SALUTATION':
      return {
        ...state,
        salutationData: action.payload,
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',
        error_message: '',
        isValid: true,
        bypassResp : '',

      }

    case 'TRANSACTION_ID_ERROR':
      return {
        ...state,
        dataFrom: 'error',
        error_message: '',
        isValid: true,
        pedbatteryresp:'',
        bypassResp : '',
      }

    case 'PRESALE_FLAG':
      return {
        ...state,
        registerInfoData: action.payload,
        dataFrom: 'PRESALE_FLAG',
        error_message: '',
        isValid: true,
        pedbatteryresp :'',
        bypassResp : ''
      }
    case 'PRESALE_FLAG_ERROR':
      return {
        ...state,
        dataFrom: 'error',
        error_message: '',
        isValid: true,
        pedbatteryresp:'',
        bypassResp : '',
      }
    case 'RESUME_ENTRY_REQUEST_SUCCESS': {
      console.log("***HOME RESUME REQUEST SUCEEss", action)
      return {
        ...state,
        getResumeDatas: action.payload,
        getResumeDatasFrom: "RESUME_TRANSACTIONS_SUCCESS",
        error_message: '',
        isValid: true,
        pedbatteryresp : '',
        bypassResp : '',

      }
    };
    case 'BATTERY_LEVEL': {
      return {
        ...state,
        batteryStatus: action.payload,
        pedbatteryresp: '',
        error_message: '',
        isValid: true,
        bypassResp : ''

      }
    }
    case 'CLEAR_PED': {
      return {
        ...state,
        bypassRes: action.payload,
        pedbatteryresp: '',
        error_message: '',
        isValid: true,
        bypassResp : ''
      }
    }
    case 'RESUME_ENTRY_REQUEST_FAILURE': {
      return {
        ...state,
        getResumeDatas: action.payload,
        getResumeDatasFrom: "RESUME_ENTRY_REQUEST_FAILURE_ERROR",
        pedbatteryresp: '',
        bypassResp : '',
        error_message: action.payload,
        isValid: true

      }
    };
    case 'SUSPENDED_TRANSACTION_LIST_FETCH_FAILURE': {
      return {
        ...state,
        response: action.payload,
        dataFrom: "SUSPENDED_TRANSACTION_LIST_FAILURE",
        pedbatteryresp: '',
        bypassResp : '',
        error_message: action.payload,
        isValid: true
      }
    };
    case 'SET_BUTTON_CLICK_ID':
      return {
        ...state,
        buttonId: action.payload,
        dataFrom: '',
        pedbatteryresp: '',
        bypassResp : '',
        error_message: '',
        isValid: true
      };

    case 'TRANSACTION_DETAILS_FETCH_SUCCESS':
      return {
        ...state,
        navigateToPostVoidDetails: true,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        bypassResp : '',
        pedbatteryresp: '',
        error_message: '',
        isValid: true


      }
    case 'TRANSACTION_LIST_FETCH_FAILURE':
      return {
        ...state,
        navigateToPostVoidDetails: false,//work around as transaction details not available, need to be removed.
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',
        bypassResp : '',
        error_message: '',
        isValid: true

      }

    case 'trans_type':
      return {
        ...state,
        trans_type: action.payload,
        error_message: '',
        isValid: true,
        pedbatteryresp : '',
        bypassResp : ''
      }


    case 'PED_BATTERY': {
      return {
        ...state,
        pedbatteryresp: action.payload,
        error_message: '',
        isValid: true,
        bypassResp : '',
      }
    }

    case 'CLEAR_HOME_STORE': {

      return {
        ...initialState
      }

    }
    case 'ZIP_TO_CITY_STATE_REQUEST':
      return {
        ...state,
        cityStateData: action.payload,
        pedbatteryresp: '',
        error_message: '',
        isValid: true,
        bypassResp : '',

      }
    case 'ZIP_TO_CITY_STATE_CLEAR_DATA':
      return {
        ...state,
        cityStateData: action.payload,
        pedbatteryresp: '',
        error_message: '',
        isValid: true,
        bypassResp : '',
      }
    case 'RESUME_REQUEST_VALIDFAILED':
      return {
        ...state,
        searchItem: '',
        isSearchItemSet: false,
        data: {},
        dataFrom: '',
        error_message: action.message,
        isValid: false,
        bypassResp : '',
      }
     case "BYPASS": 
       return{
        ...state,
        bypassResp : action.payload,
        error_message: '',
        isValid: true
       }
     break;
    default:
      return state;
  }
}



