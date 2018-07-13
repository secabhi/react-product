import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import erroricon from '../../../../../resources/images/Error_Red.svg';
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export default class EmailModal extends Component {

    componentDidMount() {
    }
    render() {
        return (
            
            <Modal open={Boolean(this.props.emailModal)} onClose={() => {}} classNames={{ modal: 'add-dom-cust-modal'}} little showCloseIcon={false}  >
                        <div className = 'add-dom-cust-container'>
                            <img src={emailmodalicon} className='add-dom-cust-modal-icon'/>
                            <div className='add-dom-cust-email-modal-label'>Is this your correct email address?</div>
                            
                            
                            {/*<div className='add-domg-cust-phone-modal-conform-email' data-tip={this.state.changedAddress['update_int_email']}>{this.state.changedAddress['update_int_email']}<ReactTooltip place="top" className="tooltipCls"></ReactTooltip></div>*/}

                            <div className="cust-email-tooltip">
                                <ReactTooltip data-class="react-email-tooltip-custom" effect="solid" place="top" className="tooltipCls"></ReactTooltip>
                                <div className='add-dom-cust-phone-modal-conform-email'>{(this.props.invokedFrom == "updateCustomerDomestic")?this.props.changedAddress['cust_dom_email']:this.props.changedAddress['update_int_email']}
                                
                                </div>
                                        {/* {this.props.changedAddress['cust_dom_email'].length>25?<img className="tooltip-info-icon" data-tip={this.props.changedAddress['cust_dom_email']} src={info}/>:'' } */}
                            </div>


                            <div className='add-dom-cust-modal-email-button-area'>
                                <div className='add-dom-cust-modal-no-btn' onClick={this.props.closeEmailModal}><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='add-dom-cust-modal-yes-btn' onClick={(this.props.invokedFrom == "updateCustomerDomestic")?this.props.updateDomesticCustomerInvoker.bind(this,false):this.props.updateInternationalCustomerInvoker.bind(this,false)}><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                                
                            </div> 
                        </div>
                </Modal>
        )
    }
}