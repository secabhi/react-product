/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

//Images
import receiptIcon from '../../../resources/images/Receipt_120.svg';


export class ReceiptMenuModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <Modal
            open={this.props.receiptModal}
            onClose={this.props.receiptModal}
            classNames={{
            modal: "payment-receipt-modal" }}
            little
            showCloseIcon={false}
            closeOnOverlayClick={false}
            >
            <div className='receipt-modal-container'>
                <img src={receiptIcon} className='receipt-modal-icon'/>
                <div className='receipt-modal-button-area'>
                    <div className='email-receipt-modal-btn receiptbtns' onClick={()=>{this.props.printReceipt(false)}}>
                        <span className='email-receipt-modal-btn-label receiptsLabel'>PRINTT RECEIPT</span>
                    </div>
                    <div className='email-print-receipt-modal-btn receiptbtns' onClick={this.props.openPrintGiftModal}>
                        <span className='email-print-receipt-modal-btn-label receiptsLabel'>PRINT GIFT RECEIPT</span>
                    </div>
                    <div className='print-receipt-modal-btn receiptbtns' onClick={this.props.openemailModal}>
                        <span className='print-receipt-modal-btn-label receiptsLabel'>SEND EMAIL</span>
                    </div>
                </div>
            </div>
        </Modal>
        );
    }}