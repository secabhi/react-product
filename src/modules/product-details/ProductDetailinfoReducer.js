import { PRODUCT_DETAIL_INFO_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_DETAIL_INFO_ITEM_FAIL } from '../common/constants/type';

const initialState = {
  storeList:[],
  error: false
};

export function ProductDetailInfoReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_INFO_ITEM_SUCCESS:
      return {
        storeList:[...action.payload],
        error: false
      };

    case PRODUCT_DETAIL_INFO_ITEM_FAIL:
      return {
        storeList:[],
        error: true
      };
    default:
      return state;
  }
}
