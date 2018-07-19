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
        request.then(({
                data
            }) => {
               switch (data.response_text) {

                    case "SC_SUCCESS":
                        {
                            dispatch({
                                type: 'SPLIT_COMMISSION_REQUEST_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        case "SC_INVALIDPINS":
                        {
                            dispatch({
                                type: 'SC_INVALIDPINS',
                                payload: data
                            });
                            break;
                        }
                        case "SC_INVALIDPIN1":
                        {
                            dispatch({
                                type: 'SC_INVALIDPIN1',
                                payload: data
                            });
                            break;
                        }
                        case "SC_INVALIDPIN2":
                        {
                            dispatch({
                                type: 'SC_INVALIDPIN2',
                                payload: data
                            });
                            break;
                        }
                        case "SC_SAMEPINS":
                        {
                            dispatch({
                                type: 'SC_SAMEPINS',
                                payload: data
                            });
                            break;
                        }
                        case "SC_PIN1MAND":
                        {
                            dispatch({
                                type: 'SC_PIN1MAND',
                                payload: data
                            });
                            break;
                        }
                        case "SC_FAILURE":
                        {
                            dispatch({
                                type: 'SC_FAILURE',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'PV_RESP_DEFAULT',
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'SPLIT_COMMISSION_PIN2_VALIDATION_FAIL',
                    payload: error
                });
            });
    };
}


