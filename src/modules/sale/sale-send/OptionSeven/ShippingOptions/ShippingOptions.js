import React, { Component } from 'react';
import {TextField} from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Modal from 'react-responsive-modal';

import { DeliveryModal } from '../OptionSevenModals';
import SelectStore from '../SelectStore/SelectStore';
import './shipping-options.css';
import '../option-seven.css';

export default class ShippingOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shippingDetails: {
                shippingFee : '',
                defaultShippingFee:'',
                overrideCode : ''
            },
            delivery_modal : false,
            selectStore: false,
            overrideCode_error: '',

        }
        
        this.enableOverride = false;
        // this.state.shippingDetails = this.props.optionSevenObject;
    }

    componentWillMount = () => {
      console.log("SHIV:SHIPPING", this.props.shipmentOptionsReqestObject)
      console.log("SHIV:SHIPPING",this.props.sendResponseObject)
    
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.sendResponseObject.authCodeResponse.response_Text != this.props.sendResponseObject.authCodeResponse.response_Text){
            this.validateOverrideCode();
        }else if(prevProps.sendResponseObject.error != this.props.sendResponseObject.error){
            if(this.props.sendResponseObject.error === "AC_FAIL"){
                this.setState({overrideCode_error:"Auth Code Invalid"})
            }
        }

        if(prevProps.sendResponseObject.directSendResponse != this.props.sendResponseObject.directSendResponse){
            if(this.props.sendResponseObject.directSendResponse.data.response_text === "IM_SUCCESS"){
                this.props.clearForSend('SEND_CLEAR_RESPONSE');
                this.props.history.push('/sale');
            }
        }
    };
    

    
    render() {
        console.log('shipping options state', this.state)
        
        const ServicesFooter = this.props.optionalFooter;

        const textFieldInputStyle = {
            fontFamily: 'Roboto-Light',
            fontSize: (window.innerWidth > 1900) ? '25px': '56px',
            lineHeight: '1.19',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
        }

        const errorStyle = {
            marginTop:'20px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900?'22px':'32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'left',
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
            width:"inherit",
        }

        // Labels used for RadioButton
        const surfaceLabel = (
            <div className="shipping-options-label">Surface - 0.00</div>
        )

        const secondDayAirLabel = (
            <div className="shipping-options-label">2nd Day Air - 15.00</div>
        )

        const overNightLabel= (
            <div className="shipping-options-label">Overnight Air - 25.00</div>
        )

        const courierLabel = (
            <div className="shipping-options-label">Courier - 125.00</div>
        )

        const priorityLabel = (
            <div className="shipping-options-label">Priority AM - 36.00</div>
        )

        const saturdayLabel = (
            <div className="shipping-options-label">Saturday Delivery - 41.00</div>
        )


        return (
            <div>
           {this.state.selectStore ? <SelectStore 
                                        optionSevenObject={this.props.optionSevenObject} 
                                        setObject={(value) => {this.props.setObject(this.state.shippingDetails)}} 
                                        navigate={this.props.navigate}
                                        sendFromOtherStore={this.state.selectStore}
                                        /> :
            <div className="shipping-options-container">
                <Modal classNames={{modal: "delivery-modal"}} open={this.state.delivery_modal} onClose={() => this.setState({delivery_modal: false})} closeOnOverlayClick={false}>
                    <DeliveryModal 
                    setObject={(value) => {this.props.setObject(this.state.shippingDetails)}}
                    // selectStore={() => {this.renderSelectStore()}} 
                    closeModal={() => {this.exitModals()}} 
                    navigate={this.props.navigate}
                    /> 
                </Modal>
            
            <div className="shipping-options-text">Shipping Options</div>

            <div className="shipping-options-content">

            <div className="shipping-options-list">
             
                 <RadioButtonGroup 
                    name="shippingOptions" >
                     {this.props.sendResponseObject.shippingOptionsResponse.data.shippingOptions.map((option) => {
                         //console.log(this.props.sendResponseObject.shippingOptionsResponse.data)
                         console.log(option)
                        return <RadioButton className="shipping-option"
                            key={option.option}
                            value={option.price}
                            label={option.description + " - " + parseFloat(option.price).toFixed(2)}
                            onClick={(e) => {
                                this.constructShippingOptionObject(option)
                                this.setShippingFee(e)
                                }}
                            iconStyle={iconStyle}
                            inputStyle={inputStyle}
                        /> 
                    })} 
                </RadioButtonGroup>       
            </div>

            <div className="shipping-options-form">
                <label className="shipping-form-label">Shipping Fee</label>
                <TextField className="shipping-fee-textfield"
                    type="number"
                    value={this.state.shippingDetails.shippingFee}
                    placeholder="Shipping Fee"                    
                    //style = {textFieldStyle}
                    onChange={(e) => {
                        this.setShippingFeeManual(e)
                        console.log(this.enableOverride)
                        }}
                    inputStyle = {textFieldInputStyle}
                    refs="shipping-options-form" 
                />

                <label className="shipping-form-label override-label">Override Code</label>
                <TextField className="shipping-override-textfield"
                    disabled={!this.enableOverride}
                    type="number"
                    value={this.state.overrideCode}
                    onChange={(e) => {
                        this.setOverrideCode(e)
                        }}
                    placeholder="Enter Override Code"
                    inputStyle = {textFieldInputStyle}
                    errorStyle={errorStyle}
                    errorText={this.state.overrideCode_error}
                    refs="shipping-options-form"
                />
            </div>
            </div>

        </div>
           }
        <ServicesFooter additionalStyle='sendComponent-offset'>
            <div  className="giftwrap-cancel" onClick={() => {this.props.history.goBack()}}><span className="giftwrap-cancel-text">Cancel</span></div>
            <div className="giftwrap-next"  onClick={() => 
                {
                     {/* this.props.directSendRequest(this.props.sendApiRequestObject)
                     this.props.itemSelectedAction(''); 
                    this.props.history.push('/sale'); */}
                    if (this.state.shippingDetails.defaultShippingFee == this.state.shippingDetails.shippingFee){
                        this.props.directSendRequest(this.props.sendApiRequestObject);
                        this.props.itemSelectedAction('');
                    }else{
                        if((this.state.shippingDetails.defaultShippingFee != this.state.shippingDetails.shippingFee) && this.state.shippingDetails.overrideCode === ''){
                            console.log("Shiv overridecode")
                            this.setState({overrideCode_error:"Auth Code Required"})
                        }else{
                            this.props.updateObjectHandler("AuthCode", this.state.shippingDetails.overrideCode);
                            this.authCodeApiCall();
                        }
                    }
                }}>
            <span className="giftwrap-next-text">Next</span></div>
        </ServicesFooter>
        </div>
    )
  }

    constructShippingOptionObject = (obj) => {
        var shippingOptionObject = {
            "Option":obj.option,
            "Description":obj.description,
            "PriceType":obj.priceType,
            "InternationalFlag":obj.internationalFlag,
            "SurfaceFlag":obj.surfaceFlag,
            "Price":obj.price 
        }
        console.log("Shiv construct shippingOBJ", obj.option)
        this.props.updateObjectHandler("ShippingOption", shippingOptionObject);

    }

    setShippingFee = (e) => {
        // Retrieves the shipping fee
        var selectedShippingFee = e.target.value;
        console.log(selectedShippingFee)
        this.setState({
            shippingDetails : {
                ...this.state.shippingDetails,
                shippingFee: selectedShippingFee,
                defaultShippingFee: selectedShippingFee,
                overrideCode:'',
            },
            overrideCode_error:''
        })
        this.enableOverride = false
    }

    setShippingFeeManual = (e) => {
        // Retrieves the shipping fee
        var selectedShippingFee = e.target.value;
        this.setState({
            shippingDetails : {
                ...this.state.shippingDetails,
                shippingFee: selectedShippingFee,
            }
        })
        this.enableOverride = true
    }

    setOverrideCode = (e) => {
        // Retrieves the override code
        var selectedOverrideCode = e.target.value;
        this.setState({
            shippingDetails : {
                ...this.state.shippingDetails,
                overrideCode: selectedOverrideCode
            },
            overrideCode_error:''
        })
    }

    authCodeApiCall = () => {
        // SHIPPING OPTIONS API CALL

        // Request object for 
        let params =  {
            "TransactionId":this.props.homeReduxStore.transactionData?this.props.homeReduxStore.transactionData.transactionNumber:'',
            "AuthCode": this.state.shippingDetails.overrideCode,
        }

        this.props.authCodeRequest(params);
    }

    validateOverrideCode = () => {
        // FUNCTION TO VALIDATE THE DAILY OVERRIDECODE REQUIRED IN ORDER TO CHANGE THE SHIPPING FEE
        // PSUD0 CODE
        if(this.enableOverride && this.props.sendResponseObject.authCodeResponse.response_Text === 'AC_SUCCESS'){
            this.props.directSendRequest(this.props.sendApiRequestObject)
            this.props.itemSelectedAction(''); 
            // this.props.history.push('/sale');
        }
    }

    renderDeliveryModal = () => {
        this.setState({
            delivery_modal: true
        })
        this.props.setObject(this.state.shippingDetails)
    }

    // renderSelectStore = (component) => {
    //     let displayComponent;
    //     if(this.state.selectStore === "selectStore") {
    //         displayComponent = (<SelectStore/>)
    //     }
    // }


    exitModals = () => {
        // Closes the DevilaryModal and renders the SelectStore component
        this.setState({
            delivery_modal: false,
            selectStore: true
        })
    }

}; // END CLASS