/* Dependencies import */
import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-responsive-modal';

//Images
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';
import info from '../../../../../resources/images/Info.svg';
import WarningIcon from '../../../../../resources/images/Warning_icon.png';
import crosswhite from '../../../../../resources/images/Cross_White.svg';

export class VerifyEmailModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        const errorDiv = this.props.failure
            ? (
                <span className="emailErrorBanner"><img src={WarningIcon} className="warning-icon"/>
                    <span className="loginErrorText">Email request error</span>
                    <img
                        className="closeModalBanner"
                        src={crosswhite}
                        onClick={this.props.closeError}></img>
                </span>
            )
            : null;
        return (
            <Modal
                open={this.props.props.emailverifyModal}
                onClose={this.closeEmailverifyModal}
                classNames={{
                modal: 'add-dom-cust-modal'
            }}
                little
                showCloseIcon={false}>
                <div className='add-dom-cust-container'>
                    {errorDiv}
                    <img src={emailmodalicon} className='add-dom-cust-modal-icon'/> {/* <div className="add-dom-cust-email-verify-modal-name">{this.props.props.fname} &nbsp;{this.props.props.lname}</div> */}
                    <div className='add-dom-cust-email-modal-label'>Is this your correct email address?</div>
                    <div className="cust-email-tooltip">
                        <ReactTooltip
                            data-class="react-email-tooltip-custom"
                            effect="solid"
                            place="top"
                            className="tooltipCls"></ReactTooltip>
                        <div className='add-dom-cust-phone-modal-conform-email'>
                            {this.props.props.email}
                        </div>
                        {this.props.props.email !== undefined
                            ? (this.props.props.email.length > 25
                                ? <img
                                        className="tooltip-info-icon"
                                        data-tip={this.props.props.email}
                                        src={info}/>
                                : '')
                            : ''}
                    </div>
                    <div className='add-dom-cust-modal-email-button-area'>
                        <div
                            className='add-dom-cust-modal-no-btn'
                            onClick={this.props.props.closeEmailverifyModal}>
                            <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                        </div>
                        <div
                            className='add-dom-cust-modal-yes-btn'
                            onClick
                            ={(e) => this.props.props.emailSend()}>
                            <span className='add-dom-cust-modal-yes-btn-label'>YES</span>
                        </div>

                    </div>
                </div>
            </Modal>
        );
    }
}