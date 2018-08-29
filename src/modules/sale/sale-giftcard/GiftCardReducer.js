import { 
    ADD_GIFTCARD_SUCCESS, 
    ADD_GIFTCARD_FAILURE,
    VALIDATE_DL_SUCCESS, 
    VALIDATE_DL_FAILURE,
    GET_GIFTCARD_FAILURE,
    GET_GIFTCARD_SUCCESS,
    GIFTCARD_CLASS_SUCCESS,
    GIFTCARD_CLASS_FAILURE,
    GET_GIFTCARD_FORBIDDEN_ERROR,
    CONVERT_SALT_SUCCESS,
    CONVERT_SALT_FAILURE,
    GIFTCARD_SALT_SUCCESS,
    GIFTCARD_SALT_FAILURE,
    UPDATE_RELOAD_SUCCESS,
    UPDATE_RELOAD_FAILURE,
    FINCEN_SUCCESS,
    FINCEN_FAILURE } from '../../common/constants/type';


const initialState = {
    data: {},
    gcData: {},
    dlData: {},
    fincenData: {}
};


export function GiftCardReducer(state = initialState, action) {
    switch(action.type) {
        // ADD_GIFTCARD_SUCCESS WAS ADDED TO SALE-CART-REDUCER
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
                dlData: action.payload
            }
        break;

        case VALIDATE_DL_FAILURE :
            return {
                ...state,
                dlData: action.payload
            }
        break;
        
        case GET_GIFTCARD_SUCCESS :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case GET_GIFTCARD_FAILURE :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case GET_GIFTCARD_FORBIDDEN_ERROR :
        return {
            ...state,
            gcData: action.payload
        }
         break;
        
        case GIFTCARD_CLASS_SUCCESS :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case GIFTCARD_CLASS_FAILURE :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case CONVERT_SALT_SUCCESS :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case CONVERT_SALT_FAILURE :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case GIFTCARD_SALT_SUCCESS :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case GIFTCARD_SALT_FAILURE :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case UPDATE_RELOAD_SUCCESS :
            return {
                ...state,
                gcData: action.payload
            }
        break;

        case UPDATE_RELOAD_FAILURE :
            return {
                ...state,
                gcData: action.payload
        }
        break;

        case FINCEN_SUCCESS :
            return {
                ...state,
                fincenData: action.payload
            }
        break;

        case FINCEN_FAILURE :
            return {
                ...state,
                fincenData: action.payload
        }
        break;

        case 'CLEAR_ALL_GIFTCARD_DATA' :
            return {
                ...state,
                // gcData: null,
                // dlData: null,
                // fincenData: null
            }


        default:
            return state;

    }
}