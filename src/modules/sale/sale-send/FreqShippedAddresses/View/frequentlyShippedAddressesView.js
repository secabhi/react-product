import React, { Component, Fragment } from 'react';

import './frequentlyShippedAddresses.css';
import AddressCards from '../AddressCards/Controller/addressCards';
import SendTitleHeader from '../SendTitleHeader/Controller/sendTitleHeader';
import ServicesFooter from '../../../sale-services/services-common/ServicesFooter';
import AddCustomer from '../../../../../resources/images/Add_Customer.svg';

export default class FrequentlyShippedAddressesView extends Component{


    render(){
        console.log('Sweezey frequestshippAddressesview this.props ',this.props);
        const addCustomerButton = (
            <div className="freqShipped-Addcustomer-container">
                <div className="freqShipped-AddCustomer-button"><img src={AddCustomer} /></div>
                <div className="freqshipped-AddCustomer-text">ADD CUSTOMER</div>
            </div>
        )
        const aSelectionHasBeenMade = this.props.SelectedAddress !== null ? true : false;
        //if emailTracking email comes from modals we use that over the stored one
        const email = this.props.emailTrackingInfo.clientele.email ? this.props.emailTrackingInfo.clientele.email : this.props.email;

        //if we have clientelle
        if(this.props.moreCustomerData){
            //moreCustomerData comes from redux customerDetails store
            var frequentAddresses = this.props.moreCustomerData.physicalAddresses.map( (address, index) => {
                console.log('index', index);
                const streetAddress = `${address.addressLines[0]}, ${address.addressLines[1]},${address.addressLines[2]}`
                const city = `${address.cityName}`;
                const country = `${address.countryName}`
                const postalCode = `${address.postalCode}`

            return (<AddressCards
                key={index}
                index = {index}
                changeAddressSelected = {(index) => this.props.changeAddressSelected(index)}
                selectedAddress = {this.props.selectedAddress}
                name = {`${this.props.lastName}, ${this.props.firstName} ${this.props.salutation}`}
                phoneNumber = {this.props.mobile}
                address = {`${streetAddress} ${city} ${country} ${postalCode}`}
                email = {email}
            />)
            })
        }

        return(
            <Fragment>
                <SendTitleHeader 
                    title = {"Frequently Shipped Addresses"}
                    optional={addCustomerButton}
                />

                <div className="freq-shipped-address-container">
                    {frequentAddresses}  
                </div>

                <ServicesFooter additionalStyle={'sendComponent-offset'}>
                    <div  className="giftwrap-cancel" onClick={this.navigateToSale}><span className="giftwrap-cancel-text">Cancel</span></div>
                    <div className={aSelectionHasBeenMade ? 'giftwrap-next' : 'giftwrap-next element-disabled'} 
                        onClick={() => this.props.componentChangeHandler("customerForm")}>
                    <span className="giftwrap-next-text">Next</span></div>
                </ServicesFooter>
            </Fragment>
        )
    }
}