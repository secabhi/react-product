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
                overrideCode : ''
            },
            delivery_modal : false,
            selectStore: false,
            overrideCode_error: '',

        }
        // this.state.shippingDetails = this.props.optionSevenObject;
    }

    componentWillMount = () => {
      console.log("SHIV:SHIPPING", this.props.shipmentOptionsReqestObject)
      console.log("SHIV:SHIPPING",this.props.sendResponseObject)
    
    }
    

    
    render() {
        console.log('shipping options state', this.state)
        
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
            height: (window.innerWidth > 1900) ? '40px' : '60px',
            width: (window.innerWidth > 1900) ? '40px' : '60px',
            fill: '#4b2b6f'
        }

        const inputStyle = {
            color: '#4b2b6f',
            width:"inherit"
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
                         //console.log(option)
                        return <RadioButton className="shipping-option"
                            key={option.option}
                            value={option}
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
                    hintText="Shipping Fee"                    
                    // style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    refs="shipping-options-form" 
                />

                <label className="shipping-form-label override-label">Override Code</label>
                <TextField className="shipping-override-textfield"
                    type="text"
                    value={this.state.overrideCode}
                    onChange={(e) => {
                        this.setOverrideCode(e)
                        }}
                    hintText="Enter Override Code"
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
                    this.props.directSendRequest(this.props.sendApiRequestObject)
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
        this.setState({
            shippingDetails : {
                ...this.state.shippingDetails,
                shippingFee: selectedShippingFee
            }
        })
    }

    setOverrideCode = (e) => {
        // Retrieves the override code
        var selectedOverrideCode = e.target.value;
        this.setState({
            shippingDetails : {
                ...this.state.shippingDetails,
                overrideCode: selectedOverrideCode
            }
        })
    }

    shippingOptionsApiCall = () => {
        // SHIPPING OPTIONS API CALL
        // this.props.getShipmentOptions(this.props.shipmentOptionsReqestObject)

        // SAMPLE SHIPPING OPTION OBJ
        // "ShippingOption": {
        //     "Option":"1",
        //     "Description":"Overnight Air",
        //     "PriceType":"ZONE2",
        //     "InternationalFlag":false,
        //     "SurfaceFlag":false,
        //     "Price":"51" 
        // }

        // ITERATE THROUGH SHIPPING OPTION OBJ AND RETURN VALUES IN RADIOBUTTON
        //  shippingOptions.map((option) => {
        //     <RadioButton className="shipping-option"
        //         key={option.Option}
        //         value={option.Price}
        //         label={option.Description}
        //         onClick={(e) => {
        //             this.setShippingFee(e);
        //         }}
        //         iconStyle={iconStyle}
        //         inputStyle={inputStyle}
        // />
        //  })
    }

    validateOverrideCode = () => {
        // FUNCTION TO VALIDATE THE DAILY OVERRIDECODE REQUIRED IN ORDER TO CHANGE THE SHIPPING FEE
        // PSUD0 CODE
        {/*
            if(this.state.shippingDetails.overrideCode === someValidOverrideCode){
                ENABLE SHIPPING FEE MODIFICATION
            } else {
                DISABLE SHIPPING FEE MODIFICATION
            }
        */}
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




