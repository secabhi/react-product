import React, {Component} from 'react';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

import SaleHeader from './SaleHeader';
import SaleContainer from './SaleContainer';
import { connect } from 'react-redux';

import './sale.css';

// SET UP PROPER FOLDER STRUCTURE FOR REACT COMPONENTS //

export class Sale extends Component {

    constructor(props)
    {
        super(props);
        this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;

        this.state = {
            isSkip: this.props.otherPageData.isSkip,
            salutation: (this.props.otherPageData.details && this.props.otherPageData.details.salutation) ? (this.props.otherPageData.details.salutation + '.') : '',
            firstname: this.props.otherPageData.details ? this.props.otherPageData.details.firstname : '',
            lastname: this.props.otherPageData.details ? this.props.otherPageData.details.lastname : '',
            address1: this.props.otherPageData.details ? this.props.otherPageData.details.address1 : '',
            address2: this.props.otherPageData.details ? this.props.otherPageData.details.address2 : '',
            city: (this.props.otherPageData.details && this.props.otherPageData.details.city) ? (this.props.otherPageData.details.city + ',') : '',
            state: this.props.otherPageData.details ? this.props.otherPageData.details.state : '',
            zip: this.props.otherPageData.details ? this.props.otherPageData.details.zip : '',
            currentLvl: this.props.incircleData ? this.props.incircleData.data.lyBenefitLevelCode: '0'        
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.otherPageData !== this.props.otherPageData) {
            this.setState({ isSkip: nextProps.otherPageData.isSkip })
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history} sale="true"/>
                <SaleHeader 
                    pageName="Sale"
                    salutation={this.state.salutation}
                    firstName={this.state.firstname}
                    lastName={this.state.lastname}
                    currentLvl={this.state.currentLvl}
                    skipCustomerInfo={this.state.isSkip}
                    address1={this.state.address1}
                    address2={this.state.address2}
                    city={this.state.city}
                    state={this.state.state}
                    zip={this.state.zip}
                />
                <SaleContainer history={this.props.history} />
                {/*SALE CONTAINER*/}
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({sale, customerSearch}) {
    return { otherPageData: sale.otherPageData, incircleData: customerSearch.incircleData }
}

function mapDispatchToProps(dispatch) {
  return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sale);