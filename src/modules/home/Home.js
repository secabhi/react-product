import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import {postVoidTransactionList} from '../post-void/postVoidAction';
import Login from '../login/controller/login';
import ChangePassword from '../change-password/controller/changePassword';
import SuccessModal from './success-modal/successModal';
import ErrorModal from './error-modal/errorModal';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import HomeHeader from './home-header';
import HomeHeaderSmall from './home-header-small'
import PostVoidSelect from '../post-void/postVoidSelect'
import PostVoidEnter from '../post-void/postVoidEnter';
import  PostVoid from '../post-void/postVoid';
import Saleicon from '../../resources/images/Sale_bttn.svg';
import CustomerIcon from '../../resources/images/Customer_Search_bttn.svg';
import CartIcon from '../../resources/images/Account_Lookup_bttn.svg';
import BrandIcon from '../../resources/images/NeimanLogo.gif';
import ProductIcon from '../../resources/images/Product_Search_bttn.svg';
import ReceiptIcon from '../../resources/images/Receipt.svg';
import postVoidIcon from '../../resources/images/Post Void.svg';
import resumeIcon from '../../resources/images/Resume.svg';
import clockIcon from '../../resources/images/Clock.svg';
import ipadBattery from '../../resources/images/Ipad Battery Level.svg';
import pinpadBattery from '../../resources/images/Pinpad Battery Level.svg';
import userLogin from '../../resources/images/Associate-Login.svg';
import NeimanMarcusLogo from '../../resources/images/Neiman_Marcus_logo.svg'

import { getTransactionRequest, setButtonClick, getSalutations } from './HomeAction';
import { getTransactionId } from './HomeSelector';
import {clearCustomerDataAction} from '../customer-search-sale/actions';
import {clearCart} from '../sale/SalesCartAction';
import {itemSelectedAction} from '../common/cartRenderer/actions';
import {clearCustomerDetailsAction} from '../customer-details/CustomerDetailsActions';

import './home.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { testAction } from './actions';



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      passwordopen:false,
      username:"",
      password:"",
      modal_post_void :false,
      modal_post_voidenter:false,
      modal_post_voidselect:false,
      showLoginModal: false,
      showChangePassModal : false,
      passwordSuccessModal: false,
      passwordErrorModal: false,

      changePasswordErrorTitle: 'Error',
      changePasswordErrorSubTitle: 'Your Password was not changed',
      iconClick: ""
    };

    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleHideLogin = this.handleHideLogin.bind(this);
    this.handleShowChangePass = this.handleShowChangePass.bind(this);
    this.handleHideChangePass = this.handleHideChangePass.bind(this);
    this.handleShowSuccessPass = this.handleShowSuccessPass.bind(this);
    this.handleHideSuccessPass = this.handleHideSuccessPass.bind(this);
    this.handleShowErrorPass = this.handleShowErrorPass.bind(this);
    this.handleHideErrorPass = this.handleHideErrorPass.bind(this);
  }


  componentDidMount() {
    console.log("Home did mount");
    console.log("loggedIn: ",sessionStorage.getItem("loggedIn"));
    this.getTransactionIdInvoker();
    this.getSalutationsInvoker();
    this.props.clearSearchData();
    this.props.clearCart();
    this.props.clearItemSelected("");
    this.props.clearCustomerDetails();
  }

  
  getTransactionIdInvoker() {
    let requestData = {
      /* ClientID:"0010:0168:05092018:033639",
      ClientTypeID:"1000",
      SourceApp:"POS",
      StoreAssoc:"111000",
      StoreNumber:"0010",
      RegisterNumber:"0168" */
      ClientID:"0010:0216:06082018:033639",
      ClientTypeID:"1000",
      SourceApp:"MPOS",
      StoreNumber:"0010",
      RegisterNumber:"0216",
      StoreAssoc:this.props.userpin,
    };
    this.props.getTransactionIdInvoker(requestData);
  }

  getSalutationsInvoker() {
    this.props.getSalutationsInvoker();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.home.loginSuccess === true) {
      if(nextProps.home.response.Output.Response_Code === "PW_SUCCESS" || nextProps.home.response.Output.Response_Code === "PW_ABOUTTOCHANGE") {
        //alert("Logged In Success");
        //var iconName = event.target.id;
        this.props.setButtonClickInvoker(this.state.iconClick);
        if(this.state.iconClick == "1"){
          this.props.history.push('/customer-search');
        } else if(this.state.iconClick == "2"){
          this.props.history.push('/customer-search');
        } else if(this.state.iconClick == "3"){
          this.props.history.push('/product-search');
        } else if(this.state.iconClick == "4"){
          this.props.history.push('/lookup-dummy');
        }
      }
      console.log("LOGIN RESPONSE: ",nextProps.home.response);
    }

    console.log("^%^%^^%^%^%^%^FOR RESUME TRANSACTION",nextProps);
    if(nextProps.home.getResumeDatasFrom === 'RESUME_TRANSACTIONS_SUCCESS'){
      this.navigateToResumeTransaction();
    }

    if(nextProps.home.navigateToPostVoidDetails === true) {
      this.props.history.push('/postvoiddetails');
    }
  }
  
  navigateToResumeTransaction = () =>{
    this.props.history.push('/resume-transactions');
    this.props.startSpinner(false);
  }

  handleShowLogin(event) {
    if(sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false") {
      this.setState({showLoginModal: true, iconClick: event.target.id});
    } else {
      var iconName = event.target.id;
      this.props.setButtonClickInvoker(iconName);
      if(iconName == "1"){
        this.props.history.push('/customer-search');
      } else if(iconName == "2"){
        this.props.history.push('/customer-search');
      } else if(iconName == "4"){
        this.props.history.push('/lookup-dummy');
      }
    }
  }
  
  handleHideLogin() {
    this.setState({showLoginModal: false});
  }

  handleShowChangePass() {
    this.setState({showChangePassModal: true});
  }
  
  handleHideChangePass() {
    this.setState({showChangePassModal: false});
  }

  handleShowSuccessPass() {
    this.setState({passwordSuccessModal: true});
  }
  
  handleHideSuccessPass() {
    this.setState({passwordSuccessModal: false});
  }

  handleShowErrorPass() {
    this.setState({passwordErrorModal: true});
  }

  handleHideErrorPass() {
    this.setState({passwordErrorModal: false});
  }
  openPostVoidModal = () => {
    this.setState({modal_post_void:true})
    
  }
  openselectTrans = () => {
   
    this.setState({modal_post_void:false})
    this.setState({modal_post_voidselect:true});
    this.props.openSelectInvoker();
    
  }
  openenterTrans = () => {
    this.setState({modal_post_voidenter:true});
    
  }
  cancelEnterTrans = () => {
    this.setState({modal_post_voidenter:false});
    
  }
  cancelSelectModal = () => {
    this.setState({modal_post_voidselect:false});
    
  }
  onActiveInitial = () => {
    
  //  document.getElementsByClassName('carditemlayoutinitial')[0].classList.remove('carditemlayoutinitial');
   // document.getElementsByClassName('carditemlayoutinitial')[0].classList.add('carditemlayoutinitialActive');
  }
  onClosePostVoid = () => {
    this.setState({modal_post_void:false});
    
  }
  
  render() {

    const loginModal = this.state.showLoginModal ? (
      <Login handleHide={this.handleHideLogin.bind(this)} showPass={this.handleShowChangePass.bind(this)} />
    ) : null;

    const changePasswordModal = this.state.showChangePassModal ? (
      <ChangePassword handleHide={this.handleHideChangePass.bind(this)} showSuccess={this.handleShowSuccessPass.bind(this)} showLogin={this.handleShowLogin.bind(this)} />
    ) : null;

    const passwordSuccessModal = this.state.passwordSuccessModal ? (
      <SuccessModal hideSuccess={this.handleHideSuccessPass.bind(this)} />
    ) : null;

    const passwordErrorModal = this.state.passwordErrorModal ? (
      <ErrorModal hideError={this.handleHideErrorPass.bind(this)} errorTitle={this.state.changePasswordErrorTitle} errorSubTitle={this.state.changePasswordErrorSubTitle} />
    ) : null;

    console.log('userPin: ', this.props.userPin.userPin.userPin)

    return (<div className="backgroundImg">
    {loginModal} 
    {changePasswordModal}
    {passwordSuccessModal}
    {passwordErrorModal}
   <div className="pageContent">

      {
        (window.innerWidth > 1900) ? (<HomeHeader history={this.props.history}/>) : (<HomeHeaderSmall history={this.props.history} userPin={this.props.userPin.userPin.userPin}></HomeHeaderSmall>)
      }

      <div className="landingPageButtonSection">
        <div className="neiman-logo-section">
            <img src={NeimanMarcusLogo} className="neiman-logo-icon" />
        </div>
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
                    <img src={ProductIcon} onClick={this.navigateToProduct} className="product-searchicon iconadjust" />
                    <div onClick={this.navigateToProduct} className="product-search">Product Search</div>
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
            <div className="button-section-container" onClick={this.openPostVoidModal}>
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

        }}onClose={() => {this.onClosePostVoid}} showCloseIcon={true}>
          <PostVoid
            openPostVoidModal={this.openPostVoidModal}
            openselectTrans={this.openselectTrans}
            openenterTrans={this.openenterTrans}
            onClosePostVoid={this.onClosePostVoid}
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
  />
</Modal>
:
null
}
      <Footer hideTransactionId={true}/>
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
    this.setState({ username : event.target.value });
  };
//Close the Login Modal
  handlePasswordChange = (event) => {
    this.setState({ password : event.target.value });
  };
  
  navigateToProduct = () => {
    this.props.history.push('/product-search');
  }
}

function mapStateToProps(state) {
  console.log('STATE--------------------------', state)
  return { home : state.home, userPin: state.userPin }
}

function mapDispatchToProps(dispatch) {
  return { dispatch, getTransactionIdInvoker: (data) => dispatch(getTransactionRequest(data)),
    getSalutationsInvoker: () => dispatch(getSalutations()),
    openSelectInvoker :()=>dispatch(postVoidTransactionList()) ,setButtonClickInvoker: (buttonId) => dispatch(setButtonClick(buttonId)),
    clearSearchData : ()=> dispatch(clearCustomerDataAction()),
    clearCart : ()=>dispatch(clearCart()),
    clearItemSelected : (item)=>dispatch(itemSelectedAction(item)),
    clearCustomerDetails : () => dispatch(clearCustomerDetailsAction())};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

