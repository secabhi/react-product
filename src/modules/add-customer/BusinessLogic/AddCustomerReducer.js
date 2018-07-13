import {ADD_CUST_DOM_SUCCESS ,ADD_CUST_DOM_ADDR_VALID_SUCCESS, ADD_CUST_DOM_INVALID_ZIP, 
        INVALID_ZIP , ADD_CUST_DOM_ADDR_BAD_REPLY, INVALID_Address , ADD_CUST_INT_SUCCESS,
        ADD_CUST_INT_INVALID_EMAIL, ADD_CUST_INT_INVALID_ZIP ,INVALID_EMAIL, ADD_CUST_DOM_INVALID_EMAIL,
        ADD_CUST_INT_ADDR_VALID_SUCCESS, ADD_CUST_COUNTRY_LIST_RETRIEVED, ADD_CUST_RESET} from './constants';
        
const initialState = {
    successModalFlag: false,
    successModalFlagInt: false,
    invalidAddress:false,
    invalidEmail:false,
    addressValidationSuccessFlag: false,
    addressValidationSuccessFlagInt: false,
    errors: [],
    errorsInt: [],
    countryList: []
};

export function AddCustomerReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_CUST_DOM_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlag: true,
                    addressValidationSuccessFlag: false,
                    invalidAddress:false,
                    invalidEmail:false,
                    errors: []
                };
                break;
            }



        case ADD_CUST_DOM_ADDR_VALID_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    invalidAddress:false,
                    invalidEmail:false,
                    addressValidationSuccessFlag: true,
                    errors: []
                };
                break;
            }
        
        case ADD_CUST_DOM_INVALID_ZIP:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    invalidAddress:false,
                    invalidEmail:false,
                    errors: [{
                        dom_cust_zip: INVALID_ZIP
                    }]
                }
            }

        case ADD_CUST_DOM_ADDR_BAD_REPLY:
        {
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                invalidAddress:true,
                invalidEmail:false,
                errors: [{
                    dom_cust_address: INVALID_Address
                }]
            }
        }


        case ADD_CUST_INT_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlagInt: true,
                    addressValidationSuccessFlagInt: false,
                    errors: []
                };
                break;
            }

        case ADD_CUST_INT_INVALID_EMAIL:
            {
                return {
                    ...state,
                   successModalFlag: false,
                   invalidAddress:false,
                   invalidEmail:true,
                    errors: [{
                        "cust_email": INVALID_EMAIL
                    }]
                }
                break;
            }
        
        case ADD_CUST_DOM_INVALID_EMAIL:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    invalidAddress:false,
                    invalidEmail:true,
                    errors: [{
                        "cust_email": INVALID_EMAIL
                    }]
                }
                break;
        }


        case ADD_CUST_INT_ADDR_VALID_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    addressValidationSuccessFlag: true,
                    errors: []
                };
                break;
            }

        case ADD_CUST_INT_INVALID_ZIP:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    errors: [{
                        dom_cust_zip: INVALID_ZIP
                    }]
                }
            }

        case ADD_CUST_COUNTRY_LIST_RETRIEVED:
            return {
                ...state,
                successModalFlag: false,
                successModalFlagInt: false,
                countryList: action.payload.Output.CountryList
            };
            break;

        case ADD_CUST_RESET:
        {
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                invalidAddress:false,
                invalidEmail:false,
                errors: []
            };
        }

        default:
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                errors: []
            };
    }
}