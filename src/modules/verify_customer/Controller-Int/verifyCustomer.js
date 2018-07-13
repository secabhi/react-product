
/* Importing the required libraries and plugins*/

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

/* Importing the local files*/
import UpdateCustomerInternational from '../.././update-customer/Controller-Int/updatecustomer-international';
import UpdateCustomerAction from '../.././update-customer/Controller-Int/UpdateCustomerInternationalActions';
import './verifyCustomer.css';
import { testAction } from './VerifyCustomerInternationalActions';

/* Importing the resource images and icons*/

import verifyicon from '../../../resources/images/Verify_White.svg';
import reseticon from '../../../resources/images/Reset_All.svg';

class VerifyCustomer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className="vercust-int-container">
                <div className="vercust-current-address-container">
                    <div className="vercust-current-address-title">Current</div>
                    <div className="vercust-current-address-content">
                        <div className="vercust-current-address-row1">
                            <div className="field1">
                                <div className="field1-salutation">
                                    <div className="field-title">Sal..</div>
                                    <div className="field-value">{this.props.currentAddress.update_int_salutation}</div>
                                </div>
                                <div className="field1-first-name">
                                    <div className="field-title">First Name</div>
                                    <div className="field-value">{this.props.currentAddress.update_int_fname}</div>
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Last Name</div>
                                <div className="field-value">{this.props.currentAddress.update_int_lname}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Mobile Phone</div>
                                <div className="field-value">{this.props.currentAddress.update_int_mobile}</div>
                            </div>
                        </div>
                        <div className="vercust-current-address-row2">
                            <div className="field1">
                                <div className="field-title">Address Line 1</div>
                                <div className="field-value">{this.props.currentAddress.update_int_address1}</div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Address Line 2</div>
                                <div className="field-value">{this.props.currentAddress.update_int_address2}</div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Other Phone</div>
                                <div className="field-value">{this.props.currentAddress.update_int_otherMobile}</div>
                            </div>
                        </div>
                        <div className="vercust-current-address-row3">
                            <div className="field1">
                                <div className="field-title">City</div>
                                <div className="field-value">{this.props.currentAddress.update_int_city}</div>
                            </div>
                            <div className="field2">
                                <div className="field2-province">
                                    <div className="field-title">Province</div>
                                    <div className="field-value">{this.props.currentAddress.update_int_province}</div>
                                </div>
                                <div className="field2-postal-code">
                                    <div className="field-title">Postal Code</div>
                                    <div className="field-value">{this.props.currentAddress.update_int_pincode}</div>
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Email Address</div>
                                <div className="field-value">{this.props.currentAddress.update_int_email}</div>
                            </div>
                        </div>
                        <div className="vercust-current-address-row4">
                            <div className="field1">
                                <div className="field-title">Country</div>
                                <div className="field-value">{this.props.currentAddress.update_int_country}</div>
                            </div>
                            <div className="field2"></div>
                            <div className="field3"></div>
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
                                    <div className="field-title">Sal..</div>
                                    <div 
                                        className={this.props.currentAddress.update_int_salutation!=this.props.changedAddress.update_int_salutation?"field-value changed-field":"field-value"}
                                    >
                                        {this.props.changedAddress.update_int_salutation}
                                    </div>
                                </div>
                                <div className="field1-first-name">
                                    <div className="field-title">First Name</div>
                                    <div 
                                        className={this.props.currentAddress.update_int_fname!=this.props.changedAddress.update_int_fname?"field-value changed-field":"field-value"}
                                    >
                                        {this.props.changedAddress.update_int_fname}
                                    </div>
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Last Name</div>
                                <div 
                                    className={this.props.currentAddress.update_int_lname!=this.props.changedAddress.update_int_lname?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_lname}
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Mobile Phone</div>
                                <div 
                                    className={this.props.currentAddress.update_int_mobile!=this.props.changedAddress.update_int_mobile?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_mobile}
                                </div>
                            </div>
                        </div>
                        <div className="vercust-changed-address-row2">
                            <div className="field1">
                                <div className="field-title">Address Line 1</div>
                                <div 
                                    className={this.props.currentAddress.update_int_address1!=this.props.changedAddress.update_int_address1?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_address1}
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field-title">Address Line 2</div>
                                <div 
                                    className={this.props.currentAddress.update_int_address2!=this.props.changedAddress.update_int_address2?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_address2}
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Other Phone</div>
                                <div 
                                    className={this.props.currentAddress.update_int_otherMobile!=this.props.changedAddress.update_int_otherMobile?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_otherMobile}
                                </div>
                            </div>
                        </div>
                        <div className="vercust-changed-address-row3">
                            <div className="field1">
                                <div className="field-title">City</div>
                                <div 
                                    className={this.props.currentAddress.update_int_city!=this.props.changedAddress.update_int_city?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_city}
                                </div>
                            </div>
                            <div className="field2">
                                <div className="field2-province">
                                    <div className="field-title">Province</div>
                                    <div 
                                    className={this.props.currentAddress.update_int_province!=this.props.changedAddress.update_int_province?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_province}
                                </div>
                                </div>
                                <div className="field2-postal-code">
                                    <div className="field-title">Postal Code</div>
                                    <div 
                                    className={this.props.currentAddress.update_int_pincode!=this.props.changedAddress.update_int_pincode?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_pincode}
                                </div>
                                </div>
                            </div>
                            <div className="field3">
                                <div className="field-title">Email Address</div>
                                <div 
                                    className={this.props.currentAddress.update_int_email!=this.props.changedAddress.update_int_email?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_email}
                                </div>
                            </div>
                        </div>
                        <div className="vercust-changed-address-row4">
                            <div className="field1">
                                <div className="field-title">Country</div>
                                <div 
                                    className={this.props.currentAddress.update_int_country!=this.props.changedAddress.update_int_country?"field-value changed-field":"field-value"}
                                >
                                    {this.props.changedAddress.update_int_country}
                                </div>
                            </div>
                            <div className="field2"></div>
                            <div className="field3"></div>
                        </div>
                    </div>
                </div>
                <div className="vercust-int-button-container">
                    <div className="vercust-int-return-button-container">
                        <img src={reseticon} alt="return-icon" className="vercust-int-return-button-icon" />
                        <div className="vercust-int-return-button-label" onClick={this.props.togglePopup}>RETURN TO EDIT</div>
                    </div>
                    <div className="vercust-int-confirm-button-container" onClick={
                        this.props.openModals
                    }>
                        <div className="vercust-int-confirm-button-label">NEXT</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ verifyCustomerInternational }) {
    return { verifyCustomerInternational }
  }
  
  function mapDispatchToProps(dispatch) {
    return { dispatch, testActionInvoker: () => dispatch(testAction()) };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(VerifyCustomer);