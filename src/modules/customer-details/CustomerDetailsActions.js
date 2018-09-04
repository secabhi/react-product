import { callAxiosWebService } from '../common/helpers/helpers';
import moment from 'moment';

import {GET_CSR_HISTORY, PURCHASED_FLAG} from '../common/constants/type';
import {responseValidation} from '../common/responseValidator/responseValidation';
import {customerPurchaseHistoryObj, customerRecommendationsObj} from '../common/responseValidator/responseDictionary';

const cxp = require('../../resources/stubs/config.json').cxp;
const AppKey= cxp.AppKey;
const purchaseURL = cxp.getPurchaseHistory;
const recommendationsURL = cxp.getRecommendations;
const header = {
    'AppID': 'MPOS',
    'AppKey': AppKey
}

export function getCsrPurchasesNRecommends(cssId) {
    const endDate = moment().format('L');
    const startDate= moment().subtract(2,'year').format('L');

    const purchaseParams = `?version=v2&id=${cssId}&offset=0&startDate=${startDate}&endDate=${endDate}`;
    const apiCallPurchases = purchaseURL + purchaseParams;

    const recommendationParams =`?version=1.0&brand=NM&cssId=${cssId}`
    const apiCallRecommendations = recommendationsURL + recommendationParams;

    const getPurchaseHistory =  callAxiosWebService({method: 'get', url: apiCallPurchases, headers: header});
    const getRecommendations = callAxiosWebService({method: 'get', url: apiCallRecommendations, headers: header})

    const history = Promise.all([getPurchaseHistory, getRecommendations]);
   
    return (dispatch) => {
        history
        .then(response => {
            console.log('RESPONSE', response);
            if( responseValidation(response[0].data.data, customerPurchaseHistoryObj).isValid && responseValidation(response[1].data, customerRecommendationsObj).isValid) {
                dispatch({
                    type: GET_CSR_HISTORY,
                    payload: {purchases: response[0].data.data.purchases, recommendations: response[1].data.products}
                })
            } else {
                dispatch({
                    type: 'PURCHASES_RECOMMENDS_ERROR',
                })
            }    
        })
        .catch( err => dispatch({type: 'NETWORK_ERROR_PURCHASE_N_RECOMMENDS'}))
    }
}

export function navigateToDomesticCustomer(data) {

    // const params = `?version=v1&id=${cssId}`;
    // const customerProfileApi = cxp.getCustomerDetail + params;
    // const customerProfileApiCall = callAxiosWebService({ method: 'get', url: customerProfileApi, headers: header });
    
    return (dispatch) => {
            dispatch({
                type: 'NAVIGATE_TO_DOMESTIC_CUSTOMER',
                payload: data
            });
    };
}

export function navigateToCustomerWithUpdate(data) {
    return (dispatch) => {
        dispatch({
            type: 'NAVIGATE_TO_DOMESTIC_CUSTOMER_WITH_UPDATE',
            payload: data
        });
    };
}

export function getSalesSummaryAction(cssId, associatePin) {

    const params = `/${cssId}/salesSummary?associatePin=${associatePin}`; 
    const SalesSummary = cxp.getSalesSummary + params;
    const salesSummaryApiCall = callAxiosWebService({method: 'get', url :SalesSummary,header :header})
    console.log('salesSummaryApiCall '+salesSummaryApiCall)
    return (dispatch) => {
        salesSummaryApiCall.then((data) => {
            dispatch({
                type: 'GET_SALES_SUMMARY',
                payload: data.data.data
            });
    
        }).catch((err) => {
            dispatch({type: 'NETWORK_ERROR_GET_SALES_SUMMARY'})
        });
    };
}

export function clearCustomerDetailsAction(){
    return (dispatch) => {
       
            dispatch({
                type: 'CLEAR_CUSTOMER_DETAILS',
                payload: {}
            });
    };
}

export function changeItemPurchasedFlag(data) {
    return (dispatch) => {
        dispatch({
            type: PURCHASED_FLAG,
            payload: data
        })
    }
}
