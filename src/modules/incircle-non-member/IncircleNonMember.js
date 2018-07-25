import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import backArrowWhite from "../../resources/images/Back_White.svg";
import incircleLevel3White from "../../resources/images/Incirle_Leve3_White.png";
import productSearchWhite from "../../resources/images/Product_Search_White.svg";
import proceedToSaleWhite from "../../resources/images/Sale_White_Filled.svg";
import incirclePurple from "../../resources/images/Incircle_Level_purple_small_bttn.svg";
import incircleLarge from "../../resources/images/Incircle_Level_purple_large_bttn.svg";

import Header from "../common/header/header";
import Tabheader from "../common/tabheaders/cust-det-tabheader";
import Footer from "../common/footer/footer";

import "./incircleNonMember.css";
import "../common/subheaders/incircle-subheader.css"
import "../../resources/stylesheets/slick.min.css";
import "../../resources/stylesheets/slick-theme.min.css";

import { goToSalesPage } from '../sale/SaleAction.js';

var incircle_purple_large_bttn = require("../../resources/images/Incircle_Level_purple_large_bttn.svg");

class IncircleNonMember extends Component {
  configFile = require("../../resources/stubs/incircleConfig.json");

  constructor(props) {
    super(props);
    this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;
    this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
    this.totalpoints = parseInt(this.inCircleInfo.total_points);
    this.pointsToNextLvl = this.nextLvl - this.totalpoints;
    var profile = this.props.profileData;
    if (profile && JSON.stringify(profile) != "{}") {
      //States
      this.state = {
        cSelected: [],
        data: this.configFile.data,
        isHidden: true,
        incircleImage: incirclePurple,
        cssId: profile.css_id,
        salutation: (profile.names && profile.names.length > 0 && profile.names[0].salutation !== '') ? profile.names[0].salutation : '',
        fname: (profile.names && profile.names.length > 0) ? profile.names[0].firstName : '',
        lname: (profile.names && profile.names.length > 0) ? profile.names[0].lastName : '',
        address1: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 0) ? profile.physicalAddresses[0].addressLines[0] : '',
        address2: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 1) ? profile.physicalAddresses[0].addressLines[1] : '',
        city: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].cityName : '',
        state: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '',
        zip: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '',
        email: (profile.emailAddresses && profile.emailAddresses.length > 0) ? profile.emailAddresses[0].id : '',
        mobile: (profile.phoneNumbers && profile.phoneNumbers.length > 0) ? profile.phoneNumbers[0].rawValue : '',
        otherMobile: (profile.phoneNumbers && profile.phoneNumbers.length > 1) ? profile.phoneNumbers[1].rawValue : '',

     
      };
    }
    else {
      this.state = {
        cSelected: [],
        data: this.configFile.data,
        isHidden: true,
        incircleImage: incirclePurple,
        cssId: undefined,
        salutation: '',
        fname: '',
        lname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        mobile:'',
        otherMobile:'',
     
      };

    }
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  onRadioBtnClick(e, id, cSelected, aSelected, d1, d2, d3) {
    this.setState({ cSelected, aSelected, d1, d2, d3 });
    e.preventDefault();
    const activeName = id;
    console.log("activeName =" + activeName);
    this.setState({ activeName });
  }

  navigateToSale = () => {
    this.props.goToSalesPage(false, {
      salutation: this.state.salutation,
      firstname: this.state.fname,
      lastname: this.state.lname,
      address1: this.state.address1,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip ,
      address2: this.state.address2,
      email: this.state.email,
      mobile: this.state.mobile,
      otherMobile: this.state.otherMobile,
    });
    this.props.history.push('/sale');
  }
  /*Navigate back home*/
  navigateBack = () => {
    //this.props.history.push('/');
    this.props.history.push('/customer-search'); 
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
      <div className="cusdet-container">
        <div className="cusdet-header">
          <Header history={this.props.history} />
        </div>
        <div className="cusdet-sub-header">
          <div className="back-button" onClick={this.navigateBack} >
            <img
              className="back-arrow"
              src={backArrowWhite}
              alt="navigate-back"
            />
          </div>
          <div className="divider" />
          <div className="customer-name">
            <div className="customer-name-label">{(this.state.fname != "") ? (this.state.salutation + ((this.state.salutation != "") ? '.' : "")) : ""} {this.state.fname} {this.state.lname}</div>
          </div>
          {/*<div className="divider" />
          <div className="incircle-details">
            <span className="subheader-iconNum">{this.currentlvl}</span>
            <img
              className="subheader-circleStatusicon"
              src={incircle_purple_large_bttn}
              alt="profile-tab-icon"
            />
            <div className="incircle-description">
              <div className="incircle-description-level">
                CIRCLE {this.currentlvl}
              </div>
              <div className="incircle-description-points">
                Points to next point card: {this.pointsToNextLvl}
              </div>
            </div>
          </div>*/}
          <div className="spacer-div" />
          <div className="product-search">
            <img
              className="product-search-icon"
              src={productSearchWhite}
              alt="product-search-icon"
            />
            <div className="product-search-label">Product Search</div>
          </div>
          <div className="proceed-to-sale" onClick={()=>this.navigateToSale()}>
            <img
              className="proceed-to-sale-icon"
              src={proceedToSaleWhite}
              alt="proceed-to-sale-icon"
            />
            <div className="proceed-to-sale-label">Proceed to Sale</div>
          </div>
        </div>
        <div className="cusdet-tab-area">
          <Tabheader history={this.props.history} />
          <div className="cusdet-tab-content">
            <div className="content-left-part">
              <div className="incirclenonmember-content-left-upper">
                <div>
                  <div className="notMember">{this.state.fname} is not a member yet</div>
                </div>
                <div>
                  <div className="incircleLevels">
                    <span className="incircleHeadingStyle">IN</span>CIRCLE
                    Levels
                  </div>
                </div>
                <div>
                  <ButtonGroup>
                    <Button
                      className={
                        this.state.activeName == "1"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="1"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[0].id,
                          this.state.data[0].Level,
                          this.state.data[0].amount,
                          this.state.data[0].desc1,
                          this.state.data[0].desc2,
                          this.state.data[0].desc3
                        )
                      }
                      active={this.state.cSelected === "1"}
                    >
                      <img
                        src={
                          this.state.activeName == "1"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "1"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 1
                      </span>|<span
                        className={
                          this.state.activeName == "1"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        1
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "2"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="2"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[1].id,
                          this.state.data[1].Level,
                          this.state.data[1].amount,
                          this.state.data[1].desc1,
                          this.state.data[1].desc2,
                          this.state.data[1].desc3
                        )
                      }
                      active={this.state.cSelected === "2"}
                    >
                      <img
                        src={
                          this.state.activeName == "2"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "2"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 2
                      </span>|<span
                        className={
                          this.state.activeName == "2"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        2
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "3"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="3"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[2].id,
                          this.state.data[2].Level,
                          this.state.data[2].amount,
                          this.state.data[2].desc1,
                          this.state.data[2].desc2,
                          this.state.data[2].desc3
                        )
                      }
                      active={this.state.cSelected === "3"}
                    >
                      <img
                        src={
                          this.state.activeName == "3"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "3"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 3
                      </span>|<span
                        className={
                          this.state.activeName == "3"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        3
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "4"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="4"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[3].id,
                          this.state.data[3].Level,
                          this.state.data[3].amount,
                          this.state.data[3].desc1,
                          this.state.data[3].desc2,
                          this.state.data[3].desc3
                        )
                      }
                      active={this.state.cSelected === "4"}
                    >
                      <img
                        src={
                          this.state.activeName == "4"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "4"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 4
                      </span>|<span
                        className={
                          this.state.activeName == "4"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        4
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "5"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="5"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[4].id,
                          this.state.data[4].Level,
                          this.state.data[4].amount,
                          this.state.data[4].desc1,
                          this.state.data[4].desc2,
                          this.state.data[4].desc3
                        )
                      }
                      active={this.state.cSelected === "5"}
                    >
                      <img
                        src={
                          this.state.activeName == "5"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "5"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 5
                      </span>|<span
                        className={
                          this.state.activeName == "5"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        5
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "6"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="6"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[5].id,
                          this.state.data[5].Level,
                          this.state.data[5].amount,
                          this.state.data[5].desc1,
                          this.state.data[5].desc2,
                          this.state.data[5].desc3
                        )
                      }
                      active={this.state.cSelected === "6"}
                    >
                      <img
                        src={
                          this.state.activeName == "6"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "6"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        Circle 6
                      </span>|<span
                        className={
                          this.state.activeName == "6"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        6
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "P"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="P"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[6].id,
                          this.state.data[6].Level,
                          this.state.data[6].amount,
                          this.state.data[6].desc1,
                          this.state.data[6].desc2,
                          this.state.data[6].desc3
                        )
                      }
                      active={this.state.cSelected === "7"}
                    >
                      <img
                        src={
                          this.state.activeName == "P"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "P"
                            ? "circleTextLarge"
                            : "circleText"
                        }
                      >
                        President's Circle
                      </span>|<span
                        className={
                          this.state.activeName == "P"
                            ? "numberCircleLarge"
                            : "numberCircle"
                        }
                      >
                        P
                      </span>
                    </Button>

                    <Button
                      className={
                        this.state.activeName == "C"
                          ? "circleIconActive"
                          : "circleIcon"
                      }
                      name="C"
                      onClick={event =>
                        this.onRadioBtnClick(
                          event,
                          this.state.data[7].id,
                          this.state.data[7].Level,
                          this.state.data[7].amount,
                          this.state.data[7].desc1,
                          this.state.data[7].desc2,
                          this.state.data[7].desc3
                        )
                      }
                      active={this.state.cSelected === "8"}
                    >
                      <img
                        src={
                          this.state.activeName == "C"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span
                        className={
                          this.state.activeName == "C"
                            ? "circleTextChairLarge"
                            : "circleTextChair"
                        }
                      >
                        Chairman's Circle
                      </span>
                      <span
                        className={
                          this.state.activeName == "C"
                            ? "numberCircleChairLarge"
                            : "numberCircleChair"
                        }
                      >
                        C
                      </span>
                    </Button>
                  </ButtonGroup>
                </div>
                <div>
                  <div className="tapCircleText">
                    Tap a circle to view the benefits for each level
                  </div>
                </div>
              </div>
            </div>
            <div className="non-member-content-right-part">
              <div className="purchase-history">
                <div>
                  <div className="displayInline">
                    {" "}
                    <p>
                      <img
                        className={
                          this.state.activeName > "0" ||
                            this.state.activeName < "7" ||
                            this.state.activeName < "P" ||
                            this.state.activeName < "C"
                            ? "circleIconActive"
                            : "incirclePurple"
                        }
                        src={
                          this.state.activeName > "0" ||
                            this.state.activeName < "7" ||
                            this.state.activeName < "P" ||
                            this.state.activeName < "C"
                            ? incircleLarge
                            : incirclePurple
                        }
                        alt="profile-tab-icon"
                      />
                      <span className="circle">{this.state.activeName}</span>
                    </p>
                  </div>
                  <div className="displayInline">
                    <p>
                      <span className="rightCircleText">
                        {this.state.cSelected}
                      </span>
                      <span className="rightMoneyText">
                        {this.state.aSelected}
                      </span>
                    </p>
                  </div>
                  <ul
                    className={
                      this.state.activeName ? "displayVis" : "displayNone"
                    }
                  >
                    <li>{this.state.d1}</li>
                    <li>{this.state.d2}</li>
                    <li>{this.state.d3}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cusdet-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
function mapStateToProps({ customerDetails, customerSearch }) {
  return { profileData: customerDetails.profileData, incircleData: customerSearch.incircleData }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    goToSalesPage: goToSalesPage,
        
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IncircleNonMember);