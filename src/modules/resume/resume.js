import React, { Component } from 'react'

import './resume.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import postVoidDetailsTransaction from '../post-void/postVoidAction';
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import resumeIcon from '../../resources/images/Resume.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

export class ResumeTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
 
    render() {
        return (
            <div>
                <div className='resume-transaction-modal-container'>
                    <div><img src={closeicon} className="closeicon" onClick={this.props.closeResumeTransactionModal} /></div>
                    <div><img src={postVoidIcon} className='resume-transaction-modal-icon' /></div>
                    <div className='resume-transaction-modal-label'>Resume Transaction</div>
                    <div className='resume-transaction-modal-button-area'>
                        <button className='resume-transaction-modal-button-select'><span className='resume-transaction-modal-button-select-label' onClick={() => this.props.resumeopenSelectTrans()}>SELECT TRANS #</span></button>
                        <button className='resume-transaction-modal-button-enter'><span className='resume-transaction-modal-button-enter-label' onClick={() => this.props.openEnterResumeModal()}>ENTER RESUME #</span></button>
                    </div>
                </div>
            </div>
        );
    }
}

export class ResumeEnter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ResumeEntry: '',
        }
    }
    
    
    updateResumeEntry(e) {
        const { ResumeEntry } = this.state;
        this.setState({
            ResumeEntry: e.target.value,
        });
        if ((e.target.value.length < 1)) {
            document.getElementsByClassName("enter-resume-okbtn")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("enter-resume-okbtn")[0].disabled = false;
        }
    }
    ResumeEntryForm(e) {
        e.preventDefault();
        console.log('ResumeEntry Update SUBMITING');
        this.props.resumeEntryUpdateAction(this.state.ResumeEntry);
        this.props.cancelResumeModals();
    }
    render() {
        var textFieldFloatingLabelStyle = {

            height: (window.innerWidth > 1900) ? '28px' : '74px',
            fontSize: (window.innerWidth > 1900) ? '30px' : '56px',
            fontWeight: '300',
            top: (window.innerWidth > 1900) ? '0px' : '9px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            lineHeight: '1.21',
            textAlign: 'left',
            color: (window.innerWidth > 1900) ? '#828282' : ' #333333'
        }
        var textFieldInputStyle = {
            height: (window.innerWidth > 1900) ? '37px' : '74px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '56px',
            lineHeight: '1.19',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingBottom: (window.innerWidth > 1900) ? '4.5px' : '0px',
            paddingLeft: (window.innerWidth > 1900) ? '13px' : '0px',
            paddingTop: (window.innerWidth > 1900) ? '0px' : '0px',
            marginTop: (window.innerWidth > 1900) ? '10px' : '0px!important'


        }
        const textFieldStyle = {
            paddingTop: (window.innerWidth > 1900) ? '0px' : '30px',
            height: '60px',
            width: (window.innerWidth > 1900) ? '602.5px' : '738px',
            maxWidth: '680px'
        }
        return (
            <div>
                <div className="enter-resume-modal-container">
                    <div className=""><img className="enter-resume-icon" src={postVoidIcon} /></div>
                    <div className="enter-resume-modal-label-div"><label className="enter-resume-modal-label">Enter Resume #</label></div>
                    <form className="ResumeForm" onSubmit={(e) => { this.ResumeEntryForm(e) }}>
                        {(window.innerWidth > 1900) ?
                            (<div className="enter-resume-textfield-scan-cls">
                                <TextField
                                    required
                                    type="text"
                                    floatingLabelText="Resume #"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    fullWidth={true}
                                    inputStyle={textFieldInputStyle}
                                    style={textFieldStyle}
                                    onChange={e => this.updateResumeEntry(e)}
                                />
                                <img className="enter-resume-textfield-scan" src={scan} /></div>) :

                            (<div className="enter-resume-textfield-scan-cls">
                                <TextField
                                    required
                                    type="text"
                                    floatingLabelText="Resume #"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    fullWidth={true}
                                    inputStyle={textFieldInputStyle}
                                    style={textFieldStyle}
                                />
                                <img className="enter-resume-textfield-scan" src={scan} />
                            </div>
                            )}
                        <div className="enter-resume-button-area">
                            <button className="enter-resume-cancelbtn" onClick={this.props.cancelEnterResumeModal}><img className="enter-resume-cross" src={crossicon} /><label className="enter-resume-cancel-label">CANCEL</label></button>
                            <button className="enter-resume-okbtn" type="submit" disabled><label className="enter-resume-ok-label">OK</label></button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export class ResumeselectTrans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_post_void: false,
            modal_post_voidselect: false,
            modal_post_voidenter: false,
            active: null,
            transactionList : [],
            selectedTransaction : "",
            selectedTransactionDetails : {}
        }
    }

    
  
    componentWillReceiveProps(nextProps) {
        console.log('Resume Select Trans componentWillReceiveProps:', nextProps);
        if(nextProps.postvoidgettransaction.listFetchSuccessFlag === true) {
            this.props.startSpinner(false);
            this.setState({ transactionList : nextProps.postvoidgettransaction.response.transactionList });
        }
        else {
            if(nextProps.postvoidgettransaction.defaultValue !== true) {
                this.props.startSpinner(false);
            }
        }

    }

    postVoidTransInvoker = () => {
        if(this.state.selectedTransaction !== '') {
            this.props.PostVoidTransDetls(this.props.login.userpin,this.state.selectedTransactionDetails);
    
        }
        else {
            //DO NOTHING
        }
    }
    toggle = (index) => {
        if (this.state.selectedTransaction === index) {
            this.setState({ selectedTransaction: '', selectedTransactionDetails : {} })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
        } else {
            this.setState({ selectedTransaction: index, selectedTransactionDetails : this.state.transactionList[index] })
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
            color : "#FFFFFF"
        }
        var unselectedTextStyle = {
            color : "#000000"
        }
        return (
            <div>

                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a Trans #</div>
                    </div>                    
                    <div className="postvoid-selectionarea">
                    {
                        this.state.transactionList.map(function(item,index) {
                            var rowObject = (
                                <div style={(this.state.selectedTransaction === index)?(selectedStyle):(unselectedStyle)} onClick={() => this.toggle(index)} key={index} className="carditemlayoutinitial">
                                    <label style={(this.state.selectedTransaction === index)?(selectedTextStyle):(unselectedTextStyle)} className="labelcardlayout" >
                                        {item.transactionID} - {item.amount}
                                    </label>
                                </div>
                            )
                            return (
                                rowObject
                            );
                        },this)
                    }                    
                    </div>
                    <div className='post-void-modalselect-button-area'>
                        <button className='post-void-modalselect-cancelbtn' onClick={this.props.cancelSelectModal}><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={this.postVoidTransInvoker}><span className='post-void-ok-label' disabled>OK</span></button>
                    </div>
                </div>
            </div>
        );
    }

}

