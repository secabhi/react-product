import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

/* Importing the local files*/
import RecommendSlide from './recommendSlide/recommendSlide';
import HistorySlide from './historySlide/historySlide';
import Details from './details/details';
import Header from '../../common/header/header';
import Tabheader from '../../common/tabheaders/cust-det-tabheader';
import Footer from '../../common/footer/footer';


import '../../../resources/stylesheets/slick.min.css';
import '../../../resources/stylesheets/slick-theme.min.css';
import "../../common/subheaders/incircle-subheader.css";
import "./customer-details.css";

/* Importing the resource images and icons*/
import backArrowWhite from '../../../resources/images/Back_White.svg';
import productSearchWhite from '../../../resources/images/Product_Search_White.svg';
import proceedToSaleWhite from '../../../resources/images/Sale_White_Filled.svg';
import edit_profile from '../../../resources/images/Edit_Profile.svg';

import incircle_purple_large_bttn from '../../../resources/images/Incircle_Level_purple_large_bttn.svg';

const UpArrow = (props) => {
  const {onClick} = props;
  return (
    <div
      className="up-arrow"
      onClick={onClick}
    >
    </div>
  );
}

const DownArrow = (props) => {
  const {onClick} = props;
  return (
    <div
      className="down-arrow"
      onClick={onClick}
    >
    </div>
  );
}

let carouselSettingsRecommendedProducts = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
};

let carouselSettingsPurchaseHistory = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  vertical: true,
  arrows: true,
  prevArrow: <UpArrow />,
  nextArrow: <DownArrow />
};

const PurchaseSlider = (props) => {
  let slides = [];
  if(props.purchases) {
    slides = props.purchases.map((product, index) => {
      return ( 
        <HistorySlide 
          key={product.prodDesc + index}
          productImageURL={product.productImageURL} 
          index={index}
          prodDesc={product.prodDesc}
          return={product.return}
          mySale={product.mySale} 
          displayModal={props.displayModal}
        />
      )
    })
    return (
      <Slider {...carouselSettingsPurchaseHistory} >
        {slides} 
      </Slider>  
    )
  }
  return null;
}

const RecommendationSlider = (props) => {
  let slides= [];
  if(props.recommendations) {
    slides = props.recommendations.map((product, index) => {
     return (
       <RecommendSlide 
          key={product.url + index}
          index={index}
          url={product.url}
          vendor={product.vendor}
          proddesc={product.proddesc} 
          displayModal={props.displayModal}
        />   
     )
    })
    return (
      <Slider {...carouselSettingsRecommendedProducts} >
        {slides}
      </Slider>
    )    
  }
  return null;
}

export class CustomerDetailsView extends Component {
  constructor(props) {
     super(props);
    
  }



  render() {
    console.log('Render-this.props-view',this.props);
    
    return (
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
          <div className="customer-name">
          <div className="customer-name-label"> {(this.props.profileData.cust_dom_fname != "") ? (this.props.profileData.cust_dom_salutation + ((this.props.profileData.cust_dom_salutation != "") ? '.' : "")) : ""} {this.props.profileData.cust_dom_fname} {this.props.profileData.cust_dom_lname}</div>   </div>
          
          {
            (this.props.currentlvl != '0') ?
          <div className="divider" /> : <div></div>
          }
          {
            (this.props.currentlvl != '0') ?
          <div className="incircle-details">
            <span className="subheader-iconNum">{this.props.currentlvl}</span>
            <img
              className="subheader-circleStatusicon"
              src={incircle_purple_large_bttn}
              alt="profile-tab-icon"
            />
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
          <div className="spacer-div" />
          <div className="product-search">
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
            <Tabheader history={this.props.history} customerName={this.props.profileData.cust_dom_fname}></Tabheader>
            <div className="cusdet-tab-content">
              <div className="content-left-part">
                <Details profileData={this.props.profileData} navigateToViewEditCustomer = {this.props.navigateToUpdateCustomer}/> 
                <div className="content-left-lower">
                  <div className="recommended-prod-carousel-header">
                    Recommendations for {this.props.toCamelCase(this.props.profileData.cust_dom_fname)}
                    <a className='see-all' href="">See All</a>
                  </div>
                  <div className="recommended-prod-carousel">
                     <RecommendationSlider recommendations={this.props.customerDetails.test} displayModal={(index) => this.props.displayRecommendsModal(index)} />
                  </div>
                  </div>
                  <div className="content-left-last-shopped-section">
                    <span className="last-shopped-label">Last Shopped:</span>   With me:  {this.props.salesSummaryDetails.lastDateShoppedWithMe }&nbsp;&nbsp;|&nbsp;&nbsp;At NMG:  {this.props.salesSummaryDetails.lastDateShoppedAtNMG}
                  </div>
              </div>
              <div className="content-right-part">
                <div className="purchase-history">
                  <div className="purchase-history-carousel-header">
                    <div>Purchase History</div>
                    <a href="">See All</a>
                  </div>
                  <div className="purchase-history-carousel">
                    <PurchaseSlider purchases={this.props.customerDetails.purchases} displayModal={(index) => this.props.displayHistoryModal(index)} />
                  </div>
                </div>
              </div>
          </div>
        </div>
       <Footer />
      </div>
    );
  }



}


