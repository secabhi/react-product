import React, { Component } from 'react';

import SendWeightChartView from '../View/SendWeightChartView';
import OptionSeven from '../../OptionSeven/OptionSeven';


export default class SendWeightChart extends Component {

    constructor(props){
        super(props);

        this.state = {
            componentToNavigateTo:""
        }
    }

    sendTypeHandler = (e) =>{
        this.setState({componentToNavigateTo: e.target.value})
    }

    render() {
        return (
            <SendWeightChartView 
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                initializeOptionSeven={(value) =>{this.props.initializeOptionSeven(value)}}
                optionalFooter={this.props.optionalFooter}
                updateObjectHandler={this.props.updateObjectHandler}
                sendTypeHandler={this.sendTypeHandler}
                componentToNavigateTo={this.state.componentToNavigateTo}
                history={this.props.history}
                updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                getShipmentOptions={this.props.getShipmentOptions}
                sendResponseObject={this.props.sendResponseObject}
                shipmentOptionsReqestObject={this.props.shipmentOptionsReqestObject}
            />
            
        )
    }
}

