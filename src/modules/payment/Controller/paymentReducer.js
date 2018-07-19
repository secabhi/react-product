const initialState = {
    clientData : null,
    aurusresponse: null
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
        //isell cart update reducers
        case 'ISELL_SUCCESS' : 
        console.log('ISELL_SUCCESS true');
        return {
            ...state,
            data: action.payload,
            type:'UPDATE_ISELL_SUCCESS'


        }

        case 'ISELL_FAILURE' : 
        return {
            ...state,
            data: action.payload,
            type : 'UPDATE_ISELL_FAILURE'


        }

        default:
            return {
                ...state
            };
    }
}