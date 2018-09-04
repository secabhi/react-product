import React, { Component } from 'react';
import './GiftCard.css';
import backArrow from '../../../resources/images/Back.svg';
import clearallbtn from '../../../resources/images/Close_Bttn_Purple.svg';
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import SaleHeader from '../SaleHeader';
import GiftCardContent from './GiftCardContent/GiftCardContent';
import ServicesHeader from '../sale-services/services-common/ServicesHeader';
import ServicesFooter from '../sale-services/services-common/ServicesFooter';
import Modal from 'react-responsive-modal';
import warningIcon from '../../../resources/images/Warning.svg';
import {
  DriversLicenseModal,
  CustomerServiceModal,
  ExceedsAmountModal,
  ConfirmDriversLicenseModal,
  MaxGiftCardAmountModal
} from './GiftCardContent/GiftCardModals/GiftCardModals';

import { pluck, map, each } from 'underscore';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addGiftCardAction,
  validateDriversLicenseAction,
  getGiftCardDetailsAction,
  getGiftCardClassAction,
  getOldnNewGiftCardNumAction,
  updateGiftCardReloadAction,
  fincenValidationAction,
  clearAllGiftCardDataAction,
} from './GiftCardAction';

import { attachCustomerAction } from '../../home/HomeAction';

import { getAurusResponse } from '../../payment/Controller/paymentActions';
import { startSpinner } from '../../common/loading/spinnerAction';
import { json2xml } from '../../common/helpers/helpers';
const CONFIG_FILE = require('../../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;

// AURUS JSON
this.aurusVars = require("../../../resources/aurus/aurusVars.json");
this.TransRequestJson = require("../../../resources/aurus/TransRequest_GiftCard.json");
this.getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
this.UpdateRequestScanJson = require("../../../resources/aurus/UpdateRequestScan.json")
this.closeTransJson = require("../../../resources/aurus/CloseTran.json");

class GiftCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSkip: this.props.otherPageData.isSkip,
      cssId: this.props.customerDetails.profileData ? this.props.customerDetails.cssId : '',
      salutation: this.props.otherPageData.details ? this.props.otherPageData.details.salutation : '',
      firstname: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.names[0].firstName :  this.props.customerDetails.firstName,
      lastname: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.names[0].lastName :  this.props.customerDetails.lastName,
      address1: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[0] : this.props.customerDetails.selectedAddress.Addr1,
      address2: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[1] : this.props.customerDetails.selectedAddress.Addr2,
      mobile: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.phoneNumbers[0].rawValue :this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneNumber,
      otherMobile: '',
      zip: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].postalCode: this.props.customerDetails.selectedAddress.Zip,
      state: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].state : this.props.customerDetails.selectedAddress.State,
      city: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].cityName :this.props.customerDetails.selectedAddress.City,
      country: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.physicalAddresses[0].countryName :this.props.customerDetails.selectedAddress.country,
      email: this.props.customerDetails.profileData ? this.props.customerDetails.profileData.emailAddresses[0].rawValue :this.props.customerDetails.emailAddresses,
      currentLvl: this.props.incircleData ? this.props.incircleData.data.lyBenefitLevelCode : '',
      component: '',
      totalComponent: [],
      validCard: false,
      validCardNumber: '',
      driversLicense_modal: false,
      exceedsAmount_modal: false,
      customerService_modal: false,
      confirmLicenseModal: false,
      maxGiftCardLimit_modal: false,
      giftcardError:'',
      invalidGiftCardNumber: false,
      same_giftCardNumber: false,
      cardBalanceinqDetails: '',
      cardClassAPIerror :false,
      cardClassAPIerrorMessage:""
    }

    this.validIncreaseAmount = undefined;
    this.recipientFirstName = undefined;
    this.recipientLastName = undefined;
    this.base64License = undefined;
    this.driversLicense = undefined;
    this.classNum = undefined;
    // Drivers License Data
    this.DL_firstName = undefined;
    this.DL_lastName = undefined;
    this.DL_address = undefined;
    this.DL_city = undefined;
    this.DL_state = undefined;
    this.DL_zipCode = undefined;
    this.DL_number = undefined;
    this.DL_dob = undefined;
    this.DL_customerServiceCode = undefined;
    // this.tax - HARD CODED FOR TESTING - TO BE REMOVED
    this.tax = 2.00;

    // AURUS JSON
    this.aurusVars = require("../../../resources/aurus/aurusVars.json");
    this.TransRequestJson = require("../../../resources/aurus/TransRequest_GiftCard.json");
    this.getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
    this.UpdateRequestScanJson = require("../../../resources/aurus/UpdateRequestScan.json")
    this.closeTransJson = require("../../../resources/aurus/CloseTran.json");
  }

  componentWillMount() {
    //GIFT CARDS SHOULD BE PART OF THEIR OWN ARRAY

    // FUNCTION TO MAKE SURE NO MORE THAN 5 GIFTCARDS ARE PART OF THE CART/TRANSACTION
    // -----FIX FOR NOW-----
    
    let giftCards = this.props.cart.data.data !== undefined ? this.props.cart.data.cartItems.items : [];

    for (let i = 0; i < giftCards.length; i++) {
      let arr = giftCards[i]

      return arr.filter((item, count) => {
        if (count + (item.itemDesc === 'NM Expss Card') === 5) {
          this.setState({ maxGiftCardLimit_modal: true })
        }
      }, 0)
    }

  }

  componentDidMount() {
  
  }

  componentDidUpdate() {

  }


  componentWillReceiveProps(nextProps) {
   
    if (nextProps.giftCard.dlData.curValidCode === 'CKVA') {
      this.openConfirmLicenseModal();
      // this.setState({confirmLicenseModal: false})
      this.getFincenValidation();

    } else if (nextProps.giftCard.dlData.curValidCode === 'CKUR') {
      this.openCustomerServiceModal();
      //this.props.startSpinner(false);
    }

    if(nextProps.Payment.getGiftCardBinRes !== this.props.Payment.getGiftCardBinRes){
        console.log("---------> NEXTPROPS CALLING GIFTCARDDETAILS INVOKER--------------->");
        console.log("SHIV GCDATA initial",nextProps.Payment.getGiftCardBinRes)
        console.log("SHIV GCDATA initial",this.props.Payment.getGiftCardBinRes)
        this.getCardDetalsApiInvoker(nextProps.Payment.getGiftCardBinRes)
    }

    if(nextProps.giftCard.gcData.message === null && nextProps.giftCard.gcData.message !== this.props.giftCard.gcData.message){
        console.log("---------> NEXTPROPS CALLING AURUS BALANCE ENQUIRY--------------->");
        console.log("SHIV GCDATA initial",this.props.giftCard.gcData.message)
        setTimeout(this.aurusGetBalanceEnquiry(nextProps.Payment.getGiftCardBinRes.GetCardBINResponse), 500);
    }
    // else if(nextProps.giftCard.gcData.message === "record not found"){
    //   this.setState({invalidGiftCardNumber:true})
    // }

    if(nextProps.Payment.giftCardBalanceinqRes !== this.props.Payment.giftCardBalanceinqRes){
        console.log("---------> NEXTPROPS CALLING GETCARDCLASS INVOKER--------------->")
        // create object to add
        this.getCardclassInvoker(nextProps.Payment.giftCardBalanceinqRes);
    }

    if(nextProps.giftCard.gcData.message === null && nextProps.giftCard.gcData.message !== this.props.giftCard.gcData.message){
      console.log("---------> NEXTPROPS CALLING AMOUNT NAVIGATION FUNCTION--------------->")
      this.componentRender_Amount(nextProps.giftCard.gcData)
    }

    if(nextProps.giftCard.data.response_text === "AC_SUCCESS" && nextProps.giftCard.gcData.status == 'success'){
        this.navigateToSale();
        nextProps.giftCard.data.response_text = '';
    }

      this.DL_firstName = nextProps.giftCard.dlData.dl_name1;
      this.DL_lastName = nextProps.giftCard.dlData.dl_name2,
      this.DL_address = nextProps.giftCard.dlData.dl_addr1,
      this.DL_city = nextProps.giftCard.dlData.dl_city,
      this.DL_state = nextProps.giftCard.dlData.dl_state,
      this.DL_zipCode = nextProps.giftCard.dlData.dl_zip
      this.DL_customerServiceCode = nextProps.giftCard.dlData.curValidCode;
      this.DL_number = nextProps.giftCard.dlData.dl_number;
      this.DL_dob = nextProps.giftCard.dlData.dl_dob;

  }


  //INVOKING AFTER THE SUCCESSFULL RESPONSE FROM AURUS GETCRADBIN 
  getCardDetalsApiInvoker(data){
      const cardNum = {
        card: data.GetCardBINResponse.CardToken[0]
      }
      console.log("---------> CARD NUMBER------->", cardNum);
    if(data.GetCardBINResponse.ResponseCode[0] === "00000" ) {
      console.log("-----------> HEY IAM CALLNG THE GIFTCARDDETAILS API------------>")
      this.CheckForSameGiftCardNum(data.GetCardBINResponse.CardToken[0])
      this.props.getGiftCardDetailsAction(cardNum)
    }
    else if(data.GetCardBINResponse.ResponseCode[0] === "40001"){
      console.log("------>ERROR SCENARIO'S FOR GETCARDBIN----->", data.GetCardBINResponse.ResponseText[0] );
    }
    else {
      console.log("------> HANDLE THE ERROR SCENARIO'S FOR GIFTCARDDETAILS API----->");
    }
  }


   //AFTER THE SUCCESSFUL RESPONSE FROM AURUS BALANCE INQUIRY CALLING THE GET CARD CLASS API FOR RSEA TENDER TYPE
  getCardclassInvoker(data){
    console.log("-----------> HEY IAM CALLNG THE GETCARDCLASS API------------>")
    let cardClasNumber = "1463"
    let oldgifcard = [];
    let newgiftcard = [];

    // if(data.TransResponse.TransDetailsData[0]){
    //   each(data.TransResponse.TransDetailsData[0],(item,i)=>{
    //     if(item.TransDetailData[i].ResponseCode[i] === "20006"){
    //       newgiftcard.push(item.TransDetailData[i].CardNumber[i]);
    //     }
    //     else if(item.TransDetailData[i].ResponseCode[i] === "00000"){
    //       oldgifcard.push(item.TransDetailData[i].CardNumber[i]);
    //     }
    //   })
    // }

    // let giftcard_stored={
    //   oldgifcard:oldgifcard,
    //   newgiftcard:newgiftcard
    // }
    
    // console.log("-------> CHECKING THE CARDNUMBERS IN OBJECTS-----> 231", giftcard_stored);
    // this.props.getOldnNewGiftCardNumAction(giftcard_stored,'STORE');

    console.log("---------> CARDCLASS NUMBER------------->",cardClasNumber);
    if(data.TransResponse.TransDetailsData[0].TransDetailData[0].ResponseCode[0] === "20006" || data.TransResponse.TransDetailsData[0].TransDetailData[0].ResponseCode[0] === "00000" ){
      each(data.TransResponse.TransDetailsData[0],(item,i)=>{
        if(item[0].TransDetailData[i].ResponseCode[i] === "20006"){
          newgiftcard.push(item[0].TransDetailData[i].CardNumber[i]);
        }
        else if(item[0].TransDetailData[i].ResponseCode[i] === "00000"){
          oldgifcard.push(item[0].TransDetailData[i].CardNumber[i]);
        }
      })

      let giftcard_stored={
        oldgifcard:oldgifcard,
        newgiftcard:newgiftcard
      }
      console.log("-------> CHECKING THE CARDNUMBERS IN OBJECTS-----> 262", giftcard_stored);
      this.props.getOldnNewGiftCardNumAction(giftcard_stored,'STORE');

      console.log("-------> CARD BALANCE --------> ", data.TransResponse.TransDetailsData[0].TransDetailData[0].BalanceAmount[0])
      this.setState({cardBalanceinqDetails:data.TransResponse.TransDetailsData[0].TransDetailData[0].BalanceAmount[0]})
      this.props.getGiftCardClassAction(cardClasNumber);
    
    }
    else{
     console.log("------> HANDLE THE ERROR SCENARIO'S");
    }
  }


//AFTER SUCCESSFULL RESPONSE FROM GETCARDCLASS NAVIGATING TO GIFTCARD-AMOUNT PAGE
  componentRender_Amount(data){
    if(data.status === 'success' && data.result.GC.cardClass !== null){
      this.componentToRender('giftCardAmount');
    }
    else{
      console.log("------> HANDLE THE ERROR SCENARIO'S FOR CARD CLASS");
      // this.setState({cardClassAPIerror:true})
      // this.setState({cardClassAPIerrorMessage:data.message})
    }
  }


  //CHECKING THE CART FOR SAME GIFTCARD NUMBER IF ANY SHOW THE MODEL POP-UP
  CheckForSameGiftCardNum = (data) =>{
    console.log("-------> CHECKING FOR SAME GIFTCARD NUMBER IN CART, I AM LOOPING --->  268")
    each(this.props.cart.data.cartItems.items[0],(item,i) =>{
      if(item.egcAccountNum === data){
        this.setState({
          same_giftCardNumber: true
        })
      }
    })
  }


  render() {
    return (
      <div>

        <Header history={this.props.history} sale="true" />

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
            <img className="giftcard-header-arrow" src={backArrow} alt="backarrow" onClick={() => {
              this.navigateToSale()
              console.log("this.props.location.pathname", this.component);
            }} />
            <div className="giftcard-header-divider"></div>
            <div className="giftcard-header-text">Gift Card</div>
          </div>
        </ServicesHeader>


        <GiftCardContent
          component={this.state.component}
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
          validCardNumber={this.state.validCardNumber}
          validDLNumber={this.driversLicense}
          validIncreaseAmount={this.state.validIncreaseAmount}
          licenseModal={this.state.driversLicense_modal}
          validateCard={(value) => { this.isValidCard(value) }}
          getCardNumber={(value) => { this.getCardNumber(value) }}
          getIncreaseAmount={(value) => { this.getIncreaseAmount(value) }}
          getRecipientFirstName={(value) => { this.getRecipientFirstName(value) }}
          getRecipientLastName={(value) => { this.getRecipientLastName(value) }}
          getDLNumber={(value) => { this.getDLNumber(value) }}
          closeDLmodal={this.closeDriversLicenseModal}
          componentToRender={(value) => this.componentToRender('purchaser')}
          cardBalanceinqDetails = {this.state.cardBalanceinqDetails}
          aurusIssueGiftCard={() => this.aurusIssueGiftCardCall()}
          aurusReloadGiftCard={() => this.aurusReloadGiftCardCall()}
          validateLicenseCall={() => this.validateLicenseCall()}
          aurusCardLookup={() => this.aurusCardLookupCall()}
          getGiftCardClass={() => this.getGiftCardClass()}
          giftCardAction={this.props.addGiftCardAction}
          navigateToSale={this.navigateToSale}
          getGiftCardCartItems={this.getGiftCardCartItems}
          addGiftCardCall={this.addGiftCardCall}
          GC_data={this.props.giftCard.gcData.result}
          DL_firstName={this.DL_firstName}
          DL_lastName={this.DL_lastName}
          DL_address={this.DL_address}
          DL_city={this.DL_city}
          DL_state={this.DL_state}
          DL_zipCode={this.DL_zipCode}
          DL_number={this.DL_number}
          goback ={this.findComponent}
          DL_dob={this.DL_dob}
          error = {this.state.giftcardError}
          same_giftCardNumber = {this.state.same_giftCardNumber}
        />


        {this.state.component === 'purchaser' ? null : <ServicesFooter>
          <div className="giftcard-cancel" onClick={() => { this.navigateToSale() }}>
            <img className="giftcard-clear-all-icon" src={clearallbtn} alt="clear-all" />
            <span className="giftcard-cancel-text">Cancel</span>
          </div>

          <div className={this.state.validCard ? 'giftcard-next' : 'giftcard-next'}
            
            onClick={() => {
              console.log(" cardBalanceinqDetails --> ",this.state.cardBalanceinqDetails);
              if (this.validIncreaseAmount >= 1000) {
                this.openDriversLicenseModal();
                //this.validateGiftCardAmount();
                this.validateLicenseCall();
              }
              if (this.state.component === 'purchaser') {
                // this.aurusCloseTransactionCall();
               // this.addGiftCardCall();
                // this.validateLicenseCall();
              }

              if (this.validIncreaseAmount < 1000 && this.props.cart.data.customerInfo === undefined &&  this.props.customerDetails.firstName === "") {
                this.componentToRender('purchaser');
              }

              else if (this.validIncreaseAmount < 1000 && (this.props.customerDetails.firstName !== "" ||  this.props.cart.data.customerInfo)) {
                this.addGiftCardCall();
              }

              else{
                //this.activateSwipGiftCard();
				        //this.aurusCardLookupCall();
              }

            }}>
            <span className="giftcard-next-text">Next</span>
          </div>
        </ServicesFooter>}

        <Footer />

        <ExceedsAmountModal
          little
          showCloseIcon={false}
          open={this.state.exceedsAmount_modal}
          close={() => this.closeModals()}
        />

        <DriversLicenseModal
          little
          showCloseIcon={false}
          open={this.state.driversLicense_modal}
          close={() => this.closeDriversLicenseModal()}
          // validateDriversLicense={() => this.validateDriversLicense()}
          validateLicenseCall={() => this.validateLicenseCall()}
          getDLNumber={(value) => { this.getDLNumber(value) }}
        />

        <ConfirmDriversLicenseModal
          little
          showCloseIcon={false}
          open={this.state.confirmLicenseModal}
          close={() => this.closeModals()}
          componentToRender={(value) => { this.componentToRender(value) }}
          aurusIssueGiftCard={() => this.aurusIssueGiftCard()}
          firstName={this.DL_firstName}
          lastName={this.DL_lastName}
          address={this.DL_address}
          city={this.DL_city}
          state={this.DL_state}
          zipCode={this.DL_zipCode}
        />

          <Modal open={this.state.invalidGiftCardNumber} little classNames={{ modal: 'giftcard-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='giftcard-errorModal-container'>
              <div><img className='giftcard-errorModal-icon' src={warningIcon} /></div>
              <div className="giftcard-errorModal-text">Invalid GiftCard Number</div>
              <button className="giftcard-errorModal-button" onClick={() => { this.setState({ invalidGiftCardNumber: false }) }}>
                <div className="giftcard-errorModal-button-text">OK</div>
              </button>
            </div>

          </Modal>

          <Modal open={this.state.same_giftCardNumber} little classNames={{ modal: 'giftcard-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='giftcard-errorModal-container'>
              <div><img className='giftcard-errorModal-icon' src={warningIcon} /></div>
              <div className="giftcard-errorModal-text">GIFTCARD ALREADYADDED</div>
              <button className="giftcard-errorModal-button" onClick={() => { this.setState({ same_giftCardNumber: false }) }}>
                <div className="giftcard-errorModal-button-text">OK</div>
              </button>
            </div>

          </Modal>
          
        <CustomerServiceModal
          little
          showCloseIcon={false}
          open={this.state.customerService_modal}
          close={() => this.closeModals()}
          customerServiceCode={this.DL_customerServiceCode}
        />

        <MaxGiftCardAmountModal
          little
          showCloseIcon={false}
          closeOnOverlayClick={false}
          open={this.state.maxGiftCardLimit_modal}
          close={() => this.navigateToSale()}
        />

      </div>
    )
  }

  navigateToSale = () => {
    this.setState({ driversLicense_modal: false, maxGiftCardLimit_modal: false })
    this.props.history.push('/sale');
    // CLEARS REDUCER PAYLOAD
    // this.props.clearAllGiftCardDataAction();
  }


  openDriversLicenseModal = () => {
    this.setState({ driversLicense_modal: true })
  }
  closeDriversLicenseModal = () => {
    this.setState({ driversLicense_modal: false })
  }
  openConfirmLicenseModal = () => {
    this.setState({ confirmLicenseModal: true })
  }
  openCustomerServiceModal = () => {
    this.setState({ customerService_modal: true })
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

  // VERIFIES GIFTCARD NUMBER LENGTH
  isValidCard = (value) => {
    let validNumber = value;
    if (validNumber.length === 16 && !isNaN(Number(value)) && { value }) {
      this.setState({ validCard: true })
    }
    else {
      this.setState({ validCard: false })
    }
  }

  // GETS VALIDCARD NUMBER WHICH WAS KEYED IN
  getCardNumber = (value) => {
    let cardNumber = value;
    this.setState({ validCardNumber: cardNumber })
  }

  // GETS GIFTCARD AMOUNT WHICH WAS KEYED IN
  getIncreaseAmount = (value) => {
    let amount = value;
    this.validIncreaseAmount = amount;
  }

  getRecipientFirstName = (value) => {
    let fname = value;
    this.recipientFirstName = fname;
  }

  getRecipientLastName = (value) => {
    let lname = value;
    this.recipientLastName = lname;
  }

  // NOT NEEDED SINCE DL WILL BE SCANNED AND NOT KEYED IN
  getDLNumber = (value) => {
    let license = value;
    let licenseBase64 = btoa(value);

    this.driversLicense = license;
    this.base64License = licenseBase64;
    console.log(license);
  }

  goback=()=>{
    // var componrntList = ['giftcard , amount','purchase'] = 3
    // length -1
    // this.componentToRender(componentList[lenhth -1])
  }


  componentToRender = (value) => {
    this.state.totalComponent.push(value);
    this.setState({
      componentList:this.state.totalComponent
    })
    let component = value;
    this.setState({ component: component })
  }



  // FUNCTION TO BE CALLED AT PAYMENT TO SEARCH FOR GIFTCARD ITEMS
  // IN PROGRESS
  getGiftCardCartItems = () => {
    // let giftCardItems = this.props.cart.data.cartItems.items;

    // return giftCardItems.map((giftcard) => {
    //   // return giftcard.map((items) => {
    //   //   
    //   // })
    // })

  }

  // ********** API CALLS **********
  addGiftCardCall = (customerdata) => {
    //debugger;
    // ItemDesc MUST BE CHANGED TO HANDLE DIFFERENT GIFTCARDS RETURNED FROM getGiftCardDetails RESPONSE
    // API WILL NOT WORK IF ZIP FORMAT IS 12345-6789 MUST BE REDUCED TO 12345
    // WORKING FOR CLIENTELED CUSTOMERS
    // NOT WORKING FOR NON-CLIENTELDE AS CUSTOMER DETAILS ARE REQUIRED
    const cart = this.props.cart.data;
    const cardNumber = this.props.Payment.getGiftCardBinRes.GetCardBINResponse.CardToken[0]
    const transactionId = this.props.home.transactionData.transactionNumber;
    const parsedZip = this.state.zip.substring(0, this.state.zip.indexOf('-'));
    const giftCardObj = {
      "ItemNumber": '0',
      "TransactionId": transactionId,
      "IsGiftCard": true,
      "GiftCardNumber": cardNumber,
      "ItemDesc": 'NM Expss Card',
      "Quantity": "1",
      "SalePrice": this.validIncreaseAmount,
      // "Customer_Salutation": this.props.customerDetails.salutation !== undefined ? this.props.customerDetails.salutation: customerdata.cust_dom_salutation,
      // "Customer_FirstName": this.props.customerDetails.firstName? this.props.customerDetails.firstName: customerdata.firstName,
      // "Customer_LastName":  this.props.customerDetails.lastName? this.props.customerDetails.lastName: customerdata.lastName,
      // "Customer_Address_Line1":  this.props.customerDetails.selectedAddress.Addr1? this.props.customerDetails.selectedAddress.Addr1: customerdata.address1,
      // "Customer_City": this.props.customerDetails.selectedAddress.City?this.props.customerDetails.selectedAddress.City: customerdata.city,
      // "Customer_State":  this.props.customerDetails.selectedAddress.State? this.props.customerDetails.selectedAddress.State: customerdata.state,
      // "Customer_Zip": this.props.customerDetails.selectedAddress.Zip !== undefined ?this.props.customerDetails.selectedAddress.Zip:customerdata.zip,
      // "Customer_DLNumber": this.DL_number,
      // "Customer_DLState": this.DL_state

      // "Customer_Salutation":"MR.",
      // "Customer_FirstName":"JEYAGANESH",
      // "Customer_LastName":"SUNDARARAJAN",
      // "Customer_Address_Line1":"6900 PRESTON RD",
      // "Customer_City":"PLANO",
      // "Customer_State":"TX",
      // "Customer_Zip":"75024",
      // "Customer_DLNumber":"1234567",
      // "Customer_DLState":"TX"
    }

    // this.props.startSpinner(true);
    
    //this.getGiftCardCartItems();

    if(customerdata || !this.props.customerDetails){

      var storeClientNumber = (this.props.customerDetails.clientNumber) ? this.props.customerDetails.clientNumber : "";
      var phoneSequence = (this.props.customerDetails.selectedAddress.PhoneNumbers.length > 0 && this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence != "") ? this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence : "0"
      this.props.attachCustomerActionInvoker(this.props.login.userpin, this.props.home.transactionData.transactionNumber, storeClientNumber, this.props.customerDetails.selectedAddress.sequenceKey, phoneSequence,customerdata);
    }

    setTimeout(()=>{
      this.props.addGiftCardAction(giftCardObj);
    },100)

  }

  // INVOKING IF CUSTOMER IS NOT A CLIENTEL

  // DL OR PASSPORT CAN ONLY BE SCANNED *NOT* MANUALLY INPUTED
  // BASE64 LICENSE /9ZoqxidIi0EKdF43DO4z0i+uRqyWg+iygCIlKbJaVOYXFQC/EbGU1cJ7phJ+qD+PRF5GejZMFo9aW58ueLVhaMvqFbGkZ+VR/oA+Jug1+JVNUhmTOha3KEe0VNWHJ8VSSe9Xy/rkYG0OubXQKpHaWCtRFw78qLVk+fgLmWFnm7J0pfewqXLbEwZHgVM203XgrF+PMqeO8siBnbQf4/V4ZgtPJUo1ykF4AUMADzkfNKsHv8dLH+y+buHMXkDApCouL1I7u2zBABZsOHytmp8Gd3d3GXpntEH
  validateLicenseCall = () => {
    const transactionId = this.props.home.transactionData.transactionNumber;
    const cart = this.props.cart.data;
    const licenseObj = {
      ...clientConfig,
      "Date": "20180615",
      "Time": "154533",
      "AssocID": "209289",
      "TransactionId": transactionId,
      "ClientNum": "1000039774",
      "Purpose": "CHECK",
      "DeviceType": "",
      "Base64Data": "/9ZoqxidIi0EKdF43DO4z0i+uRqyWg+iygCIlKbJaVOYXFQC/EbGU1cJ7phJ+qD+PRF5GejZMFo9aW58ueLVhaMvqFbGkZ+VR/oA+Jug1+JVNUhmTOha3KEe0VNWHJ8VSSe9Xy/rkYG0OubXQKpHaWCtRFw78qLVk+fgLmWFnm7J0pfewqXLbEwZHgVM203XgrF+PMqeO8siBnbQf4/V4ZgtPJUo1ykF4AUMADzkfNKsHv8dLH+y+buHMXkDApCouL1I7u2zBABZsOHytmp8Gd3d3GXpntEH"
    }
    //this.closeDriversLicenseModal();
    this.props.validateDriversLicenseAction(licenseObj);
    // this.props.startSpinner(true);

  }

  // ********** ICC API CALLS **********
  getGiftCardDetails = () => {
    // VALID GIFTCARD_NUM 7777142092566058
    const cardNum = {
      card: this.state.validCardNumber
    }
    console.log("YOu are in getGiftCardDetails");
    this.props.getGiftCardDetailsAction(cardNum)
  }

  // IF getCardDetails **DOES NOT** RETURN CARDCLASS, BALANCE INQUIRY(AURUS CALL) WILL RETURN BALANCE + CARDCLASS
  // CALLED AFTER getGiftCardDetails
  getGiftCardClass = () => {
    // GETS CLASS NUM FROM GiftCardDetails
    let gcClassNum = this.props.giftCard.gcData.result.GC.cardClass;
    if (gcClassNum !== null || gcClassNum !== 0) {
      this.props.getGiftCardClassAction(gcClassNum)
      this.classNum = gcClassNum;
      //this.props.startSpinner(true)
    } else {
      // WE NEED TO WORK ON AURUS IF WE DONT GET CARD CLASS NUMBER.
    }
  }

  // GETS CALLED AFTER validateLicenseCall IS SUCCESSFULL
  // NEED TO WORK ON FINDING ALL APPORPRIATE VALUES FOR fincenObj
  getFincenValidation = () => {

    let carddetails = {
      "cardValue": this.validIncreaseAmount,
      "cardNumber": this.state.validCardNumber,
      "cardQuantity": "1",
      "recipientFirstname": this.recipientFirstName,
      "recipientLastname": this.recipientLastName,
      "driversLicenseNbr": "12345678998",
      "driversLicense_State": "TX",
      "dateOfBirth": "mm/dd/yyyy",
      "passportNbr": "12345678998",
      "passportCountry": "USA",
      "passportCountryCode": "USA",
      "ssnNbr": "12345678998",
      "recipientEmail": " john.doe@example.com ",
      "recipientCellNbr": "09756765466676",
      "recipientHomeNbr": "09756765466676",
      "recipientki": "er456hfgbf",
      "recipientAddress1": "1234 Main Street",
      "recipientAddress2": "",
      "recipientCity": "San Diego",
      "recipientState/recipientProvince": "CA",
      "recipientPostalCode/recipientZip": "92101",
      "recipientCountry": "USA",
      "recipientCountryCode": "USA"
    };
    const fincenObj = {
      "finCen": {
        "purchaserDetails": {
          "sourceSytem": "OnlineTW",
          "firstName": this.DL_firstName,
          "lastName": this.DL_lastName,
          "paymentCardType": "VISA",
          "driversLicenseNbr": this.DL_number,
          "driversLicense_State": this.DL_state,
          "dateOfBirth": this.DL_dob,
          "passportNbr": "12345678998",
          "passportCountry": "12345678998",
          "passportCountryCode": "USA",
          "ssnNbr": "12345678998",
          "email": this.state.email,
          "cellNbr": this.state.mobile,
          "homeNbr": this.state.otherMobile,
          "ki": "er456hfgbf",
          "webId": "sdf44444447777777",
          "cssId": this.state.cssId,
          "address1": this.DL_address,
          "address2": "",
          "city": this.DL_city,
          "state/province": this.DL_state,
          "postalCode/zip": this.DL_zipCode,
          "country": this.state.country,
          "countryCode": "USA"
        },
        "cardDetails": {
          "cardItems": []
        },
        "additional_feilds": {
          "cardClass": this.classNum,
          "activationActionCode": "03",
          "key3": "3",
          "key4": "4",
          "key5": "5"
        },
        "version": "1.0"
      }
    }
    // let cardNumbers =  pluck(this.giftCard,'cardNumber');
    // each(cardNumbers,(item)=>{
    //   carddetails.cardNumber = item
    //   fincenObj.cardDetails.cardItems.push(carddetails)
    // })
    

    this.props.fincenValidationAction(fincenObj)
  }

 
  // MANUAL ENTRY REQ
  // CardNumber=7006446669919903735 & EntrySource=K,AllowKeyedEntry=N,LookUpFlag=0

  //MANUAL ON PED REQ
  //CardNumber=,EntrySource=,AllowKeyedEntry=Y,LookUpFlag=0

  //SCAN REQ
  //CardNumber=7006446669919903735 & EntrySource=B,AllowKeyedEntry=N,LookUpFlag=0

  // ********** AURUS CALLS **********
  aurusActivateScanner = () => {
    this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
    this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
    this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = this.aurusVars.UpgradeType;
    this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
    this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
    this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
    var req = json2xml(this.UpdateRequestScanJson);
    this.props.getAurusResponse(req);
    console.log('aurus-scanner-params', req)
    if (this.props.Payment.aurusresponse.UpgradeResponse.ResponseCode[0] === "00000") {

    } else {
      console.log(this.props.Payment.aurusresponse.UpgradeResponse.ResponseCode[0]);
      this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
      this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
      this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 31;
      this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
      this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
      this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
      var req = json2xml(this.UpdateRequestScanJson);
      this.props.getAurusResponse(req);
      this.props.getAurusResponse(json2xml(this.bypassJson));
    }
  }


  // RETURNS CARD BALANCE ALONG WITH CARD CLASS
  aurusGetBalanceEnquiry = (cardNumber) => {

    console.log("Entered in aurusGetBalanceEnquiry");
    this.TransRequestJson.TransRequest.CardNumber = cardNumber;
    this.TransRequestJson.TransRequest.CardToken =cardNumber; 
    this.TransRequestJson.TransRequest.EntrySource = 'K';
    this.TransRequestJson.TransRequest.TransAmountDetails.ServicesTotalAmount ="0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.ProductTotalAmount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.TaxAmount ="0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.Discount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.EBTAmount =" 0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.FSAAmount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.DutyTotalAmount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.FreightTotalAmount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.AlternateTaxAmount =" 0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.TipAmount =" 0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.DonationAmount = "0.00";
    this.TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = "0.00";
    //TransactionType must be 12 for balance enquiry
    this.TransRequestJson.TransRequest.TransactionType = 12;
    const params = json2xml(this.TransRequestJson);
    this.props.getAurusResponse(params, 'GIFTCARDBALANCE_INQUIRY');
   
  }
   

  aurusCloseTransactionCall = () => {
    const closeTransXml = json2xml(this.closeTransJson);
    this.props.getAurusResponse(closeTransXml);
    this.navigateToSale();

  }

}; // END OF CLASS


function mapStateToProps({ giftCard, customerDetails, sale, cart, Payment, home, login }) {
  console.log("Hey this is Raj Props", Payment);
  return {
    giftCard,
    cart,
    login,
    otherPageData: sale.otherPageData,
    customerDetails,
    Payment,
    home
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    attachCustomerActionInvoker: attachCustomerAction,
    addGiftCardAction: addGiftCardAction,
    validateDriversLicenseAction: validateDriversLicenseAction,
    getGiftCardDetailsAction: getGiftCardDetailsAction,
    getGiftCardClassAction: getGiftCardClassAction,
    getOldnNewGiftCardNumAction:getOldnNewGiftCardNumAction,
    updateGiftCardReloadAction: updateGiftCardReloadAction,
    fincenValidationAction: fincenValidationAction,
    clearAllGiftCardDataAction: clearAllGiftCardDataAction,
    startSpinner: startSpinner,
    getAurusResponse: getAurusResponse
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard);
