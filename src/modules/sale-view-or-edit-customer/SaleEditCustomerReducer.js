const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    invalidPhone : false,
    errors : [],
    profileData: {}
};

export function SaleEditCustomerReducer(state = initialState, action) {
    //console.log("UpdateCustomerReducer State Received:", state);
    //console.log("SaleEditCustomerReducer Action Received:", action);

    switch (action.type) {

        case 'SALE_EDIT_CUST_SUCCESS': {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                errors : []
            };
            break;
        }
        case 'NAVIGATE_TO_EDIT_CUSTOMER' : {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                errors : [],
                profileData : action.payload
            };
            break;
        }
        case 'SALE_EDIT_CUST_INVALID_EMAIL' :{
            console.log('UPDATE_CUST_INVALID_EMAIL');
            return{
                ...state,
                errors : [{
                    "cust_email" : "INVALID EMAIL"
                }]
            }
            break;
        }
    
        case 'SALE_EDIT_CUST_ADDR_VALID_SUCCESS' : {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: true,
                verifyAddressFlag : false,
                errors : []
            };
            break;
        }

        case 'SALE_EDIT_CUST_ADDR_BAD_REPLY' : {
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                verifyAddressFlag : true,
                errors : []
            };
            break;
        }

        
        case 'SALE_EDIT_CUST_INVALID_ZIP' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    cust_zip : 'INVALID ZIP'
                }]
            }
        }

        case 'SALE_EDIT_CUST_INVALID_PHONE' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    cust_mobile : 'INVALID PHONE'
                }]
            }
        }
        case 'SALE_EDIT_CUST_INVALID_STATE' : {
            return {
                ...state,
                successModalFlag : false,
                errors : [{
                    cust_state : 'INVALID STATE'
                }]
            }
        }
        
        case 'SALE_EDIT_CUST_GENERAL_ERROR' : {
            return {
                ...state,
                successModalFlag: false,
                errors : [{
                    cust_zip : 'NETWORK ERROR'
                }]
            };
            break;
        }

        case 'NAVIGATE_TO_EDIT_CUSTOMER' : {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                errors : [],
                profileData : action.payload
            };
            break;
        }
        

        default:
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                verifyAddressFlag : false,

                errors : [],
                profileData: {}
            };
    }
}

