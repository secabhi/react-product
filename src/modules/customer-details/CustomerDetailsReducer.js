import { GET_CSR_HISTORY } from '../common/constants/type';

var initialState = {
  error: '',
  addresses: {},
  clientNumber: "",
  cCSNumber: "",
  myClient: "N",
  saluationCode: "",
  salutation: "",
  lastName: "",
  firstName: "",
  emailAddress: "",
  selectedAddress: {
    sequenceKey: '',
    international: '',
    Addr1: '',
    Addr2: '',
    City: '',
    State: '',
    Country: '',
    Zip: '',
    PhoneNumbers: [{},{}]
  },
  purchases:[],
  recommendations: [],
  itemPurchased: false
}


export function CustomerDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CSR_HISTORY': {
      return {
        ...state,
        ...action.payload,
        itemPurchased: true,
        error: ''
      };
    }
    case 'PURCHASES_RECOMMENDS_ERROR': {
      console.log('action', action);
      return {
        ...state,
        error: 'PURCHASES_RECOMMENDS_ERROR'
      }
    }
    case 'NETWORK_ERROR_PURCHASE_N_RECOMMENDS': {
      console.log('action', action)
      return {
        ...state,
        error: 'NETWORK_ERROR_PURCHASE_N_RECOMMENDS'
      }
    }

    case 'CLEAR_CUSTOMER_DETAILS':{
      console.log('action',action)
      return initialState
    }


    case 'NAVIGATE_TO_DOMESTIC_CUSTOMER': {
      return {
        ...state,
        ...action.payload,
        error: ''
      };
    }

    case 'NAVIGATE_TO_DOMESTIC_CUSTOMER_WITH_UPDATE': {  
      return {
        ...state,
        updatedCustomer: action.payload,
        error: ''
      };
    }
    
    case 'GET_SALES_SUMMARY': {
      console.log('action',action);
      return {
        ...state,
        salesSummary :action.payload,
        error: ''
      };
    }
    case 'NETWORK_ERROR_GET_SALES_SUMMARY': {
      console.log('ation', action);
      return {
        ...state,
        error: 'NETWORK_ERROR_GET_SALES_SUMMARY'
      }
    }

    case 'PURCHASED_FLAG':{
      console.log('action', action)
      return {
        ...state,
        itemPurchased: action.payload,
        error: ''
      }
    }

    default: 
      return state
  }
}