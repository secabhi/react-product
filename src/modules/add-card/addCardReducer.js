const initialState = {
    errors: [],
    isGetStoreClientId: false,
    isGetCardDetails: false,
    isAurusResponse : false,
    isAddCardClientele : false,
    isAddCardClienteleFail : true
};

export function AddCardReducer(state = initialState, action) {
    switch (action.type) {
        case "AURUS_ADDCARD_SUCCESS_RESPONSE" : {
            return {
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: false,
                isAurusResponse : true,
                isAddCardClientele : false,
                isAddCardClienteleFail : false
            }
        }

        case "STORE_CLIENT_REQ_SUCCESS" : {
            return {
                ...state,
                response: action.payload,
                isGetStoreClientId: true,
                isGetCardDetails: false,
                isAurusResponse : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false
            }
        }

        case "GET_CARD_DETAILS_SUCCESS" : {
            return { 
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: true,
                isAurusResponse : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false
            }
        }

        case "ADD_CARD_CLIENTELE_SUCCESS" : {
            return {
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: true,
                isAurusResponse : false,
                isAddCardClientele : true,
                isAddCardClienteleFail : false
            }
        }

        case "ADD_CARD_CLIENTELE_FAIL" : {
            return{
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: false,
                isAurusResponse : false,
                isAddCardClientele :false,
                isAddCardClienteleFail : true
            }
        }

        default :
            return {
                ...state,
                isGetStoreClientId: false,
                isGetCardDetails: false,
                isAddCardClientele : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false  
            }
    }
}