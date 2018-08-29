import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//importing View
import {RemindersView} from './View/remindersView.js'

//importing actions
import { goToSalesPage } from '../sale/SaleAction.js';
/* import actions */
import {clearCustomerDetailsAction} from '../customer-details/CustomerDetailsActions';
import {getReminders} from './remindersAction.js'

import {startSpinner} from '../common/loading/spinnerAction'


class Reminders extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
        
            reminderList : [],
            profileData: {
                cust_cssId: '',
                cust_dom_salutation: '',
                cust_dom_fname: '',
                cust_dom_lname: '',        
                currentlvl:'',
                pointsToNextLvl: ''
                }    
            }
        }

    
    componentWillMount(){
        console.log('reminders props will mount',this.props)
        //var profileData =
        //this.props.startSpinner(true)
        
        if((this.props.customerDetails.profileData != undefined && this.props.customerDetails.profileData.names.length >0)){
            
            var profileDetails= {
                cust_cssId: this.props.customerDetails.profileData.names[0].css_id,
                cust_dom_salutation: this.props.customerDetails.profileData.names[0].salutation,
                cust_dom_fname: this.props.customerDetails.profileData.names[0].firstName,
                cust_dom_lname: this.props.customerDetails.profileData.names[0].lastName,        
                currentLvl: this.props.incircleData ? ((this.props.incircleData.data.lyBenefitLevelCode > this.props.incircleData.data.tyBenefitlevelCode) ? this.props.incircleData.data.lyBenefitLevelCode : this.props.incircleData.data.tyBenefitlevelCode) : 0,
                pointsToNextLvl: this.props.incircleData ? this.props.incircleData.data.pointsAwayToNextPointCard : 0,            
                cust_dom_address1: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0 && this.props.customerDetails.profileData.physicalAddresses[0].addressLines.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[0] : '',//'9303 Spring Hollow Dr',
                 cust_dom_address2: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0 && this.props.customerDetails.profileData.physicalAddresses[0].addressLines.length > 1) ? this.props.customerDetails.profileData.physicalAddresses[0].addressLines[1] : '',
                cust_dom_mobile: (this.props.customerDetails.profileData.phoneNumbers && this.props.customerDetails.profileData.phoneNumbers.length > 0) ? this.props.customerDetails.profileData.phoneNumbers[0].rawValue : '',
                cust_dom_email: (this.props.customerDetails.profileData.emailAddresses && this.props.customerDetails.profileData.emailAddresses.length > 0) ? this.props.customerDetails.profileData.emailAddresses[0].id : '',
                cust_dom_otherMobile: (this.props.customerDetails.profileData.phoneNumbers && this.props.customerDetails.profileData.phoneNumbers.length > 1) ? this.props.customerDetails.profileData.phoneNumbers[1].rawValue : '',
                cust_dom_city: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].cityName : '', //"New york"
                cust_dom_state: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].state : '', //'NY'
                cust_dom_country: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].countryName : '', //'CANADA',
                cust_dom_postal: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].postalCode : '', //'78750',
                cust_dom_province: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].state : '', //'ON',
                cust_dom_zip: (this.props.customerDetails.profileData.physicalAddresses && this.props.customerDetails.profileData.physicalAddresses.length > 0) ? this.props.customerDetails.profileData.physicalAddresses[0].postalCode : '', //'78750',
                          
            }
            this.setState({profileData : profileDetails});
       }     
       
      
        
        this.props.getReminderInvoker(this.props.login.userpin,this.props.customerDetails.clientNumber)
        
    }

    componentWillReceiveProps = (nextProps) =>{
        console.log('reminders props',nextProps)
       if(nextProps.reminders.remindersList != undefined){
            if(nextProps.reminders.remindersList.length > 0)
            {
                this.setState({reminderList :  nextProps.reminders.remindersList})
                //this.props.startSpinner(false);
            }
        }
        
    }


    componentWillUnmount(){
    
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
    
      /*Navigate back to Product Search */
    navigateToProductSearch = () => {
        this.props.history.push('/product-search');
      }
    
      /*Navigate back home*/
      navigateBack = () => {
        this.props.clearCustomerDetails();
        this.props.history.push('/customer-search'); 
      }

    render() {

        return(
            <RemindersView 
                 history={this.props.history}
                 navigateToSale={this.navigateToSale}
                 navigateToProductSearch = {this.navigateToProductSearch}
                 reminderList = {this.state.reminderList}
                 customerDetails={this.props.customerDetails}
                 profileData = {this.state.profileData}
                 navigateBack =  {this.navigateBack}
                 remindersCount = {(this.props.reminders.remindersList != undefined)?this.props.reminders.remindersList.length:0}
                    />
        );
        
    }


}

function mapStateToProps({ reminders,customerDetails,login, customerSearch }) {
    return { reminders ,customerDetails,login, incircleData: customerSearch.incircleData }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    goToSalesPage: goToSalesPage,
    clearCustomerDetails :clearCustomerDetailsAction,
    getReminderInvoker: getReminders,
    startSpinner : startSpinner
    
     
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
