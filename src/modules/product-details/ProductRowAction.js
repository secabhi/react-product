import axios from 'axios';
import { startSpinner } from '../../modules/common/loading/spinnerAction';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';

import { PRODUCT_FILTER_SEARCH_ITEM_SUCCESS, PRODUCT_FILTER_SEARCH_ITEM_FAIL, GP_SUCCESS, GP_FAILURE, GET_PRICE_SUCCESS } from '../../modules/common/constants/type';


const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
const URL_SKU = CONFIG_FILE_ADD.cxp.getProductSearchSKU;
const APP_KEY = CONFIG_FILE_ADD.cxp.AppKey;
const FILTER_URL_SKU = CONFIG_FILE_ADD.cxp.getProductFilterSKU; 

const env = require('../../settings/env.js');
const path = env.PATH;

export function productRowAction(searchitem, searchfields, successCallback) {
    switch (searchitem) {
        case 'filter_set':
        //debugger;
            var filter_data;
            let getFilterByPimstyleId = FILTER_URL_SKU + `?version=v2&pimStyle=${searchfields.pimStyleId}&locationList=050&filterList=color,size`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }
            const filterSetrequest = axios.get(getFilterByPimstyleId,
                {
                    headers: body,
                });
            
            return (dispatch) => {
                // dispatch(startSpinner(true));
                filterSetrequest.then(({ data }) => {
                    console.log("SHIV PRODUCT DATA",data)
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_FILTER_SEARCH_ITEM_SUCCESS,
                            payload: data.data.products
                        });
                    }
                    else {
                        dispatch({
                            type: PRODUCT_FILTER_SEARCH_ITEM_FAIL,
                            payload: data.data
                        });
                    }
                });
            };

            default:
            break;
    }
}

export function getPriceAction(userpin,pimSKU) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.getPriceURL;
    console.log("SHIV URL", pimSKU)
    var params = {
        'AssociateNumber': userpin,
        'SKUID': pimSKU
    }

    const getPriceURL = path+'getPriceURL.json';

    const request = env.ENV_MODE=='dev1'?callPostWebService(URL,params):callGetWebService(getPriceURL,{});

    return (dispatch) => {
        request.then(({data}) => {
                switch(data.response_text){
                    case GP_SUCCESS:
                        dispatch({
                            type: GET_PRICE_SUCCESS,
                            payload: data
                        });
                        dispatch(startSpinner(false));

                    default:

                }
            })
            .catch(error => {
                dispatch({
                    type: GP_FAILURE,
                    payload: error
                });
            });
    };
}
