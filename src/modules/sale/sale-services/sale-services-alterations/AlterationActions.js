import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../../common/constants/type";
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";
import { responseValidation } from '../../../common/responseValidator/responseValidation';
const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const addAlterationsUrl = config.apiAddAlterations;


export function addAlterations(alterationsObj,userpin) {
    const body = {
        ...clientConfig,
        StoreAssoc:userpin,
        ...alterationsObj
    }
    const SaleItemResponseObj = require('../../../common/responseValidator/responseDictionary').saleItemResponseObj;
    var validated = {isValid : false,
                    message :''}

    const addAlterationsApiCall = callPostWebService(addAlterationsUrl, body)
            return (dispatch) => {
                addAlterationsApiCall.then(({
                    data
                }) => {
                    validated = responseValidation(data,SaleItemResponseObj);
              if(validated.isValid){
                   switch (data.response_text) {
    
                        case "ADD_ALTERATIONS":
                            {
                                dispatch({
                                    type: 'ADD_ALTERATIONS',
                                    payload: data
                                });
                                break;
                            }
                        case "AC_SUCCESS":
                        {
                            //debugger;
                            dispatch({
                                type: 'ALTERATION_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        case "AA_INVALIDALTERATIONTAG":
                        {
                            dispatch({
                                type: 'AA_INVALIDALTERATIONTAG',
                                payload: data
                            });
                            break;
                        }
                        case "AA_ALTTAGALREADYUSED":
                        {
                            dispatch({
                                type: 'AA_ALTTAGALREADYUSED',
                                payload: data
                            });
                            break;
                        }
    
                        default:
                            {
                                dispatch({
                                    type: 'ALTERATION_FAILURE',
                                    payload: data
                                });
                                break;
                            }
                    }
                }
                else{
                    var errorMessage = validated.message + ' for web service: '+addAlterationsUrl+' TimeOut Duration:'+require('../../../../resources/stubs/config.json').timeout+'ms';
                    dispatch({
                        type: 'SALE_ALTERATION_FAILURE_REQUEST_VALIDFAILED',
                        payload: {  },
                        message : errorMessage
                    });
                }
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                    dispatch({
                        type: 'SALE_ALTERATION_FAILURE_REQUEST_VALIDFAILED',
                        payload: {  },
                        message : 'Exception occured during webservice call '+ addAlterationsUrl
                    });
                });
                // })
                // .catch(error => {
                //     dispatch({
                //         type: 'ADD_ALTERATIONS_FAIL',
                //         payload: error
                //     });
                // });
        };

}

export function resetAlterationComplete() {
    return {type: RESET_ALTERATION, payload: false}
}

// export function setAlterationDetails(date) {
//     return {
//         type: 'SET_ALTERATION_DETAILS',
//         payload: date
//     }
// }

