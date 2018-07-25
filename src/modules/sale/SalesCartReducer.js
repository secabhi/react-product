import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    TRANS_DISCOUNT_APPLIED,
    IM_RINGINGASSOCIATE,
    TRANS_DISCOUNT_FAIL,
    ASSOCIATE_DISCOUNT_APPLIED,
    ASSOCIATE_DISCOUNT_FAIL,
    ASSOCIATE_DISCOUNT_ALREADY_APPLIED
} from '../common/constants/type';
// helper - reformats the cart given from response
import salesCartReformater from './helpers/salesCartReformater';

const initialState = {
    data: {
        response_code: "",
        response_text: "",
        cartItems: {
            transactionId: "",
            items: []
        },
        totalTax: "",
        subTotal: "",
        total: ""
    },
    itemPromotionDetails: '',
    dataFrom: '',
    productImages: { updated: true, imageUrls: {} },
    getISellData: '',
    getISellDataFrom: ''
}
const menuData = {}
const itemsData = {
    currentItem: ''
}
var clienteled = '';

export function SalesCartReducer(state = initialState, action) {
    console.log('IN REDUCER', action)

    switch (action.type) {

        case 'RESUME_ENTRY_REQUEST_SUCCESS' : {
            console.log("Before##$#$%#$",action.payload.cartItems.items);
            let [cartItems, productImages] = salesCartReformater(action.payload.cartItems.items, state.productImages);
            action.payload.cartItems.items = cartItems;
            console.log("SSD##$#$%#$",action.payload.cartItems.items);
            state.productImages = productImages;
            if (productImages.updated) {
                state.dataFrom = 'ADD_ITEM'
            } else {
                state.dataFrom = 'UPDATE_IMAGES'
            }
            return {
                ...state,
                data:action.payload
            };
        }

        case 'GET_ISELL_CART_REQUEST_SUCCESS': {
            console.log('**sale GET_ISELL_CART_REQUEST_SUCCESS: action.payload', action.payload);
            return {
                ...state,
                getISellData: action.payload,
                getISellDataFrom: 'GET_ISELL_CART_REQUEST_SUCCESS'
            };
        }

        case ADD_ITEM_REQUEST:
            console.log('**reducer: action.payload.cart', action.payload.cartItems.items);
            let [cartItems, productImages] = salesCartReformater(action.payload.cartItems.items, state.productImages);
            action.payload.cartItems.items = cartItems;
            state.productImages = productImages;
            if (productImages.updated) {
                state.dataFrom = 'ADD_ITEM'
            } else {
                state.dataFrom = 'UPDATE_IMAGES'
            }
            return {
                ...state,
                data: action.payload,
            };

        case 'UPDATED_IMAGES':
            let [cartItemWithImages, newProductImages] = salesCartReformater(state.data.cartItems.items, action.payload);
            state.data.cartItems.items = cartItemWithImages;
            state.productImages = newProductImages;
            state.dataFrom = 'UPDATED_IMAGES'
            return {
                ...state,
                getISellData: '',
                getISellDataFrom: ''
            }



        case ADD_ITEM_SUCCESS:
            return {
                //  output
            };

        case 'ADD_ITEM_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'INVALID_SKU-ID',
                getISellData: '',
                getISellDataFrom: ''
            };

        case 'VOID_LINE_ITEM_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'LINE_VOID',
                getISellData: '',
                getISellDataFrom: ''
            }

        case 'MODIFY_QUANTITY_UPDATE_REQUEST_SUCCESS':
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'QUANTITY_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };

        case 'MODIFY_SPECIAL_INSTRUCTIONS_REQUEST_SUCCESS':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: 'MODIFY_SPECIAL_INSTRUCTIONS_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };

        case 'TRANS_TAX_EXEMPT_REQUEST_SUCCESS':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: 'TRANS_TAX_EXEMPT_REQUEST_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'TRANS_TAX_EXEMPT_REQUEST_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'SPLIT_COMMISSION_REQUEST_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'SPLIT_COMMISSION_SUCCESS',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'SC_INVALIDPINS':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPINS'
            };
        case 'SC_INVALIDPIN1':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPIN1'
            };
        case 'SC_INVALIDPIN2':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPIN2'
            };
        case 'SC_SAMEPINS':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_SAMEPINS'
            };
        case 'SC_PIN1MAND':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_PIN1MAND'
            };
        case 'SC_FAILURE':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'WEB_SERVICE_ERROR'
            };

        case 'SPLIT_COMMISSION_REQUEST_FAILURE':
            console.log("SPLIT COMM FAILED");
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                getISellData: '',
                getISellDataFrom: ''
            };


        case 'REPLENISH_ITEM_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'REPLENISH_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'REPLENISH_FAIL':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'REPLENISH_FAIL',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'GETREPLENISH_ITEM_SUCCESS':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GETREPLENISH',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'RP_FAIL':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'RP_FAIL',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'VOID_LINE_ITEM_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                getISellData: '',
                getISellDataFrom: ''
            };

        case 'MODIFY_QUANTITY_UPDATE_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                getISellData: '',
                getISellDataFrom: ''
            };

        /**-----------Gift Registry Reducers-------------- **/
        case 'GIFTREGISTRYUPDATE_REQUEST':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GIFT_REGISTRY_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };
        case 'GIFTREGISTRYUPDATE_FAIL':
            console.log('**GIFT REG reducer: action.payload.cart', action.payload);
            return {
                ...state,
                dataFrom: 'GIFTREGISTRY_FAIL',
                data: action.payload,
                getISellData: '',
                getISellDataFrom: ''
            };
        /**-----------Gift Registry Reducers Close-------------- **/
        /**-----------Gift Receipt Reducers-------------- **/
        case 'GIFTRECEIPTUPDATE_REQUEST':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GIFT_RECEIPT_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };
        /**-----------Gift Receipt Reducers Close-------------- **/


        case 'PRICE_VALUE_SUCESS':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'PRICE_UPDATE',
                getISellData: '',
                getISellDataFrom: ''
            };

        case 'MENU_ITEM_CHANGED':
            return {
                ...state,

                menuData: action.payload,
                dataFrom: 'MENU_ITEM_CHANGED',
                getISellData: '',
                getISellDataFrom: ''
            };



        case TRANS_DISCOUNT_APPLIED:
            console.log('REDUCER:TRANS_DISCOUNT_APPLIED', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'Discount',
                getISellData: '',
                getISellDataFrom: ''
            };


        case IM_RINGINGASSOCIATE:

            console.log('REDUCER:IM_RINGINGASSOCIATE', action.payload);

            return {
                ...state,
                dataFrom: 'IM_RINGINGASSOCIATE',
                getISellData: '',
                getISellDataFrom: ''
                // isInvalid:true
            };


        case ASSOCIATE_DISCOUNT_APPLIED:
            console.log('REDUCER:ASSOCIATE_DISCOUNT_APPLIED', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'Discount',
                getISellData: '',
                getISellDataFrom: ''
            };
        case ASSOCIATE_DISCOUNT_ALREADY_APPLIED:
            console.log('REDUCER:TRANS_DISCOUNT_Already_APPLIED', action.payload);

            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'IM_DISCOUNTALREADYAPPLIED',

            };
        case 'SPLIT_COMMISSION_PIN2_VALIDATION_FAIL': {

            return {
                ...state,
                //pin1Error : "",
                // pin2Error: action.payload.response.data.message,
                dataFrom: "SPLIT_COMM_ERROR",
                getISellData: '',
                getISellDataFrom: ''

            };
            break;
        }
        case 'GET_PROMOTIONS_SUCCESS': {
            return {
                ...state,
                itemPromotionDetails: action.payload,
                dataFrom: "GET_PROMOTIONS_SUCCESS",
                getISellData: '',
                getISellDataFrom: ''

            };
            break;
        }
        case 'GET_PROMOTIONS_FAILURE': {
            return {
                ...state,
                itemPromotionDetails: action.payload,
                dataFrom: "WEB_SERVICE_ERROR",
                getISellData: '',
                getISellDataFrom: ''

            };
            break;
        }

        case 'ADD_TO_GIFT_WRAP':
            console.log('GIFTWRAP REDUCER', action.payload)
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: "GIFT_WRAP",
                getISellData: '',
                getISellDataFrom: ''
            };
            break;

        case 'ADD_ALTERATIONS': {
            console.log('ALTERATIONS SALE REDUCER', action.payload)
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS",
                getISellData: '',
                getISellDataFrom: ''
            }
        };
        case 'ALTERATION_SUCCESS': {
            console.log('ALTERATIONS SALE REDUCER BEFORE FORMAT', action.payload.cartItems)
            //debugger;
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            console.log('ALTERATIONS SALE REDUCER AFTER FORMAT', action.payload.cartItems)
            //debugger;
            return {
                ...state,
                data: action.payload,
                dataFrom: "ALTERATION_SUCCESS",
                getISellData: '',
                getISellDataFrom: ''
            }
        };
        case 'ALTERATION_FAILURE': {
            console.log('ALTERATIONS SALE REDUCER', action.payload)
            return {
                ...state,
                ...action.payload,
                dataFrom: "WEB_SERVICE_ERROR",
                getISellData: '',
                getISellDataFrom: ''
            }
        };
        case 'AA_INVALIDALTERATIONTAG': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "AA_INVALIDALTERATIONTAG",
                getISellData: '',
                getISellDataFrom: ''
            }
        };
        case 'ADD_ALTERATIONS_DEFAULT': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS_DEFAULT",
                getISellData: '',
                getISellDataFrom: ''
            }
        };
        case 'ADD_ALTERATIONS_FAIL': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS_FAIL",
                getISellData: '',
                getISellDataFrom: ''
            }
        };

        case 'MODIFY_PRICE_SUCCESS': {
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'MODIFY_PRICE_SUCCESS',
                getISellData: '',
                getISellDataFrom: ''
            };
        }
        case 'MODIFY_PRICE_FAILURE': {
            return {
                ...state,
                data: action.payload,
                dataFrom: 'WEB_SERVICE_ERROR',
                getISellData: '',
                getISellDataFrom: ''
            };
        }

        case 'CLEAR_CART': {
            // const datainit = ...state
            return {
                // ...state,
                ...initialState,
                dataFrom: ''
            }
        }

            break;
        default:
            return state;
    }
}