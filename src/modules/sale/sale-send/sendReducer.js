import { SHIPMENT_OPTIONS_REQUEST, DIRECT_SEND_REQUEST } from '../../common/constants/type';

const INITIAL_STATE = {
    shippingOptionsResponse : {},
    directSendResponse : {},
};


export function sendReducer (state = INITIAL_STATE, action) {
    console.log("----------SEND REDUCER-----------");
    console.log(action.payload);
    console.log("----------SEND REDUCER-----------");
    
    switch (action.type) {
        case SHIPMENT_OPTIONS_REQUEST:
            return {
                ...state,
                shippingOptionsResponse : action.payload
            };

        case DIRECT_SEND_REQUEST:
            return{
                ...state,
                directSendResponse : action.payload
            }
        default: return state;
    }
};