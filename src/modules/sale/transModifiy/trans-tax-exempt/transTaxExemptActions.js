import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
const config = require('../../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiTransTaxExempt+'?regID=0216';


const env = require('../../../../settings/env.js');
const path = env.PATH;
const apiTransTaxExempt = path+'apiTransTaxExempt.json';

export function transTaxExemptUpdate(item,transactionId,transtaxexempt){
    
    const params = {
        ...clientConfig,
        // "ItemNumber":item.itemNumber,
        "TransactionId":transactionId,
        // "LineNumber":item.lineNumber,
        "TaxExemptID":transtaxexempt
    };
    console.log("****** IN ACTION ", params);
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiTransTaxExempt, params);
    
    
    return (dispatch) => {
        request.then((data) => {
            console.log('transTaxExempt data:', data);
            if(data.data.response_text == "UC_SUCCESS") {
                dispatch({
                    type: 'TRANS_TAX_EXEMPT_REQUEST_SUCCESS',
                    payload: data
                });
            }
            
            else {
                dispatch({
                    type: 'TRANS_TAX_EXEMPT_REQUEST_FAILURE',
                    payload: data
                });
            }
        });
        
    };
}