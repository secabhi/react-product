/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {PurchasesList} from '../PurchasesList';

export class SFFPurchasesModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
            <Modal
                open={this.props.props.purchasesListModal}
                onClose={this.props.props.closepurchaseModal}
                classNames={{
                modal: 'payment-purchases-modal',
                overlay: 'payment-custom-overlay'
            }}
                little
                showCloseIcon={false}>
                <div className='add-dom-cust-container'>
                    <PurchasesList props={this.props.props}/>
                </div>
            </Modal>
        );
    }
}