import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/**
 * Component Imports
 */
import CustomerEditFormView from '../View/customerEditFormView.js';

import { parsePhoneNumber } from '../../../common/helpers/helpers';

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
                cust_cssId: this.props.cssId ? this.props.cssId: '',
                cust_dom_salutation  : this.props.salutation ? this.props.salutation: '',
                cust_dom_fname       : this.props.firstName ? this.props.firstName: '',
                cust_dom_lname       : this.props.lastName ? this.props.lastName: '',
                cust_dom_address1    : this.props.address1 ? this.props.address1: '',
                cust_dom_address2    : this.props.address2 ? this.props.address2: '',
                cust_dom_mobile      : this.props.mobile ? this.props.mobile: '',
                cust_dom_email       : this.props.email ? this.props.email: '',
                cust_dom_otherMobile  : this.props.otherMobile ? this.props.otherMobile: '',
                cust_dom_city        : this.props.city ? this.props.city: '',
                cust_dom_state    : this.props.state ? this.props.state: '',
                cust_dom_country     : this.props.country ? this.props.country: '',
                cust_dom_postal : this.props.zip ? this.props.zip.slice(0,5): '',
                cust_dom_province: this.props.state ? this.props.state: '',
                cust_dom_zip    : this.props.zip ? this.props.zip.slice(0,5): ''
            },
            selectedSalutation : "",
            salutationDataDrop:[],
            errors: {},
            fields : {},
            statesList:[],
            cust_dom_state:'',
            countryList: [],
            addrEmailMOdal:false,
            custType: 'dom',
            addCustImage: addcustomerselected,
            addIntCustImage: addintcustomer,
        }
    }

    componentWillMount() {
        this.fetchSalutation();
        this.fetchStates();
        this.props.getCountriesInvoker();
        console.log("first name", this.props)
        // if(this.props.viewEditCustomer.profileData != {} && this.props.viewEditCustomer.profileData != undefined && this.props.viewEditCustomer.profileData != null) {
        //     var profileDataLocal = Object.assign({}, this.state.profileData)
        //     profileDataLocal.cust_dom_country = this.props.viewEditCustomer.profileData.country;
        //     this.profileData = profileDataLocal;          
        // }     
        //this.getAddress();
        // this.props.startSpinner(false);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.addCustomer.countryList.length > 0) {
            this.setState({ countryList: nextProps.addCustomer.countryList });
        }
        
    }

    handleSalutationChange = (value, e) => {
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        this.setState({
            selectedSalutation: fields[value]
        });
    }

    formatPhoneint = (intPhone) => {

        var phoneint = intPhone.replace(/[^A-Z0-9]+/ig, "");
        var formattedPhone = phoneint;
        var lastTen = formattedPhone.substr(formattedPhone.length - 13);
        return parseInt(lastTen);
    }

    /* Country change - International */
    handleCountryChange = (event, index, value) => {
        console.log(value);
        let errors = this.state.errors;
        errors['cust_dom_country'] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress['cust_dom_country'] = value;
        this.setState({errors:errors,changedAddress:changedAddress});
    }

    clearAllFields = () => {
        this.setState({
            changedAddress: {
                cust_dom_fname: "",
                cust_dom_lname: "",
                cust_dom_address1: "",
                cust_dom_address2: "",
                cust_dom_city: "",
                cust_dom_email: "",
                cust_dom_mobile: "",
                cust_dom_otherMobile: "",
                cust_dom_postal: "",
                cust_dom_province: "",
                cust_dom_country:"",
                cust_dom_state:"",
                cust_dom_zip:"",
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
        var salutationData = require('../../../../resources/stubs/salutationList.json');
        if(salutationData){
            this.setState({ salutationDataDrop: salutationData.Salutation});
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
        fields['cust_dom_state'] = value;
        let errors = this.state.errors;
        errors['cust_dom_state'] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress['cust_dom_state'] = value;
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
        if(this.state.custType === "dom"){
            console.log("int",this.state.custType)
            this.setState({
                custType: "int",
                addCustImage: addcustomer,
                addIntCustImage: addintcustomerselected
            })
        }
        else if(this.state.custType === "int"){
            console.log("domestic",this.state.custType)
            this.setState({
                custType: "dom",
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
        , emailValidation = true, addrValidation = true;
        this.isValid = false;
        if (!fields['cust_dom_fname']) {
            errors['cust_dom_fname'] = 'First Name cannot be empty';  
            fnameValidation = false;
        }
    
        if (!fields['cust_dom_lname']) {
            errors['cust_dom_lname'] = 'Last Name cannot be empty';
            lnameValidation = false;     
        }
        
        if (fields['cust_dom_email'] == '' ||  fields['cust_dom_email'] == undefined ||  fields['cust_dom_email'] == null) {
                //errors["cust_dom_email"] = "Email missing";
                emailValidation = false;
        }
        
        if(fields['cust_dom_address1'] == '' ||  fields['cust_dom_address1'] == undefined ||  fields['cust_dom_address1'] == null) {
                //errors['cust_dom_address1'] = 'Address missing';
                addrValidation = false;
            }

        if(emailValidation === false && addrValidation === false) {
            errors["cust_dom_email"] = "";
            errors['cust_dom_address1'] = "";
            this.openCloseAddrEmailMOdal();
        }
        else if(emailValidation === true && addrValidation === false) {
            if(!this.validateEmail(fields["cust_dom_email"])) {
                errors["cust_dom_email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if(emailValidation === true && addrValidation === true) {
            if(!this.validateEmail(fields["cust_dom_email"])) {
                errors["cust_dom_email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if(emailValidation === false && addrValidation === true) {
            errors["cust_dom_email"] = "";
            emailValidation = true;
        }

        if(fnameValidation && lnameValidation && emailValidation && addrValidation) {
                errors["cust_dom_email"] = "";
                errors = {};
                this.isValid = true;
        }

        this.setState({errors: errors});
        return this.isValid;
    }

    toCamelCase(str) {
        // alert(str);
        return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
            return match.charAt(match.length-1).toUpperCase();
        });
    }

    handleClientele =()=> {
        console.log("SHIV:custType:", this.state.custType)
        if(this.props.sameSenderReciever && /*this.isValid &&*/ !(this.state.changedAddress['cust_cssId'])){
            this.constructCustomerObject("Receiver",this.state.changedAddress)
            this.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['cust_dom_zip']);
            if(this.state.custType === "dom"){
                this.addDomCustomer();
                this.props.componentChangeHandler("itemsToBeShipped"); 
            }
            else if(this.state.custType === "int"){
                this.addInternationalCustomerInvoker();
                this.props.componentChangeHandler("itemsToBeShipped"); 
            }
        }
        else if(this.props.sameSenderReciever && this.isValid){
            this.props.constructCustomerObject("Receiver",this.state.changedAddress)
            this.props.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['cust_dom_zip']);
            this.props.componentChangeHandler("itemsToBeShipped"); 
        }
        else if(!this.props.sameSenderReciever /*&& this.isValid*/ && this.props.formType=="Sender" && !(this.state.changedAddress['cust_cssId'])){
            this.constructCustomerObject("Sender",this.state.changedAddress)
            this.props.updateShipmentOptionsObject("ZIP", this.state.changedAddress['cust_dom_zip']);

            if(this.state.custType === "dom"){
                this.addDomCustomer();
                this.props.componentChangeHandler("receiverForm");
                this.clearAllFields(); 
            }
            else if(this.state.custType === "int"){
                this.addInternationalCustomerInvoker();
                this.props.componentChangeHandler("receiverForm"); 
                this.clearAllFields();
            }
        }
    }

    addDomCustomer = (bypassFlag) => {
        this.props.startSpinner(true);
        // this.setState({ emailModal: false });
        let addCustDomData = {
            ...clientConfig,
            "ClientTypeID":"1000",
            'CFirstName': this.state.fields['cust_dom_fname']?this.state.fields['cust_dom_fname']:"",
            'CLastName': this.state.fields['cust_dom_lname'],
            'Salutation ': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['cust_dom_address1']?this.state.fields['cust_dom_address1']:'',
            'Address_Ln2': this.state.fields['cust_dom_address2']?this.state.fields['cust_dom_address2']:"",
            'City': this.state.fields['cust_dom_city']?this.state.fields['cust_dom_city']:"",
            'State_Abbr': this.state.fields['cust_dom_state']?this.state.fields['cust_dom_state']:"",
            'Zip5': this.state.fields['cust_dom_zip']?this.state.fields['cust_dom_zip']:"",
            'CEmail': this.state.fields['cust_dom_email']?this.state.fields['cust_dom_email']:"",
            'Country': "US",
            'CPhone': (this.state.fields['cust_dom_phone1'] !== '' && this.state.fields['cust_dom_phone1'] != undefined && this.state.fields['cust_dom_phone1'] != null) ? parsePhoneNumber(this.state.fields['cust_dom_phone1']) : undefined,
            'COtherPhone': (this.state.fields['cust_dom_phone2'] !== '' && this.state.fields['cust_dom_phone2'] != undefined && this.state.fields['cust_dom_phone2'] != null) ? parsePhoneNumber(this.state.fields['cust_dom_phone2']) : undefined,
            'storeClientNo': '10000000257', /* Hardcoded, to be removed */
            'StoreAssoc': this.props.userPin.userPin,
            'donotcall ': 'N',
            'flagByPASS': false
        }
        console.log('addcustdata ',addCustDomData)
        this.props.addCustomerActionInvoker(addCustDomData);
    }

    addInternationalCustomerInvoker = (bypassFlag) => {
        // this.setState({ emailModalInt: false });
        console.log("SHIV: country", this.state.fields["cust_dom_country"])
        this.props.startSpinner(true);
        let addCustIntData = {
            ...clientConfig,
            'ClientTypeID': '1000', /* Hardcoded, to be removed */
            'CFirstName': this.state.fields['cust_dom_fname'],
            'CLastName': this.state.fields['cust_dom_lname'],
            'Salutation ': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['cust_dom_address1'],
            'Address_Ln2': this.state.fields['cust_dom_address2'],
            'City': this.state.fields['cust_dom_city'],
            'Province': this.state.fields['cust_dom_province'],
            'Zip5': this.state.fields['cust_dom_postal'],
            'CEmail': this.state.fields['cust_dom_email'],
            'Country': this.state.changedAddress['cust_dom_country'],
            'CPhone': (this.state.fields['cust_dom_phone1'] !== '' && this.state.fields['cust_dom_phone1'] != undefined && this.state.fields['cust_dom_phone1'] != null) ? this.formatPhoneint(this.state.fields['cust_dom_phone1']) : undefined,
            'COther': (this.state.fields['cust_dom_phone2'] !== '' && this.state.fields['cust_dom_phone2'] != undefined && this.state.fields['cust_dom_phone2'] != null) ? this.formatPhoneint(this.state.fields['cust_dom_phone2']) : undefined,
            'storeClientNo': '10000000257', /* Hardcoded, to be removed */
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
            "FirstName":obj.cust_dom_fname,
            "LastName":obj.cust_dom_lname, 
            "Email": obj.cust_dom_email,
            "Address_Line1":obj.cust_dom_address1,
            "Address_Line2":obj.cust_dom_address2,
            "Contact": obj.cust_dom_mobile,
            "City": obj.cust_dom_city,
            "State": obj.cust_dom_state,
            "Zip": obj.cust_dom_zip, 
        }
        console.log("Shiv construct shippingOBJ", customerObject)
        this.props.updateObjectHandler(type, customerObject);

    }

    render() {
        console.log('mike cust form props', this.props)
        return (
            <CustomerEditFormView 
            component={this.props.component}
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
                handleCountryChange={this.handleCountryChange}
                countryList={this.state.countryList}
                history={this.props.history}
                handleClientele={this.handleClientele}
                formType={this.props.formType}
                updateShipmentOptionsObject={this.props.updateShipmentOptionsObject}
                addrEmailMOdal={this.state.addrEmailMOdal}
                openCloseAddrEmailMOdal={this.openCloseAddrEmailMOdal}
                handleCustTypeChange={this.handleCustTypeChange}
                addCustImage={this.state.addCustImage}
                addIntCustImage={this.state.addIntCustImage}
            />
        );
    }
}

function mapStateToProps({ saleEditCustomer, addCustomer }) {
    return { saleEditCustomer, addCustomer };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        getCountriesInvoker: getCountryList,
        addCustomerActionInvoker: addCustomerAction, 
        addCustomerInternationalActionInvoker:addCustomerIntAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditForm);