const initialState = {
  buttonId:'',
  loginSuccess: false,
  response: "",
  transactionData: null,
  registerInfoData:null,
  salutationData: null,
  dataFrom: '',
  batteryStatus: '',
  getResumeDatas: '',
  getResumeDatasFrom: '',
  navigateToPostVoidDetails: false,
  pedbatteryresp: '',
  bypassRes: null
};

export function HomeReducer(state = initialState, action) {

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

      }
    case 'TRANSACTION_ID_REQUEST':
      return {
        ...state,
        transactionData: action.payload,
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',

        dataFrom: 'TRANSACTION_ID_REQUEST'
      }
    case 'GET_SALUTATION':
      return {
        ...state,
        salutationData: action.payload,
        navigateToPostVoidDetails: false,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',

      }

    case 'TRANSACTION_ID_ERROR':
      return {
        ...state,
        dataFrom: 'error'
      }

 case 'PRESALE_FLAG':
      return {
        ...state,
        registerInfoData: action.payload,
        dataFrom: 'PRESALE_FLAG'
      }
      case 'PRESALE_FLAG_ERROR':
      return {
        ...state,
        dataFrom: 'error'
      }
    case 'RESUME_ENTRY_REQUEST_SUCCESS': {
      console.log("***HOME RESUME REQUEST SUCEEss", action)
      return {
        ...state,
        getResumeDatas: action.payload,
        getResumeDatasFrom: "RESUME_TRANSACTIONS_SUCCESS",

      }
    };
    case 'BATTERY_LEVEL': {
      return {
        ...state,
        batteryStatus: action.payload,
        pedbatteryresp: '',

      }
    }
    case 'CLEAR_PED': {
      return {
        ...state,
        bypassRes: action.payload,
        pedbatteryresp: '',
      }
    }
    case 'RESUME_ENTRY_REQUEST_FAILURE': {
      return {
        ...state,
        getResumeDatas: action.payload,
        getResumeDatasFrom: "RESUME_ENTRY_REQUEST_FAILURE_ERROR",
        pedbatteryresp: '',

      }
    };
    case 'SUSPENDED_TRANSACTION_LIST_FETCH_FAILURE':{
      return {
          ...state,
          response: action.payload,
          dataFrom: "SUSPENDED_TRANSACTION_LIST_FAILURE",
          pedbatteryresp: '',
      }
    };
    case 'SET_BUTTON_CLICK_ID':
            return {
                ...state,
                buttonId : action.payload,
                dataFrom :'',
                pedbatteryresp: '',
            };

    case 'TRANSACTION_DETAILS_FETCH_SUCCESS':
      return {
        ...state,
        navigateToPostVoidDetails: true,
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',


      }
      case 'TRANSACTION_LIST_FETCH_FAILURE':
      return {
        ...state,
        navigateToPostVoidDetails: false,//work around as transaction details not available, need to be removed.
        getResumeDatas: '',
        getResumeDatasFrom: '',
        pedbatteryresp: '',

      }

      case 'trans_type':
      return {
        ...state,
        trans_type:action.payload
      }

       
    case 'PED_BATTERY':{
      return{
        ...state,
        pedbatteryresp: action.payload,
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

      }
    case 'ZIP_TO_CITY_STATE_CLEAR_DATA':
      return {
        ...state,
        cityStateData: action.payload,
        pedbatteryresp: '',
      }
    default:
      return state;
  }
}



