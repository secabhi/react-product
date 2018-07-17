
import { PRODUCT_DETAIL_INFO_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_DETAIL_INFO_ITEM_FAIL } from '../common/constants/type';

const initialState = {
};

export function ProductDetailInfoReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_INFO_ITEM_SUCCESS:
      return [...action.payload];

    case PRODUCT_DETAIL_INFO_ITEM_FAIL:
      return [...action.payload];

    default:
      return state;
  }
}
