// Dependecies
import React, { Component } from 'react'
import { connect } from 'react-redux';

// UI components
import Modal2 from '../../../../UI/modal-two/modal-two';

//helper
import { formatCsrName } from '../../../common/helpers/helpers';
import { isEmailAddress } from '../../../common/helpers/helpers';

// Images
import confirmEmailIcon from '../../../../resources/images/Confirm_Email.svg';

// Styles
import '../sendModal.css';


class VerifyEmailModal extends Component {
  constructor(props){
    super(props)
    this.email='';
    this.customer = this.props.customerInfo.customer;
    this.isCliental = Object.keys(this.customer).length > 0;
    if(this.isCliental) {
      if(this.customer.emails[0]) {
        this.email = this.customer.emails[0];
      }
    }
    this.state = { email: this.email, Lname: '', Fname: ''};
    this.isSFF = window.innerWidth < 1900;
  }

  validateForm = () => {
    //validation only needed if not cliental
    if(!this.isCliental) {
     if(isEmailAddress(this.state.email) && this.state.Lname && this.state.Fname) {
        return true
      }
      return false;
    }
    return  true;
  }

  render() {
    if(this.isSFF) {
      return <this.SmallFormFactor />
    }
    return <this.LargeFormFactor />
  } 
 
  onInputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

 ClientalContent = () => {
   alert(this.state.email);
    return (
      <div style={{minWidth: '95%', minHeight: '70px'}}>
        <div className={'send-modal-label show-label'}  style={this.isSFF ? {fontSize: '48px', marginLeft: '45px'} : {fontSize: '24px', marginLeft: '45px'}} >Email ID</div>
        <input
          className={this.isSFF ? 'send-modal-input-field-sff' : 'send-modal-input-field'}
          id='email' style={this.isSFF ? {marginTop: '60px', marginLeft: '45px'} : { marginTop: '8px', marginBottom: '25px', marginLeft: '45px' }}
          value={this.state.email}
          type="text"
          placeholder={this.state.email ? this.state.email : 'Enter Email ID'}
          onChange={(e) => this.onInputChange(e)}
        />
      </div>
    )
  }

  NonClientalContent = () => {
    return (
      <div style={this.isSFF ? {minWidth: '95%', minHeight: '504px'} : {minWidth: '95%', minHeight: '280px'}}>
        <div className='input-fields' style={{marginLeft: '50px'}} >
          
          <div className={this.state.Lname ? 'send-modal-label show-label' : 'send-modal-label hide-label'} style={this.isSFF ? {fontSize: '40px'} : {fontSize: '24px'}} >Last Name</div>
          <input
            className={this.isSFF ? 'send-modal-input-field-sff' : 'send-modal-input-field'}
            id='Lname' style={this.isSFF ? {marginBottom: '50px'} : { marginTop: "8px", marginBottom: "25px" }}
            value={this.state.Lname}
            type="text"
            placeholder= 'Enter Last Name'
            onChange={(e) => this.onInputChange(e)}
          />

          <div className={this.state.Fname ? 'send-modal-label show-label' : 'modal-label hide-label'} style={this.isSFF ? {fontSize: '40px'} : {fontSize: '24px'}} >First Name</div>
          <input
           className={this.isSFF ? 'send-modal-input-field-sff' : 'send-modal-input-field'}
            id='Fname' style={this.isSFF ? {marginBottom: '50px'} : { marginTop: "8px", marginBottom: "25px" }}
            value={this.state.Fname}
            type="text"
            placeholder= 'Enter First Name'
            onChange={(e) => this.onInputChange(e)}
          />

          <div className={this.state.email ? 'send-modal-label show-label' : 'send-modal-label hide-label'} style={this.isSFF ? {fontSize: '40px'} : {fontSize: '24px'}} >Email ID</div>
          <input
            className={this.isSFF ? 'send-modal-input-field-sff' : 'send-modal-input-field'}
            id='email' style={this.isSFF ? {marginBottom: '50px'} : { marginTop: "8px", marginBottom: "25px" }}
            value={this.state.email}
            type="text"
            placeholder= 'Enter Email ID'
            onChange={(e) => this.onInputChange(e)}
          />
        </div>
      </div>
    )
  }

  LargeFormFactor = () => {
    console.log('this.customer', Object.keys(this.customer).length > 0);
    return (
      <Modal2 style={this.isCliental ? 
          {
            width: '725px',
            height: '575px',
            top: '313px',
            left: '596px',
            background: 'white',
            boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
          }
        :
          {
            width: '725px',
            height: '800px',
            top: '184px',
            left: '596px',
            background: 'white',
            boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
          }}
        overlay
      >
        <div className='send-flex-3 lff-size' style={this.isCliental ? {height: '575px'} : {height: '800px'}}>
          <img className='modal-icon' style={{marginTop: '50px'}} alt='email confirm icon' src={confirmEmailIcon} />
          <div style={{ fontSize: '38px', marginTop: '15px', fontWeight: '500' }}>{this.isCliental ? formatCsrName(this.customer.names[0]) : 'Customer Email'}</div>
          {this.isCliental ? <this.ClientalContent /> : <this.NonClientalContent />}
          <div className='btn-yes-no-wrapper' style={{marginBottom: '30px'}}>
            <div className='btn-no' onClick={() => this.props.close()} >NO</div>
            <div
              className={this.validateForm() ? 'btn-yes' : 'btn-yes btn-disable'}
              onClick={() => {this.props.open_recipient_sender()}}
            >YES
            </div>
          </div>
        </div>
      </Modal2>
    )
  }

  SmallFormFactor = () => {
    console.log('this.customer', Object.keys(this.customer).length > 0);
    return (
      <Modal2 style={this.isCliental ? 
          {
            width: '890px',
            height: '1200px',
            top: '372px',
            left: '95px',
            background: 'white',
            boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
          }
        :
          {
                width:'890px',
                height:'1528px',
                top:'223px',
                left:'95px',
                background: 'white',
                boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
          }}
        overlay
        >
        <div className='send-flex-3 sff-size' style={this.isCliental ? {height: '1198px'} : {height: '1526px'}}>
          <img className='modal-icon-sff' alt='email confirm icon' src={confirmEmailIcon} />
          <div style={{ fontSize: '60px', marginTop: '15px', fontWeight: '500' }}>{this.isCliental ? formatCsrName(this.customer.names[0]) : 'Customer Email'}</div>
          {this.isCliental ? <this.ClientalContent /> : <this.NonClientalContent />}
          <div className='btn-yes-no-wrapper-sff'>
            <div className='btn-no-sff' onClick={() => this.props.close()}>NO</div>
            <div
              className={this.validateForm() ? 'btn-yes-sff' : 'btn-yes-sff btn-disable'}
              onClick={() => {this.props.open_recipient_sender()}}
            >YES
            </div>
          </div>
        </div>
      </Modal2>
    )
  }
}

export default VerifyEmailModal;

