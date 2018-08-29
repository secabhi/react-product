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
import warningIcon from '../../../../resources/images/Warning.svg';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAlterations, resetAlterationComplete } from './AlterationActions';
import { startSpinner } from '../../../common/loading/spinnerAction';
import {itemSelectedAction} from '../../../common/cartRenderer/actions';
import { addCustomerAction } from '../../../add-customer/BusinessLogic/AddCustomerAction';

import { setCurrnetItem } from '../../SalesCartAction';
import CartRenderer from '../../../common/cartRenderer/cartRenderer';
import Calendar from './Calendar/Calendar';
import moment from 'moment';

import {pluck,indexOf} from 'underscore';
const CONFIG_FILE = require('../../../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;

class Alterations extends Component {
  constructor(props) {
    super(props);

    this.inCircleInfo = require("../../../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../../../resources/stubs/incircleConfig.json");
    this.data = this.inCircleDetails.data;
    this.currentlvl = this.inCircleInfo.currentlvl;
    this.state = {
      alteration_errorModal: false,
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
      contactNameErrorMsg : '',
      contactExtErrorMsg : ''
      // proposedDate: undefined
    }

    this.alterationObject = {
      promiseDate: undefined,
      alterationID: undefined,
      quotedPrice: undefined,
      contactName: undefined,
      contactExt: undefined
    }

    this.customerDetailsObject = {
      customerFirstName: undefined,
      customerLastName: undefined,
      customerPhoneNumber: undefined
    }
    
  }


  componentWillReceiveProps(nextprops) {
    console.log("NEXT PROPS", nextprops)
    
    /*if(!nextprops.alterationComplete) {
      this.setState({alteration_success_modal: true})
      this.props.startSpinner(false);
      this.setState({alteration_success_modal: false})
    } */
    if(nextprops.cart.dataFrom === 'ALTERATION_SUCCESS') {
      /* debugger;
      this.startSpinner(false); */
      // TEMPORARY FIX UNTIL CUSTOMERDETAILS IS UPDATED
      if(this.state.firstname === '' || nextprops.otherPageData.details.mobile === '') {
        this.setState({customer_details_modal: true})
        this.props.startSpinner(false);
      }
      else {
        this.setState({alteration_success_modal: true})
        this.props.startSpinner(false);
      }
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
    console.log('Alterations Props before next',this.props);
    const isAlterationNextBtnEnabled = () => {
      console.log('Alterations Props after next',this.props);
      if (this.props.selectedItems.length >=1){return true};
      if (this.props.cart.dataFrom === 'LINE_VOID') return false;
      return false;
    }

    console.log('MIKE----------ALTERATION PROPS',this.props)
    console.log('state: ALTERATION', this.state.alteration_success_modal )
    return (
      <div>
        <Modal classNames={{modal: "contact-details-modal"}} open={this.state.contact_modal} onClose={() => this.setState({contact_modal: false})} closeOnOverlayClick={false}
    little showCloseIcon = {false}>
          <ContactDetailsModal
            closeModal={() => {this.exitModals()}}
            setObject={(value) => {this.setObject(value)}}
            alterationObject={this.alterationObject}
            contactNameErrorMsg={this.state.contactNameErrorMsg}
            contactExtErrorMsg={this.state.contactExtErrorMsg}
            changeModal={this.renderAlterationsModal}
          />
        </Modal>

        <Modal classNames={{modal: "alteration-details-modal"}} open={this.state.alterations_modal} onClose={() => this.setState({alterations_modal: false})} closeOnOverlayClick={false}
    little showCloseIcon = {false}>
          <AlterationDetailsModal 
            changeModal={this.props.otherPageData ? this.renderAlterationsSuccessModal : this.renderCustomerModal} 
            closeModal={() => this.setState({alterations_modal: false})}
            alterationsApiCall={(values) => {this.addToAlteration(values)}}
            setObject={(value) => {this.setObject(value)}}
            alterationObject={this.alterationObject}
            showCalendar={() => this.setState({showCalendar_Modal: true, alterations_modal: false})}
            />
        </Modal>

        <Modal classNames={{modal: "customer-details-modal"}} open={this.state.customer_details_modal}  closeOnOverlayClick={false} little showCloseIcon = {false}>
          <CustomerDetailsModal  
            changeModal={this.renderAlterationsSuccessModal}
            closeModal={() => {this.exitModals()}}
            addCustomerApiCall= {(values) => {this.addCustomer(values)}}
            setObject={(value) => {this.setObject(value)}}  
            customerDetailsObject={this.customerDetailsObject}
            alterationObject={this.alterationObject}
            />
        </Modal>

        {this.props.alterationComplete && <Modal classNames={{modal: "alteration-success-modal"}} open={this.state.alteration_success_modal} closeOnOverlayClick={false} little showCloseIcon = {false}>
          <AlterationSuccessModal
            closeModal={() => {this.props.resetAlterationComplete(); this.navigateToSale()
            }} />
        </Modal>}

        <Modal open={this.state.alteration_errorModal} little classNames={{ modal: 'sale-errorModal' }} >
        <div className='sale-errorModal-container'>
          <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
          <div className="sale-errorModal-text">Alteration already requested on item</div>
          <button className="sale-errorModal-button" onClick={() => { this.setState({ alteration_errorModal: false }) }}>
            <div className="sale-errorModal-button-text">CLOSE</div>
          </button>
        </div>

      </Modal>

        <Modal classNames={{modal: "invalid-tag-modal"}} open={this.state.invalidTag_modal} onClose={() => this.setState({invalid_modal: false})} closeOnOverlayClick={false} little showCloseIcon = 'false'>
          <InvalidAlterationTagModal
            closeModal={() => {this.exitModals()}}
          />
        </Modal>

        <Modal classNames={{modal: "res-error-modal"}} open={this.state.error_modal} onClose={() => this.setState({error_modal: false})} closeOnOverlayClick={false} little showCloseIcon = 'false'>
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
            {/* <div className="alterations-next" onClick={() => {this.renderAlterationsModal()}}><span className="alterations-next-text">Next</span></div> */}
            <div className={isAlterationNextBtnEnabled() ? 'alterations-next' : 'alterations-next-disabled'}
              onClick={() => {
                this.renderAlterationsModal();
              }}
            >
              <span className="giftwrap-next-text">NEXT</span>
            </div>
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
    let itemsList = pluck(this.props.cart.data.cartItems.items[index],'itemDesc');
    let trimmedList = itemsList.map(Function.prototype.call, String.prototype.trim);
    let alterationIndex = indexOf(trimmedList,'Alterations');
    if(alterationIndex !== -1){
      this.setState({alteration_errorModal:true});
    }else{
      this.props.itemSelectedAction(index);
    }  
  }

  addToAlteration = (values) => {
    
    console.log('VALUES FROM MODALS', values)
    this.setState({alterations_modal: false});
    
    // var apiDateFormat = values.promiseDate.split('/');
    // console.log('API DATE FORMAT', apiDateFormat);
    // console.log('API DATE FORMAT FIRST PARAM', apiDateFormat[0])
    // apiDateFormat[2] = apiDateFormat[2].slice(2);
    // //apiDateFormat = apiDateFormat.join('');
    
    var apiFormatDate = moment(values.promiseDate).format('MMDDYY');
    var finalApiDateFormat = apiFormatDate;

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
      "LineNumber": selectedItem.lineNumber,
      "PromisedDate": finalApiDateFormat,
      "QuotedPrice": this.alterationObject.quotedPrice,
      "AlterationTag": this.alterationObject.alterationID,
      "AlterationType" : "",
      "AssociateName" :"mmmm",
      "AssociateExtn": 1234567,
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
    const { contactExt, contactName } = this.alterationObject;

  /*  if(this.contactName == '' || this.contactName == undefined){
      this.setState({contactNameErrorMsg: "Please enter" });
      return;
    }
    if(contactExt == '' || contactExt == undefined){
      this.setState({contactExtErrorMsg : 'Please enter contact extension'});
      return;
    } */
    if(contactExt && contactExt.length < 4){
      this.setState({contactExtErrorMsg : 'Contact extension should be 4 digit'});
      return;
    }

    this.setState({
      alterations_modal: true,
      contact_modal: false,
      contactNameErrorMsg : '',
      contactExtErrorMsg : ''
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

  addCustomer = (values) => {
    // REMOVE FOR NOW
    // MORE INFORMATION NEEDED AS TO WHICH API TO CALL IF AT ALL
    //
    let addCustData = {
      ...clientConfig,
      "StoreAssoc":this.props.login.userpin,/* Hardcoded, to be removed */
      'CFirstName': this.customerDetailsObject.customerFirstName,
      'CLastName':this.customerDetailsObject.customerLastName,
      'Salutation ': '',
      'Address_Ln1': '',
      'Address_Ln2': '',
      'City': '',
      'Province': '',
      'Zip5': '',
      'CEmail':'',
      'Country': '',
      'CMobile': this.customerDetailsObject.customerPhoneNumber,
      'COther': '',
      'storeClientNo': '', /* Hardcoded, to be removed */
      'storeAssoc': '', /* Hardcoded, to be removed */
      'donotcall ': '',
      //'flagByPASS': bypassFlag
      'flagByPASS': "true"
  }
  console.log(addCustData)
  this.props.addCustomerActionInvoker(addCustData);
  }

}// end of class

function mapStateToProps({ alterationComplete, cart, sale, selectedItems,  }) {
  return { alterationComplete, 
           cart, 
           otherPageData: sale.otherPageData,
          //  customerDetails:customerDetails,
           selectedItems,
          //  addCustomer
          }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        addAlterations,
        resetAlterationComplete,
        startSpinner,
        itemSelectedAction,
        // addCustomerActionInvoker: addCustomerAction,
      }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Alterations);

