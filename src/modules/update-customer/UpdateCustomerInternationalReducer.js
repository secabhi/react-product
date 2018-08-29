const initialState = {
  countryList : [],
  successModalFlag : false,
  addressValidationSuccessFlag : false,
  verifyEmailFlag : false,
  verifyAddressFlag : false,
  errors : []
};

export function UpdateCustomerInternationalReducer(state = initialState, action) {
  switch (action.type) {
    case 'COUNTRY_LIST_RETRIEVED':{
      console.log("retriving country list");
      return {
        ...state,
        countryList: action.payload.CountryList,          
        successModalFlag : false,
        isProfileLoaded : false
      };

      break;
    }
      
      case 'CS_SUCCESS': {
        return {
            ...state,
            successModalFlag: true,
            verifyEmailFlag: false,
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
           verifyAddressFlag : false,
           verifyEmailFlag: false,

       };
       break;
   }
   case 'UPDATE_INT_CUST_DOM_INVALID_EMAIL' :{
    console.log('UPDATE_CUST_DOM_INVALID_EMAIL');
    return{
        ...state,
        verifyEmailFlag : true,
        errors : [{
            "cust_email" : "INVALID EMAIL"
        }],
        isProfileLoaded : false
    }
    break;
}

case 'UPDATE_INT_CUST_AV_BAD_REPLY' : {
    return {
        ...state,
        successModalFlag: false,
        addressValidationSuccessFlag: false,
        verifyAddressFlag : true,
        verifyEmailFlag: false,
        errors : [],
        isProfileLoaded : false
    };
    break;
}

case 'UPDATE_INT_CUST_EMAIL_OR_ADDR' : {
  return {
      ...state,
      successModalFlag: false,
      addressValidationSuccessFlag: false,
      verifyAddressFlag : false,
      verifyEmailFlag: false,
      errors : [],
      isProfileLoaded : false
  };
  break;
}




case 'UPDATE_INT_CUST_DOM_INVALID_PHONE' : {
    return {
        ...state,
        successModalFlag : false,
        errors : [{
          int_cust_mobile : 'INVALID PHONE'
        }],
        isProfileLoaded : false,
        verifyAddressFlag : false,
        verifyEmailFlag: false,
    }
}

case 'UPDATE_CUST_DOM_GENERAL_ERROR' : {
    return {
        ...state,
        successModalFlag: false,
        errors : [{
          int_cust_zip : 'NETWORK ERROR'
        }],
        isProfileLoaded : false,
        verifyAddressFlag : false,
        verifyEmailFlag: false,
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