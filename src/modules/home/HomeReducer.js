const initialState = {
  testValue: "Test Value One",
  loginSuccess: false,
  response: "",
  transactionData: null,
  salutationData: null,
  dataFrom:'',
  getResumeDatas : '',
  getResumeDatasFrom : '',
  navigateToPostVoidDetails : false
};

export function HomeReducer(state = initialState, action) {

  switch (action.type) {
    case 'ONE':
      return {
        ...state,
        testValue: "Test Value One Changed",
        loginSuccess: false,
        response: "",
        navigateToPostVoidDetails: false
      };
    case 'TWO':
      return {
        ...state,
        loginSuccess: false,
        response: "",
        navigateToPostVoidDetails: false
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loginSuccess: true,
        response: action.payload.data,
        userpin: action.payload.userpin,
        navigateToPostVoidDetails: false
      }
    case 'TRANSACTION_ID_REQUEST':
      return {
        ...state,
        transactionData: action.payload,
        navigateToPostVoidDetails: false
      }
    case 'GET_SALUTATION':
      return {
        ...state,
        salutationData: action.payload,
        navigateToPostVoidDetails: false
      }
    case 'RESUME_ENTRY_REQUEST_SUCCESS' : {
        console.log("***HOME RESUME REQUEST SUCEEss",action)
        return {
            ...state,
            getResumeDatas:action.payload,
            getResumeDatasFrom: "RESUME_TRANSACTIONS_SUCCESS"
        }
    };

    case 'TRANSACTION_DETAILS_FETCH_SUCCESS': 
      return {
        ...state,
        navigateToPostVoidDetails: true

      }
    default:
      return {
        ...state,
        loginSuccess: false,
        response: "",
        navigateToPostVoidDetails: false
      };
  }
}



