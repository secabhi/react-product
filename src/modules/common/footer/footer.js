/* Importing the required libraries and plugins*/

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing the local files*/
import { testAction,getPEDBatteryStatus } from './actions';
import FooterView from './View/FooterView.js'

/* Importing the resource images and icons*/
import { getTransactionId } from '../../home/HomeSelector';
import {json2xml} from  '../../common/helpers/helpers';


class Footer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      transactionId: '',
    }
    this.getStatusRequestJson = require('../../../resources/aurus/GetStatus.json');
  }

  componentDidMount() {
    //setTimeout(this.getPedBatteryStatus,10000);
    //console.log('this.props.transactionId: ' + this.props.transactionId)
    if(this.props.transactionId != "" && this.props.transactionId != null && this.props.transactionId != undefined)
      this.setState({ transactionId: this.props.transactionId });
  }

  componentWillReceiveProps = nextProps => {

    console.log('nextProps.transactionId: ' + nextProps.transactionId)
    this.setState({ transactionId: nextProps.transactionId })
  }

  getTransactioText = (hide) => {
  if(hide) {
      return (' ');
    }
    else {
      return (`/${this.state.transactionId}`);
    }
  }


  getPedBatteryStatus = () => {
    console.log(">>>>>>getPedBatteryStatus()");
    this.props.getPEDBatteryStatusActionInvoker(json2xml(this.getStatusRequestJson));
  }

  render() {
  
    const transactionId = this.state.transactionId ? this.state.transactionId : ''
    return (
      <FooterView getTransactioText = {this.getTransactioText}
      hideTransactionId = { this.props.hideTransactionId }
      transactionId={transactionId}
      />
    );
  }
}

Footer.defaultProps = {
  hideTransactionId: false
};

function mapStateToProps(state) {
  return {
    footer: state.footer,
    transactionId: getTransactionId(state)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      getPEDBatteryStatusActionInvoker : getPEDBatteryStatus
  },dispatch) 
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);