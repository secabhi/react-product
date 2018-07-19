import {callPostWebService, callGetWebService} from '../common/helpers/helpers';
import {getStore} from '../../store/store';

/* To add card - Domestic */
export function addCardAction(addCardData) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.addCardURL;
    var params = addCardData;
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data);

            switch (data.ResCode) {

                case 0:
                    {
                        dispatch({type: 'UPDATE_CARD_SUCCESS', payload: data});
                        break;
                    }

                case 1:

                    {
                        dispatch({type: 'UPDATE_CARD_INVALID_CARD', payload: data});
                        break;
                    }

                case 3:
                    {
                        dispatch({type: 'UPDATE_CARD_MISSING_DETAILS', payload: data});
                        break;
                    }

                case 5:

                    {
                        dispatch({type: 'UPDATE_CARD_GENERAL_ERROR', payload: data});
                        break;
                    }

                case 7:
                    {
                        dispatch({type: 'UPDATE_CARD_RECORD_NOT_UPDATED', payload: data});
                        break;
                    }

                case 9:
                    {
                        dispatch({type: 'UPDATE_CARD_INVALID_NUMBER', payload: data});
                        break;
                    }
                case 14:
                default:
                    {
                        console.log("Inside Switch Block: default");
                        dispatch({type: 'UPDATE_CARD_DEFAULT', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'UPDATE_CARD_FAIL', payload: error});
        });
    };
}

export function getAddCardAurusResponse(xmlrequest) {
  
    console.log("in payment action");
    console.log("xmlrequest" + xmlrequest);
    try {
        if (window.aurusplugin) {
            console.log('window.aurusplugin present');
            window.aurusplugin.callAurus(xmlrequest, success, error);
            
        } else {
            //success("<GetCardBINResponse><POSID>01</POSID><APPID>04</APPID><CCTID>06</CCTID><KI>12345678901234567890</KI><KIType>11</KIType><CardType>VIC</CardType> <CardToken>XXXXXXXXXXXXXXXX</CardToken> <CardEntryMode>M</CardEntryMode> <CardTokenDetailData></CardTokenDetailData> <FirstName>John</FirstName> <LastName>Mathew</LastName> <CardExpiryDate>1217</CardExpiryDate> <CustomerInfoValidationResult>0101010101</CustomerInfoValidationResult> <CustomerIdentifier></CustomerIdentifier> <Level3Capable>N</Level3Capable> <ProcessorToken></ProcessorToken> <ECOMMInfo> <MerchantIdentifier>100000019270</MerchantIdentifier> <StoreId>123456</StoreId> <TerminalId>25212886</TerminalId> <OneTimeToken>4111113456721111</OneTimeToken> <CardIdentifier></CardIdentifier> <OneOrderToken></OneOrderToken> </ECOMMInfo> <DCCOffered>0</DCCOffered> <FleetPromptCode></FleetPromptCode> <PurchaseRestrictionsCode>00</PurchaseRestrictionsCode> <FleetPromptsFlag> <OdometerFlag>N</OdometerFlag> <VehicleNumberFlag>N</VehicleNumberFlag> <JobNumberFlag>N</JobNumberFlag> <DriverIDNumberFlag>N</DriverIDNumberFlag> <EmployeeIDNumberFlag>N</EmployeeIDNumberFlag> <LicenseNumberFlag>N</LicenseNumberFlag> <JobIDFlag>N</JobIDFlag> <DeptNumberFlag>N</DeptNumberFlag> <CustomerDataFlag>N</CustomerDataFlag> <UserIDFlag>N</UserIDFlag> <VehicleIDNumberFlag>N</VehicleIDNumberFlag> </FleetPromptsFlag> <ResponseCode>00000</ResponseCode> <ResponseText>CARD DATA RETRIEVED SUCCESSFULLY</ResponseText> </GetCardBINResponse>");
            console.log("window.aurusplugin not available");
        }

    } catch (err) {
        console.log('catch block: ', err);
    }

    return (dispatch) => dispatch({type: 'AURUS_REQUEST_SENT'})
}

var success = function (message) {

    console.log("aurus call success", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_SUCCESS_RESPONSE', payload: aurusresponse});
}

var error = function (message) {
    console.log("aurus call error", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_FAIL_RESPONSE', payload: aurusresponse});
}

export function getStoreClientId(cssidreq) {

    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var url = CONFIG_FILE.getClientteleURL;
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
                        dispatch({type: 'CARD_DETAILS_REQUEST_SENT',payload : ''})
                }
            }
        })
    }
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
       
            console.log(data);
        } )

    }
    

}