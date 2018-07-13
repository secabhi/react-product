var fs = require('fs'), xml2js = require('xml2js');  
var parseString = require('xml2js').parseString;

export function json2xml(json) {
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(json);
    return xml
}

export function xml2json(xml) {
    var json;
    parseString(xml, function (err, result) {
        json = result;
    });
    return json;
}

export function base64toHEX(base64) {

    var raw = atob(base64);
   
    var HEX = '';
   
    for ( var i = 0; i < raw.length; i++ ) {
   
      var _hex = raw.charCodeAt(i).toString(16)
   
      HEX += (_hex.length==2?_hex:'0'+_hex);
   
    }
    return HEX.toUpperCase();
   
   }
   
