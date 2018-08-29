import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    TRANS_DISCOUNT_APPLIED,
    IM_RINGINGASSOCIATE,
    IM_INVALIDASSOCIATE,
    TRANS_DISCOUNT_FAIL,
    ASSOCIATE_DISCOUNT_APPLIED,
    ASSOCIATE_DISCOUNT_FAIL,
    ASSOCIATE_DISCOUNT_ALREADY_APPLIED,
    RENDER_POST_VOID_CART,
    DIRECT_SEND_REQUEST
,
    TD_DISCOUNTEXCEEDS
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
        total: "",
        GetisellFlag:"",
    },
    itemPromotionDetails: '',
    dataFrom: '',
    productImages: {updated: true, imageUrls:{}},
    getISellData : '',
    getISellDataFrom : '',
    sku:'',
    giftRegNumber: '',
    managerPinValidateResponse : {
        "isValidPIN" : false,
        "isManagerPIN" : false,
        "isAssociatePIN" : false
    }
}
const menuData = {}
const itemsData = {
    currentItem: ''
}
var clienteled = '';

export function SalesCartReducer(state = initialState, action) {
    console.log('IN REDUCER', action)
//debugger;
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

        case 'RENDER_POST_VOID_CART' : {
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

        case 'RENDER_PRINT_CART' : {
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
        console.log('**ADD_ITEM_REQUEST*****', action.payload);
            console.log('**reducer: action.payload.cart', action.payload.cartItems.items);
           // debugger;
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

        case TD_DISCOUNTEXCEEDS:
      /*  let [cartItemWithImages, newProductImages] = salesCartReformater(state.data.cartItems.items, action.payload);    
        state.data.cartItems.items = cartItemWithImages;
        state.productImages = newProductImages;
        state.dataFrom = 'UPDATED_IMAGES'*/
        return {
            ...state,
            dataFrom: 'DISCOUNT_EXCEEDS',
            sku:action.sku

        }

            
        case 'UPDATED_IMAGES':
        //debugger;
            console.log('*****************UPDATED IMAGES**************************');
            let [cartItemWithImages, newProductImages] = salesCartReformater(state.data.cartItems.items, action.payload);    
                state.data.cartItems.items = cartItemWithImages;
                state.productImages = newProductImages;
                state.dataFrom = 'UPDATED_IMAGES'
            return {
                ...state
            }
          


        case ADD_ITEM_SUCCESS:
            return {
                //  output
            };

            case 'GP_PRICENOTFOUND':
          //  debugger;
            return{
                ...state,
                // data: action.payload,
                dataFrom: 'GP_PRICENOTFOUND'
            };

            case 'ADD_ITEM_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'INVALID_SKU-ID',
                getISellData: '',
                getISellDataFrom: ''
            };

            case 'TAX_AUTH_SUCCESS':
            return {
                ...state,
                dataFrom: 'TAX_AUTH_SUCCESS',
                
            };
            case 'TAX_AUTH_FAIL':
            return {
                ...state,
                dataFrom: 'TAX_AUTH_FAIL',
                
            };
        
            case 'MAX_ITEM_REACHED':
                       return {
                           ...state,
                           data: '',
                           dataFrom: 'MAX_ITEM_REACHED',
                           getISellData: '',
                           getISellDataFrom: '',
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
                ...action.payload,
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
                // data: action.payload,
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
                getISellDataFrom: '',
                giftRegNumber: action.giftRegNumber
            };
        case 'GIFTREGISTRYUPDATE_FAIL':
            console.log('**GIFT REG reducer: action.payload.cart', action.payload);
            return {
                ...state,
                dataFrom: 'GIFTREGISTRY_FAIL',
                // data: action.payload,
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
                getISellDataFrom: '',
                giftRegNumber: action.giftRegNumber
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
                dataFrom: 'TRANS_DISCOUNT_APPLIED',
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
        
        case IM_INVALIDASSOCIATE:
            console.log('REDUCER:IM_INVALIDASSOCIATE', action.payload);
            return {
                ...state,
                dataFrom: 'IM_INVALIDASSOCIATE',
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
                //itemPromotionDetails : {"pN_MKDPEROFF":"Mkd % off","pP_MKDPEROFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_MKDDOLOFF":"Mkd $ off","pP_MKDDOLOFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_MKDNEWPRICE":"Mkd New Price","pP_MKDNEWPRICE":{"enable":true,"maxItemPercentDisc":0.0},"pN_PRICEOVERRIDE":"Price Override","pP_PRICEOVERRIDE":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDPEROFF":"Omni Mkd % off","pP_OMNIMKDPEROFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDDOLOFF":"Omni Mkd $ off","pP_OMNIMKDDOLOFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDNEWPRICE":"Omni Mkd New Price","pP_OMNIMKDNEWPRICE":{"enable":true,"maxItemPercentDisc":0.0},"response_Code":"PR_SUCCESS","response_Text":"Success!"},
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
        case DIRECT_SEND_REQUEST: {
            console.log('DIRECT SEND REDUCER BEFORE FORMAT', action.payload.data.cartItems)
            //debugger;
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            console.log('DIRECT SEND REDUCER AFTER FORMAT', action.payload.data.cartItems)
            //debugger;
            return {
                ...state,
                data: action.payload.data,
                dataFrom: "DIRECT_SEND_SUCCESS",
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

        case 'TAX_MODIFY_UPDATE_SUCCESS':
            console.log('REDUCER:TAX_MODIFY_UPDATE_SUCCESS', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'TAX_MODIFY_UPDATE_SUCCESS',
                getISellData: '',
                getISellDataFrom: ''
            };

        /** GET DEFAULT SKU* */
        case 'DEFAULT_SKU' : {
            return {
                ...state,
                data: action.payload,
                dataFrom: 'DEFAULT_SKU',
                getISellData : '',
                getISellDataFrom : ''
            };
        }
        case 'PRESALEINITIALRENDER' : {
            return {
                ...state,
                data: action.payload,
                presaleinitialrender:false,
                dataFrom: '',
            };
        }
        case 'IM_SKUNOTFOUND':{
            return{
                ...state,
                data: action.payload,
                dataFrom: 'IM_SKUNOTFOUND',
                getISellData : '',
                getISellDataFrom : ''
            }
        }
        case 'ADD_GIFTCARD_SUCCESS' : {
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'ADD_GIFTCARD_SUCCESS'
            }
        }

        case 'CLEAR_CART': {
            // const datainit = ...state
            return {
                // ...state,
                ...initialState,
                dataFrom: ''
            }
        }

        case 'CHANGE_ITEM_SELECTED':{
            return {
                // ...state,
                ...state,
                dataFrom: ''
            }
            break;
        }        
        case 'MANAGER_PIN_VALIDATE_RESPONSE' : {
            return {
                ...state,
                managerPinValidateResponse : action.payload,
                dataFrom : 'MANAGER_PIN_VALIDATE_RESPONSE'
            }
        }
        case 'LOGGED_IN_PIN_VALIDATE_RESPONSE' : {
            return {
                ...state,
                managerPinValidateResponse : action.payload,
                dataFrom : 'LOGGED_IN_PIN_VALIDATE_RESPONSE'
            }
        }
        default:
            return state;
                
            

    }
}