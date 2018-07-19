import { OPTION_SEVEN_SEND } from '../../../common/constants/type';

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

        default:
            return state;
    }
}