import React, { Component } from 'react';
import { connect } from 'react-redux';

/*import View Components */
import { CustomerDetailsView } from './View/CustomerDetailsView';
import SystemError from '../../UI/systemError/systemError';

/* import actions */
import {getCsrPurchasesNRecommends, navigateToDomesticCustomer,getSalesSummaryAction,clearCustomerDetailsAction, changeItemPurchasedFlag} from './CustomerDetailsActions';
import { bindActionCreators } from 'redux';
import { goToSalesPage } from '../sale/SaleAction.js';
import { getReminders} from '../reminders/remindersAction';
import { attachCustomerAction } from '../home/HomeAction.js'
import {showException} from '../common/exceptionErrorModal/exceptionAction';

export class CustomerDetailsErrorHandler extends Component {
  state = {hasError: false, errorInfo: {err: '', info: ''}}

  componentDidCatch(err, info) {
    //this.props.history.push('/');
    const errorInfo = {};
    errorInfo.err = err.message;
    errorInfo.info = info.componentStack;
    this.setState({hasError: true, errorInfo: errorInfo});
  }

  render() {
    if(this.state.hasError) {
      return ( 
          <SystemError from='Customer Details Component' redirect={()=>this.props.history.push('/customer-search')}>
            <h6>{this.state.errorInfo.err}: {this.state.errorInfo.info}</h6>
          </SystemError>  
      )   
    } else {
      return(
        this.props.children
      )
    }
  }
}  //end of class CustomerDetailsErrorHandler


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
      currentlvl: '',
      pointsToNextLvl: '',
    }
  }

  toCamelCase(str) {
    return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
        return match.charAt(match.length-1).toUpperCase();
    });
  }

  componentDidMount() {
   this.props.getCsrPurchasesNRecommends(this.props.customerDetails.cCSNumber);
    console.log('CustomerDetails componentDidMount props',this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.customerDetails.error) {
      throw new Error('Errror in CustomerDetails: ', nextProps.customerDetails.error)
    }
  }

  callAttachCustomerActionInvoker = () => {
    var storeClientNumber = (this.props.customerDetails.clientNumber) ? this.props.customerDetails.clientNumber : "";
    var phoneSequence = (this.props.customerDetails.selectedAddress.PhoneNumbers.length > 0 && this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence != "") ? this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence : "0"
    this.props.attachCustomerActionInvoker(this.props.login.userpin, this.props.transactionId, storeClientNumber, this.props.customerDetails.selectedAddress.sequenceKey, phoneSequence, this.props.customerDetails);
  }

  navigateToSale = () => {
    this.callAttachCustomerActionInvoker();
    this.props.history.push('/sale');
  }

  /*Navigate back to Product Search */
  navigateToProductSearch = () => {
    this.props.history.push('/product-search');
  }

  navigateToProductDummy = () => {
    this.props.history.push('/products-dummy');
  }

  /*Navigate back home*/
  navigateBack = () => {
    // this.props.clearCustomerDetails();
    this.props.history.push('/customer-search');
  }

  displayHistoryModal =() => {
    console.log('Test')
  }

 
  render() {
    return (
      <CustomerDetailsErrorHandler history={this.props.history}>
        <CustomerDetailsView
          history={this.props.history}
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
          navigateToSale={this.navigateToSale}
          navigateToProductSearch = {this.navigateToProductSearch}
          navigateToProductDummy = {this.navigateToProductDummy}
          toCamelCase={this.toCamelCase}
          userPin={this.props.login.userpin}
          remindersCount = {(this.props.reminders.remindersList != undefined)?this.props.reminders.remindersList.length:0}
          changeItemPurchasedFlag = {this.props.changeItemPurchasedFlag}
        />
      </CustomerDetailsErrorHandler> 
    )
  }

  //   /* Function to navigate to update customer page*/

  navigateToUpdateCustomer = () => {
    //this.props.history.push('/update-customer');

    if(this.props.customerDetails.selectedAddress.international === '0')
    {
      this.props.history.push('/update-customer');
    }
  else
  {
    this.props.history.push('/update-customerinternational');
  }
  }

  /* Function to navigate to incircle non-member page*/

  navigateToIncircleNonMember = () => {
    this.props.history.push('/incircle-non-member');
  }
}

function mapStateToProps({ updatedCustomer, customerDetails, customerSearch,login,reminders, home }) {
  return {updatedCustomer, customerDetails, customerSearch,login,reminders,
  transactionId: home.transactionData ? home.transactionData.transactionNumber : '' }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
  {
  getCsrPurchasesNRecommends: getCsrPurchasesNRecommends,
  navigateToDomesticCustomer: navigateToDomesticCustomer,
  goToSalesPage: goToSalesPage,
  getSalesSummaryCall: getSalesSummaryAction,
  clearCustomerDetails: clearCustomerDetailsAction,
  getReminders:getReminders,
  attachCustomerActionInvoker: attachCustomerAction,
  changeItemPurchasedFlag: changeItemPurchasedFlag,
  callErrorException: showException
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);



