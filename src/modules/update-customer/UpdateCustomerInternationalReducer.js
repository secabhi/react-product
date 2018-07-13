const initialState = {
  countryList : [],
  successModalFlag : false,
  addressValidationSuccessFlag : false,
  verifyAddressFlag : false,
  errors : []
};

export function UpdateCustomerInternationalReducer(state = initialState, action) {
  switch (action.type) {
    case 'COUNTRY_LIST_RETRIEVED':{
      console.log("retriving country list");
      return {
        ...state,
        countryList: action.payload.Output.CountryList,          
        successModalFlag : false,
        isProfileLoaded : false
      };

      break;
    }
      
      case 'CS_SUCCESS': {
        return {
            ...state,
            successModalFlag: true,
            addressValidationSuccessFlag: false,
            isProfileLoaded : false,
            errors : []
        };
        break;
    }

    
    case 'SET_CUSTOMER_PROFILE_DATA_INT' : {

      // console.log('action : '+action.payload)
       return {
           ...state,
           successModalFlag :  false,
           errors : [],
           customerProfile : action.payload,
           isProfileLoaded : true,
           verifyAddressFlag : false

       };
       break;
   }
    default:
      return {
        ...state,          
        successModalFlag : false
      };
  }
}