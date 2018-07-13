import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';

/* Import images*/
import addcustsuccessicon from '../../../../../resources/images/Success_Green.svg';

export class SuccessModal extends Component {

    componentDidMount() {
        //console.log('phomemodal '+JSON.stringify(this.props))
    }
    render() {
        return (
            <Modal
            open={this.props.successModalOpen}
            little
            showCloseIcon='false'
            classNames={{
            modal: 'addcust-success-modal'
            } }>
            <div className='add-cust-success-modal-container'>
                <img src={addcustsuccessicon} className='add-domcust-success-modal-icon'/>
                <div className='add-domcust-success-modal-message'>
                    The customer
                    <span>
                    {' '}{this.props.successModalSalutation}{' '}{this.props.successModalFname}{' '} {this.props.successModalLname}{' '}
                    </span>
                    has been added successfully.
                </div>
                <div
                    className='add-domcust-success-modal-close-btn'
                    onClick={this.props.successModalClose}>
                    <span className='add-domcust-success-modal-close-btn-label'>CLOSE</span>
                </div>
            </div>
        </Modal>
        )
    }
}