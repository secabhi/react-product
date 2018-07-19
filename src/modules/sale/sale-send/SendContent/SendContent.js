import React, { Component } from 'react';
import './send-content.css';

import FrequentlyShippedAddresses from '../FreqShippedAddresses/Controller/frequentlyShippedAddresses';
import ItemsToBeShipped from '../ItemsToBeShipped/Controller/itemsToBeShipped';
import CustomerEditForm from '../../../common/customerEditForm/Controller/customerEditForm';
import SendWeightChart from '../SendWeightChart/Controller/SendWeightChart';
import OptionSeven from '../OptionSeven/OptionSeven';
import ServicesFooter from '../../sale-services/services-common/ServicesFooter';
import SendTitleHeader from '../FreqShippedAddresses/SendTitleHeader/Controller/sendTitleHeader';

export default class SendContent extends Component {

  constructor(props){
    super(props);

    this.state ={
      test : false,
      componentName: this.props.initialComponent
      
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
                      />,
                      <ServicesFooter additionalStyle='sendComponent-offset'>
                        <div  className="giftwrap-cancel" onClick={this.navigateToSale}><span className="giftwrap-cancel-text">Cancel</span></div>
                          <div className="giftwrap-next" 
                            onClick={() => this.componentChangeHandler("sendweightchart")}>
                        <span className="giftwrap-next-text">Next</span></div>
                      </ServicesFooter>
                      ]
                      );
    }
    else if(this.state.componentName === "customerForm"){
      compToDisplay = (
                        [
                        <SendTitleHeader 
                            title = {"Recipient"} 
                        />,
                        <CustomerEditForm 
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
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        />,
                        <ServicesFooter additionalStyle='sendComponent-offset'>
                          <div  className="giftwrap-cancel" onClick={this.navigateToSale}><span className="giftwrap-cancel-text">Cancel</span></div>
                            <div className="giftwrap-next" 
                              onClick={() => this.componentChangeHandler("itemsToBeShipped")}>
                          <span className="giftwrap-next-text">Next</span></div>
                        </ServicesFooter>
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
                        <div className="giftwrap-cancel" onClick={this.navigateToSale}>
                          <span className="giftwrap-cancel-text">Cancel</span>
                        </div>
                        {footerButton}
                      </ServicesFooter>
                      ])
    }

    else if(this.state.componentName === "sendweightchart"){
      compToDisplay = ([<SendWeightChart
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
                      />,
                      <ServicesFooter additionalStyle='sendComponent-offset'>
                        <div  className="giftwrap-cancel" onClick={this.navigateToSale}><span className="giftwrap-cancel-text">Cancel</span></div>
                          <div className="giftwrap-next">
                        
                        <span className="giftwrap-next-text">Next</span></div>
                      </ServicesFooter>
                      ]);
    }

    else{
      // compToDisplay = (<CustomerEditForm 
      //                   salutation={this.props.salutation}
      //                   firstName={this.props.firstname}
      //                   lastName={this.props.lastname}
      //                   currentLvl={this.props.currentlvl}
      //                   skipCustomerInfo={this.props.isSkip}
      //                   address1={this.props.address1}
      //                   address2={this.props.address2}
      //                 />);
    }
    return compToDisplay;
  }

  componentChangeHandler = (value) => {
    this.setState({
      componentName: value
    })
    this.componentToRender();
    console.log('STATE VALUE', this.state.optionSeven)
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
