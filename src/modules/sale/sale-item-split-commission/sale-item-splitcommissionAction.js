import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { startSpinner } from '../../common/loading/spinnerAction';
//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;


const env = require('../../../settings/env.js');
const path = env.PATH;
const splitcommissionauthentication = path+'splitcommissionauthentication.json';

//sets url to be used for api call
const URL = CONFIG_FILE.splitcommissionauthentication;
const getURL = CONFIG_FILE.getReplenishData;

export function updateSplitCommissionData(userPin1,userPin2,index,transactionId,IsTransModify){
  




    const params = {
        ...clientConfig,
        "LineNumber": (IsTransModify === true)?undefined:index.lineNumber,
        "TransactionId":transactionId,
        "IsTransModify" : IsTransModify,
        "SKU":(IsTransModify === true)?undefined:index.itemNumber,
        "pin1" : userPin1,
        "pin2" : userPin2
           
    };
    const request =env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(splitcommissionauthentication, {}); //DEFINING THE REQUEST

    console.log(params);
    return (dispatch) => {
        console.log("inside action1");
        console.log(userPin1);
        console.log("inside action2");
      
         request.then((data) => { //REQUEST CALL
            
            if(data.data.response_text == "SC_SUCCESS") {
                dispatch({
                    type: 'SPLIT_COMMISSION_REQUEST_SUCCESS',
                    payload: data
                });
                dispatch(startSpinner(false));
            }
        }).catch((err) => {
            dispatch(startSpinner(false));
            dispatch({
                    type: 'SPLIT_COMMISSION_REQUEST_FAILURE',
                });
        });

        request.catch(function (error) {
            if(JSON.stringify(error.response.status) == "422"){
                dispatch({
                    type: 'SPLIT_COMMISSION_PIN2_VALIDATION_FAIL',
                    payload: error
                });
            }
       });
    };    
}


