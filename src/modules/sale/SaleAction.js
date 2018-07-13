import {NAV_TO_SEND} from '../common/constants/type';

export function goToSalesPage(isSkip, details) {
    return (dispatch) => {
        dispatch( {
            type: 'GO_TO_SALES_PAGE',
            payload: { isSkip, details }
        });
    };
}

export function goToSendPage(data) {
    return (dispatch) => {
        dispatch( {
            type: NAV_TO_SEND,
            payload: { data }
        });
    };
};

