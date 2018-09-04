import React, { Component } from 'react';
import ServicesHeader from '../services-common/ServicesHeader';
import GiftWrapContent from './GiftWrapContent';
// import GiftWrapOptions from './GiftWrapOptions';
import ServicesFooter from '../services-common/ServicesFooter';
import Modal from 'react-responsive-modal';
import { GiftWrapOptionsModal, MessagePromptModal, GiftWrapMessageModal } from '../services-common/ServicesModals';

import Header from '../../../common/header/header';
import Footer from '../../../common/footer/footer';
import { store } from '../../../../store/store';
import SaleHeader from '../../SaleHeader';

import './GiftWrap.css';
import backArrow from '../../../../resources/images/Back.svg';
import imageNotAvailable from '../../../../resources/images/Image_placeholder.svg';
import warningIcon from '../../../../resources/images/Warning.svg';
import defaultImage from '../../../../resources/images/giftWrap01_04.jpg';
import giftWrap04Img from '../../../../resources/images/giftWrap04_04.jpg';
import giftWrap05Img from '../../../../resources/images/giftWrap05_04.jpg';
import giftWrap06Img from '../../../../resources/images/giftWrap06_04.jpg';
import giftWrap08Img from '../../../../resources/images/giftWrap08_04.jpg';
import giftWrap09Img from '../../../../resources/images/giftWrap09_04.jpg';
import giftWrap10Img from '../../../../resources/images/giftWrap10_04.jpg';
import purpleCross from '../../../../resources/images/Close_Bttn_Purple.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { itemSelectedAction } from '../../../common/cartRenderer/actions'
import { getGiftWrap, addToGiftWrap, clearGiftWraps } from './GiftWrapActions';
import { startSpinner } from '../../../common/loading/spinnerAction';
import { setCurrnetItem } from '../../SalesCartAction';
import CartRenderer from '../../../common/cartRenderer/cartRenderer';

import { pluck, indexOf } from 'underscore';

class GiftWrap extends Component {
  constructor(props) {
    super(props);
    //giftWrap Defaul Images
    this.defaultImages = {};
    this.defaultImages[0] = defaultImage; this.defaultImages[1] = imageNotAvailable; this.defaultImages[2] = imageNotAvailable; this.defaultImages[3] = giftWrap08Img; this.defaultImages[4] = giftWrap05Img;
    this.defaultImages[5] = giftWrap06Img; this.defaultImages[6] = giftWrap04Img; this.defaultImages[7] = giftWrap09Img; this.defaultImages[8] = giftWrap10Img; this.defaultImages[9] = imageNotAvailable;
    this.defaultImages[10] = imageNotAvailable; this.defaultImages[11] = imageNotAvailable; this.defaultImages[12] = imageNotAvailable; this.defaultImages[13] = imageNotAvailable; this.defaultImages[14] = imageNotAvailable;
    this.defaultImages[15] = imageNotAvailable; this.defaultImages[16] = imageNotAvailable;

    this.inCircleInfo = require("../../../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;
    this.state = {
      giftWrap_errorModal: false,
      giftwrap_options_modal: false,
      message_prompt_modal: false,
      giftwrap_message_modal: false,
      activated: false,
      itemsArray: [],
      currentOption: 0,
      giftWrapSelectedIndex: null
    }
    this.isDevEnviroment = false;
    this.giftWrapSelection = null;
    this.apiData = { option7: false, giftOption: false, giftWrapMessage: '', }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.giftWrap.error) {
      throw new Error('GIFT WRAP error: '+ nextProps.giftWrap.error);
    }
  }

  componentDidUpdate() {

    this.props.startSpinner(false);
  }


  render() {
    const isNextBtnEnabled = () => {
      if (this.props.selectedItems.length === 0){return false};
      console.log("Nextbutton disabler", this.props.selectedItems.length)
      console.log("item in group" + this.props.giftWrap.data.length)
      console.log('Gift wrap props', store.getState().giftWrap.wrapType);
      if (this.props.cart.dataFrom === 'LINE_VOID') return false;
      if (!this.props.giftWrap.data.length) return true;
      if (this.props.giftWrap.data.length && this.state.giftWrapSelectedIndex !== null) return true;
      return false;
    }

    return (
      <div>
        <Modal classNames={{ modal: "message-prompt-modal" }} open={this.state.message_prompt_modal} onClose={() => this.setState({ message_prompt_modal: false })} closeOnOverlayClick={false}
          little showCloseIcon = {false}>
          <MessagePromptModal
            changeModal={this.renderGiftWrapOptionsModal}
            closeModal={this.exitModals}
            item={this.props.giftWrap.data[this.state.currentItem]}
            apiGift={(value) => { this.setApiGiftOption(value) }}
          />
        </Modal>

        <Modal classNames={{ modal: "giftwrap-options-modal" }} open={this.state.giftwrap_options_modal} onClose={() => this.setState({ giftwrap_options_modal: false })} closeOnOverlayClick={false}
          little showCloseIcon = {false}>
          <GiftWrapOptionsModal
            changeModal={this.renderMessageModal}
            closeModal={this.exitModals}
            item={this.props.giftWrap.data[this.state.currentItem]}
            needGiftMessage={this.apiData.giftOption}
            giftWrapCall={this.addToGiftWrapCall}
            apiOption7={(bool) => { this.setApiOption7(bool) }}
          />
        </Modal>

        <Modal classNames={{ modal: "giftwrap-message-modal" }} open={this.state.giftwrap_message_modal} onClose={() => this.setState({ giftwrap_message_modal: false })} closeOnOverlayClick={false}
        little showCloseIcon = {false}>
          <GiftWrapMessageModal
            navigate={this.renderSalesCart}
            closeModal={this.exitModals}
            giftWrapCall={this.addToGiftWrapCall}
            apiMessage={(value) => { this.setApiGiftWrapMessage(value) }}
          />
        </Modal>

        <Modal open={this.state.giftWrap_errorModal} little classNames={{ modal: 'sale-errorModal' }} >
          <div className='sale-errorModal-container'>
            <div><img className='sale-errorModal-icon' src={warningIcon} alt="warning" /></div>
            <div className="sale-errorModal-text">No items left to gift wrap</div>
            <button className="sale-errorModal-button" onClick={() => { this.setState({ giftWrap_errorModal: false }) }}>
              <div className="sale-errorModal-button-text">CLOSE</div>
            </button>
          </div>

        </Modal>

        <Header history={this.props.history} sale="true" />
        <SaleHeader
          pageName="Sale"
          salutation={this.props.customerDetails.salutation}
          firstName={this.props.customerDetails.firstName}
          lastName={this.props.customerDetails.lastName}
          currentLvl={this.currentlvl}
          skipCustomerInfo={!this.props.customerDetails.skipCustomerInfo}
          address1={this.props.customerDetails.selectedAddress.Addr1}
          address2={this.props.customerDetails.selectedAddress.Addr2}
        />

        <div>
          <ServicesHeader>
            <div className="giftwrap-header-container">
              <img className="giftwrap-header-arrow" src={backArrow} alt="backarrow" onClick={() => this.handleBackButton()} />
              <div className="giftwrap-header-divider"></div>

              <div className="giftwrap-header-text">{store.getState().giftWrap.wrapType == "giftwrap" ? 'Services - Gift Wrap' : 'Services - Gift Wrap COM'}</div>
            </div>
          </ServicesHeader>

          {store.getState().giftWrap.wrapType == "giftwrapcom" ? <div className="giftwrap-content">
            <div className="giftwrap-content-text">Gift wrap options</div>
            <div className="giftwrap-content-container">
              {this.renderGiftWrapOptions()}
            </div>
          </div> : this.props.giftWrap.data.length > 0
              ? <div className="giftwrap-content">
                <div className="giftwrap-content-text">Gift wrap options</div>
                <div className="giftwrap-content-container">
                  {this.renderGiftWrapOptions()}
                </div>
              </div>
              :
              <GiftWrapContent>
                <div className="giftwrap-content-text">Item to be gift wrapped</div>
                <CartRenderer
                  items={this.props.cart.data.cartItems.items}
                  setCurrentItem={this.setCurrentItem}
                />
              </GiftWrapContent>
          }

          <ServicesFooter>
            <div className="giftwrap-cancel" onClick={() => this.navigateToCart()} >
              <img className="giftwrap-cancelImage" src={purpleCross} alt="cross" />
              <span className="giftwrap-cancel-text">Cancel</span></div>
            <div className={isNextBtnEnabled() ? 'giftwrap-next' : 'giftwrap-next-disabled'}
              onClick={() => {
                if (store.getState().giftWrap.wrapType == "giftwrap") {
                  if (this.state.giftWrapSelectedIndex !== null) {
                    this.renderPromptModal();
                  } else {
                    this.getGiftWrapOptions();
                  }
                }
                if (store.getState().giftWrap.wrapType == "giftwrapcom") {

                  if (this.state.giftWrapSelectedIndex !== null) {
                    this.renderPromptModal();
                  }
                }



              }}
            >
              <span className="giftwrap-next-text">NEXT</span>
            </div>
          </ServicesFooter>
        </div>
        <Footer />
      </div>
    )
  }

  setCurrentItem = (itemNumber, itemPrice, itemSku, selectedItem, index) => {
    //debugger;
    let itemList = pluck(this.props.cart.data.cartItems.items[index], 'itemDesc');
    let trimmedList = itemList.map(Function.prototype.call, String.prototype.trim);
    let giftIndex = indexOf(trimmedList, 'Gift Wrap');
    if (giftIndex !== -1) {
      this.setState({ giftWrap_errorModal: true });
    } else {
      this.props.itemSelectedAction(index);
    }

  }

  // ********** GIFT WRAP OPTION METHODS **********

  // SETTERS/GETTERS TO EXTRACT MODAL DATA
  setApiOption7 = (value) => {
    this.apiData.option7 = value;
  }

  setApiGiftOption = (value) => {
    this.apiData.giftOption = value;
  }

  setApiGiftWrapMessage = (value) => {
    this.apiData.giftWrapMessage = value;
  }

  // API RESPONSE TAKES TOO LONG ON INTIAL CALL
  getGiftWrapOptions = () => {
    const param = 503
    //calling action
   this.props.startSpinner(true);
    this.props.getGiftWrap(param);

  }

  renderGiftWrapOptions = () => {
    const styleSelected = { boxShadow: '0 0 6px 0 #613b8c', backgroundColor: 'rgba(168, 126, 214, 0.02)', border: 'solid 2px #a87ed6' };
    const styleNotSelected = { boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)', backgroundColor: '#ffffff', border: 'solid 1px #ededed' };
    const giftWrapOptions = this.props.giftWrap.data;

    return giftWrapOptions.map((option, index) => {
      return (
        <div className="giftwrap-options" key={index}
          style={index === this.state.giftWrapSelectedIndex ? styleSelected : styleNotSelected}
          onClick={() => { this.giftWrapSelection = option; this.setState({ giftWrapSelectedIndex: index }) }}
        >
          {this.isDevEnviroment ? <img className="giftwrap-options-img" src={this.defaultImages[index]} alt={this.defaultImages[index]} /> : <img className="giftwrap-options-img" src={option.imagePath} alt={option.imagePath} />}
          <div className="giftwrap-options-values">
            <div className="giftwrap-options-description">{option.wrapDescription}</div>
            <div className="giftwrap-options-number">#&nbsp;{option.wrapNumber}</div>
            <div className="giftwrap-options-price">$&nbsp;{option.price}</div>
          </div>
        </div>
      )
    })
  }

  addToGiftWrapCall = () => {

    this.exitModals();
    const cart = this.props.cart.data.cartItems;
    const index = this.props.selectedItems[0];

    //selected item is an array of related objects you need item zero for main item(sku item)

    //need to get last subitem linenumber to pass to API.Not the main sku linenumber



    const transactionId = this.props.cart.data.transactionId;
    const giftMessage = this.apiData.giftWrapMessage ? this.apiData.giftWrapMessage : '';

    if (store.getState().giftWrap.wrapType == "giftwrap") {
      const selectedItem = cart.items[index][0];
      const lastSubItemIndex = cart.items[index].length - 1;
      const lineNum = cart.items[index][lastSubItemIndex].lineNumber;

      const optionsObj = {
        "Sku": selectedItem.itemNumber,
        "lineNumber": lineNum,
        "TransactionId": transactionId,
        "IsServiceOnly": store.getState().giftWrap.wrapType == "giftwrap" ? false : true,
        "WrapNumber": this.giftWrapSelection.wrapNumber,
        "WrapDescription": this.giftWrapSelection.wrapDescription,
        "GiftWrapPrice": this.giftWrapSelection.price,
        "IsGiftOption": this.apiData.giftOption,
        "IsOption7": this.apiData.option7,
        "GiftMessage": this.apiData.giftWrapMessage
      }
      //action call
      this.props.startSpinner(true);
      this.props.addToGiftWrap(optionsObj,this.props.login.userpin);
      this.navigateToCart();
    }
    else {

      const optionsObj = {
        "TransactionId": transactionId,
        "IsServiceOnly": store.getState().giftWrap.wrapType == "giftwrap" ? false : true,
        "WrapNumber": this.giftWrapSelection.wrapNumber,
        "WrapDescription": this.giftWrapSelection.wrapDescription,
        "GiftWrapPrice": this.giftWrapSelection.price,
        "IsGiftOption": this.apiData.giftOption,
        "IsOption7": this.apiData.option7,
        "GiftMessage": this.apiData.giftWrapMessage
      }
      //action call
      this.props.startSpinner(true);
      this.props.addToGiftWrap(optionsObj,this.props.login.userpin);
      this.navigateToCart();

    }


  }

  navigateToCart = () => {
    //clearSelection - redux action
    this.props.itemSelectedAction('');
    //clear the GiftWrap Option - redux action
    this.props.clearGiftWraps();
    this.props.history.push('/sale');
  }
  handleBackButton = () => {
    if(store.getState().giftWrap.wrapType == "giftwrapcom"||this.props.giftWrap.data.length==0){
    //clearSelection - redux action
    this.props.itemSelectedAction('');
    //clear the GiftWrap Option - redux action
    this.props.clearGiftWraps();
    this.props.history.push('/sale');
    }
    else
    {
      //clear the GiftWrap Option - redux action
    this.props.clearGiftWraps();
    this.props.history.push('/gift-wrap');
    }
  }

  // API RESPONSE TAKES TOo LONG ON INTIAL CALL
  renderSalesCart = () => {
    // this.props.startSpinner(true);
    // If call to api returns a success, go back to sales. GiftCart flow complete
    if (this.props.cart.data.response_text === "GW_SUCCESS") {

      this.props.history.push('/sale')

      // this.props.startSpinner(false);
    }
  }

  // ********** GIFT WRAP MODAL METHODS **********
  renderPromptModal = () => {
    this.setState({
      message_prompt_modal: !this.state.message_prompt_modal,
    })
  }

  // change state of modals based on previous state
  renderGiftWrapOptionsModal = () => {
    this.setState({
      giftwrap_options_modal: !this.state.giftwrap_message_modal,
      message_prompt_modal: !this.state.message_prompt_modal,
    })
  }

  renderMessageModal = (flag) => {
    this.setState({
      giftwrap_message_modal: flag,
      giftwrap_options_modal: !this.state.giftwrap_options_modal,
    })
  }

  exitModals = () => {
    this.setState({
      giftwrap_options_modal: false,
      message_prompt_modal: false,
      giftwrap_message_modal: false,
      activated: false
    })
  }
};


function mapStateToProps({ giftWrap, cart,customerDetails, selectedItems, login }) {
  return {
    giftWrap,
    cart,
    customerDetails,
    selectedItems,
    login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getGiftWrap: getGiftWrap,
      addToGiftWrap: addToGiftWrap,
      clearGiftWraps,
      setCurrnetItemInvoker: setCurrnetItem,
      startSpinner: startSpinner,
      itemSelectedAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftWrap);