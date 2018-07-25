import React, { Component } from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './SendWeightChart.css';

export default class SendWeightChartView extends Component{

    constructor(props){
        super(props);

        this.state = {
            doneWithApiCall:false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.sendResponseObject != prevProps.sendResponseObject){
            this.setState({doneWithApiCall:true});
            console.log('SHIV:SENDWEIGHT OPTIONS OBJECT',this.props.sendResponseObject.shippingOptionsResponse)
            console.log('SHIV:SENDWEIGHT OPTIONS OBJECT',this.props.sendResponseObject.shippingOptionsResponse.data.shippingOptions)
            this.setState({doneWithApiCall:true})
        }

        if(this.state.doneWithApiCall != prevState.doneWithApiCall){
            this.props.componentChangeHandler(this.props.componentToNavigateTo)
        }
    }

    render(){

        const ServicesFooter = this.props.optionalFooter;

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
            height: (window.innerWidth > 1900) ? '50px' : '60px',
            width: (window.innerWidth > 1900) ? '50px' : '60px',
            fill: '#4b2b6f'
        }

        const inputStyle = {
            color: '#4b2b6f',
            width:'inherit',

        }

        const labelStyle = {
            width:'initial',
            lineHeight:"1.5"
        }
        

        return(
        <div className="WeightSend-options-container">            
            <div className="Weight-options-container">
                <div className="Weight-options-text">Weight Chart</div>
                    <div className="WeightSend-options-list-large">
                        <div className="WeightSend-options-list ">           
                            <RadioButtonGroup name="weightChart" className="WeightSend-options-list">
                                <RadioButton className="WeightSend-option"
                                    value="1"
                                    label={"1 pd - Standard"}
                                    onClick={(e) => {
                                         console.log(e.target.value) 
                                         this.props.updateObjectHandler("SendWeight", e.target.value)
                                         this.props.updateShipmentOptionsObject("Weight", e.target.value)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="10"
                                    label={"10 pd - Hanging Carton - Suits / Gowns"}
                                    onClick={(e) => {
                                        this.props.updateObjectHandler("SendWeight", e.target.value)
                                        this.props.updateShipmentOptionsObject("Weight", e.target.value)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="71"
                                    label={"71 pd - Oversized > 70 lb"}
                                    onClick={(e) => {
                                        this.props.updateObjectHandler("SendWeight", e.target.value)
                                        this.props.updateShipmentOptionsObject("Weight", e.target.value)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="5"
                                    label={"5 pd - Associate Sale"}
                                    onClick={(e) => {
                                        this.props.updateObjectHandler("SendWeight", e.target.value)
                                        this.props.updateShipmentOptionsObject("Weight", e.target.value)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                            </RadioButtonGroup>
                        </div>
                    </div>
                    <div className="WeightSend-options-list-small">
                        <div className="WeightSend-options-list">           
                            <div className="WeightSend-option">1 pound for non/ oversize, overweight merchandise 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>
                            <div className="WeightSend-option">10 pounds for merchandise shipped in a hanging carton. 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>
                            <div className="WeightSend-option">71 pounds for oversize, overweight merchandise. 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>                                
                        </div>
                    </div>
                </div>
                <div className="Send-options-container">
                    <div className="Send-options-text">Choose Send Type</div>
                        <div className="WeightSend-options-list">
                            
                            <RadioButtonGroup name="weightChart" className="WeightSend-options-list">
                                <RadioButton className="WeightSend-option"
                                    value="shippingOptions"
                                    label={"From This Store"}
                                    onClick={(e) => {
                                         console.log(e.target.value) 
                                         this.props.sendTypeHandler(e)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="optionSeven"
                                    label={"From Other Location"}
                                    onClick={(e) => {
                                        //this.setShippingFee(e);
                                        console.log(e.target.value)
                                        this.props.sendTypeHandler(e)
                                        {/* this.props.initializeOptionSeven("optionSeven") */}
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="shippingOptions1"
                                    label={"Precious Jewelry"}
                                    onClick={(e) => {
                                        console.log(e.target.value) 
                                         this.props.sendTypeHandler(e)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                                <RadioButton className="WeightSend-option"
                                    value="shippingOptions2"
                                    label={"Leased Departments"}
                                    onClick={(e) => {
                                        console.log(e.target.value) 
                                         this.props.sendTypeHandler(e)
                                        //this.setShippingFee(e);
                                    }}
                                    iconStyle={iconStyle}
                                    inputStyle={inputStyle}
                                    labelStyle={labelStyle}
                                />
                            </RadioButtonGroup>
                
                        </div>
                    </div>
                    <ServicesFooter additionalStyle='sendComponent-offset'>
                        <div  className="giftwrap-cancel" onClick={() => {this.props.history.goBack()}}><span className="giftwrap-cancel-text">Cancel</span></div>
                        <div className="giftwrap-next"  onClick={() => 
                            {
                                console.log("SHIV:", this.props.shipmentOptionsReqestObject)
                                this.props.getShipmentOptions(this.props.shipmentOptionsReqestObject)
                            }}>
                        <span className="giftwrap-next-text">Next</span></div>
                      </ServicesFooter>
                </div>
           
        )
    }
}