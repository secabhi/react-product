import React, { Component } from 'react';

import SendWeightChartView from '../View/SendWeightChartView';
import OptionSeven from '../../OptionSeven/OptionSeven';


export default class SendWeightChart extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <SendWeightChartView 
            optionSeven={(value) => {this.props.optionSeven(value)}}
            initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
            />
            
        )
    }
}

