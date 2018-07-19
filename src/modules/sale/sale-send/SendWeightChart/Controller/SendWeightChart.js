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
            componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
            initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
            />
            
        )
    }
}

