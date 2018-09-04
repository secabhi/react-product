/* Importing the required libraries and plugins*/

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';
/* Importing the local files*/
import { ModifyPriceErrorModal } from '../../sale/modal-component/modalComponent'
import {store} from '../../../store/store'
import {xml2json} from '../../common/helpers/helpers'
import { startSpinner } from '../../common/loading/spinnerAction';

import { testAction, callVoidTransaction, suspendAction, clearPED } from './HeaderAction';
import {clearState}  from '../../payment//Controller/paymentActions';
import { CartWarningModal } from '../../sale/modal-component/modalComponent'
import {showException} from '../../common/exceptionErrorModal/exceptionAction'

import warningIcon from '../../../resources/images/Warning.svg';

import {navigateToLookupOptions,setPathname,setNextInquiry,clearIsValid} from '../../account-lookup/controllers/accountLookupActions';
import {getCardsList,isThirdParty} from '../../account-lookup/controllers/accountLookupActions.js'
import DLModal from '../../account-lookup/modals/DLModal';
import ByPassModal from '../../account-lookup/modals/BypassModal';
import confirmDetailsModal from '../../account-lookup/modals/confrimDetailsModal'
/*Account Lookup modals*/
import CustomerPhone from '../../account-lookup/modals/CustomerPhoneModal';

/* Importing the resource images and icons*/

import { HeaderView } from '../../common/header/View/HeaderView'
import { ConfirmExitModal } from './View/confirmExitModal';
import './View/HeaderViewStyle.css';
import warning from '../../../resources/images/Warning.svg';

// AURUS API CALL
import { getAurusResponse } from '../../payment/Controller/paymentActions';
import {activateSwipGiftCard, aurusGetBalanceEnquiry} from '../aurusApiCall/aurusApi';
import GiftCardScanSwipeModal from '../../payment/View/Components/Modals/GiftCardScanSwipeModal';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSale: this.props.sale,
      isSuspend: false,
      isVoid: false,
      voidError: false,
      suspendError: false,
      transactionId: '',
      cartWarningError: false,
      CartErrortoHomeModal: false,
      suspendNoItemModal: false,
      pedbatterythresholdvalue :'',
      pedbatterylevel: '100',
      inTransaction: this.props.inTransaction,
      custPhoneModalFlag: false,
      exitModal:false,
      printModal:false,
      giftCardModal: false,
      validCardNumber: '',
      giftCardErrorModel:false,
      balanceEnquiryErrorModel:false,
  
       //Account Lookup States
       custPhoneModalFlag: false,
       DLModalFlag: false,
       byPassModalFlag: false,
       confirmDetailsFlag:false,
       cards:{},
       currentPath:'',
       getCardsError:false
    }
    this.swipedata = {props:{}};
    this.pedbatterystatusconfigured = require('../../../resources/stubs/config.json');
  }

  componentDidMount(){
      console.log('next enquery'+JSON.stringify(this.props.cards.isNextInquiry));
      if(this.props.cards.isNextInquiry==true)
      {
        this.setState({custPhoneModalFlag:true});
      }
    if (this.props.cart.data.cartItems && this.props.cart.data.cartItems.items.length >= 1) {
      if (this.props.history.location.pathname === '/sale') {
        this.setState({ CartErrortoHomeModal: true })
      }
      else {
        // this.navigateToHome();
      }
    }

  }

  componentWillMount(){
    var pedbattery = this.pedbatterystatusconfigured.pedbatterylevel_config;
    this.setState({
      pedbatterythresholdvalue : pedbattery
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!(nextProps.history.location.pathname == '/payment'))  {
      console.log('Header-nextProps', nextProps)
      console.log('nextProps.history.location.pathname', nextProps.history.location.pathname)
      if (nextProps.cart.data.cartItems && nextProps.cart.data.cartItems.items.length >= 1) {
        if (nextProps.history.location.pathname === '/sale') {
          this.setState({ CartErrortoHomeModal: true })
        }
        else {
          //  this.navigateToHome();
        }
      }
    
    console.log('nextProps.history.location.pathname', nextProps.history.location.pathname)
    
    if (nextProps.voidTransDetails && nextProps.voidTransDetails.void == true) {
      this.closeVoid();
      this.navigateToHomeReturn();
    }
    if (nextProps.voidTransDetails && nextProps.voidTransDetails.voidFail == true) {
      this.openVoidError();
    }
    if (nextProps.suspendTransDetails && nextProps.suspendTransDetails.suspendSuccess == true) {
      this.setState({ printModal: false })
      this.navigateToHomeReturn();
    }
    if (nextProps.suspendTransDetails && nextProps.suspendTransDetails.suspendFail == true) {
      this.setState({ printModal: false })
      this.openSuspendError();
    }
    if(nextProps.header && nextProps.header.pedbatteryresp != '' && nextProps.header.pedbatteryresp != undefined){
        this.processPedBatteryResp(nextProps.header.pedbatteryresp);
    }
  }

  if(nextProps.cards.isValid)
  {
    if (nextProps.cards.dataFrom === "GET_CARDS_SUCCESS") {
      this.props.startSpinner(false);
      this.props.isThirdPartySet(true);
      this.props.history.push('/account-lookup');
    }
    if (nextProps.cards.dataFrom === "GET_CARDS_GENERALERROR") {
      this.props.startSpinner(false);
      this.props.isThirdPartySet(true);
      this.setState({getCardsError:true});
      //alert('invalid request');
      /*this.props.callErrorException( {
        showException: true,
        error:{failedModule:'Account Lookup',
        failureReason:'Unexpected Response',
        failureDescription:'Unable to resolve the response structure'}})*/
      //this.props.history.push('/account-lookup');
    }
    
  }
  else {
    if(nextProps.cards.error_message!='')
    {
     
      this.props.callErrorException(
      {showException: true,
       error:{failedModule:'Account Lookup',
       failureReason:'Unexpected Response',
       failureDescription:nextProps.cards.error_message}})
       this.props.clearIsValidFlag();
    }

  }

  if(nextProps.Payment.getGiftCardBinRes !== this.props.Payment.getGiftCardBinRes){
    console.log("----> CONSOLE LOG IN HEADER.JS NEXTPROPS CALLING BALANCE API---->,170");
    this.invokeBalanceEnquiryApi(nextProps.Payment.getGiftCardBinRes);
  }

  if(nextProps.Payment.giftCardBalanceinqRes !== this.props.Payment.giftCardBalanceinqRes){
    console.log("----> CONSOLE LOG IN HEADER.JS NEXTPROPS OPEN GIFTCARD MODEL WITH DETAILS---->,170");
    this.openGiftCardModel(nextProps.Payment.giftCardBalanceinqRes);
  }
  this.setState({currentPath:nextProps.history.location.pathname});
  }
  /*callErrorException = (data) => {

  }*/
  
 
    processPedBatteryResp = (data) =>{
      var width ="";
      var color ="green";
      try{
        if(data.GetStatusResponse.ResponseCode == "00000"){
          var pedbtrylevel = data.GetStatusResponse.SystemParamters[0].LineItem[0].ParameterValue[0];
          width = pedbtrylevel + '%';
          if(parseInt(pedbtrylevel) <= parseInt(this.state.pedbatterythresholdvalue)){
                color = "red";
          }
              this.setState({
                  pedbatterylevel : pedbtrylevel,
                  pedindicatorwidth : width,
                  pedindicatorcolor : color
              })
        }else{
          if(data.GetStatusResponse.ResponseCode !== "00000"){
            this.setState({
              pedbatterylevel : "100",
              pedindicatorwidth : "100%",
              pedindicatorcolor : "green"
            })
          }
        }
      }catch(err){
        console.log("Exception in processPedBatteryResp",err)
      }
  }
  

  showErrorModal = (showFlag) => {
    if (showFlag == false) {
      this.closeVoidError();
    }
  }

  closegetCardsErroModal = (showFlag) => {
    this.setState({getCardsError:showFlag})
  }

  closeSuspendErrorModal = (showFlag) => {
    if (showFlag == false) {
      this.setState({
        suspendError: false
      })
    }
  }

  openAccountLookup = () => {
    this.setState({custPhoneModalFlag:true});
  }
  closeAccountLookup = () => {
    this.setState({custPhoneModalFlag:false});
  }

   //Account Lookup methods
   closeDLModel = () =>
   {
     this.setState({ DLModalFlag: false });
   }
   OpenThridParty = () =>
   {
 
   }
   closeCustModel = () =>
   {
     //alert('close is called');
     this.props.setNextInquiryFalg(false);
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
   //alert('hi');
   this.setState({custPhoneModalFlag:false});
   this.props.setNextInquiryFalg(false);
   console.log('cards path'+JSON.stringify(this.props.history.location.pathname));
  /* let request = {
     "storeClientNo" : client_id
 }*/
 
     let request = {
       "storeClientNo" : store.getState().customerDetails.clientNumber
     }
     this.props.startSpinner(true);
     this.props.setPath(this.props.history.location.pathname);
     this.props.getCardsList(request);
     //this.props.history.push('/account-lookup');
 }
 showAccountLookupModal = () => {
  this.props.setNextInquiryFalg(false);
  this.setState({ custPhoneModalFlag: true });
}

handleGiftCardModal = () => {
  if (this.state.giftCardModal == true) {
    this.setState({ giftCardModal: false })
    this.cancelSwipe();
  } else {
    this.bypass('GIFTCARD')
  }
}
 enableScanOrSwipe =()=>{

  this.setState({enableScanOrSwipeView:true,giftCardModal:true});
}
 keyGiftCard = (giftcardnum) => {

  if (giftcardnum.length > 16 && giftcardnum.length < 18) {
    this.props.convertSALT(giftcardnum)
  } else {
    this.setState({ error: "A 17-digit gift card number is required" })
    this.error = true;
  }
}
 handleGiftCardNumInput = (e) => {
  this.setState({ giftCardNumber: e.target.value, error: "" })
}
 cancelSwipe = () => {
  console.log("sending cancel swipe bypass request")
  // setTimeout(() => {this.props.aurusActionInvoker(json2xml(this.bypassJson),'CANCELSWIPE')},1000);
  //  this.timer = setTimeout(function(){this.openErrorModal('timeout',"Timeout") }, 35000);
}

activateSwipGiftCardInvoker=()=>{
  console.log("---->HEY RAJ I ENTERED INTO ACTIVATESWIPEGIFTCARDINVOKER----> 293",)
   const req = activateSwipGiftCard();
   this.props.getAurusResponse(req, 'GIFTCARD_GETCARDBIN');

}

invokeBalanceEnquiryApi = (data) =>{
  const cardNumber = data.GetCardBINResponse.CardToken[0]
  if(data.GetCardBINResponse.ResponseCode[0] === "00000" ){
    const params = aurusGetBalanceEnquiry(cardNumber);
    this.props.getAurusResponse(params, 'GIFTCARDBALANCE_INQUIRY');
  }
  else if(data.GetCardBINResponse.ResponseCode[0] !== "00000"){
      this.setState({giftCardErrorModel: true})
  }

}

openGiftCardModel = (data) =>{
  if(data.TransResponse.TransDetailsData[0].TransDetailData[0].ResponseCode[0] === "00000"){
    
  }
  else if(data.TransResponse.TransDetailsData[0].TransDetailData[0].ResponseCode[0] !== "00000"){
    this.setState({balanceEnquiryErrorModel:true})
  }
}
  render() {

    const clientNum = store.getState().customerDetails.clientNumber;
    const { match, location, history, sale, userPin } = this.props
    const VoidTxnFail = "Void Transaction Failed"
    const SuspendTxnFail = "Suspend Transaction Failed"

    const swipeData={
      handleGiftCardModal:this.handleGiftCardModal,
      giftCardNumber:this.state.giftCardNumber,
      giftCardModal:this.state.giftCardModal,
      keyGiftCard:this.keyGiftCard,
      handleGiftCardNumInput:this.handleGiftCardNumInput,
      isPinReq:false
    }

    return (
      <div>
        <HeaderView
          batteryStatus={store.getState().home.batteryStatus.battery_level}//store.getState().home.batteryStatus.battery_level
          history={this.props.history}
          enableScanOrSwipe={this.enableScanOrSwipe}
          openPostVoidModal={this.props.openPostVoidModal}
          navigateToHome={this.navigateToHome}
          printModal={this.state.printModal}
          closeAccountLookup = {this.closeAccountLookup}
          closePrintModal={this.closePrintModal}
          openPrintRecpt={this.openPrintRecpt}
          voidTransaction={this.voidTransaction}
          isSale={this.state.isSale}
          isSuspend={this.state.isSuspend}
          isVoid={this.state.isVoid}
          openVoid={this.openVoid}
          closeVoid={this.closeVoid}
          suspendTransaction={this.suspendTransaction}
          userPin={this.props.userPin}
          inputVal={this.state.inputVal}
          printReceipt={this.suspendActionCall}
          transactionId={this.props.transactionId}
          callVoidTransactionInvoker={this.props.callVoidTransactionInvoker}
          userPin={this.props.userPin}
          pedindicatorwidth = {this.state.pedindicatorwidth}
          pedindicatorcolor = { this.state.pedindicatorcolor}
          pedbatterythresholdvalue = {this.state.pedbatterythresholdvalue}
          confirmExit={this.confirmExit}
          activateSwipGiftCardInvoker = {this.activateSwipGiftCardInvoker}
          startMidVoid={this.props.startMidVoid}
          showAccountLookupModal = {this.showAccountLookupModal}
           />
        {this.state.voidError
          ? (<Modal classNames={{ modal: 'modify-price-error-modal-container' }}
            open={() => { }}
            onClose={() => { }}
          >
            <ModifyPriceErrorModal
              errorText={VoidTxnFail}
              showModifyErrorModal={this.showErrorModal}
            />
          </Modal>)
          : ''}

        {this.state.suspendError
          ? (<Modal classNames={{ modal: 'modify-price-error-modal-container' }}
            open={() => { }}
            onClose={() => { }}
          >
            <ModifyPriceErrorModal
              errorText={SuspendTxnFail}
              showModifyErrorModal={this.closeSuspendErrorModal}
            />
          </Modal>)
          : ''}
        {this.state.cartWarningError
          ? (<Modal classNames={{ modal: 'cart-to-home-warning-modal-container' }}
            open={() => { }}
            onClose={() => { }}
            little showCloseIcon={false}
          >
            <CartWarningModal
              closeCarttoHomeErrorModal={this.closeCartErrorModal}
              navigateToHomeReturn={this.navigateToHomeReturn}
            />
          </Modal>)
          : ''}
          {this.state.exitModal?(<Modal classNames={{ modal: 'confirmExitModal' }}
            open={() => { }}
            onClose={() => { }}
          >
            <ConfirmExitModal
              props={this.props}
            />
          </Modal>):''}

          {/*Account Lookup popups*/}
          {this.state.custPhoneModalFlag?
          <Modal open={this.state.custPhoneModalFlag} 
          onClose={() => { }}
          showCloseIcon={false}
          little >
            <CustomerPhone
              closeCustModel={this.closeCustModel}
              clientNum = {clientNum?true:false}
              getCardsListInvoker = {this.getCardsListInvoker}
              nextCustModel={this.nextCustModel}
            />
        </Modal>: null
        }
        {this.state.DLModalFlag?
          <Modal open={this.state.DLModalFlag} 
          onClose={() => { }}
          showCloseIcon={false}
          little >
            <DLModal
            closeDLModel={this.closeDLModel}
            OpenByPassModel={this.OpenByPassModel}
            nextDLModel={this.nextDLModel}
            />
        </Modal>: null
        }
        {this.state.byPassModalFlag?
          <Modal open={this.state.byPassModalFlag} 
          onClose={() => { }}
          showCloseIcon={false}
          little >
            <ByPassModal
            closeByPassModel={this.closeByPassModel}
            nextByPassModel={this.nextByPassModel}
            />
        </Modal>: null
        }

        {this.state.confirmDetailsFlag?
          <Modal open={this.state.confirmDetailsFlag} 
          onClose={() => { }}
          showCloseIcon={false}
          little >
            <confirmDetails
            closeByPassModel={this.closeByPassModel}
            nextByPassModel={this.nextByPassModel}
            />
        </Modal>: null
        }
        {this.state.getCardsError?
          <Modal open={this.state.getCardsError} little classNames={{ modal: 'sale-errorModal' }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Invalid Request</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ getCardsError: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>
: null
}
          
            <Modal classNames={{ modal: 'suspend-noItem-modal' }} open={this.state.suspendNoItemModal} onClose={() => this.setState({ suspendNoItemModal: false })} closeOnOverlayClick={false}
            little showCloseIcon = {false} >
            <div className="suspend-noItem-img">
              <img src={warning}></img>
            </div>

            <div className="suspend-noItem-msg"> There are no items to Suspend.</div>
            <div className="suspend-noItem-btn" onClick={() => this.setState({ suspendNoItemModal: false })}><span className="suspend-noItem-txt">OK</span></div>
          </Modal>

          {this.state.enableScanOrSwipeView ?
          <GiftCardScanSwipeModal props={swipeData} /> : null}

          <Modal open={this.state.giftCardErrorModel} little classNames={{ modal: 'sale-errorModal' }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">{this.props.Payment.GetCardBINResponse.ResponseText[0]}</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ giftCardErrorModel: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>
          </Modal>

           <Modal open={this.state. balanceEnquiryErrorModel} little classNames={{ modal: 'sale-errorModal' }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">{this.props.Payment.giftCardBalanceinqRes.TransResponse.TransDetailsData[0].TransDetailData[0].TransactionResponseText[0]}</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({  balanceEnquiryErrorModel: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>
          </Modal>

      </div>
 
    );
  }

  navigateToHome = () => {
   // console.log('this.props.cart.data.cartItems.items.length',this.props.cart.data.cartItems.items.length)
   // console.log('this.props.cart.data.cartItems.items.length',this.state.CartErrortoHomeModal)
    console.log('this.props.history.location.pathname',this.props.history.location.pathname)
    if (this.state.CartErrortoHomeModal === true) {
          this.opencartwarningError();
        }
    else {
      if (!this.state.inTransaction) {
        sessionStorage.setItem("loggedIn", "false");
        this
          .props
          .history
          .push('/');
        this.props.clearPEDInvoker();
        this.setState({
          isSuspend: false,
          isVoid: false
        })
      } else if(this.state.inTransaction){
        this.setState({exitModal:true});
      }
    }
  }

  confirmExit=()=>{
    //void
    sessionStorage.setItem("loggedIn", "false");
    this
      .props
      .history
      .push('/');
    this.props.clearPEDInvoker();
    this.setState({
      isSuspend: false,
      isVoid: false
    })
  }

  closeModal=()=>{
    this.setState({exitModal:false});
  }

  navigateToHomeReturn = () => {
    sessionStorage.setItem("loggedIn", "false");
    this
      .props
      .history
      .push('/');
    this.setState({
      isSuspend: false,
      isVoid: false
    })
  }


  suspendActionCall = (inputVal) => {
    if (inputVal !== "" && inputVal !== undefined && inputVal !== null) {
      this.props.suspendActionInvoker(inputVal, this.props.userPin, this.props.transactionId);
    }
  }

  closePrintModal = () => {


    this.setState({ isSuspend: false, printModal: false });
  }

  openPrintRecpt = () => {
    this.setState({ isSuspend: false, printModal: true });
  }

  suspendTransaction = () => {
    if(this.props.cart.data.cartItems && this.props.cart.data.cartItems.items.length >=1){
    if (this.state.isSuspend === false) {
      this.setState({
        isSuspend: true
      })
    } else {
      this.setState({
        isSuspend: false
      })
    }
  }else{
    this.setState({
      suspendNoItemModal:true
    })
  }
}
  
  voidTransaction = () => {
    if (this.state.isVoid === false) {
      this.setState({
        isVoid: true
      })
    } else {
      this.setState({
        isVoid: false
      })
    }
  }

  openVoid = () => {
    this.setState(
      { isVoid: true }
    )

  }

  closeVoid = () => {
    this.setState({
      isVoid: false
    })
  }

  opencartwarningError = () => {
    this.setState({
      cartWarningError: true
    })
  }

  closeCartErrorModal = () => {
    this.setState({
      cartWarningError: false
    })
  }

  openVoidError = () => {
    this.setState({
      isVoid: false,
      voidError: true
    })
  }

  closeVoidError = () => {
    this.setState({
      voidError: false
    })
  }

  openSuspendError = () => {
    this.setState({
      isSuspend: false,
      suspendError: true
    })
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
    userPin: state.login.userpin, suspendTransDetails: state.suspendTrans,
    voidTransDetails: state.voidDetails, transactionId: state.home.transactionData ? state.home.transactionData.transactionNumber : '',
    cart: state.cart,
    spinner:state.spinner,
    payment:state.Payment,
    cards:state.Cards
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testActionInvoker: testAction,
    suspendActionInvoker: suspendAction,
    callVoidTransactionInvoker: callVoidTransaction,
    clearPEDInvoker: clearPED, 
    clearStateInvoker: clearState,
    getCardsList:getCardsList,
    navigateToLookupOptions:navigateToLookupOptions,
    startSpinner: startSpinner,
    setPath:setPathname,
    setNextInquiryFalg:setNextInquiry,
    isThirdPartySet:isThirdParty,
    callErrorException: (data)=> showException(data),
    clearIsValidFlag:clearIsValid,
    getAurusResponse:getAurusResponse,


  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)