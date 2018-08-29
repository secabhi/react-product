import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import { TextField } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './accountlookupmodals.css';

import AccountLookupImg from '../../../resources/images/Account_Lookup.svg';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import { stringify } from 'querystring';

class CustomerPhoneModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            PhoneNo: ''
        }
    }

    handleTextFieldChange = (e) => {
        if (e.target.value.length < 10 || e.target.value.length > 10) {
            this.setState({ errorMessage: 'Please enter the correct phone number' })
        }
        else {
            this.setState({ errorMessage: '' })
        }
        this.setState({ PhoneNo: e.target.value })
    }
    render() {

        const errorStyle = {
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
            fontSize: "32px",
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
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px"
        }

        var underlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }
        console.log('customer data'+JSON.stringify(this.props.customerData));
        return (
            <div>
                <form className="" onSubmit={(e) => { (this.state.PhoneNo)?this.props.nextCustModel():null} }>
                    <img src={AccountLookupImg} className='cust-phone-modal-image' />
                    <div className="cust-phone-modal-account-lookup-label">Account Lookup</div>
                    <div className="cust-phone-modal-text-label">
                        <TextField
                            type="number"
                            floatingLabelText="Customer’s Phone #"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            underlineStyle={underlineStyle}
                            errorStyle={errorStyle}
                            style={textFieldStyle}
                            fullWidth={true}
                            onChange={this.handleTextFieldChange}
                            errorText={this.state.errorMessage}
                            value={this.state.PhoneNo}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    if(this.state.PhoneNo)
                                    {
                                        e.preventDefault();
                                        this.props.nextCustModel();
                                    }                                    
                                }
                            }}
                        />
                    </div>
                    {/*<div className="3rd-party">
                        <div className="cust-phone-modal-OR-label">OR</div>
                        <div className="cust-phone-modal-third-party-label">
                            <div onClick={() => {this.props.getCardsListInvoker();}} className="cust-phone-modal-third-party-label-inside">3rd PARTY</div>
                        </div>
                        </div>*/}
                     {this.props.clientNum?
                    <div className="3rd-party">
                        <div className="cust-phone-modal-OR-label">OR</div>
                        <div className="cust-phone-modal-third-party-label">
                            <div onClick={() => {this.props.getCardsListInvoker();}} className="cust-phone-modal-third-party-label-inside">3rd PARTY</div>
                        </div>
                    </div>
                    :<div className="non-clientele-thirdparty-btn"></div>} 
                    <div className="cust-phone-modal-btn">
                        <div onClick={() => {this.props.closeCustModel()}} className="cust-phone-modal-btn-cancel">
                            <div className="cust-phone-modal-btn-cancel-image">
                                <img src={cancelBtnImage} alt="cancel" />
                            </div>
                            <div className="cust-phone-modal-btn-cancel-label">CANCEL</div>
                        </div>
                        <div className={(this.state.PhoneNo?"cust-phone-modal-btn-next":"cust-phone-modal-btn-next-disable")}>
                            <button className="cust-phone-modal-btn-next-label">NEXT</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default CustomerPhoneModal