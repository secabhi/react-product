import React, { Component } from 'react';
import './successModal.css';

class SuccessModal extends Component{
    
    render(){
        return(
            <div className="backdrop" >
                    <div className="successModal" >
                        <div>
                            <div>
                                <span className="closeModal"><img  src={require('../../../resources/images/Cross_Black.svg')} onClick={this.props.hideSuccess}></img></span>
                            </div>
                                <div><img className="successImg" src={require('../../../resources/images/Success.svg')}/></div>
                            <div className="successTitle">
                                <label > Password Changed</label>
                                <label className="successSubTitle"> Your password was changed successfully.</label>
                            </div>
                            <div className="successDismissButtonContainer">
                                <button type="button" className="successDismissButton" onClick={this.props.hideSuccess}>CLOSE</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default SuccessModal;