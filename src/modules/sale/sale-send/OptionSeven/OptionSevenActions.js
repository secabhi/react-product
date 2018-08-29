import { OPTION_SEVEN_SEND,SELECT_STORE_SEND,SHIPPING_OPTIONS_SEND }from '../../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
const env = require('../../../../settings/env.js');
const path = env.PATH;
const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const optionSevenSendUrl = config.apiOptionSevenSend;
const selectStore=config.selectStore;
const shippinOptions=config.shippinOptions;
export function optionSevenSendApi(optionSevenObj) {
    // const optionSevenApiCall = path+'apiOptionSevenSend.json';
    const body = {
        ...clientConfig,
        ...optionSevenObj
    }

    const request = callPostWebService(optionSevenSendUrl, body)

    return (dispatch) => {
        request.then((data) => {
            if (data.response_text === 'AC_SUCCESS') {
                dispatch({
                    type: OPTION_SEVEN_SEND,
                    payload: data
                });
            }
        })
    }  
}
//Used for Shipping Options API
export function shippingOptionsApi() {
    const params = {
        ...clientConfig,
        "Surface":true,
        "Weight":"15",
        "ZIP":"75015",
        "SendStore":"15", 
        "SendFromOtherStore":true
    }
    
    const request = callPostWebService(shippinOptions, params)
    return (dispatch) => {
        request.then((data) => {
           
            if (data.data.responseText === 'IM_SUCCESS') {
              
                dispatch({
                    type: SHIPPING_OPTIONS_SEND,
                    payload: data
                });
            }

        })
    }  
}
export function selectStoreApi(StoreNum,AssocPin) {
    
    const params = {
        ...clientConfig,
        "SendStore":StoreNum,   
        "SendPin":AssocPin
    }
    const request = callPostWebService(selectStore, params)
    return (dispatch) => {
        request.then((data) => {            
            if (data.data.response_text === 'IM_SUCCESS') {
             
                dispatch({
                    type: SELECT_STORE_SEND,
                    payload: data
                });
            }

        })
    }  
}