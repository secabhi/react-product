/* -------------- File with helper methods to be shared across modules --------- */
import axios from 'axios';
import { startSpinner } from '../../common/loading/spinnerAction';
/* -------------- Method to return parsed phone number from format [(nnn) nnn-nnnn] --------- */
export function parsePhoneNumber(phoneNumberString) {
    phoneNumberString = phoneNumberString.replace(/[\(\)\- ]/g, "");
    //console.log(parseInt(resultString));
    // return parseInt(phoneNumberString);
    return phoneNumberString;
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
    var requestObject = axios.post(url,params,header);
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
                resolve(error);
                if(error.status == "422") { //Workaround code to handle issue with SaleItemSplitCommission API
                    reject(error);
                }
                //reject(error);
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
                console.log('----------------Error Response------------------');
                console.log("Response Status: ",error.status);
                console.log("Response Data: ",error.data);
                console.log("ERROR", error);
                console.log('------------------------------------------------');
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
    var builder = new xml2js.Builder({explicitRoot : false});
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

