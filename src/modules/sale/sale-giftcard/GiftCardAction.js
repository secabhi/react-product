import { 
    ADD_GIFTCARD_SUCCESS, 
    ADD_GIFTCARD_FAILURE, 
    VALIDATE_DL_SUCCESS, 
    VALIDATE_DL_FAILURE,
    GET_GIFTCARD_FAILURE,
    GET_GIFTCARD_SUCCESS,
    GET_GIFTCARD_FORBIDDEN_ERROR,
    GIFTCARD_CLASS_SUCCESS,
    GIFTCARD_CLASS_FAILURE,
    CONVERT_SALT_SUCCESS,
    CONVERT_SALT_FAILURE,
    GIFTCARD_SALT_SUCCESS,
    GIFTCARD_SALT_FAILURE,
    UPDATE_RELOAD_SUCCESS,
    UPDATE_RELOAD_FAILURE,
    FINCEN_SUCCESS,
    FINCEN_FAILURE } from '../../common/constants/type';

import { callPostWebService, callGetWebService, callAxiosWebService } from '../../common/helpers/helpers';



const config = require('../../../resources/stubs/config.json');
const icc = config.icc;
const clientConfig = config.clientConfig;

const env = require('../../../settings/env.js');
const path = env.PATH;

const headers = {
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin": "*",
    "AppID": "IIB-dev",
    "X-API-Key": "3W6EP4NsFr61AJQfkbciD8bPGz8RIjv5Qfv8PHWa"
}



export function addGiftCardAction(giftCardObj) {
    const addGiftCardUrl = config.apiAddGiftCard;

    const body = {
        ...clientConfig,
        ...giftCardObj
    }

    const addGiftCardCall = callPostWebService(addGiftCardUrl, body)

    return(dispatch) => {
        addGiftCardCall.then((data) => {
            // NETWORK BUG RESPONSE RETURNS 502 ALONG WITH CORRECT DATA/GIFTCARD
            // NEEDS REMOVAL ONCE ISSUE IS FIXED
            switch(data.status) {
                case 200 :
                {
                    dispatch({
                        type: ADD_GIFTCARD_SUCCESS,
                        payload: data.data
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
                    // AC_GCMAXAMT_EXCEEDED
                }
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    }

}

export function validateDriversLicenseAction(licenseObj) {
    const validateDLUrl = config.apiValidateDL
    const body = {
        ...licenseObj
    }

    const validateDLCall = callPostWebService(validateDLUrl, body)

    return((dispatch) => {
        validateDLCall.then((data) => {
            console.log('MIKE_VAL-DL_DATA', data)
            if(data.status === 200) {
                dispatch({
                        type: VALIDATE_DL_SUCCESS,
                        payload: data.data
                    })
            }
            else {
                    dispatch({
                        type: VALIDATE_DL_FAILURE,
                        payload: data.response.data
                    })
            }
        }).catch((err) => {
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    })
}

// **********ICC API CALLS**********
export function getGiftCardDetailsAction(cardNum) {
    const getGCDetailsUrl = icc.getGiftCardDetails;
    const body = {...cardNum};

    const getGCDetailsCall = callPostWebService(getGCDetailsUrl, body, headers)

    return((dispatch) => {
        getGCDetailsCall.then((data) => {
            switch(data.data.message) {
                case null :
                {
                    dispatch({
                        type: GET_GIFTCARD_SUCCESS,
                        payload: data.data
                    })
                    break;
                }
                case "record not found" :
                {
                    dispatch({
                        type: GET_GIFTCARD_FAILURE,
                        payload: data.data
                    })
                    break;
                }

            }
            if(data.status === 403){
                dispatch({
                    type: GET_GIFTCARD_FORBIDDEN_ERROR,
                    payload: data.data
                })
            }
        }).catch((err) => {
            console.log("Getgifcard Details Error", err);
            dispatch({type: 'REQUEST_FAILED', payload: err});
        })
    })

}


export function getGiftCardClassAction(giftCardClass) {
    const param = `getCardClassDetails?cardclass=${giftCardClass}`;
    const getGCClassUrl = icc.getGiftCardClass + param;
    // const getGCClassCall = callGetWebService(getGCClassUrl, {}, headers);
    const getGCClassCall = callAxiosWebService({method: 'get', url: getGCClassUrl, headers: headers});

    return((dispatch) => {
       getGCClassCall.then((data) => {
            switch(data.code) {
                case 200 :
                {
                    dispatch({
                        type: GIFTCARD_CLASS_SUCCESS,
                        payload: data
                    })
                    break;
                }
                case 500 :
                {
                    dispatch({
                        type: GIFTCARD_CLASS_FAILURE,
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

// REMOVED FROM DOCUMENTATION
// export function convertCardNumToSaltAction(cardNum) {
//  "convertCardSalt":"http://nmesbuat32:7080/esb/services/giftCardIntegration/",
//     const param = `convertSalt?s=${cardNum}`;
//     const convertToSaltUrl = icc.convertCardSalt + param;

//     const convertCardNum = callGetWebService(convertToSaltUrl);

//     return((dispatch) => {
//        convertCardNum.then((data) => {
//              switch(data.code) {
//                  case 200 :
//                  {
//                      dispatch({
//                          type: CONVERT_SALT_SUCCESS,
//                          payload: data
//                      })
//                      break;
//                  }
//                  case 500 :
//                  {
//                      dispatch({
//                          type: CONVERT_SALT_FAILURE,
//                          payload: data
//                      })
//                      break;
//                  }
 
//              }
//          }).catch((err) => {
//              dispatch({type: 'REQUEST_FAILED', payload: err});
//          })
//      })
// }
// export function getSaltNumberAction(cardNum, userId) {
//     const param = `getSalt?card=${cardNum}&user=${userId}`;
//     const getCardSaltUrl = icc.getCardSalt + param;
//    "getCardSalt":"http://nmesbuat32:7080/esb/services/giftCardIntegration/",
//     const getCardSaltCall = callGetWebService(getCardSaltUrl)

//     return((dispatch) => {
//         getCardSaltCall.then((data) => {
//             switch(data.code) {
//                 case 200 :
//                 {
//                     dispatch({
//                         type: GIFTCARD_SALT_SUCCESS,
//                         payload: data
//                     })
//                     break;
//                 }
//                 case 500 :
//                 {
//                     dispatch({
//                         type: GIFTCARD_SALT_FAILURE,
//                         payload: data
//                     })
//                     break;
//                 }

//             }
//         }).catch((err) => {
//             dispatch({type: 'REQUEST_FAILED', payload: err});
//         })
//     })
// }

// This API should be called after the POS has tendered the reload, or voided the reload transaction. 
export function updateGiftCardReloadAction(cardNum, addOrRemove) {
    const param =`updateReload?card=${cardNum}&action=${addOrRemove}`;
    const updateGCReloadUrl = icc.updateGiftCardReload + param;

    const updateGCReloadCall = callGetWebService(updateGCReloadUrl, headers);

    return((dispatch) => {
        updateGCReloadCall.then((data) => {
            switch(data.code) {
                case 200 :
                {
                    dispatch({
                        type: UPDATE_RELOAD_SUCCESS,
                        payload: data
                    })
                    break;
                }
                case 500 :
                {
                    dispatch({
                        type: UPDATE_RELOAD_FAILURE,
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

export function fincenValidationAction(fincenObj) {
    const fincenValidationUrl = icc.fincenValidation;
    const body = {
        ...fincenObj
    }

    const fincenValidationCall = callPostWebService(fincenValidationUrl, body, headers)

    return ((dispatch) => {
        fincenValidationCall.then((data) => {
            switch(data.code) {
                case 200 :
                {
                    dispatch({
                        type:FINCEN_SUCCESS,
                        payload: data
                    })
                    break;
                }
                case 500 :
                {
                    dispatch({
                        type:FINCEN_FAILURE,
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

export function clearAllGiftCardDataAction() {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_ALL_GIFTCARD_DATA' });
    };
}
