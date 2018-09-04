/* Importing the required libraries and plugins*/

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import './View/Styles/footer.css';

import clock from '../../../resources/images/Clock_White.svg';


export default class FooterDateTime extends Component{


constructor(props)
  {
    super(props);
    this.state = {
      date: "",
      time: moment(Date.now()).local().format('hh:mm a'),
    }
  
  }

  componentDidMount(){
    var initialDate = new Date();

    this.timerInterval = setInterval(
      () => this.setTime(),
      1000);

    let currentDate = moment(initialDate,'YYYY-MM-DD').format('MM-DD-YYYY');

    this.setState({date: currentDate});
  }

  componentWillUnmount(){
    clearInterval(this.timerInterval);
    console.log("clearing interval");
  }

  setTime(){
    
    this.setState({ 
      time : moment(Date.now()).local().format('hh:mm a')
    })

  }

  render(){
      
    return(
        <div>
        {
            (window.innerWidth > 1900 ) ? 
            (
            <div className="timersection">
                <img src={clock} className="footer-clock" alt="clock-icon"/>
                <label className="footer-date-value">{this.state.date}</label>
                <label className="footer-time-value">{this.state.time}</label>
                
            </div>
            ) :
            (null)
        }
        </div>
    );
  }


}