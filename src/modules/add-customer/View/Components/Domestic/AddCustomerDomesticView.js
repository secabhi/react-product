/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
/* Components import */
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import ReactTooltip from 'react-tooltip'
import '../../../../post-void/postVoid.css';
/* images import */
import SvgIcon from 'material-ui/SvgIcon';

import cardicon from '../../../../../resources/images/Add_Card.svg';
import clearallbtn from '../../../../../resources/images/Clear_All.svg';
import savebtn from '../../../../../resources/images/Save.svg';
import visa from '../../../../../resources/images/Visa.svg'
import deletebutton from '../../../../../resources/images/Delete_Purple.svg'
import info from '../../../../../resources/images/Info.svg'
import arrowdownicon from '../../../../../resources/images/Arrow_Down.svg';
import { ModifyPriceErrorModal } from '../../../../sale/modal-component/modalComponent'
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
import {AddCardModal} from '../../../../add-card/View/Components/Modals/AddCardModal'
import crossicon from '../../../../../resources/images/Close_Bttn_Purple.svg';
import CardContainer from '../../../../add-card/cardContainer'
import cardContainer from '../../../../add-card/cardContainer';

import ErrorModal from '../../../../home/error-modal/errorModal';

 export class AddCustomerDomesticView extends Component {
    constructor(props) {
        super(props);
        this.state = {
                selectedCity : "",
                selectedCityDetails : {}
        }
    }
  componentDidMount(){
      
  }
  toggle = (index) => {
      //debugger;
    if (this.state.selectedCity === index) {
        this.setState({ selectedCity: '', selectedCityDetails : {} })
        document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
    } else {
        this.setState({ selectedCity: index, selectedTransactionDetails :   this.props.domesticProp.citystateList[index] , selectedCityState : this.props.domesticProp.stateList[1]})
        document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = "1";
    }
}

    render()
    { 
       
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
               
                {this.props.domesticProp.addCardResultModal ? this.props.domesticProp.openAddCardResultModal() : ''}    
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
                                maxLength= {14}
                                onChange={this.props.domesticProp
                                .handleChange
                                .bind(this, "cust_fname")}
                                value={this.props.domesticProp.fields["cust_fname"].replace(/[^A-Z0-9.#&]+/ig, "")}
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
                                floatingLabelText="Address Line 1*"
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
                                underlineStyle={customStyle.underlineStyle}
                                errorText={this.props.domesticProp.errors["cust_city"]} 
                                errorStyle ={customStyle.errorStyle} 
                                />
                        </div>
                        <div className='field2'>
                            <SelectField value={this.props.domesticProp.dom_cust_state} 
                            onChange={this.props.domesticProp.handleCustStateChange} 
                            floatingLabelText="State" fullWidth={true} 
                            floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle} 
                            style={customStyle.selectFieldStyle} 
                            labelStyle={customStyle.selectFieldLabelStyle} 
                            menuItemStyle={customStyle.selectFieldMenuItemStyle} 
                            selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle} 
                            iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '85.5px'
                            maxHeight={180} 
                            dropDownMenuProps={{
                                iconButton: <img src={arrowdownicon} alt="arror-icon"/>
                            }} 
                            underlineStyle={customStyle.underlineStyle}
                            errorText={this.props.domesticProp.errors["dom_cust_state"]} 
                            errorStyle ={customStyle.errorStyle} 
                            >
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
                                onBlur={this.props.domesticProp
                                    .handleChange
                                    .bind(this, "dom_cust_zip_blur")}
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
                                value={this.props.domesticProp.fields["cust_email"].replace(/[^A-Z0-9._@]+/ig, "")}
                                errorText={this.props.domesticProp.errors["cust_email"]}
                                errorStyle
                                ={customStyle.errorStyle}
                                underlineStyle={customStyle.underlineStyle}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                        this.props.domesticProp.openModals();
                                        e.preventDefault();
                                        }
                                    }}
                                    
                            />
                        </div>
                    </div>

                </div>

                <div className='addcard-dom-area'>
              
                    {/* <div className='added-cards-section'></div>
                    <div className='add-card-button-section'>
                        <div className='add-card-icon-section'>
                            <img src={cardicon} className='addcard-icon' alt='addcard'/>
                        </div>
                        <div className='add-card-label-section'>
                            <div className='addcard-label'>Add Card</div>
                        </div>
                    </div> */}
                    <CardContainer
                     cardData={
                        (this.props.domesticProp.cardDisplay.length>0) ? this.props.domesticProp.cardDisplay : '' }
                        openCardModals = {this.props.domesticProp.openCardModals}
                        custFname = { this.props.domesticProp.customercardDetails.length>0 ? (this.props.domesticProp.customercardDetails[0].FirstName[0] != '' && this.props.domesticProp.customercardDetails[0].FirstName[0] != undefined ? this.props.domesticProp.customercardDetails[0].FirstName[0] : '') : ''}
                    />
                     {this.props.domesticProp.maxCardWarningMessage()}
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
                <Modal classNames={{ modal: 'post-void-modal-container' }} 
                    open={this.props.errorThrown} 
                    onClose={() => {}} 

                    />
          
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

                <AddCardModal classNames={{ modal: 'add-dom-cust-modal'}}
                              little showCloseIcon={false}
                              addCardModal = {this.props.domesticProp.addCardModal}
                              done = {this.props.domesticProp.closeAddCardModal}
                              cancelSwipeMode = {this.props.domesticProp.cancelSwipeMode}>
                </AddCardModal>

         <Modal classNames={{ modal: 'modify-price-error-modal-container' }}
            open={this.props.domesticProp.zipOverride}
            onClose={() => { }}
          >
            <ModifyPriceErrorModal
              errorText={ZipCodeOverrideText}
             showModifyErrorModal={this.props.domesticProp.closeZipOverideModal}
            />
          </Modal>
          <Modal classNames={{ modal: 'post-void-modal-container' }} open={this.props.domesticProp.cityModal} onClose={() => {

}}>             
                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a City</div>
                    </div>                    
                    <div className="postvoid-selectionarea">
                 
                    { 
                        this.props.domesticProp.citystateList.map(function(item,index) {
                            var rowObject = (
                                <div style={(this.state.selectedCity === index)?(selectedStyle):(unselectedStyle)} onClick={() => this.toggle(index)} key={index} className="carditemlayoutinitial">
                                    <label style={(this.state.selectedCity === index)?(selectedTextStyle):(unselectedTextStyle)} className="labelcardlayout" >
                                        {item}
                                    </label>
                                </div>
                            )
                            return (
                                rowObject
                            );
                        },this)
                    }   
                   
                            {/* <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'1234'}</label></div>
                            <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'12386784'}</label></div>
                            <div style={unselectedStyle} className="carditemlayoutinitial"><label className="labelcardlayout">{'1234634'}</label></div> */}
                 
                                   
                 </div>
                    <div className='post-void-modalselect-button-area'>
                        <button className='post-void-modalselect-cancelbtn' onClick={this.props.domesticProp.cityModalClose} ><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={() =>this.props.domesticProp.populateCity(this.state.selectedTransactionDetails, this.state.selectedCityState)}><span className='post-void-ok-label' disabled>OK</span></button>
                    </div>
                </div>
           
            </Modal>)
         </div>
        );
    }
}

