const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    invalidPhone : false,
    errors : [],
    countryList:[],
    profileData: {}
};

export function ViewEditCustomerReducerSff(state, action) {
    console.log('ViewEditCustomerReducer: ', action);
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
                isProfileData : false
            };
        }
        case 'UPDATE_CUST_SUCCESS': {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                clienteleUpdateFlag: action.payload.ClienteleUpdateFlag,
                errors : []
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
                isProfileData : true
            };
        }

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
                isProfileData : false
            };
    }
}