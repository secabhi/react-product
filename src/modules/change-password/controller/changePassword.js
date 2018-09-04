import React, { Component } from 'react';
import {ChangePasswordView} from '../view/changePasswordView';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSpinner } from '../../common/loading/spinnerAction';
import {showException} from '../../common/exceptionErrorModal/exceptionAction';
import { resetPassword} from './chgPassActions';
import { clearState } from './chgPassActions';
import { getTransactionId } from '../../home/HomeSelector';


class ChangePassword extends Component {

    configFile = require('../../../resources/stubs/config.json')
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    //parameters to clear state
    clearParams = {
        "loading": false,
        "error": null,
        "response_Code" : "",
        "response_Text" : "",
                    };

    constructor(props) {
        super(props);

        this.state = {
            newPass : '',
            confirmPass: '',
            showError: false,
            errorText: '',
            errorCode: '',
            transactionId: this.props.transactionId
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
            this.setState({errorText: e});
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
            this.props.startSpinner(true);
            this.props.resetPassword(params)
        }
         else if(this.state.newPass !== this.state.confirmPass && this.errorPresent == false){
                this.errorPresent = true;
                this.props.clearState(this.clearParams);
                this.handleShowError();
        }
    }

    //clear state when unmounting to prevent infinite loops.
    componentWillUnmount(){
        console.log("unmounting");
        console.log("CLEARING")
        this.props.clearState(this.clearParams);
    }
        //call authentication method after button press and component update
    componentWillReceiveProps(nextProps) {
        let responseText = nextProps.changePassword.response.response_Text; 
        if(nextProps.changePassword.isValid) {
            if(nextProps.changePassword.response.response_Code === "PW_CHGSUCCESS"){
                this.props.startSpinner(false);
                this.props.handleHide();
                this.props.showSuccess();
                sessionStorage.setItem("loggedIn", "true");
            }else if (nextProps.changePassword.response.response_Code == "PW_GENERALERROR" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_FAILED" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_CANTCHANGEYET" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_LENGTHERROR" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_NOTSTRONG" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_CANTUSEOLDPASSWORD" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
            }else if (nextProps.changePassword.response.response_Code == "PW_NEEDSCHANGE_FAILED" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
           }else if (nextProps.changePassword.response.response_Code == "PW_LOCKEDOUT" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.handleShowError(nextProps.changePassword.response.response_Text);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
              } 
        }
        else {
            if(nextProps.changePassword.error != null) {
                this.props.showException({
                    showException: true,
                    error: {
                        failedModule: 'Change Password', 
                        failureReason: 'Unexpected Response', 
                        failureDescription:'Unable to resolve the response structure'
                    }
                })
            }
        }
    }
    

    render() {
        var Upin = this.props.userPin.userPin.userPin;
        var Upass = this.props.userPin.userPin.Upass;

        return (
            <ChangePasswordView
                transactionId={this.state.transactionId}
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
}  

function mapStateToProps(state) {
  return {
      userPin: state.userPin, 
      changePassword: state.changePass,
      transactionId: getTransactionId(state) }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //   changePasswordRequest:changePasswordRequest, 
      resetPassword:resetPassword,
      clearState:clearState,
      startSpinner:startSpinner,
      showException:showException
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
