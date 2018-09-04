import React, { Component, Fragment } from 'react';

//styles
import './systemError.css';

export default class SystemError extends Component {
    
    render() {
        return (
            <div className='system-error' onClick={() => this.props.redirect()}>
                <div className='error-message'>
                    <h3 style={{textAlign: "center"}}>Error In {this.props.from}</h3>
                    <div>{this.props.children}</div>
                    <h3 style={{textAlign: "center"}}>&#60;&#60;&#60;CLICK  TO CONTINUE&#62;&#62;&#62;</h3>  
                </div> 
            </div>      
        )
    }
}