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
import {PostVoidEnter} from '../post-void/postVoid';
import  PostVoid from '../post-void/postVoid';
import PostVoidSelect from '../post-void/postVoidSelect'

class HomeHeader extends Component {

  openPostVoidModal = () => {
    this.setState({modal_post_void:true})
    
  }
  cancelEnterModal = () => {
    this.setState({modal_post_void:false})
    
  }
  openselectTrans = () => {
    this.setState({modal_post_voidselect:true});
    this.setState({modal_post_void:false});
    this.props.openSelectInvoker();
    
  }
  cancelSelectModal = () => {
    this.setState({modal_post_voidselect:false});
    
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

  onChangeTransNumber = (event,value,target) => {
      if(value!==""){
        document.getElementsByClassName('enterokbtn')[0].style.opacity="1";
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
           <div className="navLink-suspend">
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
          
        </div>
    );
  }
}

function mapStateToProps({ header }) {
  return { header }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openSelectInvoker: postVoidTransactionList,
      startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);









{/*<div className="landingPageHeaderSection">
<div className="navigationLinks">
   <div className="navLink-print">
      <span className="print-label">Print / Send Receipt</span>
      <img src={ReceiptIcon} className="headericonCls" />
   </div>
   <div className="navLink-post">
      <span className="post-label">Post Void</span>
      <img src={postVoidIcon} className="headericonCls" />
   </div>
   <div className="navLink-suspend">
      <span className="suspend-label">Suspend / Resume</span>
      <img src={resumeIcon} className="headericonCls" />
   </div>
</div>

<div className="headerTime">
   <img src={clockIcon} className="clockIcon" />
   <span className="timeText">02-22-2018 02:21PM</span>
</div>
<div className="">
   <img src={pinpadBattery} className="pinpadIcon" />
</div>
<div className="pinpadBatterySection">
   <img src={ipadBattery} className="ipadIcon" />
</div>
</div>*/}