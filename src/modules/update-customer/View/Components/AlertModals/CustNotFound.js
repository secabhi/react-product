
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

export class CustNotFound extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <Modal open={Boolean(this.props.custNotFoundModal)} onClose={() => {}} little showCloseIcon={false} classNames={{ modal: 'updatecust-success-modal' }} >
                        <div className='`add-cust-success-modal-container`'>
                            <img src={erroricon} className='add-domcust-success-modal-icon'/>
                            <div className='add-domcust-success-modal-message'>
                                Customer not found. Please contact customer service.
                            </div>
                            <div className='add-domcust-success-modal-close-btn' onClick={this.props.closeNotFoundModal}><span className='add-domcust-success-modal-close-btn-label'>OK</span></div>  
                        </div>    
                </Modal>
        )
    }
}