export function loginResponseValidation(responseObj)
{
    //alert('validation');
   var  loginDic = {"response_Code" : "",
   "response_Text": ""
   
    }

    
   
    for (var key in loginDic) {
        // check if the property/key is defined in the object itself, not in parent
        if (!responseObj.hasOwnProperty(key)) {
            if (responseObj.hasOwnProperty('message')) {
                if (responseObj.message.substring(0, 7) == 'timeout')
                    return ({ isValid: false, message: 'Response timedout' })
            }
            return ({ isValid: false, message: 'Response data missing' })
            break;
        }
    }
    return({isValid : true,message:''})


    // if(responseObj.hasOwnProperty('response_Code')&&(responseObj.hasOwnProperty('response_Text')))
    //    return({isValid : true,message:''})
    //     //return({isValid : false,message:'Response data missing'})
    // else if(responseObj.hasOwnProperty('message'))
    // {
    //    // alert(responseObj.message.substring(0,7))
    //     if(responseObj.message.substring(0,7) == 'timeout')
    //      return({isValid : false,message:'Response timedout'})
    // }
    //     return({isValid : false,message:'Response data missing'})
}