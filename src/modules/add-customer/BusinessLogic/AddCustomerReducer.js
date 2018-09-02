import {ADD_CUST_DOM_SUCCESS ,ADD_CUST_DOM_ADDR_VALID_SUCCESS, ADD_CUST_DOM_INVALID_ZIP, 
        INVALID_ZIP , ADD_CUST_DOM_ADDR_BAD_REPLY, INVALID_Address , ADD_CUST_INT_SUCCESS,
        ADD_CUST_INT_INVALID_EMAIL, ADD_CUST_INT_INVALID_ZIP ,INVALID_EMAIL, ADD_CUST_DOM_INVALID_EMAIL,
        ADD_CUST_INT_ADDR_VALID_SUCCESS, ADD_CUST_COUNTRY_LIST_RETRIEVED, ADD_CUST_RESET,
        ADD_CUST_DOM_MISSING_DETAILS, ADD_CUST_DOM_GENERAL_ERROR, ADD_CUST_INT_MISSING_DETAILS, 
        ADD_CUST_INT_GENERAL_ERROR, ADD_CUST_DOM_INVALIDASSOCIATE, ADD_CUST_DOM_FAI, ADD_CUST_DOM_INVALID_PHONE, ADD_CUST_INT_INVALID_PHONE, ADD_CUST_DOM_RECORD_NOT_ADDED, ADD_CUST_INT_RECORD_NOT_ADDED,   } from './constants';
        
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
    lastName : '',
    bypassResp:'',
    getCardBinResp : '',
    responseError: null
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
                    lastName : '',
                    storeClientNo: action.payload.storeClientNo,
                    addressSequence: action.payload.addressSequence,
                    mobileSequence: action.payload.mobileSequence,
                    responseError: null
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
                    lastName : '',
                    responseError: null
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
                    lastName : '',
                    responseError: null
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
                lastName : '',
                responseError: action.payload
            }
        }


        case ADD_CUST_INT_SUCCESS:
            {
                sessionStorage.removeItem('called');
                return {
                    ...state,
                    successModalFlagInt: true,
                    addressValidationSuccessFlagInt: false,
                    errors: [],
                    firstName : '',
                    lastName : '',
                    storeClientNo: action.payload.storeClientNo,
                    addressSequence: action.payload.addressSequence,
                    mobileSequence: action.payload.mobileSequence,
                    responseError: null
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
                    lastName : '',
                    responseError: null
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
                    lastName : '',
                    responseError: null
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
                    lastName : '',
                    responseError: null
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
                    lastName : '',
                    responseError: null
                }
            }

        case ADD_CUST_COUNTRY_LIST_RETRIEVED:
            return {
                ...state,
                successModalFlag: false,
                successModalFlagInt: false,
                countryList: action.payload.CountryList,
                firstName : '',
                lastName : '',
                responseError: null
            };
            break;

        case ADD_CUST_RESET:
        {
            return {
                ...state,
                successModalFlag: false,
                successModalFlagInt:false,
                addressValidationSuccessFlag: false,
                invalidAddress:false,
                invalidEmail:false,
                errors: [],
                firstName : '',
                lastName : '',
                responseError: null
            };
        }

        case 'AUTO_POPULATE_FN_LN_ADD_CUSTOMER': {
            return {
                ...state,
                firstName : action.payload.data.customerFirstName,
                lastName : action.payload.data.customerLastName,
                responseError: null
            };
        }

        case "GETCARDBIN" : {
            return{
                ...state,
                getCardBinResp: action.payload,
                bypassResp:'',
                responseError: null
                
            }
        }
        break;
        case "ADD_CARD_CLIENTELE_SUCCESS" :{
            return{
                ...state,
                addCardSuccessResp: action.payload ,
                successModalFlag: false,
                successModalFlagInt: false,
                invalidAddress:false,
                invalidEmail:false,
                addressValidationSuccessFlag: false,
                addressValidationSuccessFlagInt: false,
                bypassResp:'',
                getCardBinResp :'',
                responseError: null
            }
        }
        break;
        case "ADD_CARD_CLIENTELE_FAIL" : {
            return{
                ...state,
                addCardFailResp: action.payload ,
                successModalFlag: false,
                successModalFlagInt: false,
                invalidAddress:false,
                invalidEmail:false,
                addressValidationSuccessFlag: false,
                addressValidationSuccessFlagInt: false,
                responseError: action.payload

            }
        }
        break;
        case "BYPASS" : {
            return{
                ...state,
                bypassResp:action.payload,
                isAddCardClientele : false,
                isAddCardClienteleFail : false ,
                getCardBinResp:'',
                successModalFlag: false,
                successModalFlagInt: false,
                invalidAddress:false,
                invalidEmail:false,
                addressValidationSuccessFlag: false,
                addressValidationSuccessFlagInt: false,
                responseError: null

            }
        }
        break;
        case ADD_CUST_DOM_MISSING_DETAILS : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        break;
        case ADD_CUST_DOM_GENERAL_ERROR : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        break;
        case 'ADD_CUST_DOM_DEFAULT' : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        break;

        case ADD_CUST_INT_MISSING_DETAILS : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        break;
        case ADD_CUST_INT_GENERAL_ERROR : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        break;
        case 'ADD_CUST_INT_DEFAULT' : {
            return {
                ...state,
                responseError: action.payload
            }
        }
        case ADD_CUST_DOM_INVALIDASSOCIATE : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        case ADD_CUST_DOM_FAI : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        case ADD_CUST_DOM_INVALID_PHONE : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        case ADD_CUST_INT_INVALID_PHONE : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        case ADD_CUST_DOM_RECORD_NOT_ADDED : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        case ADD_CUST_INT_RECORD_NOT_ADDED : {
            return {
                ...state,
                responseError: action.payload
            }
        }

        default:
            return state
                // successModalFlag: false,
                // successModalFlagInt: false,
                // addressValidationSuccessFlag: false,
                // errors: [],
                // firstName : '',
                // lastName : '',
                // bypassResp:'',
                // getCardBinResp : '',
                // addCardFailResp:'',
                // addCardSuccessResp:''

            
    }
}