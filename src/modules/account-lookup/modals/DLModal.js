import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import { TextField } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './accountlookupmodals.css';

import AccountLookupImg from '../../../resources/images/Account_Lookup.svg';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';

class DLModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
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
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
        }

        var underlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        return (
            <div>
                <form className="" onSubmit={(e) => { this.props.nextDLModel() }}>
                    <img src={AccountLookupImg} className='DL-modal-image' />
                    <div className="DL-modal-DL-label">Scan DL #</div>
                    <div className="DL-modal-text-label">
                        <TextField
                            type="text"
                            floatingLabelText="DL #"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            underlineStyle={underlineStyle}
                            errorStyle={errorStyle}
                            style={textFieldStyle}
                            fullWidth={true}
                            onChange={this.handleTextFieldChange}
                            errorText={this.state.errorMessage}
                            value={this.state.fieldValue}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    this.props.nextDLModel()

                                }
                            }}
                        />
                    </div>
                    <div className="DL-modal-OR-label">OR</div>
                    <div onClick={() => { this.props.OpenByPassModel() }} className="DL-modal-bypass-scan-label">
                        <div className="DL-modal-bypass-scan-label-inside">BYPASS SCAN</div>
                    </div>
                    <div className="DL-modal-btn">
                        <div onClick={() => { this.props.closeDLModel() }} className="DL-modal-btn-cancel">
                            <div className="DL-modal-btn-cancel-image">
                                <img src={cancelBtnImage} alt="cancel" />
                            </div>
                            <div className="DL-modal-btn-cancel-label">CANCEL</div>
                        </div>
                        <div className="DL-modal-btn-next">
                            <button className="cust-phone-modal-btn-next-label">NEXT</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default DLModal