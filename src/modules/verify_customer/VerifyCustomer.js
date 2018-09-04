
import React from 'react';
import './popup.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerifyCustomer from '../verify_customer/View/VerifyCustomerIntView';
const CONFIG_FILE = require('../../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;

export default class VerifyCustomerInt extends React.Component {
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
            ...clientConfig,
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
            'storeAssoc': this.props.login.userpin,
            'donotcall ': this.props.cust_text_opt,            
            'flagByPASS': this.props.bypassFlag
        }
        this.props.updateCustomerActionInvoker(addCustDomData);
    }
    return (
        <VerifyCustomer
        history = {this.props.history}             
        openModals = {this.openModals}
        phoneModal = {this.state.phoneModal}
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

function mapStateToProps({ login }) {
    return { login };
}

export default connect(mapStateToProps)(VerifyCustomerInt);