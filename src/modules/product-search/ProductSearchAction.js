import axios from 'axios';
import { startSpinner } from '../common/loading/spinnerAction';
import { PRODUCT_SEARCH_PIMSKU_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_PIMSKU_FAIL } from '../common/constants/type';
import { PRODUCT_SEARCH_UPC_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_UPC_FAIL } from '../common/constants/type';
import { PRODUCT_SEARCH_KEYWORD_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_KEYWORD_FAIL } from '../common/constants/type';
import { PRODUCT_SEARCH_STYLE_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_STYLE_FAIL } from '../common/constants/type';
import { PRODUCT_SEARCH_CATALOG_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_CATALOG_ITEM_FAIL } from '../common/constants/type';

import { ADD_ITEM_SUCCESS } from '../common/constants/type';

import { callPostWebService, callGetWebService } from '../common/helpers/helpers';




const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
const URL_SKU = CONFIG_FILE_ADD.cxp.getProductSearchSKU;
const APP_KEY = CONFIG_FILE_ADD.cxp.AppKey;
const FILTER_URL_SKU = CONFIG_FILE_ADD.cxp.getProductFilterSKU;
const storeLocation = "050";
const offset = "050";
const body = {
    "AppKey": APP_KEY,
    "AppID": "MPOS"
};


//store = 0010
//termianl = 0168

export function productSearchAction(searchitem, searchfields, successCallback) {
    switch (searchitem) {

        case "keyword_search":
            var storeLocation = "001";
            let getProductBykeyword = URL_SKU + `/lookup?version=v2&keyword=${searchfields.search_keyword}&locationList=${storeLocation}&offset`;
            console.log("getProductBykeyword", getProductBykeyword);
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }

            const keywordSearchrequest = axios.get(getProductBykeyword,
                {
                    headers: body,
                });

            return (dispatch) => {
                keywordSearchrequest.then(({ data }) => {
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_SEARCH_KEYWORD_SUCCESS,
                            payload: data.data.products
                        });
                    }
                    else {
                        dispatch({
                            type: PRODUCT_SEARCH_KEYWORD_FAIL,
                            payload: data.data.products
                        });
                        successCallback(data.data.totalCount)
                    }
                    dispatch(startSpinner(false));

                });
            };
            break;

        case "pimsku_search":

            var testPimSKU = "401058977854";
            var storeLocation = "050,001";
            var offset = "050";
            let getProductByPIMSKUAddress = URL_SKU + `/search?version=v2&pimskuList=${searchfields.search_pimsku}&locationList=${storeLocation}&offset`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }

            const request = axios.get(getProductByPIMSKUAddress,
                {
                    headers: body,
                });

            return (dispatch) => {
                request.then(({ data }) => {
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_SEARCH_PIMSKU_SUCCESS,
                            payload: data.data.products[0]
                        });
                        successCallback(searchfields.search_pimsku);
                    }
                    else {
                        dispatch({
                            type: PRODUCT_SEARCH_PIMSKU_FAIL,
                            payload: data.data
                        });
                    }
                    dispatch(startSpinner(false));

                });
            };
            break;

        case "upc_search":
            var storeLocation = "050";
            var offset = "050";
            let getProductByUPCAddress = URL_SKU + `/legacy?version=v2&upc=${searchfields.search_upc}&locationList=${storeLocation}&offset`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }
            const upc_request = axios.get(getProductByUPCAddress,
                {
                    headers: body,
                });
            return (dispatch) => {
                upc_request.then(({ data }) => {
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_SEARCH_UPC_SUCCESS,
                            payload: data.data.products[0]
                        });
                        let pimskuId = data.data.products[0].pimskuId;
                        successCallback(pimskuId);
                    }
                    else {
                        dispatch({
                            type: PRODUCT_SEARCH_UPC_FAIL,
                            payload: data
                        });
                    }
                    dispatch(startSpinner(false));

                });
            };


            break;

        case "style_search":
            var storeLocation = "001";
            let getProductByStyle = URL_SKU + `/lookup?version=v2&pimstyleList=${searchfields.search_style}&locationList=${storeLocation}&offset`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }

            const styleSearchrequest = axios.get(getProductByStyle,
                {
                    headers: body,
                });

            return (dispatch) => {
                styleSearchrequest.then(({ data }) => {
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_SEARCH_STYLE_SUCCESS,
                            payload: data.data.products
                        });
                    }
                    else {
                        dispatch({
                            type: PRODUCT_SEARCH_STYLE_FAIL,
                            payload: data.data
                        });
                    }
                    dispatch(startSpinner(false));

                });
            };
            break;

        case "catalog_search":
            var storeLocation = "001";
            let getProductByCatalog = URL_SKU + `/lookup?version=v2&offer_item=${searchfields.search_catid}_${searchfields.search_itemid}&locationList=${storeLocation}&offset`;
            var body = {
                "AppKey": APP_KEY,
                "AppID": "MPOS"
            }
            const catalogSearchrequest = axios.get(getProductByCatalog,
                {
                    headers: body,
                });

            return (dispatch) => {
                catalogSearchrequest.then(({ data }) => {
                    if (data.data.totalCount > 0) {
                        dispatch({
                            type: PRODUCT_SEARCH_CATALOG_ITEM_SUCCESS,
                            payload: data.data.products
                        });
                    }
                    else {
                        dispatch({
                            type: PRODUCT_SEARCH_CATALOG_ITEM_FAIL,
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


export const productImgSearchAction = (imageUrls) => {
    const skus = Object.keys(imageUrls);
    for (let i = 0; i < skus.length; i++) {
        const sku = skus[i];
        if (imageUrls[sku] === '') {
            console.log('********************************************************sku', sku)
            let getImagesURL = URL_SKU + `/search?version=v2&pimskuList=${sku}&locationList=${storeLocation}&offset`;
            let request = callGetWebService(getImagesURL, { headers: body })

            return (dispatch) => {
                request
                    .then((response) => {
                        //if not found or if image is null
                        if (!response.data.data.products[0] || !response.data.data.products[0].mainImageUrl) {
                            console.log('DISPATCHING UPDATED - Product or Image Not Found', response.data.data.products[0]);
                            imageUrls[sku] = 'Image Not Found';
                        } else {
                            console.log('DISPATCHING UPDATED IMAGES response.data.data.products', response.data.data.products[0].pimstyleIdDesc);
                            imageUrls[sku] = response.data.data.products[0].mainImageUrl;
                        }
                        dispatch({ type: 'UPDATED_IMAGES', payload: { updated: true, imageUrls: imageUrls } })
                    })
                    .catch(error => console.log('productImgSearch Error:', error))
            }
        }
    }
}

export const getInventoryDetails = (skuId, storeId) => {

}