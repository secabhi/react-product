import React, { Component } from 'react';
import './errorModal.css';

class ErrorModal extends Component{
    
    render(){
        return(
            <div className="backdrop" >
                    <div className="errorModal" >
                        <div>
                            <div>
                                <span className="closeModal"><img  src={require('../../../resources/images/Cross_Black.svg')} onClick={this.props.hideError}></img></span>
                            </div>
                                <div><img className="errorImg" src={require('../../../resources/images/Warning.svg')}/></div>
                            <div className="errorTitle">
                                <label >{this.props.errorTitle}</label>
                                <label className="errorSubTitle">{this.props.errorSubTitle}</label>
                            </div>
                            <div className="errorDismissButtonContainer">
                                <button type="button" className="errorDismissButton" onClick={this.props.hideError}>CLOSE</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ErrorModal;