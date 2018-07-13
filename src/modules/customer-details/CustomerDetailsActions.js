import { callAxiosWebService } from '../common/helpers/helpers';
import moment from 'moment';

import {GET_CSR_HISTORY} from '../common/constants/type';

const cxp = require('../../resources/stubs/config.json').cxp;
const AppKey= cxp.AppKey;
const purchaseURL = cxp.getPurchaseHistory;
const recommendationsURL = cxp.getRecommendations;
const header = {
    'AppID': 'MPOS',
    'AppKey': AppKey
}

export function getCsrPurchasesNRecommends (csrObj, salesId) {
    const endDate = moment().format('L');
    const startDate= moment().subtract(10,'year').format('L');

    const purchaseParams = `?version=v2&id=${csrObj.cssId}&offset=0&limit=50&startDate=${startDate}&endDate=${endDate}&associatePin=${salesId}`;
    const apiCallPurchases = purchaseURL + purchaseParams;

    const recommendationParams =`?version=1.0&brand=NM&cssId=${csrObj.cssId}`
    const apiCallRecommendations = recommendationsURL + recommendationParams;

    const getPurchaseHistory =  callAxiosWebService({method: 'get', url: apiCallPurchases, headers: header});
    const getRecommendations = callAxiosWebService({method: 'get', url: apiCallRecommendations, headers: header})

    const history = Promise.all([getPurchaseHistory, getRecommendations]);
   
    return (dispatch) => {
        history
        .then(response => {
            console.log('RESPONSE', response);
            dispatch({
                type: GET_CSR_HISTORY,
                payload: { ...csrObj, purchases: response[0].data.data.purchases, recommendations: response[1].data.products}
            })
        })
        .catch(err => console.log(`Network Error: ${err}`))
    }
}

export function navigateToDomesticCustomer(cssId) {

    const params = `?version=v1&id=${cssId}`;
    const customerProfileApi = cxp.getCustomerDetail + params;
    const customerProfileApiCall = callAxiosWebService({ method: 'get', url: customerProfileApi, headers: header });
    
    return (dispatch) => {
        customerProfileApiCall.then((data) => {
            dispatch({
                type: 'NAVIGATE_TO_DOMESTIC_CUSTOMER',
                payload: data.data.data
            });
    
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    };
}

export function getSalesSummaryAction(cssId,associatePin){

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
            console.log(`Error: ${err}`);
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
