const initialState = {
    printRes: null,
    clientData: null,
    scannerRes: null,
    getCardBinRes: null,
    transactionRes: null,
    bypassRes: null,
    cancelSwipeRes: null,
    closeTransactionRes: null,
    signatureRes: null,
    initRes: null,
    AESDKRes: null,
    batteryRes: null,
    transLog: null,
    tenderLog: null,
    isellData: null,
    midVoidRes: null,
    voidRes: null,
    notSwipedRes: null,
    getGiftCardBinRes: null,
    giftCardBalanceinqRes: null,
    convertSALTRes: null,
    failure: null
};

export function paymentReducer(state = initialState, action) {
    console.log("reducer switch: ", action.type)
    if (action.payload != undefined) {
        switch (action.type) {
                //AURUS
            case 'AURUS_REQUEST_SENT':
                return {
                    ...state
                }
            case 'SCANNER':
                return {
                    ...state,
                    scannerRes: action.payload
                }
            case 'GETCARDBIN':
                return {
                    ...state,
                    getCardBinRes: action.payload
                }
            case 'CANCELSWIPE':
                return {
                    ...state,
                    cancelSwipeRes: action.payload
                }

            case 'TRANSACTIONREQUEST':
                return {
                    ...state,
                    transactionRes: action.payload
                }

            case 'GIFTCARD_GETCARDBIN':
                console.log("GIFTCARD_GETCARDBIN REDUCER SWITCH", action.payload);
                return {
                    ...state,
                    getGiftCardBinRes: action.payload
                }

            case 'GIFTCARDBALANCE_INQUIRY':
                console.log("GIFTCARDBALANCE_INQUIRY REDUCER SWITCH", action.payload);
                return {
                    ...state,
                    giftCardBalanceinqRes: action.payload
                }

            case 'BYPASS':
                return {
                    ...state,
                    bypassRes: action.payload
                }
            case 'CLOSETRANSACTION':
                return {
                    ...state,
                    closeTransactionRes: action.payload
                }
            case 'SIGNATURE':
                return {
                    ...state,
                    signatureRes: action.payload
                }

            case 'AURUS_FAILURE_RESPONSE':
                return {
                    ...state,
                    failure: "Payment Gateway request error"
                }

            case 'INIT':
                return {
                    ...state,
                    initRes: action.payload
                }
            case 'AESDKREG':
                return {
                    ...state,
                    AESDKRes: action.payload
                }
            case 'BATTERY':
                return {
                    ...state,
                    batteryRes: action.payload
                }
            case 'NO_AURUS_PLUGIN':
                return {
                    ...state,
                    failure: "Unable to detect Payment Gateway"
                }

                //Convert SALT to Giftcard
            case 'CONVERT_SUCCESS':
                {
                    return {
                        ...state,
                        convertSALTRes: action.payload
                    }
                }

            case 'CONVERT_FAILURE':
                {
                    return {
                        ...state,
                        convertSALTRes: action.payload
                    }
                }

                //isell cart update reducers
            case 'ISELL_SUCCESS':
                console.log('ISELL_SUCCESS true');
                return {
                    ...state,
                    isellData: action.payload,
                    type: 'UPDATE_ISELL_SUCCESS'
                }

            case 'ISELL_FAILURE':
                return {
                    ...state,
                    isellData: action.payload,
                    type: 'UPDATE_ISELL_FAILURE'

                }

                //email reciept
            case 'GET_CLIENT_DETAILS':
                {
                    return {
                        ...state,
                        clientData: action.payload
                    };
                }
            case 'GET_CLIENT_DETAILS':
                {
                    return {
                        ...state,
                        clientData: action.payload
                    };
                }

            case 'UPDATE_CLIENT_DETAILS':
                {
                    return {
                        ...state,
                        clientData: action.payload
                    };
                }

            case 'UPDATE_CLIENT_DETAILS_FAILURE':
                {
                    return {
                        ...state,
                        clientData: action.payload
                    }
                }

            case 'CLEAR':
                {
                    return {
                        ...state,
                        printRes: null,
                        clientData: null,
                        scannerRes: null,
                        getCardBinRes: null,
                        transactionRes: null,
                        bypassRes: null,
                        cancelSwipeRes: null,
                        closeTransactionRes: null,
                        signatureRes: null,
                        initRes: null,
                        AESDKRes: null,
                        batteryRes: null,
                        transLog: null,
                        tenderLog: null,
                        isellData: null,
                        midVoidRes: null,
                        voidRes: null,
                        notSwipedRes: null,
                        getGiftCardBinRes: null,
                        giftCardBalanceinqRes: null,
                        convertSALTRes: null,
                        failure: null
                    }
                }
            case 'SET_CLIENTELED':
                return {
                    ...state,
                    clienteled: action.payload
                }

                //PRINT RECEIPT
            case 'PRINT_RECEIPT_SUCCESS':
                return {
                    ...state,
                    printRes: action.payload
                }

            case 'PRINT_RECEIPT_FAILURE':
                console.log(action.payload);
                return {
                    ...state,
                    printRes: action.payload
                }

                // ADD TENDER
            case 'ADD_TENDER_SUCCESS':
                return {
                    ...state,
                    tenderLog: action.payload
                }

            case 'ADD_TENDER_FAILURE':
                return {
                    ...state,
                    tenderLog: action.payload
                }

                // COMPLETE TRANSACTION
            case 'COMPLETE_TRANSACTION_SUCCESS':
                return {
                    ...state,
                    transLog: action.payload
                }

            case 'COMPLETE_TRANSACTION_FAILURE':
                return {
                    ...state,
                    transLog: action.payload
                }

            case 'MID_VOID':
                {
                    console.log("MIDVOID REDUCER SWITCH")
                    return {
                        ...state,
                        midVoidRes: action.payload
                    }
                }
                //VOID TRANSACTION LOG
            case 'VOID_SUCCESS':
                {
                    return {
                        ...state,
                        voidRes: action.payload
                    }
                }
            case 'VOID_GENERALERROR':
                {
                    return {
                        ...state,
                        voidRes: action.payload
                    }
                }
            case 'VOID_MISSINGDETAILS':
                {
                    return {
                        ...state,
                        voidRes: action.payload
                    }
                }
            case 'VOID_TRANIDISSUE':
                {
                    return {
                        ...state,
                        voidRes: action.payload
                    }
                }

                //Reason Card Not Swiped
            case 'CARD_NOTSWIPED_SUCCESS':
                {
                    return {
                        ...state,
                        notSwipedRes: action.payload
                    }
                }

            case 'CARD_NOTSWIPED_FAILURE':
                {
                    return {
                        ...state,
                        notSwipedRes: action.payload
                    }
                }

            default:
                return state;
        }
    } else {
        return {
            ...state
        };
    }
}