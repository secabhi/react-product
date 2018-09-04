import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import phonemodalicon from '../../../../../resources/images/Confirm_Phone.svg';
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export default class PhoneModal extends Component {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        console.log("PHONEMODAL COMPWILLRECPROPS NEXTPROPS: ", nextProps);
    }

    render() {
        return (
            <Modal open={Boolean(this.props.phoneModal)} onClose={() => {}} classNames={{ modal: 'add-dom-cust-modal'}} little showCloseIcon={false} >
            <div className='add-dom-cust-container'>
                <img src={phonemodalicon} className='add-dom-cust-modal-icon'/>
                <div className='add-dom-cust-phone-modal-label'>Is this your correct phone number?</div>
        <div className='add-dom-cust-phone-modal-conform-phone'>{(this.props.invokedFrom == "updateCustomerDomestic")?this.props.changedAddress['cust_dom_mobile']:this.props.changedAddress['update_int_mobile']}</div>
                <div className='add-dom-cust-modal-conform-phone-button-area'>
                    <div className='add-dom-cust-modal-no-btn' onClick={this.props.closePhoneModal} ><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                    <div className='add-dom-cust-modal-yes-btn' onClick={this.props.openTextOptModal} ><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                    
                </div>
            </div>  
    </Modal> 
        )
    }
}