import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import {responseValidation} from '../../common/responseValidator/responseValidation';
import axios from 'axios';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const env = require('../../../settings/env.js');
const path = env.PATH;
const giftReceiptdataURL = path+'giftReceiptURL.json';
var clientConfig = CONFIG_FILE.clientConfig;


//Object.freeze(giftReceiptdata);
//var giftReceiptdata = Object.freeze(giftReceiptdata1);
//sets url to be used for api call
const URL = CONFIG_FILE.giftReceiptURL;


export function saleitemGiftReceiptUpdate(item,transactionId,modify_type,userPin,index){
    console.log('modify type in action'+modify_type);
    console.log('line number'+JSON.stringify(item));
    console.log('line number'+item.itemNumber);
    let shouldModifyVal = '';
    if(modify_type=='item')
    {
        item=item[0];
        shouldModifyVal = item .print_GWGR_Msg;
    }
    else{
        item=item;
    }
    const params = {
    ...clientConfig,
	"StoreAssoc":userPin,
	"TransactionId":transactionId,
	"LineNumber": modify_type=='item'?item.lineNumber:undefined,
	"SKU": modify_type=='item'?item.itemNumber:undefined,
	"IsTransModify": modify_type=='item'?"false":"true",
    };
    var validated = {isValid : false,
        message :''}
    const SaleItemResponseObj = require('../../common/responseValidator/responseDictionary').saleItemResponseObj;
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(giftReceiptdataURL,{});
      
    console.log("saleitemGiftReceiptUpdate Parameters being sent", params);
    
    return (dispatch) => {
        console.log('content'+env.ENV_MODE)
         request.then(({data}) => {
            validated = responseValidation(data,SaleItemResponseObj);             
            if(validated.isValid){
            console.log('response data'+JSON.stringify(data));
            if(modify_type == 'item' && data.cartItems.items[index].print_GWGR_Msg === shouldModifyVal){
                data.cartItems.items[index].print_GWGR_Msg = null;
            }
            if(data.response_text == "IM_SUCCESS") {
                
                dispatch({
                    type: 'GIFTRECEIPTUPDATE_REQUEST',
                    payload: data
                });
            }
            else {
                console.log('receipt data'+JSON.stringify(data));
                console.log('gift reducer action triggered');
                dispatch( {
                    
                    type: 'GIFTRECEIPTUPDATE_REQUEST',
                    payload: data
                   
                    
                });
            }
        }
        else{
            var errorMessage = validated.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../../resources/stubs/config.json').timeout+'ms';
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {  },
                message : errorMessage
            });
        }
           
        }).catch((err) => {
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {  },
                message : 'Exception occured during webservice call '+ URL
            });
        }); 
   
        
    };
}