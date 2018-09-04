import axios from 'axios';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';

//import constants
import {REMINDERS_SUCCESS,IM_SUCCESS, IM_INVALIDREQUEST, REMINDERS_INVALID, IM_GENERALERROR,REMINDERS_GENERAL , REMINDERS_REQUEST_VALIDFAILED,IM_NOREMINDER } from './constants';

import {responseValidation} from '../common/responseValidator/responseValidation';

const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
const URL_SKU = CONFIG_FILE_ADD.cxp.getProductSearchSKU;
const APP_KEY = CONFIG_FILE_ADD.cxp.AppKey;

const body = {
    "AppKey" : APP_KEY,
    "AppID" : "MPOS"
};



export function getReminders(userPin,ClientNumber)
{
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    const clientConfig = CONFIG_FILE.clientConfig;
    var params =
        {
            ...clientConfig,
            "StoreAssoc":userPin,
            "StoreClientNo": ClientNumber
        }
    
    const getRemindersApi = CONFIG_FILE_ADD.getRemindersURL;
    //console.log('reminders api'+getRemindersApi)
    const getRemindersApiCall = callPostWebService(getRemindersApi,params);
      //as part of error handling
      //debugger;
      const remindersResponseObj = require('../common/responseValidator/responseDictionary').remindersResponseObj;
      var validate = {isValid : false,
                      message :''}
      //as part of error handling

    return (dispatch) => {
        getRemindersApiCall.then((data) => {
        // added for response validation
        validate = responseValidation(data.data,remindersResponseObj);  
        if(validate.isValid){     
            switch(data.data.responseText)
            {
                
                case IM_SUCCESS :
               
                    dispatch({
                        type: REMINDERS_SUCCESS,
                        payload: data.data
                    });
                    break
                case IM_INVALIDREQUEST:
                
                    dispatch({
                        type: REMINDERS_INVALID,
                        payload: data.data
                    });
                    break;
                case IM_GENERALERROR :
                
                    dispatch({
                        type: REMINDERS_GENERAL,
                        payload: data.data
                    });
                    break;
                case IM_NOREMINDER : 
                 dispatch({
                    type: IM_NOREMINDER,
                    payload: data.data
                });
                break;
            }
        }
        else{
           // var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';

            dispatch({
                type: REMINDERS_REQUEST_VALIDFAILED,
                payload: {  },
                message : validate.message
            });
        }
            

        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    };
}