import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/**
 * Component Imports
 */
import CustomerEditFormView from '../View/customerEditFormView.js';

import { parsePhoneNumber, validPostalCode,validInterPostalCode } from '../../../common/helpers/helpers';

/**
 * SVGs
 */
import addintcustomer from '../../../../resources/images/Add_International_Customer.svg';
import addcustomerselected from '../../../../resources/images/Add_Customer_Selected.svg';
import addcustomer from '../../../../resources/images/Add_Customer.svg';
import addintcustomerselected from '../../../../resources/images/Add_International_Customer_Selected.svg';

import { addCustomerAction, addCustomerIntAction, resetAddCustomerPage, getCountryList } from '../../../add-customer/BusinessLogic/AddCustomerAction';


const config = require('../../../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

class CustomerEditForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            changedAddress: {
                cust_cssId: this.props.customerDetails.cCSNumber ? this.props.customerDetails.cCSNumber: '',
                cust_dom_salutation  : this.props.customerDetails.salutation ? this.props.customerDetails.salutation: '',
                firstName: this.props.customerDetails.firstName ? this.props.customerDetails.firstName: '',
                lastName : this.props.customerDetails.lastName ? this.props.customerDetails.lastName: '',
                address1    : this.props.customerDetails.selectedAddress.Addr1 ? this.props.customerDetails.selectedAddress.Addr1: '',
                address2    : this.props.customerDetails.selectedAddress.Addr2 ? this.props.customerDetails.selectedAddress.Addr2: '',
                cust_dom_mobile      : this.props.customerDetails.selectedAddress.PhoneNumbers.length > 0 ? this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneNumber: '',
                email       : this.props.customerDetails.emailAddress ? this.props.customerDetails.emailAddress: '',
                cust_dom_otherMobile  : this.props.customerDetails.selectedAddress.PhoneNumbers.length > 1  ? this.props.customerDetails.selectedAddress.PhoneNumbers[1].phoneNumber: '',
                city        : this.props.customerDetails.selectedAddress.City ? this.props.customerDetails.selectedAddress.City: '',
                state    : this.props.customerDetails.selectedAddress.State ? this.props.customerDetails.selectedAddress.State: '',
                country     : this.props.customerDetails.selectedAddress.Country ? this.props.customerDetails.selectedAddress.Country: '',
                postal : this.props.customerDetails.selectedAddress.Postal ? this.props.customerDetails.selectedAddress.Postal.slice(0,5): '',
                province: this.props.customerDetails.selectedAddress.Province ? this.props.customerDetails.selectedAddress.Province: '',
                zip    : this.props.customerDetails.selectedAddress.Zip ? this.props.customerDetails.selectedAddress.Zip.slice(0,5): ''
            },
            selectedSalutation : this.props.customerDetails.salutation?this.props.customerDetails.salutation:'',
            salutationDataDrop:[],
            errors: {},
            fields : {},
            statesList:[],
            state:'',
            countryList: [],
            addrEmailMOdal:false,
            custType: 'Domestic',
            addCustImage: addcustomerselected,
            addIntCustImage: addintcustomer,
        }

        this.isValid = false;
    }

    componentWillMount() {
        this.fetchSalutation();
        this.fetchStates();
        !this.props.addGiftCardCall? this.props.getCountriesInvoker(): "";
        console.log("first name", this.props)
        console.log("SHIV LOG CHANGEDADDRESS", this.state.changedAddress)
        // if(this.props.viewEditCustomer.profileData != {} && this.props.viewEditCustomer.profileData != undefined && this.props.viewEditCustomer.profileData != null) {
        //     var profileDataLocal = Object.assign({}, this.state.profileData)
        //     profileDataLocal.country = this.props.viewEditCustomer.profileData.country;
        //     this.profileData = profileDataLocal;          
        // }     
        //this.getAddress();
        // this.props.startSpinner(false);
        // console.log("SHIV CUSTDEETS", this.state.changedAddress)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.addCustomer.countryList.length > 0) {
            this.setState({ countryList: nextProps.addCustomer.countryList });
        }

        if (nextProps.addCustomer.successModalFlag === true) {
            // alert("yes hello?")
            this.addDomCustomer(true);
            this.setState({ emailModal: false, succesModal: true });
            this.props.startSpinner(false);
            this.props.componentChangeHandler("itemsToBeShipped");
        }

        // if (nextProps.addCustomer.addressValidationSuccessFlag === true && this.state.custType == 'International') {
        //     this.addInternationalCustomerInvoker(true);
        //     this.setState({ emailModal: false, succesModal: true });
        //     this.props.startSpinner(false);
        //     alert("WAZZZUP")
        //     this.props.componentChangeHandler("itemsToBeShipped");
        // }
        
    }

    componentDidUpdate() {
        console.log("THE SHIV:"+this.props.formType, this.props.freqShippedAddrSelected)
        if(this.props.freqShippedAddrSelected){
            this.switchToFreqAddress();
        }
    }

    switchToFreqAddress = () =>{
        let tempAddress = this.state.changedAddress;

        for(var key in this.props.freqShippedAddrSelected){
            console.log("SHIV TYPEOF:", typeof(this.props.freqShippedAddrSelected[key]));
            console.log("THE SHIV tempAddress:", key+this.props.freqShippedAddrSelected[key])
            tempAddress[key] = this.props.freqShippedAddrSelected[key];
        }
        this.setState({changedAddress: tempAddress})
        this.props.freqShippedSelectedHandler();

    }

    handleSalutationChange = (value, e) => {
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        this.setState({
            selectedSalutation: fields[value]
        });
    }

    // formatPhoneint = (intPhone) => {

    //     var phoneint = intPhone.replace(/[^A-Z0-9]+/ig, "");
    //     var formattedPhone = phoneint;
    //     var lastTen = formattedPhone.substr(formattedPhone.length - 13);
    //     return parseInt(lastTen);
    // }

    /* Country change - International */
    handleCountryChange = (event, index, value) => {
        console.log(value);
        let errors = this.state.errors;
        errors['country'] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress['country'] = value;
        this.setState({errors:errors,changedAddress:changedAddress});
    }

    clearAllFields = () => {
        this.setState({
            changedAddress: {
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                city: "",
                email: "",
                cust_dom_mobile: "",
                cust_dom_otherMobile: "",
                postal: "",
                province: "",
                country:"",
                state:"",
                zip:"",
            },
            errors: {
                cust_fname: "",
                cust_lname: "",
                cust_addr1: "",
                cust_addr2: "",
                cust_city: "",
                cust_email: "",
                cust_phone1: "",
                cust_phone2: "",
            },
            selectedSalutation: "",
            //selectedCountry: "",
        });
    }

    fetchSalutation = () => {
        if(this.props.salutationData){
            this.setState({ salutationDataDrop: this.props.salutationData.Salutations});
        }
    }

    fetchStates = () => {
        const statesList = require('../../../../resources/stubs/states.json');
        if(statesList){
            this.setState({ statesList: statesList.states});
        }
    }

    handleStateChange = (event, index, value) => {
        let fields = this.state.fields;
        fields['state'] = value;
        let errors = this.state.errors;
        errors['state'] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress['state'] = value;
        this.setState({errors:errors,fields : fields ,changedAddress:changedAddress});
    }

    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        let errors = this.state.errors;
        errors[field] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress[field] = e.target.value;
        this.setState({errors:errors,fields : fields ,changedAddress:changedAddress});
    }

    handleCustTypeChange = () =>{
            console.log("initial",this.state.custType)
        if(this.state.custType === "Domestic"){
            console.log("int",this.state.custType)
            this.setState({
                custType: "International",
                addCustImage: addcustomer,
                addIntCustImage: addintcustomerselected

            })
        }
        else if(this.state.custType === "International"){
            console.log("domestic",this.state.custType)
            this.setState({
                custType: "Domestic",
                addCustImage: addcustomerselected,
                addIntCustImage: addintcustomer,
            })
        }
    }

    openCloseAddrEmailMOdal = () => {
        if(this.state.addrEmailMOdal === false){
            this.setState({
                addrEmailMOdal: true
            });
        }else{
            this.setState({
                addrEmailMOdal: false
            });
        }
    }

    handleValidation =()=> {
        let fields = this.state.changedAddress;
        let errors = {};
        let fnameValidation = true, lnameValidation = true, phoneValidation = true
        , emailValidation = true, addrValidation = true, zipValidation = true;
        this.isValid = false;


        if (!fields['firstName']) {
            errors['firstName'] = 'First Name cannot be empty';  
            fnameValidation = false;
        }
    
        if (!fields['lastName']) {
            errors['lastName'] = 'Last Name cannot be empty';
            lnameValidation = false;     
        }
        
        if (fields['email'] == '' ||  fields['email'] == undefined ||  fields['email'] == null) {
                errors["email"] = "Email missing";
                emailValidation = false;
        }
        
        if(fields['address1'] == '' ||  fields['address1'] == undefined ||  fields['address1'] == null) {
                errors['address1'] = 'Address missing';
                addrValidation = false;
        }

        if(fields['address1']){
            if (!fields['zip']) {
                errors['zip'] = 'zipcode cannot be empty';   
                zipValidation = false; 
                // this.openFieldsMissingModal();
                
            }
        }

        if(emailValidation === false && addrValidation === false) {
            errors["email"] = "";
            errors['address1'] = "";
            this.openCloseAddrEmailMOdal();
        }
        else if(emailValidation === true && addrValidation === false) {
            if(!this.validateEmail(fields["email"])) {
                errors["email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if(emailValidation === true && addrValidation === true) {
            if(!this.validateEmail(fields["email"])) {
                errors["email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if(emailValidation === false && addrValidation === true) {
            errors["email"] = "";
            emailValidation = true;
        }

        if(fnameValidation && lnameValidation && emailValidation && addrValidation && zipValidation) {
                errors["email"] = "";
                errors = {};
                this.isValid = true;
        }

        this.setState({errors: errors});
        console.log("SHIV FIELDS",this.isValid)
        return this.isValid;
    }

    handleValidationIntCustomer = () => {
        let fieldsInt = this.state.changedAddress;
        let errors = {};
        this.isValid = false;
        console.log("fieldsINT",fieldsInt)
       
        if (!fieldsInt['firstName']) {
            errors['firstName'] = 'First Name cannot be empty';
        }

        if (!fieldsInt['lastName']) {
            errors['lastName'] = 'Last Name cannot be empty';
        }

        if (!fieldsInt['address1']) {
            errors['address1'] = 'Address Line1 cannot be empty';
        }


        if (!fieldsInt['country']) {
            errors['country'] = 'Country cannot be empty';
        }

        if (!fieldsInt['province']) {
            errors['province'] = 'Province cannot be empty';
        }


        if (!fieldsInt['city']) {
            errors['city'] = 'City cannot be empty';
        }
        
        if(!fieldsInt['postal'])
        {
            errors['postal'] = 'Invalid postal code';
            
        }else{
            if(!validInterPostalCode(fieldsInt['postal']))
            {
                errors['postal'] = 'Invalid postal code';
            }
        }
        
        if (fieldsInt['cust_dom_mobile'] !== '' && fieldsInt['cust_dom_mobile'] !== undefined) {
            if (fieldsInt['cust_dom_mobile'].length < 10 || fieldsInt['cust_dom_mobile'].length > 15) {
                errors['cust_dom_mobile'] = 'Please enter the correct phone number';
            }
        }

        if (fieldsInt['cust_dom_otherMobile'] !== '' && fieldsInt['cust_dom_otherMobile'] !== undefined) {
            if (fieldsInt['cust_dom_otherMobile'].length < 10 || fieldsInt['cust_dom_otherMobile'].length > 15) {
                errors['cust_dom_otherMobile'] = 'Please enter the correct phone number';
            }
        }

        if (fieldsInt["email"] !== '' && fieldsInt["email"] !== undefined && fieldsInt["email"] !== null) {
            let lastAtPos = fieldsInt["email"].lastIndexOf('@');
            let lastDotPos = fieldsInt["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fieldsInt["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fieldsInt["email"].length - lastDotPos) > 2)) {
                errors["email"] = "Email is not valid";
            }
        }
        console.log("shiv isValid b4", this.isValid)
        this.isValid = this.isObjectEmpty(errors);
        this.setState({ errors: errors });
        console.log("shiv isValid after", this.isValid)
        return this.isValid;
    }

    validateEmail(email) {
        var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isObjectEmpty(obj) {
        if (obj == null) return true;
        if (obj.length === 0) return false;
        if (obj.length > 0) return false;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    toCamelCase(str) {
        // alert(str);
        return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
            return match.charAt(match.length-1).toUpperCase();
        });
    }

    handleClientele =()=> {
        // console.log("SHIV:custType:", this.state.custType)
        //     console.log('SHIV SAMESENDERRECIVER:',this.isValid);
        //     console.log('SHIV SAMESENDERRECIVER1:',this.state.changedAddress['cust_cssId']);
        if(this.props.sameSenderReciever && this.isValid && !(this.state.changedAddress['cust_cssId'])){
            if(this.state.custType === "Domestic"){
                this.constructCustomerObject("Receiver",this.state.changedAddress)
                this.constructCustomerObject("Sender",this.state.changedAddress)
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['zip']);
                this.addDomCustomer();
                // this.props.componentChangeHandler("itemsToBeShipped"); 
            }
            else if(this.state.custType === "International"){
                this.constructCustomerObject("Receiver",this.state.changedAddress)
                this.constructCustomerObject("Sender",this.state.changedAddress)
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['postal']);
                this.props.updateShipmentOptionsObject("International", true)
                this.addInternationalCustomerInvoker();
                
                this.props.componentChangeHandler("itemsToBeShipped"); 
            }
        }
        else if(this.props.sameSenderReciever && this.isValid){
            if(this.state.custType === "International"){
                
                this.constructCustomerObject("Receiver",this.state.changedAddress)
                this.constructCustomerObject("Sender",this.state.changedAddress)
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['postal']);
                this.props.updateShipmentOptionsObject("International", true)
                this.props.updateShipmentOptionsObject("Country", this.state.changedAddress['country']);
                this.props.componentChangeHandler("itemsToBeShipped");
            }else{ 
                this.constructCustomerObject("Receiver",this.state.changedAddress)
                this.constructCustomerObject("Sender",this.state.changedAddress)
                this.props.updateShipmentOptionsObject("International", false);
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['zip']);
                this.props.componentChangeHandler("itemsToBeShipped");
            }
        }
        else if(!this.props.sameSenderReciever && this.isValid && this.props.formType=="Sender" && !(this.state.changedAddress['cust_cssId'])){
            this.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['zip']);

            if(this.state.custType === "Domestic"){
                this.addDomCustomer();
                this.props.componentChangeHandler("receiverForm");
                this.clearAllFields(); 
            }
            else if(this.state.custType === "International"){
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['postal']);
                this.addInternationalCustomerInvoker();
                this.props.componentChangeHandler("receiverForm"); 
                this.clearAllFields();
            }
        }
        else if(!this.props.sameSenderReciever && this.isValid && this.props.formType =="Sender"){
            this.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['zip']);
            
            if(this.state.custType === "Domestic"){
                this.props.componentChangeHandler("receiverForm");
                this.clearAllFields(); 
            }
            else if(this.state.custType === "International"){
                console.log("SHIV POSTAL", this.changedAddress['postal'])
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['postal']);
                this.props.componentChangeHandler("receiverForm"); 
                this.clearAllFields();
            }
        }
        else if(!this.props.sameSenderReciever && this.isValid && this.props.formType =="Receiver"){
            this.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['zip']);
            
            if(this.state.custType === "Domestic"){
                this.props.componentChangeHandler("itemsToBeShipped");
                this.clearAllFields(); 
            }
            else if(this.state.custType === "International"){
                console.log("SHIV POSTAL", this.changedAddress['postal'])
                this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['postal']);
                this.props.componentChangeHandler("itemsToBeShipped"); 
                this.clearAllFields();
            }
        }
    }

    addDomCustomer = (bypassFlag) => {
        this.props.startSpinner(true);
        // this.setState({ emailModal: false });
        let addCustDomData = {
            ...clientConfig,
            'CFirstName': this.state.fields['firstName']?this.state.fields['firstName']:"",
            'CLastName': this.state.fields['lastName'],
            'Salutation ': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['address1']?this.state.fields['address1']:'',
            'Address_Ln2': this.state.fields['address2']?this.state.fields['address2']:"",
            'City': this.state.fields['city']?this.state.fields['city']:"",
            'State_Abbr': this.state.fields['state']?this.state.fields['state']:"",
            'Zip5': this.state.fields['zip']?this.state.fields['zip']:"",
            'CEmail': this.state.fields['email']?this.state.fields['email']:"",
            'Country': "US",
            'CPhone': (this.state.fields['cust_dom_mobile'] !== '' && this.state.fields['cust_dom_mobile'] != undefined && this.state.fields['cust_dom_mobile'] != null) ? parsePhoneNumber(this.state.fields['cust_dom_mobile']) : undefined,
            'COtherPhone': (this.state.fields['cust_dom_otherMobile'] !== '' && this.state.fields['cust_dom_phone2'] != undefined && this.state.fields['cust_dom_otherMobile'] != null) ? parsePhoneNumber(this.state.fields['cust_dom_otherMobile']) : undefined,
            'storeClientNo': '', /* Hardcoded, to be removed */
            'StoreAssoc': this.props.userPin.userPin,
            'donotcall ': 'N',
            'flagByPASS': bypassFlag
        }
        console.log('addcustdata ',addCustDomData)
        this.props.addCustomerActionInvoker(addCustDomData);
    }

    addInternationalCustomerInvoker = (bypassFlag) => {
        // this.setState({ emailModalInt: false });
        console.log("SHIV: country", this.state.fields["country"])
        this.props.startSpinner(true);
        let addCustIntData = {
            ...clientConfig,
            'CFirstName': this.state.fields['firstName'],
            'CLastName': this.state.fields['lastName'],
            'Salutation ': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['address1'],
            'Address_Ln2': this.state.fields['address2'],
            'City': this.state.fields['city'],
            'Province': this.state.fields['province'],
            'Zip5': this.state.fields['postal'],
            'CEmail': this.state.fields['email'],
            'Country': this.state.changedAddress['country'],
            'CPhone': (this.state.fields['cust_dom_mobile'] !== '' && this.state.fields['cust_dom_mobile'] != undefined && this.state.fields['cust_dom_mobile'] != null) ? this.state.fields['cust_dom_mobile'] : undefined,
            'COther': (this.state.fields['cust_dom_otherMobile'] !== '' && this.state.fields['cust_dom_otherMobile'] != undefined && this.state.fields['cust_dom_otherMobile'] != null) ? this.state.fields['cust_dom_otherMobile'] : undefined,
            'storeClientNo': '', /* Hardcoded, to be removed */
            'storeAssoc': this.props.userPin.userPin, 
            'donotcall ': 'N',
            //'flagByPASS': bypassFlag
            'flagByPASS': "true"
        }
        console.log(addCustIntData)
        this.props.addCustomerInternationalActionInvoker(addCustIntData);
    }

    constructCustomerObject = (type,obj) => {
        
        var customerObject = {
            "FirstName":obj.firstName,
            "LastName":obj.lastName, 
            "Email": obj.email,
            "Address_Line1":obj.address1,
            "Address_Line2":obj.address2,
            "City": obj.city,
            "State": obj.state,
            "Zip": obj.zip, 
            "Province":obj.province,
            "PostalCode":obj.postal,
            "Country":this.state.custType == "International"?obj.country:"US",
            "Mobile": obj.cust_dom_mobile,
            "OtherPhone":obj.cust_dom_otherMobile,

        }
        console.log("Shiv construct shippingOBJ", customerObject)
        this.props.updateObjectHandler(type, customerObject);

    }

    render() {
        return (
            <CustomerEditFormView 
                validDLNumber={this.props.validDLNumber}
                component={this.props.component}
                toggleInternational={this.props.toggleInternational}
                intlState={this.props.intlState}
                changedAddress = {this.state.changedAddress}
                handleSalutationChange = {this.handleSalutationChange}
                handleChange = {this.handleChange}
                salutationDataDrop = {this.state.salutationDataDrop}
                errors={this.state.errors}
                toCamelCase = {this.toCamelCase}
                statesList={this.state.statesList}
                selectedSalutation={this.state.selectedSalutation}
                handleStateChange = {this.handleStateChange}
                updateObjectHandler={this.props.updateObjectHandler}
                sameSenderReciever={this.props.sameSenderReciever}
                addDomCustomer={this.addDomCustomer}
                addInternationalCustomerInvoker={this.addInternationalCustomerInvoker}
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                constructCustomerObject={this.constructCustomerObject}
                optionalFooter={this.props.optionalFooter}
                custType={this.state.custType}
                isValid={this.isValid}
                handleValidation={this.handleValidation}
                handleValidationIntCustomer={this.handleValidationIntCustomer}
                handleCountryChange={this.handleCountryChange}
                countryList={this.state.countryList}
                history={this.props.history}
                handleClientele={this.handleClientele}
                formType={this.props.formType}
                giftCardAction={ this.props.addGiftCardAction}
                navigateToSale = {this.props.navigateToSale}
                getGiftCardCartItems ={this.props.getGiftCardCartItems}
                addGiftCardCall = {this.props.addGiftCardCall}
                updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                addrEmailMOdal={this.state.addrEmailMOdal}
                openCloseAddrEmailMOdal={this.openCloseAddrEmailMOdal}
                //handleCustTypeChange={this.handleCustTypeChange}
                addCustImage={this.state.addCustImage}
                addIntCustImage={this.state.addIntCustImage}
                changeForm={this.handleCustTypeChange}
            />
        );
    }
}

function mapStateToProps({ saleEditCustomer, addCustomer, home }) {
    return { saleEditCustomer, addCustomer, salutationData: home.salutationData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        getCountriesInvoker: getCountryList,
        addCustomerActionInvoker: addCustomerAction, 
        addCustomerInternationalActionInvoker:addCustomerIntAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditForm);