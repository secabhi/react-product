import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { postVoidTransactionList } from '../post-void/postVoidAction';
import { PrintSendTransactionList } from '../print-send-receipt/printRecieptAction';
import Login from '../login/controller/login';
import ChangePassword from '../change-password/controller/changePassword';
import SuccessModal from './success-modal/successModal';
import ErrorModal from './error-modal/errorModal';
import AurusErrorModal from './aurusError/errorModal';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import HomeHeader from './home-header';
import HomeHeaderSmall from './home-header-small';
import PostVoidSelect from '../post-void/postVoidSelect';
import PrintSendSelect from '../print-send-receipt/printSendSelect';
import PostVoidEnter from '../post-void/postVoidEnter';
import PrintSendEnter from '../print-send-receipt/printSendEnter';
import PostVoid from '../post-void/postVoid';
import PrintSend from '../print-send-receipt/PrintSend';
import PrintErrorModal from '../print-send-receipt/Modals/ErrorModal';
import Saleicon from '../../resources/images/Sale_bttn.svg';
import CustomerIcon from '../../resources/images/Customer_Search_bttn.svg';
import CartIcon from '../../resources/images/Account_Lookup_bttn.svg';
import BrandIcon from '../../resources/images/NeimanLogo.gif';
import ProductIcon from '../../resources/images/Product_Search_bttn.svg';
import ReceiptIcon from '../../resources/images/Receipt_120.svg';
import postVoidIcon from '../../resources/images/Post Void.svg';
import resumeIcon from '../../resources/images/Resume.svg';
import clockIcon from '../../resources/images/Clock.svg';
import userLogin from '../../resources/images/Associate-Login.svg';
import warning from '../../resources/images/Warning.svg';
import NeimanMarcusLogo from '../../resources/images/Neiman_Marcus_logo.svg'
import { store } from '../../store/store'
import { startSpinner } from '../common/loading/spinnerAction';
import { showException } from '../common/exceptionErrorModal/exceptionAction'


import { getTransactionRequest, getPresaleRequest, setButtonClick, getSalutations, clearHomeStore, clearPED,resumeTransactionIdAction } from './HomeAction';

import { getTransactionId } from './HomeSelector';
import { clearCustomerDataAction } from '../customer-search-sale/actions';
import { clearCart } from '../sale/SalesCartAction';
import { itemSelectedAction } from '../common/cartRenderer/actions';
import { clearCustomerDetailsAction } from '../customer-details/CustomerDetailsActions';
import { xml2json, json2xml } from '../common/helpers/helpers';
import { getAurusResponse} from '../payment/Controller/paymentActions';
import './home.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import warningIcon from '../../resources/images/Warning.svg';
import { ResumeTransaction, ResumeEnter } from '../resume/resume'
import ResumeselectTrans from '../resume/resumeSelectTrans'
import { resumeEntryUpdateAction } from '../resume/resumeAction';
import CustomerPhone from '../account-lookup/modals/CustomerPhoneModal';
import { openResumeSelectAction } from '../resume/openResumeSelectAction';
import { PEDBatteryModal } from './ped-warning-modal/PedBatteryModal';
import { clearLoginDataAction } from '../home/HomeAction'
const CONFIG_FILE = require('../../resources/stubs/config.json');


var clientConfig = CONFIG_FILE.clientConfig;


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      passwordopen: false,
      username: "",
      password: "",
      modal_post_void: false,
      modal_print_send: false,
      isPrintReceipt: false,
      modal_post_voidenter: false,
      modal_post_voidselect: false,
      modal_print_sendenter: false,
      modal_print_sendselect: false,
      showLoginModal: false,
      showChangePassModal: false,
      passwordSuccessModal: false,
      passwordErrorModal: false,
      aurusErrorModal: false,
      showTransErrorModal: false,
      changePasswordErrorTitle: 'Error',
      print_Error_Modal: false,

      changePasswordErrorSubTitle: 'Your Password was not changed',
      aurusErrorSubTitle: "Aurus is unable to connect",
      iconClick: "",
      resume_errorModal: false,
      pedbatterylevel: '100',
      pedbatterythresholdvalue: '',
      pedwarningmodal: false,
      pedindicatorwidth: '',
      pedindicatorcolor: '',
      custPhoneModalFlag: false,
      warningMessages: ''
     
      
    };
    this.bypassRequest = require('../../resources/aurus/BypassScreen.json');
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleHideLogin = this.handleHideLogin.bind(this);
    this.handleShowChangePass = this.handleShowChangePass.bind(this);
    this.handleHideChangePass = this.handleHideChangePass.bind(this);
    this.handleShowSuccessPass = this.handleShowSuccessPass.bind(this);
    this.handleHideSuccessPass = this.handleHideSuccessPass.bind(this);
    this.handleShowErrorPass = this.handleShowErrorPass.bind(this);
    this.handleHideErrorPass = this.handleHideErrorPass.bind(this);
    this.getStatusRequestJson = require('../../resources/aurus/GetStatus.json');
    this.pedbatterystatusconfigured = require('../../resources/stubs/config.json');
    this.timer = null;
  }


  componentWillMount() {
    this.props.clearHomeStore();
    this.props.clearPED(json2xml(this.bypassRequest));
    var pedbattery = this.pedbatterystatusconfigured.pedbatterylevel_config;
    console.log("Home:ComponentWillMount PED Battery threshold value:" + pedbattery);
    this.setState({
      pedbatterythresholdvalue: pedbattery
    })
  }


  componentDidMount() {
    console.log("Home did mount", this.props);
    console.log("loggedIn: ", sessionStorage.getItem("loggedIn"));
    this.props.startSpinner(true);
    this.getTransactionIdInvoker();
    this.getPresaleFlagInvoker();
    this.getSalutationsInvoker();
    this.props.clearSearchData();
    this.props.clearCart();
    this.props.clearItemSelected("");
    this.props.clearCustomerDetails();
    this.timer = setTimeout(() => { this.getPedBatteryStatus()},5000);
  }


  getTransactionIdInvoker() {
    //Hardcoded values to be removed once the hardcoded values from getPresaleFlagInvoker is removed
    this.props.startSpinner(true);
    let requestData = {
      /* ClientID:"0010:0168:05092018:033639",
      ClientTypeID:"1000",
      SourceApp:"POS",
      StoreAssoc:"111000",
      StoreNumber:"0010",
      RegisterNumber:"0168" */
      ...clientConfig
      //StoreAssoc: this.props.userpin,
    };
    this.props.getTransactionIdInvoker(requestData);
  }
  getPresaleFlagInvoker() {
    //Hardcoded values to be removed once the hardcoded values from getTransactionIdInvoker is removed
    this.props.startSpinner(true);
    let registerInfoRequest = {
      /* ClientID:"0010:0168:05092018:033639",
      ClientTypeID:"1000",
      SourceApp:"POS",
      StoreAssoc:"111000",
      StoreNumber:"0010",
      RegisterNumber:"0168" */
      ...clientConfig
      //StoreAssoc: this.props.userpin,
    };
    this.props.getPresaleFlagInvoker(registerInfoRequest);
  }

  getSalutationsInvoker() {
    this.props.getSalutationsInvoker();
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.home.isValid) {
      console.log('HOME: nextProps --->>', nextProps.home);
      if (nextProps.home.bypassRes != '' && nextProps.home.bypassRes != undefined &&nextProps.home.bypassRes != this.props.home.bypassRes) {
        this.bypassResReturned(nextProps.home.bypassRes)
      }

      if(nextProps.home.bypassResp != '' && nextProps.home.bypassResp != undefined && nextProps.home.bypassResp != this.props.home.bypassRes){
        this.processBypassResp(nextProps.home.bypassResp);
      }

 
      if (nextProps.home.loginSuccess === true && nextProps.home.response) {
        if (nextProps.home.response.response_Code === "PW_SUCCESS" || nextProps.home.response.response_Code === "PW_ABOUTTOCHANGE") {
          //alert("Logged In Success");
          //var iconName = event.target.id;
          // this.props.setButtonClickInvoker(this.state.iconClick);


          if (parseInt(this.state.pedbatterylevel) <= parseInt(this.state.pedbatterythresholdvalue)) {
      
            this.setState({
              pedwarningmodal: true
            })
          }

          else {
            this.proceedWithLogin()
          }
        }
        console.log("LOGIN RESPONSE: ", nextProps.home.response);
      }

      if (nextProps.home.dataFrom === 'error') {
        console.log("Transaction Failed", nextProps.home.dataFrom);
        this.setState({
          showTransErrorModal: true
        })
      }

      console.log("^%^%^^%^%^%^%^FOR RESUME TRANSACTION", nextProps);
      console.log('TL_NOTRANSACTIONFOUND' + JSON.stringify(nextProps));
      if (nextProps.home.response !== null && nextProps.home.response.response_text == 'TL_NOTRANSACTIONFOUND') {
        this.cancelSelectModal();
        this.cancelSelectPrintModal()
      }

      if (nextProps.home.getResumeDatasFrom === 'RESUME_TRANSACTIONS_SUCCESS') {
        this.navigateToResumeTransaction();
        this.props.startSpinner(true);
        var ResumeTransactionId = nextProps.home.getResumeDatas.transactionId;
        var ResumeTransactionIdObject = {
          "response_code": 0,
          "response_text": "AFS_Success",
          "transactionNumber": ResumeTransactionId
        }
        
        console.log("RESUME TRANSACTION ID", ResumeTransactionIdObject);
        this.props.resumeTransactionIdInvoker(ResumeTransactionIdObject);

      }

      if (nextProps.home.getResumeDatasFrom === "RESUME_ENTRY_REQUEST_FAILURE_ERROR") {
        this.props.startSpinner(false);
        this.setState({ resume_errorModal: true });
        this.setState({warningMessages: nextProps.home.error_message});
        this.props.clearHomeStore();

      }

      if (nextProps.home.dataFrom === "SUSPENDED_TRANSACTION_LIST_FAILURE") {
        this.props.startSpinner(false);
        this.setState({ resume_errorModal: true, modal_resume_select_trans: false });
        this.setState({warningMessages: nextProps.home.error_message});
      }


      if (nextProps.home.navigateToPostVoidDetails === true) {
        this.props.history.push('/postvoiddetails');
      }


      if (nextProps.home.pedbatteryresp != '' && nextProps.home.pedbatteryresp != undefined) {
          this.processPedBatteryResp(nextProps.home.pedbatteryresp);
      }
    }
    else {
      if (nextProps.cart.error_message != '') {
        this.callErrorException({
          showException: true,
          error: { failedModule: 'Home Resume', failureReason: 'Unexpected Response', failureDescription: 'Unable to resolve the response structure' }
        })
      }
    }



  }

  processBypassResp = (data) =>{
    //debugger;
    if (data.ByPassScreenResponse.ResponseCode == "00000") {
      console.log("PED screen bypassed");
    } else {
      console.log("PED screen not bypassed");
      this.setState({ aurusErrorModal: true })
    }
  }

  bypassResReturned = (data) => {
    console.log("bypass returned");
    if (data.ByPassScreenResponse.ResponseCode == "00000") {
      console.log("PED Cleared");
    } else {
      console.log("PED not cleared");
      this.setState({ aurusErrorModal: true })
    }
  }


  proceedWithLogin = () => {
    if (this.state.iconClick == "1") {
      this.props.history.push('/customer-search');
    } else if (this.state.iconClick == "2") {
      this.props.history.push('/customer-search');
    } else if (this.state.iconClick == "3") {
      this.props.history.push('/product-search');
    } else if (this.state.iconClick == "4") {
      //this.props.history.push('/lookup-dummy');
      this.setState({ custPhoneModalFlag: true });
    }
    else if (this.state.iconClick == "5") {
      this.openPostVoidModal();
    }
    else if (this.state.iconClick == "6") {
      this.setState({ iconClick: '' });
      this.resumeallmodals(true, false, false);
    }
    else if (this.state.iconClick == "7") {

      this.openPrintSendModal();
    }

  }

  navigateToResumeTransaction = () => {
    this.props.history.push('/resume-transactions');
  }

  handleShowLogin(event) {
    if (sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false") {
      this.setState({ showLoginModal: true, iconClick: event.target.id });
      this.props.setButtonClickInvoker(event.target.id);
    } else {

      var iconName = event.target.id;
      this.props.setButtonClickInvoker(iconName);
      if (iconName == "1") {
        this.props.history.push('/customer-search');
      } else if (iconName == "2") {
        this.props.history.push('/customer-search');
      } else if (iconName == "4") {
        //this.props.history.push('/lookup-dummy');
        this.setState({ custPhoneModalFlag: true })
      }

      else if (iconName == "5") {
        this.openPostVoidModal();
      }
      else if (iconName == "6") {
        this.resumeallmodals(true, false, false);
      }
      else if (iconName == "7") {
        this.openPrintSendModal();
      }
    }
  }

  handleHideLogin() {
    this.setState({ showLoginModal: false });
  }

  handleShowChangePass() {
    this.setState({ showChangePassModal: true });
  }

  handleHideChangePass() {
    this.setState({ showChangePassModal: false });
  }

  handleShowSuccessPass() {
    this.setState({ passwordSuccessModal: true });
  }

  handleHideSuccessPass() {
    this.setState({ passwordSuccessModal: false });
  }

  handleShowErrorPass() {
    this.setState({ passwordErrorModal: true });
  }

  handleHideErrorPass() {
    this.setState({ passwordErrorModal: false });
  }

  handleShowAurusModal() {
    this.setState({ aurusErrorModal: true });
  }

  handleHideAurusModal() {
    this.setState({ aurusErrorModal: false });
    window.location.reload();
  }
  openPostVoidModal = () => {
    this.setState({ modal_post_void: true })

  }
  openPrintSendModal = () => {
    this.setState({ modal_print_send: true })

  }
  OpenErrorModal = () => {
    this.setState({ print_Error_Modal: true })
  }
  closeErrorModel = () => {
    this.setState({ print_Error_Modal: false })
    this.setState({ modal_print_sendselect: false });
  }
  openselectTrans = () => {
    if (this.state.isPrintReceipt) {
      this.setState({ modal_post_void: false })
      this.setState({ modal_post_voidselect: true });
      this.props.openSelectInvoker(this.state.setUserPin);
    }
    else {
      this.setState({ modal_post_void: false })
      this.setState({ modal_post_voidselect: true });
      this.props.openSelectInvoker(this.state.setUserPin);
    }

  }
  openselectTransPrint = () => {
    this.props.startSpinner(true);
    this.setState({ modal_print_send: false })
    this.setState({ modal_print_sendselect: true });
    this.props.openSelectPrintInvoker(this.state.setUserPin);

  }
  openenterTrans = () => {
    //debugger;
    this.setState({ modal_post_voidenter: true });

  }
  openenterTransPrint = () => {
    this.setState({ modal_print_sendenter: true });

  }

  closeenterTransPrint = () => {
    this.setState({ modal_print_sendenter: false });

  }


  cancelEnterTrans = () => {
    this.setState({ modal_post_voidenter: false });

  }

  cancelSelectModal = () => {
    this.setState({ modal_post_voidselect: false });

  }
  cancelSelectPrintModal = () => {
    this.setState({ modal_print_sendselect: false });

  }
  onActiveInitial = () => {

    //  document.getElementsByClassName('carditemlayoutinitial')[0].classList.remove('carditemlayoutinitial');
    // document.getElementsByClassName('carditemlayoutinitial')[0].classList.add('carditemlayoutinitialActive');
  }
  onClosePostVoid = () => {
    this.setState({ modal_post_void: false, isPrintReceipt: false });
    sessionStorage.setItem("loggedIn", "false");
    this.props.clearLoginDataActionInvoker();
    this.getTransactionIdInvoker();
  }

  onClosePrintSend = () => {
    this.setState({ modal_print_send: false });
    sessionStorage.setItem("loggedIn", "false");
    this.props.clearLoginDataActionInvoker();
    this.getTransactionIdInvoker();
  }

  resumeallmodals = (openResume, openEnterResume, openSelectTrans) => {
    this.setState({
      modal_resume_transaction: openResume,
      modal_enter_resume: openEnterResume,
      modal_resume_select_trans: openSelectTrans,
      resume_errorModal: false
    })
  }

  closeModalAndLogout = () => {
    this.resumeallmodals(false, false, false);
    sessionStorage.setItem("loggedIn", "false");
    this.props.clearLoginDataActionInvoker();
    this.getTransactionIdInvoker();
  }

  resumeEntryUpdate = (resumeEntry) => {
    console.log('resumeentryplususerpin', this.state.setUserPin);
    this.props.startSpinner(true);
    this.props.resumeEntryUpdateActionInvoker(resumeEntry, this.state.setUserPin);
  }
  resumeopenSelectTrans = () => {
    this.resumeallmodals(false, false, true);
    this.props.openResumeSelectInvoker(this.state.setUserPin);
    this.props.startSpinner(true);
  }

  handleUserPin = (e) => {
    //alert(e.target.value)
    this.setState({ setUserPin: e.target.value })
  }

  closePedBatteryModal = () => {
    this.setState({ pedwarningmodal: false })
  }

  getPedBatteryStatus = () => {
    console.log(">>>>>getPedBatteryStatus")
    var req = json2xml(this.getStatusRequestJson);
    this.props.aurusActionInvoker(req, 'PED_BATTERY');
  }

  processPedBatteryResp = (data) => {
    clearTimeout(this.timer);
    console.log("Home: >>>>>>>processPedBatteryResp()");
    var width = "";
    var color = "green";
    try {
      if(data.GetStatusResponse.ResponseCode == "00000"){
          var pedbtrylevel = data.GetStatusResponse.SystemParamters[0].LineItem[0].ParameterValue[0];
          width = pedbtrylevel + '%';
          if( parseInt(pedbtrylevel) <= parseInt(this.state.pedbatterythresholdvalue) ){
            color = "red";
          }
          console.log("Home: Setting PED Battery Level",pedbtrylevel)
          console.log("Home: Setting PED Battery Width",width)
          console.log("Home: Setting PED Battery Color",color)
          this.setState({
            pedbatterylevel: pedbtrylevel,
            pedindicatorwidth: width,
            pedindicatorcolor: color
          })
      }else{
          this.setState({
              aurusErrorModal: true 
          })
      }
    }catch (err) {
      console.log("Exception in processPedBatteryResp", err)
    }
    this.props.aurusActionInvoker(json2xml(this.bypassRequest),"BYPASS");
  }

  exitOnLowPedBattery = () => {
    console.log("Home:exitOnLowPedBattery>>>>>>>");
    this.props.clearHomeStore();
    sessionStorage.setItem("loggedIn", "false")
    this.setState({ pedwarningmodal: false })
    this.props.startSpinner(true);
    this.getTransactionIdInvoker();
  }

  continueOnLowPedBattery = () => {
    this.setState({ pedwarningmodal: false }, () => { this.proceedWithLogin() })

  }

  callErrorException = (data) => {
    this.setState({ showLoginModal: false });
    //this.props.startSpinner(false);
    this.props.showException(data);
  }

  

  //Account Lookup Popups
  openAccountLookup = () => {
    this.setState({ custPhoneModalFlag: true });
  }
  closeAccountLookup = () => {
    this.setState({ custPhoneModalFlag: false });
  }
  render() {
    console.log('battery props' + JSON.stringify(store.getState().home));
    const POST_VOID_MODAL1_CONTENT = "Post Void Options";
    const PRINT_SEND_MODAL1_CONTENT = "Print / Send Receipt"

    const loginModal = this.state.showLoginModal ? (
      <Login handleHide={this.handleHideLogin.bind(this)} showPass={this.handleShowChangePass.bind(this)} handleUserPin={this.handleUserPin.bind(this)} callErrorException={(errorData) => this.callErrorException(errorData)} />
    ) : null;

    const changePasswordModal = this.state.showChangePassModal ? (
      <ChangePassword handleHide={this.handleHideChangePass.bind(this)} showSuccess={this.handleShowSuccessPass.bind(this)} showLogin={this.handleShowLogin.bind(this)} />
    ) : null;

    const passwordSuccessModal = this.state.passwordSuccessModal ? (
      <SuccessModal hideSuccess={this.handleHideSuccessPass.bind(this)} />
    ) : null;

    const passwordErrorModal = this.state.passwordErrorModal ? (
      <ErrorModal hideError={this.handleHideErrorPass.bind(this)} errorTitle={this.state.changePasswordErrorTitle} errorSubTitle={this.state.aurusErrorSubTitle} />
    ) : null;

    const aurusErrorModal = this.state.aurusErrorModal ? (
      <AurusErrorModal hideError={this.handleHideAurusModal.bind(this)} errorTitle={this.state.changePasswordErrorTitle} errorSubTitle={this.state.aurusErrorSubTitle} />
    ) : null;

    const transactionErrorModal = this.state.showTransErrorModal ? (

      <Modal classNames={{ modal: 'transaction-limit-modal' }} closeOnOverlayClick={false}
        open={() => {

        }}
        onClose={() => {

        }}>
        <div className="transaction-limit-modal-img">
          <img att="" src={warning}></img>
        </div>

        <div className="transaction-limit-modal-msg"> There is a technical difficulty <br /> Please Retry or call Production Support.</div>
        <div className="transaction-limit-modal-btn" onClick={() => {
          this.setState({ showTransErrorModal: false }, () => {
            this.getTransactionIdInvoker();
          })
        }}><span className="transaction-limit-modal-txt">Retry</span></div>
      </Modal>
    ) : null

    console.log('userPin: ', this.props.userPin.userPin.userPin)
    console.log('STATE:::::::::::::::::::::::::::::', this.state)

    return (<div className="backgroundImg">
      {loginModal}
      {changePasswordModal}
      {passwordSuccessModal}
      {passwordErrorModal}
      {/* {aurusErrorModal} */}
      {transactionErrorModal}
      <div className="pageContent">
        {/*'battery statau'+store.getState().home.batteryStatus.battery_level*/}
        {
          (window.innerWidth > 1900) ? (<HomeHeader history={this.props.history} batteryStatus={store.getState().home.batteryStatus.battery_level} handleShowLogin={this.handleShowLogin} pedbatterylevel={this.state.pedbatterylevel} pedindicatorcolor={this.state.pedindicatorcolor} pedindicatorwidth={this.state.pedindicatorwidth} />) : (<HomeHeaderSmall history={this.props.history} batteryStatus={store.getState().home.batteryStatus.battery_level} userPin={this.props.userPin.userPin.userPin} pedbatterylevel={this.state.pedbatterylevel}></HomeHeaderSmall>)
        }
        {/* store.getState().home.batteryStatus.battery_level */}
        <div className="landingPageButtonSection">
          {/* <div className="neiman-logo-section">
            <img src={NeimanMarcusLogo} className="neiman-logo-icon" />
          </div> */}
          <div className="buttonIcon">
            <div className="button-section-1">
              <div className="icon-section">
                <img id="1" src={Saleicon} onClick={(event) => this.handleShowLogin(event)} className="sale-icon iconadjust" />
                <div id="1" onClick={(event) => this.handleShowLogin(event)} className="Sale">Sale</div>
              </div>
              <div className="icon-section">
                <img id="2" src={CustomerIcon} onClick={(event) => this.handleShowLogin(event)} className="customer-searchicon iconadjust" />
                <div id="2" onClick={(event) => this.handleShowLogin(event)} className="customer-search">Customer Search</div>
              </div>
            </div>
            <div className="button-section-2">
              <div className="icon-section">
                <img src={ProductIcon} className="product-searchicon iconadjust" />
                {/* onClick={this.navigateToProduct} /> */}
                <div className="product-search">Product Search</div>
                {/* onClick={this.navigateToProduct}  */}
              </div>
              <div className="icon-section">
                <img id="4" src={CartIcon} onClick={(event) => this.handleShowLogin(event)} className="universal-carticon iconadjust" />
                <div id="4" onClick={(event) => this.handleShowLogin(event)} className="customer-cart">Account Lookup</div>
              </div>
            </div>
          </div>
        </div>

        {
          (window.innerWidth > 1900) ? (null) : (
            <div className="landing-page-sub-footer">
              <div className="button-section-container">
                <img src={ReceiptIcon} className="button-icon" />
                <div className="button-label-two-line">Print / Send Receipt</div>
              </div>
              <div className="button-section-container" onClick={(event) => this.handleShowLogin(event)}>
                <img src={postVoidIcon} className="button-icon" />
                <div className="button-label-one-line">Post Void</div>
              </div>
              <div className="button-section-container">
                <img src={resumeIcon} className="button-icon" />
                <div className="button-label-one-line">Resume</div>
              </div>
            </div>
          )
        }
        {this.state.modal_post_void ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={(sku) => {

          }} onClose={() => { this.onClosePostVoid() }} showCloseIcon={true}>
            <PostVoid
              //debugger
              isPrintReceipt={this.state.isPrintReceipt}
              openPostVoidModal={this.openPostVoidModal}
              openPrintEnterTrans={this.openPrintEnterTrans}
              closePrintEnterTrans={this.closePrintEnterTrans}
              openselectTrans={this.openselectTrans}
              openenterTrans={this.openenterTrans}
              closeModal1={this.onClosePostVoid}
              modalIcon={postVoidIcon}
              modalMessage={this.state.isPrintReceipt ? PRINT_SEND_MODAL1_CONTENT : POST_VOID_MODAL1_CONTENT}
              userPin={this.state.setUserPin}
            />
          </Modal>
          :
          null
        }
        {this.state.modal_print_send ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.state.modal_print_send} onClose={() => { }} showCloseIcon={true}>
            <PrintSend
              openPrintSendModal={this.openPrintSendModal}
              openenterTransPrint={this.openenterTransPrint}
              closePrintEnterTrans={this.closePrintEnterTrans}
              openselectTransPrint={this.openselectTransPrint}
              openenterTransPrint={this.openenterTransPrint}
              closeModal1={this.onClosePrintSend}
              modalIcon={ReceiptIcon}
              userPin={this.state.setUserPin}
            />
          </Modal>
          :
          null
        }
        {this.state.modal_post_voidselect ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={(sku) => {

          }} onClose={() => {

          }}>
            <PostVoidSelect
              onActiveInitial={this.onActiveInitial}
              cancelSelectModal={this.cancelSelectModal}
              history={this.props.history}
              isPrintReceipt={this.state.isPrintReceipt}
            />
          </Modal>
          :
          null
        }

        {this.state.modal_print_sendselect ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.state.modal_print_sendselect} onClose={() => {

          }}>
            <PrintSendSelect
              OpenErrorModal={this.OpenErrorModal}
              cancelSelectPrintModal={this.cancelSelectPrintModal}
              history={this.props.history}
            />
          </Modal>
          :
          null
        }
        {this.state.print_Error_Modal ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.state.print_Error_Modal} onClose={() => {

          }}>
            <PrintErrorModal
              errorModal={this.state.print_Error_Modal}
              closeInvalidErrorModal={this.closeErrorModel}

            />
          </Modal>
          :
          null
        }
        {this.state.modal_post_voidenter ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={(sku) => {

          }} onClose={() => {

          }}>
            <PostVoidEnter
              cancelEnterTrans={this.cancelEnterTrans}
              onChangeTransNumber={this.onChangeTransNumber}

            />
          </Modal>
          :
          null
        }
        {this.state.modal_print_sendenter ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.state.modal_print_sendenter} onClose={() => {

          }}>
            <PrintSendEnter
              OpenErrorModal={this.OpenErrorModal}
              closeenterTransPrint={this.closeenterTransPrint}
              onClosePrintSend={this.onClosePrintSend}
              history={this.props.history}
            />
          </Modal>
          :
          null
        }
        {this.state.modal_resume_transaction ?
          <Modal classNames={{ modal: 'resume-transaction-modal-container' }} open={(sku) => {
          }} onClose={() => {}} little showCloseIcon={false} >
            <ResumeTransaction
              resumeallmodals={this.resumeallmodals}
              resumeopenSelectTrans={this.resumeopenSelectTrans}
              closeModalAndLogout={this.closeModalAndLogout}
            />
          </Modal>
          :
          null
        }

        {this.state.modal_enter_resume ?
          <Modal classNames={{ modal: 'enter-resume-modal-container' }} open={(sku) => {
          }} onClose={() => {

          }}>

            <ResumeEnter
              resumeallmodals={this.resumeallmodals}
              resumeEntryUpdateAction={this.resumeEntryUpdate}
            />
          </Modal>
          :
          null
        }
        {this.state.modal_resume_select_trans ?
          <Modal classNames={{ modal: 'resume-select-trans-modal-container' }} open={(sku) => {
          }} onClose={() => {

          }}>

            <ResumeselectTrans
              resumeallmodals={this.resumeallmodals}
              resumeopenSelectTrans={this.resumeopenSelectTrans}
              callErrorException={(errorData) => this.callErrorException(errorData)}
              clearIsValidFlag ={this.clearIsValidFlag}
            />
          </Modal>
          :
          null
        }

        {this.state.custPhoneModalFlag ?
          <Modal open={this.state.custPhoneModalFlag}
            onClose={() => { }}
            showCloseIcon={false}
            little >
            <CustomerPhone
              clientNum={false}
              closeCustModel={this.closeAccountLookup}
              getCardsListInvoker={this.getCardsListInvoker}
              nextCustModel={this.nextCustModel}
            />
          </Modal> : null
        }

        <Modal open={this.state.resume_errorModal} little classNames={{ modal: 'sale-errorModal' }} onClose={() => {

        }}>
          <div className='sale-errorModal-container'>
            <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
            <div className="sale-errorModal-text">{this.state.warningMessages}</div>
            <button className="sale-errorModal-button" onClick={() => { this.setState({ resume_errorModal: false }) }}>
              <div className="sale-errorModal-button-text" onClick={() => { this.resumeallmodals(true, false, false)}}>OK</div>
            </button>
          </div>

        </Modal>

        <PEDBatteryModal
          pedbatterymodal={this.state.pedwarningmodal}
          closePedBatteryModal={this.closePedBatteryModal}
          exitOnLowPedBattery={this.exitOnLowPedBattery}
          continueOnLowPedBattery={this.continueOnLowPedBattery}
          pedbatterythresholdvalue={this.state.pedbatterythresholdvalue}
        ></PEDBatteryModal>

        <Footer history={this.props.history} hideTransactionId={true} />
      </div>
    </div>);
  }
  //Open the Login Modal
  onOpenModal = () => {
    //this.setState({ open: true });
    this.props.history.push('/add-customer');
  };
  //Close the Login Modal
  onCloseModal = () => {
    this.setState({ open: false });
  };
  //Close the Login Modal    
  passwordModalOpen = () => {
    this.setState({ passwordopen: true });
  };
  //Close the Login Modal
  passwordModalClose = () => {
    this.setState({ passwordopen: false });
  };
  //Close the Login Modal
  loginValidation = () => {
    console.log("loginValidation username: " + this.state.username);
    console.log("loginValidation password: " + this.state.password);
  };
  //Close the Login Modal
  handleUsernameChange = (event) => {

    this.setState({ username: event.target.value });
  };
  //Close the Login Modal
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  navigateToProduct = () => {
    this.props.history.push('/product-search');
  }
}

function mapStateToProps(state) {
  console.log('STATE--------------------------', state)
  return { home: state.home, userPin: state.userPin }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, getTransactionIdInvoker: (data) => dispatch(getTransactionRequest(data)), getPresaleFlagInvoker: (data) => dispatch(getPresaleRequest(data)),
    getSalutationsInvoker: () => dispatch(getSalutations()),
    openSelectInvoker: (pin) => dispatch(postVoidTransactionList(pin)), openSelectPrintInvoker: (pin) => dispatch(PrintSendTransactionList(pin)), setButtonClickInvoker: (buttonId) => dispatch(setButtonClick(buttonId)),
    clearSearchData: () => dispatch(clearCustomerDataAction()),
    clearCart: () => dispatch(clearCart()),
    startSpinner: (data) => dispatch(startSpinner(data)),
    clearItemSelected: (item) => dispatch(itemSelectedAction(item)),
    clearPED: () => dispatch(clearPED()),
    clearCustomerDetails: () => dispatch(clearCustomerDetailsAction()),
    clearHomeStore: () => dispatch(clearHomeStore()),
    openResumeSelectInvoker: (pin) => dispatch(openResumeSelectAction(pin)), setButtonClickInvoker: (buttonId) => dispatch(setButtonClick(buttonId)),
    resumeEntryUpdateActionInvoker: (resumeEntry, pin) => dispatch(resumeEntryUpdateAction(resumeEntry, pin)),
    showException: (data) => dispatch(showException(data)),
    aurusActionInvoker : (xmlrequest, type) =>  dispatch(getAurusResponse(xmlrequest, type)),
    clearLoginDataActionInvoker: () => dispatch(clearLoginDataAction()),
    resumeTransactionIdInvoker: (ResumeTransactionIdObject) => dispatch(resumeTransactionIdAction(ResumeTransactionIdObject))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

