const initialState = {
    successModalFlag : false,
    updateFailModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyEmailFlag : false,
    verifyAddressFlag : false,
    invalidPhone : false,
    isProfileLoaded : false,
    notFoundFlag : false,
    errors : []
};

export function UpdateCustomerReducer(state = initialState, action) {
    //console.log("UpdateCustomerReducer State Received:", state);
    //console.log("UpdateCustomerReducer Action Received:", action);
   // debugger;

    switch (action.type) {

        case 'UPDATE_CUST_DOM_SUCCESS': {
            return {
                ...state,
                successModalFlag: true,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                notFoundFlag : false,
                errors : [],
                isProfileLoaded : false,
                updateFailModalFlag : false
            };
            break;
        }

        case 'UPDATE_CUST_DOM_FAIL': {
            return {
                ...state,
                successModalFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                notFoundFlag : false,
                errors : [],
                isProfileLoaded : false,
                updateFailModalFlag : true
            };
            break;
        }

        case 'UPDATE_CUST_DOM_INVALID_EMAIL' :{
            console.log('UPDATE_CUST_DOM_INVALID_EMAIL');
            return{
                ...state,
                verifyEmailFlag: true,
                notFoundFlag : false,
                errors : [{
                    "cust_email" : "INVALID EMAIL"
                }],
                isProfileLoaded : false,
                updateFailModalFlag : false
            }
            break;
        }
    
        case 'UPDATE_CUST_DOM_ADDR_VALID_SUCCESS' : {
            return {
                ...state,
                successModalFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: true,
                verifyAddressFlag : false,
                notFoundFlag : false,
                errors : [],
                isProfileLoaded : false,
                updateFailModalFlag : false
            };
            break;
        }

        case 'UPDATE_CUST_DOM_NOT_FOUND' : {
            return {
                ...state,
                successModalFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                verifyAddressFlag : false,
                notFoundFlag : true,
                errors : [],
                isProfileLoaded : false,
                updateFailModalFlag : false
            };
            break;
        }

        case 'UPDATE_CUST_DOM_ADDR_BAD_REPLY' : {
            return {
                ...state,
                successModalFlag: false,
                verifyEmailFlag: false,
                addressValidationSuccessFlag: false,
                verifyAddressFlag : true,
                notFoundFlag : false,
                errors : [],
                isProfileLoaded : false,
                updateFailModalFlag : false
            };
            break;
        }

        
        case 'UPDATE_CUST_DOM_INVALID_ZIP' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    dom_cust_zip : 'INVALID ZIP'
                }],
                isProfileLoaded : false,
                verifyAddressFlag : false,
                notFoundFlag : false,
                updateFailModalFlag : false
            }
        }

        case 'UPDATE_CUST_DOM_INVALID_PHONE' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    dom_cust_mobile : 'INVALID PHONE'
                }],
                isProfileLoaded : false,
                verifyAddressFlag : false,
                notFoundFlag : false,
                updateFailModalFlag : false
            }
        }
        case 'UPDATE_CUST_DOM_INVALID_STATE' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    dom_cust_state : 'INVALID STATE'
                }],
                isProfileLoaded : false,
                verifyAddressFlag : false,
                notFoundFlag : false,
                updateFailModalFlag : false
            }
        }
        
        case 'UPDATE_CUST_DOM_GENERAL_ERROR' : {
            return {
                ...state,
                successModalFlag: false,
                errors : [{
                    dom_cust_zip : 'NETWORK ERROR'
                }],
                isProfileLoaded : false,
                verifyAddressFlag : false,
                notFoundFlag : false,
                updateFailModalFlag : false
            };
            break;
        }
        

        default:
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                errors : [],
                verifyAddressFlag : false,
                verifyEmailFlag: false,
                notFoundFlag : false,
                updateFailModalFlag : false
            };
    }
}