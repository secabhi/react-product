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
import { ModifyPriceErrorModal } from '../../sale/modal-component/modalComponent'; 
import { UpdateInvalidEmailModal } from '../../update-customer/View/Components/AlertModals/UpdateInvalidEmailModal';
import { UpdateFailedModal } from '../../update-customer/View/Components/AlertModals/UpdateFailedModal';

import savebtn from '../../../resources/images/Save.svg';
import incircle_purple_large_bttn from '../../../resources/images/Incircle_Level_purple_large_bttn.svg';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import IconButton from 'material-ui/IconButton';
import Popup from '../../popup/popup';
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

import './vieweditCustomerStyle.css';

export default class ViewEditCustomerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity : "",
            selectedCityDetails : {}
        }
        this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;
        this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
        this.totalpoints = parseInt(this.inCircleInfo.total_points);
        this.pointsToNextLvl = this.nextLvl - this.totalpoints;
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
            // console.log('currentAddress in view' + JSON.stringify(currentAddress));
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
            <div>

                {
                    /**validate customer popup  */

                    this.props.showPopup ?
                        <Popup text="Verify&nbsp;Update"
                            closePopup={this.props.openVerifyPopup.bind(this)}>
                            {this.props.userType != 'int' ?
                                <VerifyCustomerDomestic
                                    togglePopup={this.props.openVerifyPopup}
                                    openModals={this.props.openModals}
                                    isValid={this.props.isValid}
                                    dom_cust_state={this.props.changedAddress['cust_dom_state']}
                                    selectedSalutation={this.props.selectedSalutation}
                                    cust_text_opt={this.props.cust_text_opt}
                                    currentAddress={this.props.currentAddress}
                                    changedAddress={this.props.changedAddress}
                                // currentAddress={this.state.currentAddressForVerify} changedAddress={this.state.changedAddressForVerify}/>
                                /> : <VerifyCustomer
                                    togglePopup={this.props.openVerifyPopup}
                                    openModals={this.props.openModals}
                                    isValid={this.props.isValid}
                                    dom_cust_state={this.props.changedAddress['cust_dom_state']}
                                    selectedSalutation={this.props.selectedSalutation}
                                    cust_text_opt={this.props.cust_text_opt}
                                    currentAddress={currentAddress}
                                    changedAddress={changedAddress}
                                // currentAddress={this.state.currentAddressForVerify} changedAddress={this.state.changedAddressForVerify}/>
                                />}
                        </Popup>
                        : null
                    /**validate customer popup code close */

                }

                <Header history={this.props.history}></Header>
                <div className="viewedit-sub-header">
                    <div onClick={this.props.navigateToCustomerSearch}>
                        <img className="viewedit-back-arrow" src={backArrowWhite} alt="navigate-back" />
                    </div>
                    <div className="divider" />

                    {/* <div className="customer-name-labels"> {console.log("this.props.changedAddress['cust_dom_fname'] =====" + this.props.changedAddress['cust_dom_fname'])} {(this.props.changedAddress['cust_dom_fname'] != "") ? this.props.changedAddress['cust_dom_salutation'] : ""} </div><div className={(this.props.changedAddress['cust_dom_fname'] != "") ? "display-visible" : "display-none"}>.</div><div className="customer-name-labels"> {this.props.changedAddress['cust_dom_fname']} {this.props.changedAddress['cust_dom_lname']}</div>*/}
                    <div className="customer-name-labels"> {(this.props.currentAddress['cust_dom_fname'] != "") ? (this.props.currentAddress['cust_dom_salutation'] + ((this.props.currentAddress['cust_dom_salutation'] != "") ? '.' : "")) : ""} {this.props.toCamelCase(this.props.currentAddress['cust_dom_fname'])} {this.props.toCamelCase(this.props.currentAddress['cust_dom_lname'])}</div>

                    {
                       (this.props.currentLvl != 0) ?
                       (<div className="divider" />):
                       (<div></div>)
                   }
                   {
                       (this.props.currentLvl != 0) ?
                       (<div className="viewedit-incircle-details">
                        <span className="subheader-iconNum">{this.props.currentLvl}</span>
                        <img
                            className="vieweditpoint-circleicon"
                            src={incircle_purple_large_bttn}
                            alt="profile-tab-icon"
                        />
                        <div className="incircle-description">
                            <div className="incircle-description-level">
                                CIRCLE {this.props.currentLvl}
                            </div>
                            <div className="incircle-description-points">
                                Points to next point card: <b>{this.props.pointsToNextLvl}</b>
                            </div>
                        </div>
                        </div>):
                (<div></div>)
                       }
                    <div className="spacer-div" />

                </div>
                {/* <div className='viewedit-subheader-container'>
                    <div className='viewedit-customer-tab-header' onClick={this.props.switchtoProfile} >


                        <img src={profileselected} className='viewedit-customer-icon' alt="viewedit-customer-icon" />
                        <div className='viewedit-customer-label selected-tab-label'>Profile</div>
                    </div>
                    <div className='viewedit-int-customer-tab-header' onClick={this.props.switchtoRemainder}>
                        <img src={this.props.reminderselect} className='viewedit-customer-icon' alt="viewedit-international-customer-icon" />
                        <Badge
                        //badgeContent={3}
                        //secondary={true}
                        //badgeStyle={{top: 14, right:29,width:34,height:34,fontSize:20}}
                        >
                        </Badge>
                        <div className='viewedit-customerint-label '>Reminders</div>
                    </div>
                </div> */}

                <div className="viewedit-form">
                    <div className="viewedit-firstrow">
                        <div className='field1'>
                            <SelectField
                                floatingLabelText="Sal..."
                                fullWidth={true}
                                refs="cust_dom_salutation"
                                underlineStyle={underlineStyle}
                                floatingLabelStyle={selectFieldFloatingLabelStyle}
                                style={selectFieldStyle}
                                labelStyle={selectFieldLabelStyle}
                                menuItemStyle={selectFieldMenuItemStyle}
                                selectedMenuItemStyle={selectFieldMenuItemStyle}
                                iconStyle={selectFieldIconStyle}
                                maxHeight={190.5}
                                value={this.props.changedAddress['cust_dom_salutation']}
                                onChange={this.props.handleSalutationChange.bind(this, "cust_dom_salutation")}
                            >
                                {
                                    this.props.salutationDataDrop.map(function (item, i) {
                                        return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                    })
                                }
                            </SelectField>
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="First Name*"
                                refs="cust_dom_fname"
                                errorText={this.props.errors["cust_dom_fname"]}
                                onChange={this.props.handleChange.bind(this, "cust_dom_fname")}
                                value={this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])}
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                underlineStyle={underlineStyle}
                                fullWidth={true}
                                errorStyle={errorStyle}
                                inputStyle={textFieldInputStyle}
                            />

                        </div>
                        <div className='field3'>
                            <TextField
                                floatingLabelText="Last Name*"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                value={this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])}
                                errorText={this.props.errors["cust_dom_lname"]}
                                onChange={this.props.handleChange.bind(this, "cust_dom_lname")}
                                refs="cust_dom_lname"
                                underlineStyle={underlineStyle}
                                inputStyle={textFieldInputStyle}
                                fullWidth={true}
                                errorStyle={errorStyle}
                            />

                        </div>

                        {this.props.userType != 'int' ?
                            <div className='field4'>
                                <div>
                                    <TextField
                                        floatingLabelText="Mobile Phone"
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        refs="cust_dom_mobile"
                                        value={this.props.changedAddress['cust_dom_mobile']}
                                        underlineStyle={underlineStyle}
                                        inputStyle={textFieldInputStyle}
                                        fullWidth={true}
                                        errorStyle={errorStyle}
                                        onChange={this.props.handleChange.bind(this, "cust_dom_mobile")}

                                    >
                                        <InputMask mask="(999) 999-9999" maskChar="" onChange={this.props.handleChange.bind(this, "cust_dom_mobile")} value={this.props.changedAddress['cust_dom_mobile']} />
                                    </TextField>
                                </div>
                            </div> :
                            <div className='field4'>
                                <TextField
                                    type="number"
                                    floatingLabelText="Mobile Phone"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    style={textFieldStyle}
                                    refs="cust_dom_mobile"
                                    value={this.props.changedAddress['cust_dom_mobile']}
                                    underlineStyle={underlineStyle}
                                    inputStyle={textFieldInputStyle}
                                    fullWidth={true}
                                    errorStyle={errorStyle}
                                    onChange={this.props.handleChange.bind(this, "cust_dom_mobile")}
                                >
                                <InputMask mask="9999999999999" maskChar="" onChange={this.props.handleChange.bind(this, "cust_dom_mobile")} value={this.props.changedAddress['cust_dom_mobile']} />
                                </TextField>
                            </div>
                        }
                    </div>
                    <div className="viewedit-secondrow">

                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 1*"
                                onChange={this.props.handleChange.bind(this, "cust_dom_address1")}
                                refs='cust_dom_address1'
                                value={this.props.changedAddress['cust_dom_address1']}
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                underlineStyle={underlineStyle}
                                errorStyle={errorStyle}
                                fullWidth={true}
                                errorText={this.props.errors["cust_dom_address1"]}
                                inputStyle={textFieldInputStyle}
                                onChange={this.props.handleChange.bind(this, "cust_dom_address1")}
                            />

                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 2"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                underlineStyle={underlineStyle}
                                onChange={this.props.handleChange.bind(this, "cust_dom_address2")}
                                value={this.props.changedAddress['cust_dom_address2']}
                                refs='cust_dom_address2'
                                fullWidth={true}
                                inputStyle={textFieldInputStyle}
                            />

                        </div>
                        <div className='field3'>
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
                    </div>
                    <div className="viewedit-thirdrow">

                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="City"
                                value={this.props.changedAddress['cust_dom_city']}
                                refs='cust_dom_city'
                                onChange={this.props.handleChange.bind(this, "cust_dom_city")}
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                underlineStyle={underlineStyle}
                                fullWidth={true}
                                errorText={this.props.errors["cust_dom_city"]}
                                errorStyle={errorStyle}
                                inputStyle={textFieldInputStyle}
                            />

                        </div>
                        {this.props.userType != 'int' ?
                            <div className='field2'>
                                <div>
                                    <SelectField
                                        type="text"
                                        floatingLabelText="State"
                                        fullWidth={true}
                                        floatingLabelStyle={selectFieldFloatingLabelStyle}
                                        style={selectFieldStyle}
                                        labelStyle={selectFieldLabelStyle}
                                        menuItemStyle={selectFieldMenuItemStyle}
                                        selectedMenuItemStyle={selectFieldMenuItemStyle}
                                        iconStyle={selectFieldIconStyle}
                                        underlineStyle={underlineStyle}
                                        maxHeight={180}
                                        refs="cust_dom_state"
                                        value={this.props.changedAddress['cust_dom_state']}
                                        onChange={this.props.handleStateChange}
                                    >
                                        {
                                            this.props.statesList.map(function (item, i) {
                                                return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                            })
                                        }
                                    </SelectField>
                                </div>
                                <div style={{ marginLeft: 60 + 'px' }}>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Zip"
                                        refs='cust_dom_zip'
                                        value={this.props.changedAddress['cust_dom_zip'].replace(/[^0-9]/g, '')}
                                        onChange={this.props.handleChange.bind(this, "cust_dom_zip")}
                                        maxLength="9"
                                        onBlur={this.props.handleChange
                                            .bind(this, "cust_dom_zip_blur")}
                                        floatingLabelStyle={textFieldFloatingLabelStyle}
                                        style={textFieldStyle}
                                        underlineStyle={underlineStyle}
                                        fullWidth={true}
                                        inputStyle={textFieldInputStyle}
                                    />
                                  
                            

                                </div>

                            </div> :
                            <div className='field2 widthCls'>
                                <TextField
                                    type="text"
                                    floatingLabelText="Province"
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    style={textFieldStyle}
                                    underlineStyle={underlineStyle}
                                    fullWidth={true}
                                    inputStyle={textFieldInputStyle}
                                    refs='cust_dom_province'
                                    onChange={this.props.handleChange.bind(this, 'cust_dom_province')}
                                    value={this.props.changedAddress['cust_dom_province']}

                                />
                            </div>
                        }
                        {/*         
        <div className='field3'>
                           
                            
        </div> */}


                        <div className='field4'>
                            <TextField
                                floatingLabelText="Email Address"
                                value={this.props.changedAddress['cust_dom_email']}
                                errorText={this.props.errors["cust_dom_email"]}
                                refs='cust_dom_email'
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                onChange={this.props.handleChange.bind(this, "cust_dom_email")}
                                underlineStyle={underlineStyle}
                                fullWidth={true}
                                errorStyle={errorStyle}
                                inputStyle={textFieldInputStyle}
                            />

                        </div>
                    </div>
                    {this.props.userType == 'int' ?
                        <div className="viewedit-fourthrow">

                            <div className='field1'>
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
                                    maxHeight={190.5}
                                    refs="cust_dom_country"

                                >
                                    {
                                        this.props.countryList.map(function (item, i) {
                                            return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                                        })
                                    }
                                </SelectField>

                            </div>
                            <div className='field2'>
                                <TextField
                                    type="text"
                                    floatingLabelText="Postal Code"
                                    value={this.props.changedAddress['cust_dom_postal']}
                                    refs='cust_dom_postal'
                                    floatingLabelStyle={textFieldFloatingLabelStyle}
                                    style={textFieldStyle}
                                    onChange={this.props.handleChange.bind(this, "cust_dom_postal")}
                                    underlineStyle={underlineStyle}
                                    fullWidth={true}
                                    inputStyle={textFieldInputStyle}
                                />

                            </div>


                        </div> :
                        <div></div>
                    }

                    <div className='viewedit-addcard-button-section'>
                        <div className='viewedit-card-icon-section'>
                            <img src={cardicon} className='addcard-icon' alt='addcard' />
                        </div>
                        <div className='viewedit-card-label-section'>
                            <div className='view-label'>Add Card</div>
                        </div>
                    </div>
                    <div className='viewedit-subfooter-container'>
                        <div className="view-edit-clear" onClick={this.props.cancelViewEdit}>
                            <img className="viewedit-clear-all-icon" src={clearallbtn} alt="clear-all" />
                            <div className="viewedit-dom-clear-all-label" >CANCEL</div>
                        </div>
                        <div className="view-save-button" onClick={this.props.openVerifyPopup}>
                            <div className="viewedit-save-label" >OK</div>
                        </div>
                    </div>

                    <Modal open={Boolean(this.props.phoneModal)} onClose={() => { }} classNames={{ modal: 'add-dom-cust-modal' }} little showCloseIcon={false} >
                        <div className='add-dom-cust-container'>
                            <img src={phonemodalicon} className='add-dom-cust-modal-icon' />
                            <div className='add-dom-cust-phone-modal-label'>Is this your correct phone number?</div>
                            <div className='add-dom-cust-phone-modal-conform-phone'>{this.props.changedAddress['cust_dom_mobile']}</div>
                            <div className='add-dom-cust-modal-conform-phone-button-area'>
                                <div className='add-dom-cust-modal-no-btn' onClick={this.props.closePhoneModal} ><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='add-dom-cust-modal-yes-btn' onClick={this.props.openTextOptModal} ><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>

                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.textoptModal)} onClose={() => { }} classNames={{ modal: 'add-dom-cust-modal' }} little showCloseIcon={false} >
                        <div className='add-dom-cust-container'>
                            <img src={textopticon} className='add-dom-cust-modal-icon' />
                            <div className='add-dom-cust-phone-modal-label'>Text Opt In/ Out</div>
                            <div className='add-dom-cust-text-opt-message-area'><span className='add-dom-cust-text-opt-message'>I would like to receive promotional text messages and images from Neiman Marcus Group LLC and its companies. Rates may apply.</span></div>
                            <div className='add-dom-cust-modal-textopt-button-area'>
                                <div className='add-dom-cust-modal-textopt-disagree-btn' onClick={this.props.openEmailModal}><span className='add-dom-cust-modal-textopt-disagree-btn-label'>DISAGREE</span></div>
                                <div className='add-dom-cust-modal-textopt-agree-btn' onClick={this.props.setCustTextOpt}><span className='add-dom-cust-modal-textopt-agree-btn-label'>AGREE</span></div>

                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.emailModal)} onClose={() => { }} classNames={{ modal: 'add-dom-cust-modal' }} little showCloseIcon={false}  >
                        <div className='add-dom-cust-container'>
                            <img src={emailmodalicon} className='add-dom-cust-modal-icon' />
                            <div className='add-dom-cust-email-modal-label'>Is this your correct email address?</div>


                            {/*<div className='add-dom-cust-phone-modal-conform-email' data-tip={this.state.changedAddress['update_int_email']}>{this.state.changedAddress['update_int_email']}<ReactTooltip place="top" className="tooltipCls"></ReactTooltip></div>*/}

                            <div className="cust-email-tooltip">
                                <ReactTooltip data-class="react-email-tooltip-custom" effect="solid" place="top" className="tooltipCls"></ReactTooltip>
                                <div className='add-dom-cust-phone-modal-conform-email'>{this.props.changedAddress['cust_dom_email']}

                                </div>
                                {this.props.changedAddress['cust_dom_email'].length > 25 ? <img className="tooltip-info-icon" data-tip={this.props.changedAddress['cust_dom_email']} src={info} /> : ''}
                            </div>


                            <div className='add-dom-cust-modal-email-button-area'>
                                <div className='add-dom-cust-modal-no-btn' onClick={this.props.closeEmailModal}><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='add-dom-cust-modal-yes-btn' onClick={this.props.viewDomesticCustomerInvoker.bind(this, false)}><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>

                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.succesModal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'updatecust-success-modal' }} >
                        <div className='`add-cust-success-modal-container`'>
                            <img src={updatecustsuccessicon} className='add-domcust-success-modal-icon' />
                            <div className='add-domcust-success-modal-message'>
                                The customer <span> {this.props.toCamelCase(this.props.selectedSalutation)} {this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])} {this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])} </span>
                                has been updated successfully.
                            </div>
                            <div className='add-domcust-success-modal-close-btn' onClick={this.props.closeSuccessModal}><span className='add-domcust-success-modal-close-btn-label'>CLOSE</span></div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.failModal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'add-dom-cust-modal' }}>
                        <div className='add-dom-cust-container'>
                            <img src={erroricon} className='add-dom-cust-modal-icon' />
                            <div className='add-domcust-fail-modal-message-area'><span className='add-domcust-fail-modal-message-text'>Invalid address - Cannot be validated.
                                    Select EDIT to correct address. If BYPASS is selected, the clientele record and all purchase history will be deleted from the clientele system. </span>
                            </div>
                            <div className='add-domcust-fail-modal-button-area'>
                                <div className='add-dom-cust-modal-backtoedit-btn' onClick={this.props.closeFailModal}><img src={editIcon} className='add-dom-cust-modal-backtoedit-btn-icon' /><span className='add-dom-cust-modal-backtoedit-btn-label'>BACK TO EDIT</span></div>
                                <div className='add-dom-cust-modal-bypass-btn' onClick={this.props.bypassAddressValidation}><img src={crossicon} className='add-dom-cust-modal-bypass-btn-icon' /><span className='add-dom-cust-modal-bypass-btn-label'>BYPASS</span></div>
                            </div>
                        </div>
                    </Modal>

                    <Modal open={Boolean(this.props.addrEmailMOdal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'add-dom-cust-modal1 ' }}>
                        <div className='add-dom-cust-container'>
                            <img src={erroricon} className='add-dom-cust-modal-icon' />
                            <div className='add-domcust-addr-email-modal-message-area'><span className='add-domcust-addr-email-modal-message-text'>
                                You must supply a valid street address or email address for this client. Press OK to continue. </span>
                            </div>
                            <div className='add-domcust-fail-modal-button-area'>
                                <div className='add-dom-cust-modal-ok-btn' onClick={this.props.closeaddrEmailMOdal}><span className='add-dom-cust-modal-ok-btn-label'>OK</span></div>
                            </div>
                        </div>
                    </Modal>
                </div>

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
            <UpdateInvalidEmailModal failModal1={this.props.failModal1}
                closeFailModal={this.props.closeFailModal}
                bypassEmailValidation={this.props.bypassEmailValidation} />

            <UpdateFailedModal failedToUpdateModal={this.props.updateFailed}
                closeFailedToUpdate={this.props.updateFailedModalToggle}/>

            <Footer></Footer>
            </div>
        );
    }
}