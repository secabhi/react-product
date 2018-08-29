import { GET_CSR_HISTORY } from '../common/constants/type';

var initialState = {
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
  recommendations: []
}


export function CustomerDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CSR_HISTORY':
      return { ...state,...action.payload}

    case 'NAVIGATE_TO_DOMESTIC_CUSTOMER': {
      return {
        ...state,
        ...action.payload
      };
    }

    case 'NAVIGATE_TO_DOMESTIC_CUSTOMER_WITH_UPDATE': {
     
      return {
        ...state,
        updatedCustomer: action.payload
      };
    }
    
    case 'GET_SALES_SUMMARY': {
      console.log('action',action)
      return {
        ...state,
        salesSummary :action.payload
      };
    }

    case 'CLEAR_CUSTOMER_DETAILS':{
      console.log('action',action)
      return initialState
    }

    default: 
      return state
  }
}