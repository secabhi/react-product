import {callPostWebService, callGetWebService,xml2json} from '../common/helpers/helpers';
import {getStore} from '../../store/store';
import {responseValidation} from '../common/responseValidator/responseValidation';

export function getCardDetails(viewCardReq) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.viewCardUrl;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = viewCardReq;
    params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params);

    const viewCardsObj = require('../common/responseValidator/responseDictionary').viewCardsObj;
    var validate = {
                    isValid : false,
                    message :''
                }
    return (dispatch) => {
        request.then(({data}) => {
            validate = responseValidation(data,viewCardsObj);  
            if(validate.isValid){    
                switch (data.response_code) {
                    case 0:{
                        dispatch({type: 'GET_CARD_DETAILS_SUCCESS', payload: data})
                    }
                    break;
                    default:{
                        console.log("Inside ViewCardDetails default Block: default",data.response_code);
                        dispatch({ type: 'DEFAULT' });
                        break;  
                    }
                }
            }else{
                dispatch({
                    type: 'GET_CARD_DETAILS_FAIL',
                    payload: {  },
                    message : validate.message 
                });
            }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'GET_CARD_DETAILS_FAIL',
                payload: {  },
                message : 'Exception occured during webservice call '+ url
            });
        });
    }
}



export function addCardDetailsToClientele(addreq){
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.addCardURL;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = addreq;
    var params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params);
    const addCardResponseObj = require('../common/responseValidator/responseDictionary').addCardResponseObj;
    var validate = {
                    isValid : false,
                    message :''
                }
    return(dispatch) =>{
        request.then( ({data}) =>{
            validate = responseValidation(data,addCardResponseObj);
            if(validate.isValid){
                switch(data.response_code){
                    case 0 : {
                        dispatch({type: "ADD_CARD_CLIENTELE_SUCCESS",payload : data})
                    }
                    break;
                    default : {
                        dispatch({type: "ADD_CARD_CLIENTELE_FAIL",payload : data})
                        break; 
                    }
                }
            }else{
                dispatch({
                    type: 'ADD_CARD_CLIENTELE_API_FAIL',
                    payload: {  },
                    message : validate.message 
                });
            }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'GET_CARD_DETAILS_FAIL',
                payload: {  },
                message : 'Exception occured during webservice call '+ url
            });
        });
    }
}
