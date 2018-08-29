import React, { Component } from 'react';
import './GiftCardContent.css'


import ScanOrSwipeGiftCard from './ScanOrSwipeGiftCard/ScanOrSwipeGiftCard';
import GiftCardAmount from './GiftCardAmount/GiftCardAmount';
import PurchaserForm from './PurchaserForm/PurchaserForm';

export default class GiftCardContent extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         component: ''
    //     }
    // }

    render() {
        console.log('content--props', this.props)
        if (this.props.component === 'purchaser') {
            return (
                <div className="gift-card">
                    {this.renderComponent()}
                </div>
            )
        } else {
            return (
                <div className="giftcard-content-container">
                    {this.renderComponent()}
                </div>
            )
        }
    }


    renderComponent = () => {
        let displayComponent;

        if (this.props.component === 'giftCardAmount') {
            displayComponent = (<GiftCardAmount
                validCardNumber={this.props.validCardNumber}
                validIncreaseAmount={this.props.validIncreaseAmount}
                licenseModal={this.props.licenseModal}
                closeDLmodal={this.props.closeDLmodal}
                getIncreaseAmount={(value) => { this.props.getIncreaseAmount(value) }}
                getDLNumber={(value) => { this.props.getDLNumber(value) }}
                getRecipientFirstName={(value) => { this.props.getRecipientFirstName(value) }}
                getRecipientLastName={(value) => { this.props.getRecipientLastName(value) }}
                componentToRender={(value) => { this.props.componentToRender(value) }}
                aurusIssueGiftCard={this.props.aurusIssueGiftCard}
                validateLicenseCall={this.props.validateLicenseCall}
                GC_data={this.props.GC_data}
                getGiftCardClass={this.props.getGiftCardClass}
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
                giftCardAction={this.props.addGiftCardAction}
                navigateToSale={this.props.navigateToSale}
                getGiftCardCartItems={this.props.getGiftCardCartItems}
                addGiftCardCall={this.props.addGiftCardCall}
                validDLNumber={this.props.validDLNumber}
                DL_firstName={this.props.DL_firstName}
                DL_lastName={this.props.DL_lastName}
                DL_address={this.props.DL_address}
                DL_city={this.props.DL_city}
                DL_state={this.props.DL_state}
                DL_zipCode={this.props.DL_zipCode}
                DL_number={this.props.DL_number}
                DL_dob={this.props.DL_dob}
                customerDetails={this.props.customerDetails}
            />)
        }

        else {
            displayComponent = (<ScanOrSwipeGiftCard
                error={this.props.error}
                aurusCardLookup={() => {this.props.aurusCardLookup()}}
                sameGiftcardNumber={this.props.same_giftCardNumber}
                validateCard={(value) => { this.props.validateCard(value) }}
                getCardNumber={(value) => { this.props.getCardNumber(value) }}
            />)
        }

        return displayComponent;
    }

};
