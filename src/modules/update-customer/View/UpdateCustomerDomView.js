import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSpinner } from '../../common/loading/spinnerAction';
import Spinner from '../../common/loading/spinner';

import backicon from '../../../resources/images/Back.svg';
import verifyicon from '../../../resources/images/Verify_White.svg';
import reseticon from '../../../resources/images/Reset_All.svg';

import ReactTooltip from 'react-tooltip'
import cardicon from '../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../resources/images/Clear_All.svg';
import savebtn from '../../../resources/images/Save.svg';
import backarrow from '../../../resources/images/Back.svg';
import updatecustomer from '../../../resources/images/Add_Customer.svg';
import updatecustomerselected from '../../../resources/images/Add_Customer_Selected.svg';
import updateintcustomer from '../../../resources/images/Add_International_Customer.svg';
import updateintcustomerselected from '../../../resources/images/Add_International_Customer_Selected.svg';
import PhoneModal from '../../update-customer/View/Components/AlertModals/PhoneModal'
import TextOptModal from '../../update-customer/View/Components/AlertModals/TextOptModal'
import EmailModal from '../../update-customer/View/Components/AlertModals/EmailModal';
import {FailModal} from '../View/Components/AlertModals/FailModal'
import {AddrEmailModal} from '../View/Components/AlertModals/AddressModal'
import './UpdateCustomerDomView.css';
import Modal from 'react-responsive-modal';

import phonemodalicon from '../../../resources/images/Confirm_Phone.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';
import tickicon from '../../../resources/images/Tick_White.svg';

import emailmodalicon from '../../../resources/images/Confirm_Email.svg';

import erroricon from '../../../resources/images/Error_Red.svg';
import editIcon from '../../../resources/images/Edit_Profile.svg';
import info from '../../../resources/images/Info.svg';


import arrowDown from '../../../resources/images/Arrow_Down.svg';

import Popup from '../../popup/popup';
import VerifyCustomerDomestic from '../../verify_customer/View/VerifyCustomerDomView';

import SelectField from 'material-ui/SelectField';
import SvgIcon from 'material-ui/SvgIcon';
 
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import { parsePhoneNumber } from '../../common/helpers/helpers';

import '../View/Styles/UpdateCustomerDomestic.css';
import {customStyle} from '../View/Styles/UpdateCustomerComponentStyle';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import SuccessModal from '../../update-customer/View/Components/AlertModals/SuccessModal';
export default class UpdateCustomerDomView extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("UPDATECUSTOMERDOMVIEW COMPWILLRECPROPS NEXTPROPS: ", nextProps);
    }

    render() {

           var Dropdownicon = (props) => (
            
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs>
                
                </defs>
                <path id="Arrow_Down" className="selectDropDownSvgIcon" d="M.8,185.8l22.9,22.9,23.1-22.9" transform="translate(-0.05 -185.05)"/>
                </svg>
           );
        return (<div>
            
                {
                    /**validate customer popup  */
                   
                    this.props.showPopup?
                    <Popup text="Verify Update"
                            closePopup={this.props.togglePopup.bind(this)}>
                            <VerifyCustomerDomestic 
                            togglePopup = {this.props.togglePopup}
                            openModals = {this.props.openModals}
                            closePhoneModal={this.props.closePhoneModal}
                            phoneModal = {this.props.phoneModal}
                            textoptModal={this.props.textOptModal}
                            handleValidation={this.props.handleValidation}
                            isValid = {this.props.isValid}
                            dom_cust_state={this.props.dom_cust_state}
                            dom_cust_country = {this.props.dom_cust_country}
                            selectedSalutation = {this.props.selectedSalutation}
                            bypassFlag={this.bypassFlag} 
                            cust_text_opt={this.props.cust_text_opt} 
                            state={this.props.sele}
                            currentAddress={this.props.currentAddress} 
                            changedAddress = {this.props.changedAddress}/>

                    </Popup>
                    :null
                    /**validate customer popup code close */

                }
                <Header history={this.props.history}></Header>
                <div className="update-cust-editprofile">
                    <div className="update-intcust-editHeader">
                        <img src={backicon} className="update-intcust-backiconCls" onClick={this.props.goBacktoCustDetails}/>
                        <h4 className="update-intcust-customertext-correction">Edit Profile</h4>
                    </div>
                </div>
               

        <div className='update-customer-international'>
          <div className='update-custint-inputarea'>
                    <div className='update-custint-row1'>
                        <div className='field1'>
                            <SelectField
                            
                                floatingLabelText="Sal..."
                                dropDownMenuProps={{
                                    
                                    iconButton:<Dropdownicon/>,
                               }}
                                fullWidth = {true}
                                underlineStyle = {customStyle.underlineStyle}

                                floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                                style = {customStyle.selectFieldStyle}
                                labelStyle = {customStyle.selectFieldLabelStyle}
                                menuItemStyle = {customStyle.selectFieldMenuItemStyle}
                                selectedMenuItemStyle = {customStyle.selectFieldMenuItemStyle}
                                iconStyle = {customStyle.selectFieldIconStyle}
                                maxHeight = {190.5}
                                onChange={this.props.handleSalutationChange}
                                value={this.props.selectedSalutation}                               
                            >
                                
                                {
                                    this.props.salutationDataDrop.map(function(item, i){
                                         return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                              })
                                }
                            </SelectField>
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="First Name*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}
                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                onChange={this.props.handleChange.bind(this,'cust_dom_fname')} 
                                value={this.props.changedAddress['cust_dom_fname']}
                                refs="cust_dom_fname"
                                errorText= {this.props.errors["cust_dom_fname"]}
                                 errorStyle ={customStyle.errorStyle}
                                
                            />
                            
                        </div>
                        <div className='field3'>
                            <TextField
                                type="text"
                                floatingLabelText="Last Name*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}

                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                onChange={this.props.handleChange.bind(this,'cust_dom_lname')} 
                                value={this.props.changedAddress['cust_dom_lname']}
                                refs="cust_dom_lname"
                                errorText= {this.props.errors["cust_dom_lname"]}
                                 errorStyle ={customStyle.errorStyle}
                            />
                        </div>
                        
                        <div className='field4'>
                                <TextField
                                    type="number"
                                    floatingLabelText="Mobile Phone"
                                    floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                    style = {customStyle.textFieldStyle}
                                    underlineStyle = {customStyle.underlineStyle}

                                    fullWidth = {true}
                                    inputStyle = {customStyle.textFieldInputStyle}
                                    refs="cust_dom_mobile"
                                    onChange={this.props.handleChange.bind(this,'cust_dom_mobile')}
                                    value={this.props.changedAddress["cust_dom_mobile"]}
                                    errorText= {this.props.errors["cust_phone1"]}
                                    errorStyle ={customStyle.errorStyle}
                                >
                                <InputMask 
                                refs="cust_dom_mobile"
                                mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this,'cust_dom_mobile')}
                                value={this.props.changedAddress["cust_dom_mobile"]}/>
								</TextField>
                            </div>
                    </div>
                    <div className='update-custint-row2'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 1*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}
                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs="cust_dom_address1"
                                onChange={this.props.handleChange.bind(this,'cust_dom_address1')}
                                value={this.props.changedAddress['cust_dom_address1']}
                                refs="updt_addressline1"
                                errorText= {this.props.errors["cust_dom_address1"]}
                                errorStyle ={customStyle.errorStyle}
                            />
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 2"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}
                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs= 'cust_dom_address2'
                                onChange={this.props.handleChange.bind(this,'cust_dom_address2')}
                                value={this.props.changedAddress['cust_dom_address2']}
                            />
                        </div>
                        <div className='field3'>
                            <TextField
                                type="number"
                                floatingLabelText="Other Phone"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}
                                onChange={this.props.handleChange.bind(this,'cust_dom_otherMobile')}
                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs= 'cust_dom_otherMobile'
                            >
                                 <InputMask mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this,'cust_dom_otherMobile')}
                                 refs= 'cust_dom_otherMobile'
                                value={this.props.changedAddress["cust_dom_otherMobile"]}/>
                            </TextField>
                        </div>
                    </div>
                    <div className='update-custint-row3'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="City"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}

                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs= 'cust_dom_city'
                                onChange={this.props.handleChange.bind(this,'cust_dom_city')} 
                                value={this.props.changedAddress['cust_dom_city']}
                            />
                        </div>
                        <div className='field2'>
                            <SelectField
                                floatingLabelText="State"
                                dropDownMenuProps={{
                                    
                                    iconButton:<Dropdownicon/>,
                               }}
                                fullWidth = {true}
                                underlineStyle = {customStyle.underlineStyle}

                                floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                                style = {customStyle.selectFieldStyle}
                                labelStyle = {customStyle.selectFieldLabelStyle}
                                menuItemStyle = {customStyle.selectFieldMenuItemStyle}
                                selectedMenuItemStyle = {customStyle.selectFieldMenuItemStyle}
                                iconStyle = {customStyle.selectFieldIconStyle}
                                maxHeight = {190.5}
                                refs= 'cust_dom_state'
                                onChange={this.props.handleCustStateChange} 
                                value={this.props.dom_cust_state}
                                errorText= {this.props.invlaid_cust_dom_state}
                                errorStyle ={customStyle.errorStyle}
                            >
                                {/* <MenuItem className="select-field-menu-item" key={1} value={"NY"} primaryText="NY" />
                                <MenuItem className="select-field-menu-item" key={2} value={"TX"} primaryText="TX" /> */}

                                
                                    {this.props.statesDataDrop.length>0?                                     
                                
                                    this.props.statesDataDrop.map(function(item, i){
                                         return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                              }):''
                                            }
                                
                            </SelectField>
                        </div>
                        <div className='field3 zip_field'>
                            <TextField
                                type="text"
                                floatingLabelText="Zip"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                underlineStyle = {customStyle.underlineStyle}
                                fullWidth = {true}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs= 'cust_dom_zip'
                                onChange={this.props.handleChange.bind(this,'cust_dom_zip')} 
                                value={this.props.changedAddress['cust_dom_zip'].replace(/[^0-9]/g, '')}
                                errorText= {this.props.invlaid_cust_dom_zip}
                                errorStyle ={customStyle.errorStyle}

                            />
                        </div>
                        <div className='field4'>
                            <TextField
                                type="email"
                                floatingLabelText="Email Address"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style = {customStyle.textFieldStyle}
                                fullWidth = {true}
                                underlineStyle = {customStyle.underlineStyle}
                                inputStyle = {customStyle.textFieldInputStyle}
                                refs= 'cust_dom_email'
                                onChange={this.props.handleChange.bind(this,'cust_dom_email')} 
                                value={this.props.changedAddress['cust_dom_email']}
                                errorText= {this.props.errors["cust_email"]}
                                errorStyle ={customStyle.errorStyle}
                            />
                        </div>
                    </div>

                    </div>
                    <div className="update-custint-buttonfooter">
                    <div className="update-custint-verifybtn-div">                    
                        <button className="update-custint-verifybtn" 
                        onClick={this.props.togglePopup.bind(this)
                        }
                        
                        >
                        
                        <img src={verifyicon} className="update-custint-clearicon" />VERIFY</button>
                    </div>
                    <div className="update-custint-reset-div">
                        <button className="update-custint-resetbtn"  onClick={this.props.resetAll}><img src={reseticon} className="update-custint-reseticon" />RESET ALL</button>
                    </div>
                </div>
                </div>
                <PhoneModal 
                    changedAddress = {this.props.changedAddress}
                    phoneModal = {this.props.phoneModal}
                    invokedFrom = "updateCustomerDomestic"
                    currentAddress={this.props.currentAddress}
                    openTextOptModal = {this.props.openTextOptModal}
                    closePhoneModal={this.props.closePhoneModal}
                 />
                 <TextOptModal 
                    textoptModal={this.props.textoptModal}
                    openEmailModal= {this.props.emailModal}
                    setCustTextOpt={this.props.setCustTextOpt}
                    openEmailModal={this.props.openEmailModal}
                 />
                 <EmailModal  
                    emailModal={this.props.emailModal}
                    openEmailModal= {this.props.emailModal}
                    closeEmailModal={this.props.closeEmailModal}
                    invokedFrom = "updateCustomerDomestic"
                    currentAddress={this.props.currentAddress}
                    changedAddress = {this.props.changedAddress}
                    updateDomesticCustomerInvoker = {this.props.updateDomesticCustomerInvoker}
                />
                <AddrEmailModal
                    addrEmailMOdal = {this.props.addrEmailMOdal}
                    closeaddrEmailMOdal = {this.props.closeaddrEmailMOdal}
                />
                 <SuccessModal
                succesModal={this.props.succesModal}
                selectedSalutation={this.props.selectedSalutation}
                currentAddress={this.props.currentAddress}
                changedAddress = {this.props.changedAddress}
                invokedFrom = "updateCustomerDomestic"
                closeSuccessModal={this.props.closeSuccessModal}
                />
                <FailModal failModal = {this.props.failModal}
                     closeFailModal = {this.props.closeFailModal} 
                    bypassAddressValidation = {this.props.bypassAddressValidation}/>

                <Footer></Footer>

            </div >
       
        );
    }

}