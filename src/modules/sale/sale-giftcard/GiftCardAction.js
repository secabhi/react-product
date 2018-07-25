import { 
    ADD_GIFTCARD_SUCCESS, 
    ADD_GIFTCARD_FAILURE, 
    VALIDATE_DL_SUCCESS, 
    VALIDATE_DL_FAILURE 
    } from '../../common/constants/type';

import { callPostWebService } from '../../common/helpers/helpers';



const config = require('../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

const env = require('../../../settings/env.js');
const path = env.PATH;



export function addGiftCard(giftCardObj) {
    const addGiftCardUrl = config.apiAddGIftCard;
    const body = {
        ...clientConfig,
        ...giftCardObj
    }

    const addGiftCardCall = callPostWebService(addGiftCardUrl, body)

    return((dispatch) => {
        addGiftCardCall.then((data) => {
            switch(data.response_text) {
                case 'AC_SUCCESS' :
                {
                    dispatch({
                        type: ADD_GIFTCARD_SUCCESS,
                        payload: data
                    })
                    break;
                }
                case 'AC_GIFTCARD_ALREADYADDED' :
                {
                    dispatch({
                        type: ADD_GIFTCARD_FAILURE,
                        payload: data
                    })
                    break;
                }
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    })

}

export function validateDriversLicense(licenseObj) {
    const validateDLUrl = config.apiValidateDL
    const body = {
        ...licenseObj
    }

    const validateDLCall = callPostWebService(validateDLUrl, body)

    return((dispatch) => {
        validateDLCall.then((data) => {
            switch(data.response_code) {
                case 200 :
                {
                    dispatch({
                        type: VALIDATE_DL_SUCCESS,
                        payload: data
                    })
                    break;
                }
                case 406 :
                {
                    dispatch({
                        type: VALIDATE_DL_FAILURE,
                        payload: data
                    })
                    break;
                }
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    })
}