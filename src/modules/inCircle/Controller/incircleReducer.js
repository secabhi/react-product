import {CUST_INCIRCLE_INFO_REQUEST, INCIRCLE_GIFT_CARDS} from '../../common/constants/type';
const initialState = {
  error: null,
  incircleData: null,
  incircleGiftCard: null,
  loading: true, 
  gcloading: true
};

export function incircleReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUST_INCIRCLE_INFO_REQUEST':
      {
        console.log(action)
        return { ...state,
          incircleData: action.payload,
          loading: action.loading,
          gcloading: true
        }
      }
    case 'INCIRCLE_GIFT_CARDS':
      {
        return { ...state,
          incircleGiftCard: action.payload, 
          gcloading: action.loading,
          loading: true
        };
      }
      case 'ERROR':
      {
        return { ...state
        }
      }
    default:
      return "";
  }
}
