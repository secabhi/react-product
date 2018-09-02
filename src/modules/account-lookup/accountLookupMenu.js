// Dependecies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import {each} from 'underscore';

// Styles
import './accountLookUpHeader.css';


class AccountLookupMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
     };
  }

  render() {
    

    return (
      [
        <div className={this.props.cardsAvailable?"lookup-menu-style top-space":"lookup-menu-style top-space disabled-transin"} onClick={this.props.cardsAvailable?this.props.openconfirmdetails:null}>Use in Trans</div>,
        <div className="lookup-menu-style" onClick={this.props.nextInquiry}>Next Inquiry</div>,
        !this.props.isThirdParty?
          <div className="lookup-menu-style">Print</div>
        :'',
        <div className="lookup-menu-style"  onClick={this.props.exitLookup}>Exit Account Lookup</div>
        
      ]
    )
  }
};

function mapStateToProps(state) {
  //console.log('@@@@@@@@@  Account Lookup **********', state)
  return {
      cards:state.Cards,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
     
    }, dispatch)
  }
export default connect(mapStateToProps,mapDispatchToProps)(AccountLookupMenu)
