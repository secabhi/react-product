import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
const config = require('../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiResumeEntry;


const env = require('../../settings/env.js');
const path = env.PATH;
const apiResumeEntry = path+'apiResumeEntry.json';

export function resumeEntryUpdateAction(resumeEntry){
    const params = {
        // ...clientConfig,
        // "TransactionId":resumeEntry
        "ClientId":"0101:0243:07112018:033639",
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0010",
        "Terminal":"168",
        "StoreAssoc":209289,
        "TransactionId":"00003"

    };
    console.log("****** IN ACTION ", params);
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiResumeEntry, {});
    
    
    return (dispatch) => {
        request.then((data) => {
            console.log('Resume Entry data:', data);
            if(data.data.response_text == "IM_SUCCESS") {
                dispatch({
                    type: 'RESUME_ENTRY_REQUEST_SUCCESS',
                    payload: data.data
                });
            }
            else {
                dispatch({
                    type: 'RESUME_ENTRY_REQUEST_FAILURE',
                    payload: data
                });
            }
        });
        
    };
}