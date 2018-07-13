import {CHANGE_ITEM_SELECTED, CHANGE_ITEMS_SELECTED} from '../constants/type';

export const itemSelectedAction = (item) => {
  console.log('**Action itemSelectedAciton Called', item);
  return ({
    type: CHANGE_ITEM_SELECTED,
    payload: item
  })  
}

export const itemsSelectedAction = (item) => {
  console.log('**Action itemsSelectedAciton Called', item);
  return({
    type: CHANGE_ITEMS_SELECTED,
    payload: item
  })
}