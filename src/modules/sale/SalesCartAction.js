import axios from 'axios';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import apiURLS from '../../resources/stubs/config';
import { responseValidation } from '../common/responseValidator/responseValidation';
import { 
    ADD_ITEM_REQUEST, 
    ADD_ITEM_SUCCESS, 
    ADD_ITEM_FAILURE, 
    MAX_ITEM_REACHED,
    TRANS_DISCOUNT_APPLIED, 
    GP_PRICENOTFOUND,
    TRANS_DISCOUNT_FAIL ,
    DEFAULT_SKU,
    TD_DISCOUNTEXCEEDS
} from '../common/constants/type';
import moment from 'moment';
const config = require('../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

const env = require('../../settings/env.js');
const path = env.PATH;

export function setCurrnetItem(item) {
    return (dispatch) => {
        dispatch({
            type : 'MENU_ITEM_CHANGED',
            payload: {
                currentItem:item
            }
        })
    }
} 

export function addItemsRequest(cartInfo) {
    console.log('***cartInfo',cartInfo)
    const URL = require('../../resources/stubs/config.json').apiAddItemToCart;
    const apiAddItemToCart = path+'apiAddItemToCart.json';

    const body = {
        ...clientConfig,
        ...cartInfo
       

    }
    var header = {
		'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
	};
    const sku='';
    console.log('env.ENV_MOD', env.ENV_MODE);
    console.log('BODY', body)
    const SaleItemResponseObj = require('../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(apiAddItemToCart, {});
    return (dispatch) => {
            request.then(({data}) => {
                console.log("ACTIONS",data, Date.now());
                validated = responseValidation(data, SaleItemResponseObj);

            if (validated.isValid) {
               /* switch (data.response_text) {

                    case "AC_SUCCESS":
                        {
                            dispatch({
                                type: ADD_ITEM_REQUEST,
                                payload: data
                            });
                            break;
                        }

                        case "TD_DISCOUNTEXCEEDS":
                        {
                            dispatch({
                                type: "TD_DISCOUNTEXCEEDS",
                                payload: data
                            });
                            break;
                        }

                     default:
                        {
                            dispatch({
                                type: 'ADD_ITEM_FAILURE',
                                payload: data
                            });
                            break;
                        }
                    }*/
                if(data.response_text == "AC_SUCCESS") {
                    console.log('AC_SUCCESS');
                    dispatch({
                        type: ADD_ITEM_REQUEST,
                        payload: data
                    });
                }
                else if(data.response_text == "GP_PRICENOTFOUND"){
                    dispatch({
                        type: GP_PRICENOTFOUND,
                        payload: data
                    });
                }
                
                else if(data.response_text == "TD_DISCOUNTEXCEEDS") {
                    dispatch({
                        type: TD_DISCOUNTEXCEEDS,
                        payload: data,
                        sku:cartInfo.ItemNumber
                    });
                }           	
                else if(data.response_text == "AC_MAXITEMREACHED") {                    	
                                       dispatch({                    	
                                           type: 'MAX_ITEM_REACHED',
                    	                    payload: data
                });
                }
                else {
                    dispatch({
                        type: 'ADD_ITEM_FAILURE',
                        payload: data
                    });
                }

                
            }
            else {
                var errorMessage = validated.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../resources/stubs/config.json').timeout + 'ms';
                dispatch({
                    type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                    payload: {},
                    message: errorMessage
                });
            }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            // dispatch({
            //     type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
            //     payload: {},
            //     message: 'Exception occured during webservice call ' + URL
            // });
        }); 
        
        };
   
}

export function voidLineItemAction(item,transactionId,userpin) {
    console.log('Item in voidLineItemAction: ', item);
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    const voidLineItemURLJson = path+'voidLineItemURL.json';

    
    const voidLineItemURL = CONFIG_FILE.voidLineItemURL;
    const params = {
        //"ClientID":"0010:0168:05092018:033639",
        //"SourceApp":"MPOS",
        //"SourceLoc":"NM-DIRECT",
        //"Store":"0010",
        //"Terminal":"0168",
        //"StoreAssoc":"209289",
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "transactionId":transactionId,
        "LineNumber":item.lineNumber,
        "Quantity":"0",
        "StoreAssoc":userpin
    };
    const SaleItemResponseObj = require('../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(voidLineItemURL, params):callGetWebService(voidLineItemURLJson, {});
    
    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data, SaleItemResponseObj);
            if (validated.isValid) {
            console.log('VOIDITEM data:', data);
            if(data.response_text == "AC_SUCCESS") {
                dispatch({
                    type: 'VOID_LINE_ITEM_SUCCESS',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'VOID_LINE_ITEM_FAILURE',
                    payload: data
                });
            }
        }
            else {
                var errorMessage = validated.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../resources/stubs/config.json').timeout + 'ms';
                dispatch({
                    type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                    payload: {},
                    message: errorMessage
                });
            }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            // dispatch({
            //     type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
            //     payload: {},
            //     message: 'Exception occured during webservice call ' + voidLineItemURL
            // });
        });
    }; 
}   

export const applyTransDiscountToCart = (percent, transactionId) => {
    const apiURL = config.apiTransactionDiscount;
    const apiTransactionDiscount = path+'apiTransactionDiscount.json';
    const body= {
        ...clientConfig,
        "TransactionId": transactionId,
        "TransDiscount": percent,
        "TransDiscountFlag":"true"
        
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(apiTransactionDiscount, {});

    return (dispatch) => {
        request
            .then(({data}) => {
                console.log("ACTIONS-TransDiscount response",data);
                if(data.response_text == "IM_SUCCESS") {
                    dispatch({
                        type: 'TRANS_DISCOUNT_APPLIED',
                        payload: data
                    });
                }
                else {
                    dispatch({
                        type: 'TRANS_DISCOUNT_FAIL',
                        payload: data
                    });
                }
            })
            .catch((err) =>{
                dispatch({
                    type: 'NETWORK_ERROR_TRANSDISCOUNT'
                })
            })
    };
}

export const applyAssociateDiscountToCart = (discountPin, discountId, transactionId, userPin) => {
    const apiURL = config.apiAssociateDiscount;
    const SaleAssociateDiscountResponseObj = require('../common/responseValidator/responseDictionary').saleAssociateDiscountResponseObj;
    const apiAssociateDiscountURL = path+'apiAssociateDiscount.json';
    const body= {
        ...clientConfig,
        "StoreAssoc":(userPin !== undefined)?userPin:"",
        "TransactionId": transactionId,
        "AssociateDiscountPIN": discountPin,
        "AssociateDiscountID": discountId
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(apiAssociateDiscountURL, {});
    var validated = {
        isValid: false,
        message: ''
    }
    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data, SaleAssociateDiscountResponseObj);
            if (validated.isValid) {
            console.log("ACTIONS-AssociateDiscount response",data);
            if(data.response_text == "IM_SUCCESS") {
                dispatch({
                    type: 'TRANS_DISCOUNT_APPLIED',
                    payload: data
                });
            }
            else if(data.response_text == "IM_DISCOUNTALREADYAPPLIED") {
                dispatch({
                    type: 'ASSOCIATE_DISCOUNT_ALREADY_APPLIED',
                    payload: data
                });
            }
            else if(data.response_text == "IM_INVALIDASSOCIATEID"){
                dispatch({
                    type: 'IM_INVALIDASSOCIATEID',
                    payload: data
                });
            }
            else if(data.response_text == "IM_RINGINGASSOCIATE"){
                dispatch({
                    type: 'IM_RINGINGASSOCIATE',
                    payload: data
                });
            }
            else if(data.response_text == "IM_ASSOCIATETERMINATED"){
                dispatch({
                    type: 'IM_ASSOCIATETERMINATED',
                    payload: data
                });
            }
            else if(data.response_text == "IM_ASSOCIATENOTELIGIBLE"){
                dispatch({
                    type: 'IM_ASSOCIATENOTELIGIBLE',
                    payload: data
                });
            }
            else if(data.response_text == "IM_INVALIDASSOCIATE"){
                dispatch({
                    type: 'IM_INVALIDASSOCIATE',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'TRANS_DISCOUNT_FAIL',
                    payload: data
                });
            }
        }
        else {
            var errorMessage = validated.message + ' for web service: ' + URL + ' TimeOut Duration:' + require('../../resources/stubs/config.json').timeout + 'ms';
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {},
                message: errorMessage
            });
        }
    }).catch((err) => {
        console.log(`Error: ${err}`);
        // dispatch({
        //     type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
        //     payload: {},
        //     message: 'Exception occured during webservice call ' + voidLineItemURL
        // });
    });
    };
}


export function navigate(data) {
    
    return (dispatch) => {
        dispatch({
            type: 'NAVIGATE',
            payload: {data}
        });
    };
}
export function presaleInitialRender(data) {
    return (dispatch) => {
        dispatch({
            type: 'PRESALEINITIALRENDER',
            payload: {data}
        });
    };
}
/*Fix MPOS-2177 - starts*/
export function presaleRetainYes(data) {
    return (dispatch) => {
        dispatch({
            type: 'PRESALE_RETAIN_YES',
            payload:data
        });
    };
}
/*Fix MPOS-2177 - Ends*/
export function getPromotionsAction(transactionId,item) {
    const apiURL = config.getPromoPriceURL;
    const getPromoPriceURL =path+'getPromoPriceURL.json';
    const SalePromPriceResponseObj = require('../common/responseValidator/responseDictionary').salePromPriceResponseObj;
    console.log('selectedItem : ', item);
    var apiCallDateTime = moment(new Date(),'YYYY-MM-DD').format('YYYY/MM/DD') + " " + moment(Date.now()).local().format('hh:mm:ss');
    /* const body= {
        "ReqHeader":{
           "StoreNum":10,
           "RegisterNum":131,
           "AssociateNumber":209289,
           "TransactionNum":transactionId,
           "Epic":"Sale",
           "APICallDateTime":apiCallDateTime
        },
        "SKU":27,
        "Department":2045,
        "Class":98,
        "SubClass":98,
        "PreSale":"N"
    } */
    const body= {
        "ReqHeader":{
            "StoreNum": clientConfig.StoreNum,
            "RegisterNum": clientConfig.RegisterNum,
            "AssociateNumber": clientConfig.StoreAssoc,
            "TransactionNum":transactionId,
            "Epic":"Sale",
            "APICallDateTime":apiCallDateTime
        },
        //"TransactionItems" : [
            //{
        "SKU":item.itemNumber,
        "Department":item.department,
        "Class":item.class,
        "SubClass":item.subClass,
        "PreSale":(item.presaleFlag === true)?"Y":"N"
            //}
        //]
    }
    var validated = {isValid : false,
        message :''}
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(getPromoPriceURL, {});
 
        return (dispatch) => {
            request.then(({data}) => {
                validated = responseValidation(data,SalePromPriceResponseObj);
                  
            if(validated.isValid){
                console.log("getPromotionsAction response",data);
                if(data.response_Code == "PR_SUCCESS") {
                    dispatch({
                        type: 'GET_PROMOTIONS_SUCCESS',
                        payload: data
                    });
                }
                else {
                    dispatch({
                        type: 'GET_PROMOTIONS_FAILURE',
                        payload: data
                    });
                }
            }
            else{
                var errorMessage = validated.message + ' for web service: '+apiURL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                    payload: {  },
                    message : errorMessage
                });
            }
            }).catch((err) => {
                console.log(`Error: ${err}`);
                // dispatch({
                //     type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                //     payload: {  },
                //     message : 'Exception occured during webservice call '+apiURL
                // });
            });
        };
   
}

export function modifyPriceAction(transactionId,item,modifyValue,managerPin,calledFrom) {
    const apiURL = config.updatePriceURL;
    const updatePriceURL = path+'updatePriceURL.json';
    const body= {
        ...clientConfig,
        //"ClientTypeID":"1000",
        "transactionId": transactionId,
        "LineNumber":item.lineNumber,
        "ItemNumber":item.itemNumber,
        "ManagerPin":managerPin,
        "OverrideFlag":(managerPin !== '')?true:false
    }
    if(calledFrom === "Price : Mkd % Off") {
        body.MkdPercentageValue = modifyValue;
    }
    else if(calledFrom === "Price : Mkd $ Off") {
        body.MkdDollarValue = modifyValue;
    }
    else if(calledFrom === "Price : Price Override") {
        body.PriceOverrideValue = modifyValue;
    }
    else if(calledFrom === "Price : Mkd New Price") {
        body.MkdNewPriceValue = modifyValue;
    }
    else if(calledFrom === "Price : Omni Mkd % Off") {
        body.OmniPercentageValue = modifyValue;
    }
    else if(calledFrom === "Price : Omni Mkd $ Off") {
        body.OmniDollarValue = modifyValue;
    }
    else if(calledFrom === "Price : Omni Mkd New Price") {
        body.OmniNewPriceValue = modifyValue;
    }
    const SaleItemResponseObj = require('../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(updatePriceURL, {});

    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data,SaleItemResponseObj);
            if(validated.isValid){
            console.log("modifyPriceAction response",data);
            if(data.response_text == "AC_SUCCESS") {
                dispatch({
                    type: 'MODIFY_PRICE_SUCCESS',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'MODIFY_PRICE_FAILURE',
                    payload: data
                });
            }
        }
        else{
            var errorMessage = validated.message + ' for web service: '+apiURL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
            dispatch({
                type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
                payload: {  },
                message : errorMessage
            });
        }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            // dispatch({
            //     type: 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED',
            //     payload: {  },
            //     message : 'Exception occured during webservice call '+ apiURL
            // });
        });
    };
}

export function modifyTaxAuthAction(transactionId,modifyValue,userpin) {
    const apiURL = config.updateTaxAuthURL;

    const body= {
        ...clientConfig,
        //"ClientTypeID":"1000",
        "transactionId": transactionId,
        "AuthCode":modifyValue,
        "StoreAssoc":userpin
    }
    const SaleItemTaxResponseObj = require('../common/responseValidator/responseDictionary').saleItemTaxResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = callPostWebService(apiURL, body)

    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data,SaleItemTaxResponseObj);
            if(validated.isValid){
            if(data.response_text == "AC_SUCCESS") {
                dispatch({
                    type: 'TAX_AUTH_SUCCESS',
                    payload: data
                });               
            }
            else if(data.response_text == "AC_FAIL") {
                dispatch({
                    type: 'TAX_AUTH_FAIL',
                    payload: data
                });
            }
        }
        else{
            var errorMessage = validated.message + ' for web service: '+apiURL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
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
                message : 'Exception occured during webservice call '+ apiURL
            });
        });
    };
}

export function modifyTaxAction(transactionId,item,modifyValue,userpin) {
    const apiURL = config.updateTaxURL;
    const body= {
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "transactionId":transactionId,
        "LineNumber":item.lineNumber,
        "TaxOverrideOption":"3",
        "TaxOverrideValue":item.itemTax?"0":"1",
        "AuthCode":modifyValue,
        "StoreAssoc":userpin
        
    }
    const SaleItemResponseObj = require('../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = callPostWebService(apiURL, body)

    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data,SaleItemResponseObj);
            if(validated.isValid){
            if(data.response_text == "IM_SUCCESS") {
                dispatch({
                    type: 'TAX_MODIFY_UPDATE_SUCCESS',
                    payload: data
                });               
            }
            else if(data.response_text == "AC_FAIL") {
                dispatch({
                    type: 'TAX_AUTH_FAIL',
                    payload: data
                });
            }
        }
        else{
            var errorMessage = validated.message + ' for web service: '+apiURL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
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
                message : 'Exception occured during webservice call '+ apiURL
            });
        });
    };
}

export function clearCart()
{
    
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CART',
            payload: {}
        });
    };
}

/**get default SKU API */
export function getDefaultSKU(obj) {
    const URL = require('../../resources/stubs/config.json').getDefaultSKU;
    const getDefaultSKU = path+'getDefaultSKU.json';

    const body = {
        ...obj,
        ...clientConfig
    }
    const sku='';
    const SaleDefaultSKUResponseObj = require('../common/responseValidator/responseDictionary').saleDefaultSKUResponseObj;
    var validated = {
        isValid: false,
        message: ''
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getDefaultSKU, {});
        return (dispatch) => {
            request.then(({data}) => {
                console.log("ACTIONS",data, Date.now());
                validated = responseValidation(data,SaleDefaultSKUResponseObj);
            if(validated.isValid){
                if(data.response_text == "IM_SUCCESS") {
                    dispatch({
                        type: DEFAULT_SKU,
                        payload: data
                    });
                }
                else if(data.response_text == "IM_ITEMNOTFOUND") {
                    dispatch({
                        type: 'IM_ITEMNOTFOUND',
                        payload: data
                    });
                }
                else if(data.response_text == "IM_SKUNOTFOUND") {
                    dispatch({
                        type: 'IM_SKUNOTFOUND',
                        payload: data
                    });
                }
                else
                {
                    dispatch({
                        type: 'IM_INVALIDREQUEST',
                        payload: data
                    });
                    
                }
            }
            else{
                var errorMessage = validated.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
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


export function clearDefaultSku(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_DEFAULT_SKU',
            payload: {}
        });
};
}
export function clearDataFrom(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_DATA_FROM',
            payload: {}
        });
};
}


export function clearInvalidSkuId(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_INVALID_SKU-ID',
            payload: {}
        });
};
}

export function validateManagerPinAction(managerPin,checkLoggedInUserFlag) {
    const URL = require('../../resources/stubs/config.json').validateManagerPinURL;
    const validateManagerPin = path+'validateManagerPin.json';

    const body = {
        ...clientConfig,
        "AssocID" : managerPin.toString()
    }
    const sku='';
    const SaleManagerPinResponseObj = require('../common/responseValidator/responseDictionary').saleManagerPinResponseObj;
    var validated = {isValid : false,
        message :''}
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(validateManagerPin, {});
    return (dispatch) => {
        request.then(({data}) => {
            validated = responseValidation(data,SaleManagerPinResponseObj);
            if(validated.isValid){
            if(checkLoggedInUserFlag === true) {
                dispatch({
                    type: 'LOGGED_IN_PIN_VALIDATE_RESPONSE',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'MANAGER_PIN_VALIDATE_RESPONSE',
                    payload: data
                });
            }           
        }
        else{
            var errorMessage = validated.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
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