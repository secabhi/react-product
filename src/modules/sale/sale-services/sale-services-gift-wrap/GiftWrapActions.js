import { GET_GIFT_WRAP, ADD_TO_GIFT_WRAP, CLEAR_GIFT_WRAP} from '../../../common/constants/type';
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';

const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const getGiftWrapUrl = config.apiGetGiftWrap;
const addToGiftWrapUrl = config.apiAddToGiftWrap;

/* GIFT WRAP DEMO can Be USED UNTIL API can return usuable uri */
export function getGiftWrap(param) {
    
    const regID = `?regID=${param}`;
    const getGiftWrapApi = getGiftWrapUrl + regID;  
    const getGiftWrapApiCall = callGetWebService(getGiftWrapApi);

        return (dispatch) => {
            getGiftWrapApiCall.then((data) => {
            if(data.status === 200) {
                const action = {}
                action.type = GET_GIFT_WRAP;
                action.payload = data.data;
                console.log('GIFT WRAP ACTIONS', action);
                dispatch(action);
            } else {
                dispatch({
                    type: 'GIFT_WRAP_ERROR',
                    payload: data
                });
            }
        })
    }
}

export function addToGiftWrap(optionsObj) {
    const body = {
        ...clientConfig,
        ...optionsObj
    }
    console.log('ADDING', body)
    const addToGiftWrapApiCall = callPostWebService(addToGiftWrapUrl, body)

        return (dispatch) => {
            addToGiftWrapApiCall.then((data) => {
                console.log(data)
                dispatch({
                    type: ADD_TO_GIFT_WRAP,
                    payload: data
                });

            }).catch((err) => {
                console.log(`=> ${err}`);
            });
        };
}

export function clearGiftWraps() {
    return {type: CLEAR_GIFT_WRAP}
}