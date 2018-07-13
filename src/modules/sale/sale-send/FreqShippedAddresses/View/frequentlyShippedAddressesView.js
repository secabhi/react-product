import React, { Component } from 'react';

import './frequentlyShippedAddresses.css';
import AddressCards from '../AddressCards/Controller/addressCards';
import SendTitleHeader from '../SendTitleHeader/Controller/sendTitleHeader';

import AddCustomer from '../../../../../resources/images/Add_Customer.svg';

export default class FrequentlyShippedAddressesView extends Component{

    constructor(props){
        super(props);

    }

    render(){
        const addCustomerButton = (
            <div className="freqShipped-Addcustomer-container">
                <div className="freqShipped-AddCustomer-button"><img src={AddCustomer} /></div>
                <div className="freqshipped-AddCustomer-text">ADD CUSTOMER</div>
            </div>
        )

        return(
            [
            <SendTitleHeader 
                title = {"Frequently Shipped Addresses"}
                optional={addCustomerButton}
            />,
            <div className="freq-shipped-address-container">
                {/*need to map through data from api here and populate each address card  */}
                <AddressCards
                    name = {"Jones, Barbara Mrs."}
                    phoneNumber = {"123-456-7890"}
                    address = {"908 anystreetUnit, 50 Anytown, IL 60500"}
                    email = {"abcdef@gmail.com"}
                />
                
            </div>
            ]
        )
    }
}