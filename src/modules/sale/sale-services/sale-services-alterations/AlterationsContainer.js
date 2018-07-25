import React, { Component } from 'react';
import ServicesHeader from '../services-common/ServicesHeader';
import ServicesFooter from '../services-common/ServicesFooter';
import Modal from 'react-responsive-modal';
import { ContactDetailsModal, 
         AlterationDetailsModal, 
         CustomerDetailsModal, 
         AlterationSuccessModal,
         InvalidAlterationTagModal,
         ErrorModal
         } from '../services-common/ServicesModals';

import '../services-common/services-common.css';

import Header from '../../../common/header/header';
import Footer from '../../../common/footer/footer';

import SaleHeader from '../../SaleHeader';
// import SaleContent from '../../SaleContent';

import './Alterations.css';
import backArrow from '../../../../resources/images/Back.svg';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAlterations, resetAlterationComplete } from './AlterationActions';
import { startSpinner } from '../../../common/loading/spinnerAction';
import {itemSelectedAction} from '../../../common/cartRenderer/actions'
import { setCurrnetItem } from '../../SalesCartAction';
import CartRenderer from '../../../common/cartRenderer/cartRenderer';
import Calendar from './Calendar/Calendar';

class Alterations extends Component {
  constructor(props) {
    super(props);

    this.inCircleInfo = require("../../../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;

    this.state = {
      contact_modal: false,
      alterations_modal : false,
      customer_details_modal: false,
      alteration_success_modal: false,
      showCalendar_Modal: false,
      invalidTag_modal: false,
      error_modal: false,
      isSkip: this.props.otherPageData.isSkip,
      salutation: this.props.otherPageData.details ? this.props.otherPageData.details.salutation : '',
      firstname: this.props.otherPageData.details ? this.props.otherPageData.details.firstname : '',
      lastname: this.props.otherPageData.details ? this.props.otherPageData.details.lastname : '',
      address1: this.props.otherPageData.details ? this.props.otherPageData.details.address1 : '',
      address2: this.props.otherPageData.details ? this.props.otherPageData.details.address2 : '',
      // proposedDate: undefined
    }

    this.alterationObject = {
      promiseDate: undefined,
      alterationID: undefined,
      quotedPrice: undefined,
      contactName: undefined,
      contactExt: undefined
    }
    
  }


  componentWillReceiveProps(nextprops) {
    console.log("NEXT PROPS", nextprops)
    
    /* if(nextprops.alterationComplete) {
      this.setState({alteration_success_modal: true})
      this.props.startSpinner(false);
    } */
    if(nextprops.cart.dataFrom === 'ALTERATION_SUCCESS') {
      /* debugger;
      this.startSpinner(false); */
      this.setState({alteration_success_modal: true})
      this.props.startSpinner(false);
      //this.props.history.push('/sale');
    }
    else if(nextprops.cart.dataFrom === 'WEB_SERVICE_ERROR') {
      /* debugger;
      this.startSpinner(false); */
      this.props.startSpinner(false);
      //this.props.history.push('/sale');
    }

    else if(nextprops.cart.dataFrom === 'AA_INVALIDALTERATIONTAG') {
      console.log("invalidtag dataform", nextprops.cart.dataFrom)
      this.setState({
        invalidTag_modal: true
      })
      this.alterationObject = {
        promiseDate: '',
        alterationID: '',
        quotedPrice: '',
        contactName: '',
        contactExt: ''
      }
      this.props.startSpinner(false);
    }
    
    else if(nextprops.cart.dataFrom === 'ADD_ALTERATIONS_FAIL') {
      this.renderErrorModal();
      this.props.startSpinner(false);
    }

    else if(nextprops.cart.dataFrom === 'WEB_SERVICE_ERROR') {
      this.props.startSpinner(false);
    }

  }

  render() {
    console.log('MIKE----------ALTERATION PROPS',this.props)
    return (
      <div>
        <Modal classNames={{modal: "contact-details-modal"}} open={this.state.contact_modal} onClose={() => this.setState({contact_modal: false})} closeOnOverlayClick={false}>
          <ContactDetailsModal
            changeModal={this.renderAlterationsModal}
            closeModal={() => {this.exitModals()}}
            setObject={(value) => {this.setObject(value)}}
            alterationObject={this.alterationObject}
          />
        </Modal>

        <Modal classNames={{modal: "alteration-details-modal"}} open={this.state.alterations_modal} onClose={() => this.setState({alterations_modal: false})} closeOnOverlayClick={false}>
          <AlterationDetailsModal 
            changeModal={this.props.otherPageData ? this.renderAlterationsSuccessModal : this.renderCustomerModal} 
            closeModal={() => this.setState({alterations_modal: false})}
            alterationsApiCall={(values) => {this.addToAlteration(values)}}
            setObject={(value) => {this.setObject(value)}}
            alterationObject={this.alterationObject}
            showCalendar={() => this.setState({showCalendar_Modal: true, alterations_modal: false})}
            />
        </Modal>

        <Modal classNames={{modal: "customer-details-modal"}} open={this.state.customer_details_modal}  closeOnOverlayClick={false}>
          <CustomerDetailsModal  
            closeModal={(values) => {this.setState({customer_details_modal: false}); this.addToAlteration(values)}} />
        </Modal>

        <Modal classNames={{modal: "alteration-success-modal"}} open={this.state.alteration_success_modal} closeOnOverlayClick={false}>
          <AlterationSuccessModal
            closeModal={() => {this.props.resetAlterationComplete(); this.navigateToSale()}} />
        </Modal>

        <Modal classNames={{modal: "invalid-tag-modal"}} open={this.state.invalidTag_modal} onClose={() => this.setState({invalid_modal: false})} closeOnOverlayClick={false}>
          <InvalidAlterationTagModal
            closeModal={() => {this.exitModals()}}
          />
        </Modal>

        <Modal classNames={{modal: "res-error-modal"}} open={this.state.error_modal} onClose={() => this.setState({error_modal: false})} closeOnOverlayClick={false}>
          <ErrorModal
            closeModal={() => {this.exitModals()}}
          />
        </Modal>

        {this.state.showCalendar_Modal 
          ? 
            <Calendar 
              getSelectedDay={(day) => {this.setDate(day)}}
              close={() =>  this.setState({alterations_modal: true, showCalendar_Modal: false})}
            /> 
          : 
            null 
        }
        
        <Header history={this.props.history} sale="true"/>
        <SaleHeader   
          pageName="Sale"
          salutation={this.state.salutation}
          firstName={this.state.firstname}
          lastName={this.state.lastname}
          currentLvl={this.currentlvl}
          skipCustomerInfo={this.state.isSkip}
          address1={this.state.address1}
          address2={this.state.address2}
        />
        <div>
          <ServicesHeader>
            <div className="alterations-header-container">
              <img className="alterations-header-arrow" src={backArrow} alt="backarrow" onClick={this.navigateToSale}/>
              <div className="alterations-header-divider"></div>
              <div className="alterations-header-text">Services - Alterations</div>
            </div>
          </ServicesHeader>

          <div className="alterations-content">
            <div className="alterations-content-text">Item to be altered</div>
            {console.log("BEFORE CART RENDERER: ",this.props.cart)}
            <CartRenderer
              style= {{boxShadow: 'none'}}
              items = {this.props.cart.data.cartItems.items}
              setCurrentItem = {this.setCurrentItem}
            />
          </div>

          <ServicesFooter>
            <div className="alterations-cancel" onClick={() => {this.navigateToSale()}}><span className="alterations-cancel-text">Cancel</span></div>
            <div className="alterations-next" onClick={() => {this.renderContactDetailsModal()}}><span className="alterations-next-text">Next</span></div>
          </ServicesFooter>
        </div> 

        <Footer />
      </div>
    )
  }

  setObject = (value) => {
    this.alterationObject = value
  }

  // setContactObject = (value) => {
  //   this.contactObject = value
  // }

  setDate = (value) => {
    this.alterationObject.promiseDate = value
  }

  setCurrentItem = (itemNumber, itemPrice, itemSku, selectedItem, index) => {

    this.props.itemSelectedAction(index);
  }

  addToAlteration = (values) => {
    console.log('VALUES FROM MODALS', values)
    this.setState({alterations_modal: false});
    
    var apiDateFormat = values.promiseDate.split('/');
    console.log('API DATE FORMAT', apiDateFormat);
    apiDateFormat[2] = apiDateFormat[2].slice(2);
    //apiDateFormat = apiDateFormat.join('');
    var finalApiDateFormat = apiDateFormat[0] + apiDateFormat[1] + apiDateFormat[2];
    console.log('API DATE FORMAT', finalApiDateFormat);

    const index = this.props.selectedItems[0];

    const cart = this.props.cart.data.cartItems.items;
    const transId = this.props.cart.data.transactionId;
    const selectedItem = cart[index][0];
    //need to get last subitem linenumber to pass to API.Not the main sku linenumber
    const lastSubItemIndex = cart[index].length - 1;

    //if no subitem index will be zero which is main sku
    const lineNum = cart[index][lastSubItemIndex].lineNumber;

    const sku = selectedItem.itemNumber;

    const alterationsObj = {
      "transactionId": transId,
      "ItemNumber": sku,
      "LineNumber": lineNum,
      "PromisedDate": finalApiDateFormat,
      "QuotedPrice": this.alterationObject.quotedPrice,
      "AlterationTag": this.alterationObject.alterationID,
      "AlterationType" : "",
      "AssociateName" :this.alterationObject.contactName,
      "AssociateExtn": this.alterationObject.contactExt,
      "ClientTypeID": "1000",
      "Description": "",
      "RfaComments": ""
      // VALID ALTERATION TAG 1548634
    }
    console.log('B4 API CALL', this.props.cart.data)
    this.props.startSpinner(true)
    this.props.addAlterations(alterationsObj)
    // this.props.startSpinner(false)
  }

  navigateToSale = () => {
    //clear selection before returning to sale
    this.props.itemSelectedAction('');
    this.props.history.push('/sale')
  }   
  
  // ---------- MODAL METHODS ----------
  renderContactDetailsModal = () => {
    this.setState({
      contact_modal: true
    })
  }

  renderAlterationsModal = () => {
    this.setState({
      alterations_modal: true,
      contact_modal: false
    })
  }

  renderCustomerModal = () => {
    this.setState({
      customer_details_modal: true,
      alterations_modal: false
    })
  }

  renderAlterationsSuccessModal = () => {
    this.setState({
      alteration_success_modal: true,
      alterations_modal: false,
      customer_details_modal: false,
    })
  }

  // renderInvalidTag = () => {
  //   this.setState({
  //     invalidTag_modal: true
  //   })
  // }

  renderErrorModal = () => {
    this.setState({
      error_modal: true
    })
    
  }
  
  exitModals = () => {
    this.setState({
      contact_modal: false,
      customer_details_modal: false,
      alterations_modal: false,
      alteration_success_modal: false,
      invalidTag_modal: false,
      error_modal: false
    })
  }

}// end of class

function mapStateToProps({ alterationComplete, cart, sale, selectedItems,  }) {
  return { alterationComplete, 
           cart, 
           otherPageData: sale.otherPageData,
           selectedItems
          }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        addAlterations,
        resetAlterationComplete,
        startSpinner,
        itemSelectedAction
      }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Alterations);
