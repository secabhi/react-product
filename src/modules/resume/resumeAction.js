import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import { responseValidation } from '../common/responseValidator/responseValidation';

const config = require('../../resources/stubs/config.json');
const clientConfig = config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiResumeEntry;


const env = require('../../settings/env.js');
const path = env.PATH;
const apiResumeEntry = path + 'apiResumeEntry.json';


export function resumeEntryUpdateAction(resumeEntry, userPin) {
    console.log('***resumeEntryUpdateAction', resumeEntry, userPin);
    const params = {
        ...clientConfig,
        // "TransactionId":resumeEntry
        // "ClientId":"0006:00501:07112018:033639",
        // "SourceApp":"MPOS",
        // "SourceLoc":"NM-DIRECT",
        // "Store":"0006",
        // "Terminal":"0501",
        "StoreAssoc": userPin,
        "TransactionId": "",
        "resumeNumber": resumeEntry

    };
    console.log("****** IN ACTION ", params);
    const request = env.ENV_MODE == 'dev1' ? callPostWebService(URL, params) : callGetWebService(apiResumeEntry, {});

    // Error Handling 
    const resumeResponseObj = require('../common/responseValidator/responseDictionary').resumeResponseObj;
    var validate = { isValid: false, message: '' }
    // Error Handling 

    return (dispatch) => {
        request.then((data) => {

            validate = responseValidation(data.data, resumeResponseObj);
            console.log("new validate", validate);
            if (validate.isValid) {
                console.log('Resume Entry data:', data);
                if (data.data.response_text == "IM_SUCCESS") {
                    dispatch({
                        type: 'RESUME_ENTRY_REQUEST_SUCCESS',
                        payload: data.data
                    });
                }
                else if (data.data.response_text == "IM_ITEMNOTFOUND") {
                    dispatch({
                        type: 'RESUME_ENTRY_REQUEST_FAILURE',
                        payload: 'Selection List not available'
                    });
                }
                else if (data.data.response_text == "IM_INVALIDREQUEST") {
                    dispatch({
                        type: 'RESUME_ENTRY_REQUEST_FAILURE',
                        payload: 'Data Entered is not valid'
                    });
                }
                else {
                    dispatch({
                        type: 'RESUME_ENTRY_REQUEST_FAILURE',
                        payload: data
                    });
                }

            }
            else {
                var errorMessage = validate.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../resources/stubs/config.json').timeout + 'ms';
                dispatch({
                    type: 'RESUME_REQUEST_VALIDFAILED',
                    payload: data,
                    message: errorMessage
                });
            }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'RESUME_REQUEST_VALIDFAILED',
                payload: {},
                message: 'Exception occured during webservice call ' + URL
            });
        });

    };
}
export  function  ResumeclearIsValid() {
    return  (dispatch)  =>  {
        dispatch({
            type:  'RESUME_CLEAR_TRANSLIST_IS_VALID',
            payload:  ''
        });
    }
} 