import React, { Component } from 'react';

import FrequentlyShippedAddressesView from '../View/frequentlyShippedAddressesView';


export default class FrequentlyShippedAddresses extends Component {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <FrequentlyShippedAddressesView />
        )
    }
}

