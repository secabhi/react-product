import React, { Component } from 'react';

import AddressCardsView from '../View/addressCardsView'

export default class AddressCards extends Component {
    render() {
        return (
            <AddressCardsView 
                name = {this.props.name}
                phoneNumber = {this.props.phoneNumber}
                address = {this.props.address}
                email = {this.props.email}
                key={this.props.key}
                index = {this.props.index}
                changeAddressSelected = {(index) => this.props.changeAddressSelected(index)}
                selectedAddress = {this.props.selectedAddress}

            />
        );
    }
}