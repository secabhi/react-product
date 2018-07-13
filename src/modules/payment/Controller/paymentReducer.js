const initialState = {
    clientData : null,
    aurusResponse : null,
};

export function paymentReducer(state = initialState, action) {

    switch (action.type) {

        case 'SUCCESS': {
            return {
                ...state,
                clientData:action.payload, 
                failure: 0
            };
            break;
        }

        case 'FAILURE' :{
            return{
                ...state,
                failure: 1
            }
            break;
        }

        case 'CLEAR':{
            return {
                ...state, 
                failure:null
            }
        }
        case 'SET_CLIENTELED':
            return {
                ...state,
                clienteled: action.payload
            }

        case 'AURUS_SUCCESS__RESPONSE' : 
        return {
            ...state,
            aurusresponse: action.payload


        }

        default:
            return {
                ...state
            };
    }
}