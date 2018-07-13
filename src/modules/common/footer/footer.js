/* Importing the required libraries and plugins*/

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing the local files*/
import { testAction } from './actions';
import FooterView from './View/FooterView.js'

/* Importing the resource images and icons*/
import { getTransactionId } from '../../home/HomeSelector';

class Footer extends Component {


  constructor(props)
  {
    super(props);
    this.state = {
      transactionId: '0000',
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <FooterView getTransactioText = {this.getTransactioText}
      hideTransactionId = { this.props.hideTransactionId }
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
  return { dispatch, testActionInvoker: () => dispatch(testAction()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);