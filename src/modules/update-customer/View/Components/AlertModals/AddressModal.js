import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import erroricon from '../../../../../resources/images/Error_Red.svg';
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export class AddrEmailModal extends Component {

    componentDidMount() {
    }
    render() {
        return (
            
            <Modal open={Boolean(this.props.addrEmailMOdal)} onClose={() => {}} little showCloseIcon={false}  classNames={{ modal: 'add-dom-cust-modal update-email-valid-dom-modal addr-email-modal'}}>
                        <div className='add-dom-cust-container'>
                            <img src={erroricon} className='add-dom-cust-modal-icon'/>
                            <div className='add-domcust-addr-email-modal-message-area'><span className='add-domcust-addr-email-modal-message-text'>
                            You must supply a valid street address or email address for this client. Press OK to continue. </span>
                            </div>
                            <div className='add-domcust-fail-modal-button-area'>
                                <div className='add-dom-cust-modal-ok-btn update-dom-cust-ok-btn' onClick={this.props.closeaddrEmailMOdal}><span className='update-dom-cust-ok-btn-label add-dom-cust-modal-ok-btn-label'>OK</span></div>
                            </div>
                        </div>  
                </Modal>
        )
    }
}