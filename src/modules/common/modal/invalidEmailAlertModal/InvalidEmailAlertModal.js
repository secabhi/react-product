
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import './InvalidEmailAlertModal.css';

/* Import images*/
import erroricon from '../../../../resources/images/Error_Alert.svg';
// import crossicon from '../../../../resources/images/Cross_Purple.svg';
// import editIcon from '../../../../resources/images/Edit_Profile.svg';

export class InvalidEmailAlertModal extends Component {

    componentDidMount() {
        //console.log('phomemodal '+JSON.stringify(this.props))
    }
    render() {
        return (
             <Modal
                    open={this.props.invalidEmailOpen}
                    little showCloseIcon={false}
                    classNames={{
                    modal: 'invalid-email-modal'
                }}>
                    <div className='invalid-email-container'>
                        <img src={erroricon} className='invalid-email-modal-icon'/>
                        <div className='invalid-email-fail-modal-message-area'>
                            <span className='invalid-email-fail-modal-message-text'>Invalid Email - Cannot be
                                validated. Select RETURN TO EDIT to correct email. If BYPASS is selected, the clientele
                                record and all purchase history will be deleted from the clientele system.
                            </span>
                        </div>
                        <div className='invalid-email-fail-modal-button-area'>
                            <div
                                className='invalid-email-modal-backtoedit-btn'
                                onClick={this.props.invalidEmailClose}>
                                {/* <img src={editIcon} className='invalid-email-modal-backtoedit-btn-icon' hidden = {this.props.isHidden}/> */}
                                <span className='invalid-email-modal-backtoedit-btn-label'>RETURN TO EDIT</span>
                            </div>
                            <div
                                className='invalid-email-modal-bypass-btn'
                                onClick={this.props.invalidEmailBypass}>
                                {/* <img src={crossicon} className='invalid-email-modal-bypass-btn-icon' hidden = {this.props.isHidden}/> */}
                                <span className='invalid-email-modal-bypass-btn-label'>BYPASS</span>
                            </div>
                        </div>
                    </div>
                </Modal>
)}
}