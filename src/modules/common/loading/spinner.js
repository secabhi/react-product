import React, { Component } from 'react';
import { connect } from 'react-redux';
import './spinner.css';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }  
  render() {
    const { startSpinner } = this.props.spinner;
    const classes = startSpinner ? 'loading' : '';
    const classesChild = startSpinner ? 'loader' : '';
    const classesText = startSpinner ? 'loaderText' : '';
    return (<div className={classes}><div className={classesChild}></div><div className={classesText}>Processing...</div></div>);
  }  
}

function mapStateToProps({ spinner }) {
   return { spinner }
}

function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);