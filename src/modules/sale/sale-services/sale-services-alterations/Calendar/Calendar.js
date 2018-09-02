//Dependencies
import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

//UI
import Modal2 from '../../../../../UI/modal-two/modal-two';
import Modal from 'react-responsive-modal';

import moment from 'moment';

//style
import './DayPicker.css'
import './Calendar.css'

export default class Calendar extends Component {
 state = {selectedDays: undefined}
  
  render() {
    const today = new Date();
    return (
      <Modal2 overlay style={{
        width: '500px',
        height: '650px',
        margin: '0 auto',
        top: (window.innerWidth > 1900) ? '250px' : '250px',
        left: (window.innerWidth > 1900) ? '0' : '-50px',
        background: 'white',
        boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'

      }}>
        <div className='calendar-container'>
          <div className='calendar-header'>Pick a date</div>
          <DayPicker 
            navbarElement={<Navbar />}
            selectedDays={this.state.selectedDays}
            onDayClick={this.handleDayClick}
            modifiersStyles={modifiersStyles}
            disabledDays={{ before: today }}
          />
          <div className='calendar-footer'>
            <div className='calendar-btn-container'>
              <div className='calendar-btn-cancel' onClick={() => this.handleOnCancel()}>CANCEL</div>
              <div className='calendar-btn-ok' onClick={() => this.props.close()}>OK</div>
            </div>
          </div>
        </div>
      </Modal2>
    )
  }

//   formatToMMDDYYYY = (stringDate) => {
//     //date from calendar comes in with month at m/DD/YYYY
//     // console.log('TYPE OF string date', typeof stringDate)
//     console.log("THIS IS THE DATE!!!!!!!!!",stringDate.slice(0,1))
//     console.log("THIS IS THE DATE!!!!!!!!!",stringDate.slice(2,4))
//     console.log("THIS IS THE DATE!!!!!!!!!",stringDate.slice(5,9))
//    if(stringDate.split('/')[0].length < 2) {
//     return '0'+stringDate;
//    } else {
//        return stringDate;
//    }
// }

  handleDayClick = (day, modifiers = {}) => {

    if(modifiers.disabled){
      //unselect if already selected
      this.setState({selectedDays: undefined})
      this.props.getSelectedDay(undefined)
    } else {
      this.setState({selectedDays:modifiers.selected ? undefined : day})
      this.props.getSelectedDay(day.toLocaleDateString());
    }
  }

  handleOnCancel = () => {
    this.setState({selectedDays: undefined});
    this.props.getSelectedDay(undefined);
    this.props.close();
  }

}//end of class



const Navbar = ({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];
  const styleLeft = {
    float: 'left',
    width: '50px',
    height: '50px'
  };
  const styleRight = {
    float: 'right',
    width: '50px',
    height: '50px'
  };
  return (
    <div className={className}>
      <button style={styleLeft} onClick={() => onPreviousClick()}>
        ← {prev.slice(0, 3)}
      </button>
      <button style={styleRight} onClick={() => onNextClick()}>
        → {next.slice(0, 3)}
      </button>
    </div>
  );
}


const modifiersStyles = {
  selected: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4b2b6f'
  }
};