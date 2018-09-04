import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';

/* Stylesheets and images*/
import './UpdateCustomerDomView.css';
import '../View/Styles/UpdateCustomerDomestic.css';
import { customStyle } from '../View/Styles/UpdateCustomerComponentStyle';
import backicon from '../../../resources/images/Back.svg';
import verifyicon from '../../../resources/images/Verify_White.svg';
import reseticon from '../../../resources/images/Reset_All.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';
import arrowDown from '../../../resources/images/Arrow_Down.svg';

/* Importing Modals */
import PhoneModal from '../../update-customer/View/Components/AlertModals/PhoneModal'
import TextOptModal from '../../update-customer/View/Components/AlertModals/TextOptModal'
import EmailModal from '../../update-customer/View/Components/AlertModals/EmailModal';
import { FailModal } from '../View/Components/AlertModals/FailModal';
import { UpdateInvalidEmailModal } from '../View/Components/AlertModals/UpdateInvalidEmailModal';
import { CustNotFound } from '../View/Components/AlertModals/CustNotFound';
import { AddrEmailModal } from '../View/Components/AlertModals/AddressModal';
import { ModifyPriceErrorModal } from '../../sale/modal-component/modalComponent';
import { UpdateFailedModal } from '../View/Components/AlertModals/UpdateFailedModal';
import SuccessModal from '../../update-customer/View/Components/AlertModals/SuccessModal';

/* Importing components */
import Popup from '../../popup/popup';
import VerifyCustomerDomestic from '../../verify_customer/View/VerifyCustomerDomView';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import {Salutation} from '../../add-customer/View/Components/Fields/Salutation';

export default class UpdateCustomerDomView extends Component {

    constructor(props) {
        super(props);
        this.state = {
                selectedCity : "",
                selectedCityDetails : {}
        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("UPDATECUSTOMERDOMVIEW COMPWILLRECPROPS NEXTPROPS: ", nextProps);
    }

    toggle = (index) => {
      if (this.state.selectedCity === index) {
          this.setState({ selectedCity: '', selectedCityDetails : {} })
          document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
      } else {
          this.setState({ selectedCity: index, selectedTransactionDetails :   this.props.citystateList[index] , selectedCityState : this.props.stateList[1]})
          document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = "1";
      }
  }

    render() {

        var selectedStyle = {
            background: "#4b2b6f"
        }
        var unselectedStyle = {
            background: "#FFFFFF"
        }
        var selectedTextStyle = {
            color : "#FFFFFF"
        }
        var unselectedTextStyle = {
            color : "#000000"
        }
        const ZipCodeOverrideText = "overwriting the city and state entered" 
        var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs>

                </defs>
                <path id="Arrow_Down" className="selectDropDownSvgIcon" d="M.8,185.8l22.9,22.9,23.1-22.9" transform="translate(-0.05 -185.05)" />
            </svg>
        );
        return (<div>

            {
                /**validate customer popup  */

                this.props.showPopup ?
                    <Popup text="Verify Update"
                        closePopup={this.props.togglePopup.bind(this)}>
                        <VerifyCustomerDomestic
                            togglePopup={this.props.togglePopup}
                            openModals={this.props.openModals}
                            closePhoneModal={this.props.closePhoneModal}
                            phoneModal={this.props.phoneModal}
                            textoptModal={this.props.textOptModal}
                            handleValidation={this.props.handleValidation}
                            isValid={this.props.isValid}
                            dom_cust_state={this.props.dom_cust_state}
                            dom_cust_country={this.props.dom_cust_country}
                            selectedSalutation={this.props.selectedSalutation}
                            bypassFlag={this.bypassFlag}
                            cust_text_opt={this.props.cust_text_opt}
                            state={this.props.sele}
                            currentAddress={this.props.currentAddress}
                            changedAddress={this.props.changedAddress} />

                    </Popup>
                    : null
                /**validate customer popup code close */

            }
            <Header history={this.props.history}></Header>
            <div className="update-cust-editprofile">
                <div className="update-intcust-editHeader">
                    <img src={backicon} className="update-intcust-backiconCls" onClick={this.props.goBacktoCustDetails} />
                    <h4 className="update-intcust-customertext-correction">Edit Profile</h4>
                </div>
            </div>


            <div className='update-customer-international'>
                <div className='update-custint-inputarea'>
                    <div className='update-custint-row1'>
                        <div className='field1'>
                        <Salutation salutationDataDrop = { this.props.salutationDataDrop }
                            selectedSalutation = {this.props.selectedSalutation}
                            handleSalutationChange = {this.props.handleSalutationChange} />
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="First Name*"
                                maxLength="14"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                onChange={this.props.handleChange.bind(this, 'cust_dom_fname')}
                                value={this.props.changedAddress['cust_dom_fname'].replace(/[^A-Za-z0-9&/.#]/ig, "")}
                                refs="cust_dom_fname"
                                errorText={this.props.errors["cust_dom_fname"]}
                                errorStyle={customStyle.errorStyle}
                                maxLength= {14}
                            />

                        </div>
                        <div className='field3'>
                            <TextField
                                type="text"
                                floatingLabelText="Last Name*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}

                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                onChange={this.props.handleChange.bind(this, 'cust_dom_lname')}
                                value={this.props.changedAddress['cust_dom_lname']}
                                refs="cust_dom_lname"
                                errorText={this.props.errors["cust_dom_lname"]}
                                errorStyle={customStyle.errorStyle}
                            />
                        </div>

                        <div className='field4'>
                            <TextField
                                type="number"
                                floatingLabelText="Mobile Phone"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}

                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs="cust_dom_mobile"
                                onChange={this.props.handleChange.bind(this, 'cust_dom_mobile')}
                                value={this.props.changedAddress["cust_dom_mobile"]}
                                errorText={this.props.errors["cust_phone1"]}
                                errorStyle={customStyle.errorStyle}
                            >
                                <InputMask
                                    refs="cust_dom_mobile"
                                    mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this, 'cust_dom_mobile')}
                                    value={this.props.changedAddress["cust_dom_mobile"]} />
                            </TextField>
                        </div>
                    </div>
                    <div className='update-custint-row2'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 1"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs="cust_dom_address1"
                                onChange={this.props.handleChange.bind(this, 'cust_dom_address1')}
                                value={this.props.changedAddress['cust_dom_address1']}
                                refs="updt_addressline1"
                                errorText={this.props.errors["cust_dom_address1"]}
                                errorStyle={customStyle.errorStyle}
                            />
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 2"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_dom_address2'
                                onChange={this.props.handleChange.bind(this, 'cust_dom_address2')}
                                value={this.props.changedAddress['cust_dom_address2']}
                            />
                        </div>
                        <div className='field3'>
                            <TextField
                                type="number"
                                floatingLabelText="Other Phone"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                onChange={this.props.handleChange.bind(this, 'cust_dom_otherMobile')}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_dom_otherMobile'
                            >
                                <InputMask mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this, 'cust_dom_otherMobile')}
                                    refs='cust_dom_otherMobile'
                                    value={this.props.changedAddress["cust_dom_otherMobile"]} />
                            </TextField>
                        </div>
                    </div>
                    <div className='update-custint-row3'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="City"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                errorText={this.props.errors["cust_dom_city"]}
                                errorStyle={customStyle.errorStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_dom_city'
                                onChange={this.props.handleChange.bind(this, 'cust_dom_city')}
                                value={this.props.changedAddress['cust_dom_city']}
                            />
                        </div>
                        <div className='field2'>
                        <SelectField
                        value={this.props.dom_cust_state}
                        onChange={this.props.handleCustStateChange}
                        floatingLabelText="State"
                        fullWidth={true}
                        errorText={this.props.errors["cust_dom_state"]}
                        errorStyle={customStyle.errorStyle}
                        floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                        style={customStyle.selectFieldStyle}
                        labelStyle={customStyle.selectFieldLabelStyle}
                        menuItemStyle={customStyle.selectFieldMenuItemStyle}
                        selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle}
                        iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '85.5px'
                        maxHeight={190.5}
                        dropDownMenuProps={{ iconButton: <img src={arrowDown} alt="arror-icon"/> }}
                        underlineStyle={customStyle.underlineStyle} >
                                {this.props.statesDataDrop.map((s, i) => {
                                    return (
                                        <MenuItem
                                            className="select-field-menu-item"
                                            key={i}
                                            value={s}
                                            primaryText={s} />
                                    )
                                 })}
                            </SelectField>
                        </div>
                        <div className='field3 zip_field'>
                            <TextField
                                type="text"
                                floatingLabelText="Zip"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                underlineStyle={customStyle.underlineStyle}
                                fullWidth={true}
                                maxLength="9"
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_dom_zip'
                                onChange={this.props.handleChange.bind(this, 'cust_dom_zip')}
                                onBlur={this.props.handleChange
                                    .bind(this, "cust_dom_zip_blur")}
                                value={this.props.changedAddress['cust_dom_zip'].replace(/[^0123456789]/ig, '')}
                                errorText={this.props.errors["cust_dom_zip"]}
                                errorStyle={customStyle.errorStyle}
                            />
                        </div>
                        <div className='field4'>
                            <TextField
                                type="email"
                                floatingLabelText="Email Address"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                underlineStyle={customStyle.underlineStyle}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_dom_email'
                                onChange={this.props.handleChange.bind(this, 'cust_dom_email')}
                                value={this.props.changedAddress['cust_dom_email']}
                                errorText={this.props.errors["cust_email"]}
                                errorStyle={customStyle.errorStyle}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                    this.props.togglePopup.bind(this);
                                    e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>

                </div>
                <div className="update-custint-buttonfooter">
                    <div className="update-custint-verifybtn-div">
                        <div className="update-custint-verifybtn" onClick={this.props.togglePopup.bind(this)} >
                            <img src={verifyicon} className="update-custint-clearicon" />VERIFY</div>
                    </div>
                    
                    <div className="update-custint-reset-div">
                        <div className="update-custint-resetbtn" onClick={this.props.resetAll}><img src={reseticon} className="update-custint-reseticon" />RESET ALL</div>
                    </div>
                </div>
            </div>
            <PhoneModal
                changedAddress={this.props.changedAddress}
                phoneModal={this.props.phoneModal}
                invokedFrom="updateCustomerDomestic"
                currentAddress={this.props.currentAddress}
                openTextOptModal={this.props.openTextOptModal}
                closePhoneModal={this.props.closePhoneModal}
            />
            <TextOptModal
                textoptModal={this.props.textoptModal}
                openEmailModal={this.props.emailModal}
                setCustTextOpt={this.props.setCustTextOpt}
                openEmailModal={this.props.openEmailModal}
            />
            <EmailModal
                emailModal={this.props.emailModal}
                openEmailModal={this.props.emailModal}
                closeEmailModal={this.props.closeEmailModal}
                invokedFrom="updateCustomerDomestic"
                currentAddress={this.props.currentAddress}
                changedAddress={this.props.changedAddress}
                updateDomesticCustomerInvoker={this.props.updateDomesticCustomerInvoker}
            />
            <AddrEmailModal
                addrEmailMOdal={this.props.addrEmailMOdal}
                closeaddrEmailMOdal={this.props.closeaddrEmailMOdal}
            />
            <SuccessModal
                succesModal={this.props.succesModal}
                selectedSalutation={this.props.selectedSalutation}
                currentAddress={this.props.currentAddress}
                changedAddress={this.props.changedAddress}
                invokedFrom="updateCustomerDomestic"
                closeSuccessModal={this.props.closeSuccessModal}
            />
            <FailModal failModal={this.props.failModal}
                closeFailModal={this.props.closeFailModal}
                bypassAddressValidation={this.props.bypassAddressValidation} />
            
            <UpdateInvalidEmailModal failModal1={this.props.failModal1}
                closeFailModal={this.props.closeFailModal}
                bypassEmailValidation={this.props.bypassEmailValidation} />

            <CustNotFound custNotFoundModal={this.props.custNotFoundModal} 
                closeNotFoundModal={this.props.closeNotFoundModal}/>
            
            <UpdateFailedModal failedToUpdateModal={this.props.failedToUpdateModal}
                closeFailedToUpdate={this.props.closeFailedToUpdate}/>

            <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
                    open={this.props.zipOverride}
                    onClose={() => { }}
                >
                    <ModifyPriceErrorModal
                        errorText={ZipCodeOverrideText}
                        showModifyErrorModal={this.props.closeZipOverideModal}
                    />
                </Modal>

            <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.props.cityModal} onClose={() => {

            }}>

                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a City</div>
                    </div>
                    <div className="postvoid-selectionarea">

                        {
                            this.props.citystateList.map(function (item, index) {
                                var rowObject = (
                                    <div style={(this.state.selectedCity === index) ? (selectedStyle) : (unselectedStyle)} onClick={() => this.toggle(index)} key={index} className="carditemlayoutinitial">
                                        <label style={(this.state.selectedCity === index) ? (selectedTextStyle) : (unselectedTextStyle)} className="labelcardlayout" >
                                            {item}
                                        </label>
                                    </div>
                                )
                                return (
                                    rowObject
                                );
                            }, this)
                        }

                        {/* <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'1234'}</label></div>
                            <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'12386784'}</label></div>
                            <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'1234634'}</label></div> */}


                    </div>
                    <div className='post-void-modalselect-button-area'>
                        <button className='post-void-modalselect-cancelbtn' onClick={this.props.cityModalClose} ><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={()  => this.props.populateCity(this.state.selectedTransactionDetails, this.state.selectedCityState)}><span className='post-void-ok-label' disabled>OK</span></button>
                    
                    </div>
                </div>

            </Modal>



            <Footer></Footer>

        </div >

        );
    }

}