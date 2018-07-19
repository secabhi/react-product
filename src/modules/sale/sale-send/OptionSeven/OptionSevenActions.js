import { OPTION_SEVEN_SEND }from '../../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';

const env = require('../../../../settings/env.js');
const path = env.PATH;
const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const optionSevenSendUrl = config.apiOptionSevenSend;


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