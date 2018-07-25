import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
const config = require('../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiResumeSelect;


const env = require('../../settings/env.js');
const path = env.PATH;
const apiResumeEntry = path+'apiResumeEntry.json';

export function openResumeSelectAction(){
    const params = {
        "ClientID": "0010:0216:06082018:033639",
        "SourceApp": "MPOS",
        "SourceLoc": "NM-DIRECT",
        "Store": "0010",
        "Terminal": "0216",
        "StoreAssoc": "209289",
    }
      
    console.log("****** IN ACTION ", params);
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiResumeEntry, {});
    return (dispatch) => {
    request.then(({
        data
    }) => {
        console.log("&*&^&^&**",data);
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
                        payload: data
                    });
                    break;
                }
            default:
            console.log('response default ',data.response_text)

        }
    })
}
}
