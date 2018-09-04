import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';

/* Import images*/
import erroricon from '../../../../../resources/images/Error_Alert.svg';
import crossicon from '../../../../../resources/images/Bypass.svg';
import editIcon from '../../../../../resources/images/Resetall_White.svg';

export class InvalidAddressModal extends Component {

    componentDidMount() {
        //console.log('phomemodal '+JSON.stringify(this.props))
    }
    render() {
        return (
            <Modal
            open={this.props.invalidModalOpen}
            onClose={() => { }} 
            little showCloseIcon={false}
            classNames={{
            modal: 'add-dom-cust-modal'
        }}>
            <div className='add-dom-cust-container'>
                <img src={erroricon} className='add-dom-cust-modal-icon'/>
                <div className='add-domcust-fail-modal-message-area'>
                    <span className='add-domcust-fail-modal-message-text'>Invalid address - Cannot
                        be validated. Select RETURN TO EDIT to correct address. If BYPASS is selected, the
                        clientele record and all purchase history will be deleted from the clientele
                        system.
                    </span>
                </div>
                <div className='add-domcust-fail-modal-button-area'>
                    <div
                        className='add-dom-cust-modal-backtoedit-btn'
                        onClick={this.props.invalidModalBack}><img src={editIcon} className='add-dom-cust-modal-backtoedit-btn-icon' hidden={this.props.visibility}/>
                        <span className='add-dom-cust-modal-backtoedit-btn-label'>RETURN TO EDIT</span>
                    </div>
                    <div
                        className='add-dom-cust-modal-bypass-btn'
                        onClick={this.props.invalidModalBypass}><img src={crossicon} className='add-dom-cust-modal-bypass-btn-icon' hidden={this.props.visibility}/>
                        <span className='add-dom-cust-modal-bypass-btn-label'>BYPASS</span>
                    </div>
                </div>
            </div>
        </Modal>
        )
    }
}