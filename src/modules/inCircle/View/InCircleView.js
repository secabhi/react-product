// Dependencies
import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";

// CSS
import "./Styles/InCircle.css";
import "../../common/subheaders/incircle-subheader.css";

// Components
import Header from "../../common/header/header";
import Tabheader from "../../common/tabheaders/cust-det-tabheader";
import Footer from "../../common/footer/footer";
import {CardPage} from './Components/CardPage';
import {IncirclePage} from './Components/IncirclePage';

// Images
import backArrowWhite from "../../../resources/images/Back_White.svg";
import productSearchWhite from "../../../resources/images/Product_Search_White.svg";
import proceedToSaleWhite from "../../../resources/images/Sale_White_Filled.svg";
import edit_profile from "../../../resources/images/Edit_Profile.svg";
var incircle_purple_large_bttn = require("../../../resources/images/Incircle_Level_purple_large_bttn.svg");

export class InCircleView extends Component {
 
  constructor(props) {
    super(props);
    this.state ={
        
    }
}

  render() {
     return (
      <div className="cusdet-container">
        <div className="cusdet-header">
          <Header history={this.props.history}/>
        </div>
        <div className="cusdet-sub-header">
          <div className="back-button" onClick={this.props.navigateBack}>
            <img className="back-arrow" src={backArrowWhite} alt="navigate-back"/>
          </div>
          <div className="divider"/>
          {/* <div className="customer-name">
            <div className="customer-name-label">{this.props.salutation} {this.props.fname} {this.props.lname}</div>
          </div> */}

          <div className="customer-name">
          <div className="customer-name-label"> {(this.props.customerDetails.firstName != "") ? 
          (this.props.customerDetails.salutation + ((this.props.customerDetails.salutation != "") ? '.' : "")) : ""} {this.props.customerDetails.firstName} {this.props.customerDetails.lastName}
          </div>   
          </div>
          {
            (this.props.currentlvl > '0' ) ? 
          <div className="divider"/> : <div></div>
            }
            {
            (this.props.currentLvl > '0') ?
            <div className="incircle-details">
            <span className="subheader-iconNum">{this.props.currentlvl}</span>
            <img
              className="subheader-circleStatusicon"
              src={incircle_purple_large_bttn}
              alt="profile-tab-icon"/>
            <div className="incircle-description">
              <div className="incircle-description-level">
                CIRCLE {this.props.currentlvl}
              </div>
              <div className="incircle-description-points">
                Points to next point card: {this.props.pointsToNextLvl}
              </div>
            </div>
          </div> : <div></div>
          }

          <div className="spacer-div"/>
          <div className="product-search">
            <img
              className="product-search-icon"
              src={productSearchWhite}
              alt="product-search-icon"/>
            <div className="product-search-label">Product Search</div>
          </div>
          <div className="proceed-to-sale">
            <img
              className="proceed-to-sale-icon"
              src={proceedToSaleWhite}
              alt="proceed-to-sale-icon"/>
            <div className="proceed-to-sale-label">Proceed to Sale</div>
          </div>
        </div>
        <Tabheader history={this.props.history} customerName={this.props.customerDetails.firstName}/>
        <div className="cusdet-tab-area ">
          <CSSTransition
            in={this.props.showcardPage === false}
            timeout={300}
            classNames="fade">
            {this.props.showcardPage === false
              ? <IncirclePage props={this.props}/>
              : <CardPage props={this.props}/>}
          </CSSTransition>
        </div>
        <div className="cusdet-footer">
          <Footer/>
        </div>
      </div>
    );
  }
}
