
/* Importing the required libraries and plugins*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing the resource images and icons*/

import verifyicon from '../../../resources/images/Verify_White.svg';
import reseticon from '../../../resources/images/Reset_All.svg';

/* Importing the local files*/

import './VerifyCustomerDomestic.css';
import { testAction } from './VerifyCustomerDomesticActions';
import { updateCustomerAction } from '../.././update-customer/Controller-Dom/UpdateCustomerAction';
import { parsePhoneNumber } from '../../common/helpers/helpers';


class VerifyCustomerDomestic extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }
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
         console.log('errors : '+JSON.stringify(nextProps.updateCustomer));
        console.log('Verify Customer: componentWillReceiveProps', nextProps);
        if(nextProps.updateCustomer.successModalFlag === true) {
            this.openSuccesModal();
        }
        if(nextProps.updateCustomer.addressValidationSuccessFlag === true) {
            this.cust_addr_validation_bypass = true;
            this.updateDomesticCustomerInvoker(true);
        }
        if(nextProps.updateCustomer.errors.length > 0) {
            console.log('test error');
            alert(JSON.stringify({errors : nextProps.updateCustomer.errors}));
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
            'storeAssoc': this.props.login.userpin,
            'donotcall ': this.props.cust_text_opt,            
            'flagByPASS': this.props.bypassFlag
        }
        this.props.updateCustomerActionInvoker(addCustDomData);
    }


    render() {
        return(
            <div className="vercust-dom-container">
                <div className="vercust-current-address-container">
                    <div className="vercust-current-address-title">Current</div>
                    <div className="vercust-current-address-content">
                        <div className="vercust-current-address-row1">
                            <div className="field1">
                                <div className="field1-salutation">
                                    <div className="field-title">Sal...</div>
                                    <div className="field-value">{this.props.currentAddress.cust_dom_salutation}</div>
                                </div>
                                <div className="field1-first-name">
                                    <div className="field-title">First Name</div>
                                    <div className="field-value">{this.props.currentAddress.cust_dom_fname}</div>
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Last Name</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_lname}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Mobile Phone</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_mobile}</div>
                            </div>
                        </div>
                        <div className="vercust-current-address-row2">
                            <div className="field1">
                                <div className="field-title">Address Line 1</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_address1}</div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Address Line 2</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_address2}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Other Phone</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_otherMobile}</div>
                            </div>
                        </div>
                        <div className="vercust-current-address-row3">
                            <div className="field1">
                                <div className="field-title">City</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_city}</div>
                            </div>
                            <div className="field2">
                                <div className="field2-province">
                                    <div className="field-title">State</div>
                                    <div className="field-value">{this.props.currentAddress.cust_dom_state}</div>
                                </div>
                                <div className="field2-postal-code">
                                    <div className="field-title">Zip</div>
                                    <div className="field-value">{this.props.currentAddress.cust_dom_zip}</div>
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Email Address</div>
                                <div className="field-value">{this.props.currentAddress.cust_dom_email}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vercust-divider"></div>
                <div className="vercust-changed-address-container">
                <div className="vercust-changed-address-title">Change To</div>
                    <div className="vercust-changed-address-content">
                        <div className="vercust-changed-address-row1">
                            <div className="field1">
                                <div className="field1-salutation">
                                    <div className="field-title">Sal...</div>
                                    <div 
                                        className={this.props.currentAddress.cust_dom_salutation!==this.props.selectedSalutation?"field-value changed-field":"field-value"}
                                    >
                                        {this.props.selectedSalutation}
                                    </div>
                                </div>
                                <div className="field1-first-name">
                                    <div className="field-title">First Name</div>
                                    <div 
                                    className={this.props.currentAddress.cust_dom_fname!==this.props.changedAddress.cust_dom_fname?"field-value changed-field":"field-value"}
                                    >{this.props.changedAddress.cust_dom_fname}</div>
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Last Name</div>
                                <div 
                                className={this.props.currentAddress.cust_dom_lname!==this.props.changedAddress.cust_dom_lname?"field-value changed-field":"field-value"}
                                >{this.props.changedAddress.cust_dom_lname}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Mobile Phone</div>
                                <div 
                                className={this.props.currentAddress.cust_dom_mobile!==this.props.changedAddress.cust_dom_mobile?"field-value changed-field":"field-value"}
                                >{this.props.changedAddress.cust_dom_mobile}</div>
                            </div>
                        </div>
                        <div className="vercust-changed-address-row2">
                            <div className="field1">
                                <div className="field-title">Address Line 1</div>
                                <div 
                                className={this.props.currentAddress.cust_dom_address1!==this.props.changedAddress.cust_dom_address1?"field-value changed-field":"field-value"}>
                                {this.props.changedAddress.cust_dom_address1}</div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Address Line 2</div>
                                <div 
                                className={this.props.currentAddress.cust_dom_address2!==this.props.changedAddress.cust_dom_address2?"field-value changed-field":"field-value"}>
                                {this.props.changedAddress.cust_dom_address2}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Other Phone</div>
                                <div 
                                className={this.props.currentAddress.cust_dom_otherMobile!==this.props.changedAddress.cust_dom_otherMobile?"field-value changed-field":"field-value"}>
                                {this.props.changedAddress.cust_dom_otherMobile}</div>
                            </div>
                        </div>
                        <div className="vercust-changed-address-row3">
                            <div className="field1">
                                <div className="field-title">City</div>
                                <div className={this.props.currentAddress.cust_dom_city!==this.props.changedAddress.cust_dom_city?"field-value changed-field":"field-value"}>
                                {this.props.changedAddress.cust_dom_city}</div>
                            </div>
                            <div className="field2">
                                <div className="field2-province">
                                    <div className="field-title">State</div>
                                    <div className={this.props.currentAddress.cust_dom_state!==this.props.dom_cust_state?"field-value changed-field":"field-value"}>
                                    {this.props.dom_cust_state}</div>
                                </div>
                                <div className="field2-postal-code">
                                    <div className="field-title">Zip</div>
                                    <div className={this.props.currentAddress.cust_dom_zip!==this.props.changedAddress.cust_dom_zip?"field-value changed-field":"field-value"}>
                                    {this.props.changedAddress.cust_dom_zip}</div>
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Email Address</div>
                                <div className={this.props.currentAddress.cust_dom_email!==this.props.changedAddress.cust_dom_email?"field-value changed-field":"field-value"}>
                                {this.props.changedAddress.cust_dom_email}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vercust-dom-button-container">
                    <div className="vercust-dom-return-button-container">
                        <img src={reseticon} alt="return-icon" className="vercust-dom-return-button-icon" />
                        <div className="vercust-dom-return-button-label" onClick={this.props.togglePopup}>RETURN TO EDIT</div>
                    </div>
                    
                    <div className="vercust-dom-confirm-button-container" 
                    onClick={//this.updateDomesticCustomerInvoker.bind(this,false)
                        this.props.openModals
                    }>
                        <div className="vercust-dom-confirm-button-label">NEXT</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ updateCustomer, login }) {
    return { updateCustomer, login };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateCustomerActionInvoker: updateCustomerAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCustomerDomestic);