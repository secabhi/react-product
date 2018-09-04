import React, {Component} from 'react';

export class CardErrorModal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (<div className="modify-price-error-modal-inner-container">
            <div className="modify-price-error-icon-container">
                <img alt="warning-icon" className="modify-price-error-icon" src={require('../../../../../resources/images/Warning.svg')} />
            </div>
            <div className="modify-price-error-text-container">
                <div className="modify-price-error-text">{this.props.errorText}</div>
            </div>
            <div className="modify-price-error-button-container" onClick={
                this.props.props.closeErrorModal
            }>
                <div className="modify-price-error-ok-button">OK</div>
            </div>
        </div>);
    }
}