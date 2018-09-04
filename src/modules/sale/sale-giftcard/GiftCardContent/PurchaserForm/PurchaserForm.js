import React, { Component } from 'react';
// import CustomerEditForm from '../../../common/customerEditForm/Controller/customerEditForm';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';

import './PurchaserForm.css';
import CustomerEditForm from '../../../../common/customerEditForm/Controller/customerEditForm';


export default class PurchaserFrom extends Component {
  constructor(props) {
      super(props);

        this.state = {
            intlForm: undefined
        }
  } 

  render() {
    const intlButton = () => (
        <div className="purchaser-form-button" 
        onClick={
            () => {this.setInternational()}
        }>
            <span className="intl-button">INT'L ADDRESS</span>
          </div>
    );

    return (
      
      <div className="purchaser-form-container">
      
        {this.props.component?null:<div className="purchaser-form-subheader">
          <div className="purchaser-form-label">Purchaser</div>
        </div>}


        <CustomerEditForm
            toggleInternational={() => intlButton()}
            intlState={this.state.intlForm}
            component={this.props.component}
            cssId={this.props.cssId}
            currentLvl={this.props.currentLvl}
            skipCustomerInfo={this.props.isSkip}
            salutation={this.props.salutation}
            firstName={this.props.DL_firstName?this.props.DL_firstName:this.props.firstName}
            lastName={this.props.DL_lastName?this.props.DL_lastName:this.props.lastName}
            address1={this.props.DL_address?this.props.DL_address:this.props.address1}
            address2={this.props.address2}
            mobile={this.props.mobile}
            otherMobile={this.props.otherMobile}
            city={this.props.DL_city?this.props.DL_city:this.props.city}
            state={this.props.DL_state?this.props.DL_state:this.props.state}
            email={this.props.email}
            country={this.props.country}
            zip={this.props.DL_zipCode?this.props.DL_zipCode:this.props.zip}
            userPin={this.props.userPin}
            optionalFooter={"span"}
            validDLNumber={this.props.DL_number}
            giftCardAction={ this.props.addGiftCardAction}
            navigateToSale = {this.props.navigateToSale}
            getGiftCardCartItems ={this.props.getGiftCardCartItems}
            addGiftCardCall = {this.props.addGiftCardCall}
            dob={this.props.DL_dob}
            formType={"purchaser"}
            customerDetails={this.props.customerDetails}
            
        />


      </div>
    )
  }

  setInternational = () => {
    this.setState({intlForm:'international'})
  }

};