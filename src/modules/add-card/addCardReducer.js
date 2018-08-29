const initialState = {
    isGetStoreClientId: false,
    isGetCardDetails: false,
    isAurusResponse : false,
    isAddCardClientele : false,
    isAddCardClienteleFail : false,
    viewCarDetailsResp : '',
    getCardBinResp:'',
    bypassResp: '',
    closeTransactionResp:''

    

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
        break;
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
        break;
        case "GET_CARD_DETAILS_SUCCESS" : {
            return { 
                ...state,
                viewCarDetailsResp: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: true,
                isAurusResponse : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false
            }

        }
        break;
        case "ADD_CARD_CLIENTELE_SUCCESS" : {
            return {
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: false,
                isAurusResponse : false,
                isAddCardClientele : true,
                isAddCardClienteleFail : false
            }
          
        }
        break;
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
        break;
        case "AURUS_CALL_SUCCESS_RESPONSE":{
           return{
            ...state,
            isGetStoreClientId: false,
            isGetCardDetails: false,
            isAddCardClientele : false,
            isAddCardClientele : false,
            isAddCardClienteleFail : false  
           }
        }
        break;
        case "BYPASS" : {
            return{
                ...state,
                bypassResp:action.payload,
                isAddCardClientele : false,
                isAddCardClienteleFail : false ,
                getCardBinResp:'' 
            }
        }

        case "GETCARDBIN" : {
            return{
                ...state,
                getCardBinResp: action.payload,
                isAddCardClientele : false,
                isAddCardClienteleFail : false  ,
                bypassResp: '',
            }
        }
        break;
        case 'CANCELSWIPE': {
           return{
               ...state,
               cancelSwipeResp : action.payload,
               isAddCardClientele : false,
               isAddCardClienteleFail : false, 
               bypassResp: '', 
               getCardBinResp:'' 
           }
        }
        break;
        case 'CLOSETRANSACTION':
        return {
            ...state,
            closeTransactionResp: action.payload,
            isAddCardClientele : false,
            isAddCardClienteleFail : false
        }
        break;
        default :
            return {
                ...state,
                viewCarDetailsResp : '',
                getCardBinResp:'',
                bypassResp: '',
                closeTransactionResp:'',
                isAddCardClientele : false,
                isAddCardClienteleFail : false  
            }
    }
}