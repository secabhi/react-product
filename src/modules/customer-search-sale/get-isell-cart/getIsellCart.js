import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './getIsellCart.css'

import keypad from '../../../resources/images/Keypad_Grey.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';
import QR from '../../../resources/images/qr_code.jpg'

export class GetIsellCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getIsellCart: '',
            isellMaxLength: false
        }
    }

    updateIsellCartEntry(e) {
        if(e.target.value.length <= 20) {
            this.setState({
                getIsellCart: e.target.value,
                isellMaxLength: false
            });
        } else {
            this.setState({
                isellMaxLength: true
            })
        }
    }

    GetIsellCartForm(e) {

        e.preventDefault();
        console.log('GetIsellCart Update SUBMITING');
        this.props.getIsellCartUpdateAction(this.state.getIsellCart);
        this.props.showOpenIsellcartModal(false)
    }

    render() {
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
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
            fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
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

        const errorStyle = {
            bottom: '0',
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#d53560',
            lineHeight: '20px !important',
            marginTop: '15px'
        }


        return (

            <div className="get-isell-cart-modal-container">
                <div className="get-isell-cart-modal-header">
                    <div className="get-isell-cart-modal-back-btn" onClick={() => this.props.showopenIsellcartScannerModal(true)}>BACK</div>
                    <span className="get-isell-cart-modal-close"><img class="close-icon-login-modal" src="/static/media/Cross_Black.bcb0579d.svg" onClick={() => this.props.showOpenIsellcartModal(false)} /></span>
                </div>
                <form className="GetIsellCartForm" onSubmit={(e) => { this.GetIsellCartForm(e) }}>
                    <img src={keypad} className='get-isell-cart-modal-icon' />
                    <div className='get-isell-cart-modal-label'>Key Cart ID</div>
                    <div className='get-isell-cart-modal-message'>Please enter Cart ID to get ISell Cart Details</div>
                    <TextField className="get-isell-cart-modal-textfield"
                        type="number"
                        floatingLabelText="Enter Cart ID"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        fullWidth={true}
                        inputStyle={textFieldInputStyle}
                        value={this.state.getIsellCart}
                        onChange={e => this.updateIsellCartEntry(e)}
                        errorText={this.state.isellMaxLength == true ? "Maximum of 20 characters allowed" : ""}
                        errorStyle={errorStyle}
                        required
                    />
                    <button className='get-isell-cart-modal-button' type="submit">
                        <span className="get-isell-cart-modal-text">Submit</span>
                    </button>
                </form>
            </div>


        )
    }
};
export class GetIsellCartScanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getIsellCart: '',
            modal_isell_cart_scanner: false,
            modal_isell_cart: false,
        }
    }

    updateIsellCartEntry(e) {
        this.setState({ getIsellCart: e.target.value })
    }

    render() {
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
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
            fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
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

            <div className="get-isell-cart-scanner-modal-container">
                <div>
                    <div className="get-isell-cart-modal-header">
                        <span className="get-isell-cart-modal-close"><img className="close-icon-login-modal" src="/static/media/Cross_Black.bcb0579d.svg" onClick={() => this.props.showopenIsellcartScannerModal(false)} /></span>
                    </div>
                    <div className='get-isell-cart-scanner-modal-label'>Scan QR Code</div>
                    <div className="get-isell-cart-QR-scanner">
                        <img src={QR} />
                    </div>
                    <div className='get-isell-cart-scanner-modal-OR'>OR</div>
                    <div className='get-isell-cart-scanner-modal-button-area'>
                        <button className='get-isell-cart-scanner-modal-button-enter'><span className='get-isell-cart-scanner-modal-button-enter-label' onClick={() => this.props.openIsellcart()}>KEY CART ID</span></button>
                    </div>
                </div>
            </div>


        )
    }
};
