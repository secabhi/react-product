/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

//Images
import crossicon from '../../../../../resources/images/Cross_Purple.svg';
import SignatureCanvas from 'react-signature-canvas'


export class SignatureModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <Modal
                open={this.props.props.signatureModal}
                onClose={this.props.props.closeSignatureModal}
                classNames={{
                modal: 'payment-modal'
            }}
                little
                showCloseIcon={false}>
                <div className='payment-modal-container'>
                    <div className='payment-signature-modal-label'>
                        Amount Charged &nbsp;
                        <span className="payment-signature-modal-labelText">${this.props.props.payValues[this.props.props.currentCard]}</span>
                    </div>
                    <div className="payment-signature-area-modal">
                        <SignatureCanvas ref={(ref)=>{this.mySignature=ref}} />
                        <div className="enterSignatureLabel">Enter Signature</div>
                    </div>
                    <div className='payment-signature-modal-button-area'>
                        <div
                            className='payment-signature-modal-cancel-btn'
                            onClick={()=>this.mySignature.clear()}>
                            <span className='payment-signature-modal-cancel-btn-label'>CLEAR</span>

                        </div>
                        <div
                            className='payment-signature-modal-ok-btn'
                            onClick={()=>this.props.props.submitSignature(this.mySignature)}>
                            <span className='payment-signature-modal-ok-btn-label'>OK</span>
                        </div>
                        <a className="signature-bypass-btn" onClick={()=>this.props.props.submitSignature("")}>BYPASS</a>
                    </div>
                </div>
            </Modal>
        );
    }
}