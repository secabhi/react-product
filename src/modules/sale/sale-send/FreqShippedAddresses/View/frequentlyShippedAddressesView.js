import React, { Component, Fragment } from 'react';

import './frequentlyShippedAddresses.css';
import AddressCards from '../AddressCards/Controller/addressCards';
import SendTitleHeader from '../SendTitleHeader/Controller/sendTitleHeader';
import ServicesFooter from '../../../sale-services/services-common/ServicesFooter';
import AddCustomer from '../../../../../resources/images/Add_Customer.svg';

var test = {
    "addresses": [
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "123 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "124 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
            {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "125 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "126 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "123 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "123 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
        {
            "phone": [
                "1231231231 "
            ],
                "firstName": "POOJA ",
                "lastName": "MURALI ",
                "email": "pooja_murali@neimanmarcus.com ",
                "address1": "123 test lane",
                "address2": '',
                "city": "BANGALORE ",
                "state": "",
                "zip": "560078 ",
                "clientNumber": "0010000000003",
                "sequence": "1"
        },
    ],
    "response_code": 0,
    "response_text": "IM_SUCCESS"
}

export default class FrequentlyShippedAddressesView extends Component{


    render(){
        const addCustomerButton = (
            <div className="freqShipped-Addcustomer-container">
                <div className="freqShipped-AddCustomer-button" 
                onClick={() => this.props.componentChangeHandler("senderForm")}><img src={AddCustomer} /></div>
                <div className="freqshipped-AddCustomer-text">ADD CUSTOMER</div>
            </div>
        )
        const aSelectionHasBeenMade = this.props.SelectedAddress !== null ? true : false;
        //if emailTracking email comes from modals we use that over the stored one
        const email = this.props.emailTrackingInfo.clientele.email ? this.props.emailTrackingInfo.clientele.email : this.props.email;

        //if we have clientelle
        if(this.props.sendResponseObject.frequentlyShippedAddresses.addresses){
            //moreCustomerData comes from redux customerDetails store
            var frequentAddresses = this.props.sendResponseObject.frequentlyShippedAddresses.addresses.map( (address, index) => {
                console.log('index', index);
                const streetAddress = `${address.address1}, ${address.address2}`
                const city = `${address.city}`;
                const country = `${address.country}`
                const postalCode = `${address.zip}`

            return (<AddressCards
                key={index}
                index = {index}
                changeAddressSelected = {(index) => this.props.changeAddressSelected(index)}
                selectedAddress = {this.props.selectedAddress}
                firstName = {address.firstName}
                lastName = {address.lastName}
                phoneNumber = {address.phone?address.phone[0]:''}
                address1 = {address.address1}
                address2 = {address.address2}
                city={address.city}
                state={address.state}
                zip={address.zip}
                email = {address.email}
                address={address}
                freqShippedSelectedHandler={this.props.freqShippedSelectedHandler}
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
                    <div  className="giftwrap-cancel" onClick={this.props.history.goBack}><span className="giftwrap-cancel-text">Cancel</span></div>
                    <div className={aSelectionHasBeenMade ? 'giftwrap-next' : 'giftwrap-next element-disabled'} 
                        onClick={() => this.props.componentChangeHandler("senderForm")}>
                    <span className="giftwrap-next-text">Next</span></div>
                </ServicesFooter>
            </Fragment>
        )
    }
}