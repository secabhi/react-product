import React, { Component } from 'react';
import {TextField} from 'material-ui';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import './shipping-options.css';
import '../option-seven.css';
import Modal from 'react-responsive-modal';
import { DeliveryModal } from '../OptionSevenModals';
import SelectStore from '../SelectStore/SelectStore';

export default class ShippingOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shippingFee : '',
            overrideCode : '',
            delivery_modal : false,
            selectStore: false
        }
    }

    renderDeliveryModal = () => {
        this.setState({
            delivery_modal: true
        })
    }

    renderSelectStore = (component) => {
        let displayComponent;
        if(this.state.selectStore === "selectStore") {
            displayComponent = (<SelectStore/>)
        }
    }

    exitModals = () => {
        this.setState({
            delivery_modal: false,
            selectStore: true
        })
    }

    

    render() {

        const textFieldInputStyle = {
            fontFamily: 'Roboto-Light',
            fontSize: (window.innerWidth > 1900) ? '32px': '56px',
            lineHeight: '1.19',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
        }

        return (
            <div>

            {this.state.selectStore ? <SelectStore /> :
            <div className="shipping-options-container">
                <Modal classNames={{modal: "delivery-modal"}} open={this.state.delivery_modal} onClose={() => this.setState({delivery_modal: false})} closeOnOverlayClick={false}>
                    <DeliveryModal 
                    selectStore={() => {this.renderSelectStore()}} 
                    closeModal={() => {this.exitModals()}} 
                    /> 
                </Modal>
            
            <div className="shipping-options-text">Shipping Options</div>

            <div className="shipping-options-content">
            <div className="shipping-options-list">
                
                    <div className="shipping-option">Surface&nbsp;-&nbsp; 
                        <input type="radio" name="radio" checked="checked"/>
                        <span className="radio-button"></span>
                        <span className="shipping-options-price">0.00</span>
                    </div>
                    

                    <div className="shipping-option">2nd Day Air&nbsp;-&nbsp; 
                        <input type="radio" name="radio"/>
                        <span className="radio-button"></span> 
                        <span className="shipping-options-price">15.00</span>
                    </div>

                    <div className="shipping-option" onClick={this.renderDeliveryModal}>Overnight Air&nbsp;-&nbsp;  
                        <input type="radio" name="radio"/>
                        <span className="radio-button"></span> 
                        <span className="shipping-options-price">25.00</span>
                    </div>

                    <div className="shipping-option">Courier&nbsp;-&nbsp; 
                        <input type="radio" name="radio"/>
                        <span className="radio-button"></span>  
                        <span className="shipping-options-price">125.00</span>
                    </div>

                    <div className="shipping-option">Priority AM (if available)&nbsp;-&nbsp; 
                        <input type="radio" name="radio"/>
                        <span className="radio-button"></span> 
                        <span className="shipping-options-price">36.00</span>
                    </div>
                    
                    <div className="shipping-option">Saturday Delivery&nbsp;-&nbsp;  
                        <input type="radio" name="radio"/>
                        <span className="radio-button"></span> 
                        <span className="shipping-options-price">41.00</span>
                    </div>
                
            </div>

            <div className="shipping-options-form">

                <label className="shipping-form-label">Shipping Fee</label>
                <TextField className="shipping-fee-textfield"
                    type="number"
                    value={this.state.shippingFee}
                    hintText="Shipping Fee"                    
                    // style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    refs="shipping-options-form" 
                />

                <label className="shipping-form-label override-label">Override Code</label>
                <TextField className="shipping-override-textfield"
                    type="text"
                    value={this.state.overrideCode}
                    hintText="Enter Override Code"
                    inputStyle = {textFieldInputStyle}
                    refs="shipping-options-form"
                />
            </div>
            </div>

        </div>
            }
        </div>
    )
  }
};
