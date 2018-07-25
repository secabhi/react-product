
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import updatecustsuccessicon from '../../../../../resources/images/Success_Green.svg';
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export default class SuccessModal extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <Modal open={Boolean(this.props.succesModal)} onClose={() => {}} little showCloseIcon={false} classNames={{ modal: 'updatecust-success-modal' }} >
                        <div className='`add-cust-success-modal-container`'>
                            <img src={updatecustsuccessicon} className='add-domcust-success-modal-icon'/>
                            <div className='add-domcust-success-modal-message'>
                                The customer <span> 
                                {(this.props.invokedFrom === "updateCustomerInternational")?this.props.changedAddress['update_int_salutation']:this.props.changedAddress['update_int_salutation']} 
                                {' '}
                                {(this.props.invokedFrom === "updateCustomerInternational")?this.props.changedAddress['update_int_fname']:this.props.changedAddress['cust_dom_fname']} 
                                {' '}
                                {(this.props.invokedFrom === "updateCustomerInternational")?this.props.changedAddress['update_int_lname']:this.props.changedAddress['cust_dom_lname']} </span>
                                    has been updated successfully.


                            </div>
                            <div className='add-domcust-success-modal-close-btn' onClick={this.props.closeSuccessModal}><span className='add-domcust-success-modal-close-btn-label'>CLOSE</span></div>  
                        </div>    
                </Modal>

        )
    }
}