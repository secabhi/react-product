/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Components import */
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import ReactTooltip from 'react-tooltip'

/*Images import */
import SvgIcon from 'material-ui/SvgIcon';
import cardicon from '../../../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../../../resources/images/Clear_All.svg';
import savebtn from '../../../../../resources/images/Save.svg';
import visa from '../../../../../resources/images/Visa.svg'
import deletebutton from '../../../../../resources/images/Delete_Purple.svg'
import info from '../../../../../resources/images/Info.svg';
import arrowdownicon from '../../../../../resources/images/Arrow_Down.svg';

/*Styles import */
import '../../Styles/AddCustomerStyle.css';
import {customStyle} from '../../Styles/AddCustomerComponentStyle'

/*Alert Modals import */
import { PhoneModal } from '../AlertModals/phoneModal'
import { TextOptModal } from '../AlertModals/textOptModal';
import { EmailConfirmModal } from '../AlertModals/emailConfirmModal';
import { SuccessModal } from '../AlertModals/successModal';
import { InvalidAddressModal}  from '../AlertModals/invalidAddressModal';
import { InvalidEmailModal } from '../AlertModals/invalidEmailModal';
import { Salutation } from '../Fields/Salutation';

export class AddCustomerIntView extends Component {
    componentDidMount(){
        
    }
    render() { 
        var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs></defs>
                <path
                    id="Arrow_Down"
                    class="selectDropDownSvgIcon"
                    d="M.8,185.8l22.9,22.9,23.1-22.9"
                    transform="translate(-0.05 -185.05)"/>
            </svg>
        );
        return(
            <div className = 'add-customer-international' > <div className='addcust-int-inputarea'>
                 <div className='add-customer-int-row1'>
                    <div className='field1'>
                    
                    <Salutation selectedSalutation = {this.props.internationalProp.selectedSalutationInt}
                                handleSalutationChange = {this.props.internationalProp.handleSalutationChangeInt}
                                salutationDataDrop = {this.props.internationalProp.salutationDataDrop} />
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
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_fname")}
                            value={this.props.internationalProp.fieldsInt["cust_fname"]}
                            errorText={this.props.internationalProp.errorsInt["cust_fname"]}
                            errorStyle
                            ={customStyle.errorStyle}
                            underlineStyle={customStyle.underlineStyle}/>
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
                            onChange={this.props.internationalProp
                            .handleChangeInt.bind(this, "cust_lname")}                 
                            value={this.props.internationalProp.fieldsInt["cust_lname"]}
                            errorText={this.props.internationalProp.errorsInt["cust_lname"]}
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
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_phone1")}
                            value={this.props.internationalProp.fieldsInt["cust_phone1"]}
                            errorText={this.props.internationalProp.errorsInt["cust_phone1"]}
                            errorStyle
                            ={customStyle.errorStyle}
                            underlineStyle={customStyle.underlineStyle}>
                            <InputMask
                                mask="9999999999999"
                                maskChar=""
                                onChange={this.props.internationalProp
                                .handleChangeInt
                                .bind(this, "cust_phone1")}
                                value={this.props.internationalProp.fieldsInt["cust_phone1"]}/>
                        </TextField>
                    </div>
                </div>
                <div className='add-customer-int-row2'>
                    <div className='field1'>
                         <TextField
                            type="text"
                            floatingLabelText="Address Line 1*"
                            floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                            style={customStyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={customStyle.textFieldInputStyle}
                            refs="cust_addr1"
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_addr1")}
                            value={this.props.internationalProp.fieldsInt["cust_addr1"]}
                            errorText={this.props.internationalProp.errorsInt["cust_addr1"]}
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
                            refs="cust_addr2"
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_addr2")}
                            value={this.props.internationalProp.fieldsInt["cust_addr2"]}
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
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_phone2")}
                            value={this.props.internationalProp.fieldsInt["cust_phone2"]}
                            underlineStyle={customStyle.underlineStyle}
                            errorText={this.props.internationalProp.errorsInt["cust_phone2"]}
                            errorStyle
                            ={customStyle.errorStyle}>
                            <InputMask
                                mask="9999999999999"
                                maskChar=""
                                onChange={this.props.internationalProp
                                .handleChangeInt
                                .bind(this, "cust_phone2")}
                                value={this.props.internationalProp.fieldsInt["cust_phone2"]}/>
                        </TextField>
                    </div>
                </div>
                <div className='add-customer-int-row3'>
                    <div className='field1'>
                        <TextField
                            type="text"
                            floatingLabelText="City*"
                            floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                            style={customStyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={customStyle.textFieldInputStyle}
                            refs='cust_city'
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_city")}
                            value={this.props.internationalProp.fieldsInt["cust_city"]}
                            errorText={this.props.internationalProp.errorsInt["cust_city"]}
                            errorStyle
                            ={customStyle.errorStyle}
                            underlineStyle={customStyle.underlineStyle}/>
                    </div>
                    <div className='field2'>
                        <TextField
                            type="text"
                            floatingLabelText="Province"
                            floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                            style={customStyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={customStyle.textFieldInputStyle}
                            refs="int_cust_province"
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "int_cust_province")}
                            value={this.props.internationalProp.fieldsInt["int_cust_province"]}
                            underlineStyle={customStyle.underlineStyle}/>
                    </div>
                    <div className='field3'>
                        <TextField
                            type="email"
                            floatingLabelText="Email Address"
                            floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                            style={customStyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={customStyle.textFieldInputStyle}
                            refs="cust_email"
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "cust_email")}
                            value={this.props.internationalProp.fieldsInt["cust_email"]}
                            errorText={this.props.internationalProp.errorsInt["cust_email"]}
                            errorStyle
                            ={customStyle.errorStyle}
                            underlineStyle={customStyle.underlineStyle}/>
                    </div>
                </div>
                <div className='add-customer-int-row4'>
                    <div className='field1'>
                        <SelectField value={ this.props.internationalProp.selectedCountry} onChange={this.props.internationalProp.handleCountryChange} floatingLabelText="Country*" fullWidth={true} floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle} style={customStyle.selectFieldStyle} labelStyle={customStyle.selectFieldLabelStyle} menuItemStyle={customStyle.selectFieldMenuItemStyle} selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle} iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '105.5px'
                            maxHeight={180} dropDownMenuProps={{
                            iconButton: <img src={arrowdownicon} alt="arror-icon"/>
                        }} errorText={this.props.internationalProp.errorsInt["selectedCountry"]} errorStyle ={customStyle.errorStyle} underlineStyle={customStyle.underlineStyle}>

                            {this
                                .props.internationalProp
                                .countryList
                                .map(function (item, i) {
                                    return <MenuItem
                                        className="select-field-menu-item"
                                        key={i}
                                        value={item}
                                        primaryText={item}/>;

                                })
                            }

                        </SelectField>
                    </div>
                    <div className='field2'>
                        <TextField
                            type="text"
                            floatingLabelText="Postal Code"
                            floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                            style={customStyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={customStyle.textFieldInputStyle}
                            refs="int_cust_postal_code"
                            onChange={this.props.internationalProp
                            .handleChangeInt
                            .bind(this, "int_cust_postal_code")}
                            value={this.props.internationalProp.fieldsInt["int_cust_postal_code"]}
                            underlineStyle={customStyle.underlineStyle}
                            errorText={this.props.internationalProp.errorsInt["int_cust_postal_code"]}
                            errorStyle
                            ={customStyle.errorStyle}
                            />
                    </div>
                    <div className='field3'></div>
                </div>
            </div> < div className = 'addcard-int-area' > {/* <div className='added-cards-section'>
                        <div className="card-layout-main">
                        <div className="card-layout-details">
                            <div className="card-icon-div">
                            <img src={visa} className="card-icon"/>
                            </div>
                            <div className="card-layout-text">
                            <label className="card-cust-name-text">Loreum Ipsum</label>
                            <div className="card-cust-number">
                                <div className="card-number-star-text">****</div>
                                <div className="card-number-text">6780</div>
                            </div>
                            </div>
                        </div>
                        <div className="card-layout-delete">
                            <img src={deletebutton} className="delete-icon"/>
                        </div>
                        </div>
                    </div> */
                    }   <div className = 'add-card-button-section' > 
                            <div className='add-card-icon-section'>
                                <img src={cardicon} className='addcard-icon' alt='addcard'/>
                            </div> 
                            < div className = 'add-card-label-section' > <div className='addcard-label'>Add Card</div> </div>
                        </div > 
                    </div> 
                    <div className = 'addcust-int-subfooter-container' > <div className="addcust-int-clear-all-button">
                        <img className="addcust-int-clear-all-icon" src={clearallbtn} alt="clear-all"/>
                        <div
                            className="addcust-int-clear-all-label"
                            onClick={() => this.props.internationalProp.clearAllFieldsInt()}>CLEAR ALL
                        </div>
                    </div> 
                    < div className = "addcust-int-save-button" onClick = {
                                    this.props.internationalProp.openModalsInt
                                } > <img className="addcust-int-save-icon" src={savebtn} alt="save"/> < div className = "addcust-int-save-label" > SAVE </div>
                    </div > 
                </div> 
                    
  
                <PhoneModal phoneModalOpen ={ this.props.internationalProp.phoneModalInt } 
                            phoneModalNum = { this.props.internationalProp.fieldsInt['cust_phone1'] }
                            phoneModalNo = { this.props.internationalProp.closePhoneModalInt }
                            phoneModalYes = { this.props.internationalProp.openTextOptModalInt }  />
                    
                <TextOptModal textOptModalOpen = { this.props.internationalProp.textOptModalInt }
                            textOptModalDisagree = { this.props.internationalProp.openEmailModalInt }
                            textOptModalAgree = { this.props.internationalProp.setCustTextOptInt }  />

               
                <EmailConfirmModal emailModalOpen={ this.props.internationalProp.emailModalInt }
                            emailModalEmailAddress = { this.props.internationalProp.fieldsInt['cust_email'] }
                            emailModalNo = { this.props.internationalProp.closeEmailModalInt }
                            emailModalYes = { this.props.internationalProp.addInternationalCustomerInvoker }
                        />

                
                <SuccessModal successModalOpen = { this.props.internationalProp.succesModalInt } 
                            successModalSalutation = { this.props.internationalProp.selectedSalutationInt}
                            successModalFname = { this.props.internationalProp.fieldsInt['cust_fname'] }
                            successModalLname =  { this.props.internationalProp.fieldsInt['cust_lname'] } 
                            successModalClose = { this.props.internationalProp.closeSuccessModalInt }/>
                    

                <InvalidAddressModal invalidModalOpen = {this.props.internationalProp.failModalInt }
                            invalidModalBack = { this.props.internationalProp.closeFailModalInt }  
                            invalidModalBypass = {this.props.internationalProp.bypassAddressValidationInt }
                            visibility = { true }/>
                

                <InvalidEmailModal invalidEmailOpen = { this.props.internationalProp.failModalInt1 }
                            invalidEmailClose = { this.props.internationalProp.closeFailModalInt1 } 
                            invalidEmailBypass = { this.props.internationalProp.bypassAddressValidation }
                            isHidden = { false}/>
            </div>

)}
}