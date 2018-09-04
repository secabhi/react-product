import React, { Component } from 'react';

import AddressCardsView from '../View/addressCardsView'

export default class AddressCards extends Component {
    render() {
        return (
            <AddressCardsView 
                firstName = {this.props.firstName}
                lastName = {this.props.lastName}
                city={this.props.city}
                state={this.props.state}
                zip={this.props.zip}
                phoneNumber = {this.props.phoneNumber}
                address1 = {this.props.address1}
                address2 = {this.props.address2}
                email = {this.props.email}
                key={this.props.key}
                index = {this.props.index}
                changeAddressSelected = {(index) => this.props.changeAddressSelected(index)}
                selectedAddress = {this.props.selectedAddress}
                address={this.props.address}
                freqShippedSelectedHandler={this.props.freqShippedSelectedHandler}

            />
        );
    }
}