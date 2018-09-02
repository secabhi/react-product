// Dependecies
import React, { Component } from 'react';
import './HeaderViewStyle.css'

import closeButton from '../../../../resources/images/Cross_White.svg';

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      hamactivated:false
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log("HomeMenu componentWillReceiveProps: ",nextProps);
  }
  applyhover = (e) => {
     
     this.setState({
      hamactivated: !this.state.hamactivated
  })

  if(this.state.hamactivated) {
    e.currentTarget.style.borderBottom = '3px solid #ffffff',
      
      e.currentTarget.style.fontWeight = '500'
  } else {
    e.currentTarget.style.borderBottom = 'none',
    e.currentTarget.style.fontWeight = '300'
  }

  this.props.enableScanOrSwipe();
}
  render() {
    return (
        <div >
            <div className="hamburgerBackground">
           
                <div className="hamburger-close-button-container">
                    <img className="hamburger-close-button-image" onClick={this.props.closeHamburgerMenu} src={closeButton}/>
                </div>
               
            </div>
            <div className="hamburgerBackgroundMainContainer">
            <div className="hamburgerMainContainer">
            <div className="Gift-Card-Inquiry"  onClick={this.applyhover}>Gift Card Inquiry</div>
            </div>
            <div className="hamburgerMainContainer">
            <div className="Unlock-Account" onClick={this.applyhover}>Unlock Device</div>
           </div>
           </div>
         
        </div>
    )
  }
};
