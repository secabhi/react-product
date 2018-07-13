import React, { Component } from 'react';
import './send-content.css';

import FrequentlyShippedAddresses from '../FreqShippedAddresses/Controller/frequentlyShippedAddresses';
import ItemsToBeShipped from '../ItemsToBeShipped/Controller/itemsToBeShipped';
import CustomerEditForm from '../../../common/customerEditForm/Controller/customerEditForm';
import SendWeightChart from '../SendWeightChart/Controller/SendWeightChart';
import OptionSeven from '../OptionSeven/OptionSeven';

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
      compToDisplay = (<ItemsToBeShipped
                        items = {this.props.items}
                      />);
    }
    else if(this.state.componentName === "customerForm"){
      compToDisplay = (<CustomerEditForm 
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
                      />)
    }
    else if(this.state.componentName === "frequentShippedAddress"){
      compToDisplay = (<FrequentlyShippedAddresses 
                        changeComponent={this.componentToRender}
                      />);
    }
    else if(this.state.componentName === "optionSeven" ) {
      compToDisplay =(<OptionSeven
                        items={this.props.items}
                        optionSeven={(value) => {this.props.optionSeven(value)}}
                        shippingOption={(value) => {this.props.shippingOption(value)}}
                        selectStore = {(value) => {this.props.selectStore(value)}}
                        optionSevenState={this.props.optionSevenState}
                        selectStoreState={this.props.selectStoreState}
                        shippingOptionState={this.props.shippingOptionState}
                    />)
    }
    else if(this.state.componentName === "sendweightchart"){
      compToDisplay = (<SendWeightChart
                        componentChangeHandler={(value) => {this.componentChangeHandler(value)}}
                        initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
                        />);
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
