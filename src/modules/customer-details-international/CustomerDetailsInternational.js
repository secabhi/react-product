import React, { Component } from 'react'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* import View Component */
import {CustomerDetailsIntView} from './View/CustomerDetailsIntView';

/* import Actions from testAction*/
import { testAction } from './CustomerDetailsIntAction';


class CustomerDetailsInternational extends Component {

  constructor(props)
  {
    super(props);
    this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;
    this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
    this.totalpoints = parseInt(this.inCircleInfo.total_points);
    this.pointsToNextLvl = this.nextLvl - this.totalpoints;
    this.state = {
      
    }
  }

  navigateBack=()=> {
    this.props.history.push('/');
  }

  navigateToUpdateCustomer = () => {
    this.props.history.push('/update-customerinternational');
  }

  render() {

    return (
     <CustomerDetailsIntView 
      history = {this.props.history}
      match = {this.props.match}
      customerDetails = {this.props.customerDetails}
      navigateBack = {this.navigateBack}
      navigateToUpdateCustomer = {this.navigateToUpdateCustomer}
      inCircleInfo = {this.inCircleInfo}
      currentlvl = {this.currentlvl}
      nextLvl = {this.nextLvl}
      pointsToNextLvl = {this.pointsToNextLvl}

     />
    );
  }

 
}

function mapStateToProps({ customerDetailsInternational }) {
  return { customerDetailsInternational }
}

function mapDispatchToProps(dispatch) {
  return { dispatch, testActionInvoker: () => dispatch(testAction()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsInternational);