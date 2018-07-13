import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSpinner } from '../../common/loading/spinnerAction';
import {changePasswordRequest} from './chgPassActions';
import { clearState } from './chgPassActions';

import {ChangePasswordView} from '../view/changePasswordView';


class ChangePassword extends Component {

    configFile = require('../../../resources/stubs/config.json')
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    //parameters to clear state
    clearParams = {     "Output":{
                                "rc" : 0,
                                "Response_Code" : "CLEARED",
                                "Response_Text" : "CLEARED"
                            },
                            "RESPONSE_CODE":'CLEARED',
                            "RESPONSETEXT":'CLEARED',
                        "loading": false,
                        "error": null
                    };

    constructor(props) {
        super(props);

        this.state = {
            newPass : '',
            confirmPass: '',
            showError: false,
            errorText: '',
            errorCode: '',
        };
        
        this.handleNewPassChange = this.handleNewPassChange.bind(this);
        this.handleCfrmPassChange = this.handleCfrmPassChange.bind(this);
        this.handleHideError = this.handleHideError.bind(this);
        this.handleShowError = this.handleShowError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHidePass = this.handleHidePass.bind(this);
    }

    //event to handle closing change password modal
    handleHidePass(e){
        this.props.handleHide();
        this.props.showLogin(e);
    }

    //event to handle input field
    handleNewPassChange(e){
        this.setState({newPass: e.target.value})
    }

    //event to handle input field
    handleCfrmPassChange(e){
        this.setState({confirmPass: e.target.value})
    }

    //event to handle showing error banner
    handleShowError(e) {
        this.setState({showError: true});
        // this.showError = true;
        if(this.state.newPass !== this.state.confirmPass){
            this.setState({errorText: "Passwords do not match."});
        }else{
            this.setState({errorText: this.props.changePassword.response.Output.Response_Text});
        }
    }
    
    //event to handle hiding error banner
    handleHideError(e) {
        console.log("HIDE ME")
        this.setState({showError: false});
        // this.showError = false;
        this.errorPresent = false;   
    }
    
    //event to handle submitting button
    handleSubmit(e, params){
         e.preventDefault();
        if(this.state.newPass == this.state.confirmPass){        
            console.log("userPin in chgPswrd",this.props.userPin.userPin)
            this.props.startSpinner(true);
            this.props.changePasswordRequest(params)
        }
         else if(this.state.newPass !== this.state.confirmPass && this.errorPresent == false){
            console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowError();
        }
    }

    //call authentication method after button press and component update
    componentDidUpdate(){
        // console.log("UPDATED");
        // this.authenticate(this.params.RequestParams.Upin);

    }

    //clear state when unmounting to prevent infinite loops.
    componentWillUnmount(){
        console.log("unmounting");
        console.log("CLEARING")
        this.props.clearState(this.clearParams);
    }

    render() {

        var Upin = this.props.userPin.userPin.userPin;
        var Upass = this.props.userPin.userPin.Upass;

        return (
            <ChangePasswordView
                Upin = {Upin}
                Upass = {Upass}
                changePassFuncID = {this.configFile.changePassFuncID}
                newPass = {this.state.newPass}
                confirmPass = {this.state.confirmPass}
                handleNewPassChange = {this.handleNewPassChange.bind(this)}
                handleCfrmPassChange = {this.handleCfrmPassChange.bind(this)}
                handleHidePass = {this.handleHidePass}
                showError = {this.state.showError}
                handleHideError = {this.handleHideError.bind(this)}
                errorText = {this.state.errorText}
                authenticate = {() => this.authenticate}
                handleSubmit = {this.handleSubmit.bind(this)}
            />
        );
    }


    //resolves responses from login api 
    authenticate(){
        console.log("IN AUTH CHGPASS",this.props.changePassword); 

        if(this.props.changePassword.response.Output.Response_Code === "PW_CHGSUCCESS"){
            this.props.startSpinner(false);
            this.props.handleHide();
            this.props.showSuccess();
            sessionStorage.setItem("loggedIn", "true");
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_GENERALERROR" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_FAILED" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_CANTCHANGEYET" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_LENGTHERROR" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_NOTSTRONG" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_CANTUSEOLDPASSWORD" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_NEEDSCHANGE_FAILED" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if (this.props.changePassword.response.Output.Response_Code == "PW_LOCKEDOUT" && this.errorPresent == false) {
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }         
    }
}  

function mapStateToProps(state) {
  return { userPin: state.userPin, changePassword:state.changePass }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      changePasswordRequest:changePasswordRequest, 
      clearState:clearState,
      startSpinner:startSpinner
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
