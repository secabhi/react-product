import { GET_GIFT_WRAP, ADD_TO_GIFT_WRAP, CLEAR_GIFT_WRAP, GET_GIFT_WRAP_ERROR, ADD_GIFT_WRAP_ERROR} from '../../../common/constants/type';

const initialState = {
    data: [],
    giftWrapItems: {},
    isValid: false,
    error: null
}

export function GiftWrapReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GIFT_WRAP : {
            return {
                ...state,
                data : action.payload,
                isValid : true,
                error : null
            };
        }

        case CLEAR_GIFT_WRAP : {
            return initialState;
        }
        
        case 'SET_GIFT_WRAP_TYPE' : {
            // const datainit = ...state
             return {
                // ...state,
                 ...state,
                 wrapType: action.payload,
                 dataFrom : 'SET_GIFT_WRAP_TYPE',
                 isValid : true,
                 error : null
             }
        }

        case GET_GIFT_WRAP_ERROR : {
           return {
               ...state,
               isValid : false,
               error : action.type 
           }
        }

        case ADD_GIFT_WRAP_ERROR : {
           return {
               ...state,
               isValid : false,
               error : action.type 
           }
        }

        default:
            return state;
    }
}