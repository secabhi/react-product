import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../../common/constants/type";
import { callPostWebService, callGetWebService } from '../../../common/helpers/helpers';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";

const config = require('../../../../resources/stubs/config.json');
const clientConfig = config.clientConfig;
const addAlterationsUrl = config.apiAddAlterations;


export function addAlterations(alterationsObj) {

    const body = {
        ...clientConfig,
        ...alterationsObj
    }

    const addAlterationsApiCall = callPostWebService(addAlterationsUrl, body)
            return (dispatch) => {
                addAlterationsApiCall.then(({
                    data
                }) => {
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
    
                        default:
                            {
                                dispatch({
                                    type: 'ALTERATION_FAILURE',
                                    payload: data
                                });
                                break;
                            }
                    }
                })
                .catch(error => {
                    dispatch({
                        type: 'ADD_ALTERATIONS_FAIL',
                        payload: error
                    });
                });
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

