import {UPDATE_CUST_SUCCESS, UPDATE_CUST_GENERAL_ERROR, UPDATE_CUST_MISSING_DETAILS, UPDATE_CUST_RECORD_NOT_UPDATED, VIEW_EDIT_CUST_INVALID_EMAIL, VIEW_EDIT_CUST_FAILURE } from '../../common/constants/type';

const initialState = {
    successModalFlag : false,
    addressValidationSuccessFlag : false,
    verifyAddressFlag : false,
    verifyEmailFlag : false,
    invalidPhone : false,
    isUpdateSuccess  :false, 
    errors : [],
    countryList:[],
    storeClientNumber:"",
    errorModal:false,
    error_message:'',
    isValid:true
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
                isUpdateSuccess : false,
                error_message:'',
                isValid:true
            };
        }
        case UPDATE_CUST_SUCCESS: {
            return {
                ...state,
                successModalFlag: true,
                addressValidationSuccessFlag: false,
                verifyEmailFlag: false,
                clienteleUpdateFlag: action.payload.ClienteleUpdateFlag,
                errors : [],
                isUpdateSuccess : false,
                error_message:'',
                isValid:true
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
                isUpdateSuccess : false,
                error_message:'',
                isValid:true
            };
        }

        case VIEW_EDIT_CUST_INVALID_EMAIL :{
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
                isUpdateSuccess : false,
                error_message:'',
                isValid:true
            }
        }

        case VIEW_EDIT_CUST_FAILURE :{
            return{
                ...state,
                errorModal:true,
                error_message:'',
                isValid:true
            }
        }

        case 'VIEW_EDIT_CUST_VALIDFAILURE':{
            return{
                ...state,
                successModalFlag : false,
                addressValidationSuccessFlag : false,
                verifyAddressFlag : false,
                verifyEmailFlag : false,
                invalidPhone : false,
                isUpdateSuccess  :false, 
                errors : [],
                countryList:[],
                storeClientNumber:"",
                errorModal:false,
                error_message: action.message,
                isValid:false
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