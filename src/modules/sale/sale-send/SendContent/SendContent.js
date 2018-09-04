import React, { Component } from 'react';
import './send-content.css';

import FrequentlyShippedAddresses from '../FreqShippedAddresses/Controller/frequentlyShippedAddresses';
import ItemsToBeShipped from '../ItemsToBeShipped/Controller/itemsToBeShipped';
import CustomerEditForm from '../../../common/customerEditForm/Controller/customerEditForm';
import SendWeightChart from '../SendWeightChart/Controller/SendWeightChart';
import OptionSeven from '../OptionSeven/OptionSeven';
import ServicesFooter from '../../sale-services/services-common/ServicesFooter';
import ShippingOptions from '../OptionSeven/ShippingOptions/ShippingOptions';
import EnterBarcode from '../enterBarcode/enterBarcode';

export default class SendContent extends Component {

  constructor(props){
    super(props);

    this.state ={
      test : false,
      componentName: this.props.sendComponent.componentName,
      sendType:""
    }
  }


  componentToRender(){
    let compToDisplay;

    console.log("TO RENDER PROPS", this.props)
    
    if(this.state.componentName === "itemsToBeShipped"){
      compToDisplay = (
                        [
                          <ItemsToBeShipped
                            items = {this.props.items}
                            componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                            updateObjectHandler={this.props.updateObjectHandler}
                            optionalFooter={ServicesFooter}
                            history={this.props.history}
                          />
                        ]
                      );
    }
    else if(this.state.componentName === "senderForm"){
      compToDisplay = (
                        [
                        <CustomerEditForm 
                          customerDetails={this.props.customerDetails}
                          updateObjectHandler={this.props.updateObjectHandler}
                          optionalFooter={ServicesFooter}
                          sameSenderReciever={this.props.sendComponent.sameSenderReciever}
                          userPin={this.props.userPin}
                          componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                          startSpinner={this.props.startSpinner}
                          history={this.props.history}
                          updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                          formType={"Sender"}
                        />,
                        
                        ])

    }
    else if(this.state.componentName === "receiverForm"){
      compToDisplay = (
                        [
                        <CustomerEditForm 
                          customerDetails={this.props.customerDetails}
                          updateObjectHandler={this.props.updateObjectHandler}
                          optionalFooter={ServicesFooter}
                          sameSenderReciever={this.props.sendComponent.sameSenderReciever}
                          userPin={this.props.userPin}
                          componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                          startSpinner={this.props.startSpinner}
                          history={this.props.history}
                          updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                          formType={"Receiver"}
                          freqShippedAddrSelected={this.props.freqShippedAddrSelected}
                          freqShippedSelectedHandler={this.props.freqShippedSelectedHandler}
                        />,
                        
                        ])

    }
    else if(this.state.componentName === "frequentShippedAddress"){
      compToDisplay = (<FrequentlyShippedAddresses 
                        changeComponent={this.componentToRender}
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        emailTrackingInfo={this.props.emailTrackingInfo}
                        moreCustomerData={this.props.moreCustomerData}
                        salutation={this.props.salutation}
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        address1={this.props.address1}
                        address2={this.props.address2}
                        mobile={this.props.mobile}
                        otherMobile={this.props.otherMobile}
                        city={this.props.city}
                        state={this.props.state}
                        email={this.props.email}
                        country={this.props.country}
                        zip={this.props.zip}  
                        navigateToSale={this.props.navigate}  
                        history={this.props.history}    
                        userPin={this.props.userPin.userPin}
                        sendResponseObject={this.props.sendResponseObject}
                        customerDetails={this.props.customerDetails}
                        freqShippedSelectedHandler={this.props.freqShippedSelectedHandler}
                        freqShippedAddressesAction={this.props.freqShippedAddressesAction}
                      />);
    }

    else if(this.state.componentName === "optionSeven") {
      var footerButton = (
        <div className="giftwrap-next" 
          onClick={() => {
            if(this.state.componentName === "optionSeven") {
              this.props.shippingOption("shippingOption")
              
              if(this.props.shippingOptionState === "shippingOption") {
                this.props.navigate()
                }
            }
        }}>
          {this.props.shippingOptionState ==="shippingOption" ?
          <span className="giftwrap-next-text">Ok</span>
            :
          <span className="giftwrap-next-text">Next</span>
          }
        </div>
      );
      compToDisplay = ([
                      <OptionSeven
                        items={this.props.items}
                        optionSeven={(value) => {this.props.optionSeven(value)}}
                        shippingOption={(value) => {this.props.shippingOption(value)}}
                        selectStore = {(value) => {this.props.selectStore(value)}}
                        optionSevenState={this.props.optionSevenState}
                        selectStoreState={this.props.selectStoreState}
                        shippingOptionState={this.props.shippingOptionState}
                        componentChangeHandler={(value, typeOfSend) => {this.componentChangeHandler(value,typeOfSend)}}
                        navigate={this.props.navigate}
                      />,
                      <ServicesFooter additionalStyle='sendComponent-offset'>
                        <div className="giftwrap-cancel" onClick={this.props.navigateToSale}>
                          <span className="giftwrap-cancel-text">Cancel</span>
                        </div>
                        {footerButton}
                      </ServicesFooter>
                      ])
    }

    else if(this.state.componentName === "sendweightchart"){
      compToDisplay = (<SendWeightChart
                        componentChangeHandler={(value, typeOfSend) => {this.componentChangeHandler(value,typeOfSend)}}
                        initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
                        optionalFooter={ServicesFooter}
                        updateObjectHandler={this.props.updateObjectHandler}
                        updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                        getShipmentOptions={this.props.getShipmentOptions}
                        sendResponseObject={this.props.sendResponseObject}
                        shipmentOptionsReqestObject={this.props.shipmentOptionsReqestObject}
                        history={this.props.history} 
                      />);
    }
    else if(this.state.componentName === "shippingOptions"){
      compToDisplay = (<ShippingOptions
                        componentChangeHandler={(value, typeOfSend) => {this.componentChangeHandler(value,typeOfSend)}}
                        directSendRequest={this.props.directSendRequest}
                        sendApiRequestObject={this.props.sendApiRequestObject}
                        optionalFooter={ServicesFooter}
                        updateObjectHandler={this.props.updateObjectHandler}
                        history={this.props.history} 
                        shipmentOptionsReqestObject={this.props.shipmentOptionsReqestObject}
                        getShipmentOptions={this.props.getShipmentOptions}
                        sendResponseObject={this.props.sendResponseObject}
                        itemSelectedAction={this.props.itemSelectedAction}
                        authCodeRequest={this.props.authCodeRequest}
                        homeReduxStore={this.props.homeReduxStore}
                        clearForSend={this.props.clearForSend}
                      />);
    }
    else if(this.state.componentName === "enterBarcode"){
      compToDisplay = (<EnterBarcode
                        componentChangeHandler={(value, typeOfSend) => {this.componentChangeHandler(value,typeOfSend)}}
                        updateObjectHandler={this.props.updateObjectHandler}
                        history={this.props.history}
                        optionalFooter={ServicesFooter}
                        sendType={this.state.sendType}
                      />);
    }

    else{
      compToDisplay = (<EnterBarcode
                        componentChangeHandler={(value, typeOfSend) => {this.componentChangeHandler(value, typeOfSend)}}
                        updateObjectHandler={this.props.updateObjectHandler}
                        history={this.props.history}
                        optionalFooter={ServicesFooter}
                      />);
    }
    return compToDisplay;
  }

  componentChangeHandler = (value,typeOfSend) => {
    this.setState({
      componentName: value,
    })
    if(value =='enterBarcode'){
      this.setState({sendType:typeOfSend})
    }
    this.componentToRender();
    console.log('STATE VALUE', this.state.componentName)
    console.log('CompRender-Val', this.state.sendType)
  }


  render() {


    return (
      
      <div className="send-content-container sale-content-scroll">
          {this.componentToRender()}
      </div>
    )
  }
};
