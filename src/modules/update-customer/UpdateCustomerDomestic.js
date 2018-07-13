import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../common/footer/footer';
import { startSpinner } from '../common/loading/spinnerAction';
import Spinner from '../common/loading/spinner';

import backicon from '../../resources/images/Back.svg';
import verifyicon from '../../resources/images/Verify_White.svg';
import reseticon from '../../resources/images/Reset_All.svg';

import {updateCustomerAction} from './UpdateCustomerAction';
import ReactTooltip from 'react-tooltip'
import cardicon from '../../resources/images/Add_Card.svg';
import clearallbtn from '../../resources/images/Clear_All.svg';
import savebtn from '../../resources/images/Save.svg';
import backarrow from '../../resources/images/Back.svg';
import updatecustomer from '../../resources/images/Add_Customer.svg';
import updatecustomerselected from '../../resources/images/Add_Customer_Selected.svg';
import updateintcustomer from '../../resources/images/Add_International_Customer.svg';
import updateintcustomerselected from '../../resources/images/Add_International_Customer_Selected.svg';

import Modal from 'react-responsive-modal';

import phonemodalicon from '../../resources/images/Confirm_Phone.svg';
import crossicon from '../../resources/images/Cross_Purple.svg';
import tickicon from '../../resources/images/Tick_White.svg';
import textopticon from '../../resources/images/Text_Opt_In.svg';
import emailmodalicon from '../../resources/images/Confirm_Email.svg';
import updatecustsuccessicon from '../../resources/images/Success_Green.svg';
import erroricon from '../../resources/images/Error_Red.svg';
import editIcon from '../../resources/images/Edit_Profile.svg';
import info from '../../resources/images/Info.svg';


import arrowDown from '../../resources/images/Arrow_Down.svg';

import Popup from '../popup/popup';
import VerifyCustomerDomestic from '../verify_customer/View/VerifyCustomerDomView';
import Header from '../common/header/header';
import SelectField from 'material-ui/SelectField';
import SvgIcon from 'material-ui/SvgIcon';
 
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import { parsePhoneNumber } from '../common/helpers/helpers';
import {UpdateCustomerDomesticView} from '../update-customer/View/UpdateCustomerDomView'
	
/* View Components import */
import UpdateCustomerDomView from '../update-customer/View/UpdateCustomerDomView';

class UpdateCustomer extends Component {
    constructor(props) {
        super(props);
        
        this.states = [
            'TX', 'AR'
        ]

        this.states = ['TX', 'DS']
        this.defaultState = this.states[0];

        /**by manjunath, for validate customer popup */
        this.state = {
            updateDomesticShown : true,
            selectedProvince : '',
            selectedSalutation : '',
            selectedCountry : '',
            updateCustImage : updatecustomerselected,
            updateIntCustImage : updateintcustomer,
            isValid:true,
            fields : {},
            errors : {}, 
            invlaid_cust_dom_zip : '',
            invlaid_cust_dom_state : '',
            phoneModal: false,
            textoptModal: false,
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
            currentAddress:{
                
            },
            changedAddress:{
                cust_dom_salutation  : '',
                cust_dom_fname       : '',
                cust_dom_lname       : '',
                cust_dom_address1    : '',
                cust_dom_address2    : '',
                cust_dom_mobile      : '',
                cust_dom_email       : '',
                cust_dom_otherMobile  : '',
                cust_dom_city        : '',
                cust_dom_state    : '',
                cust_dom_country     : '',
                cust_dom_zip    : ''
            },
            fields : {},
            errors : {}
        }
    }


    componentWillMount() {
        console.log("UpdateCustomer Domestic Will mount");
        this.fetchSalutation();
        this.fetchStates();
        this.props.startSpinner(false);
    }

     /* This method is invoked if any of the props changes, via reducer */
    
     componentWillReceiveProps = nextProps => {
        console.log('Update Customer: componentWillReceiveProps', nextProps);
        console.log(this.state.currentAddress)
        if(nextProps.updateCustomer.successModalFlag === true) {
            console.log("11111");
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
                succesModal: true
            })
        }
        if(nextProps.updateCustomer.addressValidationSuccessFlag === true && nextProps.updateCustomer.successModalFlag === false) {
            console.log("22222");
            this.cust_addr_validation_bypass = true;
            //this.setState({showPopup:!this.state.showPopup});
            this.updateDomesticCustomerInvoker(true);
            //this.props.startSpinner(false);

        }

        if(nextProps.updateCustomer.verifyAddressFlag === true) {
            console.log("33333");
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
        if(nextProps.updateCustomer.invalidPhone===true)
        {
            console.log("55555");
           
           // this.isValid = false;
        }
        if(nextProps.updateCustomer.errors.length > 0) {
            console.log("66666");
            this.setState({
        
                emailModal: false
            });
            if(nextProps.updateCustomer.errors[0].cust_email==='INVALID EMAIL')
            {   
                this.setState({
        
                    emailModal: false
                });

                this.openaddrEmailMOdal();
            }

            if(nextProps.updateCustomer.errors[0].dom_cust_zip==='INVALID ZIP')
            {   
                let errors; 
                this.setState({invlaid_cust_dom_zip: nextProps.updateCustomer.errors[0].dom_cust_zip});
            }
            if(nextProps.updateCustomer.errors[0].dom_cust_state==='INVALID STATE')
            {   
                let errors; 
                this.setState({invlaid_cust_dom_state: nextProps.updateCustomer.errors[0].dom_cust_state});
            }

            if(nextProps.updateCustomer.errors[0].cust_email==='INVALID EMAIL')
            {  
                this.openaddrEmailMOdal();

            }
            
            
            this.props.startSpinner(false);
            //console.log(nextProps.updateCustomer.errors[0].dom_cust_mobile);
            this.setState({errors : nextProps.updateCustomer.errors});
        }

        if((nextProps.updateCustomer.isProfileLoaded) && (nextProps.updateCustomer.customerProfile != '{}'))
            {
               // debugger
                console.log(Object.keys(this.state.currentAddress).length);
                if(Object.keys(this.state.currentAddress).length == 0)
                {
                  //  debugger
                    this.setState({profileData :  nextProps.updateCustomer.customerProfile}, function(){
                        this.getAddress();
                    })
                }
                
            }
    }

    
    /**Fetch the salutations list from local json */
    
    fetchSalutation(){
        var salutationData = require('../../resources/stubs/salutationList.json');
        if(salutationData){
            this.setState({salutationDataDrop: salutationData.Salutation });
        }
    }

    /**Fetch the state list from local json */
    fetchStates(){
        var statesData = require('../../resources/stubs/states.json');
        if(statesData){
            this.setState({statesDataDrop: statesData.states });
        }
    }

    /*** update customer data */
     /* Submit add customer data - Domestic */
     updateDomesticCustomerInvoker = (bypassFlag) => {
         //alert('update '+bypassFlag)
       //  console.log(this.state.changedAddress);
       this.props.startSpinner(true);
       this.setState({emailModal:false});
        let addCustDomData = {
            'ClientID': '0101:0169:04042018:033639',
            'ClientTypeID': '1000',
            'SourceApp': 'CMOS',
            'SourceLoc': 'NM-DIRECT',
            'CFirstName': this.state.changedAddress['cust_dom_fname'],
            'CLastName': this.state.changedAddress['cust_dom_lname'],
            'Salutation': this.state.selectedSalutation,
            'Address_Ln1': this.state.changedAddress['cust_dom_address1'],
            'City': this.state.changedAddress['cust_dom_city'],
            'State_Abbr': this.state.changedAddress['cust_dom_state'],
            'Zip5':this.state.changedAddress['cust_dom_zip'],
            'CEmail': this.state.changedAddress['cust_dom_email'],
            'Country': 'US',
            'CMobile': this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, ""),
            'storeClientNo': '10000000257',
            'storeAssoc': '209289',
            'donotcall': this.state.cust_text_opt,
            'flagByPASS': bypassFlag,

           /* "ClientID":"0101:0169:04042018:033639",
                "ClientTypeID":"1000",
                "SourceApp":"CMOS",
                "SourceLoc":"NM-DIRECT",
                "CFirstName":this.state.changedAddress['cust_dom_fname'],
                "CLastName":this.state.changedAddress['cust_dom_lname'],
                "Address_Ln1":this.state.changedAddress['cust_dom_address1'],
                "City":this.state.changedAddress['cust_dom_city'],
                "State_Abbr":this.state.changedAddress['cust_dom_state'],
                "Zip5":this.state.changedAddress['cust_dom_zip'],
                "CEmail":this.state.changedAddress['cust_dom_email'],
                "Country":this.state.changedAddress['cust_dom_country'],
                "CMobile":this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, ""),
                "storeClientNo":"10000000257",
                "storeAssoc":"209289" ,
                "flagByPASS":false */
                /*"ClientID":"0101:0169:04042018:033639",
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
        
        this.props.updateCustomerActionInvoker(addCustDomData);
    }

    
    handleValidation() {
        let fields = this.state.changedAddress;
        let errors = {};
       
    
        if (!fields['cust_dom_fname']) {
            errors['cust_dom_fname'] = 'First Name cannot be empty';
           // this.isValid = false;
             
        } 
        else if (!fields['cust_dom_lname']) {
            errors['cust_dom_lname'] = 'Last Name cannot be empty';
           // this.isValid = false;
        } 
        else if(fields['cust_dom_fname'] && fields['cust_dom_fname'] && (!fields['cust_dom_address1'] && !fields['cust_dom_email']))
        {   
           this.openaddrEmailMOdal();
           // this.isValid = false;
          console.log(this.isValid)
          return this.isValid;
        }
        else if (!fields['cust_dom_address1']) {
            errors['cust_dom_address1'] = 'Address Line 1 cannot be empty';
            //this.isValid = false;
        } 
        else if (!fields['cust_dom_country']) {
            errors['cust_dom_country'] = 'Country cannot be empty';
            //this.isValid = false;
        } 
        

        else{
            //this.isValid = true;
        }
        if (fields['cust_dom_mobile'] !== '' && fields['cust_dom_mobile'] !== undefined) {
            var phoneValid = fields['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, "")
            if (phoneValid.length < 10 || phoneValid.length > 10) {
                console.log('cust_dom_mobile' + phoneValid.length);
                errors['cust_phone1'] = 'Invalid Phone Number';
               // this.isValid = false;    
            }
        }

        if ( fields["cust_dom_email"] !== '' &&  fields["cust_dom_email"] !== undefined &&  fields["cust_dom_email"] !== null) {
            let lastAtPos = fields["cust_dom_email"].lastIndexOf('@');
            let lastDotPos = fields["cust_dom_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["cust_dom_email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["cust_dom_email"].length - lastDotPos) > 2)) {
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
        handleChange = (name,event) => {
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
        getAddress(){
            //alert('in get address');
            // var profile = {
            //     cust_dom_salutation  : 'Mr',
            //     cust_dom_fname       : 'Janci',
            //     cust_dom_lname       : 'Smith',
            //     cust_dom_address1    : '9303 Spring Hollow Dr',
            //     cust_dom_address2    : 'Apt. 6',
            //     cust_dom_mobile      : '9786298858',
            //     cust_dom_email       : 'areall@anyemail.com',
            //     cust_dom_otherMobile  : '9786298858',
            //     cust_dom_city        : 'New York',
            //     cust_dom_state    : 'NY',
            //     cust_dom_country     : 'US',
            //     cust_dom_zip    : '78750'
            // }
            var profile = {
                cust_dom_salutation  : this.state.profileData.cust_dom_salutation,
                cust_dom_fname       : this.state.profileData.cust_dom_fname,
                cust_dom_lname       : this.state.profileData.cust_dom_lname,
                cust_dom_address1    : this.state.profileData.cust_dom_address1,
                cust_dom_address2    : this.state.profileData.cust_dom_address2,
                cust_dom_mobile      : this.state.profileData.cust_dom_mobile,
                cust_dom_email       : this.state.profileData.cust_dom_email,
                cust_dom_otherMobile  : this.state.profileData.cust_dom_otherMobile,
                cust_dom_city        : this.state.profileData.cust_dom_city,
                cust_dom_state    : this.state.profileData.cust_dom_state,
                cust_dom_country     : this.state.profileData.cust_dom_country,
                cust_dom_zip    : this.state.profileData.cust_dom_zip
            }

            
            this.setState({currentAddress:profile});
            //this.setState({dom_cust_state:'NY'});
            this.setState({dom_cust_state : this.state.profileData.cust_dom_state})
            //this.setState({selectedSalutation:'Mr'});
            this.setState({selectedSalutation: this.state.profileData.cust_dom_salutation})
            //this.setState({dom_cust_country:'US'});
            this.setState({dom_cust_country:this.state.profileData.cust_dom_country});
           
            
            var changedProfile = Object.create(profile);
          
            this.setState({changedAddress:changedProfile});
    
        }
        resetAll = () =>{
            this.setState({changedAddress:Object.create(this.state.currentAddress)})
        }
        componentDidMount(){
           // this.getAddress();
           
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
                cust_dom_fname : "",
                cust_dom_lname : "",
                cust_dom_address1 : "",
                cust_dom_address2 : "",
                cust_dom_city : "",
                cust_dom_email : "",
                cust_dom_mobile : "",
                cust_dom_otherMobile : "",

                cust_dom_zip : ""
            },
            selectedSalutation : "",
            cust_dom_state: ""});
        }
        
        openModals = () => {
            if(this.handleValidation()){
                if ((this.state.changedAddress["cust_dom_mobile"])  && (this.state.changedAddress["cust_dom_mobile"]!==this.state.currentAddress["cust_dom_mobile"])) {
              
                this.setState({
                        showPopup:false, phoneModal: true
                    });
        
                } else if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress['cust_dom_email'])) {
                    this.setState({
                        showPopup:false, emailModal: true
                    });
                } else {
                    this.setState({
                        showPopup:false, emailModal: false
                    });
                    this.updateDomesticCustomerInvoker(false);
                    this.props.startSpinner(true); 
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
        
           if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress['cust_dom_email'])) {
            this.setState({
                emailModal: true
            });
            }
        
            else{
                this.updateDomesticCustomerInvoker(false);
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
            });
            this.props.startSpinner(false);
        }
        
        closeSuccessModal = () => {
            this.setState({
                succesModal: false
            })
            this.setState({
                succesModal: false
            });
            this.props.startSpinner(false);
            this.setState({succesModal:false});
            this.props.history.push('/customer-details');
        }
        
        goBacktoCustDetails=()=>{
            this.props.history.push('/customer-details');
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
           // debugger;
            this.setState({
                cust_text_opt: 'Y'
            });
            if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress['cust_dom_email'])) {
                this.openEmailModal();
            }
            else{
                this.updateDomesticCustomerInvoker(false);
            }
        }
        
        
        
        bypassAddressValidation = () => {
            //alert('bypass')
            this.closeFailModal();

            //debugger;
            this.cust_addr_validation_bypass = false;
            this.updateDomesticCustomerInvoker(true);
            //debugger
            return;
        }
        
  

    render() {
        return(<UpdateCustomerDomView
                history = {this.props.history}
                selectedSalutation = {this.state.selectedSalutation}
                selectedSalutationInt = {this.state.selectedSalutationInt}
                handleSalutationChange = {this.handleSalutationChange}
                salutationDataDrop = {this.state.salutationDataDrop}
                handleChange = {this.handleChange}
                handleChangeInt = {this.handleChangeInt}
                fields = {this.state.fields}
                errors = {this.state.errors}                
                dom_cust_state ={this.state.dom_cust_state}
                handleCustStateChange = {this.handleCustStateChange}
                openModals = {this.openModals}
                phoneModal = {this.state.phoneModal}                        
                emailModal = {this.state.emailModal}
                failModal = {this.state.failModal}
                goBacktoCustDetails = {this.goBacktoCustDetails}
                resetAll = {this.resetAll}
                closePhoneModal = {this.closePhoneModal}
                openTextOptModal = {this.openTextOptModal}
                textoptModal={this.state.textoptModal}
                openEmailModal = {this.openEmailModal}
                setCustTextOpt = {this.setCustTextOpt}
                closeEmailModal = {this.closeEmailModal}
                updateDomesticCustomerInvoker = {this.updateDomesticCustomerInvoker}
                closeSuccessModal = {this.closeSuccessModal}
                closeFailModal = {this.closeFailModal}
                bypassAddressValidation = {this.bypassAddressValidation}
                closeaddrEmailMOdal = {this.closeaddrEmailMOdal}
                togglePopup = {this.togglePopup}
                showPopup = {this.state.showPopup}
                isValid = {this.state.isValid}
                cust_text_opt = {this.state.cust_text_opt}
                currentAddress = {this.state.currentAddress}
                changedAddress = {this.state.changedAddress}
                invlaid_cust_dom_state = {this.state.invlaid_cust_dom_state}
                invlaid_cust_dom_zip = {this.state.invlaid_cust_dom_zip}
                dom_cust_country = {this.state.dom_cust_country}
                sele = {this.state.sele}
                statesDataDrop = {this.state.statesDataDrop}
                succesModal = {this.state.succesModal}
            />);
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
function mapStateToProps({ updateCustomer,customerDetails }) {
    return { updateCustomer ,customerDetails};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateCustomerActionInvoker: updateCustomerAction,
        startSpinner:startSpinner }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomer);