/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

//Images
import receiptIcon from '../../../../../resources/images/Receipt_120.svg';

export class PrintGiftReceiptModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <Modal
                open={this.props.props.printGiftModal}
                onClose={this.props.props.closePrintGiftModal}
                classNames={{
                modal: 'add-dom-cust-modal'
            }}
                little
                showCloseIcon={false}
                closeOnOverlayClick={false}>
                <div className='add-dom-cust-container'>
                <img src={receiptIcon} className='receipt-modal-icon'/>
                    <div className='email-receipt-modal-name'>Print Gift Receipt</div>
                    <div className='print-gift-receipt-label'>
                        Do you want to print separate gift receipts?
                    </div>
                    <div className='add-dom-cust-modal-email-button-area'>
                        <div
                            className='add-dom-cust-modal-no-btn'
                            onClick={this.props.props.closePrintGiftReceiptModal}>
                            <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                        </div>
                        <div
                            className='add-dom-cust-modal-yes-btn printbtnConfirm'
                            onClick={this.props.props.printGiftReceipt}>
                            <span className='add-dom-cust-modal-yes-btn-label lff-btn'>YES</span>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}