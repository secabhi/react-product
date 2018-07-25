import { SHIPMENT_OPTIONS_REQUEST, DIRECT_SEND_REQUEST } from '../../common/constants/type';
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
        ...clientConfig
    }
    console.log("----------Send Action----------");
    console.log(body);
    console.log("----------Send Action----------");
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(getShippingOptions, {});

    return (dispatch) => {
        dispatch(startSpinner(true));
        request.then(({data}) => {

            dispatch( {
                type: SHIPMENT_OPTIONS_REQUEST,
                payload: { data }
            });
            dispatch(startSpinner(false));
        })
    };
};

export function directSendRequest(data) {

    const URL = require('../../../resources/stubs/config.json').apiDirectSend;
    const directSend = path+'getShippingOptions.json';

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

            dispatch( {
                type: DIRECT_SEND_REQUEST,
                payload: { data }
            });
            dispatch(startSpinner(false));
        })
    };
};