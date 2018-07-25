const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    invalidPhone : false,
    isUpdateSuccess  :false, 
    errors : [],
    countryList:[],
    profileData: {},
    storeClientNumber:""
};

export function ViewEditCustomerReducer(state, action) {
 
    switch (action.type) {
        case 'COUNTRY_LIST_RETRIEVED_VIEW_EDIT': {
            return {
                ...state,
                successModalFlag: false,
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
                addressValidationSuccessFlag: false,
                errors : [],
                profileData : action.payload,
                isCountryList : false,
                isProfileData : true,
                isUpdateSuccess : false
            };
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

        default:
            return {
                ...state,
                successModalFlag: false,
                clienteleUpdateFlag: false,
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