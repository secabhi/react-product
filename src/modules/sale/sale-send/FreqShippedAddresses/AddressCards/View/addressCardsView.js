import React, { Component } from 'react';

import './addressCards.css';

export default class AddressCardsView extends Component {
    
    render() {
        console.log('Sweezey AddressCardView this.props', this.props);
        const index = this.props.index;
        
        return (
            <div className="address-card-container" 
                style={this.props.selectedAddress === index ? {border: '2px solid purple'} : {}}
                onClick={() => this.props.changeAddressSelected(index)}
            >
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