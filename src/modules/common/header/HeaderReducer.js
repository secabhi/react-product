const initialState = {
    testValue : "Test Value One",
    void: false,
    voidFail :false
  };
  
  export function HeaderReducer(state = initialState, action) {

  
    switch (action.type) {
      case "PED_BATTERY": {
        return {
          ...state,
          pedbatteryresp : action.payload,
        }
      }
      case 'CLEAR_PED': {
        return {
          ...state,
          clearPEDRes: action.payload
        }
      }
      default:
        return state
    }

    
  }

  const initialStateSuspend = {
    
    suspendSuccess : false,
    suspendFail:false
  };
  
  export function suspendReducer(state = initialStateSuspend, action) {

    switch (action.type) {
 
 
      case 'SUSPEND_TRANSACTION_SUCCESS':
        return {
          ...state,
          response: action.payload,
          suspendSuccess : true,
          suspendFail:false
        }
        case 'SUSPEND_TRANSACTION_INVALIDREQUEST':
        return {
          ...state,
          suspendSuccess : false,
          suspendFail:true
        }
        case 'SUSPEND_VALIDATIONFAILED':
        return {
          ...state,
          suspendSuccess : false,
          suspendFail:true
        }
      case 'SUSPEND_TRANSACTION_DEFAULT':
        return {
          ...state,
          suspendSuccess : false,
          suspendFail:true
        }
        case 'SUSPEND_TRANSACTION_FAILURE':
        return {
          ...state,
          suspendSuccess : false,
          suspendFail:true
        }
      default:
        return {
          ...state,
          suspendSuccess : false,
         suspendFail:false
        };
    }
  }
  export function voidReducer(state = initialState, action) {
  switch (action.type) {
      case 'VOID_TRANC_SUCCESS':
        return {
          ...state,
          void: true
        };
       
      case 'VOID_TRANS_FAILURE' :{
        return{
          ...state,
          voidFail : true
        }
      }  

      default:
        return {
         ...state,
         void: false,
         voidFail: false}
    }
  }