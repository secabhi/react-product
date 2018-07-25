import { ADD_ALTERATIONS, RESET_ALTERATION } from "../../common/constants/type";

import salesCartReformater from '../../sale/helpers/salesCartReformater';

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
    itemPromotionDetails : '',
    dataFrom: '',
    productImages: {updated: true, imageUrls:{}},
    getResumeData : '',
    getResumeDataFrom : ''
  }
export function ResumeTransactionsReducer (state = initialState, action) {
    console.log("**** RESUME Transactions REDUCER",action)
    switch (action.type) {
      case 'RESUME_ENTRY_REQUEST_SUCCESS' : {
            let [cartItems, productImages] = salesCartReformater(action.payload.cartItems.items, state.productImages);
            action.payload.cartItems.items = cartItems;
            state.productImages = productImages;
            if (productImages.updated) {
                state.dataFrom = 'RESUME_TRANSACTIONS_SUCCESS'
            } else {
                state.dataFrom = 'UPDATE_IMAGES'
            }
            return {
                ...state,
                data : action.payload,
                
                /* data : {
                    response_code: "",
                    response_text: "",
                    cartItems: {
                        transactionId: "",
                        items: []
                    },
                    totalTax: "",
                    subTotal: "",
                    total: ""
                } */
          }
      }
      case 'UPDATED_IMAGES':
            let [cartItemWithImages, newProductImages] = salesCartReformater(state.data.cartItems.items, action.payload);
            state.data.cartItems.items = cartItemWithImages;
            state.productImages = newProductImages;
            debugger;
            return {
                ...state,
                dataFrom: 'UPDATED_IMAGES'
      }
      case 'RESUME_ENTRY_REQUEST_FAILURE' : {
          return {
                ...state,
                data : {
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
                dataFrom: "WEB_SERVICE_ERROR"
          }
      };   
      default:
          return state;
          break;
    }
  }