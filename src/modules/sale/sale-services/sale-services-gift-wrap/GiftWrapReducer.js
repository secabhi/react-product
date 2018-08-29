import { GET_GIFT_WRAP, ADD_TO_GIFT_WRAP, CLEAR_GIFT_WRAP} from '../../../common/constants/type';

const initialState = {
    data: [],
    giftWrapItems: {}
}

export function GiftWrapReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GIFT_WRAP:
            return {
                ...state,
                data : action.payload
            };
            break;

        case CLEAR_GIFT_WRAP:  

            return initialState;
            break;
        
            case 'SET_GIFT_WRAP_TYPE':{
                // const datainit = ...state
                 return {
                    // ...state,
                     ...state,
                     wrapType: action.payload,
                     dataFrom : 'SET_GIFT_WRAP_TYPE'
                 }
             }
             break;

        default:
            return state;
    }
}