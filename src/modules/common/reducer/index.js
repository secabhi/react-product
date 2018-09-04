import {combineReducers} from 'redux';
import {HomeReducer} from '../../home/HomeReducer';
import {ResumeTransactionsReducer} from '../../resume/resume-services-transactions/ResumeTransactionsReducer';
import {ResumeReducer} from '../../resume/resumeReducer'
import {AddCustomerReducer} from '../../add-customer/BusinessLogic/AddCustomerReducer';
import {FooterReducer} from '../../common/footer/FooterReducer';
import {HeaderReducer,voidReducer} from '../../common/header/HeaderReducer';
import {CustomerDetailsReducer} from '../../customer-details/CustomerDetailsReducer';
import {UpdateCustomerInternationalReducer} from '../../update-customer/UpdateCustomerInternationalReducer';
import {VerifyCustomerDomesticReducer} from '../../verify_customer/VerifyCustomerDomesticReducer';
import {VerifyCustomerInternationalReducer} from '../../verify_customer/VerifyCustomerInternationalReducer';
import {UpdateCustomerReducer} from '../../update-customer/UpdateCustomerReducer';
import {ViewEditCustomerReducer} from '../../viewedit-customer/Controller/vieweditCustomerReducer';
import {ViewEditCustomerReducerSff} from '../../viewedit-customer-sff/Controller/vieweditCustomerReducer';
import {loginReducer} from '../../login/controller/loginReducer';
import {changePwrdReducer} from '../../change-password/controller/changePasswordReducer';
import {SpinnerReducer} from '../../common/loading/spinnerReducer';
import {paymentReducer} from '../../payment/Controller/paymentReducer';
import {incircleReducer} from '../../inCircle/Controller/incircleReducer';
import {SalesCartReducer} from '../../sale/SalesCartReducer';
import {CustomerSearchReducer} from '../../customer-search-sale/CustomerSearchReducer';
import {SaleReducer} from '../../sale/SaleReducer';
import PostVoidReducer from '../../post-void/postVoidReducer';
import {GiftWrapReducer} from '../../sale/sale-services/sale-services-gift-wrap/GiftWrapReducer';
import {ProductSearchReducer} from '../../product-search/ProductSearchReducer';
import { ProductDetailsReducer } from "../../product-details/ProductDetailsReducer";
import { ProductRowReducer } from "../../product-details/ProductRowReducer";
import { ProductDetailInfoReducer } from '../../product-details/ProductDetailinfoReducer';
import emailTrackingInfoReducer from '../../sale/sendModals/emailTrackingInfoReducer';
import {PrintSendTransDetailsReducer} from '../../print-send-receipt/PrintSendReducer';
import {PrintSendGetTransListReducer} from '../../print-send-receipt/PrintSendReducer';
import {ItemSelectorReducer} from '../cartRenderer/reducer';
import {NonSkuSelectionReducer} from '../cartRenderer/nonSkuSelectionReducer';
import {AlterationReducer} from '../../sale/sale-services/sale-services-alterations/AlterationReducer';
import {AddCardReducer} from '../../add-card/addCardReducer';
import {OptionSevenSendReducer} from '../../sale/sale-send/OptionSeven/OptionSevenReducer';
import {sendReducer} from '../../sale/sale-send/sendReducer';
import {GiftCardReducer} from '../../sale/sale-giftcard/GiftCardReducer';
import {RemindersReducer} from '../../reminders/remindersReducer';
import {suspendReducer} from '../../../modules/common/header/HeaderReducer';
import {ExceptionReducer} from '../../common/exceptionErrorModal/exceptionReducer'
import {PrintSendReducer} from '../../print-send-receipt/PrintSendReducer'

import {CardsReducer} from '../../account-lookup/controllers/accountLookupReducer'

/* state-name: reducer-name where
    - 'state-name' is the name provided in mapStateToProps for that module
    - 'reducer-name' is the name of the reducer for that module (the name of the function exported)
*/
const reducers = combineReducers({
    home: HomeReducer,
    resumeTransaction:ResumeTransactionsReducer,
    addCustomer: AddCustomerReducer,
    footer: FooterReducer,
    header: HeaderReducer,
    voidDetails:voidReducer,
    customerDetails: CustomerDetailsReducer,
    updateCustomerInternational: UpdateCustomerInternationalReducer,
    verifyCustomerDomestic: VerifyCustomerDomesticReducer,
    verifyCustomerInternational: VerifyCustomerInternationalReducer,
    updateCustomer: UpdateCustomerReducer,
    login: loginReducer,
    postvoid: PostVoidReducer,
    PrintSendtransdetails:PrintSendTransDetailsReducer,
    PrintSendgettransaction:PrintSendGetTransListReducer,
    userPin: changePwrdReducer,
    changePass: changePwrdReducer,
    viewEditCustomer: ViewEditCustomerReducer,
    viewEditCustomerSff: ViewEditCustomerReducerSff,
    spinner: SpinnerReducer,
    cart: SalesCartReducer,
    selectedItems: ItemSelectorReducer,
    nonSkuSelection: NonSkuSelectionReducer,
    customerSearch : CustomerSearchReducer,
    Payment: paymentReducer,
    Incircle: incircleReducer,
    PrintSend:PrintSendReducer,
    productSearch : ProductSearchReducer,
    productDetails: ProductDetailsReducer,
    productDetailInfo:ProductDetailInfoReducer,
    productRow:ProductRowReducer,
    giftWrap: GiftWrapReducer,
    sale: SaleReducer,
    alterationComplete: AlterationReducer,
    addCard : AddCardReducer,
    optionSevenSend: OptionSevenSendReducer,
    giftCard: GiftCardReducer,
    send: sendReducer,
    reminders : RemindersReducer,
    resumered:ResumeReducer,
    suspendTrans:suspendReducer,
    exceptionHandler:ExceptionReducer,
    Cards:CardsReducer,
    emailTrackingInfo:emailTrackingInfoReducer
});

export default reducers;
