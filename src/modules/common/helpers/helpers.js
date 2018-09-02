/* -------------- File with helper methods to be shared across modules --------- */
import axios from 'axios';
import { startSpinner } from '../../common/loading/spinnerAction';
import {getStore} from '../../../store/store';
import { START_SPINNER } from '../constants/type';

const config = require('../../../resources/stubs/config.json');
/* -------------- Method to return parsed phone number from format [(nnn) nnn-nnnn] --------- */

// var showalert = function(message){        
//     // if(Windows)    
//     //      {(new Windows.UI.Popups.MessageDialog(message, "Alert Message")).showAsync().done();
//     //     }
//     // else
//     try{
//           if(window.cordova)
//             (new Windows.UI.Popups.MessageDialog(message, "Alert Message")).showAsync().done();
//            // alert(message+'test')}
//         else{
//             alert(message)
//         }
         
//     }
//       catch(e)  {alert(message);}
// }
const store = getStore();
export function parsePhoneNumber(phoneNumberString) {
    phoneNumberString = phoneNumberString.replace(/[\(\)\- ]/g, "");
    //console.log(parseInt(resultString));
    // return parseInt(phoneNumberString);
    return phoneNumberString;
}

export function validZip(zip){
    return /(^[0-9\\s-]+$)/.test(zip);
}
export function validPostalCode(postal){
    
return /(^[0-9#/.\\s-]+$)/.test(postal);
}
export function validInterPostalCode(postal){
    
    return /^[ A-Za-z0-9-/.#]*$/ .test(postal);
    }

export function amountValidation(amount)
{   
    console.log('amount validation'+/^[0-9]*\.?[0-9]*$/.test(amount));
    var amt = amount.slice('.');
    if(/^[0-9]*\.?[0-9]*$/.test(amount))
    return true;
    else
    return false;
}

export function validateDecimal(value)    {
    var RE = /(^\d*\.?\d{0,2}$)/;
    if(RE.test(value)){
       return true;
    }else{
       return false;
    }
}

export function validateNonDecimalNumber(value)    {
    var RE = /(^\d*$)/;
    if(RE.test(value)){
       return true;
    }else{
       return false;
    }
}

export const formatCsrName = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function callPostWebService(url,params) {
    
    console.log('------------Web Service Call Details------------');
    var header = {
		'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    
    console.log("Request Type: POST");
    console.log("URL: ",url);
    console.log("Header: ",header);
    console.log("Params: ",params);
    console.log('------------------------------------------------');
   
   const config_timeout =  require('../../../resources/stubs/config.json').timeout;
    
    axios.defaults.timeout=config_timeout;
    var requestObject = axios.post(url,params,header);
    //debugger;
    return new Promise(
        function (resolve, reject) {
            requestObject.then((data) => {
               // debugger;
                console.log('----------------Success Response----------------');
                console.log("Response Status: ",data.status);
                console.log("Response Data: ",data.data);
                console.log('------------------------------------------------');            
                resolve(data);
            },(error) => {
               // debugger;
                console.log('----------------Error Response------------------');
               // debugger;
                console.log("Response Status: ",error);
                console.log("Response Data: ",error.response);
                console.log('------------------------------------------------');
                //showalert(error)
               //if((error.status == "404")&&(error.response.data ='Could not verify password due to system error.'))
             // resolve(error.response);
             if((error.message == "Network Error") || (error.message.substring(0,7)=="timeout"))
               {
                  
                //resolve({data: error}); //to handle the 404 not found for login errors
                store.dispatch({
                            type: 'SHOW_EXCEPTION',
                            payload: {showException:true,error:{failedModule:'',failureReason:error.message,failureDescription:'API:'+url}},
                            
                        });
             
               }
               else if((error.response.status == "404"))
                   { 
                      
                    resolve(error.response);
                   }
                else
                {   
                   
                    //resolve('Network Error: No Response received due as webservice call timedout');
                }
                if(error.status == "422") { //Workaround code to handle issue with SaleItemSplitCommission API
                    reject(error);
                }
                //reject(error);
                if((error.message != "Network Error") && (error.message.substring(0,7) !="timeout"))
                {
                resolve(error.response);
                }

            });
    
        }
    ); 
}

export function callGetWebService(url,params) {
   
    console.log('------------Web Service Call Details------------');
    var header = {
		'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
	};
    console.log("Request Type: GET");
    console.log("URL: ",url);
    console.log("Header: ",header);
    console.log("Params: ",params);
    console.log('------------------------------------------------');
    var requestObject = axios.get(url,params,header);
    return new Promise(
        function (resolve, reject) {
            requestObject.then((data) => {
                console.log('----------------Success Response----------------');
                console.log("Response Status: ",data.status);
                console.log("Response Data: ",data.data);
                console.log('------------------------------------------------');
                resolve(data);
            },(error) => {
                //alert('test');
                console.log('----------------Error Response------------------');
                console.log("Response Status: ",error.status);
                console.log("Response Data: ",error.data);
                console.log('------------------------------------------------');
                // store.dispatch({
                //     type: 'START_SPINNER',
                //     payload:false,
                    
                // });
                if(error.status == "422") { //Workaround code to handle issue with SaleItemSplitCommission API
                    reject(error);
                }
                //reject(error);
            });
    
        }
    );
}

export function callPutWebService(url,params,headers) {
    
    console.log('------------Web Service Call Details------------');
    var header = {
		'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
	};
    console.log("Request Type: PUT");
    console.log("URL: ",url);
    console.log("Header: ",headers);
    console.log("Params: ",params);
    console.log('------------------------------------------------');
    var requestObject = axios.put(url,params,{headers: headers});
    return new Promise(
        function (resolve, reject) {
            requestObject.then((data) => {
                console.log('----------------Success Response----------------');
                console.log("Response Status: ",data.status);
                console.log("Response Data: ",data.data);
                console.log('------------------------------------------------');
                resolve(data);
            },(error) => {
                //alert('test2');
                console.log('----------------Error Response------------------');
                console.log("Response Status: ",error.status);
                console.log("Response Data: ",error.data);
                console.log("ERROR", error);
                console.log('------------------------------------------------');
                // store.dispatch({
                //     type: 'START_SPINNER',
                //     payload: false,
                    
                // });
                resolve(error);
                if(error.status == "422") { //Workaround code to handle issue with SaleItemSplitCommission API
                    reject(error);
                }
                //reject(error);
            });
    
        }
    );
}


export function callAxiosWebService(obj) {
    console.log('------------Web Service Call Details------------');
    var header = {};
    console.log("Request Type: ", obj.method);
    console.log("URL: ",obj.url);
    console.log("Header: ",obj.headers);
    console.log("Params: NONE");
    console.log('------------------------------------------------');
    var requestObject = axios(obj);
    return new Promise(
        function (resolve, reject) {
            requestObject.then((data) => {
                console.log('----------------Success Response----------------');
                console.log("Response Status: ",data.status);
                console.log("Response Data: ",data.data);
                console.log('------------------------------------------------');
                resolve(data);
            },(error) => {
                console.log('----------------Error Response------------------');
                console.log("Response Status: ",error.status);
                console.log("Response Data: ",error.data);
                console.log('------------------------------------------------');

                if(error.status == "422") { //Workaround code to handle issue with SaleItemSplitCommission API
                    reject(error);
                }
                //reject(error);
            });
    
        }
    );
} 

export const isEmailAddress = (str) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/
    const result = str.match(pattern);
    return result
}



// helper functions for aurus

var fs = require('fs'), xml2js = require('xml2js');  
var parseString = require('xml2js').parseString;

export function json2xml(json) {
    var builder = new xml2js.Builder({headless: true});
    var xml = builder.buildObject(json);
    return xml
}


export function xml2json(xml) {
    var json;
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser({explicitArray : false});
    parser.parseString(xml, function (err, result) {
        json = JSON.stringify(result);   
    });
    return json;
}


export function xml2json2(xml) {
    var json;
    parseString(xml, function (err, result) {
        json = result;
    });
    return json;
}

export function readStartUpFile(success, failure) {

    let textFile = new XMLHttpRequest();
    textFile.open("GET", 'file:///C:/startup/MDTSelApps.txt', false);
    textFile.onreadystatechange =  () => {
        if(textFile.readyState === 4) {
            if(textFile.status === 200 || textFile.status == 0) {
                let linesOfText = textFile.responseText;
                alert(linesOfText);
                textFile.send(null);
                success(linesOfText);
            } else {
                failure('error start up file missing or Corrupt')
            }
        }
    }
    textFile.send(null);
}

//readTextFile("file:///C:/servernames.txt");||||||| .r77743
export function base64toHEX(str) {

    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
   
   }

function logSuccessHandler() {
    console.log("Logging successful");
}

function logErrorHandler(error) {
    console.log("Logging unsuccessful: " + error );
}

function getLogArgs(source,logMessage) {
    var argsObj = {};
    argsObj.configArgs = JSON.stringify({
        ...config.logConfig});
    argsObj.inputArgs_LogMessage = logMessage;
    argsObj.inputArgs_LogSource = source;
    argsObj.onSuccess = logSuccessHandler;
    argsObj.onError = logErrorHandler;    
    return argsObj;
}

export function logInfo(source,logMessage) {
    try {
        console.log('-----Inside logInfo------');
        if(window.cordova) {
            window.logger.logInfo(getLogArgs(source,logMessage));
        }
        else {
            //DO NOTHING
        }
    }
    catch(error) {
        logErrorHandler(error);
    }
}

export function logAudit(source,logMessage) {
    try {
        console.log('-----Inside logAudit------');
        if(window.cordova) {
            window.cordova.logger.logAudit(getLogArgs(source,logMessage));
        }
        else {
            //DO NOTHING
        }
    }
    catch(error) {
        logErrorHandler(error);
    }
}

export function logError(source,logMessage) {
    try {
        console.log('-----Inside logError------');
        if(window.cordova) {
            window.cordova.logger.logError(getLogArgs(source,logMessage));
        }
        else {
            //DO NOTHING
        }
    }
    catch(error) {
        logErrorHandler(error);
    }
}

export function logFatal(source,logMessage) {
    try {
        console.log('-----Inside logFatal------');
        if(window.cordova) {            
            window.cordova.logger.logFatal(getLogArgs(source,logMessage));
        }
        else {
            //DO NOTHING
        }
    }
    catch(error) {
        logErrorHandler(error);
    }
}