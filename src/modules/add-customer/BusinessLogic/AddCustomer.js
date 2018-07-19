/* Dependencies import */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*svg import*/
// import addcustomerselected from '../../resources/images/Add_Customer_Selected.svg';
import addintcustomer from '../../../resources/images/Add_International_Customer.svg';
import addcustomerselected from '../../../resources/images/Add_Customer_Selected.svg';
import addcustomer from '../../../resources/images/Add_Customer.svg';
import addintcustomerselected from '../../../resources/images/Add_International_Customer_Selected.svg';

/**/
import { parsePhoneNumber } from '../../common/helpers/helpers'

/* View Components import */
import { AddCustomerView } from '../View/AddCustomerView'

/* Actions import */
import { addCustomerAction, addCustomerIntAction, resetAddCustomerPage, getCountryList } from './AddCustomerAction';
import { startSpinner } from '../../common/loading/spinnerAction';
import { goToSalesPage } from '../../sale/SaleAction.js'

import { ADD_CUSTOMER } from '../../../pathConstants.js';
import { INVALID_ZIP } from './constants';


class AddCustomer extends Component {

    configFile = require('../../../resources/stubs/config.json');
    URL = this.configFile.apiAddressAdd;
    constructor(props) {
        super(props);


        this.provinces = [{ value: 'ON', label: 'ON' },
        { value: 'BC', label: 'BC' }]

        this.state = {
            functId: this.configFile.addFuncID,
            addDomesticShown: true,
            selectedProvince: '',
            selectedSalutationInt: '',
            selectedCountry: '',
            addCustImage: addcustomerselected,
            addIntCustImage: addintcustomer,

            fields: {},
            errors: {},

            fieldsInt: {},
            errorsInt: {},

            phoneModal: false,
            textOptModal: false,
            emailModal: false,
            succesModal: false,
            failModal: false,
            failModal1: false,
            emailMissingModal: false,
            filedsMissingModal: false,

            phoneModalInt: false,
            textOptModalInt: false,
            emailModalInt: false,
            succesModalInt: false,
            failModalInt: false,
            failModalInt1: false,


            selectedSalutation: '',
            dom_cust_state: '',
            dom_cust_country: 'US',
            cust_text_opt: 'N',

            countryList: [],
            salutationDataDrop: [],
            statesList: []
        }

        this.cust_addr_validation_bypass = false;
        this.isValid = true;
        this.isValidInt = true;


    }

    /* This method is invoked when the page is loaded */

    componentWillMount() {

        this.clearAllFields();
        this.clearAllFieldsInt();
        this.successModalFlag = false;
        this.successModalFlagInt = false;
        this.fetchSalutation();
        this.fetchStates();
        this.props.startSpinner(false);

    }


    /* This method is invoked if any of the props changes, via reducer */

    componentWillReceiveProps = nextProps => {
        console.log('Add Customer: componentWillReceiveProps', nextProps);

        if (nextProps.addCustomer.successModalFlag === true) {
            this.openSuccesModal();
        }
        if (nextProps.addCustomer.successModalFlagInt === true) {
            this.openSuccesModalInt();
        }

        if (nextProps.addCustomer.addressValidationSuccessFlag === true) {
            this.addDomesticCustomerInvoker(true);
            this.setState({ emailModal: false, succesModal: true });
            this.props.startSpinner(false);
        }
        if (nextProps.addCustomer.errors.length > 0) {
            console.log('test error');
            this.setState({ errors: nextProps.addCustomer.errors }, function () { console.log(this.state.errors) });
            this.props.startSpinner(false);
        }

        if (nextProps.addCustomer.errors.length > 0 && nextProps.addCustomer.errors[0].dom_cust_zip != undefined) {
            let errors = {};
            errors['dom_cust_zip'] = "Invalid Zip";
            this.setState({ errors: errors })

        }
        if (nextProps.addCustomer.countryList.length > 0) {
            this.setState({ countryList: nextProps.addCustomer.countryList });
        }

        if (nextProps.addCustomer.invalidAddress === true) {
            this.openFailModal();
            this.openFailModalInt();
        }

        if (nextProps.addCustomer.invalidEmail === true) {
            this.openFailModal1();
            this.openFailModalInt1();
        }

    }

    componentDidMount = () => {
        /* added to check which component will be loaded */
        if (this.props.location.pathname == ADD_CUSTOMER) {
            document.getElementsByClassName('add-customer-label')[0].classList.add('selected-tab-label');
            this.setState({
                addDomesticShown: true,
                addCustImage: addcustomerselected,
                addIntCustImage: addintcustomer
            });
        }
        else {
            document.getElementsByClassName('add-int-customer-label')[0].classList.add('selected-tab-label');
            this.setState({
                addDomesticShown: false,
                addCustImage: addcustomer,
                addIntCustImage: addintcustomerselected,

            });
        }

        console.log('AddCustomer componentDidMount: ',this.props.addCustomer.firstName);

        if(this.props.addCustomer.firstName !== '') {
            this.setState({fields : {
                cust_fname: this.props.addCustomer.firstName,
                cust_lname: this.props.addCustomer.lastName,
                cust_addr1: "",
                cust_addr2: "",
                cust_city: "",
                cust_email: "",
                cust_phone1: "",
                cust_phone2: "",
                dom_cust_zip: ""
            }});
        }
    }

    /**Fetch the salutations list from local json */

    fetchSalutation() {
        var salutationData = require('../../../resources/stubs/salutationList.json');
        if (salutationData) {
            this.state.salutationDataDrop = salutationData.Salutation;
        }
    }

    /**Fetch the states list from local json */

    fetchStates() {
        const statesList = require("../../../resources/stubs/states.json");
        if (statesList) {
            this.setState({ statesList: statesList.states });
        }
    }

    /* ---------------- General methods -------------- */

    /* Navigate to home - Back button */
    navigateToHome = () => {
        this.props.history.push('/customer-search');
    }

    /* Switch tab to Domestic */

    switchToDomestic = () => {

        this.clearAllFieldsInt();
        this.clearAllFields();
        this.closeFailModal();
        this.closeFailModal1();
        document.getElementsByClassName('add-customer-label')[0].classList.add('selected-tab-label');
        document.getElementsByClassName('add-int-customer-label')[0].classList.remove('selected-tab-label');
        this.setState({
            addDomesticShown: true,
            addCustImage: addcustomerselected,
            addIntCustImage: addintcustomer
        });
    }

    /* Switch tab to International */

    switchToInternational = () => {

        this.clearAllFields();
        this.clearAllFieldsInt();
        this.closeFailModal();
        this.closeFailModal1();
        this.props.getCountryListActionInvoker();
        document.getElementsByClassName('add-customer-label')[0].classList.remove('selected-tab-label');
        document.getElementsByClassName('add-int-customer-label')[0].classList.add('selected-tab-label');
        this.setState({
            addDomesticShown: false,
            addCustImage: addcustomer,
            addIntCustImage: addintcustomerselected,

        });
    }

    /* ---------------- Domestic Tab methods -------------------------*/

    /* Salutation change - Domestic */

    handleSalutationChange = (event, index, value) => {
        //console.log(value);
        this.setState({ selectedSalutation: value });
    }

    /* State change - Domestic */

    handleCustStateChange = (event, index, value) => {
        // console.log(value);
        this.setState({ dom_cust_state: value });
    }

    /* Reset All - Domestic */

    clearAllFields = () => {
        this.setState({
            fields: {
                cust_fname: "",
                cust_lname: "",
                cust_addr1: "",
                cust_addr2: "",
                cust_city: "",
                cust_email: "",
                cust_phone1: "",
                cust_phone2: "",
                dom_cust_zip: ""
            },
            errors: {}
            ,
            selectedSalutation: "",
            dom_cust_state: ""
        });
    }

    /* Open confirmation modals - Domestic */

    openModals = () => {

        if (this.handleValidationDomCustomer()) {
            if (this.state.fields['cust_phone1']) {
                this.setState({
                    phoneModal: true
                });


            } else if (this.state.fields['cust_email']) {
                this.setState({
                    emailModal: true
                });

            } else {
                console.log("invoking API");
                this.addDomesticCustomerInvoker(false);
                this.props.startSpinner(true);
            }
        }

    }

    /* Close phone confirmation modal - Domestic */

    closePhoneModal = () => {
        this.setState({
            phoneModal: false
        });
    }

    /* Open text opt in/out confirmation modal - Domestic */

    openTextOptModal = () => {
        this.setState({
            phoneModal: false
        });

        this.setState({
            textoptModal: true
        });
    }

    /* Close text opt in/out confirmation modal - Domestic */

    closeTextOptModal = () => {
        this.setState({
            textoptModal: false
        });
    }

    /* Open email confirmation modal - Domestic */

    openEmailModal = () => {
        this.setState({
            textoptModal: false
        });

        if (this.state.fields['cust_email']) {
            this.setState({
                emailModal: true
            });
        }

        else {
            this.addDomesticCustomerInvoker(false);

        }

    }

    /* Close email confirmation modal - Domestic */

    closeEmailModal = () => {
        this.setState({
            emailModal: false
        });
    }

    /* Open success modal - Domestic - Opened on adding customer successfully */

    openSuccesModal = () => {


        this.setState({
            emailModal: false,
            failModal: false,
            failModal1: false,
            succesModal: true
        })
        this.props.startSpinner(false);
    }

    /* Close success modal - Domestic */

    closeSuccessModal = () => {
        this.setState({
            succesModal: false
        });
        if (this.props.customerSearch.buttonId == '1') {
            this.props.goToSalesPage(false, {
                salutation: this.state.fields.selectedSalutation,
                firstname: this.state.fields['cust_fname'],
                lastname: this.state.fields['cust_lname'],
                address1: this.state.fields['cust_addr1'],
                city: this.state.fields['cust_city'],
                state: this.state.fields.dom_cust_state,
                zip: this.state.fields['dom_cust_zip'],
                address2: this.state.fields['cust_addr2']
            });
            this.props.history.push('/sale');
        }
        else {
            this.props.history.push('/customer-search');
        }
    }

    /* Open fail modal - Domestic - For all error conditions */

    openFailModal = () => {
        this.setState({
            emailModal: false,
            failModal: true
        });
    }

    openFailModal1 = () => {
        this.setState({
            emailModal: false,
            failModal1: true
        });
    }

    /* Close fail modal - Domestic */

    closeFailModal = () => {
        this.setState({
            failModal: false
        });
        this.props.resetAddCustomer();
    }

    closeFailModal1 = () => {
        this.setState({
            failModal1: false
        });
        this.props.resetAddCustomer();
    }

    openFieldsMissingModal = () => {

        this.setState({
            filedsMissingModal: true
        });
    }


    closeFieldsMissingModal = () => {
        this.setState({
            filedsMissingModal: false,
            emailMissingModal: false
        });
    }



    /* Handle input change in form - Domestic */

    handleChange = (field, e) => {

        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields: fields });
        let errors = this.state.errors;
        errors[field] = "";
        this.setState({ errors: errors });
    }

    /* Set text opt in/out flag - Domestic */

    setCustTextOpt = () => {
        this.setState({
            cust_text_opt: 'Y'
        });
        this.openEmailModal();
    }

    /* Bypassing address validation - Domestic */

    bypassAddressValidation = () => {
        this.closeFailModal();
        this.closeFailModal1();
        this.addDomesticCustomerInvoker(true);
        return;
    }

    /* Form validation method - Domestic */
    validateEmail(email) {
        var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleValidationDomCustomer() {
        let fields = this.state.fields;
        let errors = {};
        let fnameValidation = true, lnameValidation = true, phoneValidation = true
        , phone1Validation = true, phone2Validation = true, emailValidation = true, addrValidation = true, zipValidation = true;
        this.isValid = false;
        if (!fields['cust_fname']) {
            errors['cust_fname'] = 'First Name cannot be empty';  
            fnameValidation = false;
        }
    
        if (!fields['cust_lname']) {
            errors['cust_lname'] = 'Last Name cannot be empty';
            lnameValidation = false;     
        }
    
        if (fields['cust_phone1'] !== '' && fields['cust_phone1'] !== undefined) {
            if (fields['cust_phone1'].length < 14 || fields['cust_phone1'].length > 14) {
                console.log('cust_phone1' + fields['cust_phone1'].length);
                errors['cust_phone1'] = 'Invalid Phone Number';
                phone1Validation = false;
            }
        }
    
        if (fields['cust_phone2'] !== '' && fields['cust_phone2'] !== undefined) {
            if (fields['cust_phone2'].length < 14 || fields['cust_phone2'].length > 14) {
            console.log('cust_phone2' + fields['cust_phone2'].length);
            errors['cust_phone2'] = 'Invalid Phone Number';
            phone2Validation = false;
            }
        }
        
        if (fields['cust_email'] == '' ||  fields['cust_email'] == undefined ||  fields['cust_email'] == null) {
                errors["cust_email"] = "Email missing";
                emailValidation = false;
        }
        
        if(fields['cust_addr1'] == '' ||  fields['cust_addr1'] == undefined ||  fields['cust_addr1'] == null) {
                errors['missing fields'] = 'Address missing';
                addrValidation = false;
            }

        if(fields['cust_addr1']){
            if (!fields['dom_cust_zip']) {
                errors['dom_cust_zip'] = 'zipcode cannot be empty';   
                zipValidation = false; 
                this.setState({emailMissingModal: true});
            }
        }

        if(emailValidation === false && addrValidation === false) {
            errors["cust_email"] = "";
            errors['cust_dom_address1'] = 'Address and Email missing';
            this.openFieldsMissingModal();
        }
        else if(emailValidation === true && addrValidation === false) {
            if(!this.validateEmail(fields["cust_email"])) {
                errors["cust_email"] = "";
                emailValidation = false;
                this.setState({ emailMissingModal: true });
            }
            addrValidation = true;
        }
        else if(emailValidation === true && addrValidation === true) {
            if(!this.validateEmail(fields["cust_email"])) {
                errors["cust_email"] = "";
                emailValidation = false;
                this.setState({ emailMissingModal: true });
            }
            addrValidation = true;
        }
        else if(emailValidation === false && addrValidation === true) {
            errors["cust_email"] = "";
            emailValidation = true;
        }

        if(fnameValidation && lnameValidation && phone1Validation && phone2Validation && emailValidation && addrValidation && zipValidation) {
                errors["cust_email"] = "";
                errors["dom_cust_zip"] = "";
                errors = {};
                this.isValid = true;
        }

        this.setState({errors: errors});
        return this.isValid;
    }

    /* Submit add customer data - Domestic */

    addDomesticCustomerInvoker = (bypassFlag) => {
        this.props.startSpinner(true);
        this.setState({ emailModal: false });
        let addCustDomData = {
            'ClientID': '0101:0169:04042018:033639', /* Hardcoded, to be removed */
            'ClientTypeID': '1000', /* Hardcoded, to be removed */
            'SourceApp': 'CMOS', /* Hardcoded, to be removed */
            'SourceLoc': 'NM-DIRECT', /* Hardcoded, to be removed */
            'CFirstName': this.state.fields['cust_fname'],
            'CLastName': this.state.fields['cust_lname'],
            'Salutation ': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['cust_addr1'],
            'Address_Ln2': this.state.fields['cust_addr2'],
            'City': this.state.fields['cust_city'],
            'State_Abbr': this.state.dom_cust_state,
            'Zip5': this.state.fields['dom_cust_zip'],
            'CEmail': this.state.fields['cust_email'],
            'Country': this.state.dom_cust_country,
            'CPhone': (this.state.fields['cust_phone1'] !== '' && this.state.fields['cust_phone1'] != undefined && this.state.fields['cust_phone1'] != null) ? parsePhoneNumber(this.state.fields['cust_phone1']) : undefined,
            'COtherPhone': (this.state.fields['cust_phone2'] !== '' && this.state.fields['cust_phone2'] != undefined && this.state.fields['cust_phone2'] != null) ? parsePhoneNumber(this.state.fields['cust_phone2']) : undefined,
            'storeClientNo': '10000000257', /* Hardcoded, to be removed */
            'storeAssoc': this.props.login.userpin, /* Hardcoded, to be removed */
            'donotcall ': this.state.cust_text_opt,
            'flagByPASS': bypassFlag
        }
        console.log('addcustdata ' + JSON.stringify(addCustDomData))
        this.props.addCustomerActionInvoker(addCustDomData);
    }

    firstNameFocus = () => {
        console.log(document.getElementsByClassName('add-customer-dom-row1')[0].childNodes[1]);
    }

    /* ---------------- International Tab methods -------------------------*/


    /* Salutation change - International */

    handleSalutationChangeInt = (event, index, value) => {
        this.setState({ selectedSalutationInt: value });
    }

    /* Country change - International */

    handleCountryChange = (event, index, value) => {

        let errorsInt = this.state.errorsInt;
        errorsInt['selectedCountry'] = '';

        this.setState({ selectedCountry: value, errorsInt: errorsInt });

    }

    /* Handle input change in form - International */

    handleChangeInt = (field, e) => {
        // alert();
        let fieldsInt = this.state.fieldsInt;
        let errorsInt = this.state.errorsInt;
        fieldsInt[field] = e.target.value;
        errorsInt[field] = "";
        this.setState({
            fieldsInt: fieldsInt,
            errorsInt: errorsInt
        });
    }

    /* Perform form field validations - International */

    handleValidationIntCustomer = () => {
        let fieldsInt = this.state.fieldsInt;
        let errorsInt = {};

        if (!fieldsInt['cust_fname']) {
            errorsInt['cust_fname'] = 'First Name cannot be empty';
        }

        if (!fieldsInt['cust_lname']) {
            errorsInt['cust_lname'] = 'Last Name cannot be empty';
        }

        if (!fieldsInt['cust_addr1']) {
            errorsInt['cust_addr1'] = 'Address Line1 cannot be empty';
        }


        if (!this.state.selectedCountry) {
            errorsInt['selectedCountry'] = 'Country cannot be empty';
        }


        if (!fieldsInt['cust_city']) {
            errorsInt['cust_city'] = 'City cannot be empty';
        }

        if (fieldsInt['cust_phone1'] !== '' && fieldsInt['cust_phone1'] !== undefined) {
            if (fieldsInt['cust_phone1'].length < 10 || fieldsInt['cust_phone1'].length > 10) {
                errorsInt['cust_phone1'] = 'Invalid Phone Number';
            }
        }

        if (fieldsInt['cust_phone2'] !== '' && fieldsInt['cust_phone2'] !== undefined) {
            if (fieldsInt['cust_phone2'].length < 10 || fieldsInt['cust_phone2'].length > 10) {
                errorsInt['cust_phone2'] = 'Invalid Phone Number';
            }
        }

        if (fieldsInt["cust_email"] !== '' && fieldsInt["cust_email"] !== undefined && fieldsInt["cust_email"] !== null) {
            let lastAtPos = fieldsInt["cust_email"].lastIndexOf('@');
            let lastDotPos = fieldsInt["cust_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fieldsInt["cust_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fieldsInt["cust_email"].length - lastDotPos) > 2)) {
                errorsInt["cust_email"] = "Email is not valid";
            }
        }
        this.isValidInt = isObjectEmpty(errorsInt);
        this.setState({ errorsInt: errorsInt });
        return this.isValidInt;
    }


    /* Open confirmation modals - International */

    openModalsInt = () => {
        if (this.handleValidationIntCustomer()) {
            if (this.state.fieldsInt['cust_phone1']) {
                this.setState({
                    phoneModalInt: true
                });

            } else if (this.state.fieldsInt['cust_email']) {
                this.setState({
                    emailModalInt: true
                });
            }
            else {
                this.props.startSpinner(true);
                this.addInternationalCustomerInvoker(true);
            }

        }
    }

    /* Close phone confirmation modal - International */

    closePhoneModalInt = () => {
        this.setState({
            phoneModalInt: false
        });
    }

    /* Open text opt in/out confirmation modal - International */

    openTextOptModalInt = () => {

        this.setState({
            phoneModalInt: false,
        });
        this.setState({
            textoptModalInt: true
        });
    }

    /* Close text opt in/out confirmation modal - International */

    closeTextOptModalInt = () => {
        this.setState({
            textoptModalInt: false
        });
    }

    /* Open email confirmation modal - International */

    openEmailModalInt = () => {
        this.setState({
            textoptModalInt: false,

        });

        if (this.state.fieldsInt['cust_email']) {
            this.setState({
                emailModalInt: true
            });
        }

        else {
            this.addInternationalCustomerInvoker(true);
            this.props.startSpinner(true);
        }

    }

    /* Close email confirmation modal - International */

    closeEmailModalInt = () => {
        this.setState({
            emailModalInt: false
        });
    }

    /* Open success modal - International - Opened on adding customer successfully */

    openSuccesModalInt = () => {

        this.setState({
            emailModalInt: false,
            succesModalInt: true
        });
        //this.props.startSpinner(false);
    }

    /* Close success modal - International */

    closeSuccessModalInt = () => {
        this.setState({
            succesModalInt: false
        });
        if (this.props.customerSearch.buttonId == '1') {
            this.props.goToSalesPage(false, {
                salutation: this.state.fields.selectedSalutationInt,
                firstname: this.state.fields['cust_fname'],
                lastname: this.state.fields['cust_lname'],
                address1: this.state.fields['cust_addr1'],
                city: this.state.fields['cust_city'],
                state: this.state.fields['int_cust_province'],
                zip: this.state.fields['int_cust_postal_code'],
                address2: this.state.fields['cust_addr2']
            });
            this.props.history.push('/sale');
        }
        else {
            this.props.history.push('/customer-search');
        }
    }

    /* Open fail modal - International - For all error conditions */

    openFailModalInt = () => {

        this.setState({
            emailModalInt: false,
            failModalInt: true
        });
    }

    /* Close fail modal - International */

    closeFailModalInt = () => {
        this.setState({
            failModalInt: false
        });
    }

    openFailModalInt1 = () => {

        this.setState({
            emailModalInt: false,
            failModalInt1: true
        });
    }

    /* Close fail modal - International */

    closeFailModalInt1 = () => {
        this.setState({
            failModalInt1: false
        });
    }


    /* Set text opt in/out flag - International */

    setCustTextOptInt = () => {

        this.setState({
            cust_text_opt: 'Y'
        });
        this.openEmailModalInt();
    }


    /* Reset All - International */

    clearAllFieldsInt = () => {
        this.setState({
            fieldsInt: {
                cust_fname: "",
                cust_lname: "",
                cust_addr1: "",
                cust_addr2: "",
                cust_city: "",
                cust_email: "",
                cust_phone1: "",
                cust_phone2: "",
                int_cust_postal_code: "",
                int_cust_province: "",
            },
            errorsInt: {
                cust_fname: "",
                cust_lname: "",
                cust_addr1: "",
                cust_addr2: "",
                cust_city: "",
                cust_email: "",
                cust_phone1: "",
                cust_phone2: "",
            },
            selectedSalutationInt: "",
            selectedCountry: "",
        });
    }

    /* Submit add customer data - International */

    addInternationalCustomerInvoker = (bypassFlag) => {
        this.setState({ emailModalInt: false });
        this.props.startSpinner(true);
        let addCustIntData = {
            'ClientID': '0101:0169:04042018:033639', /* Hardcoded, to be removed */
            'ClientTypeID': '1000', /* Hardcoded, to be removed */
            'SourceApp': 'CMOS', /* Hardcoded, to be removed */
            'SourceLoc': 'NM-DIRECT', /* Hardcoded, to be removed */
            'CFirstName': this.state.fieldsInt['cust_fname'],
            'CLastName': this.state.fieldsInt['cust_lname'],
            'Salutation ': this.state.selectedSalutationInt,
            'Address_Ln1': this.state.fieldsInt['cust_addr1'],
            'Address_Ln2': this.state.fieldsInt['cust_addr2'],
            'City': this.state.fieldsInt['cust_city'],
            'Province': this.state.fieldsInt['int_cust_province'],
            'Zip5': this.state.fieldsInt['int_cust_postal_code'],
            'CEmail': this.state.fieldsInt['cust_email'],
            'Country': this.state.selectedCountry,
            'CPhone': (this.state.fieldsInt['cust_phone1'] !== '' && this.state.fieldsInt['cust_phone1'] != undefined && this.state.fieldsInt['cust_phone1'] != null) ? formatPhoneint(this.state.fieldsInt['cust_phone1']) : undefined,
            'COther': (this.state.fieldsInt['cust_phone2'] !== '' && this.state.fieldsInt['cust_phone2'] != undefined && this.state.fieldsInt['cust_phone2'] != null) ? formatPhoneint(this.state.fieldsInt['cust_phone2']) : undefined,
            'storeClientNo': '10000000257', /* Hardcoded, to be removed */
            'storeAssoc':this.props.login.userpin, /* Hardcoded, to be removed */
            'donotcall ': this.state.cust_text_opt,
            //'flagByPASS': bypassFlag
            'flagByPASS': "true"
        }
        console.log(addCustIntData)
        this.props.addCustomerInternationalActionInvoker(addCustIntData);
    }

    bypassAddressValidationInt = () => {
        this.closeFailModal();
        this.closeFailModal1();
        this.addInternationalCustomerInvoker(true);
    }



    /* Render method for the component */

    render() {

        return (
            <AddCustomerView
                statesList={this.state.statesList}
                history={this.props.history}
                selectedSalutation={this.state.selectedSalutation}
                selectedSalutationInt={this.state.selectedSalutationInt}
                handleSalutationChange={this.handleSalutationChange}
                handleSalutationChangeInt={this.handleSalutationChangeInt}
                salutationDataDrop={this.state.salutationDataDrop}
                handleChange={this.handleChange}
                handleChangeInt={this.handleChangeInt}
                fields={this.state.fields}
                errors={this.state.errors}
                dom_cust_state={this.state.dom_cust_state}
                handleCustStateChange={this.handleCustStateChange}
                clearAllFields={this.clearAllFields}
                clearAllFieldsInt={this.clearAllFieldsInt}
                openModals={this.openModals}
                openModalsInt={this.openModalsInt}
                phoneModal={this.state.phoneModal}
                phoneModalInt={this.state.phoneModalInt}
                closePhoneModal={this.closePhoneModal}
                closePhoneModalInt={this.closePhoneModalInt}
                closeEmailModal={this.closeEmailModal}
                closeEmailModalInt={this.closeEmailModalInt}
                openTextOptModal={this.openTextOptModal}
                openTextOptModalInt={this.openTextOptModalInt}
                textoptModal={this.state.textoptModal}
                textOptModalInt={this.state.textoptModalInt}
                openEmailModal={this.openEmailModal}
                openEmailModalInt={this.openEmailModalInt}
                setCustTextOpt={this.setCustTextOpt}
                setCustTextOptInt={this.setCustTextOptInt}
                emailModal={this.state.emailModal}
                emailModalInt={this.state.emailModalInt}
                // emailModal = {this.emailModal}
                addDomesticCustomerInvoker={this.addDomesticCustomerInvoker}
                succesModal={this.state.succesModal}
                succesModalInt={this.state.succesModalInt}
                closeSuccessModal={this.closeSuccessModal}
                closeSuccessModalInt={this.closeSuccessModalInt}
                closeEmailModalInt={this.closeEmailModalInt}
                failModal={this.state.failModal}
                failModal1={this.state.failModal1}
                closeFailModal={this.closeFailModal}
                closeFailModal1={this.closeFailModal1}
                bypassAddressValidation={this.bypassAddressValidation}
                bypassAddressValidationInt={this.bypassAddressValidationInt}
                filedsMissingModal={this.state.filedsMissingModal}
                closeFieldsMissingModal={this.closeFieldsMissingModal}
                emailMissingModal={this.state.emailMissingModal}
                fieldsInt={this.state.fieldsInt}
                errorsInt={this.state.errorsInt}
                selectedCountry={this.state.selectedCountry}
                handleCountryChange={this.handleCountryChange}
                countryList={this.state.countryList}
                addInternationalCustomerInvoker={this.addInternationalCustomerInvoker}
                failModalInt={this.state.failModalInt}
                failModalInt1={this.state.failModalInt1}
                closeFailModalInt={this.closeFailModalInt}
                closeFailModalInt1={this.closeFailModalInt1}
                navigateToHome={this.navigateToHome}
                switchToDomestic={this.switchToDomestic}
                switchToInternational={this.switchToInternational}
                addCustImage={this.state.addCustImage}
                addIntCustImage={this.state.addIntCustImage}
                addDomesticShown={this.state.addDomesticShown}
            // testprops ="helloworld"

            />
        )

    }

}


function formatPhoneint(intPhone) {

    var phoneint = intPhone.replace(/[^A-Z0-9]+/ig, "");
    var formattedPhone = phoneint;
    var lastTen = formattedPhone.substr(formattedPhone.length - 13);
    return parseInt(lastTen);
}
function isObjectEmpty(obj) {
    if (obj == null) return true;
    if (obj.length === 0) return false;
    if (obj.length > 0) return false;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

function mapStateToProps({ addCustomer, customerSearch , login }) {
    return { addCustomer, customerSearch, login };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCustomerActionInvoker: addCustomerAction,
        addCustomerInternationalActionInvoker: addCustomerIntAction,
        getCountryListActionInvoker: getCountryList,
        goToSalesPage: goToSalesPage,
        startSpinner: startSpinner, resetAddCustomer: resetAddCustomerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);