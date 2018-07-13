import {combineReducers} from 'redux';
import {HomeReducer} from '../../home/HomeReducer';
import {AddCustomerReducer} from '../../add-customer/BusinessLogic/AddCustomerReducer';
import {FooterReducer} from '../../common/footer/FooterReducer';
import {HeaderReducer} from '../../common/header/HeaderReducer';
import {CustomerDetailsReducer} from '../../customer-details/CustomerDetailsReducer';
import {CustomerSearchResultsReducer} from '../../customer-search/CustomerSearchResultsReducer';
import {CustomerDetailsInternationalReducer} from '../../customer-details-international/CustomerDetailsInternationalReducer';
import {UpdateCustomerInternationalReducer} from '../../update-customer/UpdateCustomerInternationalReducer';
import {VerifyCustomerDomesticReducer} from '../../verify_customer/VerifyCustomerDomesticReducer';
import {VerifyCustomerInternationalReducer} from '../../verify_customer/VerifyCustomerInternationalReducer';
import {UpdateCustomerReducer} from '../../update-customer/UpdateCustomerReducer';
import {ViewEditCustomerReducer} from '../../viewedit-customer/Controller/vieweditCustomerReducer';
import {ViewEditCustomerReducerSff} from '../../viewedit-customer-sff/Controller/vieweditCustomerReducer';
import {SaleEditCustomerReducer} from '../../sale-view-or-edit-customer/SaleEditCustomerReducer'
import {loginReducer} from '../../login/controller/loginReducer';
import {changePwrdReducer} from '../../change-password/controller/changePasswordReducer';
import {SpinnerReducer} from '../../common/loading/spinnerReducer';
import {paymentReducer} from '../../payment/Controller/paymentReducer';
import {incircleReducer} from '../../inCircle/Controller/incircleReducer';
import {SalesCartReducer} from '../../sale/SalesCartReducer';
import {CustomerSearchReducer} from '../../customer-search-sale/CustomerSearchReducer';
import {SaleReducer} from '../../sale/SaleReducer';
import {PostVoidReducer} from '../../post-void/postVoidReducer';
import {GiftWrapReducer} from '../../sale/sale-services/sale-services-gift-wrap/GiftWrapReducer';
import {ProductSearchReducer} from '../../product-search/ProductSearchReducer';
import { ProductDetailsReducer } from "../../product-details/ProductDetailsReducer";
import {PostVoidTransDetailsReducer} from '../../post-void/postVoidReducer';
import {PostVoidGetTransListReducer} from '../../post-void/postVoidReducer';
import {ItemSelectorReducer} from '../cartRenderer/reducer';
import AlterationReducer from '../../sale/sale-services/sale-services-alterations/AlterationReducer';
import AlterationDetailsReducer from '../../sale/sale-services/sale-services-alterations/AlterationReducer';
import {AddCardReducer} from '../../add-card/addCardReducer';
/* state-name: reducer-name where
    - 'state-name' is the name provided in mapStateToProps for that module
    - 'reducer-name' is the name of the reducer for that module (the name of the function exported)
*/
const reducers = combineReducers({
    home: HomeReducer,
    addCustomer: AddCustomerReducer,
    footer: FooterReducer,
    header: HeaderReducer,
    customerDetails: CustomerDetailsReducer,
    customerSearchResult: CustomerSearchResultsReducer,
	customerDetailsInternational: CustomerDetailsInternationalReducer,
    updateCustomerInternational: UpdateCustomerInternationalReducer,
    verifyCustomerDomestic: VerifyCustomerDomesticReducer,
    verifyCustomerInternational: VerifyCustomerInternationalReducer,
    updateCustomer: UpdateCustomerReducer,
    saleEditCustomer: SaleEditCustomerReducer,
    login: loginReducer,
    postvoid:PostVoidReducer,
    postvoidtransdetails:PostVoidTransDetailsReducer,
    postvoidgettransaction:PostVoidGetTransListReducer,
    userPin: changePwrdReducer,
    changePass: changePwrdReducer,
    viewEditCustomer: ViewEditCustomerReducer,
    viewEditCustomerSff: ViewEditCustomerReducerSff,
    spinner: SpinnerReducer,
    cart: SalesCartReducer,
    selectedItems: ItemSelectorReducer,
    customerSearch : CustomerSearchReducer,
    Payment: paymentReducer,
    Incircle: incircleReducer,
    productSearch : ProductSearchReducer,
    productDetails: ProductDetailsReducer,
    giftWrap: GiftWrapReducer,
    sale: SaleReducer,
    alterationComplete: AlterationReducer,
    alterationDetails: AlterationDetailsReducer,
    addCard : AddCardReducer
});

export default reducers;
