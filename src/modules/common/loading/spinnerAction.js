import { START_SPINNER } from '../constants/type';
import { callPostWebService, callGetWebService } from '../helpers/helpers';

export function startSpinner(data){
    return (dispatch) => {
            dispatch( {
                type: START_SPINNER,
                payload: data
            });
    };
}