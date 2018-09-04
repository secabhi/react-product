import { OPTION_SEVEN_SEND,SELECT_STORE_SEND,SHIPPING_OPTIONS_SEND } from '../../../common/constants/type';

const initialState = {
    data: {}
}

export function OptionSevenSendReducer (state = initialState, action) {
   
    switch(action.type) {
        case OPTION_SEVEN_SEND :
            return {
                ...state,
                data: action.payload
            }
            case SELECT_STORE_SEND :
            return {
                ...state,
                data: action.payload,
                dataFrom:'SELECT_STORE_SEND',
                        } 
            case SHIPPING_OPTIONS_SEND:
            return{
                ...state,
                data: action.payload,
                dataFrom:'SHIPPING_OPTIONS_SEND',
            }
        default:
            return state;
    }
}

