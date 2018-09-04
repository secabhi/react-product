import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { responseValidation } from '../../common/responseValidator/responseValidation';
//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');

const env = require('../../../settings/env.js');
const path = env.PATH;
const ReplenishItem = path+'ReplenishItem.json';
const clientConfig= CONFIG_FILE.clientConfig;

//sets url to be used for api call
const URL = CONFIG_FILE.ReplenishItem;
const getURL = CONFIG_FILE.getReplenishData;
export function updateReplishmentData(daysValue,description,index,transactionId,userpin){
    
    const params = {

        
        ...clientConfig,
        "ItemNumber": index[0].itemNumber,
        "LineNumber": index[0].lineNumber,
        "TransactionId": transactionId,
        "ReplenishDescription": description,
        "ReplenishQty": 1,
        "ReplenishDays": daysValue,
        "ClientNumber":1000275767,
        "ReplenishNumber": "0001000000082",
        "StoreAssoc":userpin
    };

    var validated = {
        isValid: false,
        message: ''
    }
    const SaleItemResponseObj = require('../../common/responseValidator/responseDictionary').saleItemResponseObj;
   
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(ReplenishItem, {});
    
    return (dispatch) => {
        request.then(({
                data
            }) => {
                validated = responseValidation(data, SaleItemResponseObj);
                if (validated.isValid) {
               switch (data.response_text) {

                    case "IM_SUCCESS":
                        {
                            dispatch({
                                type: 'REPLENISH_ITEM_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'REPLENISH_FAIL',
                                payload: data
                            });
                            break;
                        }
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

        });/*
            .catch(error => {
                dispatch({
                    type: 'REPLENISH_FAIL',
                    payload: error
                });
            });*/
    };
    
}


export function getReplenishment(userpin, index){
    const params = {
        "AssociateNumber": userpin,
        "PIMSKUID":index.pim_SKU_ID,
        "ClientNumber":"0001000360908"    
       } 
       
    const request = callPostWebService(getURL, params);
   
    return (dispatch) => {
        request.then(({
                data
            }) => {
               switch (data.response_text) {

                    case "RP_SUCCESS":
                        {
                            dispatch({
                                type: 'GETREPLENISH_ITEM_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'RP_FAIL',
                                payload: data
                            });
                            break;
                        } 
                }
            })
            .catch(error => {
                dispatch({
                    type: 'RP_FAIL',
                    payload: error
                });
            });
    };
    
}