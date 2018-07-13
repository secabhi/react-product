
import { CHANGE_ITEM_SELECTED, CHANGE_ITEMS_SELECTED } from '../constants/type';

export const ItemSelectorReducer = (state = [], action) => {

  switch (action.type) {
   
    case CHANGE_ITEMS_SELECTED: //use for multiple item selections
    console.log('**Reducer change_items_selected Called', action);
      //if state includes the index already remove it.
      if (state.includes(action.payload)) {
        return state.filter(val => val !== action.payload);
      } else {
        //we add it
        return [...state, action.payload];
      }
      break;

    case CHANGE_ITEM_SELECTED:
    console.log('**Reducer change_item_selected Called', action);
      //if were coming from a multiple selection we need to reset state to empty array.
      if(state.length > 1) {
        state=[]
        }
      
      //if payload is empty, return empty single selection
      if(action.payload) {
        return [action.payload];
      } else {
        return []
      }
    
    default:
      return state;
      break;
  }
}    