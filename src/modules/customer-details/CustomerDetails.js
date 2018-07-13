import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

/*import View Components */
import { CustomerDetailsView } from './View/CustomerDetailsView';

/* import actions */
import {getCsrPurchasesNRecommends, navigateToDomesticCustomer,getSalesSummaryAction,clearCustomerDetailsAction} from './CustomerDetailsActions';
import {navigateToEditCustomerAction} from '../update-customer/UpdateCustomerAction';
import {navigateToEditCustomerIntAction} from '../update-customer/UpdateCustomerInternationalActions';
import { bindActionCreators } from 'redux';
import { goToSalesPage } from '../sale/SaleAction.js'


class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;
    this.nextLvl = parseInt(this.data[parseInt(this.currentlvl, 10) - 1].nextLvl, 10);
    this.totalpoints = parseInt(this.inCircleInfo.total_points, 10);
    this.pointsToNextLvl = this.nextLvl - this.totalpoints;

    this.state = {
      profileData: {
        cust_cssId: '',
        cust_dom_salutation: '',
        cust_dom_fname: '',
        cust_dom_lname: '',
        cust_dom_address1: '',
        cust_dom_address2: '',
        cust_dom_mobile: '',
        cust_dom_email: '',
        cust_dom_otherMobile: '',
        cust_dom_city: '',
        cust_dom_state: '',
        cust_dom_country: '',
        cust_dom_postal: '',
        cust_dom_province: '',
        cust_dom_zip: '',
        currentlvl:'',
        pointsToNextLvl: ''
      },
      salesSummaryDetails :{
       
      },
      userPin : ''
    }
  }

  toCamelCase(str) {
    return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
        return match.charAt(match.length-1).toUpperCase();
    });
  }

  componentDidMount() {
   // this.props.getCsrPurchasesNRecommends({ cssId: 103807506 }, 'ECOM');
    console.log(this.props);
    if((this.props.customerDetails.cssId != undefined)&&(this.props.customerDetails.cssId != ''))
    {
     // alert('call on load '+this.props.customerDetails.cssId)
     this.props.navigateToDomesticCustomer(this.props.customerDetails.cssId);
     if(this.props.login.userpin != undefined)
     {
       this.setState({userPin:this.props.login.userpin});
       this.props.getSalesSummaryCall(this.props.customerDetails.cssId, this.props.login.userpin);
     }
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.customerDetails.isProfileDataLoaded === true) {
      var profile = nextProps.customerDetails.profileData;
      if (profile && JSON.stringify(profile) != "{}") {
        var profileData = {
          cust_cssId: profile.css_id,
          cust_dom_salutation: (profile.names && profile.names.length > 0 && profile.names[0].salutation !== '') ? profile.names[0].salutation : '',
          cust_dom_fname: (profile.names && profile.names.length > 0) ? profile.names[0].firstName : '',
          cust_dom_lname: (profile.names && profile.names.length > 0) ? profile.names[0].lastName : '',
          cust_dom_address1: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 0) ? profile.physicalAddresses[0].addressLines[0] : '',//'9303 Spring Hollow Dr',
          cust_dom_address2: (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 1) ? profile.physicalAddresses[0].addressLines[1] : '',
          cust_dom_mobile: (profile.phoneNumbers && profile.phoneNumbers.length > 0) ? profile.phoneNumbers[0].id : '',
          cust_dom_email: (profile.emailAddresses && profile.emailAddresses.length > 0) ? profile.emailAddresses[0].id : '',
          cust_dom_otherMobile: (profile.phoneNumbers && profile.phoneNumbers.length > 1) ? profile.phoneNumbers[1].id : '',
          cust_dom_city: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].cityName : '', //"New york"
          cust_dom_state: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '', //'NY'
          cust_dom_country: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].countryCode : '', //'CANADA',
          cust_dom_postal: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '', //'78750',
          cust_dom_province: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '', //'ON',
          cust_dom_zip: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '', //'78750',
          
        }
        this.setState({ profileData: profileData });
        console.log('cssID '+profile.css_id)
        this.props.getCsrPurchasesNRecommends({ cssId: profile.css_id }, this.props.login.userpin);
        
      }
    }
    if(nextProps.customerDetails.salesSummary != undefined)
    {
      this.setState({salesSummaryDetails : nextProps.customerDetails.salesSummary})
    }
   
    if (nextProps.customerSearch.incircleData !== null && nextProps.customerSearch.incircleData !== undefined) {
      var circleData = nextProps.customerSearch.incircleData.data;
      this.setState({ currentlvl: circleData.lyBenefitLevelCode, pointsToNextLvl: circleData.pointsAwayToNextPointCard });
    }
  }


  navigateToSale = () => {
    this.props.goToSalesPage(false, {
      salutation: this.state.profileData.cust_dom_salutation,
      firstname: this.state.profileData.cust_dom_fname,
      lastname: this.state.profileData.cust_dom_lname,
      address1: this.state.profileData.cust_dom_address1,
      city: this.state.profileData.cust_dom_city,
      state: this.state.profileData.cust_dom_state,
      zip: this.state.profileData.cust_dom_zip ? this.state.profileData.cust_dom_zip : this.state.profileData.cust_dom_postal,
      address2: this.state.profileData.cust_dom_address2,
      email: this.state.profileData.cust_dom_email,
      mobile: this.state.profileData.cust_dom_mobile,
      otherMobile: this.state.profileData.cust_dom_otherMobile,
    });
    this.props.history.push('/sale');
  }

  /*Navigate back home*/
  navigateBack = () => {
    this.props.clearCustomerDetails();
    this.props.history.push('/customer-search'); ``
  }

  displayHistoryModal(index) {
    //to be implemented
    alert(`History Modal to Be Implemented ${index}`);

  }

  displayRecommendsModal(index) {
    //to be implmeneted
    alert(`Recommends Modal to Be Implemented ${index}`);
  }

  render() {
    console.log('Render-this.props', this.props);

    return (
      //   

      <CustomerDetailsView
        history={this.props.history}
        match={this.props.match}
        customerDetails={this.props.customerDetails}
        navigateBack={this.navigateBack}
        displayHistoryModal={this.displayHistoryModal}
        displayRecommendsModal={this.displayRecommendsModal}
        navigateToUpdateCustomer={this.navigateToUpdateCustomer}
        navigateToIncircleNonMember={this.navigateToIncircleNonMember}
        inCircleInfo={this.inCircleInfo}
        currentlvl={this.state.currentlvl}
        nextLvl={this.nextLvl}
        pointsToNextLvl={this.state.pointsToNextLvl}
        profileData={this.state.profileData}
        navigateToSale={this.navigateToSale}
        salesSummaryDetails = {this.state.salesSummaryDetails}
        toCamelCase={this.toCamelCase}
      />
    )
  }

  //   /* Function to navigate to update customer page*/

  navigateToUpdateCustomer = () => {
    //this.props.history.push('/update-customer');

    if(this.state.profileData.cust_dom_country == 'US')
    {
      this.props.navigateToEditCustomer(this.state.profileData);
      this.props.history.push('/update-customer');
    }
  else
  {
    this.props.navigateToEditCustomerInt(this.state.profileData);
    this.props.history.push('/update-customerinternational');
  }
  }

  /* Function to navigate to incircle non-member page*/

  navigateToIncircleNonMember = () => {
    this.props.history.push('/incircle-non-member');
  }

}

function mapStateToProps({ customerDetails, customerSearch,login }) {
  return { customerDetails, customerSearch,login }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  {
  getCsrPurchasesNRecommends: getCsrPurchasesNRecommends,
  navigateToDomesticCustomer : navigateToDomesticCustomer,
  goToSalesPage: goToSalesPage,
  navigateToEditCustomer : navigateToEditCustomerAction,
  navigateToEditCustomerInt : navigateToEditCustomerIntAction,
  getSalesSummaryCall : getSalesSummaryAction,
  clearCustomerDetails :clearCustomerDetailsAction
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
