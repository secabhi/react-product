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
                componentChangeHandler={(value, typeOfSend) => {this.props.componentChangeHandler(value, typeOfSend)}}
                initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
                optionalFooter={this.props.optionalFooter}
                updateObjectHandler={this.props.updateObjectHandler}
                history={this.props.history}
                updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                getShipmentOptions={this.props.getShipmentOptions}
                sendResponseObject={this.props.sendResponseObject}
                shipmentOptionsReqestObject={this.props.shipmentOptionsReqestObject}
            />
            
        )
    }
}

