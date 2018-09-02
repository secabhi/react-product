import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';

/* Import images*/
import phonemodalicon from '../../../../../resources/images/Confirm_Phone.svg';

export class PhoneModal extends Component {

    componentDidMount() {
        //console.log('phomemodal '+JSON.stringify(this.props))
    }
    render() {
        return (
            <Modal open={
                this.props.phoneModalOpen
            }
                classNames={{
                    modal: 'add-dom-cust-modal'
                }}
                little showCloseIcon={false} onClose={() => { }} >
                <div className='add-dom-cust-container'>
                    <img src={phonemodalicon} className='add-dom-cust-modal-icon' />
                    <div className='add-dom-cust-phone-modal-label'>Is this your correct phone number?</div>
                    <div className='add-dom-cust-phone-modal-conform-phone'>{this.props.phoneModalNum}</div>
                    <div className='add-dom-cust-modal-conform-phone-button-area'>
                        <div
                            className='add-dom-cust-modal-no-btn'
                            onClick={this.props.phoneModalNo}>
                            <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                        </div>
                        <div
                            className='add-dom-cust-modal-yes-btn'
                            onClick={this.props.phoneModalYes}>
                            <span className='add-dom-cust-modal-yes-btn-label'>YES</span>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}