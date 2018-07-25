import React, { Component } from 'react';
import './send-content.css';

import FrequentlyShippedAddresses from '../FreqShippedAddresses/Controller/frequentlyShippedAddresses';
import ItemsToBeShipped from '../ItemsToBeShipped/Controller/itemsToBeShipped';
import CustomerEditForm from '../../../common/customerEditForm/Controller/customerEditForm';
import SendWeightChart from '../SendWeightChart/Controller/SendWeightChart';
import OptionSeven from '../OptionSeven/OptionSeven';
import ServicesFooter from '../../sale-services/services-common/ServicesFooter';
import SendTitleHeader from '../FreqShippedAddresses/SendTitleHeader/Controller/sendTitleHeader';
import ShippingOptions from '../OptionSeven/ShippingOptions/ShippingOptions'

export default class SendContent extends Component {

  constructor(props){
    super(props);

    this.state ={
      test : false,
      componentName: this.props.sendComponent.componentName
      
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
                        // <SendTitleHeader 
                        //     title = {"Recipient"} 
                        // />,
                        <CustomerEditForm 
                          cssId={this.props.cssId}
                          currentLvl={this.props.currentLvl}
                          skipCustomerInfo={this.props.isSkip}
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
                        // <SendTitleHeader 
                        //     title = {"Recipient"} 
                        // />,
                        <CustomerEditForm 
                          cssId={this.props.cssId}
                          currentLvl={this.props.currentLvl}
                          skipCustomerInfo={this.props.isSkip}
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
                          updateObjectHandler={this.props.updateObjectHandler}
                          optionalFooter={ServicesFooter}
                          sameSenderReciever={this.props.sendComponent.sameSenderReciever}
                          userPin={this.props.userPin}
                          componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                          startSpinner={this.props.startSpinner}
                          history={this.props.history}
                          updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                          formType={"Receiver"}
                        />,
                        
                        ])

    }
    else if(this.state.componentName === "frequentShippedAddress"){
      compToDisplay = (<FrequentlyShippedAddresses 
                        changeComponent={this.componentToRender}
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        customerDetails={this.props.customerDetails}
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
                      />);
    }

    else if(this.state.componentName === "optionSeven") {
      console.log('sendcontent state', this.state)
      console.log('sendcontent props', this.props)
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
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
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
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
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
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        directSendRequest={this.props.directSendRequest}
                        sendApiRequestObject={this.props.sendApiRequestObject}
                        optionalFooter={ServicesFooter}
                        updateObjectHandler={this.props.updateObjectHandler}
                        history={this.props.history} 
                        shipmentOptionsReqestObject={this.props.shipmentOptionsReqestObject}
                        getShipmentOptions={this.props.getShipmentOptions}
                        sendResponseObject={this.props.sendResponseObject}
                      />);
    }

    else{
      // compToDisplay = ([<SendWeightChart
      //                   componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
      //                   initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
      //                   optionalFooter={ServicesFooter}
      //                   updateObjectHandler={this.props.updateObjectHandler}
      //                   history={this.props.history} 
      //                   updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
      //                 />,
      //                 ]);
    }
    return compToDisplay;
  }

  componentChangeHandler = (value) => {
    this.setState({
      componentName: value
    })
    this.componentToRender();
    console.log('STATE VALUE', this.state.componentName)
    console.log('CompRender-Val', value)
  }


  render() {


    return (
      
      <div className="send-content-container sale-content-scroll">
          {this.componentToRender()}
      </div>
    )
  }
};
