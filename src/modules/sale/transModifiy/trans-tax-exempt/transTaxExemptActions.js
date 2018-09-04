import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
import { responseValidation } from '../../../common/responseValidator/responseValidation';
const config = require('../../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiTransTaxExempt+'?regID=0503';
//const URL = CONFIG_FILE.apiTransTaxExempt+'?regID=CONFIG_FILE.clientConfig.Terminal';

const env = require('../../../../settings/env.js');
const path = env.PATH;
const apiTransTaxExempt = path+'apiTransTaxExempt.json';

export function transTaxExemptUpdate(item,transactionId,transtaxexempt,userpin){
    
    const params = {
        ...clientConfig,
        // "ItemNumber":item.itemNumber,
        "TransactionId":transactionId,
        // "LineNumber":item.lineNumber,
        "TaxExemptID":transtaxexempt,
        "StoreAssoc":userpin
    };
    console.log("****** IN ACTION ", params);
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiTransTaxExempt, params);
    const SaleItemResponseObj = require('../../../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {isValid : false,
                    message :''}
    
    return (dispatch) => {
        request.then((data) => { validated = responseValidation(data.data,SaleItemResponseObj);
            //debugger;
      if(validated.isValid){
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
        }
        else{
            var errorMessage = validated.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../../../resources/stubs/config.json').timeout+'ms';
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {  },
                message : errorMessage
            });
        }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {  },
                message : 'Exception occured during webservice call '+ URL
            });
        });
        
    };
}