import React, { Component } from 'react';
import './GiftCardAmount.css';

import {TextField} from 'material-ui';
import InputMask from 'react-input-mask';

import { DriversLicenseModal, 
         CustomerServiceModal, 
         ExceedsAmountModal, 
         ConfirmDriversLicenseModal } from '../GiftCardModals/GiftCardModals';
// import { fn } from '../../../../../../node_modules/moment';

export default class GiftCardAmount extends Component {
  constructor(props) {
    super(props);
      this.state = {
        increaseAmount: '',
        exceedsAmount_modal: false,
        customerService_modal: false,
        confirmLicenseModal: false,
        firstName: '',
        lastName: '',
        changedField: {
          giftcard_amount: ''
        },
        giftcard_amount_error:'',
        fields: {},
        errors: {}
      }

      this.customerService_modal = false;
      this.confirmLicenseModal = false;
      this.isValid = true;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.GC_data != prevProps.GC_data) {
  //     this.props.getGiftCardClass();
  //   } 
  //   // else {
  //   // CALL AURUS BALANCE ENQUIRY
  //   // }
  // }


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
    const errorStyle = {
      paddingTop: '15px',
      height: '28px',
      fontFamily: 'Roboto',
      fontSize: '22px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.21',
      letterSpacing: '2px',
      textAlign: 'right',
      color: '#d53560'
}
  const mask = ("99.99" || "2000.00")

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2,
  // });
  console.log(" cardBalanceinqDetails --> ",this.props.cardBalanceinqDetails)
    return (
      <div className="giftcard-amount-container">

        <div className="giftcard-amount-label">
          <div className="giftcard-amount-text">Gift Card Number</div>
          <div className="giftcard-amount-data">{this.props.validCardNumber}</div>
        </div>

         <div className="giftcard-amount-label">
          <div className="giftcard-amount-text">Available Balance</div>
          <div className="giftcard-amount-data">{this.props.cardBalanceinqDetails}</div>
        </div>

        <TextField className="giftcard-amount-textfield"
          value={this.state.increaseAmount}
          onChange={(e) => { this.getGiftCardAmount(e) }}
          onBlur={(e) => { this.validateGiftCardAmount(e) }}
          style={textFieldStyle}
          floatingLabelText="Enter Increase Amount"
          floatingLabelStyle={textFieldFloatingLabelStyle}                    
          inputStyle = {textFieldInputStyle}
          underlineStyle= {underlineStyle}
          refs="giftcard_amount"
          type="number"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
          }}
          errorText={this.state.giftcard_amount_error}
          errorStyle={errorStyle}
          // type="text"
          // onInput={(e) => {
          //    e.target.value = Math.max(2000, parseInt(e.target.value)).toString().slice(0, 6)
          //     }}
          // inputProps={{
          //   min:"10",
          //   max:"2000",
          //   step: "1"
          // }}
        >
          {/* <InputMask mask={mask} maskChar=" " /> */}
        </TextField>

        {/* OPTIONAL TEXTFIELD ADDED */}
         {/* <input
          className="giftcard-amount-textfield"
          type="number"
          min="0.01" 
          step="0.01" 
          max="2000"
          onChange={(e) => {this.getGiftCardAmount(e)}}
          name="input">
        </input> */}

        <div className="optional-textfields">
        <TextField className="recipient-fname-textfield"
          value={this.state.firstName}
          onChange={(e) => {this.getFirstName(e)}}
          style={textFieldStyle}
          floatingLabelText="Recipient First Name (Optional)"
          floatingLabelStyle={textFieldFloatingLabelStyle}                    
          inputStyle = {textFieldInputStyle}
          underlineStyle= {underlineStyle}
        />

        <TextField className="recipient-lname-textfield"
          value={this.state.lastName}
          onChange={(e) => {this.getLastName(e)}}
          style={textFieldStyle}
          floatingLabelText="Recipient Last Name (Optional)"
          floatingLabelStyle={textFieldFloatingLabelStyle}                    
          inputStyle = {textFieldInputStyle}
          underlineStyle= {underlineStyle}
        />
        </div>


        <ExceedsAmountModal 
          open={this.state.exceedsAmount_modal}
          close={() => this.closeModals()}
        />

        <DriversLicenseModal
          open={this.props.licenseModal}
          close={this.props.closeDLmodal}
          validateDriversLicense={() => this.validateDriversLicense()}
          getDLNumber={(value) => {this.props.getDLNumber(value)}}
        />

        <ConfirmDriversLicenseModal
          open={this.state.confirmLicenseModal}
          close={() => this.closeModals()}
          componentToRender={(value) => {this.props.componentToRender(value)}}
          aurusIssueGiftCard={this.props.aurusIssueGiftCard}
        />

        <CustomerServiceModal
          open={this.state.customerService_modal}
          close={() => this.closeModals()}
        />

      </div>
    )
  }

  validateDriversLicense = () => {
    // console.log('license value', value)
    // let license = Number(value);
    
    // if(license === 123456789) {
    //   this.openConfirmLicenseModal();
    // } else {
    //   this.openCustomerServiceModal();
    //   }
    this.props.validateLicenseCall()

  }

  // openConfirmLicenseModal = () => {
  //   this.props.closeDLmodal();
  //   this.setState({
  //     confirmLicenseModal: true
  //    })
  //   // this.confirmLicenseModal = true
  //    console.log('conf modal state', this.state.confirmLicenseModal)
  // }

  // openCustomerServiceModal = () => {
  //   this.props.closeDLmodal();
  //   this.setState({
  //     customerService_modal: true
  //   })
  //   // this.customerService_modal = true;
  //   console.log('customer modal state', this.state.customerService_modal)
  // }


  validateGiftCardAmount = (e) => {
    let amount = e.target.value
   
    if (amount >= 1000 && amount <= 2000) {
      this.setState({
        exceedsAmount_modal: true,
      })
    }

    if ((this.props.cardBalanceinqDetails +amount) >= 2000 ) {
      this.setState({
        exceedsAmount_modal: true,
      })
    }

    this.setState({giftcard_amount_error:''})

    if (amount < 10 || amount > 2000) {
      let fields = this.state.fields;
      let errors = this.state.errors;
      let amountValidation = true;

      errors = 'Gift Cards must range between $10 and $2000';
      this.setState({ giftcard_amount_error: errors })

    }
  }


  getGiftCardAmount = (e) => {
    // let fields = this.state.fields;
    // fields[field] = e.target.value;
    // let errors = this.state.errors;
    // errors[field] = "";
    // var changedAddress = this.state.changedAddress;
    // changedAddress[field] = e.target.value;
    // this.setState({errors:errors,fields : fields});

    let amount = e.target.value
    this.setState({ increaseAmount: amount })
    if(amount == '')
    this.setState({ giftcard_amount_error: '' })
    if (amount < 10 || amount > 2000) {
      let fields = this.state.fields;
      let errors = this.state.errors;
      let amountValidation = true;
      
      errors = 'Gift Cards must range between $10 and $2000';  

    }else{
      this.setState({ giftcard_amount_error: '' })
    }

      this.props.getIncreaseAmount(amount)

      // max is between 10-2000
      // if more than 1000 driver license pop up. license must be scanned not inputed
  }

   // GIFT CARD PRICE VALIDATION FOR TEXTFIELD
  // handleAmountValidation = () => {
  //   let fields = this.state.fields;
  //   let errors = {};
  //   let amountValidation = true;
  //   this.isValid = false;
  // TESTING FUNCTIONALITY
  //   if(fields['giftcard-amount'] < 10 || fields['giftcard-amount'] > 2000 ) {
  //     errors['giftcard-amount'] = 'Gift Cards must range between $10 and $2000';  
  //     amountValidation = false;
  //   }

  // }

  getFirstName = (e) => {
    let fname = e.target.value;
    this.setState({firstName: fname})
    this.props.getRecipientFirstName(fname);
  }

  getLastName = (e) => {
    let lname = e.target.value;
    this.setState({lastName: lname})
    this.props.getRecipientLastName(lname);
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

  // 
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
