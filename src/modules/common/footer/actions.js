import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import {getStore} from '../../../store/store';

export function getPEDBatteryStatus(xmlreq){
    try{
        if (window.aurusplugin) {
            console.log('getPEDBatteryStatus Plugin Available');
            window.aurusplugin.callAurus(xmlreq, success, error);  
        }
        else {
            console.log("getPEDBatteryStatus Plugin not available");
            //success("<GetStatusResponse><POSID>01</POSID><APPID>04</APPID><CCTID>06</CCTID><CCTScreenName/><StatusType>3</StatusType><CCTVersion>ANN-20180123A</CCTVersion><AESDKVersion>5.11</AESDKVersion><DiagnosticsStatus><LineItem><ResponseText/><ResponseCode/><DiagnosticName/></LineItem></DiagnosticsStatus><SystemParamters><LineItem><ParameterValue>77%</ParameterValue><ParameterName>PEDBatteryLevel</ParameterName></LineItem></SystemParamters><ResponseText>ALIVE</ResponseText><ResponseCode>00000</ResponseCode></GetStatusResponse>");

        }
    } 
    catch (err) {
        console.log('getPEDBatteryStatus catch block: ', err);
    }
    return (dispatch) => dispatch({type: 'AURUS_BATTERY_STATUS_REQUEST_SENT'})
}

var success = function (message) {
 
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({
        type: 'PED_BATTERY_STATUS',
        payload: aurusresponse
    });
}

var error = function (message) {
    console.log("ped battery status", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'PED_BATTERY_STATUS_FAIL_RESPONSE', payload: aurusresponse});
}