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
import error from '../../../resources/images/Error_Red.svg'

/**/
import { parsePhoneNumber, validZip, validPostalCode, validInterPostalCode } from '../../common/helpers/helpers'

/* View Components import */
import { AddCustomerView } from '../View/AddCustomerView'


/* Actions import */
import { addCustomerAction, addCustomerIntAction, resetAddCustomerPage, getCountryList } from './AddCustomerAction';
import { navigateToDomesticCustomer } from '../../customer-details/CustomerDetailsActions.js';
import { startSpinner } from '../../common/loading/spinnerAction';
import { goToSalesPage } from '../../sale/SaleAction.js';
import { attachCustomerAction, zipToCitySateAction, clearZipToCitySateDataAction } from '../../home/HomeAction.js'
import { ADD_CUSTOMER } from '../../../pathConstants.js';
import { INVALID_ZIP } from './constants';
import Overlay from "../../../UI/overlay/overlay.js";
import AddCardContext from "../../add-card/addCardContext/addCardContext"
import {json2xml} from "../../common/helpers/helpers"
import {getAurusResponse} from '../../payment/Controller/paymentActions'
import {addCardDetailsToClientele} from "../../add-card/actions";
import {showException} from '../../common/exceptionErrorModal/exceptionAction';

const CONFIG_FILE = require('../../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;


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
            selectedState: '',
            selectedProvince: '',
            selectedSalutationInt: '',
            selectedCountry: '',
            addCustImage: addcustomerselected,
            addIntCustImage: addintcustomer,
            toShowSuccessModal: true,
            citystateList: [],
            stateList: [],
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
            zipOverride: false,
            cityModal: false,
            selectedSalutation: '',
            dom_cust_state: '',
            dom_cust_country: 'US',
            cust_text_opt: 'N',

            countryList: [],
            salutationDataDrop: [],
            statesList: [],
            storeClientNo: '0',
            addressSequence: '0',
            mobileSequence: '0',
            addCardModal: '',
            maxCardWarning: '',
            customercardDetails: [],
            isDomestic : false,
            cardDisplay : [],

            errorThrown: false,
            errorDescription: ''

        }

        this.cust_addr_validation_bypass = false;
        this.isValid = true;
        this.isValidInt = true;
        this.aurusVars = require("../../../resources/aurus/aurusVars")
        this.getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
        this.CloseTran = require("../../../resources/aurus/CloseTran.json");
        this.bypass = require("../../../resources/aurus/BypassScreen.json");
        const addCardScuccessMessage = "The card has been added.";
        const addCardFailMessage = "The card has been added.";
       
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

    if(nextProps.addCustomer.isValid){
        console.log('Add Customer: componentWillReceiveProps', nextProps);
        if (nextProps.addCustomer.successModalFlag === true) {
            this.setState({ storeClientNo: nextProps.addCustomer.storeClientNo });
            this.setState({ addressSequence: nextProps.addCustomer.addressSequence });
            this.setState({ mobileSequence: nextProps.addCustomer.mobileSequence });
            if (this.state.customercardDetails.length > 0) {
                this.setState({isDomestic: true})
                this.addCardDetailsToClienteleInvoker(nextProps.addCustomer.storeClientNo);
            } else {
                this.openSuccesModal();
            }
        }
        if (nextProps.addCustomer.successModalFlagInt === true && !sessionStorage.getItem('called')) {
            this.setState({ storeClientNo: nextProps.addCustomer.storeClientNo });
            if (this.state.customercardDetails.length > 0) {
                this.addCardDetailsToClienteleInvoker(nextProps.addCustomer.storeClientNo);
            } else {
                this.openSuccesModalInt();
            }
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

        if (nextProps.addCustomer.countryList && nextProps.addCustomer.countryList.length > 0) {
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



        if(nextProps.addCustomer.getCardBinResp && nextProps.addCustomer.getCardBinResp != '' && nextProps.addCustomer.getCardBinResp != undefined && nextProps.addCustomer.getCardBinResp != this.props.addCustomer.getCardBinResp){
            this.processGetCardBinResponse(nextProps.addCustomer.getCardBinResp);
        }

        if(nextProps.addCustomer.bypassResp && nextProps.addCustomer.bypassResp != '' && nextProps.addCustomer.bypassResp != undefined ){
            this.processBypassResp(nextProps.addCustomer.bypassResp);
        }

        if (nextProps.addCustomer.addCardSuccessResp && nextProps.addCustomer.addCardSuccessResp != '' && nextProps.addCustomer.addCardSuccessResp != undefined) {
            {this.state.isDomestic ?  this.openSuccesModal() : this.openSuccesModalInt() }
        }

        if (nextProps.addCustomer.addCardFailResp && nextProps.addCustomer.addCardFailResp != '' && nextProps.addCustomer.addCardFailResp != undefined)  {
            {this.state.isDomestic ?  this.openSuccesModal() : this.openSuccesModalInt() }
        }


        if (nextProps.cityStateData !== undefined && nextProps.cityStateData !== null) {
            var cityData = [];
            var stateData = [];
            var obj = nextProps.cityStateData.CityState1;
            let fields = this.state.fields;
            var CityArrayLen = 0
            for (var key in nextProps.cityStateData) {
                if (nextProps.cityStateData.hasOwnProperty(key)) {
                    ++CityArrayLen;
                }
            }
            if (CityArrayLen > 1) {
                for (var index = 0; index < CityArrayLen; index++) {
                        cityData.push(nextProps.cityStateData[Object.keys(nextProps.cityStateData)[index]][0]);
                        stateData.push(nextProps.cityStateData[Object.keys(nextProps.cityStateData)[index]][1]);
                }
                this.setState({ citystateList: cityData, stateList: stateData });
            }
            console.log("fieldsss", fields)
            if (obj) {
                if (fields['cust_city'] == ""){
                    if (CityArrayLen > 1) {
                        this.setState({ cityModal: true });
                    }
                    else {
                        fields['cust_city'] = obj[0];
                        fields['dom_cust_state'] = obj[1];
                        this.setState({ fields: fields, dom_cust_state: obj[1] });
                    }
                }
                else {
                    var isCityStateExist = false;
                    if (fields['cust_city'] && CityArrayLen > 1) {
                        if (cityData.filter(obj => obj.toString().toLowerCase() === fields['cust_city'].toString().toLowerCase()).length > 0 && stateData.filter(obj => obj === this.state.dom_cust_state).length > 0) {
                            isCityStateExist = true;
                        }
                    }
                    else {
                        if ((fields['cust_city'] && fields['cust_city'].toString().toLowerCase() === obj[0].toString().toLowerCase()) && (this.state.dom_cust_state !== "" && this.state.dom_cust_state === obj[1])) {
                            isCityStateExist = true;
                        }
                    }

                    if (!isCityStateExist) {
                        if (CityArrayLen > 1) {
                            this.setState({ cityModal: true });
                        }
                        else {
                            this.setState({ zipOverride: true });
                            fields['cust_city'] = obj[0];
                            fields['dom_cust_state'] = obj[1];
                            this.setState({ fields: fields, dom_cust_state: obj[1] });
                        }
                    }
                }
            }

            this.props.clearZipToCitySateDataActionInvoker();
        }
        // MIKE - testing for add cust form within in Send - can be removed if not working
        if(nextProps.addCustomer.responseError !== null) {
            this.setState({errorDescription: nextProps.addCustomer.responseError.response_text});
            this.setState({errorThrown:true});
        }

    }else{
            this.props.showException({
                showException:true,
                error:{failedModule: 'Add Customer', failureReason: 'Unexpected Response', failureDescription:'Unable to resolve the response structure'}
            })

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

        console.log('AddCustomer componentDidMount: ', this.props.addCustomer.firstName);

        if (this.props.addCustomer.firstName !== '') {
            this.setState({
                fields: {
                    cust_fname: this.props.addCustomer.firstName,
                    cust_lname: this.props.addCustomer.lastName,
                    cust_addr1: "",
                    cust_addr2: "",
                    cust_city: "",
                    cust_email: "",
                    cust_phone1: "",
                    cust_phone2: "",
                    dom_cust_zip: ""
                }
            });
        }
    }

    /**Fetch the salutations list from local json */

    fetchSalutation() {
        if (this.props.salutationData) {
            this.setState({
                salutationDataDrop: this.props.salutationData.Salutations
            });
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

    switchToInternational = (val) => {
        this.props.startSpinner(true);
        this.clearAllFields();
        this.clearAllFieldsInt();
        this.closeFailModalInt();
        this.closeFailModal();
        this.closeFailModal1();
        this.closeFailModalInt1();
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
            dom_cust_state: "",
            cardDisplay : [],
            maxCardWarning: false,
            customercardDetails:[]
        });
    }
    closeZipOverideModal = (showFlag) => {
        if (showFlag == false) {
            this.setState({
                zipOverride: false
            })
        }
    }
    cityModalClose = () => {
            this.setState({
                cityModal: false
            })
    }
    populateCity = (selectedTransactionDetails, selectedCityState) => {
        let fields = this.state.fields
        fields['cust_city'] = selectedTransactionDetails;
        fields['dom_cust_state'] = selectedCityState;
        this.state.dom_cust_state = selectedCityState;
        this.setState({
            fields: fields,
            cityModal: false
        })
    }

    /* Open confirmation modals - Domestic */

    openModals = () => {

        if (this.handleValidationDomCustomer()) {
            if (this.state.fields['cust_phone1']) {
                this.setState({
                    phoneModal: true,
                    filedsMissingModal: false
                });


            } else if (this.state.fields['cust_email']) {
                this.setState({
                    emailModal: true,
                    filedsMissingModal: false
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
        /*clear/reset the customer state in store due to issue when 
        we add customer again after one successfull save of previous.*/
        this.props.resetAddCustomer();
        var phoneSequence = (this.state.mobileSequence && this.state.mobileSequence != "") ? this.state.mobileSequence : "0"
        var addrSequence = (this.state.addressSequence && this.state.addressSequence != "") ? this.state.addressSequence : "0"
        let selectedCustomer = {
                addresses: {},
                clientNumber: this.state.storeClientNo,
                cCSNumber: "",
                myClient: "N",
                saluationCode: "",
                salutation: this.state.selectedSalutation,
                lastName: this.state.fields['cust_lname'],
                firstName: this.state.fields['cust_fname'],
                emailAddress: this.state.fields['cust_email'],
                selectedAddress: {
                    sequenceKey: addrSequence,
                    international: '0',
                    Addr1: this.state.fields['cust_addr1'],
                    Addr2: this.state.fields['cust_addr2'],
                    City: this.state.fields['cust_city'],
                    State: this.state.fields.dom_cust_state,
                    Country: "US",
                    Zip: this.state.fields['dom_cust_zip'],
                    PhoneNumbers: [{
                        phoneNumber : this.state.fields['cust_phone1'],
                        phoneSequence : phoneSequence,
                        phoneType: ""
                    },
                    {
                        phoneNumber : this.state.fields['cust_phone2'],
                        phoneSequence : phoneSequence,
                        phoneType: ""
                    }]
                }
                // salutation: this.state.fields.selectedSalutation,
                // firstname: this.state.fields['cust_fname'],
                // lastname: this.state.fields['cust_lname'],
                // address1: this.state.fields['cust_addr1'],
                // city: this.state.fields['cust_city'],
                // state: this.state.fields.dom_cust_state,
                // zip: this.state.fields['dom_cust_zip'],
                // address2: this.state.fields['cust_addr2']
              }

              this.props.navigateToDomesticCustomerInvoker(selectedCustomer);

            if(this.props.customerSearch.buttonId == '1' || this.props.customerSearch.flow === "sale") {
                this.callAttachCustomerActionInvoker();
                this.props.history.push('/sale');
              } else {
                this.props.history.push('/customer-details');
              }
              
        
            // this.props.custIncircleInfoRequestInvoker(data.CCSNumber);
            // this.props.history.push('/customer-details/domestic');
        // }
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
            filedsMissingModal: true,
            textoptModalInt: false
        });
    }


    closeFieldsMissingModal = () => {
        this.setState({
            filedsMissingModal: false,
            emailMissingModal: false
        });
    }

    openErrorModal = () => {
        this.setState({
            errorThrown: true
        })
    }

    closeErrorModal = () => {
        this.setState({
            errorThrown: false
        })
    }

    /* Handle input change in form - Domestic */

    handleChange = (field, e) => {
        let fields = this.state.fields;
        let errors = this.state.errors;
        if (field === 'dom_cust_zip_blur') {
            fields['dom_cust_zip'] = e.target.value;
            errors['dom_cust_zip'] = "";
            if (fields['dom_cust_zip'].length > 4) {
                this.props.zipToCitySateActionInvoker(e.target.value);
            }
        }
        else {
            fields[field] = e.target.value;
            errors[field] = "";
            this.setState({ errors: errors });
        }
        this.setState({ fields: fields, errors: errors });
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
        let fnameValidation = true, lnameValidation = true, phoneValidation = true, emailEmpty=true,
         phone1Validation = true, phone2Validation = true, emailValidation = true, addrValidation = true, zipValidation = true, cityValidation = true, stateValidation = true;
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
                errors['cust_phone1'] = 'Please enter the correct phone number';
                phone1Validation = false;
            }
        }

        if (fields['cust_phone2'] !== '' && fields['cust_phone2'] !== undefined) {
            if (fields['cust_phone2'].length < 14 || fields['cust_phone2'].length > 14) {
                console.log('cust_phone2' + fields['cust_phone2'].length);
                errors['cust_phone2'] = 'Please enter the correct phone number';
                phone2Validation = false;
            }
        }

      
        if (fields['dom_cust_zip']) {

            if (!(fields['dom_cust_zip'].length == 5 || fields['dom_cust_zip'].length == 9)) {
                errors['dom_cust_zip'] = 'Invalid Zip';
                zipValidation = false;
                //this.setState({emailMissingModal: true});
            }

        }


        if (fields["cust_email"] !== '' && fields["cust_email"] !== undefined && fields["cust_email"] !== null) {
            emailEmpty=false;
            let lastAtPos = fields["cust_email"].lastIndexOf('@');
            let lastDotPos = fields["cust_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["cust_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["cust_email"].length - lastDotPos) > 2)) {
                errors["cust_email"] = "Email is not valid";

                //this.openFieldsMissingModal();
            }
        }


        if (fields['cust_addr1'] == '' || fields['cust_addr1'] == undefined || fields['cust_addr1'] == null) {
            errors['missing fields'] = 'Address missing';
            addrValidation = false;
        }


        if (fields['cust_addr1']) {
            if (!fields['dom_cust_zip']) {
                errors['dom_cust_zip'] = 'zipcode cannot be empty';
                zipValidation = false;
                //this.openFieldsMissingModal();

            }
        }

        // if(!fields['cust_city']){
        //     errors['cust_city'] = 'City is missing';
        //     cityValidation = false;
        //    // alert(this.state.dom_cust_state);
        //     this.openFieldsMissingModal();

        // }

        // if(this.state.dom_cust_state === ''){
        //     errors['dom_cust_state'] = 'State is missing';
        //     stateValidation = false;

        // }

        if(emailEmpty === true && addrValidation === false// && (fields['cust_fname']) && (fields['cust_lname'])
     ) {
            errors["cust_email"] = "";

            errors['cust_dom_address1'] = 'Address and Email missing';
            this.setState({ filedsMissingModal: true });
        }
        else if (emailEmpty === false) {// && addrValidation === false
            if (!this.validateEmail(fields["cust_email"])) {
                errors["cust_email"] = "Please enter a valid email";
                emailValidation = false;
                //this.setState({ filedsMissingModal: true });
            }
            else{
                addrValidation = true;
            }
        }
        // else if (emailValidation === true && addrValidation === true) {
        //     if (!this.validateEmail(fields["cust_email"])) {
        //         errors["cust_email"] = "";
        //         emailValidation = false;
        //         //this.setState({ emailMissingModal: true });
        //     }
        //     addrValidation = true;
        // }
        else if (emailEmpty === true && addrValidation === true) {
            errors["cust_email"] = "";
            emailValidation = true;
        }

        if (fnameValidation && lnameValidation && phone1Validation && phone2Validation && emailValidation && addrValidation && zipValidation && cityValidation) {
            errors["cust_email"] = "";
            errors["dom_cust_zip"] = "";
            errors = {};
            this.isValid = true;
        }

        this.setState({ errors: errors });
        return this.isValid;
    }

    callAttachCustomerActionInvoker = () => {
        var storeClientNumber = this.state.storeClientNo;
        var phoneSequence = (this.state.mobileSequence && this.state.mobileSequence != "") ? this.state.mobileSequence : "0"
        var addrSequence = (this.state.addressSequence && this.state.addressSequence != "") ? this.state.addressSequence : "0"
        this.props.attachCustomerActionInvoker(this.props.login.userpin, this.props.transactionId, storeClientNumber, addrSequence, phoneSequence);
    }
    /* Submit add customer data - Domestic */

    addDomesticCustomerInvoker = (bypassFlag) => {
        this.props.startSpinner(true);
        this.setState({ emailModal: false });
        let addCustDomData = {
            ...clientConfig,
            'CFirstName': this.state.fields['cust_fname'],
            'CLastName': this.state.fields['cust_lname'],
            'Salutation': this.state.selectedSalutation,
            'Address_Ln1': this.state.fields['cust_addr1'],
            'Address_Ln2': this.state.fields['cust_addr2'],
            'City': this.state.fields['cust_city'],
            'State_Abbr': this.state.dom_cust_state,
            'Zip5': this.state.fields['dom_cust_zip'].length ==9 ? this.state.fields['dom_cust_zip'].substr(0,5) :this.state.fields['dom_cust_zip'],
            'Zip4':this.state.fields['dom_cust_zip'].length ==9 ? this.state.fields['dom_cust_zip'].substr(5) :'',
            'CEmail': this.state.fields['cust_email'],
            'Country': this.state.dom_cust_country,
            'CMobile': (this.state.fields['cust_phone1'] !== '' && this.state.fields['cust_phone1'] != undefined && this.state.fields['cust_phone1'] != null) ? parsePhoneNumber(this.state.fields['cust_phone1']) : undefined,
            'COtherPhone': (this.state.fields['cust_phone2'] !== '' && this.state.fields['cust_phone2'] != undefined && this.state.fields['cust_phone2'] != null) ? parsePhoneNumber(this.state.fields['cust_phone2']) : undefined,
            'storeClientNo': '', /* Hardcoded, to be removed */
            'storeAssoc': this.props.login.userpin, /* Hardcoded, to be removed */
            'donotcall ': this.state.cust_text_opt,
            'flagByPASS': bypassFlag,
            'EmailFlagByPASS': bypassFlag
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

        if (fieldsInt['int_cust_postal_code']) {
            if (!validInterPostalCode(fieldsInt['int_cust_postal_code'])) {
                errorsInt['int_cust_postal_code'] = 'Invalid postal code';
            }
        }

        if (fieldsInt['cust_phone1'] !== '' && fieldsInt['cust_phone1'] !== undefined) {
            if (fieldsInt['cust_phone1'].length < 10 || fieldsInt['cust_phone1'].length > 15) {
                errorsInt['cust_phone1'] = 'Please enter the correct phone number';
            }
        }

        if (fieldsInt['cust_phone2'] !== '' && fieldsInt['cust_phone2'] !== undefined) {
            if (fieldsInt['cust_phone2'].length < 10 || fieldsInt['cust_phone2'].length > 15) {
                errorsInt['cust_phone2'] = 'Please enter the correct phone number';
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
        var phoneSequence = (this.state.mobileSequence && this.state.mobileSequence != "") ? this.state.mobileSequence : "0"
        var addrSequence = (this.state.addressSequence && this.state.addressSequence != "") ? this.state.addressSequence : "0"
        let selectedCustomer = {
            addresses: {},
            clientNumber: this.state.storeClientNo,
            cCSNumber: "",
            myClient: "N",
            saluationCode: "",
            salutation: this.state.selectedSalutation,
            lastName: this.state.fieldsInt['cust_lname'],
            firstName: this.state.fieldsInt['cust_fname'],
            emailAddress: this.state.fieldsInt['cust_email'],
            selectedAddress: {
                sequenceKey: addrSequence,
                international: '1',
                Addr1: this.state.fieldsInt['cust_addr1'],
                Addr2: this.state.fieldsInt['cust_addr2'],
                City: this.state.fieldsInt['cust_city'],
                State: this.state.fieldsInt['int_cust_province'],
                Country: this.state.selectedCountry,
                Zip: this.state.fieldsInt['int_cust_postal_code'],
                PhoneNumbers: [{
                    phoneNumber : this.state.fieldsInt['cust_phone1'],
                    phoneSequence : phoneSequence,
                    phoneType: ""
                },
                {
                    phoneNumber : this.state.fieldsInt['cust_phone2'],
                    phoneSequence : phoneSequence,
                    phoneType: ""
                }]
            }
          }

          this.props.navigateToDomesticCustomerInvoker(selectedCustomer);

          if(this.props.customerSearch.buttonId == '1') {
            this.callAttachCustomerActionInvoker();
            this.props.history.push('/sale');
          } else {
            this.props.history.push('/customer-details');
          }
    
        // this.props.custIncircleInfoRequestInvoker(data.CCSNumber);
        // this.props.history.push('/customer-details/domestic');
    // }
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
        this.props.resetAddCustomer();
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
        this.props.resetAddCustomer();
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
            cardDisplay : [],
            maxCardWarning: false,
            customercardDetails:[]
        });
    }

    /* Submit add customer data - International */

    addInternationalCustomerInvoker = (bypassFlag) => {
        this.setState({ emailModalInt: false });
        this.props.startSpinner(true);
        let addCustIntData = {
            ...clientConfig,
            'CFirstName': this.state.fieldsInt['cust_fname'],
            'CLastName': this.state.fieldsInt['cust_lname'],
            'Salutation': this.state.selectedSalutationInt,
            'Address_Ln1': this.state.fieldsInt['cust_addr1'],
            'Address_Ln2': this.state.fieldsInt['cust_addr2'],
            'City': this.state.fieldsInt['cust_city'],
            'Province': this.state.fieldsInt['int_cust_province'],
            'Zip5': this.state.fieldsInt['int_cust_postal_code'],
            'CEmail': this.state.fieldsInt['cust_email'],
            'Country': this.state.selectedCountry,
            'CMobile': (this.state.fieldsInt['cust_phone1'] !== '' && this.state.fieldsInt['cust_phone1'] != undefined && this.state.fieldsInt['cust_phone1'] != null) ? this.state.fieldsInt['cust_phone1'] : undefined,
            'COtherPhone': (this.state.fieldsInt['cust_phone2'] !== '' && this.state.fieldsInt['cust_phone2'] != undefined && this.state.fieldsInt['cust_phone2'] != null) ? this.state.fieldsInt['cust_phone2'] : undefined,
            'storeClientNo': '', /* Hardcoded, to be removed */
            'storeAssoc': this.props.login.userpin, /* Hardcoded, to be removed */
            'donotcall ': this.state.cust_text_opt,
            'flagByPASS': bypassFlag,
            // 'flagByPASS': "true",
            'EmailFlagByPASS': bypassFlag
        }
        console.log(addCustIntData)
        this.props.addCustomerInternationalActionInvoker(addCustIntData);
    }

    bypassAddressValidationInt = () => {
        this.closeFailModalInt();
        this.closeFailModalInt1();
        
        this.addInternationalCustomerInvoker(true);
    }
     // AddCard Methods

     maxCardWarningMessage = () => {
        return ((this.state.maxCardWarning === true)
            ? (
                <div className="addcard-warning-container">
                    <img src={error} className='addcard-warning-icon'/>
                    <div className='addcard-warning-message'>
                        The maximum allowed cards are on file. To add another card, please remove an
                        existing card first
                    </div>
                </div>
            )
            : (null));
    };


    openCardModals = () => {
        if (document.getElementsByClassName('add-card-button-section')[0].classList.contains('button-disabler')) {
            console.log("AddCard : Button Disabled")
        }else{
            if (this.state.customercardDetails.length>3) {
                    this.setState({maxCardWarning: true})
            }else{
                this.setState({addCardModal: true}, 
                     () => { this.addCard("N") })
            }
        }
    }


    closeAddCardModal = () => {
        this.setState({addCardModal: false});
    }

    addCard = (entrymode) => {
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = 0;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = entrymode;
        var request = json2xml(this.getCardBinJson);
        this
            .props
            .aurusActionInvoker(request, "GETCARDBIN");
        console.log("AddCard:GetCardBin Request ", request);
        this.timer = setTimeout(function () {
            console.log("add card timeout");
        }, 240000);
    }

    cancelSwipeMode = () => {
        clearTimeout(this.timer);
        var bypassrequest = json2xml(this.bypass);
        this.props.aurusActionInvoker(bypassrequest,"BYPASS");
        this.timer = setTimeout(function(){ console.log("AddCustomer : cancelSwipeMode timeout"); }, 35000);
    }

    processBypassResp = (data) =>{
        console.log("AddCard: processBypassResp response returned",data);
        clearTimeout(this.timer);
        try{
            if (data.ByPassScreenResponse.ResponseCode == "00000") {
                this.addCard("Y");
                this.timer = setTimeout(function(){ console.log("AddCustomer : CLOSETRANSACTION timeout"); }, 45000);
            }else{
                console.log("AddCustomer: processBypassResp returned error code ",data.ByPassScreenResponse.ResponseCode)
            }  
        }catch(err){
            console.log("AddCustomer: processBypassResp Catch block",err)
        }
    }


    processGetCardBinResponse = (data) => {
        console.log("AddCustomer>AddCard:processGetCardBinResponse response returned", data);
        try {
            if(data.GetCardBINResponse.ResponseCode == "00000"){
                    document.getElementsByClassName('add-card-button-section')[0].classList.add('button-disabler');
                    var cardResponse = this.state.customercardDetails;
                    cardResponse.push(data.GetCardBINResponse);
                    var lastd4igits = data.GetCardBINResponse.CardToken[0].substr(data.GetCardBINResponse.CardToken[0].length - 4);
                    var cardObj= {
                            "kiNum" : data.GetCardBINResponse.KI[0],
                            "lastFour" : lastd4igits,
                            "chargeType" : data.GetCardBINResponse.CardType[0]
                        }
                    var cardObj2 = this.state.cardDisplay;
                    cardObj2.push(cardObj);
                    this.setState({addCardModal: false, customercardDetails: cardResponse,cardDisplay : cardObj2});
            }else {
                    this.setState({addCardModal: false});
            }
        }catch (err) {
                console.log("AddCustomer>AddCard: processGetCardBinResponse catch block", err);
        }
                console.log("AddCustomer>AddCard: processGetCardBinResponse", this.state.customercardDetails);
    }

    addCardDetailsToClienteleInvoker = (clientno) => {
        if (this.state.customercardDetails.length > 0) {
            let req = {
                "expiration": (this.state.customercardDetails[0].CardExpiryDate[0])
                    ? (this.state.customercardDetails[0].CardExpiryDate[0])
                    : '',
                "cardToken": (this.state.customercardDetails[0].CardToken[0])
                    ? (this.state.customercardDetails[0].CardToken[0])
                    : '',
                "responseCode": (this.state.customercardDetails[0].ResponseCode[0])
                    ? (this.state.customercardDetails[0].ResponseCode[0])
                    : '',
                "kiNum": (this.state.customercardDetails[0].KI[0])
                    ? (this.state.customercardDetails[0].KI[0])
                    : '',
                "lastname": ((this.state.customercardDetails[0].LastName[0]).trim())
                    ? ((this.state.customercardDetails[0].LastName[0]).trim())
                    : '',
                "cardType": (this.state.customercardDetails[0].CardType[0])
                    ? (this.state.customercardDetails[0].CardType[0])
                    : '',
                "hashAcct": "",
                "transNum": "",
                "hashType": "",
                "sigonFile": "",
                "storeClientNo": (clientno)
                    ? clientno
                    : ''
            }
            this
                .props
                .addCardDetailsToClienteleActionInvoker(req);
        } else {
            console.log("AddCustomer: No Card info available");
        }
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
                zipOverride={this.state.zipOverride}
                cityModal={this.state.cityModal}
                cityModalClose={this.cityModalClose}
                populateCity={this.populateCity}
                handleCustStateChange={this.handleCustStateChange}
                closeZipOverideModal={this.closeZipOverideModal}
                citystateList={this.state.citystateList}
                stateList={this.state.stateList}
                clearAllFieldsInt={this.clearAllFieldsInt}
                clearAllFields ={this.clearAllFields}
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
		        addCardModal={this.state.addCardModal} 
		        maxCardWarning={this.state.maxCardWarning} 
		        openCardModals={this.openCardModals}
                closeAddCardModal = {this.closeAddCardModal}
                cancelSwipeMode = {this.cancelSwipeMode}
		        customercardDetails={this.state.customercardDetails} 
                maxCardWarningMessage = {this.maxCardWarningMessage}
                cardDisplay = {this.state.cardDisplay}
            // testprops ="helloworld"
                errorDescription={this.state.errorDescription}
                openErrorModal={this.openErrorModal}
                closeErrorModal={this.closeErrorModal}

            />
        )

    }

}


// function formatPhoneint(intPhone) {
//      FORMATPHONEINT ORIGINAL', intPhone)
//     var phoneint = intPhone.replace(/[^A-Z0-9]+/ig, "");
//     var formattedPhone = phoneint;
//      FORMATPHONEINT REPLACE', formattedPhone)
//     var lastTen = formattedPhone.substr(formattedPhone.length - 13);
//      FORMATPHONEINT LAST10', lastTen)
//     return lastTen;
// }

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

function mapStateToProps({ addCustomer, customerSearch, home, login, customerDetails }) {
    return {
        addCustomer, customerSearch, salutationData: home.salutationData, login, customerDetails,
        transactionId: home.transactionData ? home.transactionData.transactionNumber : '',
        cityStateData: home.cityStateData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        aurusActionInvoker: getAurusResponse,
        navigateToDomesticCustomerInvoker: navigateToDomesticCustomer,
        addCustomerActionInvoker: addCustomerAction,
        addCustomerInternationalActionInvoker: addCustomerIntAction,
        getCountryListActionInvoker: getCountryList,
        goToSalesPage: goToSalesPage,
        attachCustomerActionInvoker: attachCustomerAction,
        zipToCitySateActionInvoker: zipToCitySateAction,
        clearZipToCitySateDataActionInvoker: clearZipToCitySateDataAction,
	startSpinner: startSpinner,
     resetAddCustomer: resetAddCustomerPage,
      showException:showException,
	addCardDetailsToClienteleActionInvoker: addCardDetailsToClientele
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);