import { GET_GIFT_WRAP, ADD_TO_GIFT_WRAP, CLEAR_GIFT_WRAP, GET_GIFT_WRAP_ERROR, ADD_GIFT_WRAP_ERROR} from '../../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
import { responseValidation } from '../../../common/responseValidator/responseValidation';
import { getGiftWrapResponseObj, addGiftWrapResponseObj } from '../../../common/responseValidator/responseDictionary'

const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const getGiftWrapUrl = config.apiGetGiftWrap;
const addToGiftWrapUrl = config.apiAddToGiftWrap;

/* GIFT WRAP DEMO can Be USED UNTIL API can return usuable uri */
export function getGiftWrap(param) {

    var validate = { isValid: false }
    const regID = `?regID=${param}`;
    const getGiftWrapApi = getGiftWrapUrl + regID;  
    const getGiftWrapApiCall = callGetWebService(getGiftWrapApi);

        return (dispatch) => {
            getGiftWrapApiCall.then((data) => {
            validate = responseValidation(data, getGiftWrapResponseObj);
            if(validate.isValid) {
                if(data.status === 200) {
                    const action = {}
                    action.type = GET_GIFT_WRAP;
                    action.payload = data.data;
                    dispatch(action);
                } 
            } else {
                dispatch({
                    type: GET_GIFT_WRAP_ERROR,
                    payload: data
                });
            }
        }).catch((err) => {
            dispatch({type: GET_GIFT_WRAP_ERROR, payload: err})
        })
    }
}

export function addToGiftWrap(optionsObj) {
    var validate = { isValid: false }
    const body = {
        ...clientConfig,
        ...optionsObj
    }
    const addToGiftWrapApiCall = callPostWebService(addToGiftWrapUrl, body)

        return (dispatch) => {
            addToGiftWrapApiCall.then((data) => {
            validate = responseValidation(data.data, addGiftWrapResponseObj);
                if(validate.isValid) {
                    dispatch({
                        type: ADD_TO_GIFT_WRAP,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: ADD_GIFT_WRAP_ERROR
                    })
                }
            }).catch((err) => {
                dispatch({type: ADD_GIFT_WRAP_ERROR, payload: err})
            });
        };
}

export function clearGiftWraps() {
    return {type: CLEAR_GIFT_WRAP}
}

export function giftWrapType(type)
{
    
    return (dispatch) => {
        dispatch({
            type: 'SET_GIFT_WRAP_TYPE',
            payload: type
        });
    };
}