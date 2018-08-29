import React, { Component } from 'react'

import './resume.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import {resumeEntryUpdateAction} from '../resume/resumeAction';
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import resumeIcon from '../../resources/images/Resume.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

class ResumeselectTrans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            transactionList: [],
            selectedTransaction: "",
            selectedTransactionDetails: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Resume Select Trans componentWillReceiveProps:', nextProps);
        if (nextProps.resumered.dataFrom === "SUSPENDED_TRANSACTION_LIST_SUCCESS") {
            
            this.setState({ transactionList: nextProps.resumered.response.transactionList });
            console.log('Transaction list componentWillReceiveProps:', nextProps.resumered.response.transactionList);
            this.props.startSpinner(false);
        }
        else {
            if (nextProps.resumered.defaultValue !== true) {
            }
        }

    }
    resumeSelectTransInvoker = () => {
        if (this.state.selectedTransaction !== '') {
            this.props.resumeSelectTransDetails(this.state.selectedTransactionDetails.resumeNumber, this.props.login.userpin);
            console.log('****SelectedDetails',this.state.selectedTransactionDetails);
            this.props.startSpinner(true);
        }
        else {
            //DO NOTHING
        }
    }
    toggle = (index) => {
        if (this.state.selectedTransaction === index) {
            this.setState({ selectedTransaction: '', selectedTransactionDetails: {} })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
        } else {
            this.setState({ selectedTransaction: index, selectedTransactionDetails: this.state.transactionList[index] })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = "1";
        }
    }

    render() {
        var selectedStyle = {
            background: "#4b2b6f"
        }
        var unselectedStyle = {
            background: "#FFFFFF"
        }
        var selectedTextStyle = {
            color: "#FFFFFF"
        }
        var unselectedTextStyle = {
            color: "#000000"
        }
        return (
            <div>

                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a Trans #</div>
                    </div>
                    <div className="postvoid-selectionarea">
                        {
                            this.state.transactionList.map(function (item, index) {
                                var rowObject = (

                                    <div style={(this.state.selectedTransaction === index) ? (selectedStyle) : (unselectedStyle)} onClick={() => this.toggle(index)} key={index} className="carditemlayoutinitial">
                                        <label style={(this.state.selectedTransaction === index) ? (selectedTextStyle) : (unselectedTextStyle)} className="labelcardlayout" >
                                            {item.transactionId} - {item.resumeNumber}
                                        </label>
                                    </div>

                                )
                                return (
                                    rowObject
                                );
                            }, this)
                        }
                    </div>
                    <div className='post-void-modalselect-button-area'>
                        <button className='post-void-modalselect-cancelbtn' onClick={() => this.props.resumeallmodals(true,false,false)}><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={this.resumeSelectTransInvoker}><span className='post-void-ok-label' disabled>OK</span></button>
                    </div>
                </div>
            </div>
        );
    }

}
function mapStateToProps({ resumered, login }) {
    return { resumered, login}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            resumeSelectTransDetails: resumeEntryUpdateAction,
            startSpinner:startSpinner
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeselectTrans);
