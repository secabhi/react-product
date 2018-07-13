import React, { Component } from 'react';

import QuantityValidation from './QuantityValidation/QuantityValidation';
import ShippingOptions from './ShippingOptions/ShippingOptions';
import SelectStore from './SelectStore/SelectStore';


class OptionSeven extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    // continueOptionSeven = () => {
    //     if(this.props.optionSeven) {

    //     }
    // }

    displayComponent = (component) => {
        console.log('option7 props', this.props)
        var renderComponent;
        // this.props.shippingOption("shippingOption")
        if(this.props.shippingOptionState === "shippingOption") {
            console.log('shippinoptions',this.props)
            renderComponent = (<ShippingOptions/>);
        }
        else {
            renderComponent = (<QuantityValidation
                            navigate={this.props.navigate} 
                            items={this.props.items} 
                            optionSeven={(value) => {this.props.optionSeven(value)}} 
                            shippingOption = {(value) => {this.setShippingOption(value)}}/>)
        }

        return renderComponent;

    }

    render() {

        return (
        <div>

        {this.displayComponent()}
            {/* <div>Quantity Validation</div>     */}
          {/*  <ShippingOptions navigate={this.props.navigate}/> shippingOption = {(true) => {this.setShippingOption(true)}} */} {/*commented to check the selectstore*/}
          {/* <SelectStore navigate={this.props.navigate}/> */}
          {/* <QuantityValidation
          navigate={this.props.navigate} 
                            items={this.props.items}  */}
          {/* />  */}

        </div>        
        )
    }
};

export default OptionSeven;
