import React, { Component } from 'react'

import './customer-details-international.css';

import backArrowWhite from '../../../resources/images/Back_White.svg';
import incircleLevel3White from '../../../resources/images/Incirle_Leve3_White.png'
import productSearchWhite from '../../../resources/images/Product_Search_White.svg'
import proceedToSaleWhite from '../../../resources/images/Sale_White_Filled.svg'

import edit_profile from '../../../resources/images/Edit_Profile.svg';

import Header from '../../common/header/header'
import Tabheader from '../../common/tabheaders/cust-det-tabheader'
import Footer from '../../common/footer/footer'


import Slider from "react-slick";

import "../../common/subheaders/incircle-subheader.css"
import '../../../resources/stylesheets/slick.min.css';
import '../../../resources/stylesheets/slick-theme.min.css';
var incircle_purple_large_bttn = require("../../../resources/images/Incircle_Level_purple_large_bttn.svg");


export class CustomerDetailsIntView extends Component {

  constructor(props)
  {
    super(props);   
    this.state = {
      
    }
  }

 

  render() {
    var carouselSettingsRecommendedProducts = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true
    };
    var carouselSettingsPurchaseHistory = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      vertical: true,
      verticalScrolling: true
    };
    return (
      <div className="cusdet-container-int">
        <div className="cusdet-header-int">
          <Header history={this.props.history}></Header>
        </div>
        <div className="cusdet-sub-header">
          <div className="back-button" onClick={() => this.props.navigateBack}>
            <img
              className="back-arrow"
              src={backArrowWhite}
              alt="navigate-back"
            />
          </div>
          <div className="divider" />
          <div className="customer-name">
            <div className="customer-name-label">{this.props.inCircleInfo.salutation}. {this.props.inCircleInfo.firstname} {this.props.inCircleInfo.lastname}</div>
          </div>
          <div className="divider" />
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
          </div>
          <div className="spacer-div" />
          <div className="product-search">
            <img
              className="product-search-icon"
              src={productSearchWhite}
              alt="product-search-icon"
            />
            <div className="product-search-label">Product Search</div>
          </div>
          <div className="proceed-to-sale">
            <img
              className="proceed-to-sale-icon"
              src={proceedToSaleWhite}
              alt="proceed-to-sale-icon"
            />
            <div className="proceed-to-sale-label">Proceed to Sale</div>
          </div>
        </div>
        <div className="cusdet-tab-area-int">
        <Tabheader history={this.props.history}></Tabheader>
            <div className="cusdet-tab-content-int">
              <div className="content-left-part-int">
                  <div className="content-left-upper-int">
                      <div className="content-row1-int">
                        <div className="addressline1-txt-int">
                          <div className="custdet-detail-label-int">Address Line 1</div>
                          <div className="custdet-detail-value-int">230 Stafford Street</div>
                        </div>
                        <div className="addressline2-txt-int">
                        <div className="custdet-detail-label-int">Address Line 2</div>
                          <div className="custdet-detail-value-int">Unit B</div>
                        </div>
                        <div className="mobilephone-txt-int">
                          <div className="custdet-detail-label-int">Mobile Phone</div>                            
                          <div className="custdet-detail-value-int">+44 1595 000000</div>
                        </div>
                          <div className="edit-section-int"> 
                            <button className="editCls-int">
                              <img src={edit_profile} className="editicon-int" onClick={() =>this.props.navigateToUpdateCustomer()}/>
                              <span className="edit-profile-button-label-int" onClick={() => this.props.navigateToUpdateCustomer()}>EDIT PROFILE</span>
                            </button>
                          </div>
                      </div>
                      <div className="content-row2-int">
                        <div className="city-txt-int">
                          <div className="custdet-detail-label-int">City</div>
                          <div className="custdet-detail-value-int">London</div>
                        </div>
                        <div className="province-txt-int">
                          <div className="custdet-detail-label-int">Province</div>
                          <div className="custdet-detail-value-int">Greater London</div>
                        </div>
                       
                        <div className="phone-txt-int">
                          <div className="custdet-detail-label-int">Other Phone</div>
                          <div className="custdet-detail-value-int">+44 1862 000000</div>
                        </div>
                        <div className="spacer-section-int"></div>
                      </div>
                      <div className="content-row3-int">
                      <div className="email-txt-int">
                          <div className="custdet-detail-label-int">Country</div>
                          <div className="custdet-detail-value-int">United Kingdom</div>
                        </div>
                        <div className="email-txt-int">
                          <div className="custdet-detail-label-int">Postal Code</div>
                          <div className="custdet-detail-value-int">WF13 1RT</div>
                        </div>
                        <div className="email-txt-int">
                          <div className="custdet-detail-label-int">Email Address</div>
                          <div className="custdet-detail-value-int">abcd123@gmail.com</div>
                        </div>
                        <div className="spacer-section-int"></div>
                      </div>  
                  </div>
                  <div className="content-left-lower-int">
                    <div className="recommended-prod-carousel-header-int">
                      Recommendations for Barbara</div>
                    <div className="recommended-prod-carousel-int">
                      <Slider {...carouselSettingsRecommendedProducts}>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                        <div className="carouselSlide-int">
                          <h2>Product</h2>
                        </div>
                      </Slider>
                    </div>
                  </div>
                  <div className="content-left-last-shopped-section-int">
                    <span className="last-shopped-label-int">Last Shopped:</span>   With me:  3/3/2018&nbsp;&nbsp;|&nbsp;&nbsp;At Nieman Marcus:  3/4/2018  
                  </div>

              </div>
              <div className="content-right-part-int">
                <div className="purchase-history-int">
                  <div className="purchase-history-carousel-header-int">
                    Purchase History 
                  </div>
                  <div className="purchase-history-carousel-int">
                    <Slider {...carouselSettingsPurchaseHistory}>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                      <div className="carouselSlide-int">
                        <h2>Product</h2>
                      </div>
                    </Slider>
                  </div>
                </div>                
              </div>            
          </div>
        </div>
        <div className="cusdet-footer-int">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
