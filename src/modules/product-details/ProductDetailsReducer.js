import { PRODUCT_SEARCH_UPC_SUCCESS, PRODUCT_SEARCH_UPC_FAIL, PRODUCT_SEARCH_PIMSKU_FAIL, PRODUCT_SEARCH_PIMSKU_SUCCESS, GET_PRICE_SUCCESS } from '../common/constants/type';


const initialState = {
   
};

export function ProductDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SEARCH_PIMSKU_SUCCESS:
      return {
        [action.payload.pimskuId]: action.payload
      };

    case PRODUCT_SEARCH_PIMSKU_FAIL:
      return {
        [action.payload.pimskuId]: action.payload
      };

    case PRODUCT_SEARCH_UPC_SUCCESS:
      return {
        [action.payload.pimskuId]: action.payload
      };

    case PRODUCT_SEARCH_UPC_FAIL:
      return {
        [action.payload.pimskuId]: action.payload
      };

    case GET_PRICE_SUCCESS:
    let prod = state[action.payload.sKUID];

    return {
        [action.payload.sKUID]:{...prod, ...action.payload}
    };

    default:
      return state;
  }
}
