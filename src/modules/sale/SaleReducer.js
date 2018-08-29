import {NAV_TO_SEND} from '../common/constants/type';

const initialState = {
    otherPageData: { isSkip: false, details: null },
    sendComponent: { componentName: '', sameSenderReciever: false},
    option7:''
  };
  const option7 = '';
  export function SaleReducer(state = initialState, action) {
    switch (action.type) {
      case 'GO_TO_SALES_PAGE':
        return {
          ...state,
          otherPageData: action.payload
        };

      case NAV_TO_SEND:
      console.log("NAV TO SEND",action.payload)
        return {
          ...state,
          sendComponent:action.payload
        };


        case 'SET_OPTION_7':
        return {
            ...state,
            option7 : action.payload
        };
        break;

      default:
        return state
    }
  }
  
  
  
  