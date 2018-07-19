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
    countryList: [],
    firstName : '',
    lastName : ''
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
                    errors: [],
                    firstName : '',
                    lastName : ''
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
                    errors: [],
                    firstName : '',
                    lastName : ''
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
                    }],
                    firstName : '',
                    lastName : ''
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
                }],
                firstName : '',
                lastName : ''
            }
        }


        case ADD_CUST_INT_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlagInt: true,
                    addressValidationSuccessFlagInt: false,
                    errors: [],
                    firstName : '',
                    lastName : ''
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
                    }],
                    firstName : '',
                    lastName : ''
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
                    }],
                    firstName : '',
                    lastName : ''
                }
                break;
        }


        case ADD_CUST_INT_ADDR_VALID_SUCCESS:
            {
                return {
                    ...state,
                    successModalFlag: false,
                    addressValidationSuccessFlag: true,
                    errors: [],
                    firstName : '',
                    lastName : ''
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
                    }],
                    firstName : '',
                    lastName : ''
                }
            }

        case ADD_CUST_COUNTRY_LIST_RETRIEVED:
            return {
                ...state,
                successModalFlag: false,
                successModalFlagInt: false,
                countryList: action.payload.Output.CountryList,
                firstName : '',
                lastName : ''
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
                errors: [],
                firstName : '',
                lastName : ''
            };
        }

        case 'AUTO_POPULATE_FN_LN_ADD_CUSTOMER': {
            return {
                ...state,
                firstName : action.payload.data.customerFirstName,
                lastName : action.payload.data.customerLastName
            };
        }

        default:
            return {
                ...state,
                successModalFlag: false,
                addressValidationSuccessFlag: false,
                errors: [],
                firstName : '',
                lastName : ''
            };
    }
}