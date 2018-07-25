import React, { Component } from 'react';
import './GiftCard.css';

import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';

import SaleHeader from '../SaleHeader';
import GiftCardContent from './GiftCardContent/GiftCardContent';
import ScanOrSwipeGiftCard from './GiftCardContent/ScanOrSwipeGiftCard/ScanOrSwipeGiftCard';
import GiftCardAmount from './GiftCardContent/GiftCardAmount/GiftCardAmount';
import ServicesHeader from '../sale-services/services-common/ServicesHeader';
import ServicesFooter from '../sale-services/services-common/ServicesFooter';

import backArrow from '../../../resources/images/Back.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addGiftCard, validateDriversLicense } from './GiftCardAction';
import { startSpinner } from '../../common/loading/spinnerAction';


class GiftCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSkip: this.props.otherPageData.isSkip,
      cssId: this.props.customerDetails.profileData ? this.props.customerDetails.cssId : '',
      salutation: this.props.otherPageData.details ? this.props.otherPageData.details.salutation : '',
      firstname: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.names[0].firstName : '',
      lastname: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.names[0].lastName : '',
      address1: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[0] : '',
      address2: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[1] : '',
      mobile: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.phoneNumbers[0].rawValue : '',
      otherMobile: '',
      zip: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].postalCode : '',
      state: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].state : '',
      city: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].cityName : '',
      country: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].countryName : '',
      email: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.emailAddresses[0].rawValue : '',
      currentLvl: this.props.incircleData ? this.props.incircleData.data.lyBenefitLevelCode: '',
      component: '',
      validCard: false,
      validCardNumber: '',
      driversLicense_modal: false,
    }
    this.validIncreaseAmount = undefined;
  }
  render() {
    console.log('MIKE---GIFTCARD--', this)
    
    return (
      <div>

      <Header history={this.props.history} sale="true"/>

        <SaleHeader 
          pageName="Sale"
          cssId={this.state.cssId}
          salutation={this.state.salutation}
          firstName={this.state.firstname}
          lastName={this.state.lastname}
          currentLvl={this.state.currentlvl}
          skipCustomerInfo={this.state.isSkip}
          address1={this.state.address1}
          address2={this.state.address2}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip}
        />

      <ServicesHeader>
        <div className="giftcard-header-container">
          <img className="giftcard-header-arrow" src={backArrow} alt="backarrow" onClick={()=>{this.navigateToSale()}}/>
          <div className="giftcard-header-divider"></div>
          <div className="giftcard-header-text">Gift Card</div>
        </div>
      </ServicesHeader>


      <GiftCardContent 
        component={this.state.component}
        validCardNumber={this.state.validCardNumber}
        validIncreaseAmount={this.state.validIncreaseAmount}
        licenseModal={this.state.driversLicense_modal}
        validateCard={(value) => {this.isValidCard(value)}} 
        getCardNumber={(value) => {this.getCardNumber(value)}}
        getIncreaseAmount={(value) => {this.getIncreaseAmount(value)}}
        closeDLmodal={this.closeDriversLicenseModal}
        componentToRender={(value) => this.componentToRender('purchaser')}
        currentLvl={this.currentlvl}
        cssId={this.state.cssId}
        skipCustomerInfo={this.state.isSkip}
        salutation={this.state.salutation}
        firstName={this.state.firstname}
        lastName={this.state.lastname}
        address1={this.state.address1}
        address2={this.state.address2}
        cssId={this.state.cssId}
        mobile={this.state.mobile}
        otherMobile={this.state.otherMobile}
        city={this.state.city}
        state={this.state.state}
        email={this.state.email}
        country={this.state.country}
        zip={this.state.zip}
        customerDetails={this.props.customerDetails}
        />


      <ServicesFooter>
        <div className="giftcard-cancel" onClick={() => {this.navigateToSale()}}>
          <span className="giftcard-cancel-text">Cancel</span>
        </div>

        <div className={this.state.validCard ? 'giftcard-next' : 'giftcard-next-disabled'}
          onClick={() => {
            if(this.validIncreaseAmount > 1000) {
                this.openDriversLicenseModal();
              }
            if(this.state.component ===' purchaser') {
                this.navigateToSale();
            }
            else {
                this.componentToRender('giftCardAmount');
              }
            }}>
          <span className="giftcard-next-text">Next</span>
        </div>
      </ServicesFooter>

      <Footer />
      </div>
    )
  }

  navigateToSale = () => {
    this.props.history.push('/sale')
  }

  openDriversLicenseModal = () => {
    this.setState({driversLicense_modal: true})
  }
  closeDriversLicenseModal = () => {
    this.setState({driversLicense_modal: false})
  }

  isValidCard = (value) => {
    let validNumber = value;
    if(validNumber.length === 19) {
      console.log('mike-in if statement', validNumber)
       this.setState({validCard: true})
    }
    else {
      this.setState({validCard: false})
    }
  }

  getCardNumber = (value) => {
    let cardNumber = value;
    this.setState({validCardNumber:cardNumber})
  }

  getIncreaseAmount = (value) => {
    let amount = value;
    this.validIncreaseAmount = amount;
  }

  componentToRender = (value) => {
    let component = value;
    this.setState({component:component})
  }


  //API CALLS

  validateLicenseCall = () => {
    const licenseObj = {
      "Store" : "58",
      "RegisterName" : "P198216",
      "Date" : "20180615",
      "Time" : "154533",
      "AssocID" : "163125",
      "TransactionId" : "0011",
      "ClientNum" : "00002312412",
      "Purpose" : "CHECK",
      "DeviceType" : "",
      "Base64Data" : ""
    }


  }

  addGiftCardCall = () => {
    const cart = this.props.cart.data.cartItems;
    const giftCardObj = {
      "ItemNumber" : "",
      "TransactionId" : cart.transactionId,
      "IsGiftCard" : true,
      "GiftCardNumber" : "2100100400303718",
      "ItemDesc" : "NM Expss Card",
      "Quantity" : "1",
      "SalePrice" : 2000,
      "Customer_Salutation" : "MR.",
      "Customer_FirstName" : "JEYAGANESH",
      "Customer_LastName" : "SUNDARARAJAN",
      "Customer_Address_Line1" : "6900 PRESTON RD",
      "Customer_City" : "PLANO",
      "Customer_State" : "TX",
      "Customer_Zip" : "75024",
      "Customer_DLNumber" : "1234567",
      "Customer_DLState" : "TX"
    }

    this.props.startSpinner(true);
    this.props.addGiftCard(giftCardObj);
    // this.navigateToSale();

  }
  
};

// CREATE CONDITIONAL FUNC TO ADD EXRA FIELDS TO THE ADDCUSTOMERFORM




function mapStateToProps({ customerDetails, sale, cart }) {
  return { 
    cart,
    otherPageData: sale.otherPageData,
    customerDetails
          }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addGiftCard:addGiftCard,
    validateDriversLicense:validateDriversLicense,
    startSpinner:startSpinner
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard);
