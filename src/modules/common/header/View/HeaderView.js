


import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* Importing the local files*/

import './HeaderViewStyle.css';
import Modal from 'react-responsive-modal';


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


export class HeaderView extends Component {

  
  

      constructor(props)
  {
    super(props);
   
  }

   
  
  /* Render method for the component */

    render() {  
      const {match, location, history, sale} = this.props

      console.log(this.props.history.location.pathname);

     
      

      var navLinks=(
        <div className="header-navLinks"><div className="suspendIconContainer" onClick={this.props.suspendTransaction}><img src={suspendIcon} className="suspend-Icon">
        </img><span className="suspendLabel">Suspend</span> </div><div className="accountLookupIconContainer" onClick={() => history.push('customer-search')}><img src={accountLookup} className="accountLookup-Icon"></img><span className="accountLookupLabel">Account Lookup</span></div>
        <div className="voidIconContainer"><img src={postVoidIcon} className="void-Icon"></img><span className="voidLabel">Void</span></div></div>
      ); 

      const loggedInUser = sessionStorage.getItem("loggedIn") == "true" ? (
        <label className="logged-in-text" id="logged-in-text"><span>{window.innerWidth>1919 ? "Currently Logged In:" : "Logged In:"}</span> 
          &nbsp;<strong>{this.props.userPin}</strong>
          {console.log("loggedIN---ID" + this.props.userPin)}
        </label>) : null;

        return (
            <div className="headerMainCls">
            <div className="div-hamberger">
              <img src={hamburger} className="hamburger" alt="hamburger-icon"/>
            </div>
            {this.props.isSale==="true"?navLinks:""}
            <div className="div-empty-space"></div>
            <div className="header-right-container">
              <div className="div-battery-indicator">
                <div className="letter-P">P</div>
                <img
                  src={pinpadbattery}
                  className="battery-indicator-1"
                  alt="ipad-battery-icon"/>
                <img
                  src={devicebattery}
                  className="battery-indicator-2"
                  alt="pinpad-battery-icon"/>
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
                  <div className='header-suspend-yes-button' onClick={this.props.navigateToHome}>
                    <div className='header-suspend-button-text'>YES</div>
                  </div>
                </div>
              </div>
          </Modal>
          </div>
          
        );
    }

  
}