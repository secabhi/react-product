import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../../common/constants/type";

export default (state = false, action) => {
  switch (action.type) {
    case ADD_ALTERATIONS:
        return true;
        break;

    case RESET_ALTERATION:
        return false;
        break;
           
    default:
        return state;
        break;
  }
}   


export const AlterationDetailsReducer = (state = undefined, action) => {
    switch(action.type) {
        case 'SET_ALTERATION_DETAILS':
            return {
                ...state,
                payload: action.payload
            }
    }
}