import React, { Component } from 'react';

import './addressCards.css';

export default class AddressCardsView extends Component {
    render() {
        return (
            <div className="address-card-container">
                <div className="address-card-container-data data-name">
                    {this.props.name}
                </div>
                <div className="address-card-container-data data-phoneNumber">
                    {this.props.phoneNumber}
                </div>
                <div className="address-card-container-data data-email">
                    {this.props.email}
                </div>
                <div className="address-card-container-data data-address">
                    {this.props.address}
                </div>
            </div>
        );
    }
}