import ReactTooltip from 'react-tooltip'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
// import { startSpinner } from '../common/loading/spinnerAction';
// import Spinner from '../common/loading/spinner';
import backArrowWhite from '../../../resources/images/Back_White.svg';
import profileselected from '../../../resources/images/Profile_Selected.svg';
import profileunselected from '../../../resources/images/Profile.svg';
import remainderselected from '../../../resources/images/Reminder.svg';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField/SelectField';
import cardicon from '../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../resources/images/Close_Bttn_Purple.svg';
import VerifyCustomerDomestic from '../../verify_customer/View/VerifyCustomerDomView';
import VerifyCustomer from '../../verify_customer/View/VerifyCustomerIntView';


import './alert-popups.css';

import savebtn from '../../../resources/images/Save.svg';
import incircle_purple_large_bttn from '../../../resources/images/Incircle_Level_purple_large_bttn.svg';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import IconButton from 'material-ui/IconButton';
//import Popup from '../../popup/popup';
import Popup from './popup';
import Modal from 'react-responsive-modal';
import editIcon from '../../../resources/images/Edit_Profile.svg';
import phonemodalicon from '../../../resources/images/Confirm_Phone.svg';
import erroricon from '../../../resources/images/Error_Red.svg';
import tickicon from '../../../resources/images/Tick_White.svg';
import textopticon from '../../../resources/images/Text_Opt_In.svg';
import emailmodalicon from '../../../resources/images/Confirm_Email.svg';
import info from '../../../resources/images/Info.svg';
import updatecustsuccessicon from '../../../resources/images/Success_Green.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';
import AddCardButton from '../../add-card-button/add-card-button';
import VerifyCustomerSale from './verifyCustomer';

import './vieweditCustomerStyle.css';

export default class ViewEditCustomerView extends Component {
    constructor(props) {
        super(props);
        this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;
        this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
        this.totalpoints = parseInt(this.inCircleInfo.total_points);
        this.pointsToNextLvl = this.nextLvl - this.totalpoints;
    }


    render() {
        var selectFieldFloatingLabelStyle = {
            height: '28px',
            fontSize: '30px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'left',
            textOverflow: 'initial',
            color: '#828282'
        }

        var selectFieldStyle = {
            height: '90px',
            textOverflow: 'initial'
        }
        var selectFieldLabelStyle = {
            height: '37px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textOverflow: 'initial',
            lineHeight: '1.19',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingTop: '20px',
            paddingBottom: '4.5px',
            paddingLeft: '13px'
        }

        var selectFieldMenuItemStyle = {
            height: '60px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textOverflow: 'initial',
            fontStretch: 'normal',
            lineHeight: '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#505050',
            padding: '15px 0px'

        }
        var selectFieldValue = {
            textOverflow: 'initial'

        }
        var selectFieldIconStyle = {
            fontSize: '40px',
            marginLeft: '10px',
            right: '-9px'

        }
        var menuStyle = {
            overflowY: 'auto'
        }
        var textFieldFloatingLabelStyle = {
            height: '28px',
            fontSize: '30px',
            fontWeight: '300',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            lineHeight: '1.21',
            textAlign: 'left',
            color: '#828282'
        }

        var textFieldStyle = {
            height: '61px',
            paddingTop: '31px'
        }

        var textFieldInputStyle = {
            height: '37px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            lineHeight: '1.19',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingBottom: '4.5px',
            paddingLeft: '13px'
        }

        var errorStyle = {
            paddingTop: '15px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'rigth',
            color: '#d53560'
        }
        var underlineStyle = {
            backgroundColor: '#828282',
            height: '0.8px'
        }
        var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs>



                </defs>
                <path id="Arrow_Down" className="selectDropDownSvgIcon" d="M.8,185.8l22.9,22.9,23.1-22.9" transform="translate(-0.05 -185.05)" />
            </svg>
        );
        if (this.props.userType == 'int') {
            var currentAddress = {
                update_int_salutation: this.props.currentAddress.cust_dom_salutation, //(profile.personNames && profile.personNames.length > 0) ? profile.personNames[0].salutation : '',
                update_int_fname: this.props.currentAddress.cust_dom_fname,
                update_int_lname: this.props.currentAddress.cust_dom_lname,
                update_int_address1: this.props.currentAddress.cust_dom_address1, //(profile.addresses && profile.addresses.length > 0) ? profile.addresses[0] : '',
                update_int_address2: this.props.currentAddress.cust_dom_address2, //(profile.addresses && profile.addresses.length > 1) ? profile.addresses[1] : '',
                update_int_mobile: this.props.currentAddress.cust_dom_mobile,
                update_int_email: this.props.currentAddress.cust_dom_email,
                update_int_otherMobile: this.props.currentAddress.cust_dom_otherMobile,
                update_int_city: this.props.currentAddress.cust_dom_city, //Need to know the object structure
                update_int_country: this.props.currentAddress.cust_dom_country, //Need to know the object structure
                update_int_pincode: this.props.currentAddress.cust_dom_postal, //Need to know the object structure
                update_int_province: this.props.currentAddress.cust_dom_province, //province need to be changed
                CCssNo: this.props.currentAddress.CCssNo
            }
            console.log('currentAddress in view' + JSON.stringify(currentAddress));
            var changedAddress = {
                update_int_salutation: this.props.changedAddress.cust_dom_salutation, //(profile.personNames && profile.personNames.length > 0) ? profile.personNames[0].salutation : '',
                update_int_fname: this.props.changedAddress.cust_dom_fname,
                update_int_lname: this.props.changedAddress.cust_dom_lname,
                update_int_address1: this.props.changedAddress.cust_dom_address1, //(profile.addresses && profile.addresses.length > 0) ? profile.addresses[0] : '',
                update_int_address2: this.props.changedAddress.cust_dom_address2, //(profile.addresses && profile.addresses.length > 1) ? profile.addresses[1] : '',
                update_int_mobile: this.props.changedAddress.cust_dom_mobile,
                update_int_email: this.props.changedAddress.cust_dom_email,
                update_int_otherMobile: this.props.changedAddress.cust_dom_otherMobile,
                update_int_city: this.props.changedAddress.cust_dom_city, //Need to know the object structure
                update_int_country: this.props.changedAddress.cust_dom_country, //Need to know the object structure
                update_int_pincode: this.props.changedAddress.cust_dom_postal, //Need to know the object structure
                update_int_province: this.props.changedAddress.cust_dom_province, //province need to be changed
                CCssNo: this.props.changedAddress.CCssNo
            }
        }
        return (
            <div className="view-edit-cust-sff-main">

                {
                    /**validate customer popup  */

                    this.props.showPopup ?
                        <Popup className="verifycust-pop-sff" text="Verify Update"
                            closePopup={this.props.openVerifyPopup.bind(this)}>
                            <VerifyCustomerSale
                                togglePopup={this.props.openVerifyPopup}
                                openModals={this.props.openModals}
                                isValid={this.props.isValid}
                                dom_cust_state={this.props.cust_dom_state}
                                dom_cust_country={this.props.cust_dom_country}
                                selectedSalutation={this.props.selectedSalutation}
                                cust_text_opt={this.props.cust_text_opt}
                                state={this.props.changedAddress['cust_dom_state']}
                                currentAddress={this.props.currentAddress}
                                changedAddress={this.props.changedAddress} />
                        </Popup>
                        : null
                    /**validate customer popup code close */

                }

                <Header history={this.props.history}></Header>
                <div className="view-editprofile">
                    <div className="view-editprofile-header">
                        <img src={backArrowWhite} className="backiconCls" onClick={this.props.navigateToCustomerSearch}/>
                        <div className="sff-devider"></div>
                        <h4 className="customer-name">{(this.props.changedAddress['cust_dom_fname'] != "") ? (this.props.changedAddress['cust_dom_salutation'] + ((this.props.changedAddress['cust_dom_salutation'] != "") ? '.' : "")) : ""} {this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])} {this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])}</h4>
                    </div>
                </div>

                <div className='editcust-subheader-container'>
                    <div className='edit-customer-tab-header' onClick={this.props.switchToEdit}>
                        <img src={profileselected} className='edit-customer-icon' alt="edit-customer-icon" />
                        <div className='edit-customer-label selected-tab-label'>Profile</div>
                    </div>
                    <div className='reminders-tab-header' onClick={this.props.switchToRemainders}>
                        <img src={this.props.reminderselect} className='reminders-icon' alt="reminders-icon" />
                        <Badge className="view-edit-sale-cust-badge"
                            badgeContent={3}
                            secondary={true}
                            badgeStyle={{ top: 14, right: 29, width: 48, height: 48 }}
                        >
                        </Badge>
                        <div className='reminders-label'>Reminders</div>
                    </div>
                    <div className='tab-header-spacer'>
                    </div>
                </div>

                <div className='view-edit-customer-sale'>
                    <div className='tab-content'>
                        <div>
                            <div className="edit-cust-sale-addcard">
                                <AddCardButton />
                            </div>
                            <div className='view-edit-customer-inputarea'>
                                <div className='row1-fields fields2'>
                                    <div className='field1 first-name-field'>
                                        <SelectField
                                            floatingLabelText="Sal..."
                                            refs="cust_dom_salutation"
                                            dropDownMenuProps={{

                                                iconButton: <Dropdownicon />,
                                            }}
                                            fullWidth={true}
                                            underlineStyle={underlineStyle}

                                            floatingLabelStyle={selectFieldFloatingLabelStyle}
                                            style={selectFieldStyle}
                                            labelStyle={selectFieldLabelStyle}
                                            menuItemStyle={selectFieldMenuItemStyle}
                                            selectedMenuItemStyle={selectFieldMenuItemStyle}
                                            iconStyle={selectFieldIconStyle}
                                            maxHeight='190.5px'
                                            maxWidth='150px'
                                            value={this.props.changedAddress['cust_dom_salutation']}
                                            onChange={this.props.handleSalutationChange.bind(this, "cust_dom_salutation")}

                                        >

                                            {
                                                this.props.salutationDataDrop.map(function (item, i) {
                                                    return <MenuItem className="select-field-menu-item" key={i} value={item.Value} primaryText={item.Value} />;
                                                })
                                            }
                                        </SelectField>
                                    </div>
                                    <div className='field2'>
                                        <TextField
                                            type="text"
                                            floatingLabelText="First Name*"
                                            floatingLabelStyle={textFieldFloatingLabelStyle}
                                            style={textFieldStyle}
                                            underlineStyle={underlineStyle}

                                            fullWidth={true}
                                            inputStyle={textFieldInputStyle}
                                            refs="cust_dom_fname"
                                            errorText={this.props.errors["cust_dom_fname"]}
                                            onChange={this.props.handleChange.bind(this, "cust_dom_fname")}
                                            value={this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])}
                                            errorStyle={errorStyle}

                                        />

                                    </div>
                                </div>
                                <div className='last-name-field full-field'>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Last Name*"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}

                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                        value={this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])}
                                        errorText={this.props.errors["cust_dom_lname"]}
                                        onChange={this.props.handleChange.bind(this, "cust_dom_lname")}
                                        refs="cust_dom_lname"
                                        errorStyle={errorStyle}



                                    />
                                </div>
                                <div className='mobile-phone-field full-field'>
                                    <TextField
                                        type="number"
                                        floatingLabelText="Mobile Phone"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}

                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                        refs="cust_dom_mobile"
                                        onChange={this.props.handleChange.bind(this, "cust_dom_mobile")}
                                        value={this.props.changedAddress['cust_dom_mobile']}
                                        errorStyle={errorStyle}
                                    >
                                        <InputMask mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this, "cust_dom_mobile")} value={this.props.changedAddress['cust_dom_mobile']} />
                                    </TextField>
                                </div>
                                <div className='other-phone-filed full-field'>
                                    <TextField
                                        type="number"
                                        value={this.props.changedAddress['cust_dom_otherMobile']}
                                        onChange={this.props.handleChange.bind(this, "cust_dom_otherMobile")}
                                        floatingLabelText="Other Phone"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}

                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                        refs='cust_dom_otherMobile'
                                    >
                                        <InputMask mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this, "cust_dom_otherMobile")}
                                            value={this.props.changedAddress['cust_dom_otherMobile']} />
                                    </TextField>
                                </div>
                                <div className='address-line-1-field full-field'>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Address Line 1*"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}

                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                        refs="cust_dom_address1"
                                        onChange={this.props.handleChange.bind(this, "cust_dom_address1")}
                                        value={this.props.changedAddress['cust_dom_address1']}
                                        errorText={this.props.errors["cust_dom_address1"]}
                                        errorStyle={errorStyle}
                                    />
                                </div>
                                <div className='address-line-2-field full-field'>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Address Line 2"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}

                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                        onChange={this.props.handleChange.bind(this, "cust_dom_address2")}
                                        value={this.props.changedAddress['cust_dom_address2']}
                                        refs='cust_dom_address2'
                                    />
                                </div>

                                <div className="row8 fields2">
                                    <div className='city-field field1'>
                                        <TextField
                                            type="text"
                                            floatingLabelText="City"
                                            floatingLabelStyle={textFieldFloatingLabelStyle}
                                            style={textFieldStyle}
                                            underlineStyle={underlineStyle}

                                            fullWidth={true}
                                            inputStyle={textFieldInputStyle}
                                            refs='cust_dom_city'
                                            onChange={this.props.handleChange.bind(this, "cust_dom_city")}
                                            value={this.props.changedAddress['cust_dom_city']}
                                            errorText={this.props.errors["cust_dom_city"]}
                                            errorStyle={errorStyle}
                                        />
                                    </div>
                                    <div className='state-field field2'>
                                        {this.props.userType != 'int' ?
                                            <SelectField
                                                floatingLabelText="State"
                                                dropDownMenuProps={{

                                                    iconButton: <Dropdownicon />,
                                                }}
                                                fullWidth={true}
                                                underlineStyle={underlineStyle}

                                                floatingLabelStyle={selectFieldFloatingLabelStyle}
                                                style={selectFieldStyle}
                                                labelStyle={selectFieldLabelStyle}
                                                menuItemStyle={selectFieldMenuItemStyle}
                                                selectedMenuItemStyle={selectFieldMenuItemStyle}
                                                iconStyle={selectFieldIconStyle}
                                                maxHeight='190.5px'
                                                refs='cust_dom_state'
                                                onChange={this.props.handleStateChange}
                                                value={this.props.changedAddress['cust_dom_state']}
                                            >
                                                {
                                                    this.props.statesList.map(function (item, i) {
                                                        return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                                    })
                                                }
                                            </SelectField> :
                                            <TextField

                                                floatingLabelText="Province"
                                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                                fullWidth={true}
                                                style={textFieldStyle}
                                                underlineStyle={underlineStyle}
                                                inputStyle={textFieldInputStyle}
                                                refs='cust_dom_province'
                                                onChange={this.props.handleChange.bind(this, 'cust_dom_province')}
                                                value={this.props.changedAddress['cust_dom_province']}
                                            >
                                            </TextField>
                                        }
                                    </div>
                                </div>
                                <div className='email-field full-field'>
                                    <TextField
                                        type="email"
                                        floatingLabelText="Email Address"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        fullWidth={true}
                                        underlineStyle={underlineStyle}

                                        inputStyle={textFieldInputStyle}
                                        refs='cust_dom_email'
                                        onChange={this.props.handleChange.bind(this, "cust_dom_email")}
                                        value={this.props.changedAddress['cust_dom_email']}
                                        errorText={this.props.errors["cust_dom_email"]}
                                        errorStyle={errorStyle}
                                    />
                                </div>
                                {this.props.userType != 'int' ?
                                    <div className='zip_field full-field'>
                                        <TextField
                                            type="text"
                                            floatingLabelText="Zip"
                                            floatingLabelStyle={textFieldFloatingLabelStyle}
                                            style={textFieldStyle}
                                            underlineStyle={underlineStyle}

                                            fullWidth={true}
                                            inputStyle={textFieldInputStyle}
                                            refs='cust_dom_zip'
                                            value={this.props.changedAddress['cust_dom_zip'].replace(/[^0-9]/g, '')}
                                            onChange={this.props.handleChange.bind(this, "cust_dom_zip")}

                                        />
                                    </div> :
                                    <div className="row8 fields2">
                                        <div className='country field2'>
                                            <SelectField
                                                floatingLabelText="Country"
                                                dropDownMenuProps={{

                                                    iconButton: <Dropdownicon />,
                                                }}
                                                value={this.props.changedAddress['cust_dom_country']}
                                                onChange={this.props.handleCountryChange.bind(this, "cust_dom_country")}
                                                fullWidth={true}
                                                floatingLabelStyle={selectFieldFloatingLabelStyle}
                                                style={selectFieldStyle}
                                                underlineStyle={underlineStyle}
                                                labelStyle={selectFieldLabelStyle}
                                                menuItemStyle={selectFieldMenuItemStyle}
                                                selectedMenuItemStyle={selectFieldMenuItemStyle}
                                                iconStyle={selectFieldIconStyle}
                                                errorText={this.props.errors["cust_dom_country"]}
                                                errorStyle={errorStyle}
                                                maxHeight='190.5px'
                                                refs="cust_dom_country"
                                            >
                                                {
                                                    this.props.countryList.map(function (item, i) {
                                                        return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                                    })
                                                }
                                            </SelectField>
                                        </div>
                                        <div className='postcode_field2'>
                                            <TextField
                                                type="text"
                                                floatingLabelText="Postal Code"
                                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                                style={textFieldStyle}
                                                underlineStyle={underlineStyle}
                                                fullWidth={true}
                                                inputStyle={textFieldInputStyle}
                                                refs='cust_dom_postal'
                                                onChange={this.props.handleChange.bind(this, "cust_dom_postal")}
                                                value={this.props.changedAddress['cust_dom_postal']}

                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="edit-cust-buttonfooter">
                                <div className="edit-cust-sale-cancel-div">
                                    <button className="edit-cust-sale-cancelbtn">
                                        <img src={crossicon} className="edit-cust-sale-clearicon" />CANCEL</button>
                                </div>
                                <div className="edit-cust-sale-ok-div">
                                    <button className="edit-cust-sale-okbtn"
                                        onClick={this.props.openVerifyPopup}
                                    >OK</button>
                                </div>
                            </div>
                        </div>
                        <div className="reminders-content"></div>
                    </div>

                    <Modal open={Boolean(this.props.phoneModal)} onClose={() => { }} classNames={{ modal: 'small-ff-modal' }} little showCloseIcon={false} >
                        <div className='edit-cust-sff-container'>
                            <img src={phonemodalicon} className='edit-cust-sff-modal-icon' />
                            <div className='edit-cust-sff-phone-modal-label'>Is this your correct phone number?</div>
                            <div className='edit-cust-sff-phone-modal-conform-phone'>{this.props.changedAddress['cust_dom_mobile']}</div>
                            <div className='edit-cust-sff-modal-conform-phone-button-area'>
                                <div className='edit-cust-sff-modal-no-btn' onClick={this.props.closePhoneModal} ><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='edit-cust-sff-modal-yes-btn' onClick={this.props.openTextOptModal} ><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.textoptModal)} onClose={() => { }} classNames={{ modal: 'small-ff-modal' }} little showCloseIcon={false} >
                        <div className='edit-cust-sff-container'>
                            <img src={textopticon} className='edit-cust-sff-modal-icon' />
                            <div className='edit-cust-sff-phone-modal-label'>Text Opt In/ Out</div>
                            <div className='edit-cust-sff-text-opt-message-area'><span className='edit-cust-sff-text-opt-message'>I would like to receive promotional text messages and images from Neiman Marcus Group LLC and its companies. Rates may apply.</span></div>
                            <div className='edit-cust-sff-modal-textopt-button-area'>
                                <div className='edit-cust-sff-modal-textopt-disagree-btn' onClick={this.props.openEmailModal}><span className='edit-cust-sff-modal-textopt-disagree-btn-label'>DISAGREE</span></div>
                                <div className='edit-cust-sff-modal-textopt-agree-btn' onClick={this.props.setCustTextOpt}><span className='edit-cust-sff-modal-textopt-agree-btn-label'>AGREE</span></div>
                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.emailModal)} onClose={() => { }} classNames={{ modal: 'small-ff-modal' }} little showCloseIcon={false}  >
                        <div className='edit-cust-sff-container'>
                            <img src={emailmodalicon} className='edit-cust-sff-modal-icon' />
                            <div className='edit-cust-sff-email-modal-label'>Is this your correct email address?</div>
                            <div class="cust-email-tooltip">
                                <ReactTooltip data-class="react-email-tooltip-custom" effect="solid" place="top" className="tooltipCls" data-event='click'></ReactTooltip>
                                <div className='edit-cust-sff-email-modal-conform-email'>{this.props.changedAddress['cust_dom_email']}
                                </div>
                                {this.props.changedAddress['cust_dom_email'].length > 25 ? <img className="tooltip-info-icon" data-tip={this.props.changedAddress['cust_dom_email']} data-event='click' src={info} /> : ''}
                            </div>


                            <div className='edit-cust-sff-modal-email-button-area'>
                                <div className='edit-cust-sff-modal-no-btn' onClick={this.props.closeEmailModal}><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='edit-cust-sff-modal-yes-btn' onClick={this.props.viewDomesticCustomerInvoker.bind(this, false)}><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.succesModal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'small-ff-modal small-ff-success-modal' }} >
                        <div className='`edit-cust-sff-success-modal-container`'>
                            <img src={updatecustsuccessicon} className='edit-cust-sff-success-modal-icon' />
                            <div className='edit-cust-sff-success-modal-message'>
                                The customer <span> {this.props.toCamelCase(this.props.selectedSalutation)} {this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])} {this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])} </span>
                                has been updated successfully.
                                </div>
                            <div className='edit-cust-sff-success-modal-close-btn' onClick={this.props.closeSuccessModal}><span className='edit-cust-sff-success-modal-close-btn-label'>CLOSE</span></div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.failModal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'small-ff-modal' }}>
                        <div className='edit-cust-sff-container'>
                            <img src={erroricon} className='edit-cust-sff-modal-icon' />
                            <div className='edit-cust-sff-fail-modal-message-area'><span className='edit-cust-sff-fail-modal-message-text'>Invalid address - Cannot be validated.
                                        Select EDIT to correct address. If BYPASS is selected, the clientele record and all purchase history will be deleted from the clientele system. </span>
                            </div>
                            <div className='edit-cust-sff-fail-modal-button-area'>
                                <div className='edit-cust-sff-modal-fail-backtoedit-btn' onClick={this.props.closeFailModal}><span className='edit-cust-sff-modal-backtoedit-btn-label'>BACK TO EDIT</span></div>
                                <div className='edit-cust-sff-modal-fail-bypass-btn' onClick={this.props.bypassAddressValidation}><span className='edit-cust-sff-modal-bypass-btn-label'>BYPASS</span></div>
                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.addrEmailMOdal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'small-ff-modal' }}>
                        <div className='edit-cust-sff-addr-fail-container'>
                            <img src={erroricon} className='edit-cust-sff-modal-icon' />
                            <div className='edit-cust-sff-addr-email-modal-message-area'><span className='edit-cust-sff-addr-email-modal-message-text'>
                                You must supply a valid street address or email address for this client. Press OK to continue. </span>
                            </div>
                            <div className='edit-cust-sff-fail-modal-button-area'>
                                <div className='edit-cust-sff-modal-ok-btn' onClick={this.props.closeaddrEmailMOdal}><span className='edit-cust-sff-modal-ok-btn-label'>OK</span></div>
                            </div>
                        </div>
                    </Modal>
                </div>


                <Footer></Footer>
            </div>
        );
    }
}