const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    verifyEmailFlag : false,
    invalidPhone : false,
    isUpdateSuccess  :false, 
    errors : [],
    countryList:[],
    storeClientNumber:""
};

export function ViewEditCustomerReducer(state, action) {
 
    switch (action.type) {
        case 'COUNTRY_LIST_RETRIEVED_VIEW_EDIT': {
            return {
                ...state,
                successModalFlag: false,
                verifyEmailFlag: false,
                clienteleUpdateFlag: false,
                addressValidationSuccessFlag: false,
                countryList : action.payload,
                errors : [],
                isCountryList : true,
                isProfileData : false,
                isUpdateSuccess : false
            };
        }
        case 'UPDATE_CUST_SUCCESS': {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                verifyEmailFlag: false,
                clienteleUpdateFlag: action.payload.ClienteleUpdateFlag,
                errors : [],
                isUpdateSuccess : false
            };
        }

        case 'NAVIGATE_TO_EDIT_CUSTOMER' : {
            return {
                ...state,
                successModalFlag: false,
                clienteleUpdateFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                errors : [],
                profileData : action.payload,
                isCountryList : false,
                isProfileData : true,
                isUpdateSuccess : false
            };
        }

        case 'VIEW_EDIT_CUST_INVALID_EMAIL' :{
            return{
                ...state,
                verifyEmailFlag: true,
                successModalFlag: false,
                clienteleUpdateFlag: false,
                errors : [{
                    "cust_email" : "INVALID EMAIL"
                }],
                isCountryList : false,
                isProfileData : false,
                isUpdateSuccess : false
            }
        }
        // case "STORE_CLIENT_REQ_SUCCESS":
        //     {
        //         return {
        //             ...state,
        //             storeClientNumber:action.payload.storeClientNo,
        //             response: action.payload,
        //             successModalFlag: false,
        //             clienteleUpdateFlag: false,
        //             addressValidationSuccessFlag: false,
        //             isUpdateSuccess : true
                   
        //         }
        //     }
        case 'TRANSACTION_ID_REQUEST':
      return {
        ...state,
        transactionData: action.payload,
        dataFrom: 'TRANSACTION_ID_REQUEST'
      }

        default:
            return {
                ...state,
                successModalFlag: false,
                clienteleUpdateFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                countryList : [],
                errors : [],
                profileData: {},
                isCountryList : false,
                isProfileData : false,
                isUpdateSuccess : false
            };
    }
}