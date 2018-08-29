import React, {Component} from 'react';

export class ConfirmExitModal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div className="modify-price-error-modal-inner-container">
                <div className="modify-price-error-icon-container">
                    <img
                        alt="warning-icon"
                        className="modify-price-error-icon"
                        src={require('../../../../resources/images/Warning.svg')} />
                </div>
                <div className="modify-price-error-text-container">
                    <div className="modify-price-error-text">Are you sure you want to logout and void transaction?</div>
                </div>
                <div
                    className='add-dom-cust-modal-no-btn'
                    onClick={this.props.closeModal}>
                    <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                </div>
                <div
                    className="modify-price-error-button-container"
                    onClick={this.props.confirmExit}>
                    <div className="modify-price-error-ok-button">YES</div>
                </div>
            </div>
        );
    }
}