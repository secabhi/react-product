/* Importing the required libraries and plugins*/

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/* Importing the local files*/


import {testAction} from './HeaderAction';

/* Importing the resource images and icons*/

import {HeaderView} from '../../common/header/View/HeaderView'

class Header extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isSale: this.props.sale,
      isSuspend: false,
    }
  }

  render() {
    const {match, location, history, sale} = this.props

   
    return (
      <HeaderView
      history = {this.props.history}
      openPostVoidModal={this.props.openPostVoidModal}
      navigateToHome = {this.navigateToHome}
      isSale={this.state.isSale}
      isSuspend={this.state.isSuspend}
      suspendTransaction={this.suspendTransaction}
      userPin = {this.props.userPin}/>
    );
  }

  navigateToHome = () => {
    sessionStorage.setItem("loggedIn", "false");
    this
      .props
      .history
      .push('/');

    this.setState({
      isSuspend: false
    })
  }

  suspendTransaction = () => {
    if(this.state.isSuspend === false){
      this.setState({
        isSuspend: true
      })
    }else{
      this.setState({
        isSuspend: false
      })
    }
  }
}

function mapStateToProps(state) {
  return {header: state.header,
          userPin: state.login.userpin}
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    testActionInvoker: () => dispatch(testAction())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);