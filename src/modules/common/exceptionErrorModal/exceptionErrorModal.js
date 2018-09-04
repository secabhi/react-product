import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import {showException} from './exceptionAction';
import {startSpinner} from '../loading/spinnerAction'
//import images
import WarningIcon from '../../../resources/images/Warning_icon.png';
import Modal from 'react-responsive-modal';

import './exceptionErrorModal.css';

export class ExceptionErrorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showExceptionModal :false,
            FailedModule:'',
            FailureDescription : '',
            FailureErrorMessage : ''
        };
      } 
    componentDidMount() {
       console.log('hello',this.props.exceptionHandler)
    }
    componentWillReceiveProps=(nextprops)=>{
        console.log('hello nextprops',nextprops)
        this.setState({showExceptionModal:nextprops.exceptionHandler.showException,
                 FailedModule:nextprops.exceptionHandler.error.failedModule,
                FailureErrorMessage:nextprops.exceptionHandler.error.failureReason,
                FailureDescription : nextprops.exceptionHandler.error.failureDescription})
        if(this.props.spinner.startSpinner)
           { this.props.startSpinner(false);
            
            }
    }

    closeExceptionErrorModal = () =>{
        this.props.showException({showException : false,
            error:{}})
    }
    render() {
return (    
    <Modal
            open={this.state.showExceptionModal}
            onClose={() => { }} 
            little
            showCloseIcon={false}
            classNames={{
            modal: 'exceptionErrorModal'
        }}>
            <div className='exception-ErrorModal'>
                <img
                    src={WarningIcon}
                    className='exceptionError-modal-cotainer-icon'/>
                <div className='exceptionError-modal-message-area'>
                    <span className='exceptionError-modal-message'>Oops! Some error Occured</span>
                   
                </div>
                <div className='exceptionError-modal-Detailmessage-area'>
                <p><span>Failed Module </span>: {this.state.FailedModule}</p>
                <p><span>Error Message</span>: {this.state.FailureErrorMessage}</p>
                    <p><span>Failure Description </span> : {this.state.FailureDescription}</p>
                    
                </div>
                <div
                    className='exceptionError-modal-ok-btn'
                    onClick={() => this.closeExceptionErrorModal()}>
                    {/* //closeExceptionErrorModal()}> */}
                    <span className='exceptionError-modal-ok-btn-label'>Close</span>
                </div>
            </div>
        </Modal>
)}}

function mapStateToProps({ exceptionHandler,spinner }) {
    return { exceptionHandler,spinner }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({showException:showException,
        startSpinner : startSpinner
       }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExceptionErrorModal);