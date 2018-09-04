import { callPostWebService, callGetWebService } from '../helpers/helpers';

export function showException(data){
   //debugger;
    return (dispatch) => {
            dispatch( {
                type: 'SHOW_EXCEPTION',
                payload: data
            });
    };
}