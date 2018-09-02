import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../../common/constants/type";

const initialStateAlterationReducer = {
    error_message:'',
    isValid : false
}

export function AlterationReducer (state = initialStateAlterationReducer, action) {
  switch (action.type) {
    case ADD_ALTERATIONS:
        return true;
        break;

    case RESET_ALTERATION:
        return false;
        break;
    case 'ALTERATION_SUCCESS' : {
        return {
            ...state,
            dataFrom: "ALTERATION_SUCCESS",error_message:'',
            isValid : true
        }
    };
    case 'ALTERATION_FAILURE' : {
        return {
            ...state,
            ...action.payload,
            dataFrom: "WEB_SERVICE_ERROR",
            error_message:'',
            isValid : true
        }
    };
    case 'SALE_ALTERATION_FAILURE_REQUEST_VALIDFAILED' : {
        return {
            ...state,
            ...action.payload,
            dataFrom: "",
            error_message: action.message,
            isValid : false,
        }
    };     
    default:
        return state;
        break;
  }
}