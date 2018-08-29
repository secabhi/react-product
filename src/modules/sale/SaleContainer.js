


import React, { Component } from 'react';
import SaleMenu from './SaleMenu';
import SaleKeypad from './SaleKeypad';
import SaleFooter from './SaleFooter';
import SaleContent from './SaleContent';
import SaleItems from './SaleItems';
import Modal from 'react-responsive-modal';
import ReactTooltip from 'react-tooltip'
import TextField from 'material-ui/TextField';
import info from '../../resources/images/Info.svg';
import warningIcon from '../../resources/images/Warning.svg';
import { validateDecimal } from '../common/helpers/helpers';
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrnetItem, presaleInitialRender,priceActions, addItemsRequest, addItemsSuccess, addItemsFailure, voidLineItemAction, applyTransDiscountToCart, applyAssociateDiscountToCart, getPromotionsAction, modifyPriceAction, modifyTaxAuthAction, modifyTaxAction, getDefaultSKU, validateManagerPinAction } from './SalesCartAction';
/*import {navigateToLookupOptions} from '../account-lookup/controllers/accountLookupActions';*/
import {useStoredCard,clearTendering} from '../account-lookup/controllers/accountLookupActions';
import Cancel_Purple_SFF from '../../resources/images/Cancel_Purple_SFF.svg';
import { goToSendPage } from './SaleAction';
import { itemSelectedAction } from '../common/cartRenderer/actions';
import { getTransactionId } from '../home/HomeSelector';
import { SaleItemReplenishment } from './sale-item-replenishment/sale-item-replishment';
import { pluck, indexOf, each } from 'underscore';

import { AddSkuModal, SearchModal, MaxItemCountModal, WarningCountModal, ScannerNotDockedModal, VoidLineConfirmModal, ModifyPriceModal, ModifyTaxModal, TaxAttemptModal, ManagerApprovalModal, ModifyPriceErrorModal, AmountToBeEnteredModal, KeyDeptModal, Subclass, Amount, PJmodal, QuantityInfoModal } from './modal-component/modalComponent';

//import { keyDeptModal } from './modal-component/ringSale/modalComponent';

import TransDiscountModal from './transModifiy/transDiscount/transDiscount';
import { store } from '../../store/store';

import { TransTaxExempt, TransTaxExemptSFF } from './transModifiy/trans-tax-exempt/transTaxExempt';
import { transTaxExemptUpdate } from './transModifiy/trans-tax-exempt/transTaxExemptActions'
import AssociateDiscountModal from './transModifiy/associateDiscount/associateDiscount';
import EmailTrackingModal from './sendModals/emailTrackingModal/emailTrackingModal';
import VerifyEmailModal from './sendModals/verifyEmailModal/verifyEmailModal';
import SenderRecipientSameModal from './sendModals/senderRecipientSameModal/senderRecipientSameModal';
//import { ModifyPrice } from './price/price'
import Modal2 from '../../UI/modal-two/modal-two';
import { saleitemModifyQuantityUpdate } from './sale-item-modify-quantity/saleitemModifyQuantityActions';
import { saleitemGiftRegistryUpdate } from './sale-item-gift-registry/saleitemGiftRegistryActions';
import { saleitemGiftReceiptUpdate } from './sale-item-gift-receipt/saleitemGiftReceiptActions';
import { SaleItemModifyQuantity, SaleItemModifyQuantitySFF } from './sale-item-modify-quantity/saleitemModifyQuantity';
import { SaleItemGiftRegistryRemove, SaleItemGiftRegistry, SaleItemRemoveGiftRegistrySFF, SaleItemGiftRegistrySFF } from './sale-item-gift-registry/saleitemGiftRegistry';
import { ItemModifySpecialInstructions, ItemModifySpecialInstructionsSFF } from './item-modify-special-instructions/itemModifySpecialInstructions'
import { SaleItemGiftReceiptRemove, SaleItemGiftReceipt, SaleItemRemoveGiftReceiptSFF, SaleItemGiftReceiptSFF } from './sale-item-gift-receipt/saleitemGiftReceipt';

import { itemModifySpecialInstructionsUpdate } from './item-modify-special-instructions/itemModifySpecialInstructionsActions';
import { updateReplishmentData, getReplenishment } from './sale-item-replenishment/sale-item-replishmentAction'
import { updateSplitCommissionData } from './sale-item-split-commission/sale-item-splitcommissionAction'
import { SaleItemSplitCommission, SaleItemSplitCommissionSFF } from './sale-item-split-commission/SaleItemSplitCommission';
import { SaleItemModifyPriceSFF } from './sale-item-modify-price/SaleItemModifyPrice';
import { startSpinner } from '../common/loading/spinnerAction';
// import { GetIsellCart } from './get-isell-cart/getIsellCart'
import SelectItemCartRenderer from '../common/cartRenderer/SelectItemCartRenderer';
// import GiftRegistryModal from '../sale/transModifiy/giftRegistry/giftRegistry';


import salesCartReformater from './helpers/salesCartReformater';
import { productImgSearchAction } from '../product-search/ProductSearchAction';
import { productSearchAction } from '../product-search/ProductSearchAction';
// import { SelectDeptModal } from './modal-component/modalComponent';

//Account Lookup Modals
/*import CustomerPhone from '../account-lookup/modals/CustomerPhoneModal';
import DLModal from '../account-lookup/modals/DLModal';
import ByPassModal from '../account-lookup/modals/BypassModal';
import {getCardsList} from '../account-lookup/controllers/accountLookupActions.js'
*/
import CardDetailsModal from '../account-lookup/modals/CardDetailsModal';


import './sale-container.css'; 
import { DEFAULT_SKU } from '../common/constants/type';
//import { config } from '../../../../platforms/windows/cordova/node_modules/shelljs/src/common';
//import { DEFAULT_PARSER } from '../../../../platforms/windows/cordova/node_modules/elementtree/lib/constants';
import ErrorAlertImage from '../../resources/images/Error_Alert.svg';
import preSaleImage from '../../resources/images/Sale_Black.svg';

class SaleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartIsShowingItems: false,
      giftRegistryErrorModal: true,
      disableOptions: false,
      disableHeaderOptions: false,
      spliterror1: '',
      spliterror2: '',
      sale_errorModal: false,
      sku_errorModal: false,
      modal_default_sku_error: false,
      replenishClientOpen: false,
      TranDiscPriceOverrideFlag: false,
      TranDiscPriceOverrideFlagPopup: false,
      userPin1: '',
      userPin2: '',
      items: [],

        dept:'',
        class:'',
        subClass:'',
        amount:'',
        PJnum:'',
      defaultSKU:'',
      deptType:'',
      directDefault:false,
      disableGiftReceipt:false,
      currentPopup: '',
      modify_type: '',
      modal_TransDiscount: false,
      modal_AssociateDiscount: false,
      modal_sku: false,
      modal_select_dept: false,
      modal_dept_key: false,
      modal_amount: false,
      modal_pj: false,
      modal_subclass: false,
      deptKey_modal: false,
      modal_search: false,
      modal_scanner: false,
      modal_quantity_info: false,
      modal_maxitem: false,
      modal_limit: false,
      modal_warning: false,
      modal_TransDiscount: false,
      modal_AssociateDiscount: false,
      modal_EmailTracking: false,
      modal_VerifyEmail: false,
      modal_sku_modify_quantity: false,
      modal_gift_registry: false,
      modal_gift_registry_remove: false,
      modal_gift_receiptflag: false,
      modal_gift_receipt_remove: false,
      modal_sku_modify_special_instructions: false,
      modal_TransTaxExempt: false,
      modal_sku_modify_quantity: false,
      modal_gift_registry: false,
      modal_gift_registry_remove: false,
      modal_gift_receipt: false,
      modal_gift_receipt_remove: false,
      modal_sku_modify_special_instructions: false,
      modal_TransTaxExempt: false,
      modal_split_commission: false,
      modal_price_modify: false,
      modal_tax_modify: false,
      is_tax_fail: false,
      modal_taxattemptdone: false,
      modal_Recipient_Sender: false,
      modifyPriceModalTitle: 'Price : Mkd % Off',
      modifyPriceModalPlaceholder: 'Enter % Off',
      modifyTaxModalTitle: 'Tax',
      modifyTaxModalPlaceholder: '',
      taxErrorText: '',
      scannerPresent: false,
      Replenishment_FlagModal: false,
      itemsObject: {},
      mkdPerWinCount: [],
      errors: {},
      pageDisabled: false,
      buttonDisabled: true,
      subTotal: 0,
      taxTotal: 0,
      total: 0,
      taxExemptID: '',
      PriceValue: 70,
      quantity: 0,
      specialInstructions: '',
      currentItem: '',
      currentItemIndex: '',
      replishmentOpen: false,
      giftRegistryOpen: false,
      transactionId: '',
      modal_void_line_confirm: false,
      voidItem: '',
      itemModifyCategory: '',
      values: {
        daysValue: '',
        description: ''
      },
      registryCLickStyle: '',
      CLickStyle: '',
      isItemSelected: false,
      pin1Error: "",
      pin2Error: "",
      itemPromotionDetails: {},
      modal_manager_approval: false,
      activeModifyPriceOption: '',
      modal_modify_price_error: false,
      managerPin: '',
      modifyPriceFieldValue: '',
      modifyPriceError: '',
      saleItemModifyPriceSFFValue: '',
      sendOptionSelected: false,
      associatetranserrormodal: false,
      AssociateDiscountAlreadyAppliedModal: false,
      AssociateDiscountInvalidPin: false,
      discountalreadyapplied: 'No More Discounts Allowed',
      amount_to_be_entered_modal: false,
      modified_amount_value: '',
      SKUValue: '',
      maxTransDiscountValue: 0,
      tranDiscPriceOverrideFlag: false,
      tranDiscAppliedFlag: false,
      autoreplenishflag: false,
      currentItemIndexAuto: false,
      itemarraylength: false,
      gifwrapError: false,
      PreSale_FlagModal: false,
      presaleFlaginCart:false,
      skuError: '',
      AuthCode: '',
      modal_items_handled: false,
      GetisellFlag: false,
      GiftWrap_Message: '',
      AlterationsMessage: '',
      SendsMessage: '',
      Sends7Message:'',
      getisellFlagDisplayObject: [],
      gp: false,
      giftreg: '',
      managerModalErrorMessage: '',
      modal_item_price_notfound_handled: false,
      itemNotFound: [],
      giftreceipt: false,
      disableTransGiftReceipt: false,
      giftreg:'',
      managerModalErrorMessage : '',
      //Account Lookup States
      tenderingCard:false,
      custPhoneModalFlag: false,
      DLModalFlag: false,
      byPassModalFlag: false,
      cards:{}


    }

    this.SALES_TAX = .08000;
    this.saleCartJson = require("../../resources/stubs/config.json");
    this.MAX_ITEM_COUNT = this.saleCartJson.MAX_ITEM_COUNT;
    this.WARNING_COUNT = this.saleCartJson.WARNING_COUNT;
    this.REMAINING_COUNT = this.saleCartJson.REMAINING_COUNT;
    this.deptDetails = {
      Dept: '',
      Class: '',
      SubClass: '',
      ManualPrice: '',
      DefaultSKU: ''
    }
  }

  handleChangedropdownColor = (type) => {
    console.log('enable disable in container' + type);
    this.setState({
      registryCLickStyle: type,
      CLickStyle: ''
    })
  }

  handleChangeTransdropdownColor = (type) => {
    console.log('enable disable in container' + type);
    this.setState({
      CLickStyle: type,
      registryCLickStyle: ''
    })
  }

  componentWillMount() {
   
    if (this.props.cart.getISellData !== '') {
      this.props.startSpinner(true);
    }
  }
  
  componentDidMount() {
    var currentDateTime=new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()
    console.log("currentdatetime "+currentDateTime)
    if(store.getState().home.registerInfoData && store.getState().home.registerInfoData.preSale!==null && store.getState().home.registerInfoData.preSale!==undefined)
    {
      var startDate=store.getState().home.registerInfoData.fromDate;
      var targetDate= store.getState().home.registerInfoData.toDate;
      var  endDate= new Date(targetDate);
      endDate.setDate(endDate.getDate() - 1);
      var  previousDay=endDate.toLocaleDateString()+" "+endDate.toLocaleTimeString()
      //this.setState({PreSale_FlagModal:store.getState().home.registerInfoData.preSale})
      if (store.getState().home.registerInfoData.preSale === true && (Date.parse(currentDateTime) >= Date.parse(startDate)) && (Date.parse(currentDateTime) <= Date.parse(previousDay))) {
        if (store.getState().cart && store.getState().cart.presaleinitialrender !== undefined &&
          store.getState().cart.presaleinitialrender == false)
          this.setState({ PreSale_FlagModal: false })
        else {
          this.setState({ PreSale_FlagModal: true })
        }
      }
    
      console.log('presal flag has set');
    }
    else
    {
      this.setState({PreSale_FlagModal:false})
    }
    document.getElementsByClassName('product-search-button')[0].style.opacity = 0.4;
    console.log("COMP DID MOUNT SALECONTAINER: ", this.props);
    const { cartItems, subTotal, totalTax, total, transactionId } = this.props.cart.data
    //if we have nothing showing and there are items in cart - rerender
    if (this.state.cartIsShowingItems === false && this.props.cart.data) {
      this.setState({
        items: cartItems.items,
        subTotal,
        totalTax,
        total,
        transactionId,
      });
    }
    else {
      this.setState({ transactionId: this.props.transactionId })
    }

    //if (this.props
    if (this.props.cart.data.cartItems.items.length > 0) {
      console.log("COMP DID MOUNT CART DETAILS: ", this.props.cart.data);
      this.setState({
        subTotal: this.props.cart.data.cartItems.subTotal,
        taxTotal: this.props.cart.data.cartItems.totalTax,
        total: this.props.cart.data.cartItems.total,
        taxExemptID:this.props.cart.data.taxExemptID
      })
    }

   

    if (this.props.cart.getISellData !== '' && this.props.cart.getISellData !== null) {
      this.props.startSpinner(true);
      var i;
      var skuIdmultiple = [];
      for (i = 0; i < this.props.cart.getISellData.itemDetailsList.length; i++) {
        var GetisellInfo = {
          "ItemNumber": this.props.cart.getISellData.itemDetailsList[i].pimSkuId,
          "ISellPrice": this.props.cart.getISellData.itemDetailsList[i].price
        }
        skuIdmultiple[i] = GetisellInfo;
      }
      
      console.log("Multiple SkuID's", skuIdmultiple);
      this.retrieveSkuMultiple(skuIdmultiple);
    }

    this.props.clearTenderingFlag();

  }

  amount_to_be_inserted_modal = (flag) => {

    this.setState({ amount_to_be_entered_modal: flag });
  }

  handleamountchange = (event, index, value) => {
    if (event.target.value.length < 1) {
      document.getElementById('Ok-button-area').disabled = true;
      document.getElementsByClassName('Ok-button-area')[0].style.opacity = ".4";
    }
    else {
      var decimalVal=validateDecimal(event.target.value)
      if (decimalVal)
      {
      document.getElementsByClassName("Ok-button-area")[0].disabled = false;
      document.getElementsByClassName('Ok-button-area')[0].style.opacity = "1";
      }
      else{
        document.getElementById('Ok-button-area').disabled= true;
        document.getElementsByClassName('Ok-button-area')[0].style.opacity = ".4";
      }
    }
    this.setState({ modified_amount_value: event.target.value });


  }

  modify_amount_on_submit = (flag) => {
    /*----API CALL to itemcart with ManualPrice---*/
    var transactionId = this.state.transactionId;
    this.props.startSpinner(true);
    this.props.addItemsRequestInvoker({
      "ItemNumber": this.state.SKUValue.toString(),
      "TranDiscPriceOverrideFlag": this.state.tranDiscPriceOverrideFlag,
      "ManualPrice": this.state.modified_amount_value,
      "TransactionId": this.state.transactionId
    });


    this.setState({ amount_to_be_entered_modal: flag });
  }



  navigateToPayment = () => {
    console.log('Selected Items Empty', this.props);
    var navigateToPaymentFlag = false;
    console.log('this.props.cart.getISellData.itemDetailsList', this.props.cart.getISellData.itemDetailsList);

    if (this.state.GetisellFlag === true) {
      var getisellprops = this.props.cart.getISellData.itemDetailsList;
      var giftwrapmsgflag = false;
      var alterationmsgflag = false;
      var sendsmsgflag = false;
      var sends7msgflag = false;

      // console.log("Multiple SkuID's", skuIdmultiple);
      this.state.items.map(function (item, index) {
        getisellprops.map(function (getsellitem, index) {
          console.log('MAP', item[0]);
          console.log('getsellitem', getsellitem.pimSkuId);
          if (item[0].pim_SKU_ID === getsellitem.pimSkuId) {
            if (getsellitem.flgGift === true) {
              if (item[0].hasGiftWrap === true) {
                navigateToPaymentFlag = true;
              }
              else {
                console.log('GiftWrap_Message');

                giftwrapmsgflag = true;
                var getISellFlagDisplayArray = this.state.getisellFlagDisplayObject;
                var skuIdPresentFlag = false;
                var skuIdPresentIndex = 0;

                for (var j = 0; j < getISellFlagDisplayArray.length; ++j) {
                  if (getISellFlagDisplayArray[j].skuId === getsellitem.pimSkuId) {
                    skuIdPresentFlag = true;
                    skuIdPresentIndex = j;
                    break;
                  }
                }

                if (skuIdPresentFlag) {
                  getISellFlagDisplayArray[j] = {
                    ...getISellFlagDisplayArray[j],
                    giftwrapdisplayFlag: true
                  }
                }
                else {
                  getISellFlagDisplayArray.push({
                    skuId: getsellitem.pimSkuId,
                    giftwrapdisplayFlag: true

                  });
                }
                this.setState({
                  getisellFlagDisplayObject: getISellFlagDisplayArray,
                  gp: true
                });

              }

            }


            if (getsellitem.flgAlt === true) {
              if (item[0].hasAlteration === true ) {
                navigateToPaymentFlag = true;
              }
              else {
                console.log('Alteration_Message');
                alterationmsgflag = true;
                var getISellFlagDisplayArray = this.state.getisellFlagDisplayObject;
                var skuIdPresentFlag = false;
                var skuIdPresentIndex = 0;

                for (var j = 0; j < getISellFlagDisplayArray.length; ++j) {
                  if (getISellFlagDisplayArray[j].skuId === getsellitem.pimSkuId) {
                    skuIdPresentFlag = true;
                    skuIdPresentIndex = j;
                    break;
                  }
                }

                if (skuIdPresentFlag) {
                  getISellFlagDisplayArray[j] = {
                    ...getISellFlagDisplayArray[j],
                    alterationdisplayFlag: true
                  }
                }
                else {
                  getISellFlagDisplayArray.push({
                    skuId: getsellitem.pimSkuId,
                    alterationdisplayFlag: true

                  });
                }
                this.setState({
                  getisellFlagDisplayObject: getISellFlagDisplayArray,
                  gp: true
                });
              }
            }
            if (getsellitem.flgSends === true) {
              if (item[0].sendOption === 1) {
                navigateToPaymentFlag = true;
              }
              else {
                console.log('Sends_Message');
                sendsmsgflag = true;
                var getISellFlagDisplayArray = this.state.getisellFlagDisplayObject;
                var skuIdPresentFlag = false;
                var skuIdPresentIndex = 0;

                for (var j = 0; j < getISellFlagDisplayArray.length; ++j) {
                  if (getISellFlagDisplayArray[j].skuId === getsellitem.pimSkuId) {
                    skuIdPresentFlag = true;
                    skuIdPresentIndex = j;
                    break;
                  }
                }

                if (skuIdPresentFlag) {
                  getISellFlagDisplayArray[j] = {
                    ...getISellFlagDisplayArray[j],
                    sendsdisplayFlag: true
                  }
                }
                else {
                  getISellFlagDisplayArray.push({
                    skuId: getsellitem.pimSkuId,
                    sendsdisplayFlag: true

                  });
                }
                this.setState({
                  getisellFlagDisplayObject: getISellFlagDisplayArray,
                  gp: true
                });
              }
            }
            if (getsellitem.flgSends7 === true) {
              if (item[0].sendOption === 2) {
                navigateToPaymentFlag = true;
              }
              else {
                console.log('Sends_Message');
                sends7msgflag = true;
                var getISellFlagDisplayArray = this.state.getisellFlagDisplayObject;
                var skuIdPresentFlag = false;
                var skuIdPresentIndex = 0;

                for (var j = 0; j < getISellFlagDisplayArray.length; ++j) {
                  if (getISellFlagDisplayArray[j].skuId === getsellitem.pimSkuId) {
                    skuIdPresentFlag = true;
                    skuIdPresentIndex = j;
                    break;
                  }
                }

                if (skuIdPresentFlag) {
                  getISellFlagDisplayArray[j] = {
                    ...getISellFlagDisplayArray[j],
                    sends7displayFlag: true
                  }
                }
                else {
                  getISellFlagDisplayArray.push({
                    skuId: getsellitem.pimSkuId,
                    sends7displayFlag: true

                  });
                }
                this.setState({
                  getisellFlagDisplayObject: getISellFlagDisplayArray,
                  gp: true
                });
              }
            }


          }
          else {
            navigateToPaymentFlag = true;
          }
        }, this)
      }, this)
      console.log('this.giftWrapFlagDisplayObject', this.state.giftWrapFlagDisplayObject);
      if (giftwrapmsgflag === true) {
        this.setState({ modal_items_handled: true, GiftWrap_Message: 'Gift Wrapping' });
      }
      if (alterationmsgflag === true) {
        this.setState({ modal_items_handled: true, AlterationsMessage: 'Alterations' });
      }
      if (sendsmsgflag === true) {
        this.setState({ modal_items_handled: true, SendsMessage: 'Sends' });
      }
      if (sends7msgflag === true) {
        this.setState({ modal_items_handled: true, Sends7Message: 'Sends7' });
      }

    }
    else {
      navigateToPaymentFlag = true;
    }
    if (navigateToPaymentFlag) {
      this.setCurrentItem("","","","","","");
      console.log('Selected Items Check', this.props.selectedItem);
      this.props.history.push('/payment', this.props.history.location.state ? { isClienteled: this.props.history.location.state.isClienteled } : { isClienteled: true })
    }
    else {
      //SHOW ERROR MESSAGE
    }
  }

  componentWillReceiveProps(nextProps) {
    //if(nextProps.cart.dataFrom != this.props.cart.dataFrom ){
    //debugger;
    let errors = {};
    console.log('props in container', this.props);
    console.log('type' + nextProps.cart.dataFrom);
    this.setState({ scrollCheck: false });
    //debugger;
    if(nextProps.cards.dataFrom === 'SET_TENDERING'){
      this.navigateToPayment();

      
    }
    //do we need product images
    if (nextProps.cart.dataFrom === 'UPDATE_IMAGES') {
      //const multiImageTest = {updated: false, imageUrls: {401052070933:'',401014934152:'',401058977854:'',401015154958:''}}
      //this.props.productImgSearchAction(nextProps.cart.productImages.imageUrls);
      //this.props.productImgSearchAction(multiImageTest.imageUrls);
      
        //this.props.startSpinner(true);
        this.props.productImgSearchAction(nextProps.cart.productImages.imageUrls);
    
    }
    //for calling additemtocart API with default SKU
    if (nextProps.cart.dataFrom === 'DEFAULT_SKU') {
      console.log('default props'+JSON.stringify(nextProps.cart.data));
      this.setState({deptType:nextProps.cart.data.deptType})
      //var deptType = this.state.deptType;
      this.setState({defaultSKU:nextProps.cart.data.defaultSKU});
      this.deptDetails.DefaultSKU = nextProps.cart.data.defaultSKU;

      if(nextProps.cart.data.deptType==2 && this.state.directDefault==false)
      {
        this.setState({ modal_pj:true })
        if (this.props.spinner.startSpinner)
        this.props.startSpinner(false);
      }
      else{

        this.setState({ modal_amount:true })
        console.log('defaultSKU in container'+nextProps.cart.data.defaultSKU);
        if (this.props.spinner.startSpinner)
        this.props.startSpinner(false);
        console.log('defaultSKU in container' + this.state.defaultSKU);
      }

    }

    if(nextProps.cart.dataFrom === 'IM_SKUNOTFOUND') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({modal_default_sku_error:true});
      
    }
    if (nextProps.cart.dataFrom === 'TAX_AUTH_FAIL') {      
      this.showItemModifyTaxModal(true, 'Tax', 'Override Authorization Code');
      this.setState({ is_tax_fail: true })
      if (this.props.spinner.startSpinner)
      {
        this.props.startSpinner(false);
      }        
    }
    else if (nextProps.cart.dataFrom === 'TAX_AUTH_SUCCESS') {
      this.setState({modal_tax_modify:false});
      this.setState({ is_tax_fail: false })
      this.props.modifyTaxInvoker(this.state.transactionId, this.state.items[this.state.currentItemIndex][0], this.state.AuthCode);

    }
    //check for transaction id in redux
    if (nextProps.cart.dataFrom === 'SC_INVALIDPIN1') {
      errors["spliterror1"] = "Pin1 is Invalid"
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'SPLIT_COMMISSION_REQUEST_SUCCESS') {

      //this.showSplitCommissionModal(false);
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'SC_INVALIDPIN2') {
      errors["spliterror2"] = "Pin2 is Invalid"
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'SC_INVALIDPINS') {
      errors["spliterror1"] = "Pin1 is Invalid"
      errors["spliterror2"] = "Pin2 is Invalid"
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'GIFTREGISTRY_FAIL') {
      this.setState({ cart_errorModal: true })
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'SC_SAMEPINS') {
      errors["spliterror2"] = "PIN1 and pin2 are same"
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom !== 'WEB_SERVICE_ERROR' && nextProps.cart.dataFrom !== 'GP_PRICENOTFOUND' && nextProps.cart.dataFrom !== 'INVALID_SKU-ID' && nextProps.cart.dataFrom !== 'RP_FAIL' && nextProps.cart.dataFrom !== 'REPLENISH_FAIL' && nextProps.cart.dataFrom !== 'SPLIT_COMM_ERROR' && nextProps.cart.dataFrom !== 'IM_DISCOUNTALREADYAPPLIED' && nextProps.cart.dataFrom !== 'GET_PROMOTIONS_SUCCESS' && nextProps.cart.dataFrom !== 'TAX_AUTH_FAIL' && nextProps.cart.dataFrom !== 'DEFAULT_SKU' && nextProps.cart.dataFrom !== 'IM_SKUNOTFOUND') {
      console.log('transactionID' + nextProps.cart.data.transactionId);
      if (nextProps.cart.data && (nextProps.cart.data.transactionId !== undefined || nextProps.cart.data.transactionId)) {
        this.setState({ transactionId: nextProps.cart.data.transactionId });
      }
      //added as a work around for special instructions
      else if (nextProps.cart.data && nextProps.cart.data.data && nextProps.cart.data.data.transactionId) {
        this.setState({ transactionId: nextProps.cart.data.data.transactionId });
      }
      else {
        console.log('will receive props');

        // if(nextProps.cart.dataFrom!=='DEFAULT_SKU')
        //commenting the below code as incorrect transaction id is getting passed in some scenarios.
        //this.setState({ transactionId: '1249' })
      }
    }
    if (nextProps.cart.dataFrom == 'INVALID_SKU-ID') {
      this.setState({ sku_errorModal: true })
    }
    {/*if(nextProps.cart.dataFrom=='RP_FAIL' && store.getState().customerSearch.clienteled!==false)
    {
      this.setState({sale_errorModal:true});
    }*/}
    if (nextProps.cart.dataFrom == 'WEB_SERVICE_ERROR') {
      this.setState({ sale_errorModal: false });
    }

    console.log(nextProps);

    //dont write here ...append to last
    // if(nextProps.cart.data.cartItems.items[0].salePrice==1)
    // {

    //   this.amount_to_be_inserted_modal(true);

    // //  this.setState({  amount_to_be_entered_modal:true });
    // }


    //update only if adding item or applying Discount.. may need to add to condition for other things
    if (nextProps.cart.dataFrom === 'ADD_ITEM' || nextProps.cart.dataFrom === 'ADD_ITEM1' || nextProps.cart.dataFrom === 'UPDATED_IMAGES') {
      this.setState({ scrollCheck: true });
    }
    if (nextProps.cart.dataFrom === 'ADD_ITEM' || nextProps.cart.dataFrom === 'ADD_ITEM1' || nextProps.cart.dataFrom === 'TRANS_DISCOUNT_APPLIED'
      || nextProps.cart.dataFrom === 'MODIFY_SPECIAL_INSTRUCTIONS_UPDATE' || nextProps.cart.dataFrom === 'GIFT_WRAP' || nextProps.cart.dataFrom === 'UPDATED_IMAGES' || nextProps.cart.dataFrom === 'ADD_GIFTCARD_SUCCESS' || nextProps.cart.dataFrom === "DIRECT_SEND_SUCCESS") {
        if(this.props.spinner.startSpinner)
        this.props.startSpinner(false);
      //cartIsShowingItems is used as one of factors to rerenderCart when component is unmounted
      //this.setState({ cartIsShowingItems: true, scrollCheck: true });
      //this.setState({disableOptions:true});
      if (nextProps.cart.dataFrom === 'TRANS_DISCOUNT_APPLIED') {
        this.setState({ tranDiscAppliedFlag: true });
      }
      var itemArrayLength = 0;
      var maxTransDiscountValue = 0;
      for (var i = 0; i < this.state.items.length; ++i) {
        if (this.state.items[i][0].quantity > 0) {
          itemArrayLength++;
        }
      }
      for (var i = 0; i < nextProps.cart.data.cartItems.items.length; ++i) {
        if (i === 0) {
          maxTransDiscountValue = nextProps.cart.data.cartItems.items[i][0].maxDiscount;
        }
        else {
          if (nextProps.cart.data.cartItems.items[i][0].maxDiscount < maxTransDiscountValue) {
            maxTransDiscountValue = nextProps.cart.data.cartItems.items[i][0].maxDiscount;
          }
        }
      }

      if (itemArrayLength < nextProps.cart.data.cartItems.items.length) {

        if (nextProps.cart.data.cartItems.items[itemArrayLength][0].isAutoReplenish === true && store.getState().customerSearch.clienteled === true) {
          this.setState({
            autoreplenishflag: true,
            currentItemIndexAuto: itemArrayLength,
            Replenishment_FlagModal: true,
          });

        }

      }

      if (itemArrayLength < this.MAX_ITEM_COUNT) {
        if (itemArrayLength === (this.WARNING_COUNT - 1)) {
          this.setState({
            items: nextProps.cart.data.cartItems.items,
            subTotal: nextProps.cart.data.subTotal,
            taxTotal: nextProps.cart.data.totalTax,
            total: nextProps.cart.data.total,
            modal_sku: false, modal_warning: true,
            maxTransDiscountValue: maxTransDiscountValue 
          });

        }
        else {
          let { subTotal, totalTax, total } = nextProps.cart.data;
          this.setState({
            items: nextProps.cart.data.cartItems.items,
            subTotal: nextProps.cart.data.subTotal,
            taxTotal: nextProps.cart.data.totalTax,
            total: nextProps.cart.data.total,
            maxTransDiscountValue: maxTransDiscountValue
          });
        }
      }
      // else {
      //   if (this.state.items.length !== nextProps.cart.data.cartItems.items.length)
      //     this.setState({ modal_quantity_info: false, modal_sku: false, modal_maxitem: true, modal_amount: false, maxTransDiscountValue: maxTransDiscountValue });
      // }

      // console.log('nextProps.cart', nextProps.cart.data);
      // var Additemtocartkeys = Object.keys(nextProps.cart.data);
      // console.log('allkeys', Additemtocartkeys);

      // if (Additemtocartkeys === "itemNotFound") {
      //   alert('ITEM NOT FOUND');
      //   nextProps
      // }
      if (nextProps.cart.data.hasOwnProperty('itemNotFound')) {
        if (nextProps.cart.data.itemNotFound !== null && nextProps.cart.data.itemNotFound.length > 0) {
          var itemNotFound = [];
          itemNotFound = nextProps.cart.data.itemNotFound;
          console.log(itemNotFound);
          this.setState({ modal_item_price_notfound_handled: true, itemNotFound: itemNotFound })
        }
      }
    }
    else if (nextProps.cart.dataFrom === 'GP_PRICENOTFOUND') {

      console.log("PRICE_NOT_FOUND");
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.amount_to_be_inserted_modal(true);


    }
    
    else if (nextProps.cart.dataFrom === 'LINE_VOID') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,
        currentItem: '',
        currentItemIndex: ''
      });
      if (nextProps.selectedItem.length > 0 && nextProps.selectedItem.length == 1 && this.state.items.length > 0) {
        this.setState({ currentItemIndex: nextProps.selectedItem[0] })
      }
    }

    else if (nextProps.cart.dataFrom === 'QUANTITY_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total
      });
      var isQuantityUpdated = false;
     this.state.items.forEach((item) => {
       var obj = nextProps.cart.data.cartItems.items.filter((obj) => obj[0].lineNumber === item[0].lineNumber)[0];
       if (item[0].quantity !== obj[0].quantity) {
         isQuantityUpdated = true;
       }
     });
     if (isQuantityUpdated == false) {
       this.setState({ modal_quantity_info: true, modal_sku: false, modal_maxitem: false,modal_amount:false });
     }
    }


    else if (nextProps.cart.dataFrom === 'DISCOUNT_EXCEEDS') {
      //this.props.startSpinner(false);
      console.log('props trans' + JSON.stringify(nextProps));
      this.setState({ TranDiscPriceOverrideFlag: true });
      this.setState({ transDicountSku: nextProps.cart.sku })
    }


    else if (nextProps.cart.dataFrom === 'GIFT_REGISTRY_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total

      });

      this.disableGiftRec(nextProps.cart.data.cartItems.items);

    }
    else if (nextProps.cart.dataFrom === 'TRANS_TAX_EXEMPT_REQUEST_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);

      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,
        taxExemptID: nextProps.cart.data.taxExemptID,
      });

    }
    else if (nextProps.cart.dataFrom === 'TAX_MODIFY_UPDATE_SUCCESS') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,
        taxExemptID: nextProps.cart.data.taxExemptID,
      });

    }
    else if (nextProps.cart.dataFrom === 'GIFT_RECEIPT_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,

      });
    }


    else if (nextProps.cart.dataFrom === 'WEB_SERVICE_ERROR') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'INVALID_SKU-ID') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === 'MAX_ITEM_REACHED') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      if (this.state.items.length < 50) {
        this.setState({ modal_maxitem: true })
      }
    }

    else if (nextProps.cart.dataFrom === 'GETREPLENISH') {
      var cycleFromService = nextProps.cart.data.Cycle;
      var descriptionFromService = nextProps.cart.data.Description;
      var valuesFromService = {
        daysValue: cycleFromService,
        description: descriptionFromService
      }
      this.setState({ values: valuesFromService });
    }

    else if (nextProps.cart.dataFrom === 'MENU_ITEM_CHANGED') {
      this.setState({
        menuData: nextProps.cart.menuData
      })
    }
    else if (nextProps.cart.dataFrom === "SPLIT_COMMISSION_SUCCESS") {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      if (window.innerWidth > 1900) {
        this.setState({
          items: nextProps.cart.data.cartItems.items,
          modal_split_commission: false
        });
      } else {
        this.setState({ items: nextProps.cart.data.cartItems.items });
        this.hideItemModifyModalSmallFF()
      }

    }
    else if (nextProps.cart.dataFrom === "SPLIT_COMM_ERROR") {
      this.setState({ pin2Error: nextProps.cart.pin2Error });
    }
    else if (nextProps.cart.dataFrom === "GET_PROMOTIONS_SUCCESS") {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({ itemPromotionDetails: nextProps.cart.itemPromotionDetails });
    }
    else if (nextProps.cart.dataFrom === "GET_PROMOTIONS_FAILURE") {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === "MODIFY_PRICE_SUCCESS") {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total
      });
    }

    else if (nextProps.cart.dataFrom === 'QUANTITY_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.data.cartItems.items,
        subTotal: nextProps.cart.data.data.subTotal,
        taxTotal: nextProps.cart.data.data.totalTax,
        total: nextProps.cart.data.data.total
      });
    }
    else if (nextProps.cart.dataFrom === 'REPLENISH_UPDATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        /*subTotal: nextProps.cart.data.data.subTotal,
        taxTotal: nextProps.cart.data.data.totalTax,
        total: nextProps.cart.data.data.total*/
      });
    }


    else if (nextProps.cart.dataFrom == 'IM_RINGINGASSOCIATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      // if(nextProps.cart.isInvalid == true){

      this.showTransModifyAssociateDiscountErrorModal(true, '');

      // }
    }

    else if (nextProps.cart.dataFrom == 'IM_INVALIDASSOCIATE') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);
      // if(nextProps.cart.isInvalid == true){
      this.setState({ AssociateDiscountInvalidPin: true })
      // }
    }

    else if (nextProps.cart.dataFrom == 'IM_DISCOUNTALREADYAPPLIED') {
      if (this.props.spinner.startSpinner)
      this.props.startSpinner(false);

      this.setState({ AssociateDiscountAlreadyAppliedModal: true })


      // }
    }
    else if (nextProps.cart.dataFrom === 'ALTERATION_SUCCESS') {

      /* this.startSpinner(false); */
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total
      });
      //this.props.history.push('/sale');
    }
    else if (nextProps.cart.dataFrom === 'MANAGER_PIN_VALIDATE_RESPONSE') { 
      try {             
        this.props.startSpinner(false);
        if(nextProps.cart.managerPinValidateResponse.isManagerPIN === true) {
          this.showManagerApprovalModal(false, this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption);
          if (this.state.activeModifyPriceOption === 'TransDiscount') {
            this.props.startSpinner(true);
            this.setState({ tranDiscPriceOverrideFlag: true });
            this.props.applyTransDiscountToCart(this.state.modifyPriceFieldValue, this.state.transactionId);
          }
          else if (this.state.activeModifyPriceOption === 'TransDiscountAlreadyApplied') {
            this.setState({ modal_TransDiscount: true })
          }
          else if (this.state.activeModifyPriceOption === 'TransDiscAppliedAddNewSku') {
            this.setState({ tranDiscPriceOverrideFlag: true }, () => {
              this.retrieveSku(this.state.SKUValue.toString())
            })
          }
          else {
            this.modifyPrice(this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption,this.state.managerPin);
          }
        }
        else {
          console.log('Manager PIN invalid');
          this.setState({ managerModalErrorMessage : 'Please enter a valid Manager PIN' });
        }
      } catch (e) {
        console.log(e);
      }
    }
    
    if (nextProps.cart.dataFrom === 'LOGGED_IN_PIN_VALIDATE_RESPONSE') {
      try {             
        this.props.startSpinner(false);
        if(nextProps.cart.managerPinValidateResponse.isManagerPIN === true) {
          this.setState({ managerPin : this.props.login.userpin });
          if (this.state.activeModifyPriceOption === 'TransDiscount') {
            this.props.startSpinner(true);
            this.setState({ tranDiscPriceOverrideFlag: true });
            this.props.applyTransDiscountToCart(this.state.modifyPriceFieldValue, this.state.transactionId);
          }
          else if (this.state.activeModifyPriceOption === 'TransDiscountAlreadyApplied') {
            this.setState({ modal_TransDiscount: true })
          }
          else if (this.state.activeModifyPriceOption === 'TransDiscAppliedAddNewSku') {
            this.setState({ tranDiscPriceOverrideFlag: true }, () => {
              this.retrieveSku(this.state.SKUValue.toString())
            })
          }
          else {
            this.modifyPrice(this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption,this.props.login.userpin);
          }
        }
        else {
          console.log('Logged in user is not a manager');
          this.showManagerApprovalModal(true, this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption, false);
        }
      } catch (e) {
        console.log(e);
      }
    }
   
    this.setState({ errors: errors })
  
  //}

  }

  setCurrentMenuItem = menu => {
    this.props.setCurrnetItemInvoker(menu);
  }

  checkForScanner() {
    if (this.state.scannerPresent) {

    }
    else {
      this.setState({ modal_scanner: true });
    }
  }

  updateTotal(subTotal, taxTotal, total) {
    this.setState({ subTotal, taxTotal, total })
  }

  retrieveSkuMultiple(skuArray) {
    this.props.startSpinner(true);
    if (!skuArray) {
      return;
    }
    else {
      var transactionId = this.state.transactionId;
      this.props.startSpinner(true);
      this.setState({ GetisellFlag: true });
      this.props.addItemsRequestInvoker({
        "ItemNumbers": skuArray,
        // "TranDiscPriceOverrideFlag":this.state.TranDiscPriceOverrideFlag==true?true:false,
        "TransactionId": transactionId
      });
    }

    this.setState({ modal_sku: false }); // dismisses modal after submitting sku

  }

  disableGiftRec = (items) => {
    let newItems = [];
    if (this.state.modify_type == 'trans') {
      if (items && items.length > 0) {
        each(items, (e, i) => {
          if (e[0].gift_reg != "0" && e[0].gift_reg != null) {
            this.setState({ disableTransGiftReceipt: true });
          } else {
            this.setState({ disableTransGiftReceipt: false });
          }
        });
      }
    }
    else {
      if (items && items.length > 0) {
        if (items[this.state.currentItemIndex][0].gift_reg != "0" && items[this.state.currentItemIndex][0].gift_reg != null) {
          this.setState({ giftreceipt: items[this.state.currentItemIndex][0].print_GWGR_Msg, disableGiftReceipt: true });
        } else {
          this.setState({ giftreceipt: '', disableGiftReceipt: false });
        }
      }
    }
  }

  changeSku(){
    this.setState({skuError:''})
  }

  retrieveSku(sku) {

    var skuError = "";
    if (!sku) {
      skuError = 'Please Key in value'
      this.setState({ skuError: skuError })
      return;
    }
    else {
      this.setState({ SKUValue: sku });
      var transactionId = this.state.transactionId;
      this.props.startSpinner(true);
      if (this.state.items.length < this.MAX_ITEM_COUNT) {
        this.setState({ SKUValue: sku });
        this.props.addItemsRequestInvoker({
          "ItemNumber": sku.toString(),
          "TranDiscPriceOverrideFlag": this.state.tranDiscPriceOverrideFlag,
          "TransactionId": transactionId,
          "PresaleFlag": this.state.presaleFlaginCart

        });
      } else {
        this.props.startSpinner(false);
        this.setState({ modal_maxitem: true })
      }

    }

    this.setState({ modal_sku: false }); // dismisses modal after submitting sku

  }
 
  AddItemtoCartDefault = ()=> {
      console.log('pj num '+this.state.PJnum);
      var sku = this.deptDetails.DefaultSKU;
      var transactionId = this.state.transactionId;
      this.props.startSpinner(true);
      this.props.addItemsRequestInvoker({
        "ItemNumber": sku.toString(),
        "TranDiscPriceOverrideFlag": this.state.tranDiscPriceOverrideFlag,
        "TransactionId": transactionId,
        "PJNumber":this.state.PJnum?this.state.PJnum:'',
        "ManualPrice":this.deptDetails.ManualPrice?this.deptDetails.ManualPrice:''
      });

    this.setState({ modal_sku: false, modal_amount: false }); // dismisses modal after submitting sku

  }
  /*Additemtocart if not item in the file**/

  cancelReplenish = (item) => {
    document.getElementsByClassName('sale-content-container-outer')[0].style.display = "block";
    document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "block";
    document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "none";
  }

  cancelGiftRegistry = (item) => {
    document.getElementsByClassName('sale-content-container-outer')[0].style.display = "block";
    document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "block";
    document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "none";
  }

  voidLineItem = (item) => {
    console.log('MIKE ITEM SELECTED', item)
    this.props.startSpinner(true);
    //clearSelection - redux action
    this.props.itemSelectedAction('');
    this.props.voidLineItemInvoker(item, this.state.transactionId);
  }

  sendGiftReceipt = (item) => {

  }

  setCurrentItem = (itemNumber, itemPrice, itemSku, selectedItem, index, giftReg) => {
    // this.disableGiftRec(this.state.items[index][0]);

    if (giftReg !== null && giftReg !== '' && giftReg != 0) {
      this.setState({ disableGiftReceipt: true })
    }
    else {
      this.setState({ disableGiftReceipt: false })

    }

    console.log("INDEX", index)
    console.log("selectedItem", selectedItem)
    this.setState({ scrollCheck: false })
    //store in redux
    this.props.itemSelectedAction(index)
    if (index !== '' || selectedItem !== '') {
      //this.props.startSpinner(true);
      // this.props.getPromotionsInvoker(this.state.transactionId, this.state.items[index][0]);
      this.setState({ currentItemNumber: itemNumber, currentItemPrice: itemPrice, currentItemSku: itemSku, currentItem: selectedItem, currentItemIndex: index });
    }
    else {
      this.setState({ currentItemNumber: itemNumber, currentItemPrice: itemPrice, currentItemSku: itemSku, currentItem: selectedItem, currentItemIndex: index, itemPromotionDetails: {} });
    }


  }

  loadPriceDrpDown = () => {
    this.props.startSpinner(true);
    this.props.getPromotionsInvoker(this.state.transactionId, this.state.items[this.state.currentItemIndex][0]);
  }

  loadTaxDrpDown = () => {
    this.props.getPromotionsInvoker(this.state.transactionId, this.state.items[this.state.currentItemIndex][0]);
  }

  getSelectedItem = (isSelected, selectedItem) => {
    this.setState({ isItemSelected: isSelected });
  }

  saleitemModifyQuantityUpdate = (quantity) => {
    this.props.startSpinner(true);  
    var qty = parseInt(quantity)
    if((this.state.items[this.state.currentItemIndex][0].quantity)!==qty)
    {
      this.props.saleitemModifyQuantityUpdateInvoker(this.state.items[this.state.currentItemIndex][0], this.state.transactionId, quantity);
    }
    else{
      this.props.startSpinner(false);
      this.setState({ modal_quantity_info: true, modal_sku: false, modal_maxitem: false,modal_amount:false });
    }
    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  setTaxError = (flag) => {
    this.setState({ is_tax_fail: false });
  }

  saleitemGiftRegistryUpdate = (gift, modify_type) => {
    this.props.startSpinner(true);
    this.props.saleitemGiftRegistryUpdateInvoker(modify_type == 'IteamRegistry' ? this.state.items[this.state.currentItemIndex][0] : '', this.state.transactionId, gift, modify_type, this.props.login.userpin);

    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  //item gift receipt update
  saleitemGiftReceiptUpdate = (modify_type) => {
    this.props.startSpinner(true);
    this.props.saleitemGiftReceiptUpdateInvoker(modify_type == 'item' ? this.state.items[this.state.currentItemIndex] : '', this.state.transactionId, modify_type, this.props.login.userpin, this.state.currentItemIndex);

    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  showTransDiscount = (showFlag) => {
    this.handleChangeTransdropdownColor("TransDiscount");
    // this.setState({ modal_TransDiscount: showFlag });
  }

  showTransTaxExempt = (showFlag) => {
    this.setState({ modal_TransTaxExempt: showFlag });
  }

  itemModifySpecialInstructionsUpdate = (specialInstructions) => {
    this.props.startSpinner(true);
    this.props.itemModifySpecialInstructionsUpdateInvoker(this.state.items[this.state.currentItemIndex][0], this.state.transactionId, specialInstructions);

    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  transTaxExemptUpdate = (transtaxexempt) => {
    this.props.startSpinner(true);
    this.props.transTaxExemptUpdateInvoker(this.state.items[this.state.currentItemIndex], this.state.transactionId, transtaxexempt);

    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  showQuantityModal = (showFlag) => {
    if (showFlag) {
      this.setState({ modal_sku_modify_quantity: showFlag });
    }
    else {
      this.setState({ modal_sku_modify_quantity: showFlag });
      this.handleChangedropdownColor("");
    }

  }

  showSelectDept = () => {
    //  this.showSelectDeptModal(true);
  }

  showSelectDeptModal = (showFlag) => {
    this.setState({ modal_select_dept: showFlag });
    this.setState({ modal_sku: false });
  }

  showaddskumodal = () => {

    this.setState({ modal_select_dept: false });
    this.setState({ modal_sku: true, skuError: '' });
  }

  showItemGiftRegistryModal = (showFlag, type) => {
   
   
    this.setState({ modify_type: type })
    if (type == 'IteamRegistry') {
      var isTransGiftRegEmpty = true;
      var giftRegNumber = '';
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].gift_reg && this.state.items[i][0].gift_reg != 0) {
          isTransGiftRegEmpty = false;
          giftRegNumber = this.state.items[i][0].gift_reg;
        }
      }

      console.log('------------Current item index-----------: ',this.state.currentItemIndex,this.state.items[this.state.currentItemIndex][0].gift_reg)
      if (isTransGiftRegEmpty === true) {
        this.setState({ modal_gift_registry: showFlag });
      }
      else if(isTransGiftRegEmpty === false && this.state.items[this.state.currentItemIndex][0].gift_reg && (parseInt(this.state.items[this.state.currentItemIndex][0].gift_reg) === 0 || this.state.items[this.state.currentItemIndex][0].gift_reg === '')){        
        this.saleitemGiftRegistryUpdate(giftRegNumber, type)
      }      
      else {
        this.saleitemGiftRegistryUpdate("", type)
      }
     
    }
    else if (type == 'trans') {
  
      //if (this.props.cart.giftRegNumber === "" || this.props.cart.giftRegNumber === undefined || this.props.cart.giftRegNumber === null) {
      var isTransGiftRegEmpty = true;
      var giftRegNumber = '';
      var giftRegPresentForAll = true;
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].gift_reg && this.state.items[i][0].gift_reg != 0) {
          //isTransGiftRegFilled =true;
          isTransGiftRegEmpty = false;
          giftRegNumber = this.state.items[i][0].gift_reg;
        }
        else {
          giftRegPresentForAll = false;
        }
      }
    //isTransGiftRegEmpty = false;
      if (giftRegPresentForAll === true) {
        //this.setState({ modal_gift_registry_remove: showFlag });
        this.saleitemGiftRegistryUpdate("", type);
      }
      else if(giftRegPresentForAll === false && isTransGiftRegEmpty === false) {
        this.saleitemGiftRegistryUpdate(giftRegNumber, type);
      }
      else {
        this.setState({ modal_gift_registry: showFlag });
      }
      //}
        /* else {
       
        this.saleitemGiftRegistryUpdate("", type)
      } */
      
      //var checkGift = this.state.items[0].gift_reg;

    }

  }

  //show gift receipt modal
  showItemGiftReceiptModal = (showFlag, type) => {

    this.setState({ modify_type: type })
    if (type == 'itemreceipt') {
      this.saleitemGiftReceiptUpdate('item');

    }
    else if (type == 'trans') {
      var isTransGiftRegEmpty;
      var giftreg;
      for (var i = 0; i < this.state.items.length; i++) {
        giftreg=this.state.items[i][0].gift_reg;
        if (this.state.items[i][0].print_GWGR_Msg && this.state.items[i][0].print_GWGR_Msg != 0) {
          
        }
        else {
          isTransGiftRegEmpty = true;
        }
      }
      
      //isTransGiftRegEmpty = false;
      if (!isTransGiftRegEmpty || isTransGiftRegEmpty == undefined ) {
       if(giftreg!=="000000000000"){
        this.setState({ modal_gift_receiptflag: true });
        }else{
          //this.setState({ modal_gift_receipt_remove: showFlag });
          this.saleitemGiftReceiptUpdate();
        }
      }
      else {
        this.saleitemGiftReceiptUpdate();
      //  this.setState({ modal_gift_receipt: showFlag });
      }

    }

  }

  showSpecialInstructionsModal = (showFlag) => {
    if (showFlag) {
      this.setState({ modal_sku_modify_special_instructions: showFlag });
    }
    else {
      this.setState({ modal_sku_modify_special_instructions: showFlag });
      this.handleChangedropdownColor("");
    }

  }

  showVoidLineConfirmModal = (showFlag, item) => {
    if (item !== '') {
      this.setState({ modal_void_line_confirm: showFlag, voidItem: item });
    }
    else {
      this.setState({ modal_void_line_confirm: showFlag });
    }
  }

  showReplenishmentModal = (showFlag) => {

    console.log('in replenishment');
    console.log('store data in replenish' + JSON.stringify(store.getState()));

    console.log('custsearch in replenishment' + JSON.stringify(store.getState().customerSearch));
    if (window.innerWidth > 1080) {
      if (store.getState().customerSearch.clienteled === true) {
        this.setState({
          replishmentOpen: showFlag,
          Replenishment_FlagModal: false,
          autoreplenishflag: false
        });
      }
      else {
        this.setState({ replishmentOpen: false, replenishClientOpen: true });
      }
    }
    else {
      document.getElementsByClassName('footer-container')[0].style.display = "none";
    }
  }

  showGiftRegistryModal = (showFlag) => {
    if (window.innerWidth > 1080) {
      this.setState({ giftRegistryOpen: showFlag });

    }
    else {
      this.handleChangedropdownColor("");
      document.getElementsByClassName('footer-container')[0].style.display = "none";
    }
  }

  handleSmallFFValidation = (updatedDays, updatedDescription) => {
    if (updatedDays === "" || parseInt(updatedDays) < 15 || parseInt(updatedDays) > 500) {
      document.getElementsByClassName('errorLabelSFF')[0].style.display = "block"
      document.getElementsByClassName('okbtn')[0].style.opacity = "0.4"
    } else {
      document.getElementsByClassName('errorLabelSFF')[0].style.display = "none"
      document.getElementsByClassName('okbtn')[0].style.opacity = "1"
    }
  }

  applyTransDiscount = (percentage) => {
  
    //hide modal and enable options menu & apply discount
    console.log(this.state.maxTransDiscountValue);
    if (percentage < this.state.maxTransDiscountValue) {
      this.setState({ modal_TransDiscount: false, disableOptions: false });
      this.props.startSpinner(true);
      this.props.applyTransDiscountToCart(percentage, this.state.transactionId);
    }
    else {
      this.setState({ modal_TransDiscount: false, disableOptions: false });
      this.showManagerApprovalModal(true, percentage, "TransDiscount")
    }
  }

  applyAssociateDiscount = (pin, id) => {
 
    //hide modal and enable options menu & apply discount
    this.setState({ modal_AssociateDiscount: false, disableOptions: false });
    this.props.startSpinner(true);
    this.props.applyAssociateDiscountToCart(pin, id, this.state.transactionId, this.props.login.userpin);
  }

  splitCommissionOpened = (modifytype) => {

    if (this.props.currentItem !== '') {
      if (window.innerWidth > 1080) {
        this.handleChangeTransdropdownColor("TransSplit");
        this.showSplitCommissionModal(true, modifytype);
      }
      else {
        // this.props.closeNav();
        if (modifytype == 'transmodifysplit') {

          this.showItemModifyModalSmallFF('transmodifysplit');

        }
        else if (modifytype == 'itemsplit') {
          this.showItemModifyModalSmallFF('splitCommission');

        }
      }
    }
  }

  TransTaxExempt = () => {
    if (this.props.currentItem !== '' && this.state.taxExemptID.trim() === '') {

      if (window.innerWidth > 1080) {
        this.handleChangeTransdropdownColor("TransExempt");
        this.showTransTaxExempt(true);
      }
      else {
        //this.closeNav();
        this.showItemModifyModalSmallFF('TransTaxExempt');
      }
    }
    else {
      this.setState({ modal_taxattemptdone: true });
    }
  }

  //trans modify gift registry
  transGiftRegistry = (modifytype) => {
    if (this.props.currentItem !== '') {

      if (window.innerWidth > 1080) {
        this.handleChangeTransdropdownColor("TransRegistry");
        this.showItemGiftRegistryModal(true, 'trans');
      }
      else {
        //this.closeNav();
        this.showItemModifyModalSmallFF('transgift');
      }
    }
    else {
      //DO NOTHING
    }
  }

  //trans modify gift receipt
  transGiftReceipt = () => {
    if (this.props.currentItem !== '') {

      if (window.innerWidth > 1080) {
        this.handleChangeTransdropdownColor("TransReceipt");
        this.showItemGiftReceiptModal(true, 'trans');
      }
      else {
        //this.closeNav();
        this.showItemModifyModalSmallFF('transgiftreceipt');
      }
    }
    else {
      //DO NOTHING
    }
  }

  updateReplenish = (daysValue, description) => {
    if (window.innerWidth < 1920) {
      var daysValue = this.state.values.daysValue;
      var description = this.state.values.description;
    }
    this.props.startSpinner(true);
    if (this.state.autoreplenishflag == true) {

      this.props.updateReplishmentDataInvoker(daysValue, description, this.state.items[this.state.currentItemIndexAuto], this.state.transactionId);

    } else {

      this.props.updateReplishmentDataInvoker(daysValue, description, this.state.items[this.state.currentItemIndex], this.state.transactionId);



    }
    // this.props.updateReplishmentDataInvoker(daysValue, description, this.state.items[this.state.currentItemIndex], this.state.transactionId);
    this.cancelReplenish();
  }

  getReplenishData = () => {
    if (this.state.autoreplenishflag == true) {
      console.log(this.state.items[this.state.currentItemIndexAuto][0]);
      this.props.getReplenishDataInvoker(this.props.login.userpin, this.state.items[this.state.currentItemIndexAuto][0]);
    }
    else {
      this.props.getReplenishDataInvoker(this.props.login.userpin, this.state.items[this.state.currentItemIndex][0]);
    }
    // this.props.getReplenishDataInvoker(this.props.login.userpin, this.state.items[this.state.currentItemIndex][0]);

  }

  isEnabled = (data) => {
  }

  showItemModifyModalSmallFF = (calledFrom) => {
    this.setState({ disableHeaderOptions: true });
    if (calledFrom === 'replenishment') {
      this.props.getReplenishDataInvoker(this.props.login.userpin, this.state.items[this.state.currentItemIndex][0]);
      this.setState({ itemModifyCategory: 'replenishment' });
    }
    else if (calledFrom === 'splitCommission') {
      this.setState({ itemModifyCategory: 'splitCommission', type_split_commission: 'itemsplit', pin2Error: '' });
    }

    else if (calledFrom === 'transmodifysplit') {
      this.setState({ itemModifyCategory: 'transmodifysplit', type_split_commission: 'transmodifysplit', pin2Error: '' });
    }

    else if (calledFrom === 'quantity') {
      this.setState({ itemModifyCategory: 'quantity' });
    }

    else if (calledFrom === 'TransTaxExempt') {
      this.setState({ itemModifyCategory: 'TransTaxExempt' });
    }

    else if (calledFrom === 'gift') {
      var checkGift = this.state.items[this.state.currentItemIndex][0].gift_reg;
      console.log('checkGift' + checkGift);
      if (checkGift === '' || checkGift == 0 || checkGift == null) {

        this.setState({ itemModifyCategory: 'giftRegistry' });
      }
      else {
        this.setState({ giftRegistryErrorModal: true });
        this.setState({ itemModifyCategory: 'removeItemgiftRegistry' });
      }
    }

    else if (calledFrom === 'transgift') {

      var isTransGiftRegEmpty;
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].gift_reg && this.state.items[i][0].gift_reg != 0) {
          //isTransGiftRegFilled =true;
        }
        else {
          isTransGiftRegEmpty = true;
        }
      }

      if (!isTransGiftRegEmpty) {
        this.setState({ giftRegistryErrorModal: true });
        // this.setState({modal_gift_registry_remove : showFlag});
        this.setState({ itemModifyCategory: 'transremoveItemgiftRegistry' });
      }
      else {
        //this.setState({modal_gift_registry : showFlag});
        this.setState({ itemModifyCategory: 'transgiftRegistry' });

      }
    }

    //trans receipt
    else if (calledFrom === 'itemreceipt') {
      this.saleitemGiftReceiptUpdate('item');
    }

    else if (calledFrom === 'transgiftreceipt') {

      var isTransGiftRecEmpty;
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].print_GWGR_Msg && this.state.items[i][0].print_GWGR_Msg != 0) {
          //isTransGiftRegFilled =true;
        }
        else {
          isTransGiftRecEmpty = true;
        }
      }
      //isTransGiftRecEmpty = false;
      if (!isTransGiftRecEmpty) {
        // this.setState({modal_gift_registry_remove : showFlag});
        this.setState({ itemModifyCategory: 'transremovegiftReceipt' });
      }
      else {
        //this.setState({modal_gift_registry : showFlag});
        this.setState({ itemModifyCategory: 'transgiftReceipt' });

      }
    }

    else if (calledFrom === 'mkdPerc') {
      this.setState({ itemModifyCategory: 'mkdPerc' });
    }
    else if (calledFrom === 'mkdDollar') {
      this.setState({ itemModifyCategory: 'mkdDollar' });
    }
    else if (calledFrom === 'priceOverride') {
      this.setState({ itemModifyCategory: 'priceOverride' });
    }
    else if (calledFrom === 'mkdNewPrice') {
      this.setState({ itemModifyCategory: 'mkdNewPrice' });
    }
    else if (calledFrom === 'omniPerc') {
      this.setState({ itemModifyCategory: 'omniPerc' });
    }
    else if (calledFrom === 'omniDollar') {
      this.setState({ itemModifyCategory: 'omniDollar' });
    }
    else if (calledFrom === 'omniNewPrice') {
      this.setState({ itemModifyCategory: 'omniNewPrice' });
    }
    else if (calledFrom === 'specialInstructions') {
      this.setState({ itemModifyCategory: 'specialInstructions' });
    }
    else if (calledFrom === 'giftregistry') {
      this.setState({ itemModifyCategory: 'giftregistry' });
    }
    else if (calledFrom === 'transgift') {
      this.setState({ itemModifyCategory: 'transgift' });
    }
    else {
      //DO NOTHING. ADD CONDITIONS FOR OTHER SCENARIOS AS WELL
    }
    //trans receipt
    if (calledFrom === 'itemreceipt') {

    }
    else {
      this.setState({ disableHeaderOptions: true });
      document.getElementsByClassName('sale-content-container-outer')[0].style.display = "none";
      document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "none";
      document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "block";
    }
    console.log('itemModifyCategory' + this.state.itemModifyCategory);
  }

  hideItemModifyModalSmallFF = () => {
    this.setState({ disableHeaderOptions: false });
    document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "none";
    document.getElementsByClassName('sale-content-container-outer')[0].style.display = "block";
    document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "block";
  }

  giftRegistryCloseModal = () => {
    this.setState({ giftRegistryErrorModal: false })
    this.hideItemModifyModalSmallFF();
  }

  giftRegistryOpenModal = () => {
    this.setState({ giftRegistryErrorModal: true })
  }

  handleqtyChange = (event, index, value) => {
    var value = event.target.value;
    var udpatedValues = Object.assign({}, this.state.values);
    udpatedValues.daysValue = value;
    this.setState({ values: udpatedValues });
    var updatedDays = this.state.values.daysValue;
    var updatedDescription = this.state.values.description;
    this.handleSmallFFValidation(updatedDays, updatedDescription);

  }

  updateDescription = (event, index, value) => {
    var value = event.target.value;
    var udpatedValues = Object.assign({}, this.state.values);
    udpatedValues.description = value;
    this.setState({ values: udpatedValues });
    var updatedDays = this.state.values.daysValue;
    var updatedDescription = this.state.values.description;
    //this.handleSmallFFValidation(updatedDays,updatedDescription);

  }

  okclickshowSplitCommissionModal = () => {
    var spliterror1, spliterror2;
    if (this.state.userPin1.length > 0 && this.state.userPin1.length < 6) {
      spliterror1 = 'Invalid Pin'

    }
    if (this.state.userPin2.length > 0 && this.state.userPin2.length < 6) {
      spliterror2 = 'Invalid Pin'

    }
    if (spliterror1 != 'Invalid Pin' && spliterror2 != 'Invalid Pin') {
      if (window.innerWidth > 1080) {
        this.showSplitCommissionModal(false);
      }
      else {
        this.hideItemModifyModalSmallFF();
      }

    }
    this.setState({ spliterror1: spliterror1, spliterror2: spliterror2 })
  }

  showSplitCommissionModal = (showFlag, calledfrom) => {
    var cart = this.state.items
    console.log('me',this.state)
    console.log('meprop',this.props)
    const itemIndex = this.state.currentItemIndex;
    if (showFlag) {
      if (cart) {
        if (showFlag && cart[itemIndex ? itemIndex : 0][0].salesId != "0") {
          if (calledfrom == this.state.type_split_commission)
            this.onSubmitshowSplitCommissionModal(cart[itemIndex ? itemIndex : 0][0].salesId);
          else
            this.setState({ modal_split_commission: showFlag, type_split_commission: calledfrom, errors: [] });
          //this.showSplitCommissionModal(true);
        }
        else if (showFlag && cart[itemIndex ? itemIndex : 0][0].salesId == "0") {
          this.setState({ modal_split_commission: showFlag, type_split_commission: calledfrom, errors: [] });
        }
      }
    }
    else {
      this.setState({ modal_split_commission: showFlag, type_split_commission: calledfrom, errors: [] });
      this.handleChangeTransdropdownColor("");
    }
  }

  handlePin1Change = (event, index, value) => {
    if (event.target.value) {
      if (window.innerWidth > 1900) {
        document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
        document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');
      }
      else {
        document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
        document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');
      }
    }
    else {
      //DO NOTHING
    }
    this.setState({ userPin1: event.target.value, spliterror1: '' });
  }

  handlePin2Change = (event, index, value) => {
    if (event.target.value) {
      if (window.innerWidth > 1900) {
        //document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
        //document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');
      }
      else {
        // document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "";
      }
    }
    else {
      //DO NOTHING
    }
    this.setState({ userPin2: event.target.value, spliterror2: '' });
  }

  onSubmitshowSplitCommissionModal = (userPin1, userPin2) => {

    // if(window.innerWidth<1920){
    //   var userPin1=this.state.userPin1;
    //   var userPin2= this.state.values.userPin2;
    // }
    if (this.state.type_split_commission == 'itemsplit') {
      this.props.updateSplitCommisssionInvoker(userPin1, userPin2, this.state.items[this.state.currentItemIndex][0], this.state.transactionId, "false");
      this.props.startSpinner(true);
    }
    if (this.state.type_split_commission == 'transmodifysplit') {
      this.props.updateSplitCommisssionInvoker(userPin1, userPin2, '', this.state.transactionId, "true");
      this.props.startSpinner(true);
    }

    // this.cancelReplenish();
  }

  showItemModifyPriceModal = (showFlag, title, placeholder) => {
    this.setState({ modal_price_modify: showFlag, modifyPriceModalTitle: title, modifyPriceModalPlaceholder: placeholder });
  }

  showItemModifyTaxModal = (showFlag, title, placeholder, errorText) => {
    this.setState({ modal_tax_modify: showFlag, modifyTaxModalTitle: title, modifyTaxModalPlaceholder: placeholder, taxErrorText: errorText });
  }

  modifyPrice = (modifyValue, calledFrom, managerPin = '') => {
    if (window.innerWidth > 1900) {
      this.showItemModifyPriceModal(false, '', '', '');
    }
    else {
      this.setState({ saleItemModifyPriceSFFValue: '' });
      this.hideItemModifyModalSmallFF();
    }
    this.props.startSpinner(true);
    this.props.modifyPriceInvoker(this.state.transactionId, this.state.items[this.state.currentItemIndex][0], modifyValue, managerPin, calledFrom);
  }

  modifyTax = (modifyValue) => {
    this.setState({ AuthCode: modifyValue });
    if (window.innerWidth > 1900) {
      this.showItemModifyPriceModal(false, '', '');
    }
    this.props.startSpinner(true);
    this.props.modifyTaxAuthInvoker(this.state.transactionId, modifyValue);
  }

  showManagerApprovalModal = (showFlag, fieldValue, calledFrom, loggedInUserCheck = true) => {
    this.setState({ activeModifyPriceOption: calledFrom, modifyPriceFieldValue: fieldValue });
    console.log('Logged in user: ' + this.props.login.userpin);
    if(showFlag === true && loggedInUserCheck === true) {
      this.props.startSpinner(true);
      this.props.validateManagerPinActionInvoker(this.props.login.userpin,true);
    }
    else {
      this.setState({ modal_manager_approval: showFlag });
    }
  }

  validateManagerApproval = (managerPin) => {
    console.log('validateManagerApproval');
    //this.setState({ managerPin: managerPin, tranDiscPriceOverrideFlag: true });
    //this.showManagerApprovalModal(false, this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption);
    this.setState({ managerPin: managerPin, managerModalErrorMessage : '' });
    this.props.startSpinner(true);
    this.props.validateManagerPinActionInvoker(managerPin,false);
    /* if (this.state.activeModifyPriceOption === 'TransDiscount') {
      this.props.startSpinner(true);
      this.props.applyTransDiscountToCart(this.state.modifyPriceFieldValue, this.state.transactionId);
    }
    else if (this.state.activeModifyPriceOption === 'TransDiscountAlreadyApplied') {
      this.setState({ modal_TransDiscount: true })
    }
    else {
      this.modifyPrice(this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption);
    } */
  }

  showModifyErrorModal = (showFlag, errorText, giftRecieptFlow) => {
    if (giftRecieptFlow)
      this.setState({ modal_modify_price_error: showFlag, modifyPriceError: errorText,});
    else
      this.setState({ modal_modify_price_error: showFlag, modifyPriceError: errorText, AssociateDiscountInvalidPin: showFlag, AssociateDiscountAlreadyAppliedModal: showFlag, discountalreadyapplied: errorText, modal_gift_receiptflag: false });
  }

  showTransModifyAssociateDiscountErrorModal = (showFlag, val) => {

    this.setState({ associatetranserrormodal: showFlag });
  }
  /*Navigate back to Product Search */

  navigateToProductSearch = () => {
    // Below code need to be uncommented after september release.Opacity also need to be removed for the same.
    // this.props.history.push('/product-search');
  }

  openCameraScanner = () => {
    console.log('OPEN CAMERA SCANNER');
    if (window.cordova) {
      console.log('Cordova Present');
      window.cordova.plugins.barcodeScanner.scan(
        this.cameraScanSuccess,
        this.cameraScanFailure,
        {
          preferFrontCamera: true, // iOS and Android
          prompt: "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false, // iOS and Android
          formats: "QR_CODE,PDF_417,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,DATA_MATRIX,CODABAR,ITF,RSS14,MSI,AZTEC"
        }
      );
    }
    else {
      console.log('Cordova not Present');
    }
  }

  cameraScanSuccess = (result) => {
    //console.log("We got a barcode\n", "Result: ", result.text, "\n", "Format: ", result.format, "\n", "Cancelled: ", result.cancelled);
    console.log('Barcode Scanned. Result text: ', result.text)
    this.retrieveSku(result.text)
  }

  cameraScanFailure = (error) => {
    console.log("Camera scanning failed: ", error);
  }

  /** for Ring a sale, adding item wihtour sku or with default sku **/

  showDeptKeyModal = (showFlag) => {
    this.setState({ modal_dept_key: showFlag });
    this.setState({ modal_sku: false });
  }

  setDeptClass = (obj) => {

    this.setState({ dept: obj.deptNo });
    this.setState({ class: obj.classNo });
    this.deptDetails.Dept = obj.deptNo;
    this.deptDetails.Class = obj.classNo;

  }

  setSubClass = (subclass) => {

    this.setState({ subClass: subclass });
    this.deptDetails.SubClass = subclass;
    console.log('dept details' + this.deptDetails.Dept);

  }

  setAmount = (amount) => {
    this.setState({ amount: amount });
    this.deptDetails.ManualPrice = amount;

    console.log('class' + JSON.stringify(this.state.class));
    console.log('amount' + JSON.stringify(this.state.amount));
  }

  setPJnum = (pj) => {
    this.setState({PJnum:pj});
  }

  setDept = (deptType) =>{
    this.setState({deptType:deptType});
  }

  setDefaultSku = (flag) => {
    this.setState({directDefault:flag})
  }

  getDefaultSKUCall=(subclass)=>{
    console.log('deptType '+this.state.deptType);

    /*if(this.state.deptType=='pj')
    {
      this.setState({ modal_pj:true })
      this.setState({ modal_subclass:false })
    }
    else{*/
      var deftInfo = {
        Dept:this.deptDetails.Dept,
        Class:this.deptDetails.Class,
        SubClass:this.deptDetails.SubClass?this.deptDetails.SubClass:'',
      }
      this.setState({ modal_subclass:false })
      this.setState({ modal_dept_key: false});
      this.props.startSpinner(true);
      this.props.getDefaultSKUInvoker(deftInfo);
    /*}*/

  }

  showHideSubClassModal = (showFlag) => {
   // this.setState({ modal_dept_key: false});
    this.setState({ modal_subclass: showFlag});
    this.setState({ modal_sku: false });
  }

  showHidePjModal = (showFlag) => {
    this.setState({ modal_dept_key: false });
    this.setState({ modal_subclass: false });
    this.setState({ modal_sku: false });
    this.setState({ modal_pj: showFlag });
  }

  closegiftWrap = () => {
    this.setState({ gifwrapError: false })
  }

  showHideAmountModal = (showFlag) => {
    /*if(this.state.deptType=='pj')
    {
      this.setState({ modal_pj:true })
    }
    else{*/
    this.setState({ modal_amount: showFlag })
    /*}*/

    this.setState({ modal_dept_key: false });
    this.setState({ modal_subclass: false });
    this.setState({ modal_sku: false });
  }
  preSaleYesClick = () => {

    this.setState({
      PreSale_FlagModal: false,
      presaleFlaginCart: true,
    })
    this.props.presaleInitialRender();
    this.props.makePresaleHeader();
  }
  /**ring a sale closing */
  //for trans desc override
  setTransDesc = (flag) => {
    /* var transactionId = this.state.transactionId; */
    /* this.setState({ TranDiscPriceOverrideFlag: false }); */
    this.setState({ TranDiscPriceOverrideFlagPopup: false, activeModifyPriceOption : 'TransDiscAppliedAddNewSku', modifyPriceFieldValue : '' });
    if(flag === true) {
      this.showManagerApprovalModal(true,'','TransDiscAppliedAddNewSku')
    }
    /* var transactionId = this.state.transactionId; */
    /* this.setState({ TranDiscPriceOverrideFlag: false }); */
    this.setState({ TranDiscPriceOverrideFlagPopup: false, activeModifyPriceOption: 'TransDiscAppliedAddNewSku', modifyPriceFieldValue: '' });
    if (flag === true) {
      this.showManagerApprovalModal(true, '', 'TransDiscAppliedAddNewSku')
    }
    console.log('all props' + JSON.stringify(this.props));
    /* this.props.addItemsRequestInvoker({
      "ItemNumber": this.state.transDicountSku.toString(),
      "TranDiscPriceOverrideFlag":this.state.TranDiscPriceOverrideFlag==true?true:false,
      "TransactionId": transactionId
    }); */

  }

  checkItemAvailable = (from) => {
    //this.state.currentItem === '' && this.props.nonSkuSelection
   
  //only used for Transmodiy to determine if items in cart not counting voids
   for(let n = 0; n < this.state.items.length; n++) {
     console.log('sweezey this.state.items[n]',this.state.items[n][0].quantity);
     if(this.state.items[n][0].quantity) return true
   }
    return false
  }

  opentenderingCard = () =>{
    this.setState({tenderingCard:true});
  }

  closetenderingCard = () =>{
    this.setState({tenderingCard:false});
  }

  setUseStoredCard = (flag)=>{
    this.props.useStoredCardFlag(flag);
    
  }
  //Account Lookup methods
  /*closeDLModel = () =>
  {
    this.setState({ DLModalFlag: false });
  }
  OpenThridParty = () =>
  {

  }
  closeCustModel = () =>
  {
    //alert('close is called');
    this.setState({ custPhoneModalFlag: false });
  }
  nextCustModel = () =>
  {
   this.setState({ custPhoneModalFlag: false,      
      DLModalFlag:true });
  }
  nextDLModel = () =>
  {
    this.setState({       
      DLModalFlag:false
     });
  }
  OpenByPassModel = () =>
  {
    this.setState({       
      DLModalFlag:false,
     byPassModalFlag:true
     });
  }
  closeByPassModel = () =>
  {
    this.setState({      
      byPassModalFlag:false });
  }
  nextByPassModel = () =>
  {
    this.setState({      
      byPassModalFlag:false });
  }
getCardsListInvoker = () =>{
  console.log('customer obj in sale container'+JSON.stringify(store.getState().customerDetails.clientNumber));

    let request = {
      "storeClientNo" : store.getState().customerDetails.clientNumber
    }

    this.props.getCardsList(request);
}
*/
  render() {
    console.log('PRANAV THIS', this)
    const activeTransModify = this.checkItemAvailable() && !this.props.nonSkuSelection && !(this.props.selectedItem[0] !== undefined);
    console.log('Sweezey activeTransModify render', activeTransModify);
    var textFieldStyle = {
      height: '41px',
      width: '95px'
    }
    var giftRegistryTextStyle = {
      height: '180px',
      width: '920px'
    }
    var textFieldInputStyle = {
      height: '37px',
      fontFamily: 'Roboto',
      fontSize: '48px',
      lineHeight: '1.19',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      letterSpacing: '2px',
      textAlign: 'left',
      color: '#505050',
      paddingBottom: '4.5px',
      paddingLeft: '13px'
    }
    var textAreaStyle = {
      height: '90px',
      width: '915px',
      fontFamily: 'Roboto',
      paddingTop: '20px',
      lineHeight: '1.19',
      fontSize: '48px',
      paddingLeft: '19.6px',
      paddingRight: '19.6px'
    }
    var textDaysStyle = {
      height: '37px',
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.31',
      fontSize: '48px'
    }
    var underlineStyle = {
      display: 'none'
    }
    var underlineStyleInputs = {
      backgroundColor: '#828282',
      height: '0.8px',
    }
    var giftunderlineStyleInputs = {
      backgroundColor: '#707070',
      height: '0.8px',
    }
    var searchFieldStyle = {
      height: '37px',
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontWeight: '300',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.31',
      letterSpacing: 'normal',
      textAalign: 'left',
      color: '#ffffff'
    }
    var textFieldFloatingLabelStyle = {
      height: '28px',
      fontSize: '32px',
      fontWeight: '300',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontStretch: 'normal',
      letterSpacing: '2px',
      lineHeight: '1.21',
      textAlign: 'left',
      color: '#828282',
      top: '30px'
    }
    var gifttextFieldFloatingLabelStyle = {
      height: '28px',
      fontSize: '48px',
      fontWeight: '300',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontStretch: 'normal',
      letterSpacing: '2px',
      lineHeight: '1.21',
      textAlign: 'left',
      color: '#828282',
      top: '85px'
    }
    var gifttextFieldInputStyle = {
      height: '245px',
      fontFamily: 'Roboto',
      fontSize: '48px',
      lineHeight: '1.19',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      letterSpacing: '2px',
      textAlign: 'left',
      color: '#505050',
      paddingBottom: '4.5px',
      paddingLeft: '13px'
    }
    var searchFieldEnteredTextStyle = {
      height: '239px',
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontHeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.31',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#ffffff'
    }
    var itemModifyCategoryContent = {};
    var selectedItemObject = (<div></div>);

    const disabledStyle = {
      opacity: this.state.items[0] ? '1' : '.5',
      disabled: this.state.items[0] ? 'false' : 'true',
      pointerEvents: this.state.items[0] ? 'auto' : 'none'
    }

    const disabledHeaderStyle = {
      opacity: '.5',
      disabled: 'true',
      pointerEvents: 'none'
    }
    const enableHeaderStyle = {
      opacity: '1',
      disabled: 'false',
      pointerEvents: 'auto'
    }

    const disabledStyleTrans = {
      opacity: this.state.items[0] ? '.5' : '1',
      disabled: this.state.items[0] ? 'true' : 'false',
      pointerEvents: this.state.items[0] ? 'none' : 'auto'
    }



    if (this.state.currentItem !== '') {
      const obj = this.state.items[this.state.currentItemIndex][0];
      const selectedItemStyle = {
        boxShadow: '0 0 6px 0 #613b8c',
        backgroundColor: 'rgba(168, 126, 214, 0.05)',
        border: 'solid 2px #a87ed6'
      };

      let qtyPrice = parseFloat(obj.itemPrice * obj.quantity).toFixed(2);

      var selectedItemObject = (
        <SelectItemCartRenderer
          items={this.state.items[this.state.currentItemIndex][0]}
          currentItemIndex={this.state.currentItemIndex}
          currentItem={this.props.currentItem}
          tax={this.SALES_TAX}
        />
      )
    }
    console.log('card details in sale container'+JSON.stringify(store.getState().Cards))
    itemModifyCategoryContent = {
      'replenishment': (<div className="replenishmentmainDiv">
        {selectedItemObject}
        <div className="replunishmentHeader">Replenishment</div>
        <div className="enterdaystextsection">
          <TextField
            type="text"
            maxLength="3"
            refs="daysValue"
            value={this.state.values.daysValue}
            onChange={this.handleqtyChange.bind(this)}
            inputStyle={textFieldInputStyle}
            style={textFieldStyle}
          ></TextField>
          <ReactTooltip data-class="react-email-tooltip-custom" effect="solid" place="top" className="tooltipCls"></ReactTooltip>
          <div className="daysText">days <img className="infoCls" src={info} alt="iamge" data-tip="Entry should be between 15 and 500.Suggested cycle is 60 days." /></div>

        </div>
        <div className="errorLabelSFF" hidden>Entry should be between 15 and 500</div>
        <div className="replunishtextareaCls">
          <TextField
            placeholder="Enter description"
            multiLine={true}
            style={textFieldStyle}
            maxLength="41"
            inputStyle={textAreaStyle}
            value={this.state.values.description}
            refs="description"
            underlineStyle={underlineStyle}
            value={this.state.values['description']}
            onChange={this.updateDescription.bind(this)}
            rows={4}
            rowsMax={4}
          />
        </div>

        <div className="replishment-footer">
          <button className="cancelbtn" onClick={this.cancelReplenish.bind(this)}>CANCEL</button>
          <button className="okbtn" onClick={this.updateReplenish.bind(this)}>OK</button>
        </div>
      </div>),



      'splitCommission': (<div>
        {selectedItemObject}
        <SaleItemSplitCommissionSFF
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          type_split_commission={this.state.type_split_commission}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          onSubmitshowSplitCommissionModal={this.onSubmitshowSplitCommissionModal}
          showSplitCommissionModal={this.showSplitCommissionModal}
          //pin1Error = {this.state.pin1Error}
          pin2Error={this.state.pin2Error}
          spliterror={this.state.errors}
        />
      </div>),

      'transmodifysplit': (<div>
        <SaleItemSplitCommissionSFF
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          type_split_commission={this.state.type_split_commission}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          onSubmitshowSplitCommissionModal={this.onSubmitshowSplitCommissionModal}
          showSplitCommissionModal={this.showSplitCommissionModal}
          pin2Error={this.state.pin2Error}
          spliterror={this.state.errors}
        />
      </div>),

      'quantity': (<div>
        {selectedItemObject}
        <SaleItemModifyQuantitySFF
          saleitemModifyQuantityUpdate={this.saleitemModifyQuantityUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
        />
      </div>
      ),
      'giftRegistry': (<div>
        {selectedItemObject}
        <SaleItemGiftRegistrySFF
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type="item"

        />
      </div>
      ),
      'removeItemgiftRegistry': (<div>
        {selectedItemObject}
        <SaleItemRemoveGiftRegistrySFF
          giftRegistryCloseModal={this.giftRegistryCloseModal}
          giftRegistryErrorModal={this.state.giftRegistryErrorModal}
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type='item'
          errorModal={true}

        />
      </div>
      ),

      'transgift': (<div>
        <SaleItemGiftRegistrySFF
          giftRegistryCloseModal={this.giftRegistryCloseModal}
          giftRegistryErrorModal={this.state.giftRegistryErrorModal}
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type="trans"

        />
      </div>
      ),
      'removetransgift': (<div>
        {selectedItemObject}
        <SaleItemRemoveGiftRegistrySFF
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type="trans"

        />
      </div>
      ),

      'specialInstructions': (<div>
        {selectedItemObject}
        <ItemModifySpecialInstructionsSFF
          itemModifySpecialInstructionsUpdate={this.itemModifySpecialInstructionsUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          specialInstructionsValue={(this.state.currentItem !== '') ? this.state.items[this.state.currentItemIndex][0].comment[0] : ''}
        />
      </div>
      ),

      'mkdPerc': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Mkd % Off'
          placeholder='Enter % Off'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'mkdDollar': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Mkd $ Off'
          placeholder='Enter $ Off'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'priceOverride': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Price Override'
          placeholder='Enter Ticket Price'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'mkdNewPrice': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Mkd New Price'
          placeholder='Enter Price'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'omniPerc': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Omni Mkd % Off'
          placeholder='Enter % Off'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'omniDollar': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Omni Mkd $ Off'
          placeholder='Enter $ Off'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'omniNewPrice': (<div>
        {selectedItemObject}
        <SaleItemModifyPriceSFF
          optionSelected={this.state.itemModifyCategory}
          title='Price : Omni Mkd New Price'
          placeholder='Enter Price'
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
          itemPromotionDetails={this.state.itemPromotionDetails}
          modifyPrice={this.modifyPrice}
          showManagerApprovalModal={this.showManagerApprovalModal}
          saleItemModifyPriceSFFValue={this.state.saleItemModifyPriceSFFValue} />
      </div>),
      'transgiftRegistry': (<div>
        <SaleItemGiftRegistrySFF
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type='trans'

        />
      </div>
      ),
      'transremoveItemgiftRegistry': (<div>
        <SaleItemRemoveGiftRegistrySFF
          saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type='trans'
          giftRegistryCloseModal={this.giftRegistryCloseModal}
          giftRegistryErrorModal={this.state.giftRegistryErrorModal}
        />
      </div>
      ),

      'TransTaxExempt': (<div>
        <TransTaxExemptSFF
          transTaxExemptUpdate={this.transTaxExemptUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
        />
      </div>
      ),
      'transgiftReceipt': (<div>
        <SaleItemGiftReceiptSFF
          saleitemGiftReceiptUpdate={this.saleitemGiftReceiptUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type='transgiftreceipt'

        />
      </div>
      ),
      'transremovegiftReceipt': (<div>
        <SaleItemRemoveGiftReceiptSFF
          saleitemGiftReceiptUpdate={this.saleitemGiftReceiptUpdate}
          hideItemModifyModalSmallFF={this.hideItemModifyModalSmallFF}
          modify_type='trans'

        />
      </div>
      )
    }

    return (

      <div>
        <div>

          <Modal open={this.state.sku_errorModal} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Item not on Item file</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ sku_errorModal: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>

          <Modal open={this.state.cart_errorModal} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Data entered is not valid.</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ cart_errorModal: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>

          <Modal open={this.state.replenishClientOpen} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Function only valid for client transaction</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ replenishClientOpen: false }) }}>
                <div className="sale-errorModal-button-text">OK</div>
              </button>
            </div>

          </Modal>
          {/*defaul sku not found popp up*/}
          <Modal open={this.state.modal_default_sku_error} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Default SKU not found.
Please use keyword search.</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ modal_default_sku_error: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>
          <Modal open={this.state.TranDiscPriceOverrideFlag} little classNames={{ modal: 'sale-override-Discount' }}
            little showCloseIcon={false}>
            {/*<div className='sale-errorModal-container'>
          <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
          <div className="sale-errorModal-text">Do you want to Override Discount?</div>
          <button className="sale-errorModal-button" onClick={() => { this.setState({ TranDiscPriceOverrideFlag: false }) }}>
            <div className="sale-errorModal-button-text">CLOSE</div>
          </button>
    </div>*/}
            <div className='sale-item-gift-receipt-remove-container'>
              <img src={null} className='sale-override-Discount-icon' />

              <div className='sale-override-Discount-content'>Do you want to Override Discount?
                    </div>
              <div className="sale-override-Discount-buttons-lff">
                <div className='sale-override-Discount-button-cancel' onClick={() => { this.setTransDesc(false); }}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className='sale-trans-discount-cancel-button'>CANCEL</div>
                </div>
                <div className='sale-override-Discount-button'>
                  <div className="sale-override-Discount-ok-button" onClick={() => { this.setTransDesc(true) }}>OK</div>
                </div>
                 </div>
            </div>
          </Modal>


          <Modal open={this.state.sale_errorModal} little classNames={{ modal: 'sale-errorModal' }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Invalid Request</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ sale_errorModal: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>

          <Modal open={this.state.Replenishment_FlagModal} little classNames={{ modal: 'Replenishment-Modal-container' }}
            little showCloseIcon={false}>

            <div className='sale-item-autoreplenishment-flag-container '>

              <img src={ErrorAlertImage} className='sale-item-autoreplenishment-flag-icon' />

              <div className='sale-Autoreplenishment-label'>Flag item for replenishment?</div>

              <div class="SaleAutoreplenishmentbtns" >

                <div className="sale-Autoreplenishment-cancel" onClick={() => { this.setState({ Replenishment_FlagModal: false }) }}>

                  <div className="sale-Autoreplenishment-cancel-btn">NO</div>

                </div>

                <button className="sale-Autoreplenishment-ok" onClick={() => { this.setState({ replishmentOpen: true }) }} >YES</button>

              </div>

            </div>
          </Modal>
          <Modal open={this.state.PreSale_FlagModal} little classNames={{ modal: 'Presale-Modal-container' }}
           little showCloseIcon={false}
           onClose={() => { }} >

            <div className='preSale-flag-container'>

              <img src={preSaleImage} className='preSale-flag-icon' />

              <div className='preSale-label'>Is this Presale ?</div>

              <div class="preSalebtns" >

                <div className="preSale-cancel" onClick={() => {
                  this.setState({ PreSale_FlagModal: false, presaleFlaginCart: false })
                  this.props.presaleInitialRender()
                }}>

                  <div className="preSale-cancel-btn">NO</div>

                </div>

                <button className="preSale-ok"  onClick={this.preSaleYesClick}>YES</button>

              </div>

            </div>
          </Modal>

          {this.state.modal_EmailTracking ?
            <EmailTrackingModal
              openVerifyEmail={() => { this.setState({ modal_EmailTracking: false, modal_VerifyEmail: true }) }}
              openRecipientSender={() => this.setState({ modal_Recipient_Sender: true, modal_EmailTracking: false })}
            />
            :
            null
          }

          {this.state.modal_VerifyEmail ?
            <VerifyEmailModal
              open_recipient_sender={() => { this.setState({ modal_VerifyEmail: false, modal_Recipient_Sender: true }) }}
              close={() => this.setState({ sendOptionSelected: false, modal_VerifyEmail: false })}
            />
            :
            null
          }

          {this.state.modal_Recipient_Sender ?
            <SenderRecipientSameModal
              history={this.props.history}
              goToSendPage={this.props.goToSendPage}
            //customerClienteled={this.props.customerDetails?true:false}
            />
            :
            null
          }


          {this.state.modal_TransTaxExempt ?
            <Modal classNames={{ modal: 'trans-tax-exempt-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <TransTaxExempt
                transTaxExemptUpdate={this.transTaxExemptUpdate}
                showTransTaxExempt={this.showTransTaxExempt} />
            </Modal>
            :
            null
          }

          {this.state.modal_TransDiscount ?
            <TransDiscountModal
              applyTransDiscount={this.applyTransDiscount}
              maxTransDiscountValue={this.state.maxTransDiscountValue}
              done={() => this.setState({ modal_TransDiscount: false, disableOptions: false })}
            />
            :
            null
          }

          {this.state.modal_AssociateDiscount ?
            <AssociateDiscountModal
              applyAssociateDiscount={this.applyAssociateDiscount}
              done={() => this.setState({ modal_AssociateDiscount: false, disableOptions: false })}
            />
            :
            null
          }

          {this.state.modal_sku_modify_quantity ?
            <Modal classNames={{ modal: 'sale-item-modify-quantity-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemModifyQuantity
                saleitemModifyQuantityUpdate={this.saleitemModifyQuantityUpdate}
                item={(this.state.items.length > 0 && this.state.currentItemIndex !== '') ? this.state.items[this.state.currentItemIndex][0] : []}
                showQuantityModal={this.showQuantityModal} />
            </Modal>
            :
            null
          }

          {this.state.modal_sku_modify_special_instructions ?
            <Modal classNames={{ modal: 'item-modify-special-instructions-container' }} open={(sku) => {

            }} onClose={() => {

            }}
              little showCloseIcon={false}>
              <ItemModifySpecialInstructions

                itemModifySpecialInstructionsUpdate={this.itemModifySpecialInstructionsUpdate}
                showSpecialInstructionsModal={this.showSpecialInstructionsModal}
                specialInstructionsValue={(this.state.currentItem !== '') ? this.state.items[this.state.currentItemIndex][0].comment : ''}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_sku ?
            <Modal classNames={{ modal: 'key-sku-modal-container' }} open={(sku) => this.retrieveSku(sku)} onClose={() => this.setState({ modal_sku: true })}
              little showCloseIcon={false}>
              <AddSkuModal
                do={(sku) => this.retrieveSku(sku)}
                skuError={this.state.skuError}
                changeSku={() => this.changeSku()}
                done={() => this.setState({ modal_sku: false })}
                showSelectDept={this.showSelectDept}
                showDeptKeyModal={this.showDeptKeyModal}
                showSelectDeptModal={this.showSelectDeptModal}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_dept_key ?
            <Modal classNames={{ modal: 'dept-key-sku-modal-container deptkey-modals' }} open={() => {

            }}
              onClose={() => {

              }}
              little showCloseIcon={false}>
              <KeyDeptModal
                do={(sku) => this.retrieveSku(sku)}
                done={() => this.setState({ modal_sku: false })}
                showDeptKeyModal={this.showDeptKeyModal}
                showHideSubClassModal={this.showHideSubClassModal}
                setDeptClass={this.setDeptClass}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_subclass ?
            <Modal classNames={{ modal: 'subclass-key-sku-modal-container deptkey-modals' }} open={() => {

            }}
              onClose={() => {

              }}
              little showCloseIcon={false}>
              <Subclass
                do={(sku) => this.retrieveSku(sku)}
                done={() => this.setState({ modal_sku: false })}
                showHideSubClassModal={this.showHideSubClassModal}
                showHideAmountModal={this.showHideAmountModal}
                setSubClass={this.setSubClass}
                getDefaultSKUCall={this.getDefaultSKUCall}
                showHidePjModal={this.showHidePjModal}
                setDefaultSku = {this.setDefaultSku}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_amount ?
            <Modal classNames={{ modal: 'amount-key-sku-modal-container deptkey-modals-amount' }} open={() => {

            }}
              onClose={() => {

              }}
              little showCloseIcon={false}>
              {console.log('deptDetails ' + JSON.stringify(this.deptDetails))}
              <Amount
                do={(sku) => this.retrieveSku(sku)}
                done={() => this.setState({ modal_sku: false })}
                showHideAmountModal={this.showHideAmountModal}
                AddItemtoCartDefault={this.AddItemtoCartDefault}
                setAmount={this.setAmount}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_pj ?
            <Modal classNames={{ modal: 'pj-key-sku-modal-container deptkey-modals' }} open={() => {

            }}
              onClose={() => {

              }}
              little showCloseIcon={false}>
              <PJmodal
                do={(sku) => this.retrieveSku(sku)}
                done={() => this.setState({ modal_sku: false })}
                showHideAmountModal={this.showHideAmountModal}
                AddItemtoCartDefault={this.AddItemtoCartDefault}
                showHidePjModal={this.showHidePjModal}
                setAmount = {this.setAmount}
                setPJnum = {this.setPJnum}
              />
            </Modal>
            :
            null
          }



          {this.state.modal_select_dept ?
            <Modal classNames={{ modal: 'key-sku-modal-container' }} open={(sku) => {

            }} onClose={() => {

            }}
              little showCloseIcon={false}>
              {/* <SelectDeptModal
               showaddskumodal={this.showaddskumodal}
               done={() => this.setState({ modal_select_dept: false })}
              /> */}
            </Modal>
            :
            null
          }

          {this.state.modal_maxitem ?
            <Modal classNames={{ modal: 'max-warning-modal-container' }} open={(sku) => this.retrieveSku(sku)}
              little showCloseIcon={false} >
              <MaxItemCountModal
                done={() => this.setState({ modal_maxitem: false })}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_quantity_info ?
            <Modal classNames={{ modal: 'max-warning-modal-container' }} open={(sku) => { }} 
              little showCloseIcon={false}>
              <QuantityInfoModal
                done={() => this.setState({ modal_quantity_info: false })}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_taxattemptdone ?
            <Modal classNames={{ modal: 'tax-exempt-done-modal-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <TaxAttemptModal
                done={() => this.setState({ modal_taxattemptdone: false })}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_warning ?
            <Modal classNames={{ modal: 'max-warning-modal-container' }} open={(sku) => this.retrieveSku(sku)} onClose={() => { }}
            little showCloseIcon={false}
             >
              <WarningCountModal MAX_ITEM_COUNT={this.WARNING_COUNT} REMAINING_COUNT={this.REMAINING_COUNT} done={() => this.setState({ modal_warning: false })} />
            </Modal>
            :
            null
          }

          {this.state.modal_scanner ?
            <Modal classNames={{ modal: 'scanner-notDocked-modal-container' }} open={() => this.checkForScanner()} onClose={() => this.setState({ modal_scanner: false })} >
              <ScannerNotDockedModal done={() => this.setState({ modal_scanner: false })} />
            </Modal>
            :
            null
          }

          {this.state.replishmentOpen ?
            (<Modal classNames={{ modal: 'replunishment-modal-lff' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemReplenishment showReplenishmentModal={this.showReplenishmentModal}
                updateReplenish={this.updateReplenish}
                getReplenishData={this.getReplenishData}
                values={this.state.values}
                history={this.props.history}

              />
            </Modal>) : (null)
          }

          {this.state.modal_void_line_confirm ?
            (<Modal classNames={{ modal: 'void-line-confirm-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <VoidLineConfirmModal
                showVoidLineConfirmModal={this.showVoidLineConfirmModal}
                item={this.state.voidItem}
                voidLineItem={this.voidLineItem} />
            </Modal>) : (null)
          }

          {(this.state.modal_split_commission) ?
            <Modal classNames={{ modal: 'split-commission-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }} little showCloseIcon={false}>
              
              <SaleItemSplitCommission
                onSubmitshowSplitCommissionModal={this.onSubmitshowSplitCommissionModal}
                type_split_commission={this.state.type_split_commission}
                showSplitCommissionModal={this.showSplitCommissionModal}
                //pin1Error = {this.state.pin1Error}
                pin2Error={this.state.pin2Error}
                spliterror={this.state.errors}



              />
            </Modal>
            :
            null
          }

          {(this.state.modal_price_modify) ? (
            <Modal classNames={{ modal: 'modify-price-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ModifyPriceModal
                title={this.state.modifyPriceModalTitle}
                placeholder={this.state.modifyPriceModalPlaceholder}
                showItemModifyPriceModal={this.showItemModifyPriceModal}
                item={this.state.items[this.state.currentItemIndex][0]}
                itemPromotionDetails={this.state.itemPromotionDetails}
                modifyPrice={this.modifyPrice}
                showManagerApprovalModal={this.showManagerApprovalModal}
              />
            </Modal>

          ) : (null)}

          {(this.state.modal_tax_modify) ? (
            <Modal classNames={{ modal: 'modify-tax-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ModifyTaxModal
                title={this.state.modifyTaxModalTitle}
                placeholder={this.state.modifyTaxModalPlaceholder}
                showItemModifyTaxModal={this.showItemModifyTaxModal}
                item={this.state.items[this.state.currentItemIndex][0]}
                modifyTax={this.modifyTax}
                is_tax_fail={this.state.is_tax_fail}
                setTaxError={this.setTaxError}
              />
            </Modal>

          ) : (null)}

          {this.state.modal_gift_registry ?

            <Modal classNames={{ modal: 'sale-item-gift-registry-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemGiftRegistry
                handleChangedropdownColor={this.handleChangedropdownColor}
                handleChangeTransdropdownColor={this.handleChangeTransdropdownColor}
                isEnabled={this.isEnabled}
                saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
                modify_type={this.state.modify_type}
                showItemGiftRegistryModal={this.showItemGiftRegistryModal} />
            </Modal>
            :
            null
          }

          {this.state.modal_gift_registry_remove ?

            <Modal classNames={{ modal: 'sale-item-gift-registry-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemGiftRegistryRemove
                isEnabled={this.isEnabled}
                modify_type={this.state.modify_type}
                saleitemGiftRegistryUpdate={this.saleitemGiftRegistryUpdate}
                showItemGiftRegistryModal={this.showItemGiftRegistryModal} />
            </Modal>
            :
            null
          }


          {this.state.modal_gift_receipt ?

            <Modal classNames={{ modal: 'sale-item-gift-receipt-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemGiftReceipt
                isEnabled={this.isEnabled}
                saleitemGiftReceiptUpdate={this.saleitemGiftReceiptUpdate}
                showItemGiftReceiptModal={this.showItemGiftReceiptModal}
                modify_type={this.state.modify_type} />
            </Modal>
            :
            null
          }

          {this.state.modal_gift_receipt_remove ?

            <Modal classNames={{ modal: 'sale-item-gift-receipt-container' }} open={(sku) => {

            }} onClose={() => {

            }} little showCloseIcon={false}>
              <SaleItemGiftReceiptRemove
                isEnabled={this.isEnabled}
                modify_type={this.state.modify_type}
                saleitemGiftReceiptUpdate={this.saleitemGiftReceiptUpdate}
                showItemGiftReceiptModal={this.showItemGiftReceiptModal} />
            </Modal>
            :
            null
          }
      {this.state.modal_gift_receiptflag ?
            <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ModifyPriceErrorModal
                errorText="Item already set for selected function"
                showModifyErrorModal={this.showModifyErrorModal}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_manager_approval ?
            <Modal classNames={{ modal: 'manager-approval-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ManagerApprovalModal
                showManagerApprovalModal={this.showManagerApprovalModal}
                validateManagerApproval={this.validateManagerApproval}
                activeModifyPriceOption={this.state.activeModifyPriceOption}
                managerModalErrorMessage={this.state.managerModalErrorMessage}
              />
            </Modal>
            :
            null
          }
          {this.state.modal_modify_price_error ?
            <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ModifyPriceErrorModal
                errorText={this.state.modifyPriceError}
                showModifyErrorModal={this.showModifyErrorModal}
              />
            </Modal>
            :
            null
          }
          {this.state.gifwrapError
            ? (<Modal classNames={{ modal: 'modify-price-error-modal-container' }}
              open={() => { }}
              onClose={() => { }}
            >
              <ModifyPriceErrorModal
                errorText={"No items to Wrap"}
                showModifyErrorModal={() => this.closegiftWrap()}
              />
            </Modal>)
            : ''}

          {this.state.associatetranserrormodal ?
            <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <ModifyPriceErrorModal

                errorText={<div>Ringing associate cannot<br />be purchasing associate.</div>}
                showModifyErrorModal={this.showTransModifyAssociateDiscountErrorModal}
              />
            </Modal>
            :
            null
          }

          {this.state.AssociateDiscountAlreadyAppliedModal ?
            <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
              open={() => {

              }}
              onClose={() => {
                this.setState({ disableOptions: false })
              }}
            >
              <ModifyPriceErrorModal
                errorText={<div>No More Discounts Allowed</div>}
                showModifyErrorModal={this.showModifyErrorModal}
              />
            </Modal>
            :
            null
          }

          {this.state.amount_to_be_entered_modal ?
            <Modal classNames={{ modal: 'amount-to-be-entered-modal-container' }}
              open={() => {

              }}
              onClose={() => {

              }}
            >
              <AmountToBeEnteredModal
                handleamountchange={this.handleamountchange}
                amount_to_be_inserted_modal={this.amount_to_be_inserted_modal}
                modify_amount_on_submit={this.modify_amount_on_submit}
                modified_amount_value={this.state.modified_amount_value} 
              />
            </Modal>
            :
            null
          }
          {this.state.modal_items_handled ?
            <Modal open={this.state.modal_items_handled} little classNames={{ modal: 'modal-items-handled' }} >
              <div className='sale-errorModal-container'>
                <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
                <div className="modal_items_handled_text">There are the items to be handled for {this.state.SendsMessage},{this.state.AlterationsMessage},{this.state.GiftWrap_Message}</div>

                <div className="modal_items_handled-return">
                  <div className="modal_items_handled-return-btn" onClick={() => { this.setState({ modal_items_handled: false }) }}>RETURN</div>
                  <button className="modal_items_handled-ok"  type="submit" onClick={() => this.props.history.push('/payment', this.props.history.location.state ? { isClienteled: this.props.history.location.state.isClienteled } : { isClienteled: true })}>OK</button>
                </div>
              </div>

            </Modal>
            :
            null
          }
          {this.state.modal_item_price_notfound_handled ?
            <Modal open={this.state.modal_item_price_notfound_handled} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
              little showCloseIcon={false}>
              <div className='sale-errorModal-container'>
                <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
                <div className="sale-errorModal-text">{this.state.itemNotFound.map(function (item, index) {
                  return <span>{item},</span>
                })}
                  these items were not added to cart</div>
                <button className="sale-errorModal-button" onClick={() => { this.setState({ modal_item_price_notfound_handled: false }) }}>
                  <div className="sale-errorModal-button-text">CLOSE</div>
                </button>
              </div>

            </Modal>
            :
            null
          }
{this.state.tenderingCard ?
  <Modal classNames={{ modal: 'confirm-card-details-container' }}
    open={() => {

    }}
    onClose={() => {

    }}
    showCloseIcon={false}
  >
    <CardDetailsModal
      setUseStoredCard = {this.setUseStoredCard}
      opentenderingCard={this.opentenderingCard}
      closetenderingCard={this.closetenderingCard}
      navigateToPayment = {this.navigateToPayment}
    />
  </Modal>
  :
  null
}




          



        </div>

        <div className="sale-container">
          <SaleMenu disable={disabledStyle}
            selectedItem={this.props.selectedItem}
            disabledStyleTrans={disabledStyleTrans}
            registryCLickStyle={this.state.registryCLickStyle}
            CLickStyle={this.state.CLickStyle}
            handleChangedropdownColor={this.handleChangedropdownColor}
            handleChangeTransdropdownColor={this.handleChangeTransdropdownColor}
            changeSelectMenu={this.changeMkdPercSelMenu}
            onRef={ref => (this.SaleMenu = ref)}
            history={this.props.history}
            currentItem={this.state.currentItemIndex}
            voidLineItem={this.voidLineItem}
            items={this.state.items}
            disableGiftReceipt={this.state.modify_type == 'trans' ? this.state.disableTransGiftReceipt : this.state.disableGiftReceipt}
            showEmailTrackingModal={(bool) => this.setState({ modal_EmailTracking: bool })}
            emailTrackingInfo={this.props.emailTrackingInfo}
            showQuantityModal={this.showQuantityModal}
            showItemGiftRegistryModal={this.showItemGiftRegistryModal}
            showItemGiftReceiptModal={this.showItemGiftReceiptModal}
            showVoidLineConfirmModal={this.showVoidLineConfirmModal}
            showReplenishmentModal={this.showReplenishmentModal}
            showGiftRegistryModal={this.showGiftRegistryModal}
            showItemModifyModalSmallFF={this.showItemModifyModalSmallFF}
            showSplitCommissionModal={this.showSplitCommissionModal}
            splitCommissionOpened={() => this.splitCommissionOpened('transmodifysplit')}
            transGiftRegistry={() => this.transGiftRegistry('transregistry')}
            transGiftReceipt={() => this.transGiftReceipt('transregistry')}
            showItemModifyPriceModal={this.showItemModifyPriceModal}
            showItemModifyTaxModal={this.showItemModifyTaxModal}
            loadPriceDrpDown={this.loadPriceDrpDown}
            loadTaxDrpDown={this.loadTaxDrpDown}
            showTransDiscount={() => {
              if (this.state.tranDiscAppliedFlag === false) {
                this.setState({ modal_TransDiscount: true })
              }
              else {
                this.showManagerApprovalModal(true, '', 'TransDiscountAlreadyApplied')
              }
            }}
            showAssociateDiscount={() => {
              console.log(this.props.cart);
              console.log(this.state.items);
              if (this.props.cart.data.cartItems.associateDiscount !== null && this.props.cart.data.cartItems.associateDiscount !== undefined && this.props.cart.data.cartItems.associateDiscount !== {}) {
                this.setState({ AssociateDiscountAlreadyAppliedModal: true })
              }
              else {
                this.setState({ modal_AssociateDiscount: true })
              }
            }}
            showSpecialInstructionsModal={this.showSpecialInstructionsModal}
            disableOptionsMenu={() => { this.setState({ disableOptions: true }) }}
            activeTransModify={activeTransModify}
            active={true}
            isItemSelected={this.state.isItemSelected}
            itemPromotionDetails={this.state.itemPromotionDetails}
            TransTaxExempt={() => this.TransTaxExempt()}
            tax={this.SALES_TAX}
            showModifyErrorModal={this.showModifyErrorModal}
            isSendOptionSelected={this.state.sendOptionSelected}
            setSendOptionSelected={(bool) => { this.setState({ sendOptionSelected: bool }) }}
            nonSkuSelection={this.props.nonSkuSelection}
            showGiftWrapError={() => { this.setState({ gifwrapError: true }) }}
          />

          <div className="item-content">
            <SaleKeypad
              disabled={this.state.disableOptions}
              disableHeaderOptions={this.state.disableHeaderOptions}
              enableHeaderStyle={enableHeaderStyle}
              disabledHeaderStyle={disabledHeaderStyle}
              openModal={() => this.setState({ modal_sku: true, skuError: '' })}
              navigateToProductSearch={this.navigateToProductSearch}
              openCameraScanner={this.openCameraScanner}
            />
            {/* NEED TO PASS PROPS WITH PROPER RESPONSE PARAM */}
            <div className="sale-content-container-outer">
              <SaleContent
                curItem={this.currentItem}
                showItemGiftReceiptModal={this.showItemGiftReceiptModal}
                tax={this.SALES_TAX}
                items={this.state.items}
                voidLineItem={this.voidLineItem}
                sendGiftReceipt={this.sendGiftReceipt}
                currentItem={this.state.currentItem}
                setCurrentItem={this.setCurrentItem}
                showVoidLineConfirmModal={this.showVoidLineConfirmModal}
                getSelectedItem={this.getSelectedItem}
                scrollCheck={this.state.scrollCheck}
                autoreplenishflag={this.state.autoreplenishflag}
                getisellFlagDisplayObject={this.state.getisellFlagDisplayObject}
                GetisellFlag={this.state.GetisellFlag}
                gp={this.state.gp}
              />
            </div>
            <div className="sale-footer-container-outer" style={disabledStyle}>
              <SaleFooter
                tenderingCard = {this.state.tenderingCard}
                lookupPath = {this.props.cards.path}
                opentenderingCard = {this.opentenderingCard}
                tax={this.SALES_TAX}
                total={this.state.total}
                subTotal={this.state.subTotal}
                totalTax={this.state.taxTotal}
                history={this.props.history}
                taxExemptID={this.state.taxExemptID}
                cartExist={(this.state.items.length > 0) ? true : false}
                navigateToPayment={this.navigateToPayment}
                checkForItems={this.checkItemAvailable()}
              />
            </div>
            <div className="sale-sff-item-modify-container">
              {itemModifyCategoryContent[this.state.itemModifyCategory]}
            </div>
          </div> {/* SALE CONTENT */}
        </div> {/* SALE CONTAINER */}

      </div>

    )
  }
};

function mapStateToProps(state) {
  console.log('@@@@@@@@@  SALE CAONTAINER **********', state)
  return {
    selectedItem: state.selectedItems,
    cards:state.Cards,
    cart: state.cart,
    transactionId: getTransactionId(state),
    login: state.login,
    isClienteled: state.clienteled,
    nonSkuSelection: state.nonSkuSelection,
    emailTrackingInfo:state.emailTrackingInfo,
    registerInfo:state.home.registerInfoData,
    spinner:state.spinner,
    registerInfo:state.home.registerInfoData,
    customerDetails:state.customerDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemsRequestInvoker: addItemsRequest,
      voidLineItemInvoker: voidLineItemAction,
      MKDDiscountsActionInvoker: priceActions,
      presaleInitialRender: presaleInitialRender,
      saleitemModifyQuantityUpdateInvoker: saleitemModifyQuantityUpdate,
      saleitemGiftRegistryUpdateInvoker: saleitemGiftRegistryUpdate,
      saleitemGiftReceiptUpdateInvoker: saleitemGiftReceiptUpdate,
      itemModifySpecialInstructionsUpdateInvoker: itemModifySpecialInstructionsUpdate,
      transTaxExemptUpdateInvoker: transTaxExemptUpdate,
      updateReplishmentDataInvoker: updateReplishmentData,
      getReplenishDataInvoker: getReplenishment,
      updateSplitCommisssionInvoker: updateSplitCommissionData,
      setCurrnetItemInvoker: setCurrnetItem,
      getDefaultSKUInvoker: getDefaultSKU,
      startSpinner: startSpinner,
      applyTransDiscountToCart,
      applyAssociateDiscountToCart,
      getPromotionsInvoker: getPromotionsAction,
      modifyPriceInvoker: modifyPriceAction,
      modifyTaxAuthInvoker: modifyTaxAuthAction,
      modifyTaxInvoker: modifyTaxAction,
      itemSelectedAction,
      productSearchAction,
      /*getCardsList:getCardsList,
      navigateToLookupOptions:navigateToLookupOptions,*/
      productImgSearchAction,
      goToSendPage,
      validateManagerPinActionInvoker : validateManagerPinAction,
      useStoredCardFlag:useStoredCard,
      clearTenderingFlag:clearTendering
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleContainer);

