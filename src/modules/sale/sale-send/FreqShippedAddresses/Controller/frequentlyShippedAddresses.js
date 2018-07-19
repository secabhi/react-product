import React, { Component } from 'react';

import FrequentlyShippedAddressesView from '../View/frequentlyShippedAddressesView';


export default class FrequentlyShippedAddresses extends Component {

    constructor(props){
        super(props);
        //selectedAddress should be an index of the physicalAddress field in customerDetails store
        this.state={selectedAddress: null}
    }

    render() {
        return (
            <FrequentlyShippedAddressesView 
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                emailTrackingInfo={this.props.emailTrackingInfo}
                moreCustomerData={this.props.moreCustomerData}
                selectedAddress={this.state.selectedAddress}
                changeAddressSelected={(index) => this.changeAddressSelected(index)}
                salutation={this.props.salutation}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                mobile={this.props.mobile}
                email={this.props.email}
            />
        )
    }

    changeAddressSelected(index) {
        this.setState({selectedAddress: index});
    }
}

