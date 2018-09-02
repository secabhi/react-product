
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* Importing the local files*/

import Modal from 'react-responsive-modal';
import HomeMenu from './HomeViewMenu'
import './HeaderViewStyle.css';


/* Importing the resource images and icons*/
import ReceiptIcon from '../../../../resources/images/Receipt.svg';
import postVoidIcon from '../../../../resources/images/Post Void.svg';
import resumeIcon from '../../../../resources/images/Resume.svg';
import devicebattery from '../../../../resources/images/Battery Device.svg';
import pinpadbattery from '../../../../resources/images/Pinpad Battery.svg';
import hamburger from '../../../../resources/images/Hamberger.svg';
import Home from '../../../../resources/images/Home.svg';
import suspendIcon from '../../../../resources/images/Suspend.svg';
import accountLookup from '../../../../resources/images/AccountLookup_header.svg';
import Warning from '../../../../resources/images/Warning.svg';
import {PrintReceiptModal} from '../../../payment/View/Components/Modals/PrintReceiptModal';

export class HeaderView extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      hamburgerOpen : false
    }   
  }

  openHamburgerMenu = () => {
    this.setState({ hamburgerOpen : true });
  }

  closeHamburgerMenu = () => {
    this.setState({ hamburgerOpen : false });
  }
  
  voidYesClickHandler = () => {
    //determines between mid void function and the cancell transaction function to be executed when yes is clicked
    if(this.props.startMidVoid) {
      this.props.closeVoid();
      this.props.startMidVoid();
    } else {
      this.props.callVoidTransactionInvoker(this.props.transactionId)
    }
  }
  
  /* Render method for the component */

  render() {  
    const {match, location, history, sale} = this.props
    console.log("HeaderView",this.props);
    var navLinks=(
      <div className="header-navLinks"><div className="suspendIconContainer" onClick={this.props.suspendTransaction}><img src={suspendIcon} className="suspend-Icon">
      </img><span className="suspendLabel">Suspend</span> </div><div className="accountLookupIconContainer" onClick={this.props.showAccountLookupModal}><img src={accountLookup} className="accountLookup-Icon"></img><span className="accountLookupLabel" >Account Lookup</span></div>
      <div className="voidIconContainer" onClick={this.props.openVoid}><img src={postVoidIcon} className="void-Icon"></img><span className="voidLabel">Void</span></div></div>
    ); 

    const loggedInUser = sessionStorage.getItem("loggedIn") == "true" ? (
      <label className="logged-in-text" id="logged-in-text"><span>{window.innerWidth>1919 ? "Currently Logged In:" : "Logged In:"}</span> 
        &nbsp;<strong>{this.props.userPin}</strong>
        {console.log("loggedIN---ID" + this.props.userPin)}
      </label>) : null;

      return (
          <div className="headerMainCls">
          <div className="div-hamberger" onClick={this.openHamburgerMenu}>
            <img src={hamburger} className="hamburger" alt="hamburger-icon"/>
          </div>
          {this.props.isSale==="true"?navLinks:""}
          <div className="div-empty-space"></div>
          <div className="header-right-container">
            <div className="div-battery-indicator">
            <div className = "ped-battery-indicator">
            <div className = "commonheader-ped-battery-color-area">
             <div className = "ped-battery-color-area-inner"
               style = {{
                width : this.props.pedindicatorwidth ,
                backgroundColor : this.props.pedindicatorcolor
              }}
            >
              </div>
            </div>
          </div>
          
          <div className = "device-battery-indicator">
            <div className = "device-battery-color-area">
              <div className = "device-battery-color-area-inner"
                style = {{
                          width : this.props.batteryStatus+'%' !='' ? this.props.batteryStatus+'%' : '100%' ,
                          backgroundColor : (this.props.batteryStatus !='') ? ( (this.props.batteryStatus+'%').slice(0,-1) <= 20 ? "red" : "green")  : "green"
                        }}
              ></div>
            </div>
          </div>

                
            </div>
            <div className="div-logged-in-text">
              {/*} <label className="logged-in-text">{(window.innerWidth > 1900) ? "Currently Logged In:":"" }
                &nbsp;<strong>{(window.innerWidth > 1900) ? "20984":"" }</strong>
      </label> */}
              {loggedInUser}
            </div>
            <div className="div-exit">
              <img
                onClick={this.props.navigateToHome}
                src={Home}
                className="exit-button"
                alt="exit-icon"/>
            </div>
          </div>
        <Modal open={Boolean(this.props.isSuspend)} onClose={() => {}} classNames={{ modal: 'header-suspend-modal'}} little showCloseIcon={false} >
            <div className='header-suspend-container'>
              <div className='header-suspend-img-icon'>
                <img src={Warning}></img>
              </div>
              <div className='header-suspend-text'>
                {"Are you sure you want to suspend the transaction?"}
              </div>
              <div className='header-suspend-buttons'>
                <div className='header-suspend-no-button' onClick={this.props.suspendTransaction}>
                  <div className='header-suspend-button-text suspend-text-no'>NO</div>
                  </div>
                <div className='header-suspend-yes-button' onClick={this.props.openPrintRecpt}>
                  <div className='header-suspend-button-text'>YES</div>
                </div>
              </div>
            </div>
        </Modal>

        <Modal open={Boolean(this.props.isVoid)} onClose={() => {}} classNames={{ modal: 'header-suspend-modal'}} little showCloseIcon={false} >
            <div className='header-suspend-container'>
              <div className='header-suspend-img-icon'>
                <img src={Warning}></img>
              </div>
              <div className='header-suspend-text'>
                {this.props.startMidVoid ? "Are you sure you want void payment transactions?" : "Are you sure you want to cancel the transaction?"}
              </div>
              <div className='header-suspend-buttons'>
                <div className='header-suspend-no-button' onClick={this.props.closeVoid}>
                  <div className='header-suspend-button-text suspend-text-no'>NO</div>
                  </div>
                <div className='header-suspend-yes-button' onClick={() => this.voidYesClickHandler()}>
                  <div className='header-suspend-button-text'>YES</div>
                </div>
              </div>
            </div>
        </Modal>
        <Modal 
        open={Boolean(this.state.hamburgerOpen)} 
        onClose={() => {}} 
        classNames={{ 
          modal: 'header-hamburger-menu-modal',
          overlay: 'header-hamburger-menu-modal-overlay'}} 
        little 
        showCloseIcon={false} 
        closeOnOverlayClick = {true}>
          <HomeMenu
            closeHamburgerMenu = {this.closeHamburgerMenu}
            enableScanOrSwipe = {this.props.enableScanOrSwipe}
           />
        </Modal>

        <PrintReceiptModal props={this.props}/>
        </div>
        
      );
  }

  
}
