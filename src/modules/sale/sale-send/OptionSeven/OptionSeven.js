import React, { Component } from 'react';

import QuantityValidation from './QuantityValidation/QuantityValidation';
import ShippingOptions from './ShippingOptions/ShippingOptions';
import SelectStore from './SelectStore/SelectStore';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { optionSevenSendApi } from './OptionSevenActions';
import { startSpinner } from '../../../common/loading/spinnerAction';


class OptionSeven extends Component {
    constructor(props) {
        super(props)

        this.state = {    
        }

        this.optionSevenObject = {
            shippingOption: undefined,
            shippingFee: undefined,
            overrideCode: undefined,
            storeNumber: undefined,
            associatePin: undefined
        }
    }

    render() {
        console.log('API OBJECT VALUES', this.optionSevenObject)
        return (

        <div>
            {this.displayComponent()}
        </div>   

        )
    }

    displayComponent = (component) => {
        // Renders component based on state changed
        var renderComponent;
        if(this.props.shippingOptionState === "shippingOption") {
            renderComponent = (
                            <ShippingOptions
                                optionSevenObject={this.optionSevenObject}
                                setObject={(value) => {this.setOptionSevenObject(value)}}
                                navigate={this.props.navigate}
                            />
                                );
        }
        else {
            renderComponent = (
                        <QuantityValidation
                            navigate={this.props.navigate} 
                            items={this.props.items} 
                            optionSevenObject={this.optionSevenObject}
                            setObject={(value) => {this.setOptionSevenObject(value)}}
                            shippingOption = {(value) => {this.setShippingOption(value)}}
                        />
                        );
        }

        return renderComponent;

    }

    setOptionSevenObject = (value) => {
        // Gathers required api params from child components
        this.optionSevenObject = value
        console.log('setoption7FUNC', this.optionSevenObject)
    }

    optionSevenSendCall = () => {
        // Api Call
        const optionSevenSendObj = {};

        this.props.startSpinner(true);
        // this.props.optionSevenSendApi(optionSevenSendObj);

    }


}; // END CLASS

function mapStateToProps({ optionSevenSend, cart, selectedItems }) {
    return {
        optionSevenSend,
        cart, 
        selectedItems
            }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {  
            optionSevenSendApi,
            startSpinner

        }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OptionSeven);
