const initialState = {
    isAddCardClientele : false,
    isAddCardClienteleFail : false,
    viewCarDetailsResp : '',
    getCardBinResp:'',
    bypassResp: '',
    error_message:'',
    isValid : false
};

export function AddCardReducer(state = initialState, action) {
    console.log("AddCard Reducer:",action.payload);
    switch (action.type) {
        case "GET_CARD_DETAILS_SUCCESS" : {
            return { 
                ...state,
                viewCarDetailsResp: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: true,
                isAurusResponse : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false,
                error_message:'',
                isValid : true
            }

        }
        break;
        case "GET_CARD_DETAILS_FAIL" : {
            return { 
                ...state,
                viewCarDetailsResp : '', 
                isGetStoreClientId: false,
                isGetCardDetails: true,
                isAurusResponse : false,
                isAddCardClientele : false,
                isAddCardClienteleFail : false,
                error_message: action.message,
                isValid : false
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
                isAddCardClienteleFail : false,
                error_message:'',
                isValid : true
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
                isAddCardClienteleFail : true,
                error_message:'',
                isValid : true
            }
        }
        break;
        
        case "ADD_CARD_CLIENTELE_API_FAIL" : {
            return{
                ...state,
                response: action.payload,
                isGetStoreClientId: false,
                isGetCardDetails: false,
                isAurusResponse : false,
                isAddCardClientele :false,
                isAddCardClienteleFail : false,
                error_message:action.message,
                isValid : false
            }
        }
        break;

        case "BYPASS" : {
            return{
                ...state,
                bypassResp:action.payload,
                isAddCardClientele : false,
                isAddCardClienteleFail : false ,
                getCardBinResp:'' ,
                error_message:'',
                isValid : true
            }
        }
        break;

        case "GETCARDBIN" : {
            return{
                ...state,
                getCardBinResp: action.payload,
                isAddCardClientele : false,
                isAddCardClienteleFail : false  ,
                bypassResp: '',
                error_message:'',
                isValid : true
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
               getCardBinResp:'' ,
               error_message:'',
               isValid : true
           }
        }
        break;
        
        default :
            return {
              ...state,
              viewCarDetailsResp : '',
              getCardBinResp:'',
              bypassResp: '',
              cancelSwipeResp : '',
              isAddCardClientele : false,
              isAddCardClienteleFail : false  ,
              error_message:'',
              isValid : true
        }
    }
}