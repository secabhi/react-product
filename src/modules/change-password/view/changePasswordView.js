import React, { Component } from 'react';


import WarningIcon from '../../../resources/images/Warning_icon.png';
import CrossBlack from '../../../resources/images/Cross_Black.svg';
import CrossWhite from '../../../resources/images/Cross_White.svg';
import PasswordExpired from '../../../resources/images/Password_Expired.svg';

import { TextField } from 'material-ui';
import './changePassModal.css';

export class ChangePasswordView extends Component {

    //call authentication method after button press and component update
    componentDidUpdate(){
        console.log("UPDATED");
        this.props.authenticate(this.params.RequestParams.Upin);

    }


    render() {

        var textFieldFloatingLabelStyle = {
            // width: '141px',
            //height: (window.innerWidth > 1900) ? '24px' : '74px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '56px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }
        
    
        var textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "56px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "0px",
            paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        }
    
        var textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }
    
        var textFieldStyle = {
            // height: '60px',
            paddingTop: (window.innerWidth > 1900) ? '12.2px' : '45px',
            paddingBottom: (window.innerWidth > 1900) ? '0px' : '15px'
        }

        const errorDiv = this.props.showError ? (
        <span className="errorBanner"><img className="changePassword-warning-icon" src={WarningIcon} ></img><span className="errorText">{this.props.errorText}</span><img className="closeModalErrorBannerChgPass"  src={CrossWhite} onClick={this.props.handleHideError}></img></span>
        ) : null;

        console.log("USERDATA VIEWPROPS",this.props);

        this.params = { 
            "FunctionalityId": this.props.changePassFuncID,
            "RequestParams":{
                "TransactionNum": this.props.transactionId,
                "Upin": this.props.Upin, 
                "Upass": this.props.Upass,
                "UNewPwd": this.props.confirmPass
            }
        };

        return (
            <div className="backdrop" >
                <div className="changePswrdModal" >
                    {errorDiv}
                    <span className="closeModalChangePass"><img className="close-icon-change-pass-modal" src={CrossBlack} onClick={this.props.handleHidePass}></img></span>
                    <form className="changePassForm" onSubmit={(e) => {
                        this.props.handleSubmit(e, this.params)
                        }}>
                        <div><img className="logoChangePassword" src={PasswordExpired} /></div>
                        <div >
                            <label className="passwrdTitle">Password Expired</label>
                            <label className="passwrdSubtitle">Please create new password</label>
                        </div>

                        
                        <div className="inputsMarginChangePass">
                              <TextField
                                required
                                type="password"
                                floatingLabelText="New Password"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                underlineStyle={textFieldUnderlineStyle}
                                style={textFieldStyle}
                                onChange={this.props.handleNewPassChange}
                                value={this.props.newPass}
                            />
                        </div>  
                        <div className="passInputsMarginChangePass">
                            <TextField
                                required
                                type="password"
                                floatingLabelText="Verify Password"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                underlineStyle={textFieldUnderlineStyle}
                                style={textFieldStyle}
                                onChange={this.props.handleCfrmPassChange}
                                value={this.props.confirmPass}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        this.props.handleSubmit(e, this.params)
                                        }
                                    }}
                            />
                        </div>
                        <div>
                        <button className="submitButton">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}  
