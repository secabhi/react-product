
import {
    UPDATE_CLIENTELE_EMAIL, 
    UPDATE_NON_CLIENTELE_INFO, 
    UPDATE_TRACKING_CLIENTELE,
    UPDATE_TRACKING_NON_CLIENTELE,
} from '../../common/constants/type';

export const updateTracking = (forWhom, val) => {
    if(forWhom === 'CLIENT') {
        return {type: UPDATE_TRACKING_CLIENTELE, payload: val}
    } 
    return {type: UPDATE_TRACKING_NON_CLIENTELE, payload: val}
}

export const updateClientalEmail = (email) => {
    return {type: UPDATE_CLIENTELE_EMAIL, payload: email}
}

export const updateNonClientele = (infoObj) => {
    return {type: UPDATE_NON_CLIENTELE_INFO, payload: infoObj}
}