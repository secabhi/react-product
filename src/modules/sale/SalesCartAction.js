import axios from 'axios';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import apiURLS from '../../resources/stubs/config';
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
    const URL = require('../../resources/stubs/config.json').apiAddItemToCart;
    const apiAddItemToCart = path+'apiAddItemToCart.json';

    const body = {
        ...cartInfo,
        ...clientConfig
        
    }
    var header = {
		'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
	};
    const sku='';
    console.log('env.ENV_MOD', env.ENV_MODE);
    console.log('BODY', body)
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(apiAddItemToCart, {});
    return (dispatch) => {
            request.then(({data}) => {
                console.log("ACTIONS",data, Date.now());
                
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

                
            });
        
        };
   
}

export function voidLineItemAction(item,transactionId) {
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
        "Quantity":"0"
    };
    const request = env.ENV_MODE=='dev1'?callPostWebService(voidLineItemURL, params):callGetWebService(voidLineItemURLJson, {});
    
    return (dispatch) => {
        request.then(({data}) => {
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
        });
    }; 
}

export function priceActions(modifyprice)
{
    const URL = require('../../resources/stubs/config.json').apiUpdateItemToCart;
    var params = modifyprice;
    const apiUpdateItemToCart = path+'apiUpdateItemToCart.json';


    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, params):callGetWebService(apiUpdateItemToCart, {});
    return (dispatch) => {
        request.then(({
                data
            }) => {
                console.log(data.response_code);
                switch (data.response_text) {

                    case "AC_SUCCESS":
                        {
                            dispatch({
                                type: 'UPDATE_PRICE_SUCESS',
                                payload: data
                            });
                            break;
                        }

                    case "AC_GENERALERROR":
                        {
                            dispatch({
                                type: 'MKD_PERCNT_VALUE_GENERALERROR',
                                payload: data
                            });
                            break;
                        }

                    case "AC_VOIDITEM":
                        {
                            dispatch({
                                type: 'ITEAM_REMOVED',
                                payload: data
                            });
                            break;
                        }

                    case "AC_MISSINGDETAILS":
                        {
                            dispatch({
                                type: 'iTEAM_OR_STORE_OR_CLIENT_OR_LINE_NUMBER_MISSING',
                                payload: data
                            });
                            break;
                        }

                    case "AC_INVALIDINPUT":
                        {
                            dispatch({
                                type: 'QUANTITY_NULL_OR_EMPTY',
                                payload: data
                            });
                            break;
                        }
                        
                        case "AC_TRANSFILENOTEXIST":
                        {
                            dispatch({
                                type: 'TRANSCATION_FILE_NOT_EXITS_WEB_CONFIG',
                                payload: data
                            });
                            break;
                        }

                        case "AC_INVALIDQUANTITY":
                        {
                            dispatch({
                                type: 'QUANTITY_MORETHAN_9999',
                                payload: data
                            });
                            break;
                        }

                        case "AC_SAMEQUANTITY":
                        {
                            dispatch({
                                type: 'QUANTITY_SAME_NUMBER',
                                payload: data
                            });
                            break;
                        }

                        case "AC_INVALIDITEM":
                        {   
                            dispatch({
                                type: 'UPDATE_INVALIDITEM',
                                payload:data
                                
                            });
                            
                            break;
                        }

                        case "AC_MAXITEMREACHED":
                        {   
                            dispatch({
                                type: 'UPDATE_PRICE_MAXITEMREACHED',
                                payload:data
                                
                            });
                            
                            break;
                        }

						}
            })
			.catch(error => {
                dispatch({
                    type: 'PAYMENT_INVALID_EMAIL',
                    payload: error
                });
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
        request.then(({data}) => {
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
            
        });
    };
}

export const applyAssociateDiscountToCart = (discountPin, discountId, transactionId, userPin) => {
    const apiURL = config.apiAssociateDiscount;
    
    const apiAssociateDiscountURL = path+'apiAssociateDiscount.json';
    const body= {
        ...clientConfig,
        "StoreAssoc":(userPin !== undefined)?userPin:"",
        "TransactionId": transactionId,
        "AssociateDiscountPIN": discountPin,
        "AssociateDiscountID": discountId
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(apiAssociateDiscountURL, {});

    return (dispatch) => {
        request.then(({data}) => {
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
            else if(data.response_text == "IM_RINGINGASSOCIATE"){
                dispatch({
                    type: 'IM_RINGINGASSOCIATE',
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

export function getPromotionsAction(transactionId,item) {
    const apiURL = config.getPromoPriceURL;
    const getPromoPriceURL =path+'getPromoPriceURL.json';

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
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(getPromoPriceURL, {});
 
        return (dispatch) => {
            request.then(({data}) => {
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
    const request = env.ENV_MODE=='dev1'?callPostWebService(apiURL, body):callGetWebService(updatePriceURL, {});

    return (dispatch) => {
        request.then(({data}) => {
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
        });
    };
}

export function modifyTaxAuthAction(transactionId,modifyValue) {
    const apiURL = config.updateTaxAuthURL;

    const body= {
        ...clientConfig,
        //"ClientTypeID":"1000",
        "transactionId": transactionId,
        "AuthCode":modifyValue
    }
    const request = callPostWebService(apiURL, body)

    return (dispatch) => {
        request.then(({data}) => {
            
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
        });
    };
}

export function modifyTaxAction(transactionId,item,modifyValue) {
    const apiURL = config.updateTaxURL;
    const body= {
        ...clientConfig,
        "ItemNumber":item.itemNumber,
        "transactionId":transactionId,
        "LineNumber":item.lineNumber,
        "TaxOverrideOption":"3",
        "TaxOverrideValue":item.itemTax?"0":"1",
        "AuthCode":modifyValue
        
    }
    const request = callPostWebService(apiURL, body)

    return (dispatch) => {
        request.then(({data}) => {
            
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
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getDefaultSKU, {});
        return (dispatch) => {
            request.then(({data}) => {
                console.log("ACTIONS",data, Date.now());

                if(data.response_text == "IM_SUCCESS") {
                    dispatch({
                        type: DEFAULT_SKU,
                        payload: data
                    });
                }
                else {
                    dispatch({
                        type: 'IM_SKUNOTFOUND',
                        payload: data
                    });
                }

                
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
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(validateManagerPin, {});
    return (dispatch) => {
        request.then(({data}) => {
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
        });
    
    };
}