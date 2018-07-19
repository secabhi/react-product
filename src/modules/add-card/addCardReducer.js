const initialState = {
    errors: [],
    isGetStoreClientId: false,
    isGetCardDetails: false,
    isAurusResponse : false
};

export function AddCardReducer(state = initialState, action) {
    console.log("Action recieved", action.payload);
    //console.log(state);

    switch (action.type) {
        case "AURUS_ADDCARD_SUCCESS_RESPONSE":
            {
                return {
                    ...state,
                    response: action.payload,
                    isGetStoreClientId: false,
                    isGetCardDetails: false,
                    isAurusResponse : true
                }
            }
        case "STORE_CLIENT_REQ_SUCCESS":
            {
                return {
                    ...state,
                    response: action.payload,
                    isGetStoreClientId: true,
                    isGetCardDetails: false,
                    isAurusResponse : false

                }
            }

        case "GET_CARD_DETAILS_SUCCESS":
            {
                return {
                    ...state,
                    response: action.payload,
                    isGetStoreClientId: false,
                    isGetCardDetails: true,
                    isAurusResponse : false
                }
            }
        default:
            return {
                ...state,
                isGetStoreClientId: false,
                isGetCardDetails: false
            }

    }
}