import React, { Component } from 'react';
import './GiftCardContent.css'


import ScanOrSwipeGiftCard from './ScanOrSwipeGiftCard/ScanOrSwipeGiftCard';
import GiftCardAmount from './GiftCardAmount/GiftCardAmount';
import PurchaserForm from './PurchaserForm/PurchaserFormDomestic';

export default class GiftCardContent extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     component: ''
        // }
    }

    render() {
        console.log('content--props', this.props)
        return (
            <div className="giftcard-content-container">
                {this.renderComponent()}
            </div>
        )
    }


    renderComponent = () => {
        let displayComponent;
      
        if (this.props.component === 'giftCardAmount') {
            displayComponent = (<GiftCardAmount
                                 validCardNumber={this.props.validCardNumber}
                                 validIncreaseAmount={this.props.validIncreaseAmount}
                                 licenseModal={this.props.licenseModal}
                                 closeDLmodal={this.props.closeDLmodal}
                                 getIncreaseAmount={(value) => {this.props.getIncreaseAmount(value)}}
                                 componentToRender={(value) => {this.props.componentToRender(value)}}
                                //  getCardNumber={(value) => {this.props.getCardNumber(value)}}
                                //  component={(value) => {this.getComponentValue(value)}}
                                />)
        } 

        else if (this.props.component === 'purchaser') {
            displayComponent = (<PurchaserForm
                                component={this.props.component}
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
                                />)
        }

        else {
            displayComponent = (<ScanOrSwipeGiftCard
                                 validateCard={(value) => {this.props.validateCard(value)}}
                                 getCardNumber={(value) => {this.props.getCardNumber(value)}}
                                />)
        }
      
        return displayComponent;
      }
      
};
