import { PRODUCT_SEARCH_PIMSKU_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_PIMSKU_FAIL } from '../common/constants/type';

import { PRODUCT_SEARCH_UPC_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_UPC_FAIL } from '../common/constants/type';

import { PRODUCT_SEARCH_KEYWORD_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_KEYWORD_FAIL } from '../common/constants/type';

import { PRODUCT_SEARCH_STYLE_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_STYLE_FAIL } from '../common/constants/type';

import { PRODUCT_SEARCH_CATALOG_ITEM_SUCCESS } from '../common/constants/type';
import { PRODUCT_SEARCH_CATALOG_ITEM_FAIL } from '../common/constants/type';

const initialState = [];

export function ProductSearchReducer(state = initialState, action) {
  debugger;
  switch (action.type) {
    case PRODUCT_SEARCH_KEYWORD_SUCCESS:
      return [...action.payload];

    case PRODUCT_SEARCH_KEYWORD_FAIL:
      return [...action.payload];

    case PRODUCT_SEARCH_STYLE_SUCCESS:
      return [...action.payload];

    case PRODUCT_SEARCH_STYLE_FAIL:
      return [...action.payload];

    case PRODUCT_SEARCH_CATALOG_ITEM_SUCCESS:
      return [...action.payload];

    case PRODUCT_SEARCH_CATALOG_ITEM_FAIL:
      return [...action.payload];

    default:
      return state;
  }
}
