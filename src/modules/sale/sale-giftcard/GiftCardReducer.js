import { 
    ADD_GIFTCARD_SUCCESS, 
    ADD_GIFTCARD_FAILURE,
    VALIDATE_DL_SUCCESS, 
    VALIDATE_DL_FAILURE 
    } from '../../common/constants/type';


const initialState = {
    data: {}
};


export function GiftCardReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_GIFTCARD_SUCCESS :
            return {
                ...state,
                data: action.payload
            }
        break;

        case ADD_GIFTCARD_FAILURE :
            return {
                ...state,
                data: action.payload
            }
        break;

        case VALIDATE_DL_SUCCESS :
            return {
                ...state,
                data: action.payload
            }
        break;

        case VALIDATE_DL_FAILURE :
            return {
                ...state,
                data: action.payload
            }
        break;

        default:
            return state;

    }
}