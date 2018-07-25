import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getShipmentOptions, directSendRequest} from './sendActions'
import {addCustomerAction} from '../../add-customer/BusinessLogic/AddCustomerAction'
import { startSpinner } from '../../common/loading/spinnerAction';

import Header from '../../common/header/header';
import SaleHeader from '../SaleHeader';
import ServicesHeader from '../sale-services/services-common/ServicesHeader';
import SendContent from './SendContent/SendContent';
import OptionSeven from './OptionSeven/OptionSeven';
import ServicesFooter from '../sale-services/services-common/ServicesFooter';
import Footer from '../../common/footer/footer';

import backArrow from '../../../resources/images/Back.svg';
import {InsufficientQnty} from './OptionSeven/OptionSevenModals';
import FrequentlyShippedAddresses from './FreqShippedAddresses/Controller/frequentlyShippedAddresses';


class SendContainer extends Component {
    constructor(props) {
        super(props)
        // this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
        // this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
        // this.data = this.inCircleDetails.data;
        // this.currentlvl = this.inCircleInfo.currentlvl;
        console.log("customerDetails", this.props.customerDetails);

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
            itemsArray: [],
            insufficientQunty:false,
            optionSeven: false,
            shippingOption: false,
            selectStore: false,

        };


       this.sendApiRequestObject = {
            "ItemList": [{}],
            "Sender":{
                    "FirstName":'test',
                    "LastName":"test", 
                    "Email": "test@gmail.com",
                    "Address_Line1":"",
                    "Address_Line2":"",
                    "Contact": "",
                    "City": "",
                    "State":"",
                    "Zip":'',
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
                },
            "ShippingOption":
                {
                    "Option":"1",
                    "Description":"Overnight Air",
                    "PriceType":"ZONE2",
                    "InternationalFlag":'false',
                    "SurfaceFlag":'false',
                    "Price":"51" 
                },
            "sendBarcode":"9783351639",
            "EmailTrackingFlag": 'true',
            "SendWeight": "10",
            "TransactionId":this.props.cart.data.transactionId,
        };

        /* TEST DATA TO CHECK CONNECTIVITY FOR API */
        this.shipmentOptionsReqestObject = {
            "Surface":true,
            "Weight":"",
            "ZIP":'',
            "TransactionId":this.props.cart.data.transactionId
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
        if(key === "Weight" || key==="ZIP" || key==="Surface"){
            var fields = this.shipmentOptionsReqestObject;
            fields[key]= value;
            this.shipmentOptionsReqestObject = fields;
        }
        console.log("SHIPMENT REQUEST OBJECT UPDATED",this.shipmentOptionsReqestObject);
    }

    componentWillMount() {
        console.log("customerDetails", this.props.customerDetails);
        this.getOptionalFields();
    }

    getOptionalFields = () =>{
        if(this.props.customerDetails.profileData){
            if(this.props.customerDetails.profileData.phoneNumbers.length > 1){
                this.setState({otherMobile: this.props.customerDetails.profileData.phoneNumbers[1].rawValue})
            }
        }
    }

    render() {
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
                <img className="giftwrap-header-arrow" src={backArrow} alt="backarrow" onClick={() => this.props.history.goBack()}/>
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
            customerDetails={this.props.customerDetails}
            sendComponent={this.props.sendComponent}
            navigate={() => {this.navigateToSale()}}
            emailTrackingInfo={this.props.emailTrackingInfo}
            moreCustomerData={this.props.moreCustomerData}
            userPin={this.props.userPin.userPin}
            startSpinner={this.props.startSpinner}
            shipmentOptionsReqestObject={this.shipmentOptionsReqestObject}
            getShipmentOptions={this.props.getShipmentOptions}
            sendResponseObject={this.props.sendResponseObject}
            directSendRequest={this.props.directSendRequest}
            sendApiRequestObject={this.sendApiRequestObject}
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


function mapStateToProps({cart, sale, customerDetails, customerSearch, emailTrackingInfo, userPin, selectedItems, send}) {
    console.log("MAPSTATETOPROPS", sale)
    return { cart,
             otherPageData: sale.otherPageData,
             sendComponent: sale.sendComponent,
             customerDetails:customerDetails,
             incircleData: customerSearch.incircleData,
             moreCustomerData: customerDetails.profileData,
             emailTrackingInfo,
             userPin,
             sendResponseObject:send
            }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            directSendRequest,
            getShipmentOptions,
            startSpinner,
        }, dispatch)
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(SendContainer);