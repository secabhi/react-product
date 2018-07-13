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
            />
        );
    }
}