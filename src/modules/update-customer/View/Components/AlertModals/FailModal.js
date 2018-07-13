

import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';
import erroricon from '../../../../../resources/images/Error_Red.svg';
import editIcon from '../../../../../resources/images/Edit_Profile.svg';
import crossicon from '../../../../../resources/images/Cross_Purple.svg';

export class FailModal extends Component {

    componentDidMount() {
        
    }
    componentWillReceiveProps(nextprops){
        console.log('failModal '+JSON.stringify(this.props))
    }
    render() {
        return (
            <Modal open={this.props.failModal} onClose={() => {}} little showCloseIcon={false}  classNames={{ modal: 'add-dom-cust-modal'}}>
                        <div className='add-dom-cust-container'>
                            <img src={erroricon} className='add-dom-cust-modal-icon'/>
                            <div className='add-domcust-fail-modal-message-area'><span className='add-domcust-fail-modal-message-text'>Invalid address - Cannot be validated.
                                    Select EDIT to correct address. If BYPASS is selected, the clientele record and all purchase history will be deleted from the clientele system. </span>
                            </div>
                            <div className='add-domcust-fail-modal-button-area'>
                                <div className='add-dom-cust-modal-backtoedit-btn' onClick={this.props.closeFailModal}><img src={editIcon} className='add-dom-cust-modal-backtoedit-btn-icon'/><span className='add-dom-cust-modal-backtoedit-btn-label'>BACK TO EDIT</span></div>
                                <div className='add-dom-cust-modal-bypass-btn' onClick={this.props.bypassAddressValidation}><img src={crossicon} className='add-dom-cust-modal-bypass-btn-icon'/><span className='add-dom-cust-modal-bypass-btn-label'>BYPASS</span></div>
                            </div>
                        </div>  
                </Modal>
        )
    }
}