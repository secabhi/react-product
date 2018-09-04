/* Importing the required libraries and plugins*/

import React, {Component} from 'react'

/* Importing the local files*/

import './home-header-small.css';

/* Importing the resource images and icons*/
import ReceiptIcon from '../../resources/images/Receipt.svg';
import postVoidIcon from '../../resources/images/Post Void.svg';
import resumeIcon from '../../resources/images/Resume.svg';
import devicebattery from '../../resources/images/Battery Device.svg';
import pinpadbattery from '../../resources/images/Pinpad Battery.svg';
import hamburger from '../../resources/images/Hamberger.svg';
import Home from '../../resources/images/Home.svg';
import suspendIcon from '../../resources/images/Suspend.svg';
import accountLookup from '../../resources/images/AccountLookup_header.svg';

export default class HomeHeaderSmall extends Component {

  constructor(props)
  {
    super(props);
      this.state = {isSale: this.props.sale}
  }

  componentDidMount() {
    if(sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false") {
      //Hide logged in text and exit icon
      document.getElementsByClassName("div-logged-in-text-sff-home-header")[0].style.display = "none";
      document.getElementsByClassName("div-exit-sff-home-header")[0].style.display = "none";
    }
    else {
      //Show logged in text and exit icon
      document.getElementsByClassName("div-logged-in-text-sff-home-header")[0].style.display = "flex";
      document.getElementsByClassName("div-exit-sff-home-header")[0].style.display = "flex";
    }
  }

  render() {
    const {match, location, history, sale} = this.props

    var navLinks=(
      <div className="header-navLinks">
        <div className="suspendIconContainer" >
          <img src={suspendIcon} className="suspend-Icon"></img>
          <span className="suspendLabel">Suspend</span> 
        </div>
        <div className="accountLookupIconContainer" >
          <img src={accountLookup} className="accountLookup-Icon"></img>
          <span className="accountLookupLabel">Account Lookup</span></div>
        <div className="voidIconContainer" >
          <img src={postVoidIcon} className="void-Icon"></img>
          <span className="voidLabel">Void</span>
        </div>
      </div>
    );
    
    return (
      <div className="headerMainCls">
        <div className="div-hamberger">
          <img src={hamburger} className="hamburger" alt="hamburger-icon"/>
        </div>
        {this.state.isSale==="true"?navLinks:""}
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
          <div className="div-logged-in-text-sff-home-header">
            <label className="logged-in-text">
              Logged In:
              &nbsp;<strong>{this.props.userPin}</strong>
            </label>
          </div>
          <div className="div-exit-sff-home-header">
            <img
              onClick={this.navigateToHome}
              src={Home}
              className="exit-button"
              alt="exit-icon"/>
          </div>
        </div>
      </div>
    );
  }

  navigateToHome = () => {
    sessionStorage.setItem("loggedIn", "false");
    this.setState({isClienteled:false});
    document.getElementsByClassName("div-logged-in-text-sff-home-header")[0].style.display = "none";
    document.getElementsByClassName("div-exit-sff-home-header")[0].style.display = "none";
    this
      .props
      .history
      .push('/');  
  }
}