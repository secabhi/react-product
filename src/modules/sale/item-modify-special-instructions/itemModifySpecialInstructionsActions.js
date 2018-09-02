import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { responseValidation } from '../../common/responseValidator/responseValidation';
const config = require('../../../resources/stubs/config.json');

const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

//sets url to be used for api call
const URL = CONFIG_FILE.apiItemModifySpecialInstructions;


const env = require('../../../settings/env.js');
const path = env.PATH;
const apiItemModifySpecialInstructions = path+'apiItemModifySpecialInstructions.json';

export function itemModifySpecialInstructionsUpdate(item,transactionId,specialInstructions,userpin){
    
    const params = {
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "TransactionId":transactionId,
        "LineNumber":item.lineNumber,
        "SpecialInstructions":specialInstructions,
        "StoreAssoc":userpin
    };
    console.log("****** IN ACTION ", params);
    var validated = {
        isValid: false,
        message: ''
    }
    const SaleItemResponseObj = require('../../common/responseValidator/responseDictionary').saleItemResponseObj;
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiItemModifySpecialInstructions, {});
    
    
    return (dispatch) => {
        request.then((data) => {
            validated = responseValidation(data.data, SaleItemResponseObj);
            if (validated.isValid) {
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
        }
        else {
            var errorMessage = validated.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../../resources/stubs/config.json').timeout + 'ms';
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {},
                message: errorMessage
            });
        }

    }).catch((err) => {
        dispatch({
            type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
            payload: {},
            message: 'Exception occured during webservice call ' + URL
        });

    });
    };
}