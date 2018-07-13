const initialState = {
    testValue : "Test Value One",
    loginSuccess: false,
    response: {
      cartItems: {},
      response_code:'',
      response_text:"",
      subTotal:'',
      total:'',
      totalTax:'',
      transactionId:""
    },
    transactionData : null
  };
  
  export function PostVoidReducer(state = initialState, action) {
    switch (action.type) {
 
     
      case 'PV_SUCCESS':
        return {
          ...state,
          transactionData: action.payload
        }
      default:
        return {
          ...state,
          loginSuccess: false,
          response: ""
        };
    }
  }

  const initialStatePostVoidDetails = {
    response: {
      cartItems: {},
      response_code:'',
      response_text:"",
      subTotal:'',
      total:'',
      totalTax:'',
      transactionId:""
    },
    detailsFetchSuccessFlag : false
  };
  
  export function PostVoidTransDetailsReducer(state = initialStatePostVoidDetails, action) {
    
    switch (action.type) {
 
     
      case 'IM_SUCCESS':
        return {
          ...state,
          response: action.payload,
          detailsFetchSuccessFlag : true
        }
      default:
        return {
          ...state,
          response: {
            cartItems: {},
            response_code:'',
            response_text:"",
            subTotal:'',
            total:'',
            totalTax:'',
            transactionId:""
          },
          detailsFetchSuccessFlag : false
        };
    }
  }
  const initialStatePostVoidTransList = {
    response: {
      transactionList: [
        {
        store: "",
        terminal: "",
        transactionID: "",
        date: "",
        time: "",
        unKnownFiled: "",
        amount: "",
        flag1: true,
        flag2: false,
        flag3: false,
        transactionFile: ""
        },
      ]
    },
    detailsFetchSuccessFlag : false
  };
  export function PostVoidGetTransListReducer(state = initialStatePostVoidTransList, action) {
   
    switch (action.type) {
 
     
      case 'TL_SUCCESS':
        return {
          ...state,
          response: action.payload,
          detailsFetchSuccessFlag : true
        }
      default:
        return {
          ...state,
          response: {
            transactionList: [
              {
              store: "",
              terminal: "",
              transactionID: "",
              date: "",
              time: "",
              unKnownFiled: "",
              amount: "",
              flag1: true,
              flag2: false,
              flag3: false,
              transactionFile: ""
              },
            ]
          },
          detailsFetchSuccessFlag : false
        };
    }
  }
  
  
  