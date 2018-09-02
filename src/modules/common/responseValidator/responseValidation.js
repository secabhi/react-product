export function responseValidation(responseObj, dictObj)
{
    //alert('validation');
  

    //debugger;
   
    for (var key in dictObj) {
        // check if the property/key is defined in the object itself, not in parent
        if (!responseObj.hasOwnProperty(key)) {
            if (responseObj.hasOwnProperty('message')) {
                if (responseObj.message.substring(0, 7) == 'timeout') {
                    return ({ isValid: false, message: 'Response timedout' })
                    break;
                }
                return ({ isValid: false, message: 'Invalid Request' })
                break;
            }
            else {
                if ((responseObj.key == null) || (responseObj.key == undefined)) {
                    return ({ isValid: false, message: 'Response data missing' })
                    break;
                }
            }

        }
    }
    return({isValid : true,message:''})


 }