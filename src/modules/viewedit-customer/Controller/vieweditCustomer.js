import ReactTooltip from 'react-tooltip'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewCustomerAction, getCountryList } from './vieweditCustomerAction';
import { attachCustomerAction } from '../../home/HomeAction.js'
//import { getStoreClientIdUpdateAction } from './vieweditCustomerAction';
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
// import { startSpinner } from '../common/loading/spinnerAction';
// import Spinner from '../common/loading/spinner';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField/SelectField';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import IconButton from 'material-ui/IconButton';
import Popup from '../../popup/popup';
import Modal from 'react-responsive-modal';
import VerifyCustomerDomestic from '../../verify_customer/View/VerifyCustomerDomView';
import { startSpinner } from '../../common/loading/spinnerAction';
import { zipToCitySateAction, clearZipToCitySateDataAction } from '../../home/HomeAction.js'
import {showException} from '../../common/exceptionErrorModal/exceptionAction';

/* View Components import */
import ViewEditCustomerView from '../View/vieweditCustomerView'
import { goToSalesPage } from '../../sale/SaleAction.js'
import { setClienteled } from '../../customer-search-sale/actions.js';

/**/
import profileselected from '../../../resources/images/Profile_Selected.svg';
import profileunselected from '../../../resources/images/Profile.svg';
import remainderselected from '../../../resources/images/Reminder.svg';


class ViewEditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statesList: [],
            profileselect: profileselected,
            reminderselect: remainderselected,
            showPopup: false,
            fields: {},
            currentAddress1: {},
            currentAddressForVerify: {},
            phoneModal: false,
            textOptModal: false,
            cust_dom_state: '',
            dom_cust_country: 'US',
            emailModal: false,
            succesModal: false,
            failModal: false,
            selectedCountry: '',
            isClienteled: false,
            cust_text_opt: 'N',
            countryList: [],
            userType: '',
            selectedSalutation: "",
            errors: {},
            updateFailed:false,
            salutationDataDrop: [],
            zipOverride: false,
            cityModal: false,
            citystateList: [],
            stateList: [],
            failModal1: false,
            changedAddress: {
                cust_cssId: '',
                cust_dom_salutation: '',
                cust_dom_fname: '',
                cust_dom_lname: '',
                cust_dom_address1: '',
                cust_dom_address2: '',
                cust_dom_mobile: '',
                cust_dom_email: '',
                cust_dom_otherMobile: '',
                cust_dom_city: '',
                cust_dom_state: '',
                cust_dom_country: '',
                cust_dom_countryCode: '',
                cust_dom_postal: '',
                cust_dom_province: '',
                cust_dom_zip: ''
            },

            profileData: {
                    cust_cssId: this.props.customerDetails.cCSNumber,
                    international: this.props.customerDetails.selectedAddress.international,
                    AddressSeque:this.props.customerDetails.selectedAddress.sequenceKey,
                    cust_dom_salutation: this.props.customerDetails.salutation ? this.props.customerDetails.salutation : '',
                    cust_dom_fname: this.props.customerDetails.firstName ? this.props.customerDetails.firstName: '',
                    cust_dom_lname: this.props.customerDetails.lastName? this.props.customerDetails.lastName : '',
                    cust_dom_address1: this.props.customerDetails.selectedAddress.Addr1 ? this.props.customerDetails.selectedAddress.Addr1: '',//'9303 Spring Hollow Dr',
                    cust_dom_address2: this.props.customerDetails.selectedAddress.Addr2 ? this.props.customerDetails.selectedAddress.Addr2 : '',
                    cust_dom_mobile: this.props.customerDetails.selectedAddress.PhoneNumbers.length >= 1 ? this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneNumber : '',
                    cust_dom_email: this.props.customerDetails.emailAddress ? this.props.customerDetails.emailAddress : '',
                    cust_dom_otherMobile: this.props.customerDetails.selectedAddress.PhoneNumbers[1] ? this.props.customerDetails.selectedAddress.PhoneNumbers[1].phoneNumber : '',
                    cust_dom_city: this.props.customerDetails.selectedAddress.City ? this.props.customerDetails.selectedAddress.City : '', //"New york"
                    cust_dom_state: this.props.customerDetails.selectedAddress.State ? this.props.customerDetails.selectedAddress.State : '', //'NY'
                    cust_dom_country: this.props.customerDetails.selectedAddress.Country ? this.props.customerDetails.selectedAddress.Country : '', //'CANADA',
                    cust_dom_countryCode: this.props.customerDetails.selectedAddress.Country ? this.props.customerDetails.selectedAddress.Country : '', //'CANADA',
                    cust_dom_province: this.props.customerDetails.selectedAddress.province ? this.props.customerDetails.selectedAddress.province : '', //'ON',
                    cust_dom_postal: this.props.customerDetails.selectedAddress.zip ? this.props.customerDetails.selectedAddress.zip : '', //'78750',
                    cust_dom_zip: this.props.customerDetails.selectedAddress.Zip ? this.props.customerDetails.selectedAddress.Zip : '', //'78750',
            },

            changedAddressForVerify: {},
            currentLvl: '0',
            pointsToNextLvl: '0'
        }
        this.profileData = {};

        this.isValid = true;
    }
    openSuccesModal = () => {
        this.setState({
            emailModal: false, phoneModal: false, succesModal: true
        });
    }

    closeSuccessModal = () => {
        console.log(this.state.changedAddress);
        this.props.goToSalesPage(false, {
            salutation: this.state.changedAddress.cust_dom_salutation,
            firstname: this.state.changedAddress.cust_dom_fname,
            lastname: this.state.changedAddress.cust_dom_lname,
            address1: this.state.changedAddress.cust_dom_address1,
            city: this.state.changedAddress.cust_dom_city,
            state: this.state.changedAddress.cust_dom_state,
            zip: this.state.changedAddress.cust_dom_zip ? this.state.changedAddress.cust_dom_zip : this.state.changedAddress.cust_dom_postal,
            address2: this.state.changedAddress.cust_dom_address2,
            email: this.state.changedAddress.cust_dom_email,
            mobile: this.state.changedAddress.cust_dom_mobile,
            otherMobile: this.state.changedAddress.cust_dom_otherMobile,
        });
        this.setState({ succesModal: false, failModal1: false });
        this.callAttachCustomerActionInvoker();
        this.props.history.push('/sale', { isClienteled: true });
        this.setState({ isClienteled: true });

    }
    componentWillReceiveProps = nextProps => {
    if(nextProps.viewEditCustomer.isValid ){
        
        console.log('Update Customer: componentWillReceiveProps', nextProps);
        if (nextProps.viewEditCustomer.successModalFlag === true && nextProps.viewEditCustomer.clienteleUpdateFlag === true) {
            this.setState({
                emailModal: false, phoneModal: false, textoptModal: false, succesModal: true, failModal1: false
            });
        }
        else if (nextProps.viewEditCustomer.successModalFlag === true && nextProps.viewEditCustomer.clienteleUpdateFlag === false) {
            this.props.goToSalesPage(false, {
                salutation: this.state.changedAddress.cust_dom_salutation,
                firstname: this.state.changedAddress.cust_dom_fname,
                lastname: this.state.changedAddress.cust_dom_lname,
                address1: this.state.changedAddress.cust_dom_address1,
                city: this.state.changedAddress.cust_dom_city,
                state: this.state.changedAddress.cust_dom_state,
                zip: this.state.changedAddress.cust_dom_zip ? this.state.changedAddress.cust_dom_zip : this.state.changedAddress.cust_dom_postal,
                address2: this.state.changedAddress.cust_dom_address2,
                email: this.state.changedAddress.cust_dom_email,
                mobile: this.state.changedAddress.cust_dom_mobile,
                otherMobile: this.state.changedAddress.cust_dom_otherMobile,
            });
            this.props.history.push('/sale');
        }
        else {

            if (nextProps.viewEditCustomer.countryList.length > 0) {
                this.setState({ countryList: nextProps.viewEditCustomer.countryList });
            }
        }

        if (nextProps.viewEditCustomer.verifyEmailFlag === true && nextProps.viewEditCustomer.successModalFlag === false) {
            console.log("33333");
            this.setState({
                emailModal: false
            });
            this.setState({
                phoneModal: false
            });
            this.setState({
                textoptModal: false
            });
            this.setState({
                failModal1: true,
                addrEmailMOdal: false
            })
        }
        if (nextProps.incircleData !== null && nextProps.incircleData !== undefined) {
            var circleData = nextProps.incircleData.data;
            var currentLvl = (circleData.lyBenefitLevelCode > circleData.tyBenefitlevelCode) ? circleData.lyBenefitLevelCode : circleData.tyBenefitlevelCode;
	        this.setState({ currentLvl: currentLvl, pointsToNextLvl: circleData.pointsAwayToNextPointCard });
        }

        if(nextProps.viewEditCustomer.errorModal === true && nextProps.viewEditCustomer.successModalFlag === false){
            this.updateFailedModalToggle();
        }

        if (nextProps.cityStateData !== undefined && nextProps.cityStateData !== null) {
            var cityData = [];
            var stateData = [];
            var obj = nextProps.cityStateData.CityState1;
            let fields = this.state.fields;
            let changedAddress = this.state.changedAddress;
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
            /* if (obj) {
                if (fields['cust_dom_city'] == ""){
                    fields['cust_dom_city'] = obj[0];
                    fields['cust_dom_state'] = obj[1];
                    changedAddress['cust_dom_city'] = obj[0];
                    changedAddress['cust_dom_state'] = obj[1];
                    this.setState({ fields: fields, dom_cust_state: obj[1], changedAddress: changedAddress });
                    if (CityArrayLen > 1) {
                        this.setState({ cityModal: true });
                    }
                }
                else {
                    if ((fields['cust_dom_city'] && fields['cust_dom_city'].toString().toLowerCase() !== obj[0].toString().toLowerCase()) || (this.state.dom_cust_state !== "" && this.state.dom_cust_state !== obj[1])) {
                        this.setState({ zipOverride: true });
                        fields['cust_dom_city'] = obj[0];
                        fields['cust_dom_state'] = obj[1];
                        changedAddress['cust_dom_city'] = obj[0];
                        changedAddress['cust_dom_state'] = obj[1];
                        this.setState({ fields: fields, dom_cust_state: obj[1], changedAddress:changedAddress });
                    }
                }
            } */
            if (obj) {
                if (fields['cust_dom_city'] == ""){
                    if (CityArrayLen > 1) {
                        this.setState({ cityModal: true });
                    }
                    else {
                        fields['cust_dom_city'] = obj[0];
                        fields['cust_dom_state'] = obj[1];
                        changedAddress['cust_dom_city'] = obj[0];
                        changedAddress['cust_dom_state'] = obj[1];
                        this.setState({ changedAddress:changedAddress, fields: fields, dom_cust_state: obj[1] });
                    }
                }
                else {
                    var isCityStateExist = false;
                    if (fields['cust_dom_city'] && CityArrayLen > 1) {
                        if (cityData.filter(obj => obj.toString().toLowerCase() === fields['cust_dom_city'].toString().toLowerCase()).length > 0 && stateData.filter(obj => obj === this.state.dom_cust_state).length > 0) {
                            isCityStateExist = true;
                        }
                    }
                    else {
                        if ((fields['cust_dom_city'] && fields['cust_dom_city'].toString().toLowerCase() === obj[0].toString().toLowerCase()) && (this.state.dom_cust_state !== "" && this.state.dom_cust_state === obj[1])) {
                            isCityStateExist = true;
                        }
                    }

                    if (!isCityStateExist) {
                        if (CityArrayLen > 1) {
                            this.setState({ cityModal: true });
                        }
                        else {
                            this.setState({ zipOverride: true });
                            fields['cust_dom_city'] = obj[0];
                            fields['cust_dom_state'] = obj[1];
                            changedAddress['cust_dom_city'] = obj[0];
                            changedAddress['cust_dom_state'] = obj[1];
                            this.setState({ changedAddress: changedAddress, fields:fields, dom_cust_state: obj[1] });
                        }
                    }
                }
            }
            this.props.clearZipToCitySateDataActionInvoker();
        }

        }else{
            this.props.showException({
                showException:true,
                error:{failedModule: 'View Edit Customer', failureReason: 'Unexpected Response', failureDescription:'Unable to resolve the response structure'}
            })
        }


    }
    // getCustomerDataforUpdate = () => {

    //     console.log('update ibnit', this.state.changedAddress, this.state.currentAddress1, this.state.profileData, this.profileData)
    //     this.props.setClienteled(true);
    //     this.setState({ emailModal: false });
    //     //alert(ClienteleUpdateFlag);
    //     this.props.startSpinner(true);
    //     let addCustDomData = {
    //         "ClientID": "0010:0169:06062018:013639",
    //         "ClientTypeID": "1000",
    //         "SourceApp": "POS",
    //         "Country": this.state.changedAddress['cust_dom_country'],
    //         "storeAssoc": this.props.login.userpin,
    //         "SourceLoc": "0010",
    //         "CFirstName": this.state.changedAddress['cust_dom_fname'],
    //         "CLastName": this.state.changedAddress['cust_dom_lname'],
    //         "CEmail": this.state.changedAddress['cust_dom_email'],
    //         "COtherPhone": this.state.changedAddress['cust_dom_mobile'] ? this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, "") : "",
    //         "Address_Ln1": this.state.changedAddress['cust_dom_address1'],
    //         "City": this.state.changedAddress['cust_dom_city'],
    //         "Zip5": this.state.changedAddress['cust_dom_zip'],
    //         "CCssNo": this.state.changedAddress['cust_cssId'],
    //         "StoreClientNo": "",
    //         "flagByPASS": true,
    //         "ClienteleUpdateFlag": false
    //     }

    //     this.props.getStoreClientIdUpdateActionInvoker(addCustDomData);

    // }

    bypassEmailValidation = () => {
        //alert('bypass')
        this.closeFailModal();
        this.failModal1 = false,
        this.viewDomesticCustomerInvoker(true);
        return;
    }

    closeFailModal = () => {
        this.setState({
            failModal1: false
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
            cityModal: false,
        })
    }

    populateCity = (selectedTransactionDetails, selectedCityState) => {
        let fields = this.state.changedAddress
        fields['cust_dom_city'] = selectedTransactionDetails;
        fields['cust_dom_state'] = selectedCityState;
        this.state.dom_cust_state = selectedCityState;
        this.setState({
            changedAddress: fields,
            cityModal: false
        })
    }

  /*  handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        let errors = this.state.errors;
        errors[field] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress[field] = e.target.value;
        this.setState({ errors: errors, fields: fields, changedAddress: changedAddress });
    } */

    handleChange = (field, e) => {
        let fields = this.state.fields;
        var changedAddress = this.state.changedAddress;
        let errors = this.state.errors;
        if (field === 'cust_dom_zip_blur') {
            fields['cust_dom_zip'] = e.target.value;
            changedAddress['cust_dom_zip'] = e.target.value;
            errors['cust_dom_zip'] = "";
            if (fields['cust_dom_zip'].length > 4) {
                this.props.zipToCitySateActionInvoker(e.target.value);
            }
        }
        else {
            fields[field] = e.target.value;
            changedAddress[field] = e.target.value;
            errors[field] = "";
            this.setState({ errors: errors });
        }
        this.setState({ fields: fields, errors: errors, changedAddress :changedAddress });
    }

    updateFailedModalToggle = () =>{
        console.log("yes hello")
        if(this.state.updateFailed == true){
            this.setState({updateFailed:false})
        }else{
            this.setState({updateFailed:true})
        }
    }

    /* Country change - International */
    handleCountryChange = (value, e) => {
        console.log(e.target.textContent);
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        console.log(fields)
        this.setState({
            changedAddress: fields
        });
    }

    toCamelCase(str) {
        return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (match) {
            return match.toUpperCase();
        });
    }

    // componentDidMount(){

    // }
    navigateToCustomerSearch = () => {
        this.props.history.push('/customer-search'); ``
    }

    componentWillMount() {

        this.fetchSalutation();
        this.fetchStates();
        if (this.props.customerDetails != {} && this.props.customerDetails != undefined && this.props.customerDetails != null) {
            var profileDataLocal = Object.assign({}, this.state.profileData)
            // profileDataLocal.cust_dom_country = this.props.viewEditCustomer.profileData.country;
            this.profileData = profileDataLocal;
            this.setState({ currentAddress1: this.profileData, changedAddress: this.profileData });
        }
        this.getAddress();
        // this.props.startSpinner(false);
        console.log("SHIV SALUTATION", this.state.selectedSalutation)
    }

    fetchSalutation() {
        if (this.props.salutationData) {
            this.setState({
                salutationDataDrop: this.props.salutationData.Salutations
            });
        }
    }

    fetchStates() {
        const statesList = require('../../../resources/stubs/states.json');
        if (statesList) {
            this.setState({ statesList: statesList.states });
        }
    }

    getAddress = () => {
        var profile = Object.assign({}, this.state.profileData);
        var changedProfile = Object.create(profile);
        // var changedProfileForVerify = Object.create(profileForVerify);
        this.setState({
            currentAddress1: profile, changedAddress: changedProfile,
        // }, function () {
        //     this.getCustomerDataforUpdate();
        });
        if (profile.international == '0') {
            console.log("we are dealing with a domestic customer")
            this.setState({
                userType: 'dom'
            })

        }
        else {
            console.log("we are dealing with an international customer")
            this.setState({
                userType: 'int'
            })
            this.props.getCountriesInvoker();
        }
    }

    openVerifyPopup = () => {
        this.setState({ emailModal: false, addrEmailMOdal: false, phoneModal: false });
        if (this.handleValidation()) {
            if (this.getClienteleUpdateFlag()) {
                this.setState({ showPopup: !this.state.showPopup });
            }
            else {
                this.callAttachCustomerActionInvoker();
                // this.viewDomesticCustomerInvoker();
                this.props.history.push('/sale', { isClienteled: true });
                this.props.setClienteled(true);
                this.setState({ isClienteled: true });
            }
        }
    }

    openaddrEmailMOdal = () => {
        this.setState({ addrEmailMOdal: true });
    }

    closeaddrEmailMOdal = () => {
        this.setState({ addrEmailMOdal: false });
    }

    openTextOptModal = () => {
        this.setState({ phoneModal: false, textoptModal: true });
    }

    handleSalutationChange = (value, e) => {
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        this.setState({
            selectedSalutation: fields[value]
        });
    }

    validateEmail(email) {
        var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleValidation = () => {
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

        if (fields['cust_dom_email'] == '' || fields['cust_dom_email'] == undefined || fields['cust_dom_email'] == null) {
            //errors["cust_dom_email"] = "Email missing";
            emailValidation = false;
        }

        if (fields['cust_dom_address1'] == '' || fields['cust_dom_address1'] == undefined || fields['cust_dom_address1'] == null) {
            //errors['cust_dom_address1'] = 'Address missing';
            addrValidation = false;
        }

        if (emailValidation === false && addrValidation === false) {
            errors["cust_dom_email"] = "";
            errors['cust_dom_address1'] = "";
            this.openaddrEmailMOdal();
        }
        else if (emailValidation === true && addrValidation === false) {
            if (!this.validateEmail(fields["cust_dom_email"])) {
                errors["cust_dom_email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if (emailValidation === true && addrValidation === true) {
            if (!this.validateEmail(fields["cust_dom_email"])) {
                errors["cust_dom_email"] = "Invalid Email";
                emailValidation = false;
            }
            addrValidation = true;
        }
        else if (emailValidation === false && addrValidation === true) {
            errors["cust_dom_email"] = "";
            emailValidation = true;
        }

        if (fnameValidation && lnameValidation && emailValidation && addrValidation) {
            errors["cust_dom_email"] = "";
            errors = {};
            this.isValid = true;
        }

        this.setState({ errors: errors });
        return this.isValid;
    }

    openModals = () => {
        if (this.handleValidation()) {
            this.setState({ showPopup: false })
            console.log(this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress1['cust_dom_email']);
            if (this.state.changedAddress['cust_dom_mobile'] && (this.state.changedAddress['cust_dom_mobile'] !== this.state.currentAddress1['cust_dom_mobile'])) {
                this.setState({
                    phoneModal: true
                });

            } else if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress1['cust_dom_email'])) {
                this.setState({
                    emailModal: true
                });
            } else {
                this.setState({
                    emailModal: false
                });
                this.viewDomesticCustomerInvoker();
                // this.props.startSpinner(true);
                //this.setState({showPopup:!this.state.showPopup});  
            }
        }
    }

    // handleStateChange = (event, index, value) => {
    //     this.setState({ cust_dom_state : value });
    // }

    handleStateChange = (event, index, value) => {
        let fields = this.state.fields;
        fields['cust_dom_state'] = value;
        let errors = this.state.errors;
        errors['cust_dom_state'] = "";
        var changedAddress = this.state.changedAddress;
        changedAddress['cust_dom_state'] = value;
        this.setState({ errors: errors, fields: fields, changedAddress: changedAddress });
    }

    switchtoRemainder = () => {
        document.getElementsByClassName('viewedit-customer-label')[0].classList.remove('selected-tab-label')
        document.getElementsByClassName('viewedit-customerint-label')[0].classList.add('selected-tab-label')
        this.setState({
            profileselect: profileunselected,
        });
    }
    switchtoProfile = () => {
        document.getElementsByClassName('viewedit-customer-label')[0].classList.add('selected-tab-label')
        document.getElementsByClassName('viewedit-customerint-label')[0].classList.remove('selected-tab-label')
        this.setState({
            profileselect: profileselected
        });
    }
   

    closePhoneModal = () => {
        this.setState({
            phoneModal: false
        });
    }
    openEmailModal = () => {
        this.setState({ textoptModal: false, emailModal: true });
        if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress1['cust_dom_email'])) {
            this.setState({ emailModal: true });
        }

        else {
            this.viewDomesticCustomerInvoker();
        }

    }
    closeEmailModal = () => {
        this.setState({
            emailModal: false
        });
    }
    setCustTextOpt = () => {
        this.setState({
            cust_text_opt: 'Y'
        });
        this.openEmailModal();
        if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress1['cust_dom_email'])) {
            this.openEmailModal();
        }
        else {
            this.viewDomesticCustomerInvoker();
        }
    }

    cancelViewEdit = () => {

        this.navigateToCustomerSearch();
    }

    getClienteleUpdateFlag = () => {
        let ClienteleUpdateFlag = true;
        if (this.state.currentAddress1.cust_cssId === this.state.changedAddress.cust_cssId
            && this.state.currentAddress1.cust_dom_address1 === this.state.changedAddress.cust_dom_address1
            && this.state.currentAddress1.cust_dom_address2 === this.state.changedAddress.cust_dom_address2
            && this.state.currentAddress1.cust_dom_city === this.state.changedAddress.cust_dom_city
            && this.state.currentAddress1.cust_dom_country === this.state.changedAddress.cust_dom_country
            && this.state.currentAddress1.cust_dom_email === this.state.changedAddress.cust_dom_email
            && this.state.currentAddress1.cust_dom_fname === this.state.changedAddress.cust_dom_fname
            && this.state.currentAddress1.cust_dom_lname === this.state.changedAddress.cust_dom_lname
            && this.state.currentAddress1.cust_dom_mobile === this.state.changedAddress.cust_dom_mobile
            && this.state.currentAddress1.cust_dom_otherMobile === this.state.changedAddress.cust_dom_otherMobile
            && this.state.currentAddress1.cust_dom_postal === this.state.changedAddress.cust_dom_postal
            && this.state.currentAddress1.cust_dom_salutation === this.state.changedAddress.cust_dom_salutation
            && this.state.currentAddress1.cust_dom_state === this.state.changedAddress.cust_dom_state
            && this.state.currentAddress1.cust_dom_zip === this.state.changedAddress.cust_dom_zip) {
            ClienteleUpdateFlag = false;
        }
        
        let changedCustomerDetails = {
            addresses: this.props.customerDetails.addresses,
            clientNumber: this.props.customerDetails.clientNumber,
            cCSNumber: this.props.customerDetails.cCSNumber,
            myClient: this.props.customerDetails.myClient,
            saluationCode: this.props.customerDetails.saluationCode,
            salutation: this.props.customerDetails.salutation,
            lastName: this.props.customerDetails.lastName,
            firstName: this.props.customerDetails.firstName,
            emailAddress: this.props.customerDetails.emailAddress,
            selectedAddress: {
                sequenceKey: this.props.customerDetails.selectedAddress.sequenceKey,
                Addr1: this.props.customerDetails.selectedAddress.Addr1,
                Addr2: this.props.customerDetails.selectedAddress.Addr2,
                City: this.props.customerDetails.selectedAddress.City,
                State: this.props.customerDetails.selectedAddress.State,
                Country: this.props.customerDetails.selectedAddress.Country,
                Zip: this.props.customerDetails.selectedAddress.Zip,
                PhoneNumbers: this.props.customerDetails.selectedAddress.PhoneNumbers
            },
        }

        // for (var key in this.state.profileData){
        //     if(this.state.currentAddress1[key] !== this.state.changedAddress[key]){
        //         if(key === 'Addr1' || key === 'Addr2' || key === 'City', 
        //             key === 'State'|| key === 'Country'|| key === 'Zip' || key === 'PhoneNumbers' ||){
        //                 changedCustomerDetails.selectedAddress[key] = this.state.changedAddress[key];
        //             }
        //         changedCustomerDetails[key] = this.state.changedAddress[key];
        //         ClienteleUpdateFlag = true;
        //     }
        //     console.log("SHIV COMPARE:",this.state.currentAddress1[key] )
        //     console.log("SHIV COMPARE changed:",this.state.changedAddress[key] )
        // }

        return ClienteleUpdateFlag;
    }

    callAttachCustomerActionInvoker = () => {
        var storeClientNumber = (this.props.customerDetails.clientNumber) ? this.props.customerDetails.clientNumber : "";
        var phoneSequence = (this.props.customerDetails.selectedAddress.PhoneNumbers.length > 0 && this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence != "") ? this.props.customerDetails.selectedAddress.PhoneNumbers[0].phoneSequence : "0"
        this.props.attachCustomerActionInvoker(this.props.login.userpin, this.props.transactionId, storeClientNumber, this.props.customerDetails.selectedAddress.sequenceKey, phoneSequence);
    }

    /*** update customer data */
    /* Submit add customer data - Domestic */
    viewDomesticCustomerInvoker = (bypassFlag) => {
        const config = require('../../../resources/stubs/config.json');
        let clientConfig = config.clientConfig;

        this.props.setClienteled(true);
        this.setState({ emailModal: false });
        this.setState({failModal1: false});
        //alert(ClienteleUpdateFlag);
        this.props.startSpinner(true);
        let addCustDomData = {
            ...clientConfig,
            "storeAssoc": this.props.login.userpin,
            "ClientTypeID":"1000",
            "Country": this.state.changedAddress['cust_dom_countryCode'],
            "CFirstName": this.state.changedAddress['cust_dom_fname'],
            "CLastName": this.state.changedAddress['cust_dom_lname'],
            "CEmail": this.state.changedAddress['cust_dom_email'],
            "COtherPhone": this.state.changedAddress['cust_dom_mobile'] ? this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, "") : "",
            "Address_Ln1": this.state.changedAddress['cust_dom_address1'],
            "City": this.state.changedAddress['cust_dom_city'],
            "Zip5": this.state.changedAddress['cust_dom_zip'].length ==9 ? this.state.changedAddress['cust_dom_zip'].substr(0,5) : this.state.changedAddress['cust_dom_zip'],
            'Zip4':this.state.changedAddress['cust_dom_zip'].length ==9 ? this.state.changedAddress['cust_dom_zip'].substr(5) :'',
            "CCssNo": this.state.changedAddress['cust_cssId'],
            "StoreClientNo": (this.props.customerDetails.clientNumber) ? this.props.customerDetails.clientNumber : "",
            "flagByPASS": true,
            "EmailFlagByPass": bypassFlag,
            //"ClienteleUpdateFlag": this.getClienteleUpdateFlag()
            //"ClienteleUpdateFlag": (this.props.viewEditCustomer.storeClientNumber) ? true : false
            "ClienteleUpdateFlag": true,
            "AddressSeque": this.state.profileData.AddressSeque,
            'Salutation': this.state.changedAddress['cust_dom_salutation'],
            'State_Abbr': this.state.changedAddress['cust_dom_state'],
            'CMobile': this.state.changedAddress['cust_dom_mobile'],
            'donotcall': true
        }
        this.props.viewCustomerActionInvoker(addCustDomData);
    }
    render() {
        return (
            <ViewEditCustomerView
                statesList={this.state.statesList}
                history={this.props.history}
                switchtoProfile={this.switchtoProfile}
                switchtoRemainder={this.switchtoRemainder}
                openVerifyPopup={this.openVerifyPopup}
                closePhoneModal={this.closePhoneModal}
                openTextOptModal={this.openTextOptModal}
                openEmailModal={this.openEmailModal}
                setCustTextOpt={this.setCustTextOpt}
                closeEmailModal={this.closeEmailModal}
                viewDomesticCustomerInvoker={this.viewDomesticCustomerInvoker}
                closeSuccessModal={this.closeSuccessModal}
                closeFailModal={this.closeFailModal}
                bypassAddressValidation={this.bypassAddressValidation}
                closeaddrEmailMOdal={this.closeaddrEmailMOdal}
                handleSalutationChange={this.handleSalutationChange}
                handleCountryChange={this.handleCountryChange}
                handleStateChange={this.handleStateChange}
                salutationDataDrop={this.state.salutationDataDrop}
                showPopup={this.state.showPopup}
                isValid={this.state.isValid}
                cust_dom_state={this.state.cust_dom_state}
                selectedSalutation={this.state.selectedSalutation}
                cust_text_opt={this.state.cust_text_opt}
                currentAddress={this.state.currentAddress1}
                changedAddress={this.state.changedAddress}
                profileselect={this.profileselect}
                errors={this.state.errors}
                reminderselect={this.state.reminderselect}
                userType={this.state.userType}
                countryList={this.state.countryList}
                phoneModal={this.state.phoneModal}
                textoptModal={this.state.textoptModal}
                emailModal={this.state.emailModal}
                succesModal={this.state.succesModal}
                failModal={this.state.failModal}
                failModal1={this.state.failModal1}
                addrEmailMOdal={this.state.addrEmailMOdal}
                handleChange={this.handleChange}
                openModals={this.openModals}
                toCamelCase={this.toCamelCase}
                navigateToCustomerSearch={this.navigateToCustomerSearch}
                currentLvl={this.state.currentLvl}
                pointsToNextLvl={this.state.pointsToNextLvl}
                cancelViewEdit={this.cancelViewEdit}
                zipOverride={this.state.zipOverride}
                cityModal={this.state.cityModal}
                cityModalClose={this.cityModalClose}
                citystateList={this.state.citystateList}
                stateList={this.state.stateList}
                populateCity={this.populateCity}
                closeZipOverideModal={this.closeZipOverideModal}
                bypassEmailValidation={this.bypassEmailValidation}
                updateFailedModalToggle={this.updateFailedModalToggle}
                updateFailed={this.state.updateFailed}
            />
        );
    }
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

function mapStateToProps({ viewEditCustomer, customerSearch, home, login, customerDetails }) {
    return { viewEditCustomer, customerDetails, incircleData: customerSearch.incircleData, cityStateData: home.cityStateData, salutationData: home.salutationData, login,
    transactionId: home.transactionData ? home.transactionData.transactionNumber : '' };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountriesInvoker: getCountryList, viewCustomerActionInvoker: viewCustomerAction,
    //getStoreClientIdUpdateActionInvoker: getStoreClientIdUpdateAction,
    attachCustomerActionInvoker: attachCustomerAction,
    goToSalesPage: goToSalesPage, startSpinner: startSpinner, setClienteled: setClienteled, zipToCitySateActionInvoker: zipToCitySateAction,
    showException : showException,
    clearZipToCitySateDataActionInvoker: clearZipToCitySateDataAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditCustomer);