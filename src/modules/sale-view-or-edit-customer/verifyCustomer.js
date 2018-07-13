
/* Importing the required libraries and plugins*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing the resource images and icons*/

import verifyicon from '../../resources/images/Verify_White.svg';
import reseticon from '../../resources/images/Reset_All.svg';

/* Importing the local files*/

//import { testAction } from './VerifyCustomerDomesticActions';
import { parsePhoneNumber } from '../common/helpers/helpers';
import './verifyCustomer.css';


export default class VerifyCustomerSale extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(<div>
            <div className="vercust-sale-container">
                <div className="vercust-sale-current-address-container">
                    <div className="vercust-sale-current-address-title">Current</div>
                    <div className="vercust-sale-current-address-content">
                            <div className="fields">
                                <div className="sale-verify-field1 salutation-verify-field">
                                    <div className="field-title">Sal...</div>
                                    <div className="field-value">{this.props.currentAddress.cust_salutation}</div>
                                </div>
                                <div className="sale-verify-field2 frist-name-verify-field">
                                    <div className="field-title">First Name</div>
                                    <div className="field-value">{this.props.currentAddress.cust_fname}</div>
                                </div>
                            </div>
                            <div className="field-sale-full last-name-verify-field">
                                <div className="field-title">Last Name</div>
                                <div className="field-value">{this.props.currentAddress.cust_lname}</div>
                            </div>
                            <div className="field-sale-full mobile-verify-field">
                                <div className="field-title">Mobile Phone</div>
                                <div className="field-value">{this.props.currentAddress.cust_mobile}</div>
                            </div>

                            <div className="field-sale-full address-line-1-field">
                                <div className="field-title">Address Line 1</div>
                                <div className="field-value">{this.props.currentAddress.cust_address1}</div>
                            </div>
                            <div className="field-sale-full address-line-2-verify-field">
                                <div className="field-title">Address Line 2</div>
                                <div className="field-value">{this.props.currentAddress.cust_address2}</div>
                            </div>
                            <div className="field-sale-full other-phone-verify-field">
                                <div className="field-title">Other Phone</div>
                                <div className="field-value">{this.props.currentAddress.cust_otherMobile}</div>
                            </div>

                            <div className="fields">
                                <div className="sale-verify-field1 city-verify-field">
                                    <div className="field-title">City</div>
                                    <div className="field-value">{this.props.currentAddress.cust_city}</div>
                                </div>
                                <div className="sale-verify-field2 salutation-verify-field">
                                    <div className="field-title">State</div>
                                    <div className="field-value">{this.props.currentAddress.cust_state}</div>
                                </div>
                            </div>
                            
                            <div className="field-sale-full email-verify-field">
                                <div className="field-title">Email Address</div>
                                <div className="field-value">{this.props.currentAddress.cust_email}</div>
                            </div>

                            <div className="field-sale-full zip-verify-field">
                                
                                    <div className="field-title">Zip</div>
                                    <div className="field-value">{this.props.currentAddress.cust_zip}</div>
                            </div>
                    </div>
                </div>
                <div className="vercust-sale-divider"></div>
                <div className="vercust-sale-changed-address-container">
                    <div className="vercust-sale-changed-address-title">Change To</div>
                    <div className="vercust-sale-changed-address-content">
                            <div className="fields">
                                <div className="sale-verify-field1 salutation-verify-field">
                                    <div className="field-title">Sal...</div>
                                    <div className={this.props.currentAddress.cust_salutation!==this.props.selectedSalutation?"field-value changed-field":"field-value"}>{this.props.selectedSalutation}</div>
                                </div>
                                <div className="sale-verify-field2 frist-name-verify-field">
                                    <div className="field-title">First Name</div>
                                    <div className={this.props.currentAddress.cust_fname!==this.props.changedAddress.cust_fname?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_fname}</div>
                                </div>
                            </div>
                            <div className="field-sale-full last-name-verify-field">
                                <div className="field-title">Last Name</div>
                                <div className={this.props.currentAddress.cust_lname!==this.props.changedAddress.cust_lname?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_lname}</div>
                            </div>
                            <div className="field-sale-full mobile-verify-field">
                                <div className="field-title">Mobile Phone</div>
                                <div className={this.props.currentAddress.cust_mobile!==this.props.changedAddress.cust_mobile?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_mobile}</div>
                            </div>

                            <div className="field-sale-full address-line-1-field">
                                <div className="field-title">Address Line 1</div>
                                <div className={this.props.currentAddress.cust_address1!==this.props.changedAddress.cust_address1?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_address1}</div>
                            </div>
                            <div className="field-sale-full address-line-2-verify-field">
                                <div className="field-title">Address Line 2</div>
                                <div className={this.props.currentAddress.cust_address2!==this.props.changedAddress.cust_address2?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_address2}</div>
                            </div>
                            <div className="field-sale-full other-phone-verify-field">
                                <div className="field-title">Other Phone</div>
                                <div className={this.props.currentAddress.cust_otherMobile!==this.props.changedAddress.cust_otherMobile?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_otherMobile}</div>
                            </div>

                            <div className="fields">
                                <div className="sale-verify-field1 city-verify-field">
                                    <div className="field-title">City</div>
                                    <div className={this.props.currentAddress.cust_city!==this.props.changedAddress.cust_city?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_city}</div>
                                </div>
                                <div className="sale-verify-field1 state-verify-field">
                                    <div className="field-title">State</div>
                                    <div className={this.props.currentAddress.cust_state!==this.props.dom_cust_state?"field-value changed-field":"field-value"}>{this.props.dom_cust_state}</div>
                                </div>
                            </div>
                            
                            <div className="field-sale-full email-verify-field">
                                <div className="field-title">Email Address</div>
                                <div className={this.props.currentAddress.cust_email!==this.props.changedAddress.cust_email?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_email}</div>
                            </div>

                                
                                <div className="field-sale-full zip-verify-field">
                                    <div className="field-title">Zip</div>
                                    <div className={this.props.currentAddress.cust_zip!==this.props.changedAddress.cust_zip?"field-value changed-field":"field-value"}>{this.props.changedAddress.cust_zip}</div>
                                </div>
                    </div>
                </div>

                
                

                
                
            </div>
            <div className="vercust-sale-button-container">
                    <div className="vercust-sale-return-button-container">
                        <div className="vercust-sale-return-button-label" onClick={this.props.togglePopup}>BACK</div>
                    </div>
                    
                    <div className="vercust-sale-confirm-button-container" 
                    onClick={//this.updateDomesticCustomerInvoker.bind(this,false)
                        this.props.openModals
                    }>
                        <div className="vercust-sale-confirm-button-label">CONFIRM</div>
                    </div>
                </div>
                </div>
        );
    }
}
