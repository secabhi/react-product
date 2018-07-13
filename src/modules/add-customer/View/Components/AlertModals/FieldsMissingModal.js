import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';

/* Import images*/
import erroricon from '../../../../../resources/images/Error_Alert.svg';

export class FieldsMissingModal extends Component {

    componentDidMount() {
       
    }
    render() {
        return (
            
            <Modal
            open={this.props.fieldsMissingOpen}
            little
            showCloseIcon='false'
            classNames={{
            modal: 'add-dom-cust-fields-missing-modal'
        }}>
            <div className='add-dom-cust-fields-missing-modal-cotainer'>
                <img
                    src={erroricon}
                    className='add-dom-cust-fields-missing-modal-cotainer-icon'/>
                <div className='add-dom-cust-fields-missing-modal-message-area'>
                    <span className='add-dom-cust-fields-missing-modal-message'>You must supply a
                        valid street address or email address for this client. Press OK to continue.</span>
                </div>
                <div
                    className='add-dom-cust-fields-missing-modal-ok-btn'
                    onClick={this.props.fieldsMissingClose}>
                    <span className='add-dom-cust-fields-missing-modal-ok-btn-label'>OK</span>
                </div>
            </div>
        </Modal>
        )
    }
}