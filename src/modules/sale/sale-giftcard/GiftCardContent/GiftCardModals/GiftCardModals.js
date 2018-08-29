import React, { Component } from 'react';
import './GiftCardModals.css';

import Modal from 'react-responsive-modal'
import TextField from 'material-ui/TextField';
import warning from '../../../../../resources/images/Warning_101.svg';
import scanner from '../../../../../resources/images/Scan_Item_Borderless.svg';
import giftcard from '../../../../../resources/images/Gift_Card_Black.svg';


export class DriversLicenseModal extends Component {
    constructor(props) {
        super(props);

            this.state = {
                driversLicense: undefined
            }
    }
    render() {
        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '55px',
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

       const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

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

        return (
            <Modal classNames={{modal: 'drivers-license-modal'}}
            open={this.props.open}
            onClose={this.props.close}>
            
                <img className="drivers-license-icon" src={giftcard} alt="giftcard"/>
                <div className="drivers-license-label">Scan DL #</div>

                <TextField
                    className="drivers-license-textfield"
                    type="text"
                    value={this.state.driverLicense}
                    floatingLabelText="DL #"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    inputStyle={textFieldInputStyle}
                    underlineStyle={textFieldUnderlineStyle}
                    style={textFieldStyle}
                    onChange={(e)=>{
                        this.getLicenseNumber(e);
                        }} 
                    disabled
                />
                <img className="drivers-license-scanner" src={scanner}/>


                 <div className="drivers-license-button-container">
                    <div className="drivers-license-button-cancel"
                        onClick={this.props.close}>CANCEL</div>

                    <div className="drivers-license-button-ok" 
                        onClick={() => this.props.validateLicenseCall()}>OK</div>
                </div>
            </Modal>
        )
    }

    getLicenseNumber = (e) => {
        let license = String(e.target.value);
        console.log('get license value', license)
        this.setState({driversLicense: license})
        this.props.getDLNumber(this.state.driversLicense)
    }

};


export class CustomerServiceModal extends Component {
    render() {
        // const customerServiceCode = this.props.customerDLData
        return (
            <Modal classNames={{modal: 'cust-service-modal'}}
            open={this.props.open}
            onClose={this.props.close}
            >
            <img className="cust-service-icon" src={warning} alt="warning"/>
            <div className="cust-service-label">Refer customer to cusomter cervice</div>
            <div className="cust-service-code">CODE:<span className="cust-service-data">{this.props.customerServiceCode}</span></div>
            <div className="cust-service-button-container">
                <div className="cust-service-button-cancel"
                    onClick={this.props.close}>CANCEL</div>
                <div className="cust-service-button-print">PRINT</div>
            </div>
            </Modal>
        )
    }
};

export class ExceedsAmountModal extends Component {
    render() {
        console.log('exceeds modal', this.props)
        return (
            <Modal classNames={{modal: 'exceeds-amount-modal'}} 
            open={this.props.open}
            onClose={this.props.close}>
                <img className="exceeds-amount-icon" src={warning} alt="error"/>
                <div className="exceeds-amount-label">Exceeds add value or maximum $ threshold per day. Multiple gift cards can be purchased.</div>
                <div className="exceeds-amount-button-container">
                    <div className="exceeds-amount-ok"
                        onClick={this.props.close}>OK</div>
                </div>
            </Modal>
        )
    }
}; 

export class ConfirmDriversLicenseModal extends Component {
    render() {
        console.log('modal-license-props', this.props)
        return (
            <Modal classNames={{modal: 'confirm-license-modal'}}
            open={this.props.open}
            onClose={this.props.close}
            >
                <img className="confirm-license-icon" src={giftcard} alt="giftcard"/>
                <div className="confirm-license-label">Confirm Details</div>
                <div className="confrim-license-valid">Are you sure this is</div>
                <div className="confirm-license-data">

                    <div className="confirm-license-name">
                        <div className="confirm-license-fname">{this.props.firstName}</div>
                        <div className="confirm-license-lname">{this.props.lastName}</div>
                    </div>
                    <div className="confirm-license-address">
                        <div className="confirm-license-street">{this.props.address}</div>
                    </div>
                    <div className="confirm-license-location">
                        <div className="confirm-license-city">{this.props.city}</div>
                        <div className="confirm-license-state">{this.props.state}</div>
                        <div className="confirm-license-zip">{this.props.zipCode}</div>
                    </div>

                </div>
                <div className="confirm-license-button-container">
                    <div className="confirm-license-button-no"
                        onClick={this.props.close}>NO</div>
                    <div className="confirm-license-button-yes"
                        onClick={() => {
                            this.props.componentToRender('purchaser');
                            this.props.close();

                                        }
                                }>YES</div>
                </div>

            </Modal>
        )
    }
};

export class MaxGiftCardAmountModal extends Component {
    render() {
        return (
            <Modal classNames={{modal: 'exceeds-amount-modal'}} 
            open={this.props.open}
            onClose={this.props.close}>
                <img className="exceeds-amount-icon" src={warning} alt="error"/>
                <div className="exceeds-amount-label">The maximum amount of gift cards that can be pruchased in one transaction cannot exceed more than 5.</div>
                <div className="exceeds-amount-button-container">
                    <div className="exceeds-amount-ok"
                        onClick={this.props.close}>OK</div>
                </div>
            </Modal>
        )
    }
}