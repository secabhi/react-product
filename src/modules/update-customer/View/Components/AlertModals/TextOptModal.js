import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
// import '../../Styles/AddCustomerStyle.css';

/*Component import */
import ReactTooltip from 'react-tooltip';

/* Import images*/
import textopticon from '../../../../../resources/images/Text_Opt_In.svg';
import info from '../../../../../resources/images/Info.svg';
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';

export default class TextOptModal extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <Modal open={Boolean(this.props.textoptModal)} onClose={() => {}} classNames={{ modal: 'add-dom-cust-modal'}} little showCloseIcon={false} >
                        <div className = 'add-dom-cust-container'>
                            <img src={textopticon} className='add-dom-cust-modal-icon'/>
                            <div className='add-dom-cust-phone-modal-label'>Text Opt In/ Out</div>
                            <div className='add-dom-cust-text-opt-message-area'><span className='add-dom-cust-text-opt-message'>I would like to receive promotional text messages and images from Neiman Marcus Group LLC and its companies. Rates may apply.</span></div>
                            <div className='add-dom-cust-modal-textopt-button-area'>
                                <div className='add-dom-cust-modal-textopt-disagree-btn' onClick={this.props.openEmailModal}><span className='add-dom-cust-modal-textopt-disagree-btn-label'>DISAGREE</span></div>
                                <div className='add-dom-cust-modal-textopt-agree-btn' onClick={this.props.setCustTextOpt}><span className='add-dom-cust-modal-textopt-agree-btn-label'>AGREE</span></div>
                                
                            </div>
                        </div>
                </Modal>
        )
    }
}