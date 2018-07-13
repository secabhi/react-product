const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    invalidPhone : false,
    isProfileLoaded : false,
    errors : []
};

export function UpdateCustomerReducer(state = initialState, action) {
    //console.log("UpdateCustomerReducer State Received:", state);
    //console.log("UpdateCustomerReducer Action Received:", action);

    switch (action.type) {

        case 'UPDATE_CUST_DOM_SUCCESS': {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                errors : [],
                isProfileLoaded : false
            };
            break;
        }

        case 'UPDATE_CUST_DOM_INVALID_EMAIL' :{
            console.log('UPDATE_CUST_DOM_INVALID_EMAIL');
            return{
                ...state,
                errors : [{
                    "cust_email" : "INVALID EMAIL"
                }],
                isProfileLoaded : false
            }
            break;
        }
    
        case 'UPDATE_CUST_DOM_ADDR_VALID_SUCCESS' : {
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: true,
                verifyAddressFlag : false,
                errors : [],
                isProfileLoaded : false
            };
            break;
        }

        case 'UPDATE_CUST_DOM_ADDR_BAD_REPLY' : {
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                verifyAddressFlag : true,
                errors : [],
                isProfileLoaded : false
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
                verifyAddressFlag : false
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
                verifyAddressFlag : false
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
                verifyAddressFlag : false
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
                verifyAddressFlag : false
            };
            break;
        }

        case 'SET_CUSTOMER_PROFILE_DATA' : {

           // console.log('action : '+action.payload)
            return {
                ...state,
                successModalFlag :  false,
                errors : [],
                customerProfile : action.payload,
                isProfileLoaded : true,
                verifyAddressFlag : false

            }
        }
        

        default:
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                errors : [],
                verifyAddressFlag : false
            };
    }
}