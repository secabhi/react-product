import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../../common/constants/type";

const initialStateAlterationReducer = {

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
            dataFrom: "ALTERATION_SUCCESS"
        }
    };
    case 'ALTERATION_FAILURE' : {
        return {
            ...state,
            ...action.payload,
            dataFrom: "WEB_SERVICE_ERROR"
        }
    };   
    default:
        return state;
        break;
  }
}