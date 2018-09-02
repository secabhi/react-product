import { LOGIN_REQUEST, SEND_USERPIN, CHANGE_PASSWORD_REQUEST, CLEAR_REQUEST } from '../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import {responseValidation} from '../../common/responseValidator/responseValidation';


//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiResetPassword;
const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;
// const tempURL = 'https://jsonplaceholder.typicode.com/users';

//calls api to compare passwords during Login event. 
// export function changePasswordRequest(params){

//     const request = callPostWebService(URL, params);
//     console.log("Parameters being sent", params);
    
//     return (dispatch) => {
//         request.then(({data}) => {
//             dispatch( {
//                 type: CHANGE_PASSWORD_REQUEST,
//                 payload: data
//             });
//         });
//     };
// }

export function resetPassword(params) {
    let resetRequest = {

        "ReqHeader": {
            // ...clientConfig,
            "StoreNum": clientConfig.StoreNum,
            "RegisterNum": clientConfig.RegisterNum,
            "AssociateNumber": params.RequestParams.Upin,
            "TransactionNum": params.RequestParams.TransactionNum,
            "Epic": "Auth",
            "APICallDateTime": ""
        },
        "AssocPin": params.RequestParams.Upin,
        "Password": params.RequestParams.Upass,
        "NewPassword": params.RequestParams.UNewPwd

    };


    const request = callPostWebService(URL, resetRequest);

    const changePswdResponseObj = require('../../common/responseValidator/responseDictionary').changePswdResponseObj;
    var validate = {isValid : false, message :''}

    return (dispatch) => {
        request.then(({ data }) => {
            validate = responseValidation(data, changePswdResponseObj);
            if(validate.isValid){ 
                dispatch({
                    type: CHANGE_PASSWORD_REQUEST,
                    payload: { data: data, userpin: params.RequestParams.Upin }
                });
            }
            else {
                var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'CHANGE_PASSWORD_FAILED', 
                    payload: {},
                    message : errorMessage
                });
            }
        }).catch((err) => {
            dispatch({
                type: 'REQUEST_FAILED', 
                payload: err,
                message: 'Exception occured during webservice call '+ URL
            });
        })
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
