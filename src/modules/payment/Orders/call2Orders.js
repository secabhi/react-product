import { xml2json2 } from '../../common/helpers/helpers';



// In future we can setup conditions when not to resolve.
export default (xmlRequest) => {
    return new Promise((res, rej) => {
        try {
            if (window.aurusplugin) { 
                const request = new Promise((res,rej) => {
                    window.aurusplugin.callAurus(xmlRequest,res,rej)                 
                })
                .then((data) => {
                    const aurusresponse = xml2json2(data);
                    console.log("action response: ",JSON.stringify(aurusresponse)) 
                    res(aurusresponse);
        
                })
                .catch((err) => {
                    console.log('AURUS_FAILURE_RESPONSE',err);
                    rej('AURUS FAILURE RESPONSE ' + err);
                })
            } else {
                console.log('AURUS PLUGIN FAILURE');
                rej('AURUS PLUGIN FAILURE');
            }
        } 
        catch (err) {
                console.log('catch block: ', err);
                rej('catch block error '+ err)
        }
    })
}
    



