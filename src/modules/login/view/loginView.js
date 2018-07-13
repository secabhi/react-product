// dependencies
import React, { Component } from 'react';


//import components
import { TextField } from 'material-ui';

//import stylesheet
import '../view/loginModal.css';

//import images
import WarningIcon from '../../../resources/images/Warning_icon.png';
import CrossBlack from '../../../resources/images/Cross_Black.svg';
import CrossWhite from '../../../resources/images/Cross_White.svg';
import AssociateLoginSVG from '../../../resources/images/Associate-Login.svg';

export class LoginView extends Component {


    componentDidUpdate(){
        console.log("UPDATED");
        this.props.authenticate(this.params.RequestParams.Upin, this.params.RequestParams.Upass);
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

            //construct paramaters to send to API
            this.params = { "FunctionalityId":this.props.funcID,
                            "RequestParams":{
                            "Upin": this.props.userPin, 
                            "Upass": this.props.password
                            }};

            console.log("Params", this.params.RequestParams.Upin);

            //Error div to show when API sends back errors
            const errorDiv = this.props.showError ? (
            <span className="loginErrorBanner"><img src={WarningIcon} className="warning-icon"/><span className="loginErrorText" >{this.props.errorText}</span><img className="closeModalBanner"  src={CrossWhite} onClick={this.props.handleHideError}></img></span>
            ) : null;

            return (
                <div className="loginModal-backdrop" >
                    <div className="logModal" >
                        {errorDiv}
                        <span className="closeModalLogin"><img className="close-icon-login-modal" src={CrossBlack} onClick={this.props.handleHide}></img></span>
                        <form className="loginForm" onSubmit={(e) => {
                            e.preventDefault();
                            this.props.handleSubmit(e, this.params)}} >
                            
                            <div><img className="logoLogin" src={AssociateLoginSVG} /></div>
                            <div className="titleLogin">
                                <label> Associate Login</label>
                            </div>

                            <div className="inputsMargin">
                                <TextField
                                    required
                                    type="tel"
                                    floatingLabelText="Sales Associate PIN"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    fullWidth = {true}
                                    inputStyle = {textFieldInputStyle}
                                    underlineStyle={textFieldUnderlineStyle}
                                    style={textFieldStyle}
                                    onChange={this.props.handlePinChange}
                                    value={this.props.userPin}
                                />
                            </div>  
                            <div className="passInputsMargin">
                                <TextField
                                    required
                                    type="password"
                                    floatingLabelText="Password"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    fullWidth = {true}
                                    inputStyle = {textFieldInputStyle}
                                    underlineStyle={textFieldUnderlineStyle}
                                    style={textFieldStyle}
                                    onChange={this.props.handlePassChange}
                                    value={this.props.password}
                                />
                            </div>
                            <div  >
                                <button type="submit" className="loginButton" history={this.props.history}>LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
            
        }
}