import React, { Component } from 'react';
import { connect } from 'react-redux';

//import components
import Header from '../../common/header/header';
import Tabheader from '../../common/tabheaders/cust-det-tabheader';
import Footer from '../../common/footer/footer';
import {ReminderList} from './reminderList';
//importing styles
import './remindersView.css'

//importing images
import backArrowWhite from '../../../resources/images/Back_White.svg';
import productSearchWhite from '../../../resources/images/Product_Search_White.svg';
import proceedToSaleWhite from '../../../resources/images/Sale_White_Filled.svg';
import incircle_purple_large_bttn from '../../../resources/images/Incircle_Level_purple_large_bttn.svg';

export class RemindersView extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
           
        };

    
    }

    componentWillMount(){
        

    }

    render() {

        return(
            <div className="cusdet-container">
            <div className="cusdet-header">
              <Header history={this.props.history}></Header>
            </div>
            <div className="cusdet-sub-header">
              <div className="back-button" onClick={this.props.navigateBack} >
                <img
                  className="back-arrow"
                  src={backArrowWhite}
                  alt="navigate-back"
                />
              </div>
              <div className="divider" />
              {/* <div className="customer-name">
              <div className="customer-name-label"> 
              {(this.props.profileData.cust_dom_fname != "") ? (this.props.profileData.cust_dom_salutation + ((this.props.profileData.cust_dom_salutation != "") ? '.' : "")) : ""} {this.props.profileData.cust_dom_fname} {this.props.profileData.cust_dom_lname}
              </div>   </div> */}

              <div className="customer-name">
             <div className="customer-name-label"> {(this.props.customerDetails.firstName != "") ? 
             (this.props.customerDetails.salutation + ((this.props.customerDetails.salutation != "") ? '.' : "")) : ""} {this.props.customerDetails.firstName} {this.props.customerDetails.lastName}</div>   </div>
              
              {
                (this.props.profileData.currentLvl > '0') ?
              <div className="divider" /> : <div></div>
              }
              {
                (this.props.profileData.currentLvl > '0') ?
              <div className="incircle-details">
                <span className="subheader-iconNum">{this.props.profileData.currentLvl}</span>
                <img
                  className="subheader-circleStatusicon"
                  src={incircle_purple_large_bttn}
                  alt="profile-tab-icon"
                />
                <div className="incircle-description">
                  <div className="incircle-description-level">
                    CIRCLE {this.props.profileData.currentLvl}
                  </div>
                  <div className="incircle-description-points">
                    Points to next point card: {this.props.profileData.pointsToNextLvl}
                  </div>
                </div>
                </div> : <div></div>
              }
              <div className="spacer-div" />
              <div className="product-search" onClick={this.props.navigateToProductSearch}>
                <img
                  className="product-search-icon"
                  src={productSearchWhite}
                  alt="product-search-icon"
                />
                <div className="product-search-label">Product Search</div>
              </div>
              <div className="proceed-to-sale" onClick={this.props.navigateToSale}>
                <img
                  className="proceed-to-sale-icon"
                  src={proceedToSaleWhite}
                  alt="proceed-to-sale-icon"
                />
                <div className="proceed-to-sale-label" >Proceed to Sale</div>
              </div>
            </div>
            <div className="cusdet-tab-area">
                <Tabheader history={this.props.history} customerName={this.props.customerDetails.firstName} reminderCount={this.props.remindersCount}></Tabheader>
                <div className="cusdet-tab-content">
                 <ReminderList reminderList ={this.props.reminderList} />

              </div>
            </div>
           <Footer />
          </div>
        );
        
    }


}



