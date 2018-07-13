import React, { Component } from 'react';

/**
 * Component Imports
 */
import CustomerEditFormView from '../View/customerEditFormView.js';

export default class CustomerEditForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            changedAddress: {
                cust_cssId: '',
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
                cust_dom_postal : this.props.zip ? this.props.zip: '',
                cust_dom_province: this.props.state ? this.props.state: '',
                cust_dom_zip    : this.props.zip ? this.props.zip: ''
            },
            selectedSalutation : "",
            salutationDataDrop:[],
            errors: {},
            fields : {},
            statesList:[],
            cust_dom_state:'',
        }
    }

    componentWillMount() {
        this.fetchSalutation();
        this.fetchStates();
        console.log("first name", this.props)
        // if(this.props.viewEditCustomer.profileData != {} && this.props.viewEditCustomer.profileData != undefined && this.props.viewEditCustomer.profileData != null) {
        //     var profileDataLocal = Object.assign({}, this.state.profileData)
        //     profileDataLocal.cust_dom_country = this.props.viewEditCustomer.profileData.country;
        //     this.profileData = profileDataLocal;          
        // }     
        //this.getAddress();
        // this.props.startSpinner(false);
    }

    handleSalutationChange = (value, e) => {
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        this.setState({
            selectedSalutation: fields[value]
        });
    }

    fetchSalutation(){
        var salutationData = require('../../../../resources/stubs/salutationList.json');
        if(salutationData){
            this.setState({ salutationDataDrop: salutationData.Salutation});
        }
    }

    fetchStates(){
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
            this.openaddrEmailMOdal();
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

    render() {
        return (
            <CustomerEditFormView 
                changedAddress = {this.state.changedAddress}
                handleSalutationChange = {this.handleSalutationChange}
                handleChange = {this.handleChange}
                salutationDataDrop = {this.state.salutationDataDrop}
                errors={this.state.errors}
                toCamelCase = {this.toCamelCase}
                statesList={this.state.statesList}
                selectedSalutation={this.state.selectedSalutation}
                handleStateChange = {this.handleStateChange}
            />
        );
    }
}