import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSpinner } from '../../common/loading/spinnerAction';
import { loginRequest } from './loginActions';
import { sendUserPin } from './loginActions';
import { clearState } from './loginActions';

import {LoginView} from '../view/loginView.js';
import { getTransactionId } from '../../home/HomeSelector';

import {showException} from '../../common/exceptionErrorModal/exceptionAction';


class Login extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apiAddressLogin
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    //parameters to clear state
    clearParams = {    
                        "response_Code" : "CLEARED",
                        "response_Text" : "CLEARED",
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
            errorCode: '',
            transactionId: this.props.transactionId,
            pinError:'',
            passwordError:''
        };

        this.handlePinChange = this.handlePinChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleShowError = this.handleShowError.bind(this);
        this.handleHideError = this.handleHideError.bind(this);
    }

    handleShowErrorMsg= (errorMessage) => {
        this.setState({showError: true});
        // this.showError = true;
        
        this.setState({errorText:errorMessage});
    }
    handleShowError= (e) => {
        this.setState({showError: true});
        // this.showError = true;
       
        this.setState({errorText:this.props.login.response.response_Text});
    }
    
    handleHideError=(e)=> {
        // console.log("HIDE ME")
        this.setState({showError: false});
        // this.showError = false;
        this.errorPresent = false;   
    }

    //event handler for userPin input field
    handlePinChange=(e)=>{
        
        this.setState({userPin: e.target.value,pinError : '' });        
        this.props.handleUserPin(e);     
        


    }

    //event handler for password input field
    handlePassChange= (e) =>{
        this.setState({password: e.target.value,passwordError : ''});
       }

    //event handler when submit button is clicked
    //also calls action for loginRequest
    handleSubmit=(e,params) => {       
    
        if(this.state.userPin.length == 0 && this.state.password.length == 0){
            this.setState({pinError : 'Associate pin invalid' });
            this.setState({ passwordError : 'Data entered is not valid' });

        }else if (this.state.userPin.length == 0) {
            this.setState({pinError : 'Associate pin invalid' });

        }else if (this.state.password.length == 0) {
            this.setState({ passwordError : 'Data entered is not valid' });

        }else{
            e.preventDefault();
            console.log('SUBMITING');
            this.errorPresent = false;   
            this.props.startSpinner(true);
            this.props.loginRequest(params);  
            var pinError, passwordError;

        }

       // this.setState({ pinError: pinError, passwordError: passwordError })
        
    }

    componentWillMount= () =>{
        console.log("MOUNTING");
        this.setState({errorText:''});

    }

    componentWillReceiveProps=(nextProps) => {
        console.log("UPDATING");
        //debugger;
        //this.authenticate(this.state.userPin,this.state.password)
  
        if (nextProps.login.isValid )
        {
            var userParams = {
                "userPin":this.state.userPin,
                "Upass":this.state.password
            }
            
            if((nextProps.login.response.response_Code === "PW_SUCCESS")){
                this.props.startSpinner(false);
                this.props.handleHide();
                this.props.sendUserPin(userParams);
                sessionStorage.setItem("loggedIn", "true");
            }else if(nextProps.login.response.response_Code === "PW_NEEDSCHANGE"){
                this.props.startSpinner(false);
                console.log("passwordchange")
                this.props.sendUserPin(userParams);
                this.props.handleHide();
                this.props.showPass();
            }else if(nextProps.login.response.response_Code === "PW_GENERALERROR" && this.errorPresent == false) {
                
                this.props.startSpinner(false);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowErrorMsg(nextProps.login.response.response_Text);
            }else if(nextProps.login.response.response_Code === "PW_FAILED" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowErrorMsg(nextProps.login.response.response_Text);
            }else if(nextProps.login.response.response_Code === "PW_LOCKEDOUT" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowErrorMsg(nextProps.login.response.response_Text);
            }
            else if(nextProps.login.response.response_Code === "PW_ABOUTTOCHANGE" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowErrorMsg(nextProps.login.response.response_Text);
                this.props.handleHide();
                this.props.sendUserPin(userParams);
                sessionStorage.setItem("loggedIn", "true");
            } 
        }
        else{
            
            if (nextProps.login.error_message != '')
                 {  // debugger;
                   // this.props.clearState(this.clearParams);
                        this.props.callErrorException( {showException: true,
                                error:{failedModule:'Login',failureReason:'Unexpected Response',failureDescription:'Unable to resolve the response structure'}})
             }
        }
        }

    // //call authentication method after button press and component update
    // componentDidUpdate(){
    //     // console.log("UPDATED");
    //     // this.authenticate(this.params.RequestParams.Upin, this.params.RequestParams.Upass);
    //     // alert(this.state.password);
    //     // alert(this.state.userPin);
    //     // if (this.props.login.isValid == true)
    //     // {
    //     //     this.props.authenticate(this.params.RequestParams.Upin, this.params.RequestParams.Upass);
    //     // }
    //     // else{

    //     // }

    // }

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
                pinError={this.state.pinError}
                passwordError={this.state.passwordError}
                transactionId = {this.state.transactionId}
                handleSubmit = {this.handleSubmit.bind(this)}
                showError = {this.state.showError}
                handleHide = {() => this.props.handleHide()}
                handleHideError = {() => this.handleHideError()}
                handlePinChange = {this.handlePinChange.bind(this)}
                handlePassChange = {this.handlePassChange.bind(this)}
                handleShowPass = {() => this.props.showPass()}
                errorText = {this.state.errorText}
                //authenticate = {() => this.authenticate()}
    
            />
        );
        
    }


    //resolves response from login api 
    //also sends cleared params after an error is dismissed so that errors do not persist
    authenticate= (userPin,Upass) =>{

        console.log("in auth",this.props.login.response);
        console.log("errorPresent", this.errorPresent)
    
        var userParams = {
            "userPin":this.state.userPin,
            "Upass":this.state.password
        }
          try{
            
            if((this.props.login.response.response_Code === "PW_SUCCESS")){
                this.props.startSpinner(false);
                this.props.handleHide();
                this.props.sendUserPin(userParams);
                sessionStorage.setItem("loggedIn", "true");
            }else if(this.props.login.response.response_Code === "PW_NEEDSCHANGE"){
                this.props.startSpinner(false);
                console.log("passwordchange")
                this.props.sendUserPin(userParams);
                this.props.handleHide();
                this.props.showPass();
            }else if(this.props.login.response.response_Code === "PW_GENERALERROR" && this.errorPresent == false) {
                
                this.props.startSpinner(false);
                console.log("error in state", this.state.errorText)
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowError();
            }else if(this.props.login.response.response_Code === "PW_FAILED" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowError();
            }else if(this.props.login.response.response_Code === "PW_LOCKEDOUT" && this.errorPresent == false) {
                this.props.startSpinner(false);
                this.errorPresent = true;
                console.log("CLEARING")
                this.props.clearState(this.clearParams);
                this.handleShowError();
            }
            else if(this.props.login.response.response_Code === "PW_ABOUTTOCHANGE" && this.errorPresent == false) {
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
    catch(e)
    {              
        console.log('errorMsg' ,e)
      //  if(this.props.login.response == null)
           // this.props.callErrorException({error:(this.props.login.error_message)?this.props.login.error_message:e.message,module:'Login',message:'Error occured while reading responses in Login module '});
        // else
        //      this.props.callErrorException({error:e.message,module:'Login',message:'Error occured while reading responses in Login module'});
        } 
    }   

}

function mapStateToProps(state) {
  return {
    login: state.login,
    transactionId: getTransactionId(state)
  }
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
