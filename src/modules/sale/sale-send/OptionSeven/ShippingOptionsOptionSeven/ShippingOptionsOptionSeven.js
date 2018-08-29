import React, { Component } from 'react';
import {TextField} from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Modal from 'react-responsive-modal';
import { DeliveryModal } from '../OptionSevenModals';
//import SelectStore from '../SelectStore/SelectStore';
import './shipping-options-opt-7.css';
import '../option-seven.css';
import { Amount } from '../../../modal-component/modalComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startSpinner} from '../../../../common/loading/spinnerAction';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import {shippingOptionsApi} from '../OptionSevenActions';
import axios from 'axios';


class ShippingOptionsOptionSeven extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
            shippingDetails: {
                shippingFee : '',
                overrideCode : ''
            },
            delivery_modal : false,
            selectStore: false,
            overrideCode_error: '',


            shippingDetails: {
                shippingFee : '',
                overrideCode : ''
            },
            shippingFee:"",
            overrideCode : '',
            option:{
                option:'Shipping Fee',
                price:125.00,
                description:'Shipping Fee'
            },
            delivery_modal : false,
            selectStore: false,
            overrideCode:"",
            overrideCode_error: '',
            shippingOptions:[],
            isDisabled:true,
            defaultShippingFee:''

        }
     
        this.setShippingFee = this.setShippingFee.bind(this);
    }

    componentWillMount = () => {
     // console.log("SHIV:SHIPPING", this.props.shipmentOptionsReqestObject)
     // console.log("SHIV:SHIPPING",this.props.sendResponseObject)
    
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.optionSevenSend.dataFrom==='SHIPPING_OPTIONS_SEND'){

            this.setState({shippingOptions:nextprops.optionSevenSend.data.data.shippingOptions});
        }
	}
    componentDidMount = () => {
    
       this.props.shippingOptionsApiInvoker();      
       
    }

 

    setShippingFee  (e)  {
  
        if(this.state.defaultShippingFee!=e.target.value && e.target.value !='' ){
                  
                  this.setState({
                    shippingFee: e.target.value,
                    isDisabled:false                   
               })
        }
        else{
            this.setState({
                shippingFee: e.target.value,
                isDisabled:true
            })
        }
    }
    setOverrideCode = (e) => {
        
        this.setState({
                overrideCode: e.target.value
                 })

    }

    shippingOptionSelected = (event, value) => {
        this.setState({ shippingFee : this.state.shippingOptions[value-1].price ,
                        defaultShippingFee:   this.state.shippingOptions[value-1].price ,
                    isDisabled:true   });
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
            marginTop: '4px'
        }
        const  textFieldFloatingLabelStyle = {
            height: '38px',
            width: '300px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            lineHeight: '1.19',
            textAlign: 'left',
            color: '#333333'
        }
        const  textFieldStyle = {
            height: '60px',
            paddingTop: '30px',
            color: '#828282'
        }
        const underlineStyle = {
            backgroundColor: '#828282'
        }
        const errorStyle = {
            paddingTop:'15px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900?'32px':'32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'right',
            color: '#d53560', 
            bottom: "30px"
        }

        const iconStyle = {
            height: (window.innerWidth > 1900) ? '40px' : '60px',
            width: (window.innerWidth > 1900) ? '40px' : '60px',
            fill: '#4b2b6f'
        }

        const inputStyle = {
            color: '#4b2b6f',
            width:"inherit"
        }
        
        return(
            <form>
                <div className="shipping-options-container">
                    <Modal classNames={{modal: "delivery-modal"}} open={this.state.delivery_modal} onClose={() => this.setState({delivery_modal: false})} closeOnOverlayClick={false}>
                        <DeliveryModal 
                        //  setObject={(value) => {this.props.setObject(this.state.shippingDetails)}}
                        // selectStore={() => {this.renderSelectStore()}} 
                        closeModal={() => {this.exitModals()}} 
                        //   navigate={this.props.navigate}
                        /> 
                    </Modal>
                    
                    <div className="shipping-options-text">Shipping Options</div>
                    <div className="shipping-options-content">
                        <div className="shipping-options-list">
                            <h1></h1>
                            <RadioButtonGroup labelPosition="right" name="shipping-options"
                            onChange={this.shippingOptionSelected} >
                                { 
                                    this.state.shippingOptions.map((shippingOption) => (
                                       
                                            <RadioButton className="shipping-option"
                                                key={shippingOption.option}
                                                value={shippingOption.option}
                                                label={shippingOption.description + " - " + parseFloat(shippingOption.price).toFixed(2)}
                                                iconStyle={iconStyle}
                                                inputStyle={inputStyle}/> 
                                    ))
                                }
                            
                            </RadioButtonGroup> 
                        </div>
                        
                        <div className="shipping-options-form">

                            <TextField className="shipping-fee-textfield shipping-form-label"
                            type="number"
                            floatingLabelText="Shipping Fee"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            style={textFieldStyle}
                            fullWidth={true}
                            inputStyle={textFieldInputStyle} 
                            underlineStyle={underlineStyle}
                            value={this.state.shippingFee}
                            refs="ShippingFee" 
                            id="ShippingFee"
                             onChange={(e) =>{
                                     this.setShippingFee(e)
                             }}
                            inputStyle = {textFieldInputStyle}
                            refs="shipping-options-form" 
                            required
                            />

                            <TextField className="shipping-override-textfield shipping-form-label override-label"
                            type="number"
                            floatingLabelText="Override Code"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            style={textFieldStyle}
                            fullWidth={true}
                            inputStyle={textFieldInputStyle}
                            underlineStyle={underlineStyle}
                            value={this.state.overrideCode}
                            onChange={(e) =>
                            {
                            this.setOverrideCode(e)
                            }}
                            disabled={this.state.isDisabled}
                            inputStyle = {textFieldInputStyle}
                            errorStyle={errorStyle}
                            errorText={this.state.overrideCode_error}
                            refs="overrideCode"
                            />
        
                        </div>
                    </div>
                </div>
            </form>    
            
        );
    }
}


function mapStateToProps({optionSevenSend, cart, selectedItems}) {
    return {
		optionSevenSend, 
		cart, 
		selectedItems
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		startSpinner,
		shippingOptionsApiInvoker:shippingOptionsApi
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingOptionsOptionSeven);