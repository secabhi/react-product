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
                getResumeDatasFrom: "RESUME_TRANSACTIONS_SUCCESS"
            }
        };
        case 'RESUME_ENTRY_REQUEST_FAILURE': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "WEB_SERVICE_ERROR"
            }
        };
        case 'SUSPENDED_TRANSACTION_LIST_FETCH_SUCCESS':{
            
            return {
                ...state,
                response: action.payload,
                dataFrom: "SUSPENDED_TRANSACTION_LIST_SUCCESS"
            }
        };
        default:
            return state;
            break;
    }
}

