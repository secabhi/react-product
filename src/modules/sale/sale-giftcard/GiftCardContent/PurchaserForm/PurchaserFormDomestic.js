import React, { Component } from 'react';
import CustomerEditForm from '../../../../common/customerEditForm/Controller/customerEditForm';
import CustomerEditFormView from '../../../../common/customerEditForm/View/customerEditFormView';

export default class PurchaserFromDomestic extends Component {
  render() {
    return (
      <div>
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
          userPin={this.props.userPin}
        />
      </div>
    )
  }
};
