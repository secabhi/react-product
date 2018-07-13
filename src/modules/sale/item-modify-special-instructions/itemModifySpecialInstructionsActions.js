import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiItemModifySpecialInstructions;


const env = require('../../../settings/env.js');
const path = env.PATH;
const apiItemModifySpecialInstructions = path+'apiItemModifySpecialInstructions.json';

export function itemModifySpecialInstructionsUpdate(item,transactionId,specialInstructions){
    
    const params = {
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "TransactionId":transactionId,
        "LineNumber":item.lineNumber,
        "SpecialInstructions":specialInstructions
    };
    console.log("****** IN ACTION ", params);
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiItemModifySpecialInstructions, {});
    
    
    return (dispatch) => {
        request.then((data) => {
            console.log('ModifySpecialInstructions data:', data);
            if(data.data.response_text == "IM_SUCCESS") {
                dispatch({
                    type: 'MODIFY_SPECIAL_INSTRUCTIONS_REQUEST_SUCCESS',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'MODIFY_SPECIAL_INSTRUCTIONS_REQUEST_FAILURE',
                    payload: data
                });
            }
        });
        
    };
}