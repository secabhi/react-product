/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Components import */
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import ReactTooltip from 'react-tooltip'

/* images import */
import SvgIcon from 'material-ui/SvgIcon';

import cardicon from '../../../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../../../resources/images/Clear_All.svg';
import savebtn from '../../../../../resources/images/Save.svg';
import visa from '../../../../../resources/images/Visa.svg'
import deletebutton from '../../../../../resources/images/Delete_Purple.svg'
import info from '../../../../../resources/images/Info.svg'
import arrowdownicon from '../../../../../resources/images/Arrow_Down.svg';

/* Styles import */
import '../../Styles/AddCustomerStyle.css';
import { customStyle } from '../../Styles/AddCustomerComponentStyle'

/* Componenents import */
import { PhoneModal } from '../AlertModals/phoneModal';
import { TextOptModal } from '../AlertModals/textOptModal';
import { EmailConfirmModal } from '../AlertModals/emailConfirmModal';
import { SuccessModal } from '../AlertModals/successModal';
import { InvalidAddressModal } from '../AlertModals/invalidAddressModal';
import { InvalidEmailModal } from '../AlertModals/invalidEmailModal';
import { EmailIncorrectModal } from '../AlertModals/emailIncorrectModal';
import { FieldsMissingModal } from '../AlertModals/FieldsMissingModal';
import { Salutation } from '../Fields/Salutation';


export class AddCustomerDomesticView extends Component {

  componentDidMount(){
      
  }

    render()
    {  var Dropdownicon = (props) => (

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
            <defs></defs>
            <path
                id="Arrow_Down"
                class="selectDropDownSvgIcon"
                d="M.8,185.8l22.9,22.9,23.1-22.9"
                transform="translate(-0.05 -185.05)"/>
        </svg>
    );
        
        return (
            <div className='add-customer-domestic'>
                <div className='addcust-dom-inputarea'>
                    <div className='add-customer-dom-row1'>
                        <div className='field1'>
                           
                            <Salutation salutationDataDrop = {this.props.domesticProp.salutationDataDrop} 
                                        selectedSalutation = {this.props.domesticProp.selectedSalutation} 
                                        handleSalutationChange = {this.props.domesticProp.handleSalutationChange} />
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="First Name*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs="cust_fname"
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_fname")}
                                value={this.props.domesticProp.fields["cust_fname"]}
                                errorText={this.props.domesticProp.errors["cust_fname"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}></TextField>
                        </div>
                        <div className='field3'>
                            <TextField
                                type="text"
                                floatingLabelText="Last Name*"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs="cust_lname"
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_lname")}
                                value={this.props.domesticProp.fields["cust_lname"]}
                                errorText={this.props.domesticProp.errors["cust_lname"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                        <div className='field4'>
                            <TextField
                                type="number"
                                floatingLabelText="Mobile Phone"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs="cust_phone1"
                                onChange={() => this.handleChange.bind(this, "cust_phone1")}
                                value={this.props.domesticProp.fields["cust_phone1"]}
                                errorText={this.props.domesticProp.errors["cust_phone1"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}>
                                <InputMask
                                    mask="(999) 999-9999"
                                    maskChar=""
                                    onChange={this.props.domesticProp
                                    .handleChange
                                    .bind(this, "cust_phone1")}
                                    value={this.props.domesticProp.fields["cust_phone1"]}/>
                            </TextField>
                        </div>
                    </div>
                    <div className='add-customer-dom-row2'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 1"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_addr1'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_addr1")}
                                value={this.props.domesticProp.fields["cust_addr1"]}
                                errorText={this.props.domesticProp.errors["cust_addr1"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                        <div className='field2'>
                            <TextField
                                type="text"
                                floatingLabelText="Address Line 2"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_addr2'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_addr2")}
                                value={this.props.domesticProp.fields["cust_addr2"]}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                        <div className='field3'>
                            <TextField
                                type="number"
                                floatingLabelText="Other Phone"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_phone2'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_phone2")}
                                value={this.props.domesticProp.fields["cust_phone2"]}
                                underlineStyle={customStyle.underlineStyle}
                                errorText={this.props.domesticProp.errors["cust_phone2"]}
                                errorStyle
                                ={customStyle.errorStyle}>
                                <InputMask
                                    mask="(999) 999-9999"
                                    maskChar=""
                                    onChange={this.props.domesticProp
                                    .handleChange
                                    .bind(this, "cust_phone2")}
                                    value={this.props.domesticProp.fields["cust_phone2"]}/>
                            </TextField>
                        </div>
                    </div>
                    <div className='add-customer-dom-row3'>
                        <div className='field1'>
                            <TextField
                                type="text"
                                floatingLabelText="City"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_city'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_city")}
                                value={this.props.domesticProp.fields["cust_city"]}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                        <div className='field2'>
                            <SelectField value={this.props.domesticProp.dom_cust_state} onChange={this.props.domesticProp.handleCustStateChange} floatingLabelText="State" fullWidth={true} floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle} style={customStyle.selectFieldStyle} labelStyle={customStyle.selectFieldLabelStyle} menuItemStyle={customStyle.selectFieldMenuItemStyle} selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle} iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '85.5px'
                                maxHeight={180} dropDownMenuProps={{
                                iconButton: <img src={arrowdownicon} alt="arror-icon"/>
                            }} underlineStyle={customStyle.underlineStyle}>
                                {this.props.domesticProp.statesList.map((s, i) => {
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
                        <div className='field3'>
                            <TextField
                                type="text"
                                floatingLabelText="Zip"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                maxLength="9"
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='dom_cust_zip'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "dom_cust_zip")}
                                value={this.props.domesticProp.fields["dom_cust_zip"]}
                                errorText={this.props.domesticProp.errors["dom_cust_zip"]}
                                errorStyle={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                        <div className='field4'>
                            <TextField
                                type="email"
                                floatingLabelText="Email Address"
                                floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                                style={customStyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={customStyle.textFieldInputStyle}
                                refs='cust_email'
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_email")}
                                value={this.props.domesticProp.fields["cust_email"]}
                                errorText={this.props.domesticProp.errors["cust_email"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}/>
                        </div>
                    </div>

                </div>

                <div className='addcard-dom-area'>
                    <div className='added-cards-section'></div>
                    <div className='add-card-button-section'>
                        <div className='add-card-icon-section'>
                            <img src={cardicon} className='addcard-icon' alt='addcard'/>
                        </div>
                        <div className='add-card-label-section'>
                            <div className='addcard-label'>Add Card</div>
                        </div>
                    </div>
                </div>

                <div className='addcust-dom-subfooter-container'>
                    <div className="addcust-dom-clear-all-button">
                        <img className="addcust-dom-clear-all-icon" src={clearallbtn} alt="clear-all"/>
                        <div
                            className="addcust-dom-clear-all-label"
                            onClick={() => this.props.domesticProp.clearAllFields(this)}>CLEAR ALL</div>
                    </div>
                    <div className="addcust-dom-save-button">
                        <img className="addcust-dom-save-icon" src={savebtn} alt="save"/>
                        <div className="addcust-dom-save-label" onClick={this.props.domesticProp.openModals}>SAVE</div>
                    </div>
                </div>

                {/* Alert Modals */}
          
                <PhoneModal phoneModalOpen={this.props.domesticProp.phoneModal} 
                        phoneModalNum= {this.props.domesticProp.fields['cust_phone1']}
                        phoneModalNo = {this.props.domesticProp.closePhoneModal}
                        phoneModalYes = {this.props.domesticProp.openTextOptModal} />

                <TextOptModal textOptModalOpen= {this.props.domesticProp.textoptModal}
                        textOptModalDisagree = {this.props.domesticProp.openEmailModal}
                        textOptModalAgree = {this.props.domesticProp.setCustTextOpt} />


                <EmailConfirmModal  emailModalOpen={this.props.domesticProp.emailModal}
                        emailModalEmailAddress = {this.props.domesticProp.fields['cust_email']}
                        emailModalNo = {this.props.domesticProp.closeEmailModal}
                        emailModalYes = { this.props.domesticProp.addDomesticCustomerInvoker}
                        />              

                 <SuccessModal successModalOpen ={this.props.domesticProp.succesModal} 
                        successModalSalutation = {this.props.domesticProp.selectedSalutation}
                        successModalFname = {this.props.domesticProp.fields['cust_fname']}
                        successModalLname =  {this.props.domesticProp.fields['cust_lname']}
                        successModalClose = {this.props.domesticProp.closeSuccessModal}/>

                 <InvalidAddressModal invalidModalOpen = {this.props.domesticProp.failModal}
                        invalidModalBack = { this.props.domesticProp.closeFailModal}  
                        invalidModalBypass = {this.props.domesticProp.bypassAddressValidation}
                        visibility = {false}/>

                <InvalidEmailModal invalidEmailOpen = {this.props.domesticProp.failModal1}
                        invalidEmailClose = {this.props.domesticProp.closeFailModal1} 
                        invalidEmailBypass = {this.props.domesticProp.bypassAddressValidation}
                        isHidden = {true}/>           

                <EmailIncorrectModal emailMissingOpen = {this.props.domesticProp.emailMissingModal}
                        emailMissingClose ={this.props.domesticProp.closeFieldsMissingModal}/>
         
                <FieldsMissingModal fieldsMissingOpen = {this.props.domesticProp.filedsMissingModal}
                        fieldsMissingClose = {this.props.domesticProp.closeFieldsMissingModal} />

            </div>
        );
    }
}