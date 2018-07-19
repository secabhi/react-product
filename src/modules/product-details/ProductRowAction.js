import axios from 'axios';
import { startSpinner } from '../../modules/common/loading/spinnerAction';

import { PRODUCT_FILTER_SEARCH_ITEM_SUCCESS } from '../../modules/common/constants/type';
import { PRODUCT_FILTER_SEARCH_ITEM_FAIL } from '../../modules/common/constants/type';


const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
const URL_SKU = CONFIG_FILE_ADD.cxp.getProductSearchSKU;
const APP_KEY = CONFIG_FILE_ADD.cxp.AppKey;
const FILTER_URL_SKU = CONFIG_FILE_ADD.cxp.getProductFilterSKU; 

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
                filterSetrequest.then(({ data }) => {
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
                    dispatch(startSpinner(false));
                });
            };
            break;
            default:
            break;
    }
}
