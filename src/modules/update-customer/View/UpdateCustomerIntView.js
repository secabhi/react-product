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
import cardicon from '../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../resources/images/Clear_All.svg';
import savebtn from '../../../resources/images/Save.svg';
import visa from '../../../resources/images/Visa.svg'
import deletebutton from '../../../resources/images/Delete_Purple.svg'
import info from '../../../resources/images/Info.svg';
import backicon from '../../../resources/images/Back.svg';
import verifyicon from '../../../resources/images/Verify_White.svg';
import reseticon from '../../../resources/images/Reset_All.svg';

/*Styles import */

import '../../add-customer/View/Styles/AddCustomerStyle.css';
import {customStyle} from '../View/Styles/UpdateCustomerComponentStyle';
import '../View/Styles/UpdateCustomerInternational.css';

/*Alert Modals import */
import Popup from '../../popup/popup';
import VerifyCustomer from '../../verify_customer/View/VerifyCustomerIntView';
// import { Salutation } from '../Fields/Salutation';
import Footer from '../../common/footer/footer';
import Header from '../../common/header/header';
import PhoneModal from '../../update-customer/View/Components/AlertModals/PhoneModal';
import TextOptModal from '../../update-customer/View/Components/AlertModals/TextOptModal';
import EmailModal from '../../update-customer/View/Components/AlertModals/EmailModal';
import SuccessModal from '../../update-customer/View/Components/AlertModals/SuccessModal';

export default class UpdateCustomerInternationalView extends Component {
    componentDidMount(){
        
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
            <Popup text="Verify&nbsp;Update"
                    closePopup={this.props.togglePopup.bind(this)}>
                    <VerifyCustomer 
                    togglePopup = {this.props.togglePopup}
                    openModals = {this.props.openModals}
                    isValid = {this.props.isValid}
                    cust_text_opt = {this.props.cust_text_opt}
                    currentAddress={this.props.currentAddress} changedAddress={this.props.changedAddress}/>

            </Popup>
            :null
            /**validate customer popup code close */

        }
        <Header history={this.props.history}></Header>
        <div className="update-cust-editprofile">
            <div className="update-intdom-editHeader">
                <img src={backicon} className="update-intdom-backiconCls" onClick={this.props.goBacktoCustDetails}/>
                <h4 className="update-intdom-customertext-correction">Edit Profile</h4>
            </div>
        </div>
       

        <div className='update-customer-domestic'>
  <div className='update-custdom-inputarea'>
            <div className='update-custdom-row1'>
                <div className='field1'>
                    <SelectField
                    
                        floatingLabelText="Sal.."
                        fullWidth = {true}
                        dropDownMenuProps={{
                            
                            iconButton:<Dropdownicon/>,
                        }}
                        onChange={this.props.salutationChange.bind(this,"update_int_salutation")}
                        floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                        style = {customStyle.selectFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        labelStyle = {customStyle.selectFieldLabelStyle}
                        menuItemStyle = {customStyle.selectFieldMenuItemStyle}
                        selectedMenuItemStyle = {customStyle.selectFieldMenuItemStyle}
                        iconStyle = {customStyle.selectFieldIconStyle}
                        maxHeight = {190.5}
                        value={this.props.changedAddress["update_int_salutation"]}
                       
                    >
                       {/* <MenuItem className="select-field-menu-item" key={1} value={"Mr"} primaryText="Mr" />
                        <MenuItem className="select-field-menu-item" key={2} value={"Mrs"} primaryText="Mrs" />*/}
                        {
                            this.props.salutationDataDrop.map(function(item, i){
                                 return <MenuItem className="select-field-menu-item" key={i} value={item.Value} primaryText={item.Value} />;
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
                        refs="update_int_fname"
                        fullWidth = {true}
                        underlineStyle = {customStyle.underlineStyle}
                        inputStyle = {customStyle.textFieldInputStyle}
                        errorText= {this.props.errors["update_int_fname"]}
                        value={this.props.changedAddress["update_int_fname"]}
                        errorStyle ={customStyle.errorStyle}
                        onChange={this.props.handleChangeonInternational.bind(this, "update_int_fname")}
                        
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
                        refs="update_int_lname"
                        errorStyle ={customStyle.errorStyle}
                        errorText= {this.props.errors["update_int_lname"]}
                        value={this.props.changedAddress["update_int_lname"]}
                        onChange={this.props.handleChangeonInternational.bind(this,'update_int_lname')}
                        
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
                        refs="update_int_mobile"
                            onChange={this.props.handleChangeonInternational.bind(this, "update_int_mobile")}
                            value={this.props.changedAddress["update_int_mobile"]}
                        >
                        <InputMask 
                        mask="+99 999 999 99999" maskChar=""
                        refs="update_int_mobile"
                        onChange={this.props.handleChangeonInternational.bind(this, "update_int_mobile")}
                        value={this.props.changedAddress["update_int_mobile"]}/>
                        </TextField>
                </div>
            </div>
            <div className='update-custdom-row2'>
                <div className='field1'>
                    <TextField
                        type="text"
                        floatingLabelText="Address Line 1*"
                        floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                        style = {customStyle.textFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        fullWidth = {true}
                        inputStyle = {customStyle.textFieldInputStyle}
                        refs= 'update_int_address1'
                        errorStyle ={customStyle.errorStyle}
                        errorText= {this.props.errors["update_int_address1"]}
                        value={this.props.changedAddress["update_int_address1"]}
                        onChange={this.props.handleChangeonInternational.bind(this, "update_int_address1")}
                        
                  
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
                        refs= 'update_int_address2'
                        value={this.props.changedAddress["update_int_address2"]}
                        onChange={this.props.handleChangeonInternational.bind(this, "update_int_address2")}
                    />
                </div>
                <div className='field3'>
                    <TextField
                        type="number"
                        floatingLabelText="Other Phone"
                        floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                        style = {customStyle.textFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        fullWidth = {true}
                        inputStyle = {customStyle.textFieldInputStyle}
                        refs="update_int_otherMobile"
                        onChange={this.props.handleChangeonInternational.bind(this, "update_int_otherMobile")}
                        value={this.props.changedAddress["update_int_otherMobile"]}
                        >
                        <InputMask 
                        refs="update_int_otherMobile"
                        mask="+99 999 999 9999" maskChar="" onChange={this.props.handleChangeonInternational.bind(this, "update_int_otherMobile")}
                        value={this.props.changedAddress["update_int_otherMobile"]}/>
                        </TextField>
                </div>
            </div>
            <div className='update-custdom-row3'>
                <div className='field1'>
                    <TextField
                        type="text"
                        floatingLabelText="City"
                        floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                        style = {customStyle.textFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        fullWidth = {true}
                        inputStyle = {customStyle.textFieldInputStyle}
                        refs= 'update_int_city'
                        errorText= {this.props.errors["update_int_city"]}
                        errorStyle={customStyle.errorStyle}
                        onChange={this.props.handleChangeonInternational.bind(this,'update_int_city')} 
                        value={this.props.changedAddress['update_int_city']}
                    />
                </div>
                <div className='field2'>
                <TextField
                    
                    floatingLabelText="Province"
                    floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                    fullWidth = {true}
                    style = {customStyle.textFieldStyle}
                    underlineStyle = {customStyle.underlineStyle}
                    inputStyle = {customStyle.textFieldInputStyle}
                    refs='update_int_province'
                    onChange={this.props.handleChangeonInternational.bind(this,'update_int_province')} 
                    value={this.props.changedAddress['update_int_province']}
                    refs= 'update_int_province'
                >
                </TextField>
                </div>
                <div className='field3'>
                    <TextField
                        type="email"
                        floatingLabelText="Email Address"
                        floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                        style = {customStyle.textFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        fullWidth = {true}
                        inputStyle = {customStyle.textFieldInputStyle}
                        refs= 'update_int_email'
                        errorStyle ={customStyle.errorStyle}
                        errorText= {this.props.errors["update_int_email"]}
                        onChange={this.props.handleChangeonInternational.bind(this,'update_int_email')} 
                        value={this.props.changedAddress['update_int_email']}
                    />
                </div>
            </div>
            <div className='update-custdom-row4'>
            <div className='field1'>
            <SelectField
                floatingLabelText="Country"
                dropDownMenuProps={{
                            
                    iconButton:<Dropdownicon/>,
               }}
                value={this.props.changedAddress['update_int_country']}
                onChange={this.props.handleCountryChange.bind(this,"update_int_country")}
                fullWidth = {true}
                floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                style = {customStyle.selectFieldStyle}
                underlineStyle = {customStyle.underlineStyle}
                labelStyle = {customStyle.selectFieldLabelStyle}
                menuItemStyle = {customStyle.selectFieldMenuItemStyle}
                selectedMenuItemStyle = {customStyle.selectFieldMenuItemStyle}
                iconStyle = {customStyle.selectFieldIconStyle}
                errorText= {this.props.errors["update_int_country"]}
                errorStyle={customStyle.errorStyle}
                maxHeight = {190.5}
                refs="update_int_country"
                
            >
            {
                this.props.countryList.map(function(item, i){
                    return <MenuItem className="select-field-menu-item" key={i} value={item} primaryText={item} />;
                  })
            }
            </SelectField>
        </div>
                
                <div className='field2'>
                    <TextField
                        type="text"
                        floatingLabelText="Postal Code"
                        floatingLabelStyle={customStyle.textFieldFloatingLabelStyle}
                        style = {customStyle.textFieldStyle}
                        underlineStyle = {customStyle.underlineStyle}
                        fullWidth = {true}
                        inputStyle = {customStyle.textFieldInputStyle}
                        refs= 'update_int_pincode'
                        value={this.props.changedAddress['update_int_pincode']}
                        onChange={this.props.handleChangeonInternational.bind(this,'update_int_pincode')} 
                        

                    />
                </div>
            </div>
            </div>
            <div className="update-custdom-buttonfooter">
            <div className="update-custdom-verifybtn-div">                    
                <button className="update-custdom-verifybtn" onClick={this.props.togglePopup.bind(this)
                    //this.openModals
                }><img src={verifyicon} className="update-custdom-clearicon" />VERIFY</button>
            </div>
            <div className="update-custdom-reset-div">
                <button className="update-custdom-resetbtn" onClick={this.props.resetAll}><img src={reseticon} className="update-custdom-reseticon" />RESET ALL</button>
            </div>
        </div>
         </div>
         <PhoneModal 
                changedAddress = {this.props.changedAddress}
                phoneModal = {this.props.phoneModal}
                invokedFrom = "updateCustomerInternational"
                currentAddress={this.props.currentAddress}
                openTextOptModal = {this.props.openTextOptModal}
                closePhoneModal={this.props.closePhoneModal}
                succesModal={this.props.succesModal}
                 />
                 <TextOptModal 
                    textoptModal={this.props.textoptModal}
                    openEmailModal= {this.props.emailModal}
                    setCustTextOpt={this.props.setCustTextOpt}
                    openEmailModal={this.props.openEmailModal}
                    succesModal={this.props.succesModal}
                 />
                 <EmailModal  
                 emailModal={this.props.emailModal}
                 openEmailModal= {this.props.emailModal}
                 closeEmailModal={this.props.closeEmailModal}
                 invokedFrom = "updateCustomerInternational"
                 currentAddress={this.props.currentAddress}
                 changedAddress = {this.props.changedAddress}
                 updateInternationalCustomerInvoker = {this.props.updateInternationalCustomerInvoker}
                />
                <SuccessModal
                succesModal={this.props.succesModal}
                selectedSalutation={this.props.selectedSalutation}
                currentAddress={this.props.currentAddress}
                changedAddress = {this.props.changedAddress}
                invokedFrom = "updateCustomerInternational"
                closeSuccessModal={this.props.closeSuccessModal}
                />
        <Footer></Footer>
    </div >

);}
}