import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import { responseValidation } from '../common/responseValidator/responseValidation';

const config = require('../../resources/stubs/config.json');
const clientConfig = config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiResumeSelect;


const env = require('../../settings/env.js');
const path = env.PATH;
const apiResumeEntry = path + 'apiResumeEntry.json';

export function openResumeSelectAction(userPin) {
    const params = {
        ...clientConfig,
        // "ClientID": "0010:0501:06082018:033639",
        // "SourceApp": "MPOS",
        // "SourceLoc": "NM-DIRECT",
        // "Store": "0010",
        // "Terminal": "0501",
         "StoreAssoc": userPin,
    }

    console.log("****** IN ACTION ", params);
    const request = env.ENV_MODE == 'dev1' ? callPostWebService(URL, params) : callGetWebService(apiResumeEntry, {});

    // Error Handling 
    const resumeSelectTransResponseObj = require('../common/responseValidator/responseDictionary').resumeSelectTransResponseObj;
    var validate = { isValid: false, message: '' }
    // Error Handling 

    return (dispatch) => {
        request.then(({data
}) => {

        validate = responseValidation(data, resumeSelectTransResponseObj);
        if (validate.isValid) {
            console.log("&*&^&^&**", data);
            switch (data.response_text) {

                case "SL_SUCCESS":
                    {
                        console.log('sl success ********');
                        dispatch({
                            type: 'SUSPENDED_TRANSACTION_LIST_FETCH_SUCCESS',
                            payload: data
                        });
                        break;
                    }

                case "SL_NOVALUES":
                    {
                        dispatch({
                            type: 'SUSPENDED_TRANSACTION_LIST_FETCH_FAILURE',
                            payload: 'Selection List not available'
                        });
                        break;
                    }
                default:
          
                    console.log('response default ', data.response_text)

            }
        }
        else {
            var errorMessage = validate.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../resources/stubs/config.json').timeout + 'ms';
            dispatch({
                type: 'RESUME_SELECT_TRANS_REQUEST_VALIDFAILED',
                payload: data,
                message: errorMessage
            });
        }

        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'RESUME_SELECT_TRANS_REQUEST_VALIDFAILED',
                payload: {},
                message: 'Exception occured during webservice call ' + URL
            });
        });
    }
}
