import React, { Component } from 'react';
import './GiftCardAmount.css';

import {TextField} from 'material-ui';
import InputMask from 'react-input-mask';


import {DriversLicenseModal, CustomerServiceModal, ExceedsAmountModal, ConfirmDriversLicenseModal} from '../GiftCardModals/GiftCardModals';

export default class GiftCardAmount extends Component {
  constructor(props) {
    super(props);
      this.state = {
        increaseAmount: '',
        exceedsAmount_modal: false,
        customerService_modal: false,
        confirmLicenseModal: false
      }

      this.customerService_modal = false,
      this.confirmLicenseModal = false
  }


  render() {
    const textFieldFloatingLabelStyle = {
      height: '28px',
      fontFamily: 'Roboto',
      fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
      fontWeight: '300',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#333333',
  }
    const textFieldInputStyle = {
      width: (window.innerWidth > 1900) ? "619.5px" : "738px",
      // height: "18px",
      fontFamily: "Roboto",
      fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
      letterSpacing: "normal",
      textAlign: "left",
      color: "#333333",
      paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
      paddingLeft : (window.innerWidth > 1900) ? "10px" : "10px",
  }
    const textFieldStyle = {
      height: '60px',
      width: '619.5px',
      maxWidth: '680px',
      paddingTop: (window.innerWidth > 1900) ? '22.2px' : '55px',
      paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
  }
    const underlineStyle = {
      borderColor: '#757575'
  }
  const mask = ("99.99" || "999.99")

    return (
      <div className="giftcard-amount-container">

        <div className="giftcard-amount-label">
          <div className="giftcard-amount-text">Gift Card Number</div>
          <div className="giftcard-amount-data">{this.props.validCardNumber}</div>
        </div>

        <TextField className="giftcard-amount-textfield"
          value={this.state.increaseAmount}
          onChange={(e) => {this.getGiftCardAmount(e)}}
          style={textFieldStyle}
          floatingLabelText="Enter Increase Amount"
          floatingLabelStyle={textFieldFloatingLabelStyle}                    
          inputStyle = {textFieldInputStyle}
          underlineStyle= {underlineStyle}
        >
          {/* <InputMask mask={mask} maskChar=" " /> */}
        </TextField>

        <ExceedsAmountModal 
          open={this.state.exceedsAmount_modal}
          close={() => this.closeModals()}
        />

        <DriversLicenseModal
          open={this.props.licenseModal}
          close={this.props.closeDLmodal}
          validateDriversLicense={(value) => this.validateDriversLicense(value)}
        />

        <ConfirmDriversLicenseModal
          open={this.state.confirmLicenseModal}
          close={() => this.closeModals()}
          componentToRender={(value) => {this.props.componentToRender(value)}}
        />

        <CustomerServiceModal
          open={this.state.customerService_modal}
          close={() => this.closeModals()}
        />

      </div>
    )
  }

  // componentDidUpdate() {
  //   console.log('mike type of amount', typeof this.state.increaseAmount)
  //   if(this.state.increaseAmount >= '900') {
  //     this.setState({
  //       exceedsAmount_modal: true,
  //       increaseAmount: ''
  //     })
  //   }
  // }

  validateDriversLicense = (value) => {
    console.log('license value', value)
    let license = Number(value);
    if(license === 123) {
      this.openConfirmLicenseModal();
    } else {
      this.openCustomerServiceModal();
      }
  }

  openConfirmLicenseModal = () => {
    this.props.closeDLmodal();
    this.setState({
      confirmLicenseModal: true
     })
    // this.confirmLicenseModal = true
     console.log('conf modal state', this.state.confirmLicenseModal)
  }

  openCustomerServiceModal = () => {
    this.props.closeDLmodal();
    this.setState({
      customerService_modal: true
    })
    // this.customerService_modal = true;
    console.log('customer modal state', this.state.customerService_modal)
  }


  getGiftCardAmount = (e) => {
    let amount = Number(e.target.value)
    
    this.setState({increaseAmount: amount})

    if(amount >= 900) {
          this.setState({
            exceedsAmount_modal: true,
          })
    }
    // if(amount > 1000) {
      this.props.getIncreaseAmount(amount)
    // }
      console.log('actual-value-----mike', this.state)

      // max is between 10-2000
      // if more than 1000 driver license pop up. license must be scanned not inputed
      // 

  }
  
  closeModals = () => {
    this.setState({
      exceedsAmount_modal: false,
      driversLicense_modal: false,
      customerService_modal: false,
      confirmLicenseModal: false,
      // increaseAmount: ''
    })
  }

  // validateGiftCardAmount = () => {
  //   // static limit for now...
  //   
  //   if(this.state.increaseAmount >= '900') {
  //     this.setState({
  //       exceedsAmount_modal: true,
  //       increaseAmount: ''
  //     })
  //   }
  // }



};
