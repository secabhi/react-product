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
    },
    error_message:'',
    isValid : false
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
                data:action.payload,
                error_message:'',
                isValid : true
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
                data:action.payload,
                error_message:'',
                isValid : true
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
                data:action.payload,
                error_message:'',
                isValid : true
            };
        }


        case 'GET_ISELL_CART_REQUEST_SUCCESS': {
            console.log('**sale GET_ISELL_CART_REQUEST_SUCCESS: action.payload', action.payload);
            return {
                ...state,
                getISellData: action.payload,
                getISellDataFrom: 'GET_ISELL_CART_REQUEST_SUCCESS',
                error_message:'',
                isValid : true
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
                error_message:'',
                isValid : true
            };

        case TD_DISCOUNTEXCEEDS:
      /*  let [cartItemWithImages, newProductImages] = salesCartReformater(state.data.cartItems.items, action.payload);    
        state.data.cartItems.items = cartItemWithImages;
        state.productImages = newProductImages;
        state.dataFrom = 'UPDATED_IMAGES'*/
        return {
            ...state,
            dataFrom: 'DISCOUNT_EXCEEDS',
            sku:action.sku,
            error_message:'',
            isValid : true

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
                error_message:'',
                isValid : true
                //  output
            };

            case 'GP_PRICENOTFOUND':
          //  debugger;
            return{
                ...state,
                // data: action.payload,
                dataFrom: 'GP_PRICENOTFOUND',
                error_message:'',
                isValid : true
            };

            case 'ADD_ITEM_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'INVALID_SKU-ID',
                error_message:'',
                isValid : true
            };

            case 'TAX_AUTH_SUCCESS':
            return {
                ...state,
                dataFrom: 'TAX_AUTH_SUCCESS',
                error_message:'',
                isValid : true
                
            };
            case 'TAX_AUTH_FAIL':
            return {
                ...state,
                dataFrom: 'TAX_AUTH_FAIL',
                error_message:'',
                isValid : true
                
            };
        
            case 'MAX_ITEM_REACHED':
                       return {
                           ...state,
                           data: '',
                           dataFrom: 'MAX_ITEM_REACHED',
                           error_message:'',
                           isValid : true
                       };

        case 'VOID_LINE_ITEM_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'LINE_VOID',
                error_message:'',
                isValid : true
            }

        case 'MODIFY_QUANTITY_UPDATE_REQUEST_SUCCESS':
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: 'QUANTITY_UPDATE',
                error_message:'',
                isValid : true
            };

        case 'MODIFY_SPECIAL_INSTRUCTIONS_REQUEST_SUCCESS':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: 'MODIFY_SPECIAL_INSTRUCTIONS_UPDATE',
                error_message:'',
                isValid : true
            };

        case 'TRANS_TAX_EXEMPT_REQUEST_SUCCESS':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: 'TRANS_TAX_EXEMPT_REQUEST_UPDATE',
                error_message:'',
                isValid : true
            };
        case 'TRANS_TAX_EXEMPT_REQUEST_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };
        case 'SPLIT_COMMISSION_REQUEST_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'SPLIT_COMMISSION_SUCCESS',
                error_message:'',
                isValid : true
            };
        case 'SC_INVALIDPINS':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPINS',
                error_message:'',
                isValid : true
            };
        case 'SC_INVALIDPIN1':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPIN1',
                error_message:'',
                isValid : true
            };
        case 'SC_INVALIDPIN2':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_INVALIDPIN2',
                error_message:'',
                isValid : true
            };
        case 'SC_SAMEPINS':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_SAMEPINS',
                error_message:'',
                isValid : true
            };
        case 'SC_PIN1MAND':

            return {
                ...state,
                data: action.payload,
                dataFrom: 'SC_PIN1MAND',
                error_message:'',
                isValid : true
            };
        case 'SC_FAILURE':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };

        case 'SPLIT_COMMISSION_REQUEST_FAILURE':
            console.log("SPLIT COMM FAILED");
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };


        case 'REPLENISH_ITEM_SUCCESS':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'REPLENISH_UPDATE',
                error_message:'',
                isValid : true
            };
        case 'REPLENISH_FAIL':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'REPLENISH_FAIL',
                error_message:'',
                isValid : true
            };
        case 'GETREPLENISH_ITEM_SUCCESS':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GETREPLENISH',
                error_message:'',
                isValid : true
            };
        case 'RP_FAIL':
            return {
                ...state,
                // data: action.payload,
                dataFrom: 'RP_FAIL',
                error_message:'',
                isValid : true
            };
        case 'VOID_LINE_ITEM_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };

        case 'MODIFY_QUANTITY_UPDATE_FAILURE':
            return {
                ...state,
                data: '',
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };

        /**-----------Gift Registry Reducers-------------- **/
        case 'GIFTREGISTRYUPDATE_REQUEST':
            console.log('**reducer: action.payload.cart', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GIFT_REGISTRY_UPDATE',
                giftRegNumber: action.giftRegNumber,
                error_message:'',
                isValid : true
            };
        case 'GIFTREGISTRYUPDATE_FAIL':
            console.log('**GIFT REG reducer: action.payload.cart', action.payload);
            return {
                ...state,
                dataFrom: 'GIFTREGISTRY_FAIL',
                error_message:'',
                isValid : true
                // data: action.payload,
            };
        /**-----------Gift Registry Reducers Close-------------- **/
        /**-----------Gift Receipt Reducers-------------- **/
        case 'GIFTRECEIPTUPDATE_REQUEST':
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GIFT_RECEIPT_UPDATE',
                giftRegNumber: action.giftRegNumber,
                error_message:'',
                isValid : true
            };
        /**-----------Gift Receipt Reducers Close-------------- **/


        case 'PRICE_VALUE_SUCESS':
            return {
                ...state,
                data: action.payload,
                dataFrom: 'PRICE_UPDATE',
                error_message:'',
                isValid : true
            };

        case 'MENU_ITEM_CHANGED':
            return {
                ...state,

                menuData: action.payload,
                dataFrom: 'MENU_ITEM_CHANGED',
                error_message:'',
                isValid : true
            };



        case TRANS_DISCOUNT_APPLIED:
            console.log('REDUCER:TRANS_DISCOUNT_APPLIED', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'TRANS_DISCOUNT_APPLIED',
                error_message:'',
                isValid: true
            };

        case 'NETWORK_ERROR_TRANSDISCOUNT': 
            console.log('action',action)
            return {
                ...state,
                error: 'NETWORK_ERROR_TRANSDISCOUNT',
                isValid: false
            }
            


        case IM_RINGINGASSOCIATE:

            console.log('REDUCER:IM_RINGINGASSOCIATE', action.payload);

            return {
                ...state,
                dataFrom: 'IM_RINGINGASSOCIATE',
                error_message:'',
                isValid : true
                // isInvalid:true
            };
            case 'IM_ASSOCIATETERMINATED':

            console.log('REDUCER:IM_ASSOCIATETERMINATED', action.payload);

            return {
                ...state,
                dataFrom: 'IM_ASSOCIATETERMINATED',
                getISellData: '',
                getISellDataFrom: '',
                error_message:'',
                isValid : true
                // isInvalid:true
            };
            case 'IM_ASSOCIATENOTELIGIBLE':

            console.log('REDUCER:IM_ASSOCIATENOTELIGIBLE', action.payload);

            return {
                ...state,
                dataFrom: 'IM_ASSOCIATENOTELIGIBLE',
                getISellData: '',
                getISellDataFrom: '',
                error_message:'',
                isValid : true
                // isInvalid:true
            };
            
        case IM_INVALIDASSOCIATE:
            console.log('REDUCER:IM_INVALIDASSOCIATE', action.payload);
            return {
                ...state,
                dataFrom: 'IM_INVALIDASSOCIATE',
                error_message:'',
                isValid : true
                // isInvalid:true
            };
            
            case 'IM_INVALIDASSOCIATEID':
            console.log('REDUCER:IM_INVALIDASSOCIATE', action.payload);
            return {
                ...state,
                dataFrom: 'IM_INVALIDASSOCIATEID',
                getISellData: '',
                getISellDataFrom: '',
                error_message:'',
                isValid : true
                // isInvalid:true
            };


        case ASSOCIATE_DISCOUNT_APPLIED:
            console.log('REDUCER:ASSOCIATE_DISCOUNT_APPLIED', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'Discount',
                error_message:'',
                isValid : true
            };
        case ASSOCIATE_DISCOUNT_ALREADY_APPLIED:
            console.log('REDUCER:TRANS_DISCOUNT_Already_APPLIED', action.payload);

            return {
                ...state,
                data: { ...action.payload },
                dataFrom: 'IM_DISCOUNTALREADYAPPLIED',
                error_message:'',
                isValid : true

            };
        case 'SPLIT_COMMISSION_PIN2_VALIDATION_FAIL': {

            return {
                ...state,
                //pin1Error : "",
                // pin2Error: action.payload.response.data.message,
                dataFrom: "SPLIT_COMM_ERROR",
                error_message:'',
                isValid : true

            };
            break;
        }
        case 'GET_PROMOTIONS_SUCCESS': {
            return {
                ...state,
                itemPromotionDetails: action.payload,
                //itemPromotionDetails : {"pN_MKDPEROFF":"Mkd % off","pP_MKDPEROFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_MKDDOLOFF":"Mkd $ off","pP_MKDDOLOFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_MKDNEWPRICE":"Mkd New Price","pP_MKDNEWPRICE":{"enable":true,"maxItemPercentDisc":0.0},"pN_PRICEOVERRIDE":"Price Override","pP_PRICEOVERRIDE":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDPEROFF":"Omni Mkd % off","pP_OMNIMKDPEROFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDDOLOFF":"Omni Mkd $ off","pP_OMNIMKDDOLOFF":{"enable":true,"maxItemPercentDisc":0.0},"pN_OMNIMKDNEWPRICE":"Omni Mkd New Price","pP_OMNIMKDNEWPRICE":{"enable":true,"maxItemPercentDisc":0.0},"response_Code":"PR_SUCCESS","response_Text":"Success!"},
                dataFrom: "GET_PROMOTIONS_SUCCESS",
                error_message:'',
                isValid : true

            };
            break;
        }
        case 'GET_PROMOTIONS_FAILURE': {
            return {
                ...state,
                itemPromotionDetails: action.payload,
                dataFrom: "WEB_SERVICE_ERROR",
                error_message:'',
                isValid : true

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
                error_message:'',
                isValid : true
            };
            break;

            case 'ADD_GIFT_WRAP_ERROR' : {
                return {
                    ...state,
                    isValid : false,
                    error_message : 'ADD_GIFT_WRAP_ERROR' 
                }
             }
            break;

        case 'ADD_ALTERATIONS': {
            console.log('ALTERATIONS SALE REDUCER', action.payload)
            action.payload.data.cartItems.items = salesCartReformater(action.payload.data.cartItems.items, state.productImages)[0];
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS",
                error_message:'',
                isValid : true
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
                error_message:'',
                isValid : true
            }
        };
        case 'ALTERATION_FAILURE': {
            console.log('ALTERATIONS SALE REDUCER', action.payload)
            return {
                ...state,
                ...action.payload,
                dataFrom: "WEB_SERVICE_ERROR",
                error_message:'',
                isValid : true
            }
        };
        case 'AA_INVALIDALTERATIONTAG': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "AA_INVALIDALTERATIONTAG",
                error_message:'',
                isValid : true
            }
        };
        case 'AA_ALTTAGALREADYUSED': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "AA_ALTTAGALREADYUSED",
                error_message:'',
                isValid : true
            }
        }
        case 'ADD_ALTERATIONS_DEFAULT': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS_DEFAULT",
                error_message:'',
                isValid : true
            }
        };
        case 'ADD_ALTERATIONS_FAIL': {
            return {
                ...state,
                ...action.payload,
                dataFrom: "ADD_ALTERATIONS_FAIL",
                error_message:'',
                isValid : true
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
                error_message:'',
                isValid : true
            }
        };

        case 'MODIFY_PRICE_SUCCESS': {
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'MODIFY_PRICE_SUCCESS',
                error_message:'',
                isValid : true
            };
        }
        case 'MODIFY_PRICE_FAILURE': {
            return {
                ...state,
                data: action.payload,
                dataFrom: 'WEB_SERVICE_ERROR',
                error_message:'',
                isValid : true
            };
        }

        case 'TAX_MODIFY_UPDATE_SUCCESS':
            console.log('REDUCER:TAX_MODIFY_UPDATE_SUCCESS', action.payload);
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'TAX_MODIFY_UPDATE_SUCCESS',
                error_message:'',
                isValid : true
            };

        /** GET DEFAULT SKU* */
        case 'DEFAULT_SKU' : {
            return {
                ...state,
                dataSku: action.payload,
                dataFrom: 'DEFAULT_SKU',
                error_message:'',
                isValid : true
            };
        }


        case 'PRESALEINITIALRENDER' : {
            return {
                ...state,
                //data: action.payload,
                presaleinitialrender:false,
                dataFrom: '',
            };
        }
        /*Fix MPOS-2177 - starts*/
        case 'PRESALE_RETAIN_YES' : {
            return {
                ...state,
                presale_retain_yes:action.payload
            };
        }
        /*Fix MPOS-2177 - Ends*/
        case 'IM_SKUNOTFOUND':{
            return{
                ...state,
                //data: action.payload,
                dataFrom: 'IM_SKUNOTFOUND',
                error_message:'',
                isValid : true
            }
        }
        case 'IM_ITEMNOTFOUND':{
            return{
                ...state,
                //data: action.payload,
                dataFrom: 'IM_ITEMNOTFOUND',
                error_message:'',
                isValid : true
            }
        }
        
        

        case 'ADD_GIFTCARD_SUCCESS' : {
            action.payload.cartItems.items = salesCartReformater(action.payload.cartItems.items, state.productImages)[0];
            return {
                ...state,
                data: action.payload,
                dataFrom: 'ADD_GIFTCARD_SUCCESS',
                error_message:'',
                isValid : true
            }
        }

        case 'CLEAR_CART': {
            // const datainit = ...state
            return {
                // ...state,
                ...initialState,
                dataFrom: '',
                error_message:'',
                isValid : true
            }
        }

        case 'CHANGE_ITEM_SELECTED':{
            return {
                // ...state,
                ...state,
                dataFrom: '',
                error_message:'',
                isValid : true
            }
            break;
        }        
        case 'MANAGER_PIN_VALIDATE_RESPONSE' : {
            return {
                ...state,
                managerPinValidateResponse : action.payload,
                dataFrom : 'MANAGER_PIN_VALIDATE_RESPONSE',
                error_message:'',
                isValid : true
            }
        }
        case 'LOGGED_IN_PIN_VALIDATE_RESPONSE' : {
            return {
                ...state,
                managerPinValidateResponse : action.payload,
                dataFrom : 'LOGGED_IN_PIN_VALIDATE_RESPONSE',
                error_message:'',
                isValid : true
            }
        }
        case 'CLEAR_DATA_FROM': {
            return {
                ...state,
                dataFrom : '',
                error_message:'',
                isValid : true
            }
        }
        case 'CLEAR_DEFAULT_SKU' : {
            return {
                ...state,
                dataFrom : 'CLEAR_DEFAULT_SKU',
                error_message:'',
                isValid : true
            }
        }
        case 'CLEAR_INVALID_SKU-ID' : {
            return {
                ...state,
                dataFrom : '',
                error_message:'',
                isValid : true
            }
        }
        case 'SALE_ITEM_MODIFY_REQUEST_VALIDFAILED':
        return{
            ...state,
            // searchItem: '',
            // isSearchItemSet :  false,
            // data : {},
            dataFrom : '',
            error_message: action.message,
            isValid : false,
        }
        default:
            return state;
                
            

    }
}