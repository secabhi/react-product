import { PRODUCT_SEARCH_PIMSKU_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_PIMSKU_FAIL } from '../common/constants/type';

import { PRODUCT_SEARCH_UPC_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_UPC_FAIL } from '../common/constants/type';
import { PRODUCT_FILTER_SEARCH_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_FILTER_SEARCH_ITEM_FAIL } from '../common/constants/type';

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
    case PRODUCT_FILTER_SEARCH_ITEM_SUCCESS:
      return [...action.payload];

    case PRODUCT_FILTER_SEARCH_ITEM_FAIL:
      return [...action.payload];

    default:
      return state;
  }
}
