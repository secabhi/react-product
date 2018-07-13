import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export class EmailConfirmModal extends Component {

    componentDidMount() {
        //console.log('phomemodal '+JSON.stringify(this.props))
    }
    render() {
        return (
            <Modal
                open={this.props.emailModalOpen}
                onClose={this.emailModal}
                classNames={{
                modal: 'add-dom-cust-modal'
            }}
                little
                showCloseIcon='false'>
                <div className='add-dom-cust-container'>
                    <img src={emailmodalicon} className='add-dom-cust-modal-icon'/>
                    <div className='add-dom-cust-email-modal-label'>Is this your correct email address?</div>
                    <div class="cust-email-tooltip">
                        <ReactTooltip
                            data-class="react-email-tooltip-custom"
                            effect="solid"
                            place="top"
                            className="tooltipCls"></ReactTooltip>
                        <div className='add-dom-cust-phone-modal-conform-email'>{this.props.emailModalEmailAddress}

                        </div>
                        {this.props.emailModalEmailAddress.length > 25
                            ? <img
                                    className="tooltip-info-icon"
                                    data-tip={this.props.emailModalEmailAddress}
                                    src={info}/>
                            : ''}
                    </div>
                    <div className='add-dom-cust-modal-email-button-area'>
                        <div
                            className='add-dom-cust-modal-no-btn'
                            onClick={this.props.emailModalNo}>
                            <span className='add-dom-cust-modal-no-btn-label'>NO</span>
                        </div>
                        <div
                            className='add-dom-cust-modal-yes-btn'
                            onClick={this
                            .props
                            .emailModalYes
                            .bind(this, false)}>
                            <span className='add-dom-cust-modal-yes-btn-label'>YES</span>
                        </div>

                    </div>
                </div>
            </Modal>
        )
    }
}