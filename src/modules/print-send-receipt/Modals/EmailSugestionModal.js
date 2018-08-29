/* Dependencies import */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';

import './modals.css';
//Images
import emailmodalicon from '../../../resources/images/Confirm_Email.svg';
import registerIcon from '../../../resources/images/Print_To_Register.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';


export class EmailSugestionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClienteled: true,
            suggestedEmail: ''
        }

    }

    componentWillReceiveProps(nextProps) {
        //console.log('lcoation props in payment page'+JSON.stringify(this.props.history.location));
        //this.setState({isClienteled:this.props.history.location.state.isClienteled});
        //console.log('nextprops in payment page'+JSON.stringify(nextProps));
    }

    componentDidMount() {
        this.setState({
            suggestedEmail: this.props.email
        })
    }

    handleChangeEvent(val) {
        return val;
    }
    handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            this.props.verifySuggestionEmail();    
        }
    } 

    handleEmailInput = (event) => {
        this.props.handlesuggestedEmailInput(event)
    }

    render() {
        var errorStyle = {
            paddingTop: '15px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900 ? '32px' : '32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'right',
            color: '#d53560',
            bottom: "30px"
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
        var underlineStyle = {
            backgroundColor: '#828282'

        }
        const submittedEmail = this.props.email;

        var isClienteled = this.props.isClienteled;
        return (
            <Modal
                open={this.props.emailSugestionModal}
                onClose={this.closeEmailSuggestionModal}
                classNames={{
                    //modal: this.props.customerInfo.lastName?"add-dom-cust-modal":"add-dom-cust-modal email-receipt-modal"
                    modal: isClienteled ? "add-dom-cust-modal email-receipt-modal clientele-modal" : "Email-address-modal"
                }}
                little
                showCloseIcon={false}>
                <div className='add-dom-cust-container'>
                    <div className="emailModalForm">
                        <img src={emailmodalicon} className='email-receipt-modal-icon' />
                        <div className='email-receipt-modal-name'>{'Email Validation'}</div>
                        <div className="Email-Address-Submitted">
                            {"Email Address Submitted"}
                        </div>

                        <div className="Email-Address-Submitted-entered">
                            {submittedEmail}
                        </div>
                        <div className="Email-Address-Submitted-entered-underline">
                        </div>


                        <div className="modalContainer email-modal-text1"><TextField
                            type="email"
                            floatingLabelText="Suggested Correction"
                            className="email-receipt-input"
                            onChange={(e) => { this.handleEmailInput(e) }}
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            style={textFieldStyle}
                            inputStyle={textFieldInputStyle}
                            underlineStyle={underlineStyle}
                            errorText={this.props.emailSugError}
                            errorStyle={errorStyle}
                            defaultValue={this.props.suggestedEmail}
                            onKeyUp={this.handleKeyUp}
                        //key={this.props.email}
                        /></div>


                        <div className='add-dom-cust-modal-email-button-area'>
                            <div
                                className='add-dom-cust-modal-no-btn'
                                onClick={this.props.closeEmailSuggestionModal}>
                                <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                            </div>
                            <div
                                className='add-dom-cust-modal-yes-btn'
                                onClick={this.props.verifySuggestionEmail}>
                                <span className='add-dom-cust-modal-yes-btn-label'>YES</span>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}