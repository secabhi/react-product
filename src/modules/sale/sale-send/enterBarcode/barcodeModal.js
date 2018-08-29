import React, { Component } from 'react';
import { TextField } from 'material-ui';

import keypad from '../../../../resources/images/Keypad_Grey.svg';
import CrossBlack from '../../../../resources/images/Cross_Black.svg';

import '../../modal-component/modalComponent.css';

export default class BarcodeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            barcode: ''
                   }
    }

    updateSkuEntry(e) {
            this.setState({ barcode: e.target.value })
    }

    render() {
        const errorSkuStyle = {
            bottom: '0',
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#d53560',
            lineHeight: '20px !important'
        }
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }

        const textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
        }


        return (

            <div className="key-sku-modal-container">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.updateObjectHandler("sendBarcode", this.state.barcode);
                    this.props.handleShowBarcodePopup();
                }
                }>
                   <span className="closeModalLogin"><img className="close-icon-login-modal" src={CrossBlack} onClick={()=>this.props.handleShowBarcodePopup()}></img></span>
                    <img src={keypad} className='key-sku-modal-icon' />
                    <div className='key-sku-modal-label'>Enter Barcode</div>
                     <div className='key-sku-modal-message'>Please enter Barcode Number</div> 

                    <TextField className="key-sku-modal-textfield"
                        //maxLength='2' 
                        onChange={e => this.updateSkuEntry(e)}
                        value={this.state.sku}
                        type="number"
                        floatingLabelText="Barcode Number"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        errorText={this.props.skuError}
                        errorStyle={errorSkuStyle}
                        //fullWidth = {true} 
                        inputStyle={textFieldInputStyle}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }}
                        min={0}
                        refs="sku-modal"
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                this.props.updateObjectHandler("sendBarcode", this.state.barcode);
                                this.props.handleShowBarcodePopup();
                                }
                            }}
                        
                    />
            <div className="key-sku-modal-link"></div>
            <button className='key-sku-modal-button' type="submit">
                <span className="key-sku-button-text">Submit</span>
            </button> 
            </form>
        </div>




        )
    }
};