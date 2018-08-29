import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getShipmentOptions, directSendRequest, freqShippedAddressesAction, authCodeRequest, clearForSend} from './sendActions'
import {addCustomerAction} from '../../add-customer/BusinessLogic/AddCustomerAction'
import { startSpinner } from '../../common/loading/spinnerAction';
import {itemSelectedAction} from '../../common/cartRenderer/actions';

import Header from '../../common/header/header';
import SaleHeader from '../SaleHeader';
import ServicesHeader from '../sale-services/services-common/ServicesHeader';
import SendContent from './SendContent/SendContent';
import OptionSeven from './OptionSeven/OptionSeven';
import ServicesFooter from '../sale-services/services-common/ServicesFooter';
import Footer from '../../common/footer/footer';

import backArrow from '../../../resources/images/Back.svg';
import warningIcon from '../../../resources/images/Warning.svg';
import {InsufficientQnty} from './OptionSeven/OptionSevenModals';
import FrequentlyShippedAddresses from './FreqShippedAddresses/Controller/frequentlyShippedAddresses';


class SendContainer extends Component {
    constructor(props) {
        super(props)
        // this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
        // this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
        // this.data = this.inCircleDetails.data;
        // this.currentlvl = this.inCircleInfo.currentlvl;

        this.state = {
            isSkip: !this.props.customerDetails.clientNumber,
            cssId: this.props.customerDetails.cCSNumber,
            salutation: this.props.customerDetails.salutation,
            firstname: this.props.customerDetails.firstName,
            lastname: this.props.customerDetails.lastName,
            address1: this.props.customerDetails.selectedAddress.Addr1,
            address2: this.props.customerDetails.selectedAddress.Addr2,
            mobile: this.props.customerDetails.selectedAddress.PhoneNumbers.length > 0 ?this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneNumber:'',
            otherMobile: '',
            zip: this.props.customerDetails.selectedAddress.Zip,
            state: this.props.customerDetails.selectedAddress.State,
            city: this.props.customerDetails.selectedAddress.City,
            country: this.props.customerDetails.selectedAddress.Country,
            email: this.props.customerDetails.selectedAddress. EmailAddress,
            //frequentlyShippedAddress will change when API is ready
            frequentlyShippedAddresses: Object.values(this.props.customerDetails.addresses),
            currentLvl: this.props.incircleData ? this.props.incircleData.data.lyBenefitLevelCode: '',
            itemsArray: [],
            insufficientQunty:false,
            optionSeven: false,
            shippingOption: false,
            selectStore: false,
            useFreqShippedAddr:false,
            freqShippedAddrSelected:[],
            errorThrown : false,
            errorDescription:'',

        };



       this.sendApiRequestObject = {
            "ItemList": [{}],
            "Sender":{
                    "FirstName":'',
                    "LastName":"", 
                    "Email": "",
                    "Address_Line1":"",
                    "Address_Line2":"",
                    "Contact": "",
                    "City": "",
                    "State":"",
                    "Zip":'',
                    "Province":"",
                    "PostalCode":"",
                    "Country":"",
                },
            "Receiver": 
                {
                    "FirstName":"",
                    "LastName":"",
                    "Email": "",
                    "Address_Line1":"",
                    "Address_Line2":"",
                    "Contact":"",
                    "City": "",
                    "State":"",
                    "Zip":'',
                    "Province":"",
                    "PostalCode":"",
                    "Country":"US",
                },
            "ShippingOption":
                {
                    "Option":"",
                    "Description":"",
                    "PriceType":"",
                    "InternationalFlag":'',
                    "SurfaceFlag":'',
                    "Price":"" 
                },
            "sendBarcode":"9783351639",
            "EmailTrackingFlag": this.props.emailTrackingInfo.tracking,
            "SendWeight": "",
            "TransactionId":this.props.cart.data.transactionId,
            "AuthCode":""
        };

        /* TEST DATA TO CHECK CONNECTIVITY FOR API */
        this.shipmentOptionsReqestObject = {
            "Surface":true,
            "Weight":"",
            "ZIP":'',
            "International":"",
            "Country":"",
            "TransactionId":this.props.cart.data.transactionId
        }
        
    }

    componentWillMount() {
        this.getOptionalFields();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('MIKE SEND DIDUPDATE', prevProps)
        if(prevProps.sendResponseObject.error != this.props.sendResponseObject.error && this.props.sendResponseObject.error !== null && this.props.sendResponseObject.error !== "AC_FAIL"){
            this.setState({errorDescription: this.props.sendResponseObject.error});
            this.setState({errorThrown:true});
        }

        if(prevProps.addCustomer.responseError != this.props.addCustomer.responseError) {
            this.setState({errorDescription: this.props.addCustomer.responseError.response_text});
            this.setState({errorThrown:true});
        }
    }

    updateObjectHandler = (key, value) =>{
        console.log("UPDATING OBJECT KEY:", key)
        console.log("UPDATING OBJECT VALUE:", value)
        var fields = this.sendApiRequestObject;
        fields[key]= value;
        this.sendApiRequestObject = fields;
        console.log("REQUEST OBJECT UPDATED",this.sendApiRequestObject);
    }

    updateShipmentOptionsObject = (key, value) =>{
        console.log("UPDATING SHIPMENT OBJECT KEY:", key)
        console.log("UPDATING SHIPMENT OBJECT VALUE:", value)
        if(key === "Weight" || key==="ZIP" || key==="Surface" || key=="International" || key==="Country"){
            var fields = this.shipmentOptionsReqestObject;
            fields[key]= value;
            this.shipmentOptionsReqestObject = fields;
        }
        console.log("SHIPMENT REQUEST OBJECT UPDATED",this.shipmentOptionsReqestObject);
    }

    freqShippedSelectedHandler = (selectedAddress) =>{
        console.log("SHIV SELECTEDADDR",selectedAddress)
        if(this.state.useFreqShippedAddr == false){
            this.setState({ useFreqShippedAddr: true });
            this.setState({freqShippedAddrSelected : selectedAddress});
        }else{
            this.setState({ useFreqShippedAddr: false});
        }
    }


    getOptionalFields = () =>{
        if(this.props.customerDetails.clientNumber){
            if(this.props.customerDetails.selectedAddress.PhoneNumbers.length > 1){
                this.setState({otherMobile: this.props.customerDetails.selectedAddress.PhoneNumbers[1].phoneNumber})
            }
        }
    }

    render() {

        console.log("SHIV state SELECTEDADDR",this.state.freqShippedAddrSelected)
        return (
        <div>
        
        <Header history={this.props.history} sale="true"/>

        <SaleHeader 
          pageName="Sale"
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
            <div className="giftwrap-header-container">
                <img className="giftwrap-header-arrow" src={backArrow} alt="backarrow" onClick={() => 
                {
                    this.props.history.goBack();
                    this.props.itemSelectedAction('');
                    }}/>
                <div className="giftwrap-header-divider"></div>
                <div className="giftwrap-header-text">Send</div>
          </div>
        </ServicesHeader>


         <SendContent 
            history={this.props.history}
            items = {this.props.cart.data.cartItems.items}
            optionSevenState={this.state.optionSeven}
            selectStoreState={this.state.selectStore}
            shippingOptionState={this.state.shippingOption}
            initializeOptionSeven = {(value) => {this.initializeOptionSeven(value)}}
            selectStore = {(value) => {this.setSelectStore(value)}}
            updateObjectHandler={this.updateObjectHandler}
            updateShipmentOptionsObject={this.updateShipmentOptionsObject}
            shippingOption = {(value) => {this.setShippingOption(value)}}
            currentLvl={this.currentlvl}
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
            homeReduxStore={this.props.homeReduxStore}
            customerDetails={this.props.customerDetails}
            frequentlyShippedAddresses={this.state.frequentlyShippedAddresses}
            sendComponent={this.props.sendComponent}
            navigate={() => {this.navigateToSale()}}
            emailTrackingInfo={this.props.emailTrackingInfo}
            authCodeRequest={this.props.authCodeRequest}
            userPin={this.props.userPin.userPin}
            startSpinner={this.props.startSpinner}
            shipmentOptionsReqestObject={this.shipmentOptionsReqestObject}
            getShipmentOptions={this.props.getShipmentOptions}
            sendResponseObject={this.props.sendResponseObject}
            directSendRequest={this.props.directSendRequest}
            sendApiRequestObject={this.sendApiRequestObject}
            itemSelectedAction={this.props.itemSelectedAction}
            freqShippedAddressesAction={this.props.freqShippedAddressesAction}
            freqShippedAddrSelected={this.state.freqShippedAddrSelected}
            freqShippedSelectedHandler={this.freqShippedSelectedHandler}
            clearForSend={this.props.clearForSend}
        /> 
        
        <Footer />
        <div className="select-store-container">
                <Modal classNames={{modal: "insufficientQunty"}} open={this.state.insufficientQunty} onClose={() => this.setState({insufficientQunty: false})} closeOnOverlayClick={false}>
                    <InsufficientQnty 
                    navigate={this.props.navigate} 
                    closeModal={this.exitModals} 
                    /> 
                </Modal>
        </div>

        <Modal open={this.state.errorThrown} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
            little showCloseIcon={false}>
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">{this.state.errorDescription}</div>
              <button className="sale-errorModal-button" onClick={() => { 
                  this.setState({errorThrown:false});
                  this.setState({errorDescription: ''});
                    this.props.clearForSend('CLEAR_ERROR');  
                  }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

          </Modal>

        </div>
        )
    }

 initializeOptionSeven = (value) => {
        this.state.optionSeven = value
        this.setState({
          optionSeven: value
        })
        console.log('working container', value)
        return value;
      }

    setShippingOption = (value) => {
        this.setState({
          shippingOption: "shippingOption",
        })
    }

    // setSelectStore = (value) => {
    //     this.state.selectStore = value
    //     this.setState({
    //       selectStore: value
    //     })
    //     return value;
    //     // console.log('working', value)
    // }

    navigateToSale = () => {
        console.log('NAVIGATION TO SALE')
        this.props.history.push('/sale')
    }

    QntyPopup = () => {
       this.setState({
        insufficientQunty:true
       });
    }

    exitModals = () => {
        this.setState({
            insufficientQunty: false,
        })
    }

};


function mapStateToProps({cart, sale, customerDetails, customerSearch, emailTrackingInfo, userPin, send, home, addCustomer}) {
    console.log("MAPSTATETOPROPS", sale)
    return { cart,
             sendComponent: sale.sendComponent,
             customerDetails,
             incircleData: customerSearch.incircleData,
             emailTrackingInfo,
             userPin,
             sendResponseObject:send,
             homeReduxStore:home,
             addCustomer
            }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            directSendRequest,
            getShipmentOptions,
            startSpinner,
            itemSelectedAction,
            freqShippedAddressesAction,
            authCodeRequest,
            clearForSend
        }, dispatch)
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(SendContainer);