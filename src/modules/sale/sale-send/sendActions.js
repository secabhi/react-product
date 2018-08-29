import { SHIPMENT_OPTIONS_REQUEST, DIRECT_SEND_REQUEST, FREQ_SHIPPED_ADDRESSES, SHIPMENT_OPTIONS_REQUEST_FAILURE, DIRECT_SEND_REQUEST_FAILURE, FREQ_SHIPPED_ADDRESSES_FAILURE, AUTH_CODE_REQUEST, AUTH_CODE_REQUEST_FAILURE, SEND_CLEAR_ERROR, SEND_CLEAR_RESPONSE } from '../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { startSpinner } from '../../common/loading/spinnerAction'; 

const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

const env = require('../../../settings/env.js');
const path = env.PATH;

export function getShipmentOptions(data) {

    const URL = require('../../../resources/stubs/config.json').apiDirectSendGetOptions;
    const getShippingOptions = path+'getShippingOptions.json';

    const body = {
        ...data,
        ...clientConfig,
        "SendStore":clientConfig.Store
    }
    console.log("----------Send Action----------");
    console.log(body);
    console.log("----------Send Action----------");
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getShippingOptions, {});

    return (dispatch) => {
        dispatch(startSpinner(true));
        request.then(({data}) => {
            switch(data.responseText){
                case 'IM_SUCCESS':{
                    dispatch( {
                        type: SHIPMENT_OPTIONS_REQUEST,
                        payload: { data }
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_INVALIDREQUEST':{
                    dispatch( {
                        type: SHIPMENT_OPTIONS_REQUEST_FAILURE,
                        payload: "Invalid Request."
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_GENERALERROR':{
                    dispatch( {
                        type: SHIPMENT_OPTIONS_REQUEST_FAILURE,
                        payload: "Invalid Request."
                    });
                    dispatch(startSpinner(false));
                    break;
                }
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    };
};

export function authCodeRequest(data) {

    const URL = require('../../../resources/stubs/config.json').apiAuthCode;
    const getAuthCode = path+'getAuthCode.json';
    console.log("SHIV", data)
    const body = {
        ...data,
        ...clientConfig,
    }
    console.log("----------Send Action----------");
    console.log(body);
    console.log("----------Send Action----------");
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getAuthCode, {});

    return (dispatch) => {
        dispatch(startSpinner(true));
        request.then(({data}) => {
            switch(data.response_text){
                case 'AC_SUCCESS':{
                    dispatch( {
                        type: AUTH_CODE_REQUEST,
                        payload: { data }
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'AC_INVALIDREQUEST':{
                    dispatch( {
                        type: AUTH_CODE_REQUEST_FAILURE,
                        payload: "Invalid Request."
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'AC_GENERALERROR':{
                    dispatch( {
                        type: AUTH_CODE_REQUEST_FAILURE,
                        payload: "Invalid Request."
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'AC_FAIL':{
                    dispatch( {
                        type: AUTH_CODE_REQUEST_FAILURE,
                        payload: data.response_text 
                    });
                    dispatch(startSpinner(false));
                    break;
                }
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    };
};

export function directSendRequest(data) {

    const URL = require('../../../resources/stubs/config.json').apiDirectSend;
    const directSend = path+'directSend.json';

    const body = {
        ...data,
        ...clientConfig
    }
    console.log("----------Send Action----------");
    console.log(body);
    console.log("----------Send Action----------");
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(directSend, {});

    return (dispatch) => {
        dispatch(startSpinner(true));
        request.then(({data}) => {
            switch(data.response_text){
                case 'IM_SUCCESS':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST,
                        payload: { data }
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_INVALIDREQUEST':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST_FAILURE,
                        payload: "Invalid Request."
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_INVALIDSENDITEM':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST_FAILURE,
                        payload: "ItemNumber and LineNumber is invalid"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_GENERALERROR':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST_FAILURE,
                        payload:"Invalid Request"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_SUBSERVICEITEMNOTALLOWED':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST_FAILURE,
                        payload: "Request cannot contain ServiceItem (GiftWrap, Alteration etc.)"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case 'IM_INVALIDAUTHCODE':{
                    dispatch( {
                        type: DIRECT_SEND_REQUEST_FAILURE,
                        payload: { data }
                    });
                    dispatch(startSpinner(false));
                    break;
                }
            }
        })
    };
};

export function freqShippedAddressesAction(data) {

    const URL = require('../../../resources/stubs/config.json').apiFreqShippedAddresses;
    const getFreqShippedAddresses = path+'getFreqShippedAddresses.json';

    const body = {
        ...data,
        ...clientConfig
    }
    console.log("----------Send Action----------");
    console.log(body);
    console.log("----------Send Action----------");
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getFreqShippedAddresses, {});

    return (dispatch) => {
        dispatch(startSpinner(true));
        request.then(({data}) => {
            switch(data.response_text){
                case "IM_SUCCESS":{
                    dispatch( {
                        type: FREQ_SHIPPED_ADDRESSES,
                        payload: { data }
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case "IM_NOADDRESSES":{
                    dispatch( {
                        type: FREQ_SHIPPED_ADDRESSES_FAILURE,
                        payload:"No frequent shipping addresses for select StoreClientNo"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case "IM_INVALIDREQUEST":{
                    dispatch( {
                        type: FREQ_SHIPPED_ADDRESSES_FAILURE,
                        payload:"Invalid Request"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
                case "IM_GENERALERROR ":{
                    dispatch( {
                        type: FREQ_SHIPPED_ADDRESSES_FAILURE,
                        payload:"Invalid Request"
                    });
                    dispatch(startSpinner(false));
                    break;
                }
            }
        })
    };
};

export const clearForSend = (data) => {
    return(dispatch) => {
        dispatch(startSpinner(true));
        switch(data){
            case "CLEAR_ERROR":{
                dispatch( {
                    type: SEND_CLEAR_ERROR,
                });
                dispatch(startSpinner(false));
                break;
            }
            case "CLEAR_SEND_RESPONSE":{
                dispatch( {
                    type: SEND_CLEAR_RESPONSE,
                });
                dispatch(startSpinner(false));
                break;
            }
        }
    };
};