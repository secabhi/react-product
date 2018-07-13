/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

//Images
import receiptIcon from '../../../../../resources/images/Receipt_120.svg';


export class ReceiptMenuModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <Modal
            open={this.props.props.receiptModal}
            onClose={this.props.props.receiptModal}
            classNames={{
            modal: "payment-receipt-modal" }}
            little
            showCloseIcon={false}>
            <div className='receipt-modal-container'>
                <img src={receiptIcon} className='receipt-modal-icon'/>
                <div className='receipt-modal-button-area'>
                    <div className='email-receipt-modal-btn receiptbtns' onClick={this.props.props.openemailModal}>
                        <span className='email-receipt-modal-btn-label receiptsLabel'>EMAIL RECEIPT</span>
                    </div>
                    <div className='email-print-receipt-modal-btn receiptbtns' onClick={this.props.props.emailPrintReceipt}>
                        <span className='email-print-receipt-modal-btn-label receiptsLabel'>EMAIL &amp; PRINT RECEIPT</span>
                    </div>
                    <div className='print-receipt-modal-btn receiptbtns' onClick={this.props.props.openprintModal}>
                        <span className='print-receipt-modal-btn-label receiptsLabel'>PRINT RECEIPT</span>
                    </div>
                </div>
            </div>
        </Modal>
        );
    }}