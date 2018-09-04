/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';

//Images
import registerIcon from '../../../resources/images/Print_To_Register.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';


export class PrintReceiptModal extends Component {

    constructor(props) {
        super(props);
        this.state = {inputVal:""}

    }

    handleChange=(e)=>{
        this.setState({inputVal:e.target.value})
    }

    render() {
        return (
            <Modal
                open={this.props.printModal}
                onClose={this.props.closePrintModal}
                classNames={{
                modal: 'add-dom-cust-modal'
            }}
                little
                showCloseIcon={false}>
                <div className='add-dom-cust-container'>
                    <img src={registerIcon} className='email-receipt-modal-icon'/>
                    <div className='email-receipt-modal-name'>Print to Register</div>
                    <TextField
                        type="telephone"
                        hintText="Enter Register ID"
                        className="print-receipt-input"
                        onChange={(e)=> this.handleChange(e) }/>
                    <div className='add-dom-cust-modal-email-button-area'>
                        <div
                            className='payment-signature-modal-cancel-btn'
                            onClick={this.props.closePrintModal}>
                            <div className="cross-icon-border"><img src={crossicon} className='payment-cancel-btn-cross-icon'/></div>
                            <span className='payment-signature-modal-cancel-btn-label'>CANCEL</span>
                        </div>
                        <div
                            className='add-dom-cust-modal-yes-btn printbtnConfirm'
                            >
                            <span className='add-dom-cust-modal-yes-btn-label lff-btn'>OK</span>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}