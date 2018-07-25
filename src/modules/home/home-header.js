import React, {Component} from 'react'
// import './header.css';
import './home-header.css'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { testAction } from './actions';

import {postVoidTransactionList} from '../post-void/postVoidAction';
import ReceiptIcon from '../../resources/images/Receipt_Landing.png';
import postVoidIcon from '../../resources/images/Post Void.svg';
import pinpadbattery from '../../resources/images/Pinpad Battery.svg';
import resumeIcon from '../../resources/images/Resume.png';
import Ipadbattery from '../../resources/images/Ipad Battery Level.svg';
import PostVoidEnter from '../post-void/postVoidEnter';
import PostVoid from '../post-void/postVoid';
import PostVoidSelect from '../post-void/postVoid'
import { ResumeTransaction, ResumeEnter} from '../resume/resume'
import ResumeselectTrans   from '../resume/resumeSelectTrans'
import { resumeEntryUpdateAction } from '../resume/resumeAction';
import { openResumeSelectAction } from '../resume/openResumeSelectAction'

class HomeHeader extends Component {

  openPostVoidModal = () => {
    this.setState({modal_post_void:true})
  }
  openResumeTransactionModal = () => {
    this.setState({modal_resume_transaction:true})
    this.setState({modal_enter_resume:false})
  }
  closeResumeTransactionModal = () =>{
    this.setState({modal_resume_transaction:false})
  }
  cancelEnterModal = () => {
    this.setState({modal_post_void:false})
    
  }
  openselectTrans = () => {
    this.props.openSelectInvoker();
    this.setState({modal_post_voidselect:true,modal_post_void:false});
    
  }
  resumeopenSelectTransModal =() =>{
    this.props.openResumeSelectInvoker();
    this.setState({modal_resume_transaction:false})
    this.setState({modal_enter_resume:false})
    this.setState({modal_resume_select_trans:true})
  }
  cancelSelectTransModal =() =>{
    this.setState({modal_enter_resume:false})
    this.setState({modal_resume_select_trans:false})
    this.setState({modal_resume_transaction:true})
  }
  cancelSelectModal = () => {
    this.setState({modal_post_voidselect:false});
    
  }
  openEnterResumeModal = () => {
    this.setState({modal_resume_transaction:false})
    this.setState({modal_enter_resume:true})
  }
  cancelEnterResumeModal = () =>{
    this.setState({modal_resume_transaction:true})
    this.setState({modal_enter_resume:false})
  }
  openenterTrans = () => {
    this.setState({modal_post_voidenter:true});
    this.setState({modal_post_void:false});
  }
  cancelEnterTrans = () => {
    this.setState({modal_post_voidenter:false});
    
  }
  closePostVoidModal = () => {
    this.setState({modal_post_void:false})
  }

  resumeEntryUpdate = (resumeEntry) => {
    this.props.startSpinner(true);
    this.props.resumeEntryUpdateActionInvoker(resumeEntry);
  }
  cancelResumeModals = () => {
    this.setState({modal_resume_transaction:false})
    this.setState({modal_enter_resume:false})
    this.setState({modal_resume_select_trans:false})
  }


  onChangeTransNumber = (event,value,target) => {
 
      if(value!==""){
        document.getElementsByClassName('enterokbtn')[0].style.opacity="1";
        this.setState({enteredTxnNumber:value})
      }
      else{
        document.getElementsByClassName('enterokbtn')[0].style.opacity="0.4";
      }
}
  
  constructor(props)
  {
    super(props);
    this.state = {
      modal_post_void :false,
      modal_post_voidenter:false,
      modal_post_voidselect:false
    }
  }

  render() {
    return (



        <div className="headerMainCls">
        
        <div className="landingPageHeaderSection">
        <div className="navigationLinks">
           <div className="navLink-print">
              <img src={ReceiptIcon} className="headericonCls" />
              <span className="print-label">Print / Send Receipt</span>
           </div>
           <div className="navLink-post" onClick={this.openPostVoidModal.bind(this)}>
              <img src={postVoidIcon} className="headericonCls" />
              <span className="post-label">Post Void</span>
           </div>
           <div className="navLink-suspend" onClick={this.openResumeTransactionModal.bind(this)}>
              <img src={resumeIcon} className="headericonCls" />
              <span className="suspend-label">Resume</span>
           </div>
        </div>
            
            <div className="div-battery-indicator">
            <div className="letter-P">P&nbsp;</div>
            <img src={pinpadbattery} className="battery-indicator-1" alt="ipad-battery-icon"/>
            <img src={Ipadbattery} className="battery-indicator-2" alt="pinpad-battery-icon"/>
            </div>
        </div>

        {this.state.modal_post_voidenter ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={(sku) => {

          }} onClose={() => {

          }}>
            <PostVoidEnter
            cancelEnterTrans={this.cancelEnterTrans}
            onChangeTransNumber={this.onChangeTransNumber}
            enteredTxnNumber ={this.state.enteredTxnNumber}
            />
          </Modal>
          :
          null
          }
          {this.state.modal_post_void ?

          <Modal classNames={{ modal: 'post-void-modal-container' }}
       
          open={(sku) => {

          }} onClose={() => {this.onClosePostVoid}} showCloseIcon={true}>
            <PostVoid


            closePostVoidModal={this.closePostVoidModal}
            openPostVoidModal={this.openPostVoidModal}
            openselectTrans={this.openselectTrans}
            openenterTrans={this.openenterTrans}
            />
          </Modal>
          :
          null
          }

          {this.state.modal_post_voidselect ?

          <Modal classNames={{ modal: 'post-void-modal-container' }} open={(sku) => {

          }} onClose={() => {

          }}>
            <PostVoidSelect
            onActiveInitial={this.onActiveInitial}
            cancelSelectModal={this.cancelSelectModal}
            history={this.props.history}
            
            />
          </Modal>
          :
          null
          }
          
          {this.state.modal_resume_transaction ?
            <Modal classNames={{ modal: 'resume-transaction-modal-container' }} open={(sku) => {
            }} onClose={() => { 

             }}>
            <ResumeTransaction
                closeResumeTransactionModal ={this.closeResumeTransactionModal}
                openEnterResumeModal={this.openEnterResumeModal}
                resumeopenSelectTrans={this.resumeopenSelectTransModal}
                cancelSelectTransModal={this.cancelSelectTransModal}
            />
            </Modal>
            :
            null
          }
          
          {this.state.modal_enter_resume ?
            <Modal classNames={{ modal: 'enter-resume-modal-container' }} open={(sku) => {
            }} onClose={() => { 

             }}>

              <ResumeEnter
                closeResumeTransactionModal ={this.closeResumeTransactionModal}
                cancelEnterResumeModal={this.cancelEnterResumeModal}
                resumeEntryUpdateAction={this.resumeEntryUpdate}
                cancelResumeModals={this.cancelResumeModals}
             />
            </Modal>
            :
            null
          }
          {this.state.modal_resume_select_trans ?
            <Modal classNames={{ modal: 'resume-select-trans-modal-container' }} open={(sku) => {
            }} onClose={() => { 

             }}>

              <ResumeselectTrans
                closeResumeTransactionModal ={this.closeResumeTransactionModal}
                cancelEnterResumeModal={this.cancelEnterResumeModal}
                cancelSelectTransModal={this.cancelSelectTransModal}
              />
            </Modal>
            :
            null
          }
          
        </div>
    );
  }
}

function mapStateToProps({ header }) {
  return { header }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSelectInvoker: postVoidTransactionList,
      openResumeSelectInvoker:openResumeSelectAction,
      startSpinner:startSpinner,
      resumeEntryUpdateActionInvoker: resumeEntryUpdateAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
