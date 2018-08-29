import React, { Component } from 'react';

import './addressCards.css';

export default class AddressCardsView extends Component {
    
    render() {
        const index = this.props.index;
        
        return (
            <div className="address-card-container" 
                style={this.props.selectedAddress === index ? {border: '2px solid purple'} : {}}
                onClick={() =>{
                    console.log("SHIV CLICKED HERE HUEHUEHUE:", this.props.address);
                    this.props.freqShippedSelectedHandler(this.props.address);
                    this.props.changeAddressSelected(index);}}
            >
                <div className="address-card-container-data data-name">
                    {this.props.firstName + " " + this.props.lastName}
                </div>
                <div className="address-card-container-data data-phoneNumber">
                    {this.props.phoneNumber}
                </div>
                <div className="address-card-container-data data-email">
                    {this.props.email}
                </div>
                <div className="address-card-container-data data-address">
                    {this.props.address1 + " " + this.props.address2 + " " + this.props.city + " " + this.props.state + " " + this.props.zip}
                </div>
            </div>
        );
    }
}