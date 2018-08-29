import { SHIPMENT_OPTIONS_REQUEST, DIRECT_SEND_REQUEST, FREQ_SHIPPED_ADDRESSES, SHIPMENT_OPTIONS_REQUEST_FAILURE, DIRECT_SEND_REQUEST_FAILURE, FREQ_SHIPPED_ADDRESSES_FAILURE, AUTH_CODE_REQUEST, AUTH_CODE_REQUEST_FAILURE, SEND_CLEAR_ERROR, SEND_CLEAR_RESPONSE } from '../../common/constants/type';

const INITIAL_STATE = {
    shippingOptionsResponse : {},
    directSendResponse : {},
    authCodeResponse: {},
    data: [],
    frequentlyShippedAddresses:[],
    error: null
};


export function sendReducer (state = INITIAL_STATE, action) {
    console.log("----------SEND REDUCER-----------");
    console.log(action.payload);
    console.log("----------SEND REDUCER-----------");
    
    switch (action.type) {
        case SHIPMENT_OPTIONS_REQUEST:
            return {
                ...state,
                shippingOptionsResponse : action.payload,
                error: null
            };

        case DIRECT_SEND_REQUEST:
            return{
                ...state,
                directSendResponse : action.payload,
                error: null
            }

        case FREQ_SHIPPED_ADDRESSES:
            return {
                ...state,
                frequentlyShippedAddresses: action.payload.data,
                error: null
            }

        case SHIPMENT_OPTIONS_REQUEST_FAILURE:
            return {
                ...state,
                shippingOptionsResponse: {},
                error: action.payload
            }

        case DIRECT_SEND_REQUEST_FAILURE:
            return {
                ...state,
                directSendResponse: {},
                error: action.payload
            }
        
        case FREQ_SHIPPED_ADDRESSES_FAILURE:
            return {
                ...state,
                frequentlyShippedAddresses: {},
                error: action.payload
            }

        case AUTH_CODE_REQUEST:
            return {
                ...state,
                authCodeResponse: {},
                error: null
            }

        case AUTH_CODE_REQUEST_FAILURE:
            return {
                ...state,
                authCodeResponse: {},
                error: action.payload
            }

        case SEND_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        case SEND_CLEAR_RESPONSE:
            return {
                ...state,
                error:null,
                directSendResponse:{},
                frequentlyShippedAddresses:{},
                shippingOptionsResponse:{}
            }

        default:
            return state
    }
};
