import {callPostWebService, callGetWebService} from '../common/helpers/helpers';
import {getStore} from '../../store/store';


export function getStoreClientId(cssidreq) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.clienteleCustomer;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = cssidreq;
    params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params)
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.response_code) {
                case 0:
                    {
                        dispatch({type: 'STORE_CLIENT_REQ_SUCCESS', payload: data})
                    }

                // case 2:
                //     {
                //         dispatch({type: 'STORE_CLIENT_GENERAL_ERROR', payload: data})
                //     }

                // case 3:
                //     {
                //         dispatch({type: 'STORE_CLIENT_CUSTOMER_NOT_FOUND', payload: data})

                //     }

                // case 4:
                //     {
                //         dispatch({type: 'STORE_CLIENT_INVALID_PHONE', payload: data})

                //     }

                // case 6:
                //     {
                //         dispatch({type: 'STORE_CLIENT_INVALID_ASSOCIATE', payload: data})

                //     }

                // case 7:
                //     {
                //         dispatch({type: 'STORE_CLIENT_RECORD_NOT_ADDED', payload: data})

                //     }
                // case 8:
                //     {
                //         dispatch({type: 'STORE_CLIENT_MISSING_DETAILS', payload: data})

                //     }
                // case 9:
                //     {
                //         dispatch({type: 'STORE_CLIENT_INVALID_ZIP', payload: data})

                //     }
                // case 11:
                //     {
                //         dispatch({type: 'STORE_CLIENT_RECORD_NOT_UPDATED', payload: data})

                //     }
            }
        })

    }
    return (dispatch) => dispatch({type: 'GET_STORECLIENTID_SENT'})
}

export function getCardDetails(viewCardReq) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.viewCardUrl;
    var params = viewCardReq;
    const request = callPostWebService(url, params);
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.response_code) {
                case 0:{
                    dispatch({type: 'GET_CARD_DETAILS_SUCCESS', payload: data})
                }
                default:{
                        dispatch({type: 'GET_CARD_DETAILS_FAIL',payload : data})
                }
            }
        })
    }
}

export function getAddCardAurusResponse(xmlrequest) {
    try {
        if (window.aurusplugin) {
            console.log('window.aurusplugin present');
            window.aurusplugin.callAurus(xmlrequest, success, error);
            
        } else {
            //success("<GetCardBINResponse><POSID>01</POSID><APPID>04</APPID><CCTID>06</CCTID><KI>10234567890123456789</KI><KIType>11</KIType><CardType>VIC</CardType> <CardToken>XXXX-XXXXXXXX-1063</CardToken> <CardEntryMode>M</CardEntryMode> <CardTokenDetailData></CardTokenDetailData> <FirstName>ADAM</FirstName> <LastName>BEST</LastName> <CardExpiryDate>1217</CardExpiryDate> <CustomerInfoValidationResult>0101010101</CustomerInfoValidationResult> <CustomerIdentifier></CustomerIdentifier> <Level3Capable>N</Level3Capable> <ProcessorToken></ProcessorToken> <ECOMMInfo> <MerchantIdentifier>100000019270</MerchantIdentifier> <StoreId>123456</StoreId> <TerminalId>25212886</TerminalId> <OneTimeToken>4111113456721111</OneTimeToken> <CardIdentifier></CardIdentifier> <OneOrderToken></OneOrderToken> </ECOMMInfo> <DCCOffered>0</DCCOffered> <FleetPromptCode></FleetPromptCode> <PurchaseRestrictionsCode>00</PurchaseRestrictionsCode> <FleetPromptsFlag> <OdometerFlag>N</OdometerFlag> <VehicleNumberFlag>N</VehicleNumberFlag> <JobNumberFlag>N</JobNumberFlag> <DriverIDNumberFlag>N</DriverIDNumberFlag> <EmployeeIDNumberFlag>N</EmployeeIDNumberFlag> <LicenseNumberFlag>N</LicenseNumberFlag> <JobIDFlag>N</JobIDFlag> <DeptNumberFlag>N</DeptNumberFlag> <CustomerDataFlag>N</CustomerDataFlag> <UserIDFlag>N</UserIDFlag> <VehicleIDNumberFlag>N</VehicleIDNumberFlag> </FleetPromptsFlag> <ResponseCode>00000</ResponseCode> <ResponseText>CARD DATA RETRIEVED SUCCESSFULLY</ResponseText> </GetCardBINResponse>");
            console.log("window.aurusplugin not available");
        }
    } catch (err) {
        console.log('catch block: ', err);
    }
    return (dispatch) => dispatch({type: 'AURUS_REQUEST_SENT'})
}

var success = function (message) {
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_SUCCESS_RESPONSE',payload: aurusresponse});
    }

var error = function (message) {
    console.log("aurus call error", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_FAIL_RESPONSE', payload: aurusresponse});
}

export function addCardDetailsToClientele(addreq){
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.addCardURL;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = addreq;
    var params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params);
    return(dispatch) =>{
        request.then( ({data}) =>{
            switch(data.response_code){
                case 0 : {
                    dispatch({type: "ADD_CARD_CLIENTELE_SUCCESS",payload : data})
                }
                default : {
                    dispatch({type : "ADD_CARD_CLIENTELE_FAIL",payload:data})
                }
            }
        })
    }
    
}