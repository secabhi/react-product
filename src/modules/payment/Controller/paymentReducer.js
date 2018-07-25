const initialState = {
    clientData : null,
    aurusresponse: null
};

export function paymentReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_CLIENT_DETAILS': {
            return {
                ...state,
                clientData:action.payload
            };
            break;
        }

        case 'UPDATE_CLIENT_DETAILS': {
            return {
                ...state,
                clientData:action.payload
            };
            break;
        }

        case 'FAILURE' :{
            return{
                ...state,
                clientData:action.payload
            }
            break;
        }

        case 'CLEAR':{
            return {
                ...state,
                clientData:null
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

        //PRINT RECEIPT
        case 'PRINT_RECEIPT_SUCCESS':
        console.log(action.payload)
        return {
            ...state,
            data: action.payload
        }
        
        case 'PRINT_RECEIPT_FAILURE':
        console.log(action.payload)
        return {
            ...state,
            data: action.payload
        }

        // ADD TENDER
        case 'ADD_TENDER_SUCCESS' :
        return {
            ...state,
            data: action.payload
        }

        case 'ADD_TENDER_FAILURE' :
        return {
            ...state,
            data: action.payload
        }

        // COMPLETE TRANSACTION
        case 'COMPLETE_TRANSACTION_SUCCESS' :
        return {
            ...state,
            data: action.payload
        }

        case 'COMPLETE_TRANSACTION_FAILURE' :
        return {
            ...state,
            data: action.payload
        }

        default:
            return {
                ...state
            };
    }
}