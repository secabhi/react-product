import React, { Component } from 'react';
import './sale-header.css';
import '../common/subheaders/incircle-subheader.css'
import incircle_purple_large_bttn from '../../resources/images/Incircle_Level_purple_large_bttn.svg';
import customerSearch from '../../../src/resources/images/Search_Customer_White.svg';

export default class SaleHeader extends Component {
    
    constructor(props) {
        super(props);     

        this.state = {}
    }

    toCamelCase(str) {
      return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
          return match.charAt(match.length-1).toUpperCase();
      });
    }

    navigateToCustomerSearch = () => {
      this.props.history.push("/customer-search");
  };
    
    render() {
      
      console.log("presaleHeader",this.props)
    return (
      [
      <div className="sale-sub-header">
        
        <div className="sale-sub-header-title-flex">
          <div className="sale-header-title">
            {!!this.props.showPreSale===false ? this.props.pageName :"Presale"}
          </div>
        </div>

        {!this.props.firstName ? 
          (<div className="sale-header-customersearch-icon-details" onClick={()=> {this.navigateToCustomerSearch()}}>
            <img className="sale-customersearch-icon" src ={customerSearch} />          
            <div className="sale-customersearch-icon-label-lff"> Search Customer </div>
          </div>) :
          (<div className="sale-customer-name">
              <div className="sale-customer-name-label">
                {this.toCamelCase(this.props.salutation)} {this.toCamelCase(this.props.firstName)} {this.toCamelCase(this.props.lastName)}
              </div>
              <div className={(this.props.firstName != "") ? "divider" : "subheader-circleStatusicon-display"} />
              {
               (this.props.currentLvl != 0) ?
             (<div className="incircle-details">
                <span className={(this.props.firstName != "") ? "subheader-iconNum" : "subheader-circleStatusicon-display"} >{this.props.currentLvl}</span>
                <img
                  className={(this.props.firstName != "") ? "subheader-circleStatusicon" : "subheader-circleStatusicon-display"}
                  src={incircle_purple_large_bttn}
                  alt="profile-tab-icon"/>
              </div>): <div style={{marginRight: '28px'}}></div>
             }
              <div className="sale-customer-address">
                <div>{this.props.address1}</div>
                <div style={{textAlign:'left'}}>{this.props.city} {this.props.state} {this.props.zip}</div>
              </div>
          </div>)
        }
      </div>,

      <div className="sale-sub-header-small">
        <div className="sale-header-title">{this.props.pageName}</div>
        <div className="sale-cust-details">
          <div className="sale-customer-name">
              <div className="sale-customer-name-label">{this.props.salutation} {this.props.firstName} {this.props.lastName}</div>
          </div>
          <div className="sale-customer-address">
                <div>{this.props.address1}</div>
                <div style={{textAlign:'right'}}>{this.props.city} {this.props.state} {this.props.zip}</div>
                
          </div>
        </div>
          <div className={(this.props.firstName != "") ? "incircle-details" : "divider"}>
            <span className="subheader-iconNum">{this.props.currentLvl}</span>
            <img
              className={(this.props.firstName != "") ? "subheader-circleStatusicon" : "divider"}
              src={incircle_purple_large_bttn}
              alt="profile-tab-icon"/>
          </div>
      </div>
      ]
    )
  }
};
