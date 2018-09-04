import {CHANGE_ITEM_SELECTED, CHANGE_ITEMS_SELECTED, NON_SKU_SELECTED} from '../constants/type';

export const itemSelectedAction = (item) => {
  console.log('**Action itemSelectedAction Called', item);
  return ({
    type: CHANGE_ITEM_SELECTED,
    payload: item
  })  
}

export const itemsSelectedAction = (item) => {
  console.log('**Action itemsSelectedAction Called', item);
  return({
    type: CHANGE_ITEMS_SELECTED,
    payload: item
  })
}

export const nonSkuItemSelectionAction = (lineNumber) => {

  return({
    type: NON_SKU_SELECTED,
    payload: lineNumber
  })
}