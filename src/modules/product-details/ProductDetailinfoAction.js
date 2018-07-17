import axios from 'axios';
import { startSpinner } from '../../modules/common/loading/spinnerAction';

import { PRODUCT_DETAIL_INFO_ITEM_SUCCESS } from '../../modules/common/constants/type';
import { PRODUCT_DETAIL_INFO_ITEM_FAIL } from '../../modules/common/constants/type';


const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
const URL_SKU = CONFIG_FILE_ADD.cxp.getDetailInfo;
const APP_KEY = CONFIG_FILE_ADD.cxp.AppKey;

export function productDetailInfoAction(searchitem, searchfields, successCallback) {
    switch (searchitem) {
        case 'get_info':
        debugger;
            var filter_data;
            let getDetailBySkuId = URL_SKU + `?skuId=${searchfields.pimskuId}&storeNo=002&divCd=NM`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }
            const filterSetrequest = axios.get(getDetailBySkuId,
                {
                    headers: body,
                });

            return (dispatch) => {
                filterSetrequest.then(({ data }) => {
                    if (data.store.length > 0) {
                        dispatch({
                            type: PRODUCT_DETAIL_INFO_ITEM_SUCCESS,
                            payload: data.store
                        });
                    }
                    else {
                        dispatch({
                            type: PRODUCT_DETAIL_INFO_ITEM_FAIL,
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
