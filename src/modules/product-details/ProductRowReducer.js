
import { PRODUCT_FILTER_SEARCH_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_FILTER_SEARCH_ITEM_FAIL } from '../common/constants/type';

const initialState = {
};

export function ProductRowReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FILTER_SEARCH_ITEM_SUCCESS:
      return [...action.payload];

    case PRODUCT_FILTER_SEARCH_ITEM_FAIL:
      return [...action.payload];

    default:
      return state;
  }
}
