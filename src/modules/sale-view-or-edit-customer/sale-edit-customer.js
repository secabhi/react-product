import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './sale-edit-customer.css';
import './alert-popups.css';
import Footer from '../common/footer/footer';
import backicon from '../../resources/images/Back_White.svg';
import verifyicon from '../../resources/images/Verify_White.svg';
import reseticon from '../../resources/images/Reset_All.svg';

import {saleEditCustomerAction,getCountryList} from './SaleEditCustomerAction';

import ReactTooltip from 'react-tooltip'
import cardicon from '../../resources/images/Add_Card.svg';
import clearallbtn from '../../resources/images/Clear_All.svg';
import savebtn from '../../resources/images/Save.svg';
import backarrow from '../../resources/images/Back.svg';
import updatecustomer from '../../resources/images/Add_Customer.svg';
import updatecustomerselected from '../../resources/images/Add_Customer_Selected.svg';



import addcustomer from '../../resources/images/Add_Customer.svg';
import addcustomerselected from '../../resources/images/Add_Customer_Selected.svg';
import reminder from '../../resources/images/Reminder.svg';
import reminderselected from '../../resources/images/Reminder_Selected.svg';

import Modal from 'react-responsive-modal';

import phonemodalicon from '../../resources/images/Confirm_Phone.svg';
import crossicon from '../../resources/images/Cross_Purple.svg';
import tickicon from '../../resources/images/Tick_White.svg';
import textopticon from '../../resources/images/Text_Opt_In.svg';
import emailmodalicon from '../../resources/images/Confirm_Email.svg';
import successicon from '../../resources/images/Success_Green.svg';


import erroricon from '../../resources/images/Error_Red.svg';
import editIcon from '../../resources/images/Edit_Profile.svg';
import info from '../../resources/images/Info.svg';



import arrowDown from '../../resources/images/Arrow_Down.svg';

import Popup from './popup';
import AddCardButton from '../add-card-button/add-card-button';
import VerifyCustomerSale from './verifyCustomer';
import Header from '../common/header/header';
import SelectField from 'material-ui/SelectField';
import SvgIcon from 'material-ui/SvgIcon';
import Badge from 'material-ui/Badge';


import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import { parsePhoneNumber } from '../common/helpers/helpers';
import VerifyCustomerDomestic from '../verify_customer/View/VerifyCustomerDomView';

class SaleEditCustomer extends Component {
    constructor(props) {
        super(props);
        
        this.states = [
            'TX', 'AR'
        ]

        this.states = ['TX', 'DS']
        this.defaultState = this.states[0];

        /**by manjunath, for validate customer popup */
        this.state = {
            salesEditShown : true,
            userType : '',
            selectedProvince : '',
            editShown : true,
            selectedSalutation : '',
            selectedCountry : '',
            addCustImage : addcustomerselected,
            reminderImg : reminder,
            updateCustImage : updatecustomerselected,
            isValid:true,
            fields : {},
            errors : {}, 
            invlaid_cust_zip : '',
            invlaid_cust_state : '',
            phoneModal: false,
            textOptModal: false,
            emailModal: false,
            closeaddrEmailMOdal : false,
            succesModalFlag:false,
            failModal:false,
            salutationDataDrop:[],
            selectedSalutation: '',
            dom_cust_state: '',
            dom_cust_country: 'US',
            cust_text_opt: 'N',
            showPopup : false,
            countryList: [],
            currentAddress1:{
            },
            changedAddress:{
                cust_salutation  : '',
                cust_fname       : '',
                cust_lname       : '',
                cust_address1    : '',
                cust_address2    : '',
                cust_mobile      : '',
                cust_email       : '',
                cust_otherMobile  : '',
                cust_city        : '',
                cust_state    : '',
                cust_country     : '',
                cust_zip    : ''
            },
            fields : {},
            errors : {},
            profileData: {
                cust_salutation  : 'Mr',
                cust_fname       : 'Bharath',
                cust_lname       : 'Subramani',
                cust_address1    : '9303 SPRING HOLLOW DR',
                cust_address2    : 'Apt. 6',
                cust_mobile      : '9786298858',
                cust_email       : 'Bharath_Subramani@neimanmarcus.com',
                cust_otherMobile : '9786298858',
                cust_city        : 'NEW YORK',
                cust_province    : 'ON',
                cust_state       : 'NY',
                cust_country     : 'US',
                cust_zip    : '78750'
                
            }
        }
        
        this.profileData = {};
        this.togglePopup = this.togglePopup.bind();
    }


    componentWillMount() {
        console.log("Sales Edit Customer Domestic Will mount");
        this.initCustomer();
        

        this.fetchSalutation();
    }

     /* This method is invoked if any of the props changes, via reducer */
    
     componentWillReceiveProps = nextProps => {
       
        console.log('saleditCustomer: componentWillReceiveProps', nextProps);
        if(nextProps.saleEditCustomer.successModalFlag === true) {
            this.setState({
                emailModal: false
            });
            this.setState({
                phoneModal: false
            });
            this.setState({
                textoptModal : false
            });
            this.setState({
                failModal: false
            })
            this.setState({
                succesModal: true
            })
        }
        if(nextProps.saleEditCustomer.addressValidationSuccessFlag === true && nextProps.saleEditCustomer.successModalFlag === false) {
            this.cust_addr_validation_bypass = true;
            //this.setState({showPopup:!this.state.showPopup});
            this.saleEditCustomerInvoker(true);

        }
        if(nextProps.saleEditCustomer.verifyAddressFlag === true) {
            this.setState({
                emailModal: false
            });
            this.setState({
                phoneModal: false
            });
            this.setState({
                textoptModal : false
            });
            this.setState({
                failModal: true
            })
        }
        /*if(nextProps.updateCustomer.addressValidationSuccessFlag === false) {

            this.openFailModal();

        }*/
        if(nextProps.saleEditCustomer.invalidPhone===true)
        {
           
           // this.isValid = false;
        }
        if(nextProps.saleEditCustomer.errors.length > 0) {

            this.setState({
        
                emailModal: false
            });
            if(nextProps.saleEditCustomer.errors[0].cust_email==='INVALID EMAIL')
            {   
                this.setState({
        
                    emailModal: false
                });

                this.openaddrEmailMOdal();
            }

            if(nextProps.saleEditCustomer.errors[0].dom_cust_zip==='INVALID ZIP')
            {   
                let errors; 
                this.setState({invlaid_cust_zip: nextProps.saleEditCustomer.errors[0].dom_cust_zip});
            }
            if(nextProps.saleEditCustomer.errors[0].dom_cust_state==='INVALID STATE')
            {   
                let errors; 
                this.setState({invlaid_cust_state: nextProps.saleEditCustomer.errors[0].dom_cust_state});
            }

            if(nextProps.saleEditCustomer.errors[0].cust_email==='INVALID EMAIL')
            {  
                this.openaddrEmailMOdal();

            }

            //console.log(nextProps.updateCustomer.errors[0].dom_cust_mobile);
            this.setState({errors : nextProps.saleEditCustomer.errors});
        }
    }

    
    /**Fetch the salutations list from local json */
    
    fetchSalutation(){
        var salutationData = require('../../resources/stubs/salutationList.json');
        if(salutationData){
            this.salutationDataDrop=salutationData.Salutation;
        }
    }

    gotoSalesPage=()=>{
        this.props.history.push('/sale');
    }
    
    /*** update customer data */
     /* Submit add customer data - Domestic */
     saleEditCustomerInvoker = (bypassFlag) => {
       //  console.log(this.state.changedAddress);
        let editCustDomData = {
            'ClientID': '0010:0168:05092018:033639',
            'ClientTypeID': '1000',
            'SourceApp': 'CMOS',
            'SourceLoc': 'NM-DIRECT',
            'CFirstName': this.state.changedAddress['cust_fname'],
            'CLastName': this.state.changedAddress['cust_lname'],
            'Salutation': this.state.selectedSalutation,
            'Address_Ln1': this.state.changedAddress['cust_address1'],
            'City': this.state.changedAddress['cust_city'],
            'State_Abbr': this.state.changedAddress['cust_state'],
            'Zip5': this.state.changedAddress['cust_zip'],
            'CEmail': this.state.changedAddress['cust_email'],
            'Country': 'US',
            'CMobile': this.state.changedAddress['cust_mobile'].replace(/[^A-Z0-9]+/ig, ""),
            'storeClientNo': '0001000284641',
            
            'storeAssoc': '209289',
            'donotcall': this.state.cust_text_opt,
            'flagByPASS': bypassFlag,
            

           /* "ClientID":"0010:0168:05092018:033639",
                "ClientTypeID":"1000",
                "SourceApp":"CMOS",
                "SourceLoc":"NM-DIRECT",
                "CFirstName":this.state.changedAddress['cust_fname'],
                "CLastName":this.state.changedAddress['cust_lname'],
                "Address_Ln1":this.state.changedAddress['cust_address1'],
                "City":this.state.changedAddress['cust_city'],
                "State_Abbr":this.state.changedAddress['cust_state'],
                "Zip5":this.state.changedAddress['cust_zip'],
                "CEmail":this.state.changedAddress['cust_email'],
                "Country":this.state.changedAddress['cust_country'],
                "CMobile":this.state.changedAddress['cust_mobile'].replace(/[^A-Z0-9]+/ig, ""),
                "storeClientNo":"10000000257",
                "storeAssoc":"209289" ,
                "flagByPASS":false */
                /*"ClientID":"0010:0168:05092018:033639",
                "ClientTypeID":"1000",
                "SourceApp":"CMOS",
                "SourceLoc":"NM-DIRECT",
                "CFirstName":"Bharath",
                "CLastName":"Subramani",
                "Address_Ln1":"asdasdfsadff",
                "City":"NEW YORK",
                "State_Abbr":"NY",
                "Zip5":"78750",
                "CEmail":"Bharath_Subramani@neimanmarcus.com",
                "Country":"US",
                "CMobile":"9786298858",
                "storeClientNo":"10000000257",
                "storeAssoc":"209289" ,
                "flagByPASS":false*/
              



        }
        
        this.props.saleEditCustomerActionInvoker(editCustDomData);
    }

    
    handleValidation() {
        let fields = this.state.changedAddress;
        let errors = {};
    
        if (!fields['cust_fname']) {
            errors['cust_fname'] = 'First Name cannot be empty';
           // this.isValid = false;
             
        } 
        else if (!fields['cust_lname']) {
            errors['cust_lname'] = 'Last Name cannot be empty';
           // this.isValid = false;
        } 
        else if(fields['cust_fname'] && fields['cust_fname'] && (!fields['cust_address1'] && !fields['cust_email']))
        {   
           this.openaddrEmailMOdal();
           // this.isValid = false;
          console.log(this.isValid)
          return this.isValid;
        }
        else if (!fields['cust_address1']) {
            errors['cust_address1'] = 'Address Line 1 cannot be empty';
            //this.isValid = false;
        } 
        // else if (!fields['cust_country']) {
        //     errors['cust_country'] = 'Country cannot be empty';
        //     //this.isValid = false;
        // } 
        

        else{
            //this.isValid = true;
        }
        if (fields['cust_mobile'] !== '' && fields['cust_mobile'] !== undefined) {
            var phoneValid = fields['cust_mobile'].replace(/[^A-Z0-9]+/ig, "")
            if (phoneValid.length < 10 || phoneValid.length > 10) {
                console.log('cust_mobile' + phoneValid.length);
                errors['cust_phone1'] = 'Invalid Phone Number';
               // this.isValid = false;    
            }
        }

        if ( fields["cust_email"] !== '' &&  fields["cust_email"] !== undefined &&  fields["cust_email"] !== null) {
            let lastAtPos = fields["cust_email"].lastIndexOf('@');
            let lastDotPos = fields["cust_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["cust_email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["cust_email"].length - lastDotPos) > 2)) {
                errors["cust_email"] = "Email is not valid";
               // this.isValid = false;
            }
        }

        this.isValid=isObjectEmpty(errors);
        console.log('isValid'+ this.isValid);
        this.setState({errors: errors});
        return this.isValid;
    }
    handleChangeonError(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields : fields});
        let errors = this.state.errors;
        errors[field] = "";
        this.setState({errors:errors});
    }
    
        /**functions  by manjunath, for validate customer popup */
        handleChange(name,event){
       
            var changedAddress = this.state.changedAddress;
            changedAddress[name] = event.target.value;
            this.setState({changedAddress});
            //console.log(this.state.changedAddress);
        }
        togglePopup=()=>{
            this.setState({
                emailModal: false
            });
            this.setState({
                addrEmailMOdal: false
            });
            this.setState({
                phoneModal: false
            });

            if(this.handleValidation()){

                this.setState({showPopup:!this.state.showPopup});  
            }

        }
        initCustomer= () =>{
            console.log('sale custome rprofile'+JSON.stringify(this.props.saleEditCustomer.profileData.country))
            if(this.props.saleEditCustomer.profileData != {} && this.props.saleEditCustomer.profileData != undefined && this.props.saleEditCustomer.profileData != null) {
                var profileDataLocal = Object.assign({}, this.state.profileData)
                profileDataLocal.cust_country = this.props.saleEditCustomer.profileData.country;
                this.profileData = profileDataLocal;          
            }
            this.setState({currentAddress1:this.profileData,dom_cust_state:'NY',selectedSalutation:'Mr',dom_cust_country:'US'});
            
            var changedProfile = Object.create(this.profileData);
          
            this.setState({changedAddress:changedProfile});

            //to set the user type
            if(this.state.profileData.cust_country=='US')
            {
                this.setState({
                    userType:'dom'
                })
            }
            else{
                this.setState({
                    userType:'int'
                })
                this.props.getCountriesInvoker();

            }
        }
        resetAll = () =>{
            this.setState({changedAddress:Object.create(this.state.currentAddress1)})
        }
        componentDidMount(){
            console.log(this.props.match.params.id);
            
            //this.getAddress();
            
        }
        
        /**manjunath functions closed for validate customer popup */
        

        
        /* Salutation change - Domestic */
        handleSalutationChange = (event, index, value) => {
            console.log(value);
            this.setState({ selectedSalutation : value });
        }    

        /* State change - Domestic */
        handleCustStateChange = (event, index, value) => {
            console.log(value);
            this.setState({ dom_cust_state : value });
        }

        /* Province change - International */
        handleProvinceChange = (event, index, value) => {
            console.log(value);
            this.setState({ selectedProvince : value });
        }

        /* Country change - International */
        handleCountryChange = (event, index, value) => {
            console.log(value);
            this.setState({ selectedCountry : value });
        }



        clearAllFields(){
            this.setState({ fields : {
                cust_fname : "",
                cust_lname : "",
                cust_address1 : "",
                cust_address2 : "",
                cust_city : "",
                cust_email : "",
                cust_mobile : "",
                cust_otherMobile : "",

                cust_zip : ""
            },
            selectedSalutation : "",
            cust_state: ""});
        }
        
        openModals = () => {

            if(this.handleValidation()){
                this.setState({showPopup:false})

                console.log(this.state.changedAddress['cust_email']!==this.state.currentAddress1['cust_email']);
                if (this.state.changedAddress['cust_mobile'] && (this.state.changedAddress['cust_mobile']!==this.state.currentAddress1['cust_mobile'])) {
                    this.setState({
                        phoneModal: true
                    });
        
                } else if (this.state.changedAddress['cust_email']  && (this.state.changedAddress['cust_email']!==this.state.currentAddress1['cust_email'])) {
                    this.setState({
                        emailModal: true
                    });
                } else {
                    this.setState({
                        emailModal: false
                    });
                    this.saleEditCustomerInvoker(false);
                    //this.setState({showPopup:!this.state.showPopup});  
                }
            }
              
          }
        
        
        
        
        
        
        
        closePhoneModal = () => {
            this.setState({
                phoneModal: false
            });
        }
        
        
        openTextOptModal = () => {
            this.setState({
                phoneModal: false
            });
        
            this.setState({
                textoptModal: true
            });
        }
        
        
        
        closeTextOptModal = () => {
            this.setState({
                textoptModal: false
            });
        }
        
        openEmailModal = () => {
            this.setState({
                textoptModal: false
            });
        
           if (this.state.changedAddress['cust_email']  && (this.state.changedAddress['cust_email']!==this.state.currentAddress1['cust_email'])) {
            this.setState({
                emailModal: true
            });
            }
        
            else{
                this.saleEditCustomerInvoker();
            }
           
        }
        
        closeEmailModal = () => {
            this.setState({
                emailModal: false
            });
        }
        
        closeaddrEmailMOdal = () => {
            this.setState({
                addrEmailMOdal: false
            });
            this.setState({
                textoptModal: false
            });
            this.setState({
                emailModal: false
            });

        }

        openaddrEmailMOdal = () => {
            this.setState({
                addrEmailMOdal: true
            });
        }



        openSuccesModal = () => {
            this.setState({
                emailModal: false
            });
            this.setState({
                phoneModal: false
            });
            this.setState({
                succesModal: true
            })
        }
        
        closeSuccessModal = () => {
            this.setState({
                succesModal: false
            })
            this.setState({
                succesModal: false
            });
            this.setState({succesModal:false});
            this.gotoSalesPage();

        }
        
        goBacktoCustDetails=()=>{
            //this.props.history.push('/customer-details');
        }
        openFailModal = () => {
        
            this.setState({
                emailModal : false 
            });
            this.setState({
                phoneModal : false 
            });
         
            this.setState({
                textoptModal: false
            });

            this.setState({
                failModal: true
            });
        }
        
        closeFailModal = () => {
            this.setState({
                textoptModal: false
            });

            this.setState({
                failModal: false
            });
            this.setState({
                emailModal: false
            });
            this.setState({
                phoneModal: false
            });
        }
        
        handleChange(field, e) {
            let fields = this.state.changedAddress;
            fields[field] = e.target.value;
            this.setState({changedAddress : fields});
            let errors = this.state.errors;
            errors[field] = "";
            this.setState({errors:errors});
        }
        
        
        custSalutation = (event) => {
            this.setState({
                cust_salutation: event.value
            });
        }
        
        custStateEdit = (event) => {
            this.setState({
                dom_cust_state: event.value
            });
        }
        
        setCustTextOpt = () => {
            this.setState({
                cust_text_opt: 'Y'
            });
            if (this.state.changedAddress['cust_email']  && (this.state.changedAddress['cust_email']!==this.state.currentAddress1['cust_email'])) {
                this.openEmailModal();
            }
            else{
                this.saleEditCustomerInvoker(false);
            }
        }
        
        
        
        bypassAddressValidation = () => {
            this.closeFailModal();
            this.cust_addr_validation_bypass = true;
            this.saleEditCustomerInvoker(this.cust_addr_validation_bypass);
            return;
        }
        

        switchToEdit = () =>  {

            /*this.clearAllFieldsInt();
            this.clearAllFields();*/
            document.getElementsByClassName('edit-customer-label')[0].classList.add('selected-tab-label');
            document.getElementsByClassName('reminders-label')[0].classList.remove('selected-tab-label');
            this.setState({ 
            editShown : true,
            addCustImage : addcustomerselected,
            reminderImg :reminder 
            });
        }
    
        /* Switch tab to International */
    
        switchToRemainders = () =>  {
            
           /* this.clearAllFields();
            this.clearAllFieldsInt();*/
           // this.props.getCountryListActionInvoker();
            document.getElementsByClassName('edit-customer-label')[0].classList.remove('selected-tab-label');
            document.getElementsByClassName('reminders-label')[0].classList.add('selected-tab-label');
            this.setState({ 
            editShown : false,
            addCustImage : addcustomer,
            reminderImg : reminderselected ,
            
            });
        }



    render() {
        var selectFieldFloatingLabelStyle = {
            height: '53px',
            fontFamily: 'Roboto-Light',
            fontSize: '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.33',
            letterSpacing: '2px',
            textAlign: 'left',
            opacity:'0.61',
            color: '#333333'
        }
    
        var selectFieldStyle = {
            height: '103px',
            paddingTop: '28.5px',
            paddingBottom:'26.5px',
        }
        
        var Dropdownicon = (props) => (
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
            <defs>
          
               
              
            </defs>
            <path id="Arrow_Down" class="selectDropDownSvgIcon" d="M.8,185.8l22.9,22.9,23.1-22.9" transform="translate(-0.05 -185.05)"/>
            </svg>
       );

        var selectFieldLabelStyle = {
            height: '63px',
            fontFamily: 'Roboto-Regular',
            fontSize: '48px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.33',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#333333',
            paddingTop: '32px',
            paddingLeft:'10px'
        }
    
        var selectFieldMenuItemStyle = {
            height: '30px',
            fontFamily: 'Roboto-Regular',
            fontSize: '48px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingLeft:'10px',
        }
    
        var selectFieldIconStyle = {
            fontSize: '48px',
        }
    
        var textFieldFloatingLabelStyle = {
            height: '53px',
            fontSize: '40px',
            fontFamily: 'Roboto',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            lineHeight: '1.33',
            textAlign: 'left',
            opacity:'0.69',
            color: '#333333',
            
        }

    
        var textFieldStyle = {
            height: '61.5px',
            paddingTop: '65px',
            paddingBottom:'31px',
        }
    
        var textFieldInputStyle = {
            height: '63px',
            fontFamily: 'Roboto',
            fontSize: '48px',
            lineHeight: '1.33',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingBottom: '4.5px',
            paddingLeft:'10px',
            marginTop:'20px'

        }
    
        var errorStyle= {
            position:'absolute',
            paddingTop:'15px',
            bottom:'initial',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: '40px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'rigth',
            color: '#d53560',
            right:'0'
        }
        var underlineStyle= {
            backgroundColor: '#828282',
            height:'0.8px'
            //border: solid 0.8px #828282;
        }

        var editCustomer = (<div>
        <div className="edit-cust-sale-addcard">
                    <AddCardButton/>
                </div>
        <div className='view-edit-customer-inputarea'>
        <div className='row1-fields fields2'>
            <div className='field1 first-name-field'>
                <SelectField
                
                    floatingLabelText="Sal..."
                    dropDownMenuProps={{
                        
                        iconButton:<Dropdownicon/>,
                   }}
                    fullWidth = {true}
                    underlineStyle = {underlineStyle}

                    floatingLabelStyle={selectFieldFloatingLabelStyle}
                    style = {selectFieldStyle}
                    labelStyle = {selectFieldLabelStyle}
                    menuItemStyle = {selectFieldMenuItemStyle}
                    selectedMenuItemStyle = {selectFieldMenuItemStyle}
                    iconStyle = {selectFieldIconStyle}
                    maxHeight = '190.5px'
                    maxWidth = '150px'
                    onChange={this.handleSalutationChange}
                    value={this.state.selectedSalutation}
                   
                >
                    
                    {
                        this.salutationDataDrop.map(function(item, i){
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
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    onChange={this.handleChange.bind(this,'cust_fname')} 
                    value={this.state.changedAddress['cust_fname']}
                    refs="cust_fname"
                    errorText= {this.state.errors["cust_fname"]}
                     errorStyle ={errorStyle}
                    
                />
                
            </div>
        </div>

            <div className='last-name-field full-field'>
                <TextField
                    type="text"
                    floatingLabelText="Last Name*"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    onChange={this.handleChange.bind(this,'cust_lname')} 
                    value={this.state.changedAddress['cust_lname']}
                    refs="cust_lname"
                    errorText= {this.state.errors["cust_lname"]}
                     errorStyle ={errorStyle}
                    

                    
                />
            </div>
            
            <div className='mobile-phone-field full-field'>
                    <TextField
                        type="number"
                        floatingLabelText="Mobile Phone"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style = {textFieldStyle}
                        underlineStyle = {underlineStyle}

                        fullWidth = {true}
                        inputStyle = {textFieldInputStyle}
                        refs="cust_mobile"
                        onChange={this.handleChange.bind(this, "cust_mobile")}
                        value={this.state.changedAddress["cust_mobile"]}
                        errorText= {this.state.errors["cust_phone1"]}
                        errorStyle ={errorStyle}
                    >
                    <InputMask 
                    refs="cust_mobile"
                    mask="(999) 999-9999" maskChar="" onChange={this.handleChange.bind(this, "cust_mobile")}
                    value={this.state.changedAddress["cust_mobile"]}/>
                    </TextField>
                </div>
            
                <div className='other-phone-filed full-field'>
                <TextField
                    type="number"
                    floatingLabelText="Other Phone"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    refs= 'cust_otherMobile'
                >
                     <InputMask mask="(999) 999-9999" maskChar="" onChange={this.handleChange.bind(this, "cust_otherMobile")}
                     refs= 'cust_otherMobile'
                    value={this.state.changedAddress["cust_otherMobile"]}/>
                </TextField>
            </div>

            <div className='address-line-1-field full-field'>
                <TextField
                    type="text"
                    floatingLabelText="Address Line 1*"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    refs="cust_address1"
                    onChange={this.handleChange.bind(this,'cust_address1')} 
                    value={this.state.changedAddress['cust_address1']}
                    refs="updt_addressline1"
                    errorText= {this.state.errors["cust_address1"]}
                    errorStyle ={errorStyle}
                    
                    
              
                />
            </div>
            <div className='address-line-2-field full-field'>
                <TextField
                    type="text"
                    floatingLabelText="Address Line 2"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    refs= 'cust_address2'
                    onChange={this.handleChange.bind(this,'cust_address2')} 
                    value={this.state.changedAddress['cust_address2']}
                />
            </div>
            
            <div className="row8 fields2">
            <div className='city-field field1'>
                <TextField
                    type="text"
                    floatingLabelText="City"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}

                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    refs= 'cust_city'
                    onChange={this.handleChange.bind(this,'cust_city')} 
                    value={this.state.changedAddress['cust_city']}
                />
            </div>
            <div className='state-field field2'>
                
                {  this.state.userType=='dom'?
                <SelectField
                    floatingLabelText="State"
                    dropDownMenuProps={{
                        
                        iconButton:<Dropdownicon/>,
                   }}
                    fullWidth = {true}
                    underlineStyle = {underlineStyle}

                    floatingLabelStyle={selectFieldFloatingLabelStyle}
                    style = {selectFieldStyle}
                    labelStyle = {selectFieldLabelStyle}
                    menuItemStyle = {selectFieldMenuItemStyle}
                    selectedMenuItemStyle = {selectFieldMenuItemStyle}
                    iconStyle = {selectFieldIconStyle}
                    maxHeight = '190.5px'
                    refs= 'cust_state'
                    onChange={this.handleCustStateChange} 
                    value={this.state.dom_cust_state}
                    errorText= {this.state.invlaid_cust_state}
                    errorStyle ={errorStyle}
                >
                    <MenuItem className="select-field-menu-item" key={1} value={"NY"} primaryText="NY" />
                    <MenuItem className="select-field-menu-item" key={2} value={"TX"} primaryText="TX" />
                </SelectField>:
                <TextField
                            
                    floatingLabelText="Province"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    fullWidth = {true}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}
                    inputStyle = {textFieldInputStyle}
                    refs='cust_province'
                    onChange={this.handleChange.bind(this,'cust_province')}
                    value={this.state.changedAddress['cust_province']}
                    refs= 'cust_province'
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
                    style = {textFieldStyle}
                    fullWidth = {true}
                    underlineStyle = {underlineStyle}

                    inputStyle = {textFieldInputStyle}
                    refs= 'cust_email'
                    onChange={this.handleChange.bind(this,'cust_email')} 
                    value={this.state.changedAddress['cust_email']}
                    errorText= {this.state.errors["cust_email"]}
                    errorStyle ={errorStyle}
                />
            </div>
            { this.state.userType=='dom'?
            <div className='zip_field full-field'>
                <TextField
                    type="text"
                    floatingLabelText="Zip"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    style = {textFieldStyle}
                    underlineStyle = {underlineStyle}
                   
                    fullWidth = {true}
                    inputStyle = {textFieldInputStyle}
                    refs= 'cust_zip'
                    onChange={this.handleChange.bind(this,'cust_zip')} 
                    value={this.state.changedAddress['cust_zip'].replace(/[^0-9]/g, '')}
                    errorText= {this.state.invlaid_cust_zip}
                    errorStyle ={errorStyle}

                />
            </div>:
            <div className="row8 fields2">
                 <div className='country field2'>
                    <SelectField
                        floatingLabelText="Country"
                        dropDownMenuProps={{
                                    
                            iconButton:<Dropdownicon/>,
                       }}
                        value={this.state.changedAddress['update_int_country']}
                        onChange={this.handleCountryChange.bind(this,"update_int_country")}
                        fullWidth = {true}
                        floatingLabelStyle={selectFieldFloatingLabelStyle}
                        style = {selectFieldStyle}
                        underlineStyle = {underlineStyle}
                        labelStyle = {selectFieldLabelStyle}
                        menuItemStyle = {selectFieldMenuItemStyle}
                        selectedMenuItemStyle = {selectFieldMenuItemStyle}
                        iconStyle = {selectFieldIconStyle}
                        errorText= {this.state.errors["update_int_country"]}
                        errorStyle={errorStyle}
                        maxHeight = '190.5px'
                        refs="update_int_country"
                        
                    >
                    {
                        this.state.countryList.map(function(item, i){
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
                            style = {textFieldStyle}
                            underlineStyle = {underlineStyle}
                            fullWidth = {true}
                            inputStyle = {textFieldInputStyle}
                            refs= 'cust_pincode'
                            onChange={this.handleChange.bind(this,'cust_pincode')} 
                            value={this.state.changedAddress['cust_pincode']}

                    />
                </div>

            </div>

            }
        

        </div>
        <div className="edit-cust-buttonfooter">
        <div className="edit-cust-sale-cancel-div">                    
            <button className="edit-cust-sale-cancelbtn" 
               
            >
            
            <img src={crossicon} className="edit-cust-sale-clearicon" />CANCEL</button>
        </div>


      

        <div className="edit-cust-sale-ok-div">
            <button className="edit-cust-sale-okbtn"  
             onClick={this.togglePopup.bind(this)
                //this.openModals
            }
            >OK</button>
        </div>
    </div>

    </div>);

    var reminders = (<div className="reminders-content"></div>);
        return (<div className="view-edit-cust-sff-main">

{
                    /**validate customer popup  */
                   
                    this.state.showPopup?
                    <Popup className="verifycust-pop-sff" text="Verify Update"
                            closePopup={this.togglePopup.bind(this)}>
                            { /*<VerifyCustomerDomestic 
                            togglePopup = {this.togglePopup}
                            openModals = {this.openModals}
                            isValid = {this.state.isValid}
                            dom_cust_state={this.state.dom_cust_state}
                            dom_cust_country = {this.state.dom_cust_country}
                            selectedSalutation = {this.state.selectedSalutation}
                            bypassFlag={this.bypassFlag} 
                            cust_text_opt={this.state.cust_text_opt} 
                            state={this.state.sele}
                            currentAddress={this.state.currentAddress1} 
                            changedAddress={this.state.changedAddress}/> 
                            */}
                            <VerifyCustomerSale togglePopup = {this.togglePopup}
                            openModals = {this.openModals}
                            isValid = {this.state.isValid}
                            dom_cust_state={this.state.dom_cust_state}
                            dom_cust_country = {this.state.dom_cust_country}
                            selectedSalutation = {this.state.selectedSalutation}
                            bypassFlag={this.bypassFlag} 
                            cust_text_opt={this.state.cust_text_opt} 
                            state={this.state.sele}
                            currentAddress={this.state.currentAddress1} 
                            changedAddress={this.state.changedAddress} />
                    </Popup>
                    :null
                    /**validate customer popup code close */

                }
                
                <Header history={this.props.history}></Header>
                <div className="view-editprofile">
                    <div className="view-editprofile-header">
                        <img src={backicon} className="backiconCls" onClick={this.goBacktoCustDetails}/>
                        <div className="sff-devider"></div>
                        <h4 className="customer-name">Ms. Barbara Jones</h4>
                    </div>
                </div>

                <div className='editcust-subheader-container'>

                    <div className='edit-customer-tab-header' onClick={this.switchToEdit}>
                        <img src={this.state.addCustImage} className='edit-customer-icon' alt="edit-customer-icon" />
                        <div className='edit-customer-label selected-tab-label'>Profile</div>
                    </div>
                    <div className='reminders-tab-header' onClick={this.switchToRemainders}>
                        <img src={this.state.reminderImg} className='reminders-icon' alt="reminders-icon" />
                        <Badge className="view-edit-sale-cust-badge"
                badgeContent={3}
                secondary={true}
                badgeStyle={{top: 14, right:29,width:48,height:48}}
                >
                </Badge>
                        <div className='reminders-label'>Reminders</div>
                    </div>
                    <div className='tab-header-spacer'>
                    </div>
                </div>
                
                <div className='view-edit-customer-sale'>

                
                <div className='tab-content'>

                    { (this.state.editShown === true) ? 
                        (editCustomer) : 
                        (reminders) 
                    } 
                </div>

                 {/*validation modals*/}
                 <Modal open={this.state.phoneModal} classNames={{ modal: 'small-ff-modal'}} little showCloseIcon='false' >
                        <div className='edit-cust-sff-container'>
                            <img src={phonemodalicon} className='edit-cust-sff-modal-icon'/>
                            <div className='edit-cust-sff-phone-modal-label'>Is this your correct phone number?</div>
                            <div className='edit-cust-sff-phone-modal-conform-phone'>{this.state.changedAddress['cust_mobile']}</div>
                            <div className='edit-cust-sff-modal-conform-phone-button-area'>
                                <div className='edit-cust-sff-modal-no-btn' onClick={this.closePhoneModal} ><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='edit-cust-sff-modal-yes-btn' onClick={this.openTextOptModal} ><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                                {/*<div className='add-dom-cust-phone-modal-skip-btn' onClick={this.openEmailModal} >Skip</div> */}
                            </div>
                        </div>  
                </Modal> 




                <Modal open={this.state.textoptModal} onClose={this.closeTextOptModal} classNames={{ modal: 'small-ff-modal'}} little showCloseIcon='false' >
                        <div className = 'edit-cust-sff-container'>
                            <img src={textopticon} className='edit-cust-sff-modal-icon'/>
                            <div className='edit-cust-sff-phone-modal-label'>Text Opt In/ Out</div>
                            <div className='edit-cust-sff-text-opt-message-area'><span className='edit-cust-sff-text-opt-message'>I would like to receive promotional text messages and images from Neiman Marcus Group LLC and its companies. Rates may apply.</span></div>
                            <div className='edit-cust-sff-modal-textopt-button-area'>
                                <div className='edit-cust-sff-modal-textopt-disagree-btn' onClick={this.openEmailModal}><span className='edit-cust-sff-modal-textopt-disagree-btn-label'>DISAGREE</span></div>
                                <div className='edit-cust-sff-modal-textopt-agree-btn' onClick={this.setCustTextOpt}><span className='edit-cust-sff-modal-textopt-agree-btn-label'>AGREE</span></div>
                                {/*<div className='add-dom-cust-textopt-modal-skip-btn' onClick={this.openEmailModal}>Skip</div> */}
                            </div>
                        </div>
                </Modal>

                <Modal open={this.state.emailModal} onClose={this.emailModal} classNames={{ modal: 'small-ff-modal'}} little showCloseIcon='false'  >
                        <div className = 'edit-cust-sff-container'>
                            <img src={emailmodalicon} className='edit-cust-sff-modal-icon'/>
                            <div className='edit-cust-sff-email-modal-label'>Is this your correct email address?</div>

                            {/*<div className='add-dom-cust-phone-modal-conform-email'data-tip={this.state.changedAddress['cust_email']}>{this.state.changedAddress['cust_email']}<ReactTooltip place="top" className="tooltipCls"></ReactTooltip></div>*/}
                            <div class="cust-email-tooltip">
                                <ReactTooltip data-class="react-email-tooltip-custom" effect="solid" place="top" className="tooltipCls" data-event='click'></ReactTooltip>
                                <div className='edit-cust-sff-email-modal-conform-email'>{this.state.changedAddress['cust_email']}
                                </div>
                                        {this.state.changedAddress['cust_email'].length>25?<img className="tooltip-info-icon" data-tip={this.state.changedAddress['cust_email']} data-event='click' src={info}/>:'' }
                            </div>


                            <div className='edit-cust-sff-modal-email-button-area'>
                                <div className='edit-cust-sff-modal-no-btn' onClick={this.closeEmailModal}><span className='add-dom-cust-modal-no-btn-label'>NO</span></div>
                                <div className='edit-cust-sff-modal-yes-btn' onClick={this.saleEditCustomerInvoker.bind(this,false)}><span className='add-dom-cust-modal-yes-btn-label'>YES</span></div>
                                {/*<div className='add-dom-cust-email-modal-skip-btn' onClick={this.openEmailModal} onClick={this.upDomesticCustomerInvoker} >Skip</div>  */}
                            </div> 
                        </div>
                </Modal>

                <Modal open={this.state.succesModal} onClose={this.closeSuccessModal} 
                little showCloseIcon='false' classNames={{ modal: 'small-ff-modal small-ff-success-modal' }} >
                        <div className='`edit-cust-sff-success-modal-container`'>
                            <img src={successicon} className='edit-cust-sff-success-modal-icon'/>
                            <div className='edit-cust-sff-success-modal-message'>
                                The customer <span> {this.state.selectedSalutation} {this.state.changedAddress['cust_fname']} {this.state.changedAddress['cust_lname']} </span>
                                    has been updated successfully.
                            </div>
                            <div className='edit-cust-sff-success-modal-close-btn' onClick={this.closeSuccessModal}><span className='edit-cust-sff-success-modal-close-btn-label'>CLOSE</span></div>  
                        </div>    
                </Modal>

                <Modal open={this.state.failModal}   little showCloseIcon='false'  classNames={{ modal: 'small-ff-modal'}}>
                        <div className='edit-cust-sff-container'>
                            <img src={erroricon} className='edit-cust-sff-modal-icon'/>
                            <div className='edit-cust-sff-fail-modal-message-area'><span className='edit-cust-sff-fail-modal-message-text'>Invalid address - Cannot be validated.
                                    Select EDIT to correct address. If BYPASS is selected, the clientele record and all purchase history will be deleted from the clientele system. </span>
                            </div>
                            <div className='edit-cust-sff-fail-modal-button-area'>
                                <div className='edit-cust-sff-modal-fail-backtoedit-btn' onClick={this.closeFailModal}><span className='edit-cust-sff-modal-backtoedit-btn-label'>BACK TO EDIT</span></div>
                                <div className='edit-cust-sff-modal-fail-bypass-btn' onClick={this.bypassAddressValidation}><span className='edit-cust-sff-modal-bypass-btn-label'>BYPASS</span></div>
                            </div>
                        </div>  
                </Modal>

                <Modal open={this.state.addrEmailMOdal}   little showCloseIcon='false'  classNames={{ modal: 'small-ff-modal'}}>
                        <div className='edit-cust-sff-addr-fail-container'>
                            <img src={erroricon} className='edit-cust-sff-modal-icon'/>
                            <div className='edit-cust-sff-addr-email-modal-message-area'><span className='edit-cust-sff-addr-email-modal-message-text'>
                            You must supply a valid street address or email address for this client. Press OK to continue. </span>
                            </div>
                            <div className='edit-cust-sff-fail-modal-button-area'>
                                <div className='edit-cust-sff-modal-ok-btn' onClick={this.closeaddrEmailMOdal}><span className='edit-cust-sff-modal-ok-btn-label'>OK</span></div>
                            </div>
                        </div>  
                </Modal>

                {/** validation modals close **/}


                </div>
                <Footer></Footer>
            </div >
       
        );
    }

}
function isObjectEmpty(obj){
    if(obj== null) return true;
    if(obj.length===0) return false;
    if(obj.length>0) return false;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
function mapStateToProps({ saleEditCustomer }) {
    return { saleEditCustomer };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountriesInvoker: getCountryList,saleEditCustomerActionInvoker: saleEditCustomerAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleEditCustomer);





