import { LOGIN_REQUEST, SEND_USERPIN, CHANGE_PASSWORD_REQUEST, CLEAR_REQUEST } from '../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiAddressLogin;

// const tempURL = 'https://jsonplaceholder.typicode.com/users';

//calls api to compare passwords during Login event. 
export function changePasswordRequest(params){

    const request = callPostWebService(URL, params);
    console.log("Parameters being sent", params);
    
    return (dispatch) => {
        request.then(({data}) => {
            dispatch( {
                type: CHANGE_PASSWORD_REQUEST,
                payload: data
            });
        });
    };
}

export function clearState(params){
    console.log("Parameters being sent", params);
    
    return (dispatch) => {
        dispatch( {
            type: CLEAR_REQUEST,
            payload: params
        });
    };
}
