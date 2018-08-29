import React, { Component } from 'react';

import FrequentlyShippedAddressesView from '../View/frequentlyShippedAddressesView';


export default class FrequentlyShippedAddresses extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedAddress:null,
        
        }
    }

    componentWillMount() {
        let freqShippedAPIObject = {
            "StoreAssoc":this.props.userPin,
            "TransactionId": "0023",
            "storeClientNo": this.props.customerDetails.clientNumber,

        }

        this.props.freqShippedAddressesAction(freqShippedAPIObject);
    }

    changeAddressSelected(index) {
        this.setState({selectedAddress: index});
    }

    render() {
        return (
            <FrequentlyShippedAddressesView 
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                customerDetails={this.props.customerDetails}
                emailTrackingInfo={this.props.emailTrackingInfo}
                frequentlyShippedAddresses={this.props.frequentlyShippedAddresses}
                selectedAddress={this.state.selectedAddress}
                changeAddressSelected={(index) => this.changeAddressSelected(index)}
                salutation={this.props.salutation}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                mobile={this.props.mobile}
                email={this.props.email}
                history={this.props.history}
                sendResponseObject={this.props.sendResponseObject}
                freqShippedSelectedHandler={this.props.freqShippedSelectedHandler}
            />
        )
    }
}
