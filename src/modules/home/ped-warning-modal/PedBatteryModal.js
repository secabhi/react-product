import React,{Component} from 'react';
import Modal from 'react-responsive-modal';

import modal_icon from '../../../resources/images/Warning_101.svg';
import './PEDBatteryModal.css';


export class PEDBatteryModal extends Component{

    render(){
        return(

            <Modal  open={this.props.pedbatterymodal} onClose={() => {

            }} little showCloseIcon={false}  classNames={{ modal: 'ped-battery-modal-container'}}>
                <div className = "ped-battery-modal"> 
                    <div className = "ped-battery-modal-icon-area">
                        <img src={modal_icon} className = "ped-battery-modal-icon"/>
                    </div>
                    <div className = "ped-battery-modal-msg-area">
                        <div className = "ped-battery-modal-msg">PED battery is less than {this.props.pedbatterythresholdvalue}%.Do you want to continue?</div>
                    </div>
                    <div className = "ped-battery-modal-btn-area">
                        <div className = "ped-battery-modal-no-btn"  onClick = {() => {this.props.exitOnLowPedBattery()}}>
                            <div className = "ped-battery-modal-btn-txt">NO</div>
                        </div>
                        <div className = "ped-battery-modal-yes-btn" onClick = { () => {this.props.continueOnLowPedBattery()}}>
                        <div className = "ped-battery-modal-btn-txt">YES</div>
                        </div>
                    </div>
                </div>
            </Modal>
          
        )
    }

}