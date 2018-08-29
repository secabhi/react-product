// Dependencies
import React, {Component} from "react";
import {connect} from 'react-redux';
import {custIncircleInfoRequest} from './incircleActions';
import {incircleGiftCardRequest} from './incircleActions';
import {store} from '../../../store/store';
import { goToSalesPage } from '../../sale/SaleAction.js';

// Components
import {InCircleView} from '../View/InCircleView';

class InCircle extends Component {
  constructor(props) {
    super(props);

    // JSON
    this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");

    var profile = this.props.customerDetails.profileData;
    if (profile && JSON.stringify(profile) != "{}") {
      //States
      this.state = {
        userID: "143343496",
        showcardPage: false,
        activebttn: "circleStatusbttn",
        activecircleNum: "circleNum",
        activeIcon: null,
        openModal: false,
        init: true, 
        current_lvl: '',
        hasCards: '',
        gcData: '',
        totalpoints: '',
        incircleData: '',
        percentage: '',
        textPercent: '',
        numofPointCards: '',
        numofPerkCards: '',
        pointCardBalance: 0,
        perkCardBalance: 0,
        cssId: profile.css_id,
        salutation: (profile.names && profile.names.length > 0 && profile.names[0].salutation !== '') ? profile.names[0].salutation : '',
        fname: (profile.names && profile.names.length > 0) ? profile.names[0].firstName : '',
        lname: (profile.names && profile.names.length > 0) ? profile.names[0].lastName : '',
        address1: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 0) ? profile.physicalAddresses[0].addressLines[0] : '',
        address2: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 1) ? profile.physicalAddresses[0].addressLines[1] : '',
        city: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].cityName : '',
        state: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '',
        zip: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '' ,
        email:(profile.emailAddresses && profile.emailAddresses.length > 0) ? profile.emailAddresses[0].id : '',
        mobile:(profile.phoneNumbers && profile.phoneNumbers.length > 0) ? profile.phoneNumbers[0].rawValue : '',
        otherMobile: (profile.phoneNumbers && profile.phoneNumbers.length > 1) ? profile.phoneNumbers[1].rawValue : ''
           
      };
    }
    else {
      this.state = {
        userID: "143343496",
        showcardPage: false,
        activebttn: "circleStatusbttn",
        activecircleNum: "circleNum",
        activeIcon: null,
        openModal: false,
        init: true, 
        current_lvl: '',
        hasCards: '',
        gcData: '',
        totalpoints: '',
        incircleData: '',
        percentage: '',
        textPercent: '',
        numofPointCards: 0,
        numofPerkCards: '',
        pointCardBalance: 0,
        perkCardBalance: '',
        cssId: undefined,
        salutation: '',
        fname: '',
        lname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''   ,
        email:'',
        mobile:'',
        otherMobile:''     
      };
      
    };


    //Binds
    this.viewCards = this
      .viewCards
      .bind(this);
    this.goBack = this
      .goBack
      .bind(this);
    this.setActive = this
      .setActive
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var gcloaded= nextProps.Incircle.gcloading==false;
    if (gcloaded) {
      var gcData=gcloaded?nextProps.Incircle.incircleGiftCard.customerGCInfo.customer.giftCardDtls:null;
      var hasCards=gcloaded?nextProps.Incircle.incircleGiftCard.customerGCInfo.customer!==null?true:false:null;
      var numofPointCards = gcloaded?gcData.filter(value=>value.cardType==="InCircle Reward").length:null;
      var numofPerkCards=gcloaded?gcData.filter(value=>value.cardType==="NM Earned Perk"||value.cardType==="BG Earned Perk").length:null;
      var pointCardBalance=0;
      gcloaded&&hasCards?(gcData.filter(value=>value.cardType==="InCircle Reward").map((card, index) => (pointCardBalance+=parseInt(card.currentBal)))):null;
      var perkCardBalance=0;
      gcloaded&&hasCards?(gcData.filter(value=>value.cardType==="NM Earned Perk"||value.cardType==="BG Earned Perk").map((card, index) => (perkCardBalance+=parseInt(card.currentBal)))):null;
      this.setState({  hasCards: hasCards, gcData: gcData,
      numofPointCards: numofPointCards, numofPerkCards: numofPerkCards,
      pointCardBalance: pointCardBalance, perkCardBalance: perkCardBalance  });
    }

    var loaded=nextProps.Incircle.loading==false;
    if (loaded) {
      var incircleData=loaded?nextProps.Incircle.incircleData.data:null;
      var nextPointCard = loaded?10000:"";
      var totalpoints= loaded?nextPointCard-incircleData.pointsAwayToNextPointCard:"";
      var percentage = loaded?totalpoints / nextPointCard * 100 + "%":"";
      var textPercent = loaded?(nextPointCard - totalpoints) / nextPointCard * 100 - 1.5 + "%":"";
      var isMember=loaded?incircleData.asOfDate!==null:false;    
      var current_lvl=(loaded?Math.max(incircleData.lyBenefitLevelCode, incircleData.lyEarnedlevelCode, incircleData.tyBenefitlevelCode, incircleData.tyEarnedlevelCode):"")
      /*  var nextLvl = loaded&&isMember?parseInt(this.inCircleDetails.data[current_lvl - 1].nextLvl):"";
      var redeemed = loaded?incircleData.tyPointsRedeemed:"";
      var totalpoints =loaded?incircleData.tyPointsEarned:"";
      var redeemedPercent = loaded?redeemed / nextLvl * 100 + "%":"";
      var availablePercent = loaded?totalpoints / nextLvl * 100 + "%":"";
      var redeemedtextPercent = loaded?(nextLvl - redeemed) / nextLvl * 100 - 1.5 + "%":"";
      var availabletextPercent = loaded?(nextLvl - totalpoints) / nextLvl * 100 - 1.5 + "%":""; */
      this.setState({ incircleData: incircleData, totalpoints: totalpoints, percentage: percentage, textPercent: textPercent, current_lvl: current_lvl });

      if (!isMember) {
        this.props.history.push('/incircle-non-member')
      }
    }
}

  //Functions
  componentWillMount() {
    console.log(store.getState())
    this.setState({
      //userID: store.getState().customerDetails.cssId,
      /* salutation: store.getState().customerSearch.customer.personNames[0].prefix,
      fname: store.getState().customerSearch.customer.personNames[0].firstName,
      lname: store.getState().customerSearch.customer.personNames[0].lastName */
    });

  }

  componentDidMount(){
    this.props.incircleGiftCardRequest(this.state.cssId);
    this.props.custIncircleInfoRequest(this.state.cssId);
  }

  /*Navigate back home*/
  navigateBack = () => {
    // this
    //   .props
    //   .history
    //   .push('/');
    this.props.history.push('/customer-search'); 
  }
 
  viewCards() {
    this.setState({showcardPage: true});
  }

  /*Go back to inCircle Page*/
  goBack() {
    this.setState({showcardPage: false});
  }

  closeModal = () => {
    this.setState({activeIcon: null, activebttn: "circleStatusbttn ", activecircleNum: "circleNum ", openModal: false});
  };

  setActive(num) {
    this.setState({activeIcon: num, activebttn: "circleStatusbttn activebttn", activecircleNum: "circleNum activecircleNum", openModal: true, init: false});
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
  render() {
    //console.log(this.props)
    //console.log(store.getState())
    var gcloaded= store.getState().Incircle.gcloading==false;
    var loaded=store.getState().Incircle.loading==false;
    var incircleData=loaded?store.getState().Incircle.incircleData.data:null;
    var isMember=loaded?incircleData.asOfDate!==null:false;
    var gcData=gcloaded?store.getState().Incircle.incircleGiftCard.customerGCInfo.customer.giftCardDtls:null;
    var hasCards=gcloaded?store.getState().Incircle.incircleGiftCard.customerGCInfo.customer!==null?true:false:null;
    var current_lvl=(loaded?Math.max(incircleData.lyBenefitLevelCode, incircleData.lyEarnedlevelCode, incircleData.tyBenefitlevelCode, incircleData.tyEarnedlevelCode):"")
    /*  var nextLvl = loaded&&isMember?parseInt(this.inCircleDetails.data[current_lvl - 1].nextLvl):"";
    var redeemed = loaded?incircleData.tyPointsRedeemed:"";
    var totalpoints =loaded?incircleData.tyPointsEarned:"";
    var redeemedPercent = loaded?redeemed / nextLvl * 100 + "%":"";
    var availablePercent = loaded?totalpoints / nextLvl * 100 + "%":"";
    var redeemedtextPercent = loaded?(nextLvl - redeemed) / nextLvl * 100 - 1.5 + "%":"";
    var availabletextPercent = loaded?(nextLvl - totalpoints) / nextLvl * 100 - 1.5 + "%":""; */
    var nextPointCard = loaded?10000:"";
    var totalpoints= loaded?nextPointCard-incircleData.pointsAwayToNextPointCard:"";
    var percentage = loaded?totalpoints / nextPointCard * 100 + "%":"";
    var textPercent = loaded?(nextPointCard - totalpoints) / nextPointCard * 100 - 1.5 + "%":"";
    var numofPointCards = gcloaded?gcData.filter(value=>value.cardType==="InCircle Reward").length:null;
    var numofPerkCards=gcloaded?gcData.filter(value=>value.cardType==="NM Earned Perk"||value.cardType==="BG Earned Perk").length:null;
    var pointCardBalance=0;
    gcloaded&&hasCards?(gcData.filter(value=>value.cardType==="InCircle Reward").map((card, index) => (pointCardBalance+=parseInt(card.currentBal)))):null;
    var perkCardBalance=0;
    gcloaded&&hasCards?(gcData.filter(value=>value.cardType==="NM Earned Perk"||value.cardType==="BG Earned Perk").map((card, index) => (perkCardBalance+=parseInt(card.currentBal)))):null;

    return (<div>{loaded&&isMember?<InCircleView
      history={this.props.history}
      inCircleDetails={this.inCircleDetails}
      userID={this.state.cssId}
      showcardPage={this.state.showcardPage}
      activebttn={this.state.activebttn}
      activecircleNum={this.state.activecircleNum}
      activeIcon={this.state.activeIcon}
      openModal={this.state.openModal}
      init={this.state.init}
      salutation={this.state.salutation}
      fname={this.state.fname}
      lname={this.state.lname}
      currentlvl={this.state.current_lvl}
      hasCards={this.state.hasCards}
      gcData={this.state.gcData}
      incircleData={this.state.incircleData}
      totalpoints={this.state.totalpoints}/*
      redeemed={redeemed} 
      available={incircleData.tyPointsAvailable}*/
      totalpoints={totalpoints}
      pointsToNextLvl={this.state.incircleData.pointsAwayToNextPointCard}
      /* redeemedPercent={redeemedPercent}
      availablePercent={availablePercent}
      redeemedtextPercent={redeemedtextPercent}
      availabletextPercent={availabletextPercent} */
      percentage={this.state.percentage}
      textPercent={this.state.textPercent}
      numofPointCards={this.state.numofPointCards}
      numofPerkCards={this.state.numofPerkCards}
      pointCardBalance={this.state.pointCardBalance}
      perkCardBalance={this.state.perkCardBalance}
      navigateBack={this.navigateBack}
      viewCards={this.viewCards}
      goBack={this.goBack}
      closeModal={this.closeModal}
      setActive={this.setActive}
      customerDetails={this.props.customerDetails}
      />:(loaded&&!isMember)?this.props.history.push('/incircle-non-member'):null}</div>);
  }
}

function mapStateToProps({Incircle, customerDetails, customerSearch}) {
  return { Incircle, customerDetails, incircleData: customerSearch.incircleData }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    custIncircleInfoRequest: (data) => dispatch(custIncircleInfoRequest(data)),
    incircleGiftCardRequest: (data) => dispatch(incircleGiftCardRequest(data)),
    goToSalesPage :    (flag,data)=> dispatch(goToSalesPage(flag,data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InCircle);
