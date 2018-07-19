import { callPostWebService, callGetWebService, callAxiosWebService } from '../../common/helpers/helpers';
const config = require('../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;

//grabs url and other data from config file.
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const env = require('../../../settings/env.js');
const path = env.PATH;
const getClientteleURL = path + 'getClientteleURL.json';
// //sets url to be used for api call
const URL = CONFIG_FILE.getClientteleURL;

export function getIsellCartUpdateAction(getIsellCart) {

    const cxp = require('../../../resources/stubs/config.json').cxp;
    const APP_KEY = cxp.AppKey;
    const header = {
        'AppID': 'MPOS',
        'AppKey': APP_KEY
    }

    const params = `?cartId=${getIsellCart}`;
    // const params = `?cartId=${201803082366}`;
    const getCartDetailsApi = cxp.getCartDetails + params;
    const getCartDetailsApiCall = callAxiosWebService({ method: 'get', url: getCartDetailsApi, headers: header });

    return (dispatch) => {
        getCartDetailsApiCall.then((data) => {
            console.log('getIsellCartUpdateAction data:', data);
            if (data.data.status == "success") {
                dispatch({
                    type: 'GET_ISELL_CART_REQUEST_SUCCESS',
                    payload: data.data.data
                });
            }
            else {
                dispatch({
                    type: 'GET_ISELL_CART_REQUEST_FAILURE',
                    payload: data
                });
            }

        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    };
}
export function getCustomerDetailsClienteleAction(customerDetailsList) {
    // const params = {
    //     ...clientConfig,
    //     "ClientTypeID": "1000",
    //     "CFirstName":customerDetailsList.customerFirstName,    
    //     "CLastName":customerDetailsList.customerLastName,    
    //     "CEmail":customerDetailsList.email,    
    //     "COtherPhone":customerDetailsList.phoneNumber,    
    //     "Address_Ln1":customerDetailsList.addressLine1,    
    //     "City":customerDetailsList.city,    
    //     "Zip5":customerDetailsList.postalCode,    
    //     "CCssNo":customerDetailsList.cssId,  
    //     "StoreClientNo":"",   
    //     "Country":"INDIA",  
    //     "flagByPASS":true,    
    //     "ClienteleUpdateFlag":false
    // };
    const params = {
        "ClientID": "0010:0169:06062018:013639",
        "ClientTypeID": "1000",
        "SourceApp": "POS",
        "Country": "INDIA",
        "storeAssoc": "110010",
        "SourceLoc": "0010",
        "CFirstName": "SRINATH",
        "CLastName": "SRIPRADA",
        "CEmail": "sriprada@neimanmarcus.com",
        "COtherPhone": "",
        "Address_Ln1": "",
        "City": "",
        "Zip5": "",
        "CCssNo": "147975267",
        "StoreClientNo": "",
        "flagByPASS": true,
        "ClienteleUpdateFlag": false
    }
    console.log("****** getCustomerDetailsClienteleAction IN ACTION ", params);
    const request = env.ENV_MODE == 'dev1' ? callPostWebService(URL, params) : callGetWebService(getClientteleURL, {});

    console.log("getCustomerDetailsClienteleActionUpdate Parameters being sent", params);

    return (dispatch) => {

        request.then((data) => {
            console.log('getCustomerDetailsClienteleActionUpdate data:', data);
            if (data.data.response_text == "CS_SUCCESS") {
                dispatch({
                    type: 'GET_CLIENT_TELE_REQUEST_SUCCESS',
                    payload: data
                });
            }
            else {
                dispatch({
                    type: 'GET_CLIENT_TELE_REQUEST_FAILURE',
                    payload: data
                });
            }
        });
    };
}