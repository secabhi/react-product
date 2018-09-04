import {CUST_INCIRCLE_INFO_REQUEST, INCIRCLE_GIFT_CARDS} from '../../common/constants/type';
const initialState = {
  error: null,
  errorMessage: null,
  incircleData: null,
  incircleGiftCard: null,
  loading: true, 
  gcloading: true,
  isValid : false, 
};

export function incircleReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUST_INCIRCLE_INFO_REQUEST':
      {
        console.log(action)
        return { ...state,
          incircleData: action.payload,
          loading: action.loading,
          gcloading: true,
          isValid: true,
          error: null,
          errorMessage: null
        }
      }
    case 'INCIRCLE_GIFT_CARDS':
      {
        return { ...state,
          incircleGiftCard: action.payload, 
          gcloading: action.loading,
          loading: true,
          isValid: true,
          error: null,
          errorMessage: null
        };
      }
      case 'CUST_INCIRCLE_INFO_REQUEST_ERROR':
      {
        return {...state,
         error: action.payload,
         errorMessage: 'Something went wrong. Please try again.',
         isValid: false
        };
      }
      case 'INCIRCLE_REQUEST_FAILED':
      {
        return {...state,
          error: action.payload,
          errorMessage: action.message,
          isValid: false
         };
      }
    default:
      return state;
  }
}
