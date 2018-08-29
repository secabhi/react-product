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
    getResumeDatasFrom: ''
}
export function ResumeReducer(state = initialState, action) {
    console.log("**** RESUME REDUCER", action)
    switch (action.type) {
        case 'RESUME_ENTRY_REQUEST_SUCCESS': {
            return {
                ...state,
                getResumeDatas: action.payload,
                getResumeDatas: "RESUME_TRANSACTIONS_SUCCESS"
            }
        };
        case 'RESUME_ENTRY_REQUEST_FAILURE': {
            return {
                ...state,
                getResumeDatas:action.payload,
                getResumeDatasFrom: "RESUME_ENTRY_REQUEST_FAILURE_ERROR"
            }
        };
        case 'SUSPENDED_TRANSACTION_LIST_FETCH_SUCCESS':{
            
            return {
                ...state,
                response: action.payload,
                dataFrom: "SUSPENDED_TRANSACTION_LIST_SUCCESS"
            }
        };
        case 'SUSPENDED_TRANSACTION_LIST_FETCH_FAILURE':{
            
            return {
                ...state,
                response: action.payload,
                dataFrom: "SUSPENDED_TRANSACTION_LIST_FAILURE"
            }
        };
        default:
            return state;
            break;
    }
}

