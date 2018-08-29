
import {callPostWebService, callGetWebService,xml2json} from '../../common/helpers/helpers';
import {getStore} from '../../../store/store';
import {responseValidation} from '../../common/responseValidator/responseValidation';


const env = require('../../../settings/env.js');
const path = env.PATH;

export function getCardsList(viewCardReq) {
    var viewCardDetails = path + 'viewCardDetails.json';

    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    var url = CONFIG_FILE.viewCardUrl;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = viewCardReq;
    params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params)/*callGetWebService(viewCardDetails)*/;
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.response_code) {
                case 0:{
                    dispatch({type: 'GET_CARDS_SUCCESS', payload: data})
                }
                break;
                default:{
                        dispatch({type: 'GET_CARDS_FAIL',payload : data})
                }
            }
        })
    }
}

export function navigateToLookupOptions(data) {
    
    return (dispatch) => {
            dispatch({
                type: 'NAVIGATE_TO_LOOKUP_OPTIONS',
                payload: data
            });
    };
}

export function storeCard(data) {
    return (dispatch) => {
            dispatch({
                type: 'STORE_CARD_DETAILS',
                payload:data
            });
    };
}

export function clearGetCards(){
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CARDS',
            payload: {}
        });
};
}

export function setPathname(data){
    return (dispatch) =>{
        dispatch({
            type:'CURRENT_PATH',
            payload:data
        })
    }
}

export function setNextInquiry(flag) 
{
    return (dispatch) =>{
        dispatch({
            type:'SET_NEXT_INQUIRY',
            payload:flag
        })
    }
}
export function isThirdParty(flag) 
{
    return (dispatch) =>{
        dispatch({
            type:'SET_THIRD_PARTY',
            payload:flag
        })
    }
}

export function useStoredCard(flag) 
{
    return (dispatch) =>{
        dispatch({
            type:'SET_TENDERING',
            payload:flag
        })
    }
}

export function clearTendering() 
{
    return (dispatch) =>{
        dispatch({
            type:'SET_TENDERING_CLEAR',
            payload:''
        })
    }
}