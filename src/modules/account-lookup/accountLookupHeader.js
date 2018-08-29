import React, { Component } from 'react';
import './accountLookUpHeader.css';

import incirclePurple from "../../resources/images/Incircle_Level_purple_small_bttn.svg";
import incircleLarge from "../../resources/images/Incircle_Level_purple_large_bttn.svg";

export default class AccountLookupHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return (
      <div className="lookup-sub-header">

        <div className="lookup-sub-header-title-flex">
          <div className="lookup-header-title">
            {this.props.pageName}
          </div>
          <div className="lookup-header-left">
            <div className="lookup-cust-title">
              {this.props.firstName+' '+this.props.lastName}
            </div>
            <div className="lookup-divider-line">
            </div>
            <img src={incircleLarge} className='lookup-header-image' />
            <div className="personal_level">{this.props.currentLvl?this.props.currentLvl:''}</div>
            <div>
            <div className="lookup-header-cust-name custom-style">
              <div>{this.props.address1}</div>     
            </div>
            <div className="lookup-header-cust-name"> 
              <div style={{textAlign:'right'}}>{this.props.city} {this.props.state} {this.props.zip}</div>
            </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
};
