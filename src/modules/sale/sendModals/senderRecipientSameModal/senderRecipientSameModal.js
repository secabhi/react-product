// Dependecies
import React from 'react'

// UI components
import Modal2 from '../../../../UI/modal-two/modal-two';

// Images
import confirmEmailIcon from '../../../../resources/images/Confirm_Email.svg';

// Styles
import '../sendModal.css';


export default (props) => {

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
          <img className='modal-icon' alt='email confirm icon' src={confirmEmailIcon} />
          <div style={{ fontSize: '38px', textAlign: 'center' }}>
            <div>Are Sender and Recipient</div>
            <div>the same?</div>
          </div>
          <div className='btn-yes-no-wrapper'>
            <div className='btn-no'
              onClick={() => {
                props.goToSendPage('frequentShippedAddress',false);
                props.history.push('/send'); 
              }}
            >
              NO
            </div>
            <div className='btn-yes'
              onClick={() => {
                props.goToSendPage('receiverForm',true);
                props.history.push('/send');
              }}
            >
              YES
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
          width: '890px',
          height: '1200px',
          top: '372px',
          left: '95px',
          background: 'white',
          boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
        }}
        overlay
      >
        <div className='send-flex-3 sff-size'>
          <img className='modal-icon-sff' alt='email confirm icon' src={confirmEmailIcon} />
          <div style={{ fontSize: '60px', textAlign: 'center' }}>
            <div>Are Sender and Recipient</div>
            <div>the same?</div>
          </div>
          <div className='btn-yes-no-wrapper-sff'>
            <div className='btn-no-sff'
              onClick={() => {
                props.goToSendPage('frequentShippedAddress');
                props.history.push('/send'); 
              }}
            >
              NO
            </div>
            <div className='btn-yes-sff'
              onClick={() => {
                props.goToSendPage('customerForm');
                props.history.push('/send');
              }}
            >
              YES
            </div>
          </div>
        </div>
      </Modal2>
    )
  }

  if (window.innerWidth < 1900) {
    return <SmallFormFactor />
  } else {
    return (
      <LargeFormFactor />
    )
  }
}    