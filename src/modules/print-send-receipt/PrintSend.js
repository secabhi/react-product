import React, { Component } from 'react'

import './PrintSend.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import PrintSendDetailsTransaction from '../print-send-receipt/printRecieptAction';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';
import {PrintSendTransactionList} from '../print-send-receipt/printRecieptAction';
class PrintSend extends Component {

        constructor(props) {
        super(props);
        this.state = {
            modal_print_send: false,
            modal_print_sendselect: false,
            modal_print_sendenter: false
        }
    }

componentDidMount(){
    console.log("props isss",this.props)
}

    render() {
        return (
            <div>
                <div className='post-void-modal-container'>
                    <div><img src={closeicon} className="closeicon" onClick={this.props.closeModal1} /></div>
                    <div><img src={this.props.modalIcon} className='post-void-modal-icon' /></div>
                    <div className='post-void-modal-label'>Print / Send Receipt</div>
                    <div className='post-void-modal-button-area'>
                        <button className='post-void-modal-button-select'><span className='post-void-modal-button-select-label' onClick={() => this.props.openselectTransPrint(this.props.userPin)}>SELECT TRANS #</span></button>
                        <button className='post-void-modal-button-enter'><span className='post-void-modal-button-enter-label' onClick={this.props.openenterTransPrint}>ENTER TRANS #</span></button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ PrintSendgettransaction}) {
    return { PrintSendgettransaction };
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintSend);

