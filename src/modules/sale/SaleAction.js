import {NAV_TO_SEND} from '../common/constants/type';

export function goToSalesPage(isSkip, details) {
    return (dispatch) => {
        dispatch( {
            type: 'GO_TO_SALES_PAGE',
            payload: { isSkip, details }
        });
    };
}

export function goToSendPage(componentName, sameSenderReciever) {
    return (dispatch) => {
        dispatch( {
            type: NAV_TO_SEND,
            payload: { componentName, sameSenderReciever }
        });
    };
};


export function setOption7(flag) {
    return (dispatch) => {
        dispatch( {
            type: 'SET_OPTION_7',
            isOption7: flag
        });
    };
}
