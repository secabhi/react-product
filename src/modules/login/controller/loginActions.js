import { LOGIN_REQUEST, SEND_USERPIN, CLEAR_REQUEST } from '../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiAddressLogin;

const tempURL = 'https://jsonplaceholder.typicode.com/users';

//calls api to compare passwords during Login event. 
export function loginRequest(params){
    const request = callPostWebService(URL, params);
    console.log("Parameters being sent", params);

    //const tempRequest = callGetWebService(tempURL);
    
    return (dispatch) => {
        request.then(({data}) => {
            dispatch( {
                type: LOGIN_REQUEST,
                payload: { data: data, userpin: params.RequestParams.Upin}
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

export function sendUserPin(params){
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