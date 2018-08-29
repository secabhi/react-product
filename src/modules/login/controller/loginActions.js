import { LOGIN_REQUEST, SEND_USERPIN, CLEAR_REQUEST } from '../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import {loginResponseValidation} from './loginValidation';
import {responseValidation} from '../../common/responseValidator/responseValidation';
import message from 'material-ui/svg-icons/communication/message';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;
//sets url to be used for api call
const URL = CONFIG_FILE.apiAddressLogin;

const tempURL = 'https://jsonplaceholder.typicode.com/users';

//calls api to compare passwords during Login event. 
export function loginRequest(params) {
    let loginRequest = {
        "ReqHeader": {
            "StoreNum": CONFIG_FILE.clientConfig.Store,
            "RegisterNum": CONFIG_FILE.clientConfig.Register,
            "AssociateNumber": params.RequestParams.Upin,
            "TransactionNum": params.RequestParams.TransactionNum,
            "Epic": "",
            "APICallDateTime": ""
        },
        "AssocPin": params.RequestParams.Upin,
        "Password": params.RequestParams.Upass
    };
    const request = callPostWebService(URL, loginRequest);
    const loginResponseObj = require('../../common/responseValidator/responseDictionary').loginResponseObj;
    var validate = {isValid : false,
                    message :''}

    return (dispatch) => {
        request.then(({ data }) => {
            // added for response validation
           validate = responseValidation(data,loginResponseObj);         
            if(validate.isValid)
              {
                    dispatch({
                    type: LOGIN_REQUEST,
                    payload: { data: data, userpin: params.RequestParams.Upin }
              });
            }
            else{
                var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'LOGIN_REQUEST_VALIDFAILED',
                    payload: { data: data, userpin: params.RequestParams.Upin },
                    message : errorMessage
                });
            }
        
    });
}
}

export function clearState(params) {
    console.log("Parameters being sent", params);

    return (dispatch) => {
        dispatch({
            type: CLEAR_REQUEST,
            payload: params
        });
    };
}

export function sendUserPin(params) {
    console.log("User data being sent", params);

    //const tempRequest = callGetWebService(tempURL);

    return (dispatch) => {
        dispatch({
            type: SEND_USERPIN,
            payload: params
        });
    };
}


// export function getLoginSuccess() ({
//     type: GET_LOGIN_SUCCESS,
//     // payload: {flag}
// });



// export function comparePassword(){
//     console.log("before call", this.url)

//     return callPostWebService("http://localhost:1337/10.240.14.51:81/api/master", this.params)
//     .then(function(response) {
//         const resData = response.data.Output;
//         console.log("resData",resData.data.Output);
//         this.setState({testData:resData});

//     })
//     .catch(
//         function(err) {return err;}
//     );

//     console.log(this.state.testData)
// }


// export const getLoginError = error =>({
//     type: GET_LOGIN_ERROR
// });