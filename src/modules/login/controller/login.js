import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSpinner } from '../../common/loading/spinnerAction';
import { loginRequest } from './loginActions';
import { sendUserPin } from './loginActions';
import { clearState } from './loginActions';

import {LoginView} from '../view/loginView.js';


class Login extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apiAddressLogin
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
            funcID: this.configFile.loginFuncID,
            userPin : '',
            password: '',
            showError: false,
            errorText: '',
            errorCode: ''
        };

        this.handlePinChange = this.handlePinChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleShowError = this.handleShowError.bind(this);
        this.handleHideError = this.handleHideError.bind(this);
    }

    handleShowError(e) {
        this.setState({showError: true});
        // this.showError = true;
        this.setState({errorText:this.props.login.response.Output.Response_Text});
    }
    
    handleHideError(e) {
        // console.log("HIDE ME")
        this.setState({showError: false});
        // this.showError = false;
        this.errorPresent = false;   
    }

    //event handler for userPin input field
    handlePinChange(e){
        this.setState({userPin: e.target.value});
    }

    //event handler for password input field
    handlePassChange(e){
        this.setState({password: e.target.value});
    }

    //event handler when submit button is clicked
    //also calls action for loginRequest
    handleSubmit(e,params){
        e.preventDefault();
        console.log('SUBMITING');
        this.errorPresent = false;   
        this.props.startSpinner(true);
        this.props.loginRequest(params);  
        
    }

    componentWillMount(){
        console.log("MOUNTING");
        this.setState({errorText:''});

    }

    componentWillUpdate(){
        console.log("UPDATING");
    }

    //call authentication method after button press and component update
    componentDidUpdate(){
        // console.log("UPDATED");
        // this.authenticate(this.params.RequestParams.Upin, this.params.RequestParams.Upass);

    }

    //clear state to prevent infinite loops
    componentWillUnmount(){
        console.log("unmounting");
        console.log("CLEARING")
        this.props.clearState(this.clearParams);
    }

    render() {

        return(
            <LoginView 
                funcID = {this.state.funcID}
                userPin = {this.state.userPin}
                password = {this.state.password}
                handleSubmit = {this.handleSubmit.bind(this)}
                showError = {this.state.showError}
                handleHide = {() => this.props.handleHide()}
                handleHideError = {() => this.handleHideError()}
                handlePinChange = {this.handlePinChange.bind(this)}
                handlePassChange = {this.handlePassChange.bind(this)}
                handleShowPass = {() => this.props.showPass()}
                errorText = {this.state.errorText}
                authenticate = {() => this.authenticate()}
            />
        );
        
    }


    //resolves response from login api 
    //also sends cleared params after an error is dismissed so that errors do not persist
    authenticate(userPin,Upass){
        

        console.log("in auth",this.props.login.response.Output);
        console.log("errorPresent", this.errorPresent)
        

        var userParams = {
            "userPin":this.state.userPin,
            "Upass":this.state.password
        }

        if((this.props.login.response.Output.Response_Code === "PW_SUCCESS")){
            this.props.startSpinner(false);
            this.props.handleHide();
            this.props.sendUserPin(userParams);
            sessionStorage.setItem("loggedIn", "true");
        }else if(this.props.login.response.Output.Response_Code === "PW_NEEDSCHANGE"){
            this.props.startSpinner(false);
            console.log("passwordchange")
            this.props.sendUserPin(userParams);
            this.props.handleHide();
            this.props.showPass();
        }else if(this.props.login.response.Output.Response_Code === "PW_GENERALERROR" && this.errorPresent == false) {
            
            this.props.startSpinner(false);
            console.log("error in state", this.state.errorText)
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if(this.props.login.response.Output.Response_Code === "PW_FAILED" && this.errorPresent == false) {
            this.props.startSpinner(false);
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }else if(this.props.login.response.Output.Response_Code === "PW_LOCKEDOUT" && this.errorPresent == false) {
            this.props.startSpinner(false);
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
        }
        else if(this.props.login.response.Output.Response_Code === "PW_ABOUTTOCHANGE" && this.errorPresent == false) {
            this.props.startSpinner(false);
            this.errorPresent = true;
            console.log("CLEARING")
            this.props.clearState(this.clearParams);
            this.handleShowError();
            this.props.handleHide();
            this.props.sendUserPin(userParams);
            sessionStorage.setItem("loggedIn", "true");
        }       
    }   

}

function mapStateToProps({ login }) {
  return { login }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      loginRequest:loginRequest, 
      sendUserPin:sendUserPin, 
      clearState:clearState,
      startSpinner:startSpinner
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
