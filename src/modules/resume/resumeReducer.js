const initialState = {
    data: {
        response_code: "",
        response_text: "",
        cartItems: {
            transactionId: "",
            items: []
        },
        totalTax: "",
        subTotal: "",
        total: ""
    },
    dataFrom: '',
    getResumeDatas: '',
    getResumeDatasFrom: '',
    error_message: '',
    isValid: true
}
export function ResumeReducer(state = initialState, action) {
    console.log("**** RESUME REDUCER", action)
    switch (action.type) {
        case 'RESUME_ENTRY_REQUEST_SUCCESS': {
            return {
                ...state,
                getResumeDatas: action.payload,
                getResumeDatas: "RESUME_TRANSACTIONS_SUCCESS",
                error_message: '',
                isValid: true
            }
        };
        case 'RESUME_ENTRY_REQUEST_FAILURE': {
            return {
                ...state,
                getResumeDatas: action.payload,
                getResumeDatasFrom: "RESUME_ENTRY_REQUEST_FAILURE_ERROR",
                error_message: '',
                isValid: true
            }
        };
        case 'SUSPENDED_TRANSACTION_LIST_FETCH_SUCCESS': {

            return {
                ...state,
                response: action.payload,
                dataFrom: "SUSPENDED_TRANSACTION_LIST_SUCCESS",
                error_message: '',
                isValid: true
            }
        };
        case 'SUSPENDED_TRANSACTION_LIST_FETCH_FAILURE': {

            return {
                ...state,
                response: action.payload,
                dataFrom: "SUSPENDED_TRANSACTION_LIST_FAILURE",
                error_message: '',
                isValid: true
            }
        };
        case 'RESUME_SELECT_TRANS_REQUEST_VALIDFAILED': {
            return {
                ...state,
                searchItem: '',
                isSearchItemSet: false,
                data: {},
                dataFrom: '',
                error_message: action.message,
                isValid: false
            }
        }
        case 'RESUME_CLEAR_TRANSLIST_IS_VALID':
            return {
                ...state,
                searchItem: '',
                isSearchItemSet: false,
                data: {},
                dataFrom:  '',
                error_message:  '',
                isValid:  true,
            }

        default:
            return state;
            break;
    }
}

