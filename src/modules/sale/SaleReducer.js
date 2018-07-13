import {NAV_TO_SEND} from '../common/constants/type';

const initialState = {
    otherPageData: { isSkip: false, details: null },
    sendComponent: ''
  };
  
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
          sendComponent:action.payload.data
        };

      default:
        return {
          ...state
        };
    }
  }
  
  
  
  