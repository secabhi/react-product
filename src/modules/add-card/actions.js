import {callPostWebService, callGetWebService,xml2json} from '../common/helpers/helpers';
import {getStore} from '../../store/store';


export function getStoreClientId(cssidreq) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.apiVerifySaleCustomer;
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
                        dispatch({ 
                            type: 'STORE_CLIENT_REQ_SUCCESS', payload: data
                        })
                    }
                break;
            }
        })

    }
    return (dispatch) => dispatch({type: 'GET_STORECLIENTID_SENT'})
}

export function getCardDetails(viewCardReq) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.viewCardUrl;
    var clientConfig = CONFIG_FILE.clientConfig;
    var params = viewCardReq;
    params = {
        ...params,
        ...clientConfig
    }
    const request = callPostWebService(url, params);
    return (dispatch) => {
        request.then(({data}) => {
            switch (data.response_code) {
                case 0:{
                    dispatch({type: 'GET_CARD_DETAILS_SUCCESS', payload: data})
                }
                break;
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
        } 
        else {
            //success("<GetCardBINResponse><POSID>01</POSID><APPID>04</APPID><CCTID>06</CCTID><KI>222508793407</KI><KIType>11</KIType><CardType>VIC</CardType> <CardToken>XXXX-XXXXXXXX-1000</CardToken> <CardEntryMode>M</CardEntryMode> <CardTokenDetailData></CardTokenDetailData> <FirstName>MENON</FirstName> <LastName>ASWATHI</LastName> <CardExpiryDate>1217</CardExpiryDate> <CustomerInfoValidationResult>0101010101</CustomerInfoValidationResult> <CustomerIdentifier></CustomerIdentifier> <Level3Capable>N</Level3Capable> <ProcessorToken></ProcessorToken> <ECOMMInfo> <MerchantIdentifier>100000019270</MerchantIdentifier> <StoreId>123456</StoreId> <TerminalId>25212886</TerminalId> <OneTimeToken>4111113456721111</OneTimeToken> <CardIdentifier></CardIdentifier> <OneOrderToken></OneOrderToken> </ECOMMInfo> <DCCOffered>0</DCCOffered> <FleetPromptCode></FleetPromptCode> <PurchaseRestrictionsCode>00</PurchaseRestrictionsCode> <FleetPromptsFlag> <OdometerFlag>N</OdometerFlag> <VehicleNumberFlag>N</VehicleNumberFlag> <JobNumberFlag>N</JobNumberFlag> <DriverIDNumberFlag>N</DriverIDNumberFlag> <EmployeeIDNumberFlag>N</EmployeeIDNumberFlag> <LicenseNumberFlag>N</LicenseNumberFlag> <JobIDFlag>N</JobIDFlag> <DeptNumberFlag>N</DeptNumberFlag> <CustomerDataFlag>N</CustomerDataFlag> <UserIDFlag>N</UserIDFlag> <VehicleIDNumberFlag>N</VehicleIDNumberFlag> </FleetPromptsFlag> <ResponseCode>00000</ResponseCode> <ResponseText>CARD DATA RETRIEVED SUCCESSFULLY</ResponseText> </GetCardBINResponse>");
            console.log("window.aurusplugin not available");
        }
    }catch (err) {
        console.log('getAddCardAurusResponse catch block: ', err);
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
                break;
                default : {
                    dispatch({type : "ADD_CARD_CLIENTELE_FAIL",payload:data})
                }
            }
        })
    }
    
}


// export function submitRequestToAurus(xmlreq,type){
//         try {
//         if (window.aurusplugin) {
//             console.log('window.aurusplugin present');
//             window.aurusplugin.callAurus(xmlreq, aurucaCallSuccess, aurucaCallError); 
//         } 
//         else {
//             //aurucaCallSuccess("<CloseTransactionResponse><POSID>01</POSID><APPID>04</APPID><CCTID>06</CCTID><AurusPayTicketNum>123456789012345678</AurusPayTicketNum><TransactionIdentifier>223456789012345672</TransactionIdentifier><ECOMMInfo><MerchantIdentifier></MerchantIdentifier><StoreId></StoreId><TerminalId></TerminalId></ECOMMInfo><ResponseCode>00000</ResponseCode><ResponseText>APPROVED</ResponseText></CloseTransactionResponse>");
//             console.log("window.aurusplugin not available");
//         }
//     }catch (err) {
//         console.log('submitRequestToAurus catch block: ', err);
//     }
//     return (dispatch) => dispatch({type: 'AURUS_REQUEST_SENT'})
// }

// var aurucaCallSuccess = function (message) {
//     var storeInstance = getStore();
//     var aurusresponse = message;
//     storeInstance.dispatch({type: 'AURUS_CALL_SUCCESS_RESPONSE',payload: aurusresponse});
//     }

// var aurucaCallError = function (message) {
//     console.log("aurus call error", message);
//     var storeInstance = getStore();
//     var aurusresponse = message;
//     storeInstance.dispatch({type: 'AURUS_CALL_FAIL_RESPONSE', payload: aurusresponse});
// }


export function submitRequestToAurus(xmlreq,type){
    try {
        if (window.aurusplugin) { 
            const request = new Promise((res,rej) => {
                window.aurusplugin.callAurus(xmlreq,res,rej)
            })  
            return (dispatch) => {
                request.then((data) => { 
                    const aurusresponse = xml2json(data);
                     switch(type){
                        case 'BYPASS':{
                            console.log("action switch:",type)
                            return dispatch({type: type, payload: aurusresponse})
                        }
                        case 'CLOSETRANSACTION':{
                            console.log("action switch:",type)
                            return dispatch({type: type, payload: aurusresponse})
                        }
                    }
                }).catch((err) => {
                    return {type: 'AURUS_FAILURE_RESPONSE', payload: err}})
            }
        }else {
            return { type: 'NO_AURUS_PLUGIN' }
        };
    }catch (err) {
        console.log('catch block: ', err);}
}
