import React, { Component } from 'react';
import ServicesHeader from '../../sale/sale-services/services-common/ServicesHeader';
import ServicesFooter from '../../sale/sale-services/services-common/ServicesFooter';
import Modal from 'react-responsive-modal';
import { ContactDetailsModal, 
         AlterationDetailsModal, 
         CustomerDetailsModal, 
         AlterationSuccessModal,
         InvalidAlterationTagModal,
         ErrorModal
         } from '../../sale/sale-services/services-common/ServicesModals';

import '../../sale/sale-services/services-common/services-common.css';

import HomeHeader  from '../../home/home-header'
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer';

import SaleHeader from '../../sale/SaleHeader';
import SaleContent from '../../sale/SaleContent';

import './ResumeTransactions.css';
import backArrow from '../../../resources/images/Back.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAlterations, resetAlterationComplete } from './ResumeTransactionsActions';
import { startSpinner } from '../../common/loading/spinnerAction';
import { itemSelectedAction} from '../../common/cartRenderer/actions'
import { setCurrnetItem } from '../../sale/SalesCartAction';
import CartRenderer from '../../common/cartRenderer/cartRenderer';
import { productImgSearchAction } from '../../product-search/ProductSearchAction';

class ResumeTransactions extends Component {
  constructor(props) {
    super(props);

    this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
    this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
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
      items : []
    }

    this.alterationObject = {
      promiseDate: undefined,
      alterationID: undefined,
      quotedPrice: undefined,
      contactName: undefined,
      contactExt: undefined
    }
    
  }

  componentDidMount() {
    console.log('ResumeTransactions componentDidMount: ',this.props.resumeTransaction );
    if(this.props.resumeTransaction.dataFrom === 'UPDATE_IMAGES') {
      this.props.productImgSearchAction(this.props.resumeTransaction.productImages.imageUrls);
    }
    else if(this.props.resumeTransaction.dataFrom === 'RESUME_TRANSACTIONS_SUCCESS') {
      this.setState({ items : this.props.resumeTransaction.data.cartItems.items });
    }
    else if(this.props.resumeTransaction.dataFrom === 'UPDATED_IMAGES') {
      this.setState({
        items: this.props.resumeTransaction.data.cartItems.items
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('ResumeTransactions componentWillReceiveProps: ',nextProps.resumeTransaction)
    if(nextProps.resumeTransaction.dataFrom === 'UPDATE_IMAGES') {
      this.props.productImgSearchAction(nextProps.resumeTransaction.productImages.imageUrls);
    }
    else if(nextProps.resumeTransaction.dataFrom === 'RESUME_TRANSACTIONS_SUCCESS') {
      this.setState({ items : nextProps.resumeTransaction.data.cartItems.items });
    }
    else if(nextProps.resumeTransaction.dataFrom === 'UPDATED_IMAGES') {
      this.setState({
        items: nextProps.resumeTransaction.data.cartItems.items
      });
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
        
        <Header history={this.props.history} sale="true"/>
        <SaleHeader   
          pageName="Resume Transaction"
          salutation={this.state.salutation}
          firstName={this.state.firstname}
          lastName={this.state.lastname}
          currentLvl={this.currentlvl}
          skipCustomerInfo={this.state.isSkip}
          address1={this.state.address1}
          address2={this.state.address2}
        />
        <div>
          <div className="resume-transactions-content">
            <div className="resume-transactions-content-text">Is this the correct transaction?</div>
            {console.log("BEFORE CART RENDERER: ",this.state.items)}
            <CartRenderer
              style= {{boxShadow: 'none'}}
              items = {this.state.items}
              setCurrentItem = {this.setCurrentItem}
            />
          </div>

          <ServicesFooter>
            <div className="resume-transactions-no" onClick={() => {this.navigateToHome()}}><span className="alterations-cancel-text">NO</span></div>
            <div className="resume-transactions-yes" onClick={() => {this.navigateToSale()}}><span className="alterations-next-text">YES</span></div>
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

  navigateToHome =()=>{
    this.props.history.push('/')
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

function mapStateToProps({ resumeTransaction, cart, sale, selectedItems,  }) {
  return { resumeTransaction, 
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
        itemSelectedAction,        
        productImgSearchAction,
      }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeTransactions);
