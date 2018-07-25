import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';


import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField/SelectField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import Modal from 'react-responsive-modal';

/**
 * SVGs
 */
import editIcon from '../../../../resources/images/Edit_Profile.svg';
import phonemodalicon from '../../../../resources/images/Confirm_Phone.svg';
import erroricon from '../../../../resources/images/Error_Red.svg';
import tickicon from '../../../../resources/images/Tick_White.svg';
import textopticon from '../../../../resources/images/Text_Opt_In.svg';
import emailmodalicon from '../../../../resources/images/Confirm_Email.svg';
import info from '../../../../resources/images/Info.svg';
import updatecustsuccessicon from '../../../../resources/images/Success_Green.svg';
import crossicon from '../../../../resources/images/Cross_Purple.svg';
import cardicon from '../../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../../resources/images/Close_Bttn_Purple.svg';


export default class CustomerEditFormView extends Component {
    render() {
        console.log('CONTRIES', this.props.countryList)
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

        const ServiceFooter = this.props.optionalFooter;

        var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs>



                </defs>
                <path id="Arrow_Down" className="selectDropDownSvgIcon" d="M.8,185.8l22.9,22.9,23.1-22.9" transform="translate(-0.05 -185.05)" />
            </svg>
        );
        
        return (
            <div className='add-customer-main'>
                <div className='addcust-subheader-container'> 
                     <div className="send-title-header-text">{this.props.formType}</div>
                        <div
                            className='add-customer-tab-header'
                            onClick={() => {this.props.handleCustTypeChange()}}>
                            <img
                                src={this.props.addCustImage}
                                className='add-customer-icon'
                                alt="add-customer-icon"/>
                            <div className='add-customer-label '>Add Customer</div>
                        </div>
                        <div
                            className='add-int-customer-tab-header'
                            onClick={() => {this.props.handleCustTypeChange()}}>
                            <img
                                src={this.props.addIntCustImage}
                                className='add-int-customer-icon'
                                alt="add-international-customer-icon"/>
                            <div className='add-int-customer-label '>Add International Customer</div>
                        </div>                  
                    <div className='tab-header-spacer'></div>
                    </div>

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
                                            return <MenuItem className="select-field-menu-item" key={i} value={item.Value} primaryText={item.Value} />;
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

                            {this.props.custType != 'int' ?
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
                                    />
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
                            {this.props.custType != 'int' ?
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
                                            value={this.props.changedAddress['cust_dom_zip']}
                                            onChange={this.props.handleChange.bind(this, "cust_dom_zip")}
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
                        {this.props.custType == 'int' ?
                            <div className="viewedit-fourthrow">

                                <div className='field1'>
                                    <SelectField
                                        floatingLabelText="Country"
                                        dropDownMenuProps={{

                                            iconButton: <Dropdownicon />,
                                        }}
                                        value={this.props.changedAddress['cust_dom_country']}
                                        onChange={this.props.handleCountryChange}
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

                        {/* SERVICES FOOTER  */}
                        <ServiceFooter additionalStyle='sendComponent-customerEditForm-offset'>
                            <div  className="giftwrap-cancel" onClick={() => this.props.history.goBack()}><span className="giftwrap-cancel-text">Cancel</span></div>
                            <button className="giftwrap-next" 
                                onClick={() => {
                                    {/* this.props.handleValidation() */}
                                    this.props.handleClientele();
                                    console.log("SHIV: formtype:",this.props.formType)
                                    if(this.props.formType =="Receiver"){
                                        this.props.constructCustomerObject("Receiver",this.props.changedAddress)
                                        this.props.updateShipmentOptionsObject("ZIP", this.props.changedAddress['cust_dom_zip']);
                                        this.props.componentChangeHandler("itemsToBeShipped");
                                    }
                                }}>
                            <span className="giftwrap-next-text">Next</span></button>
                        </ServiceFooter>
                        {/* END SERVICES FOOTER  */}

                        {/* <div className='viewedit-addcard-button-section'>
                            <div className='viewedit-card-icon-section'>
                                <img src={cardicon} className='addcard-icon' alt='addcard' />
                            </div>
                            <div className='viewedit-card-label-section'>
                                <div className='view-label'>Add Card</div>
                            </div>
                        </div> */}
                        {/* <div className='viewedit-subfooter-container'>
                            <div className="view-edit-clear" onClick={this.props.cancelViewEdit}>
                                <img className="viewedit-clear-all-icon" src={clearallbtn} alt="clear-all" />
                                <div className="viewedit-dom-clear-all-label" >CANCEL</div>
                            </div>
                            <div className="view-save-button" onClick={this.props.openVerifyPopup}>
                                <div className="viewedit-save-label" >OK</div>
                            </div>
                        </div> */}

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
                                    <div className='add-dom-cust-modal-yes-btn' onClick={console.log("impliment")}><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>

                                </div>
                            </div>
                        </Modal>

                        <Modal open={Boolean(this.props.succesModal)} onClose={() => { }} little showCloseIcon={false} classNames={{ modal: 'updatecust-success-modal' }} >
                            <div className='`add-cust-success-modal-container`'>
                                <img src={updatecustsuccessicon} className='add-domcust-success-modal-icon' />
                                <div className='add-domcust-success-modal-message'>
                                    The customer 
                                    <span> {this.props.toCamelCase(this.props.selectedSalutation)} {this.props.toCamelCase(this.props.changedAddress['cust_dom_fname'])} {this.props.toCamelCase(this.props.changedAddress['cust_dom_lname'])} </span>
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
                                    <div className='add-dom-cust-modal-ok-btn' onClick={this.props.openCloseAddrEmailModal}><span className='add-dom-cust-modal-ok-btn-label'>OK</span></div>
                                </div>
                            </div>
                        </Modal>
                    </div>
            </div>
        );
    }
}