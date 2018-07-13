import { TRANSACTION_ID_REQUEST } from '../common/constants/type';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

const URL = CONFIG_FILE.apiAddressTransaction;

const env = require('../../settings/env.js');
const path = env.PATH;
const apiAddressTransaction = path+'apiAddressTransaction.json';


//calls api to compare passwords during Login event. 
export function getTransactionRequest(data){
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, data):callGetWebService(URL, apiAddressTransaction);

        return (dispatch) => {
            request.then(({data}) => {
                dispatch( {
                    type: TRANSACTION_ID_REQUEST,
                    payload: data
                });
            });
        };
    


}

export function setButtonClick(buttonId) {
    return (dispatch) => {
        dispatch( {
            type: 'SET_BUTTON_CLICK_ID',
            payload: buttonId
        });
    };
}