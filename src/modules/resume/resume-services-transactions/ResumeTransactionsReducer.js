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
    //console.log("**** RESUME Transactions REDUCER",action)
    switch (action.type) {   
      default:
          return state;
          break;
    }
  }