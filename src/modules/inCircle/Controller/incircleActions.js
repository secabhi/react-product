import { CUST_INCIRCLE_INFO_REQUEST, INCIRCLE_GIFT_CARDS } from './constants';
import { callGetWebService, callPostWebService } from '../../common/helpers/helpers';

export function incircleGiftCardRequest(params){
    //const URL = require('../../../resources/stubs/config.json').cxp.getGiftCardDetails+params;
    const APP_KEY= require('../../../resources/stubs/config.json').cxp.AppKey;
    const URL = "https://servicestst.nmgapi.com/esb/services/mpos/customerInfo/fetchGCDtls?version=v1&id="+params
    const request = callGetWebService(URL, {
        headers: {
            'AppKey': APP_KEY,
            'AppID': 'MPOS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
    });
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.customerGCInfo.customer.system.statusCode) {
                case 0:
                    {
                        //console.log("Success")
                        dispatch({type: 'INCIRCLE_GIFT_CARDS', payload: data, loading: false});
                        break;
                    }
                case -1:
                {
                    dispatch({type: 'ERROR', payload: data, loading: false});
                        break;
                }
                    default:
                    {
                        dispatch({type: 'ERROR', payload: data});
                        break;
                    }
        }}).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}
export function custIncircleInfoRequest(params){
    //const URL = require('../../../resources/stubs/config.json').cxp.getInCircleLevel+params;
    const APP_KEY= require('../../../resources/stubs/config.json').cxp.AppKey;
    const URL = "https://servicestst.nmgapi.com/esb/services/mpos/customerInfo/getLoyalty?version=v1&id="+params
    const request = callGetWebService(URL, {
        headers: {
            'AppKey': APP_KEY,
            'AppID': 'MPOS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
    });
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.code) {
                case 200:
                    {
                        //console.log(data.code)
                        dispatch({type: 'CUST_INCIRCLE_INFO_REQUEST', payload: data, loading: false});
                        break;
                    }
                    default:
                    {
                        dispatch({type: 'ERROR', payload: data});
                        break;
                    }
        }}).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}

