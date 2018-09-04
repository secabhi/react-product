import {NON_SKU_SELECTED, CHANGE_ITEM_SELECTED, CHANGE_ITEMS_SELECTED} from '../constants/type';

export const  NonSkuSelectionReducer = (state = '', action) => {
    switch (action.type) {
        case NON_SKU_SELECTED:
            //Deselect
            if(state === action.payload) {
                return '';
            } else {
                //select
                return action.payload;
            }
            break;

        /***   if a main sku item is select we need to unselect alternate sku ****/
        case CHANGE_ITEM_SELECTED:
            return '';
            break;

        case CHANGE_ITEMS_SELECTED:
            return '';
            break;
        /**************************************************************************/ 

        default:
            return state;
            break;
    }
}

