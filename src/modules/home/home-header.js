import React, {Component} from 'react'
// import './header.css';
import './home-header.css'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';

import {postVoidTransactionList} from '../post-void/postVoidAction';
import ReceiptIcon from '../../resources/images/Receipt_Landing.png';
import postVoidIcon from '../../resources/images/Post Void.svg';
import pinpadbattery from '../../resources/images/Pinpad Battery.svg';
import resumeIcon from '../../resources/images/Resume.png';
import Ipadbattery from '../../resources/images/Ipad Battery Level.svg';
import PostVoidEnter from '../post-void/postVoidEnter';
import PostVoid from '../post-void/postVoid';
import PostVoidSelect from '../post-void/postVoid'

import warningIcon from '../../resources/images/Warning.svg';

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_post_void :false,
      modal_post_voidenter:false,
      modal_post_voidselect:false,
    }
  }

  componentWillReceiveProps() {

  }

  render() {
    return (

        <div className="headerMainCls">
        
        <div className="landingPageHeaderSection">
        <div className="navigationLinks">
           <div className="navLink-print" onClick={(event) => {this.props.handleShowLogin(event)}}>
              <img id="7" src={ReceiptIcon} className="headericonCls" />
              <span id="7" className="print-label">Print / Send Receipt</span>
           </div>
           <div className="navLink-post" onClick={(event) => {this.props.handleShowLogin(event)}}>
              <img id="5" src={postVoidIcon} className="headericonCls" />
              <span id="5" className="post-label">Post Void</span>
           </div>
           <div id ="6" className="navLink-suspend" onClick={(event) => {this.props.handleShowLogin(event)}}>
              <img id="6" src={resumeIcon} className="headericonCls" />
              <span id="6" className="suspend-label">Resume</span>
           </div>
        </div>
            
        <div className="battery-indicator-area">
        <div className = "ped-battery-indicator">
          <div className = "ped-battery-color-area">
           <div className = "ped-battery-color-area-inner"
              style = {{
                        width : this.props.pedindicatorwidth,
                        backgroundColor : this.props.pedindicatorcolor
                      }}
                    >
            </div>
          </div>
        </div>
        
        <div className = "device-battery-indicator">
          <div className = "device-battery-color-area">
            <div className = "device-battery-color-area-inner"
              style = {{
                        width : this.props.batteryStatus+'%' !='' && this.props.batteryStatus != undefined ? this.props.batteryStatus+'%' : '100%' ,
                        backgroundColor : (this.props.batteryStatus !='' && this.props.batteryStatus != undefined) ? ( (this.props.batteryStatus+'%').slice(0,-1) <= 20 ? "red" : "green")  : "green"
                      }}
            ></div>
          </div>
        </div>
        
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
        </div>
    );
  }

  openPostVoidModal = () => {
    this.setState({modal_post_void:true})
  }
  
  cancelEnterModal = () => {
    this.setState({modal_post_void:false})
    
  }
  openselectTrans = () => {
    this.props.openSelectInvoker();
    this.setState({modal_post_voidselect:true,modal_post_void:false});
    
  }
 
  cancelSelectModal = () => {
    this.setState({modal_post_voidselect:false});
    
  }
 
  openenterTrans = () => {
    //debugger;
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
        this.setState({enteredTxnNumber:value})
      }
      else{
        document.getElementsByClassName('enterokbtn')[0].style.opacity="0.4";
      }
  }
}

function mapStateToProps({ header, home, customerSearch, login, resumered }) {
  return { header , home, customerSearch, login, resumered}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSelectInvoker: postVoidTransactionList,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
