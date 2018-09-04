import React, { Component } from 'react';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

import SaleHeader from './SaleHeader';
import SaleContainer from './SaleContainer';
import { connect } from 'react-redux';

import './sale.css';

// SET UP PROPER FOLDER STRUCTURE FOR REACT COMPONENTS //

export class Sale extends Component {

    constructor(props) {
        super(props);
        // this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
        // this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
        // this.data = this.inCircleDetails.data;
        // this.currentlvl = this.inCircleInfo.currentlvl;

        this.state = {
            showPreSale:false,
            //Account Lookup states
            custPhoneModalFlag: false,
            //Account Lookukp
            isSkip: !this.props.customerDetails.clientNumber,
            salutation: this.props.customerDetails.salutation,
            firstname: this.props.customerDetails.firstName,
            lastname: this.props.customerDetails.lastName,
            address1: this.props.customerDetails.selectedAddress.Addr1,
            address2: this.props.customerDetails.selectedAddress.Addr2,
            city: this.props.customerDetails.selectedAddress.City,
            state: this.props.customerDetails.selectedAddress.State,
            zip: this.props.customerDetails.selectedAddress.Zip,
            currentLvl: this.props.incircleData ? ((this.props.incircleData.data.lyBenefitLevelCode > this.props.incircleData.data.tyBenefitlevelCode) ? this.props.incircleData.data.lyBenefitLevelCode : this.props.incircleData.data.tyBenefitlevelCode) : 0
        }
    }
    makePresaleHeader= () => {
      
        this.setState({showPreSale:true})
    }
    componentWillReceiveProps(nextProps) {
        //debugger
        if (nextProps.customerDetails.clientNumber !== this.props.customerDetails.clientNumber) {
            this.setState({ isSkip: !this.customerDetails.clientNumber })
        }
        // if(nextProps.nonClientalCustomerDetail !== null && nextProps.nonClientalCustomerDetail !== undefined && nextProps.nonClientalCustomerDetail.first_name && nextProps.nonClientalCustomerDetail.first_name){
            
        //     this.state = {
        //         salutation: nextProps.nonClientalCustomerDetail.title,
        //         firstname: nextProps.nonClientalCustomerDetail.first_name,
        //         lastname: nextProps.nonClientalCustomerDetail.last_name,
        //         address1: nextProps.nonClientalCustomerDetail.street1,
        //         city: nextProps.nonClientalCustomerDetail.city,
        //         state: nextProps.nonClientalCustomerDetail.state,
        //         zip: nextProps.nonClientalCustomerDetail.zip,
                
        //     }
        // }
        // else if(nextProps.customerDetails.updatedCustomer.CFirstName){
        //     this.setState({
        //         salutation:nextProps.customerDetails.updatedCustomer.salutation,
        //         firstname:nextProps.customerDetails.updatedCustomer.CFirstName,
        //         lastname:nextProps.customerDetails.updatedCustomer.CLastName,
        //         address1:nextProps.customerDetails.updatedCustomer.Address_Ln1,
        //         city:nextProps.customerDetails.updatedCustomer.City,
        //         state:nextProps.customerDetails.updatedCustomer.State_Abbr,
        //         zip:nextProps.customerDetails.updatedCustomer.Zip9

        //     })
        // }
    }

    //Account Lookup
    showAccountLookupModal = () => {
        
        this.setState({ custPhoneModalFlag: true });
      }
     

      

    render() {

        // if(this.props.sale.otherPageData){
        //     this.state={
        //         salutation:this.props.sale.otherPageData.details.salutation,
        //         firstname:this.props.sale.otherPageData.details.firstname,
        //         lastname:this.props.sale.otherPageData.details.lastname,
        //         address1:this.props.sale.otherPageData.details.address1,
        //         city:this.props.sale.otherPageData.details.city,
        //         state:this.props.sale.otherPageData.details.state,
        //         zip:this.props.sale.otherPageData.details.zip

        //     }
        // }
        return (
            <div>
                <Header 
                history={this.props.history} sale="true" 
                custPhoneModalFlag = {this.state.custPhoneModalFlag}
                closeCustModel = {this.closeCustModel}
                custData = {this.props.customerDetails}
                showAccountLookupModal = {this.showAccountLookupModal}
                />
                <SaleHeader
                    pageName="Sale"
                    salutation={this.state.salutation}
                    showPreSale={this.state.showPreSale}
                    firstName={this.state.firstname}
                    lastName={this.state.lastname}
                    currentLvl={this.state.currentLvl}
                    skipCustomerInfo={this.state.isSkip}
                    address1={this.state.address1}
                    address2={this.state.address2}
                    city={this.state.city}
                    state={this.state.state}
                    zip={this.state.zip}
                    history={this.props.history}
                />
                <SaleContainer 
                history={this.props.history}
                custPhoneModalFlag = {this.state.custPhoneModalFlag}
                showAccountLookupModal = {this.showAccountLookupModal}
                closeCustModel = {this.closeCustModel}
                makePresaleHeader={this.makePresaleHeader} />
                {/*SALE CONTAINER*/}
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state", state);
    return {
        sale:state.sale,
        nonClientalCustomerDetail:state.cart.data.customerInfo,
        customerDetails:state.customerDetails,
        incircleData: state.customerSearch.incircleData
    }
}


export default connect(mapStateToProps, null)(Sale);