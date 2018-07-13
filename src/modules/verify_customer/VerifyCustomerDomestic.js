
import React from 'react';
import './popup.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerifyCustomerDomestic from '../verify_customer/View/VerifyCustomerDomView';


export default class VerifyCustomerDom extends React.Component {
  render() 
  {
    openSuccesModal = () => {
        this.setState({
            emailModal: false
        });
        this.setState({
            phoneModal: false
        });
        this.setState({
            succesModal: true
        })
    }
     /* This method is invoked if any of the props changes, via reducer */
    
     componentWillReceiveProps = nextProps => {
        if(nextProps.updateCustomer.successModalFlag === true) {
            this.openSuccesModal();
        }
        if(nextProps.updateCustomer.addressValidationSuccessFlag === true) {
            this.cust_addr_validation_bypass = true;
            this.updateDomesticCustomerInvoker(true);
        }
        if(nextProps.updateCustomer.errors.length > 0) {
            this.setState({errors : nextProps.updateCustomer.errors});
        }
    }

    updateDomesticCustomerInvoker = (bypassFlag) => {
        let addCustDomData = {
            'ClientID': '0101:0169:04042018:033639',
            'ClientTypeID': '1000',
            'SourceApp': 'CMOS',
            'SourceLoc': 'NM-DIRECT',
            'CFirstName': this.props.changedAddress['cust_dom_fname'],
            'CLastName': this.props.changedAddress['cust_dom_lname'],
            'Salutation ': this.props.cust_dom_salutation,
            'Address_Ln1': this.props.changedAddress['cust_dom_address1'],
            'City': this.props.changedAddress['cust_dom_city'],
            'State_Abbr': this.props.dom_cust_state,
            'Zip5': this.props.changedAddress['cust_dom_zip'],
            'CEmail': this.props.changedAddress['cust_dom_email'],
            'Country': 'US',
            'CMobile': this.props.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, ""),
            'storeClientNo': '10000000257',
            'storeAssoc': '209289',
            'donotcall ': this.props.cust_text_opt,            
            'flagByPASS': this.props.bypassFlag
        }
        this.props.updateCustomerActionInvoker(addCustDomData);
    }
    return (
        <VerifyCustomerDomestic
        history = {this.props.history}             
        openModals = {this.props.openModals}
        phoneModal = {this.state.phoneModal}
        handleValidation={this.props.handleValidation}
        textoptModal = {this.state.textoptModal}                         
        emailModal = {this.state.emailModal}
        succesModal = {this.state.succesModal}
        failModal = {this.state.failModal}
        closePhoneModal = {this.closePhoneModal}
        openTextOptModal = {this.openTextOptModal}
        openEmailModal = {this.openEmailModal}
        setCustTextOpt = {this.setCustTextOpt}
        closeEmailModal = {this.closeEmailModal}
        updateInternationalCustomerInvoker = {this.props.updateCustomerActionInvoker}
        closeSuccessModal = {this.closeSuccessModal}
        closeFailModal = {this.closeFailModal}
        bypassAddressValidation = {this.bypassAddressValidation}
        closeaddrEmailMOdal = {this.closeaddrEmailMOdal}
        togglePopup = {this.togglePopup}
        addrEmailMOdal = {this.state.addrEmailMOdal}
        showPopup = {this.state.showPopup}
        isValid = {this.state.isValid}
        cust_text_opt = {this.state.cust_text_opt}
        currentAddress1 = {this.state.currentAddress1}
        changedAddress = {this.state.changedAddress}
        update_int_country = {this.state.update_int_country}
            />
    );
  }
}
  