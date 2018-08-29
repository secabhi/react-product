// Dependecies
import React from 'react'

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateTracking} from '../emailTrackInfoActions';

// UI components
import Modal2 from '../../../../UI/modal-two/modal-two';

// Images
import confirmEmailIcon from '../../../../resources/images/Confirm_Email.svg';

// Styles
import '../sendModal.css';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';


const emailTracking = (props) => {
    const isCliental = props.customerDetails.cCSNumber;

    const LargeFormFactor = () => {
        return (
            <Modal2 
                style={{
                        width: '725px',
                        height: '575px',
                        top: '313px',
                        left: '596px',
                        background: 'white',
                        boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'

                }} 
                overlay
            >
                 <div className='send-flex-3 lff-size'>
                     <img  className='modal-icon' alt='email confirm icon'  src={confirmEmailIcon} />
                     <div style={{fontSize: '38px'}}> Email tracking information?</div>
                     <div className='btn-yes-no-wrapper'> 
                         <div className='btn-no' onClick={() => {beginUpdateTracking(false);props.openRecipientSender()}}>NO</div>
                         <div 
                            className='btn-yes'
                            onClick={() => {beginUpdateTracking(true); props.openVerifyEmail()}}
                            >YES
                        </div>
                     </div>
                 </div>
             </Modal2>
        )    
    } 

    const SmallFormFactor = () => {
        return (
            <Modal2 
                style={{
                width:'890px',
                height:'1200px',
                top:'372px',
                left:'95px',
                background: 'white',
                boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
                }} 
                overlay
            >
                <div className='send-flex-3 sff-size'>
                    <img  className='modal-icon-sff' alt='email confirm icon'  src={confirmEmailIcon} />
                    <div style={{fontSize: '60px'}}> Email tracking information?</div>
                    <div className='btn-yes-no-wrapper-sff'> 
                        <div className='btn-no-sff'>NO</div>
                        <div className='btn-yes-sff' onClick={() => {beginUpdateTracking(); props.openVerifyEmail()}}>YES</div>
                    </div>
                </div>
            </Modal2>
        )    
    }
    
    const beginUpdateTracking = (toTrack) => {
        if(isCliental) {
            props.updateTracking('CLIENT', toTrack)
        } else {
            props.updateTracking('NON_CLIENT', toTrack)
        }
    }

    if(window.innerWidth < 1900) {
        return<SmallFormFactor />
    } else {
        return (
            <LargeFormFactor />
        )  
    }
}    


const  mapStateToProps = ({customerDetails}) => {
    return { customerDetails }
  }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({updateTracking},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(emailTracking);