import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const env = require('../../../settings/env.js');
const path = env.PATH;
const apiSaleItemModifyQuantity = path+'apiSaleItemModifyQuantity.json';

//sets url to be used for api call
const URL = CONFIG_FILE.apiSaleItemModifyQuantity;

export function saleitemModifyQuantityUpdate(item,transactionId,quantity){
    
    const params = {
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "TransactionId":transactionId,
        "LineNumber":item.lineNumber,
        "Quantity":quantity
    };
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiSaleItemModifyQuantity, {});
    
    console.log("saleitemModifyQuantityUpdate Parameters being sent", params);
    
    return (dispatch) => {

        request.then((data) => {
            console.log('QuantityUpdate data:', data);
            if(data.data.response_text == "AC_SUCCESS") {
                dispatch({
                    type: 'MODIFY_QUANTITY_UPDATE_REQUEST_SUCCESS',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'MODIFY_QUANTITY_UPDATE_FAILURE',
                    payload: data
                });
            }
        });
    };
}