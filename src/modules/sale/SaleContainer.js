
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
import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrnetItem, priceActions, addItemsRequest, addItemsSuccess, addItemsFailure, voidLineItemAction, applyTransDiscountToCart, applyAssociateDiscountToCart, getPromotionsAction, modifyPriceAction } from './SalesCartAction';
import {goToSendPage} from './SaleAction';
import { itemSelectedAction } from '../common/cartRenderer/actions';
import { getTransactionId } from '../home/HomeSelector';
import { SaleItemReplenishment } from './sale-item-replenishment/sale-item-replishment';
import { AddSkuModal, SearchModal, MaxItemCountModal, WarningCountModal, ScannerNotDockedModal, VoidLineConfirmModal, ModifyPriceModal, TaxAttemptModal, ManagerApprovalModal, ModifyPriceErrorModal } from './modal-component/modalComponent';
import TransDiscountModal from './transModifiy/transDiscount/transDiscount';

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
import {productSearchAction} from '../product-search/ProductSearchAction';
// import { SelectDeptModal } from './modal-component/modalComponent';


import './sale-container.css';

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
      userPin1: '',
      userPin2: '',
      items: [],
      currentPopup: '',
      modify_type: '',
      modal_TransDiscount: false,
      modal_AssociateDiscount: false,
      modal_sku: false,
      modal_select_dept: false,
      modal_search: false,
      modal_scanner: false,
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
      modal_gift_receipt: false,
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
      modal_taxattemptdone: false,
      modal_Recipient_Sender: false,
      modifyPriceModalTitle: 'Price : Mkd % Off',
      modifyPriceModalPlaceholder: 'Enter % Off',
      scannerPresent: false,
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
      associatetranserrormodal:false,
      
    }

    this.SALES_TAX = .08000;
    this.saleCartJson = require("../../resources/stubs/sale-cart-items.json");
    this.MAX_ITEM_COUNT =this.saleCartJson.MAX_ITEM_COUNT;
    this.WARNING_COUNT=this.saleCartJson.WARNING_COUNT;
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
  componentDidMount() {
    console.log("COMP DID MOUNT SALECONTAINER: ", this.props);
    const { cartItems, subTotal, totalTax, total, transactionId } = this.props.cart.data
    //if we have nothing showing and there are items in cart - rerender
    if (this.state.cartIsShowingItems === false && this.props.cart.data.cartItems.items[0]) {
      this.setState({
        items: cartItems.items,
        subTotal,
        totalTax,
        total,
        transactionId
      });
    }
    else {
      this.setState({ transactionId: this.props.transactionId })
    }

    if(this.props.cart.getISellData !== '') {
      var skuId = this.props.cart.getISellData.itemDetailsList[0].pimSkuId;
      this.retrieveSku(skuId);
    }
  }

  componentWillReceiveProps(nextProps) {
    
    console.log('nextPropsinsidesalecontainer',nextProps);
    this.setState({scrollCheck:false });
    //do we need product images
    if(nextProps.cart.dataFrom === 'UPDATE_IMAGES') {
      this.props.productImgSearchAction(nextProps.cart.productImages.imageUrls);
    }
    //check for transaction id in redux
    if (nextProps.cart.dataFrom !== 'WEB_SERVICE_ERROR' && nextProps.cart.dataFrom!=='RP_FAIL' && nextProps.cart.dataFrom!=='REPLENISH_FAIL') {

      if (nextProps.cart.data.transactionId) {
        this.setState({ transactionId: nextProps.cart.data.transactionId });
      }
      //added as a work around for special instructions
      else if (nextProps.cart.data.data.transactionId) {
        this.setState({ transactionId: nextProps.cart.data.data.transactionId });
      }
      else {
        this.setState({ transactionId: '1249' })
      }
    }
    else{
      this.setState({sale_errorModal:true})
    }

    //update only if adding item or applying Discount.. may need to add to condition for other things
    if (nextProps.cart.dataFrom === 'ADD_ITEM' || nextProps.cart.dataFrom === 'Discount' 
        || nextProps.cart.dataFrom === 'MODIFY_SPECIAL_INSTRUCTIONS_UPDATE' || nextProps.cart.dataFrom === 'GIFT_WRAP' ||  nextProps.cart.dataFrom === 'UPDATED_IMAGES') {
      this.props.startSpinner(false);
      //cartIsShowingItems is used as one of factors to rerenderCart when component is unmounted
      this.setState({ cartIsShowingItems: true, scrollCheck: true });
      //this.setState({disableOptions:true});
      var itemArrayLength = 0;
      for (var i = 0; i < this.state.items.length; ++i) {
        if (this.state.items[i][0].quantity > 0) {
          itemArrayLength++;
        }
      }
      if (itemArrayLength < this.MAX_ITEM_COUNT) {
        if (itemArrayLength === this.MAX_ITEM_COUNT - (this.WARNING_COUNT)) {
          this.setState({
            items: nextProps.cart.data.cartItems.items,
            subTotal: nextProps.cart.data.subTotal,
            taxTotal: nextProps.cart.data.totalTax,
            total: nextProps.cart.data.total,
            modal_sku: false, modal_warning: true
          });
        } else {
          let { subTotal, totalTax, total } = nextProps.cart.data;
          this.setState({
            items: nextProps.cart.data.cartItems.items,
            subTotal: nextProps.cart.data.subTotal,
            taxTotal: nextProps.cart.data.totalTax,
            total: nextProps.cart.data.total,
          });
        }
      } else {
        this.setState({ modal_sku: false, modal_maxitem: true });
      }
    }
    else if (nextProps.cart.dataFrom === 'LINE_VOID') {
      this.props.startSpinner(false);
      var newItemArray = nextProps.cart.data.cartItems.items;
      /* for (var i = 0; i < this.state.items.length; ++i) {
        if (this.state.items[i][0].lineNumber !== nextProps.cart.data.cartItems.items[0].lineNumber) {
          var tempItemObject = Object.assign({}, this.state.items[i][0]);
          newItemArray.push(tempItemObject);
        }
        else {
          var tempItemObject = Object.assign({}, this.state.items[i][0]);
          tempItemObject.quantity = 0;
          newItemArray.push(tempItemObject);
        }
      } */

      newItemArray = salesCartReformater(newItemArray);
      this.setState({
        items: newItemArray,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,
        currentItem: '',
        currentItemIndex: ''
      });
    }
    
    else if (nextProps.cart.dataFrom === 'QUANTITY_UPDATE') {
      this.props.startSpinner(false);
      var newItemArray = nextProps.cart.data.data.cartItems.items;
      /* for (var i = 0; i < this.state.items.length; ++i) {
        if (this.state.items[i][0].lineNumber !== nextProps.cart.data.data.cartItems.items[0].lineNumber) {
          var tempItemObject = Object.assign({}, this.state.items[i][0]);
          tempItemObject.quantity = nextProps.cart.data.data.cartItems.items[i][0].quantity;
          tempItemObject.itemsPrice = nextProps.cart.data.data.cartItems.items[i][0].itemsPrice;
          tempItemObject.itemsTax = nextProps.cart.data.data.cartItems.items[i][0].itemsTax;
          ;

          newItemArray.push(tempItemObject);
        }
        else {
          var tempItemObject = Object.assign({}, this.state.items[i][0]);
          tempItemObject.quantity = nextProps.cart.data.data.cartItems.items[0].quantity;
          newItemArray.push(tempItemObject);
        }
      } */
      newItemArray = salesCartReformater(newItemArray);
      this.setState({
        items: newItemArray,
        subTotal: nextProps.cart.data.data.subTotal,
        taxTotal: nextProps.cart.data.data.totalTax,
        total: nextProps.cart.data.data.total
      });
    }

    else if (nextProps.cart.dataFrom === 'GIFT_REGISTRY_UPDATE') {
      this.props.startSpinner(false);

      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total

      });

    }
    else if (nextProps.cart.dataFrom === 'TRANS_TAX_EXEMPT_REQUEST_UPDATE') {
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
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total,

      });
    }


    else if (nextProps.cart.dataFrom === 'WEB_SERVICE_ERROR') {
      this.props.startSpinner(false);
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
      if (window.innerWidth > 1900) {
        this.setState({
          items: nextProps.cart.data.data.cartItems.items,
          modal_split_commission: false
        });
      } else {
        this.setState({ items: nextProps.cart.data.data.cartItems.items });
        this.hideItemModifyModalSmallFF()
      }
    }
    else if (nextProps.cart.dataFrom === "SPLIT_COMM_ERROR") {
      this.setState({ pin2Error: nextProps.cart.pin2Error });
    }
    else if (nextProps.cart.dataFrom === "GET_PROMOTIONS_SUCCESS") {
      this.props.startSpinner(false);
      this.setState({ itemPromotionDetails: nextProps.cart.itemPromotionDetails });
    }
    else if (nextProps.cart.dataFrom === "GET_PROMOTIONS_FAILURE") {
      this.props.startSpinner(false);
    }
    else if (nextProps.cart.dataFrom === "MODIFY_PRICE_SUCCESS") {
      this.props.startSpinner(false);
      this.setState({
        items: nextProps.cart.data.cartItems.items,
        subTotal: nextProps.cart.data.subTotal,
        taxTotal: nextProps.cart.data.totalTax,
        total: nextProps.cart.data.total
      });
    }
    else if (nextProps.cart.dataFrom == 'IM_RINGINGASSOCIATE') {
     
      this.props.startSpinner(false);
     // if(nextProps.cart.isInvalid == true){
       
        this.showTransModifyAssociateDiscountErrorModal(true,'');
  
     // }
    }


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

  retrieveSku(sku) {
  
    if (!sku) {
      return;
    }
    else {
      var transactionId = this.state.transactionId;
      this.props.startSpinner(true);
      this.props.addItemsRequestInvoker({
        "ItemNumber": sku.toString(),
        "TransactionId": transactionId
      });
    }

    this.setState({ modal_sku: false }); // dismisses modal after submitting sku

  }

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
    this.props.startSpinner(true);
    this.props.voidLineItemInvoker(item, this.state.transactionId);
  }

  sendGiftReceipt = (item) => {

  }

  setCurrentItem = (itemNumber, itemPrice, itemSku, selectedItem, index) => {
    console.log("INDEX", index)
    console.log("selectedItem", selectedItem)
    this.setState({ scrollCheck: false })
    //store in redux
    this.props.itemSelectedAction(selectedItem)
    if (index !== '' || selectedItem !== '') {
      this.props.startSpinner(true);
      this.props.getPromotionsInvoker(this.state.transactionId, this.state.items[index][0]);
      this.setState({ currentItemNumber: itemNumber, currentItemPrice: itemPrice, currentItemSku: itemSku, currentItem: selectedItem, currentItemIndex: index });
    }
    else {
      this.setState({ currentItemNumber: itemNumber, currentItemPrice: itemPrice, currentItemSku: itemSku, currentItem: selectedItem, currentItemIndex: index, itemPromotionDetails: {} });
    }


  }

  getSelectedItem = (isSelected, selectedItem) => {
    this.setState({ isItemSelected: isSelected });
  }

  saleitemModifyQuantityUpdate = (quantity) => {
    this.props.startSpinner(true);
    this.props.saleitemModifyQuantityUpdateInvoker(this.state.items[this.state.currentItemIndex][0], this.state.transactionId, quantity);
    if (window.innerWidth < 1900) {
      this.hideItemModifyModalSmallFF();
    }
    else {
      this.handleChangedropdownColor("");
    }
  }

  saleitemGiftRegistryUpdate = (gift, modify_type) => {
    this.props.startSpinner(true);
    this.props.saleitemGiftRegistryUpdateInvoker(modify_type == 'item' ? this.state.items[this.state.currentItemIndex][0] : '', this.state.transactionId, gift, modify_type);

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
    this.props.saleitemGiftReceiptUpdateInvoker(modify_type == 'item' ? this.state.items[this.state.currentItemIndex] : '', this.state.transactionId, modify_type);

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
  showaddskumodal =() =>{
    this.setState({ modal_select_dept: false });
    this.setState({ modal_sku: true });
  }

  showItemGiftRegistryModal = (showFlag, type) => {
    this.setState({ modify_type: type })
    if (type == 'IteamRegistry') {
      var checkGift = this.state.items[this.state.currentItemIndex][0].gift_reg;
      if (checkGift === '' || checkGift == 0 || checkGift == null) {
        this.setState({ modal_gift_registry: showFlag });
      }
      else {
        this.setState({ modal_gift_registry_remove: showFlag });
      }


    }
    else if (type == 'trans') {
      var isTransGiftRegEmpty;
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].gift_reg && this.state.items[i][0].gift_reg != 0) {
          //isTransGiftRegFilled =true;
        }
        else {
          isTransGiftRegEmpty = true;
        }
      }
      //isTransGiftRegEmpty = false;
      if (!isTransGiftRegEmpty) {
        this.setState({ modal_gift_registry_remove: showFlag });
      }
      else {
        1
        this.setState({ modal_gift_registry: showFlag });

      }
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
      for (var i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i][0].print_GWGR_Msg && this.state.items[i][0].print_GWGR_Msg != 0) {
        }
        else {
          isTransGiftRegEmpty = true;
        }
      }
      //isTransGiftRegEmpty = false;
      if (!isTransGiftRegEmpty) {
        this.setState({ modal_gift_receipt_remove: showFlag });
      }
      else {
        this.setState({ modal_gift_receipt: showFlag });

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

    if (window.innerWidth > 1080) {
      this.setState({ replishmentOpen: showFlag });
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
    this.setState({ modal_TransDiscount: false, disableOptions: false });
    this.props.startSpinner(true);
    this.props.applyTransDiscountToCart(percentage, this.state.transactionId);
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
    if (this.props.currentItem !== '' && this.state.taxExemptID === '') {

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
    this.props.updateReplishmentDataInvoker(daysValue, description, this.state.items[this.state.currentItemIndex], this.state.transactionId);
    this.cancelReplenish();
  }

  getReplenishData = () => {

    this.props.getReplenishDataInvoker(this.state.items[this.state.currentItemIndex][0]);
  }

  isEnabled = (data) => {
  }

  showItemModifyModalSmallFF = (calledFrom) => {
    this.setState({ disableHeaderOptions: true });
    if (calledFrom === 'replenishment') {
      this.props.getReplenishDataInvoker(this.state.items[this.state.currentItemIndex][0]);
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
    if (showFlag) {
      this.setState({ modal_split_commission: showFlag });
      this.setState({ type_split_commission: calledfrom });

    }
    else {
      this.setState({ modal_split_commission: showFlag });
      this.setState({ type_split_commission: calledfrom });
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

  modifyPrice = (modifyValue, calledFrom) => {
    if (window.innerWidth > 1900) {
      this.showItemModifyPriceModal(false, '', '');
    }
    else {
      this.setState({ saleItemModifyPriceSFFValue: '' });
      this.hideItemModifyModalSmallFF();
    }
    this.props.startSpinner(true);
    this.props.modifyPriceInvoker(this.state.transactionId, this.state.items[this.state.currentItemIndex][0], modifyValue, this.state.managerPin, calledFrom);
  }

  showManagerApprovalModal = (showFlag, fieldValue, calledFrom) => {
    this.setState({ modal_manager_approval: showFlag, activeModifyPriceOption: calledFrom, modifyPriceFieldValue: fieldValue });
  }

  validateManagerApproval = (managerPin) => {
    console.log('validateManagerApproval');
    this.setState({ managerPin: managerPin });
    this.showManagerApprovalModal(false, this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption)
    this.modifyPrice(this.state.modifyPriceFieldValue, this.state.activeModifyPriceOption);
  }

  showModifyErrorModal = (showFlag, errorText) => {
    this.setState({ modal_modify_price_error: showFlag, modifyPriceError: errorText });
  }

  showTransModifyAssociateDiscountErrorModal = (showFlag,val) => {
   
    this.setState({ associatetranserrormodal: showFlag });
  }

  render() {



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

          <Modal open={this.state.sale_errorModal} little classNames={{ modal: 'sale-errorModal' }} >
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Invalid SKU/Department</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ sale_errorModal: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
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
              customerInfo={this.props.customerInfo}
              open_recipient_sender={() => { this.setState({ modal_VerifyEmail: false, modal_Recipient_Sender: true }) }}
              close={() => this.setState({ sendOptionSelected: false, modal_VerifyEmail: false })}
            />
            :
            null
          }

          {this.state.modal_Recipient_Sender ?
            <SenderRecipientSameModal 
              history = {this.props.history}
              goToSendPage = {this.props.goToSendPage}
            />
            :
            null
          }


          {this.state.modal_TransTaxExempt ?
            <Modal classNames={{ modal: 'trans-tax-exempt-container' }} open={(sku) => {

            }} onClose={() => {

            }}>
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

            }}>
              <SaleItemModifyQuantity
                saleitemModifyQuantityUpdate={this.saleitemModifyQuantityUpdate}
                showQuantityModal={this.showQuantityModal} />
            </Modal>
            :
            null
          }

          {this.state.modal_sku_modify_special_instructions ?
            <Modal classNames={{ modal: 'item-modify-special-instructions-container' }} open={(sku) => {

            }} onClose={() => {

            }}>
              <ItemModifySpecialInstructions

                itemModifySpecialInstructionsUpdate={this.itemModifySpecialInstructionsUpdate}
                showSpecialInstructionsModal={this.showSpecialInstructionsModal}
                specialInstructionsValue={(this.state.currentItem !== '') ? this.state.items[this.state.currentItemIndex][0].comment[0] : ''}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_sku ?
            <Modal classNames={{ modal: 'key-sku-modal-container' }} open={(sku) => this.retrieveSku(sku)} onClose={() => this.setState({ modal_sku: false })}>
              <AddSkuModal
                do={(sku) => this.retrieveSku(sku)}
                done={() => this.setState({ modal_sku: false })}
                showSelectDept={this.showSelectDept}
                showSelectDeptModal={this.showSelectDeptModal}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_select_dept ?
            <Modal classNames={{ modal: 'key-sku-modal-container' }} open={(sku) => {

            }} onClose={() => {

            }}>
              {/* <SelectDeptModal
               showaddskumodal={this.showaddskumodal}
               done={() => this.setState({ modal_select_dept: false })}
              /> */}
            </Modal>
            :
            null
          }

          {this.state.modal_maxitem ?
            <Modal classNames={{ modal: 'max-warning-modal-container' }} open={(sku) => this.retrieveSku(sku)} >
              <MaxItemCountModal
                done={() => this.setState({ modal_maxitem: false })}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_taxattemptdone ?
            <Modal classNames={{ modal: 'tax-exempt-done-modal-container' }} open={(sku) => {

            }} onClose={() => {

            }}>
              <TaxAttemptModal
                done={() => this.setState({ modal_taxattemptdone: false })}
              />
            </Modal>
            :
            null
          }

          {this.state.modal_warning ?
            <Modal classNames={{ modal: 'max-warning-modal-container' }} open={(sku) => this.retrieveSku(sku)} onClose={() => {}} >
              <WarningCountModal done={() => this.setState({ modal_warning: false })} />
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

            }}>
              <SaleItemReplenishment showReplenishmentModal={this.showReplenishmentModal}
                updateReplenish={this.updateReplenish}
                getReplenishData={this.getReplenishData}
                values={this.state.values}
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

              }}
            >
              <SaleItemSplitCommission
                onSubmitshowSplitCommissionModal={this.onSubmitshowSplitCommissionModal}
                type_split_commission={this.state.type_split_commission}
                showSplitCommissionModal={this.showSplitCommissionModal}
                //pin1Error = {this.state.pin1Error}
                pin2Error={this.state.pin2Error}


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

          {this.state.modal_gift_registry ?

            <Modal classNames={{ modal: 'sale-item-gift-registry-container' }} open={(sku) => {

            }} onClose={() => {

            }}>
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

            }}>
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

            }}>
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

            }}>
              <SaleItemGiftReceiptRemove
                isEnabled={this.isEnabled}
                modify_type={this.state.modify_type}
                saleitemGiftReceiptUpdate={this.saleitemGiftReceiptUpdate}
                showItemGiftReceiptModal={this.showItemGiftReceiptModal} />
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

          
          {this.state.associatetranserrormodal ?
             <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
             open={() => {

             }}
             onClose={() => {

             }}
           >
              <ModifyPriceErrorModal
             
                errorText={<div>Ringing associate cannot<br/>be purchasing associate.</div>}
                showModifyErrorModal = {this.showTransModifyAssociateDiscountErrorModal}
              />
            </Modal>
            :
            null
          }

        </div>

        <div className="sale-container">
          <SaleMenu disable={disabledStyle}
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
            showEmailTrackingModal={(bool) => this.setState({ modal_EmailTracking: bool })}
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
            showTransDiscount={() => this.setState({ modal_TransDiscount: true })}
            showAssociateDiscount={() => this.setState({ modal_AssociateDiscount: true })}
            showSpecialInstructionsModal={this.showSpecialInstructionsModal}
            disableOptionsMenu={() => { this.setState({ disableOptions: true }) }}
            active={this.state.currentItem || this.state.cartIsShowingItems == false ? false : true}
            isItemSelected={this.state.isItemSelected}
            itemPromotionDetails={this.state.itemPromotionDetails}
            TransTaxExempt={() => this.TransTaxExempt()}
            tax={this.SALES_TAX}
            showModifyErrorModal={this.showModifyErrorModal}
            isSendOptionSelected={this.state.sendOptionSelected}
            setSendOptionSelected={(bool) => { this.setState({ sendOptionSelected: bool }) }}
          />

          <div className="item-content">
            <SaleKeypad
              disabled={this.state.disableOptions}
              disableHeaderOptions={this.state.disableHeaderOptions}
              enableHeaderStyle={this.state.enableHeaderStyle}
              disabledHeaderStyle={disabledHeaderStyle}
              openModal={() => this.setState({ modal_sku: true })}
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
              />
            </div>
            <div className="sale-footer-container-outer" style={disabledStyle}>
              <SaleFooter
                tax={this.SALES_TAX}
                total={this.state.total}
                subTotal={this.state.subTotal}
                totalTax={this.state.taxTotal}
                history={this.props.history}
                taxExemptID={this.state.taxExemptID}
                cartExist={(this.state.items.length > 0) ? true : false}

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
  return {
    cart: state.cart,
    customerInfo: state.customerSearch,
    transactionId: getTransactionId(state),
    login: state.login,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemsRequestInvoker: addItemsRequest,
      voidLineItemInvoker: voidLineItemAction,
      MKDDiscountsActionInvoker: priceActions,
      saleitemModifyQuantityUpdateInvoker: saleitemModifyQuantityUpdate,
      saleitemGiftRegistryUpdateInvoker: saleitemGiftRegistryUpdate,
      saleitemGiftReceiptUpdateInvoker: saleitemGiftReceiptUpdate,
      itemModifySpecialInstructionsUpdateInvoker: itemModifySpecialInstructionsUpdate,
      transTaxExemptUpdateInvoker: transTaxExemptUpdate,
      updateReplishmentDataInvoker: updateReplishmentData,
      getReplenishDataInvoker: getReplenishment,
      updateSplitCommisssionInvoker: updateSplitCommissionData,
      setCurrnetItemInvoker: setCurrnetItem,
      startSpinner: startSpinner,
      applyTransDiscountToCart,
      applyAssociateDiscountToCart,
      getPromotionsInvoker: getPromotionsAction,
      modifyPriceInvoker: modifyPriceAction,
      itemSelectedAction,
      productSearchAction,
      productImgSearchAction,
      goToSendPage,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleContainer);

