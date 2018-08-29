import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {store} from '../../store/store'

/* Images/Icons */
import updatecustomerselected from '../../resources/images/Add_Customer_Selected.svg';
import updateintcustomer from '../../resources/images/Add_International_Customer.svg';

/* Actions */
import { navigateToDomesticCustomer } from '../customer-details/CustomerDetailsActions.js'
import { zipToCitySateAction, clearZipToCitySateDataAction } from '../home/HomeAction.js'
import { startSpinner } from '../common/loading/spinnerAction';
import { updateCustomerAction } from './UpdateCustomerAction';

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
            updateDomesticShown: true,
            selectedProvince: '',
            selectedSalutation: '',
            selectedCountry: '',
            updateCustImage: updatecustomerselected,
            updateIntCustImage: updateintcustomer,
            isValid: true,
            fields: {},
            errors: {},
            invlaid_cust_dom_zip: '',
            invlaid_cust_dom_state: '',
            phoneModal: false,
            textoptModal: false,
            emailModal: false,
            closeaddrEmailMOdal: false,
            succesModalFlag: false,
            failModal: false,
            failModal1: false,
            salutationDataDrop: [],
            dom_cust_state: '',
            dom_cust_country: 'US',
            cust_text_opt: 'N',
            showPopup: false,
            zipOverride: false,
            cityModal: false,
            failedToUpdateModal: false,
            citystateList: [],
            stateList: [],
            currentAddress: {

            },
            UpdatedCustomerData:{

            },
            changedAddress: {
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
                    cust_dom_countryCode: this.props.customerDetails.selectedAddress.countryCode ? this.props.customerDetails.selectedAddress.countryCode : '', //'CANADA',
                    cust_dom_postal: this.props.customerDetails.selectedAddress.Zip ? this.props.customerDetails.selectedAddress.Zip : '', //'78750',
                    cust_dom_province: this.props.customerDetails.selectedAddress.province ? this.props.customerDetails.selectedAddress.province : '', //'ON',
                    cust_dom_zip: this.props.customerDetails.selectedAddress.Zip ? this.props.customerDetails.selectedAddress.Zip : '', //'78750',
                },
            fields: {},
            errors: {}
        }
    }


    componentWillMount() {
        console.log("UpdateCustomer Domestic Will mount");
        this.fetchSalutation();
        this.fetchStates();
        console.log('Update Customer: componentWillmount', this.state.profileData);
        this.props.startSpinner(false);
        //this.state.prevData
        // this.setState({prevData:this.props.customerDetails})
        // console.log('cust prev props'+JSON.stringify(this.props));
    }

    /* This method is invoked if any of the props changes, via reducer */

    componentWillReceiveProps = nextProps => {
        console.log('Update Customer: componentWillReceiveProps', nextProps);
        console.log(this.state.currentAddress)
        if (nextProps.updateCustomer.successModalFlag === true) {
            console.log("11111");
            this.props.startSpinner(false);
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
                failModal1: false
            })
            this.setState({
                succesModal: true
            })
        }
        if (nextProps.updateCustomer.addressValidationSuccessFlag === true && nextProps.updateCustomer.successModalFlag === false) {
            console.log("22222");
            this.cust_addr_validation_bypass = true;
            //this.setState({showPopup:!this.state.showPopup});
            this.updateDomesticCustomerInvoker(true);
            //this.props.startSpinner(false);

        }
        if (nextProps.updateCustomer.updateFailModalFlag === true && nextProps.updateCustomer.successModalFlag === false) {
            console.log("22222");
            this.failedToUpdate();
        }

        if (nextProps.updateCustomer.notFoundFlag === true && nextProps.updateCustomer.successModalFlag === false) {
            console.log("PURNIMA: When updating customer not found");
            this.custNotFound();
        }

        if (nextProps.updateCustomer.verifyAddressFlag === true) {
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
                failModal: true
            })
        }

        if (nextProps.updateCustomer.verifyEmailFlag === true && nextProps.updateCustomer.successModalFlag === false) {
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
        /*if(nextProps.updateCustomer.addressValidationSuccessFlag === false) {

            this.openFailModal();

        }*/
        if (nextProps.updateCustomer.invalidPhone === true) {
            console.log("55555");

            // this.isValid = false;
        }
        if (nextProps.updateCustomer.errors.length > 0) {
            console.log("66666");
            this.setState({

                emailModal: false
            });
            if (nextProps.updateCustomer.errors[0].cust_email === 'INVALID EMAIL') {
                this.setState({

                    emailModal: false
                });

                this.openaddrEmailMOdal();
            }

            if (nextProps.updateCustomer.errors[0].dom_cust_zip === 'INVALID ZIP') {
                let errors;
                this.setState({ invlaid_cust_dom_zip: nextProps.updateCustomer.errors[0].dom_cust_zip });
            }
            if (nextProps.updateCustomer.errors[0].dom_cust_state === 'INVALID STATE') {
                let errors;
                this.setState({ invlaid_cust_dom_state: nextProps.updateCustomer.errors[0].dom_cust_state });
            }

            if (nextProps.updateCustomer.errors[0].cust_email === 'INVALID EMAIL') {
                this.openaddrEmailMOdal();

            }


            this.props.startSpinner(false);
            //console.log(nextProps.updateCustomer.errors[0].dom_cust_mobile);
            this.setState({ errors: nextProps.updateCustomer.errors });
        }


        if (nextProps.cityStateData !== undefined && nextProps.cityStateData !== null) {
            var cityData = [];
            var stateData = [];
            var obj = nextProps.cityStateData.CityState1;
            let fields = this.state.changedAddress;
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
          /*  if (obj) {
                if (fields['cust_dom_city'] == ""){
                    fields['cust_dom_city'] = obj[0];
                    fields['cust_dom_state'] = obj[1];
                    this.setState({ changedAddress: fields, dom_cust_state: obj[1] });
                    if (CityArrayLen > 1) {
                        this.setState({ cityModal: true });
                    }
                }
                else {
                    if ((fields['cust_dom_city'] && fields['cust_dom_city'].toString().toLowerCase() !== obj[0].toString().toLowerCase()) || (this.state.dom_cust_state !== "" && this.state.dom_cust_state !== obj[1])) {
                        this.setState({ zipOverride: true });
                        fields['cust_dom_city'] = obj[0];
                        fields['cust_dom_state'] = obj[1];
                        this.setState({ changedAddress: fields, dom_cust_state: obj[1] });
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
                        this.setState({ changedAddress: fields, dom_cust_state: obj[1] });
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
                            this.setState({ changedAddress: fields, dom_cust_state: obj[1] });
                        }
                    }
                }
            }
            this.props.clearZipToCitySateDataActionInvoker();
        }

        // if ((nextProps.updateCustomer.isProfileLoaded) && (nextProps.updateCustomer.customerProfile != '{}')) {
        //     // debugger
        //     console.log(Object.keys(this.state.currentAddress).length);
        //     if (Object.keys(this.state.currentAddress).length == 0) {
        //         //  debugger
        //         // this.setState({ profileData: nextProps.updateCustomer.customerProfile }, function () {
        //         //     //this.getAddress();
        //         // })
        //     }

        // }
    }

    failedToUpdate = () => {
        this.setState({ failedToUpdateModal: true});
    }

    closeFailedToUpdate = () => {
        this.setState({ failedToUpdateModal: false});
    }

    custNotFound = () => {
        this.props.startSpinner(false);
        this.setState({
            custNotFoundModal: true
        });
    }

    closeNotFoundModal = () => {
        this.setState({
            custNotFoundModal: false
        })
        this.props.history.push('/customer-details');
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
    /**Fetch the salutations list*/

    fetchSalutation() {
        if (this.props.salutationData) {
            this.setState({ 
                salutationDataDrop: this.props.salutationData.Salutations 
            });
        }
    }

    /**Fetch the state list from local json */
    fetchStates() {
        var statesData = require('../../resources/stubs/states.json');
        if (statesData) {
            this.setState({ statesDataDrop: statesData.states });
        }
    }

    /*** update customer data */
    /* Submit add customer data - Domestic */
    updateDomesticCustomerInvoker = (bypassFlag) => {
        
        //alert('update '+bypassFlag)
        //  console.log(this.state.changedAddress);
        const config = require('../../resources/stubs/config.json');
        const clientConfig = config.clientConfig;

        this.props.startSpinner(true);
        this.setState({ emailModal: false });
        this.setState({failModal1: false});
        let addCustDomData = {
            ...clientConfig,
            'ClientTypeID': '1000',
            "AddressSeque":this.props.customerDetails.selectedAddress.sequenceKey,
            'CFirstName': this.state.changedAddress['cust_dom_fname'],
            'CLastName': this.state.changedAddress['cust_dom_lname'],
            'Salutation': this.state.selectedSalutation,
            'Address_Ln1': this.state.changedAddress['cust_dom_address1'],
            'City': this.state.changedAddress['cust_dom_city'],
            'State_Abbr': this.state.changedAddress['cust_dom_state'],
            'Zip9': this.state.changedAddress['cust_dom_zip'],
            'CEmail': this.state.changedAddress['cust_dom_email'],
            'Country': 'US',
            'CMobile': this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, ""),
            'storeClientNo': this.props.customerDetails.clientNumber,
            'storeAssoc': this.props.login.userpin,
            'donotcall': this.state.cust_text_opt,
            'flagByPASS': bypassFlag,
            'EmailFlagByPass': bypassFlag,
            "ClienteleUpdateFlag":true,
            "CCssNo":this.props.customerDetails.cCSNumber,
            "COtherPhone":this.state.changedAddress['cust_dom_otherMobile'].replace(/[^A-Z0-9]+/ig, "")

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
      if (!fields['cust_dom_lname']) {
           
            errors['cust_dom_lname'] = 'Last Name cannot be empty';
            // this.isValid = false;
        }
      
       
       if (fields['cust_dom_fname'] && fields['cust_dom_lname'] && (!fields['cust_dom_address1'] && !fields['cust_dom_email'])) {
            this.openaddrEmailMOdal();
            this.isValid = false;
            console.log(this.isValid)
            return this.isValid;
        }
        else if (!fields["cust_dom_email"] && !fields['cust_dom_address1']) {
            errors['cust_dom_address1'] = 'Address Line 1 cannot be empty';
            //this.isValid = false;
        }  
        else if (!fields['cust_dom_country']) {
            errors['cust_dom_country'] = 'Country cannot be empty';
            //this.isValid = false;
        }


        else {
            //this.isValid = true;
        }
        if (fields['cust_dom_mobile'] !== '' && fields['cust_dom_mobile'] !== undefined) {
            var phoneValid = fields['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, "")
            if (phoneValid.length < 10 || phoneValid.length > 10) {
                console.log('cust_dom_mobile' + phoneValid.length);
                errors['cust_phone1'] = 'Please enter the correct phone number';
                // this.isValid = false;    
            }
        }

        if (fields["cust_dom_email"] !== '' && fields["cust_dom_email"] !== undefined && fields["cust_dom_email"] !== null) {
            let lastAtPos = fields["cust_dom_email"].lastIndexOf('@');
            let lastDotPos = fields["cust_dom_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["cust_dom_email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["cust_dom_email"].length - lastDotPos) > 2)) {
                errors["cust_email"] = "Email is not valid";
                // this.isValid = false;
            }
        }
        
        this.isValid = isObjectEmpty(errors);
        console.log('isValid' + this.isValid);
        this.setState({ errors: errors });
        return this.isValid;
    }
    handleChangeonError(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields: fields });
        let errors = this.state.errors;
        errors[field] = "";
        this.setState({ errors: errors });
    }

    /**functions  by manjunath, for validate customer popup */
    handleChange = (field, e) => {

        let fields = this.state.changedAddress;
        if (field === 'cust_dom_zip_blur') {
            fields['cust_dom_zip'] = e.target.value;
            if (fields['cust_dom_zip'].length > 4) {
                this.props.zipToCitySateActionInvoker(e.target.value);
            }
        }
        else {
            fields[field] = e.target.value;
        }
        this.setState({ changedAddress: fields });
    }

    togglePopup = () => {
        this.setState({
            emailModal: false
        });
        this.setState({
            addrEmailMOdal: false
        });
        this.setState({
            phoneModal: false
        });

        if (this.handleValidation()) {

            this.setState({ showPopup: !this.state.showPopup });
        }

    }
    getAddress() {
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
        console.log("SHIV PROFILEDATA",this.state.profileData)
        var profile = {
            cust_dom_salutation: this.state.profileData.cust_dom_salutation,
            cust_dom_fname: this.state.profileData.cust_dom_fname,
            cust_dom_lname: this.state.profileData.cust_dom_lname,
            cust_dom_address1: this.state.profileData.cust_dom_address1,
            cust_dom_address2: this.state.profileData.cust_dom_address2,
            cust_dom_mobile: this.state.profileData.cust_dom_mobile,
            cust_dom_email: this.state.profileData.cust_dom_email,
            cust_dom_otherMobile: this.state.profileData.cust_dom_otherMobile,
            cust_dom_city: this.state.profileData.cust_dom_city,
            cust_dom_state: this.state.profileData.cust_dom_state,
            cust_dom_country: this.state.profileData.cust_dom_country,
            cust_dom_zip: this.state.profileData.cust_dom_zip
        }


        this.setState({ currentAddress: profile });
        //this.setState({dom_cust_state:'NY'});
        this.setState({ dom_cust_state: this.state.profileData.cust_dom_state })
        //this.setState({selectedSalutation:'Mr'});
        this.setState({ selectedSalutation: this.state.profileData.cust_dom_salutation })
        //this.setState({dom_cust_country:'US'});
        this.setState({ dom_cust_country: this.state.profileData.cust_dom_country });


        var changedProfile = Object.create(profile);

        this.setState({ changedAddress: changedProfile });

    }
    resetAll = () => {
        this.setState({ changedAddress: Object.create(this.state.currentAddress) })
    }
    componentDidMount() {
        this.getAddress();

    }

    /**manjunath functions closed for validate customer popup */



    /* Salutation change - Domestic */
    handleSalutationChange = (event, index, value) => {
        console.log(value);
        this.setState({ selectedSalutation: value });
    }

    /* State change - Domestic */
    handleCustStateChange = (event, index, value) => {
        console.log(value);
        this.setState({ dom_cust_state: value });
    }

    /* Province change - International */
    handleProvinceChange = (event, index, value) => {
        console.log(value);
        this.setState({ selectedProvince: value });
    }

    /* Country change - International */
    handleCountryChange = (event, index, value) => {
        console.log(value);
        this.setState({ selectedCountry: value });
    }



    clearAllFields() {
        this.setState({
            fields: {
                cust_dom_fname: "",
                cust_dom_lname: "",
                cust_dom_address1: "",
                cust_dom_address2: "",
                cust_dom_city: "",
                cust_dom_email: "",
                cust_dom_mobile: "",
                cust_dom_otherMobile: "",

                cust_dom_zip: ""
            },
            selectedSalutation: "",
            cust_dom_state: ""
        });
    }

    openModals = () => {
        if (this.handleValidation()) {
            if ((this.state.changedAddress["cust_dom_mobile"]) && (this.state.changedAddress["cust_dom_mobile"] !== this.state.currentAddress["cust_dom_mobile"])) {

                this.setState({
                    showPopup: false, phoneModal: true
                });

            } else if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress['cust_dom_email'])) {
                this.setState({
                    showPopup: false, emailModal: true
                });
            } else {
                this.setState({
                    showPopup: false, emailModal: false
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

        if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress['cust_dom_email'])) {
            this.setState({
                emailModal: true
            });
        }

        else {
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
            succesModal: false,
            failModal1: false
        })
        this.props.startSpinner(false);
        this.setState({ succesModal: false });
        var UpdatedCustomerData = store.getState().customerDetails;
        UpdatedCustomerData.selectedAddress.Addr1 = this.state.changedAddress['cust_dom_address1'];
        UpdatedCustomerData.selectedAddress.Addr2 = this.state.changedAddress['cust_dom_address2'];
        UpdatedCustomerData.selectedAddress.City = this.state.changedAddress['cust_dom_city'];
        UpdatedCustomerData.selectedAddress.State = this.state.changedAddress['cust_dom_state'];
        UpdatedCustomerData.selectedAddress.Zip = this.state.changedAddress['cust_dom_zip'];
        UpdatedCustomerData.lastName = this.state.changedAddress['cust_dom_lname'];
        UpdatedCustomerData.firstName = this.state.changedAddress['cust_dom_fname'];
        UpdatedCustomerData.emailAddress = this.state.changedAddress['cust_dom_email'];
        if (UpdatedCustomerData.selectedAddress.PhoneNumbers.length === 1) {
            UpdatedCustomerData.selectedAddress.PhoneNumbers[0].phoneNumber = this.state.changedAddress['cust_dom_mobile'];
        }
        if (UpdatedCustomerData.selectedAddress.PhoneNumbers.length > 1) {
            UpdatedCustomerData.selectedAddress.PhoneNumbers[1].phoneNumber = this.state.changedAddress['cust_dom_otherMobile'];
        }
        console.log('profile-prev-data',JSON.stringify(store.getState().customerDetails));
        this.props.navigateToDomesticCustomerInvoker(UpdatedCustomerData);
        this.props.history.push('/customer-details');
    }

    goBacktoCustDetails=()=>{
        this.props.navigateToDomesticCustomerInvoker(this.state.profileData.cust_cssId);
        this.props.history.push('/customer-details');
    }

    openFailModal = () => {

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
            failModal: true
        });
    }

    closeFailModal = () => {
        this.setState({
            textoptModal: false
        });
        this.setState({
            failModal1: false
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
        this.setState({
            addrEmailMOdal: false
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
        this.setState({
            cust_text_opt: 'Y'
        });
        if (this.state.changedAddress['cust_dom_email'] && (this.state.changedAddress['cust_dom_email'] !== this.state.currentAddress['cust_dom_email'])) {
            this.openEmailModal();
        }
        else {
            this.updateDomesticCustomerInvoker(false);
        }
    }



    bypassAddressValidation = () => {
        //alert('bypass')
        this.closeFailModal();
        this.cust_addr_validation_bypass = false;
        this.updateDomesticCustomerInvoker(true);
        return;
    }

    bypassEmailValidation = () => {
        //alert('bypass')
        this.closeFailModal();
        this.failModal1 = false,
        this.updateDomesticCustomerInvoker(true);
        return;
    }


    render() {
        return (<UpdateCustomerDomView
            history={this.props.history}
            selectedSalutation={this.state.selectedSalutation}
            selectedSalutationInt={this.state.selectedSalutationInt}
            handleSalutationChange={this.handleSalutationChange}
            salutationDataDrop={this.state.salutationDataDrop}
            handleChange={this.handleChange}
            handleChangeInt={this.handleChangeInt}
            fields={this.state.fields}
            errors={this.state.errors}
            dom_cust_state={this.state.dom_cust_state}
            handleCustStateChange={this.handleCustStateChange}
            openModals={this.openModals}
            phoneModal={this.state.phoneModal}
            emailModal={this.state.emailModal}
            failModal={this.state.failModal}
            failModal1={this.state.failModal1}
            goBacktoCustDetails={this.goBacktoCustDetails}
            resetAll={this.resetAll}
            closePhoneModal={this.closePhoneModal}
            openTextOptModal={this.openTextOptModal}
            textoptModal={this.state.textoptModal}
            openEmailModal={this.openEmailModal}
            setCustTextOpt={this.setCustTextOpt}
            closeEmailModal={this.closeEmailModal}
            updateDomesticCustomerInvoker={this.updateDomesticCustomerInvoker}
            closeSuccessModal={this.closeSuccessModal}
            closeFailModal={this.closeFailModal}
            bypassAddressValidation={this.bypassAddressValidation}
            bypassEmailValidation={this.bypassEmailValidation}
            closeaddrEmailMOdal={this.closeaddrEmailMOdal}
            addrEmailMOdal={this.state.addrEmailMOdal}
            togglePopup={this.togglePopup}
            showPopup={this.state.showPopup}
            isValid={this.state.isValid}
            cust_text_opt={this.state.cust_text_opt}
            currentAddress={this.state.currentAddress}
            changedAddress={this.state.changedAddress}
            invlaid_cust_dom_state={this.state.invlaid_cust_dom_state}
            invlaid_cust_dom_zip={this.state.invlaid_cust_dom_zip}
            dom_cust_country={this.state.dom_cust_country}
            sele={this.state.sele}
            statesDataDrop={this.state.statesDataDrop}
            succesModal={this.state.succesModal}
            zipOverride={this.state.zipOverride}
            cityModal={this.state.cityModal}
            cityModalClose={this.cityModalClose}
            populateCity={this.populateCity}
            citystateList={this.state.citystateList}
            stateList={this.state.stateList}
            closeZipOverideModal={this.closeZipOverideModal}
            custNotFoundModal={this.state.custNotFoundModal}
            closeNotFoundModal={this.closeNotFoundModal}
            failedToUpdateModal={this.state.failedToUpdateModal}
            closeFailedToUpdate={this.state.closeFailedToUpdate}
            failedToUpdate={this.failedToUpdate}
        />);
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
function mapStateToProps({ updateCustomer, customerDetails, home, login}) {
    return { updateCustomer, customerDetails, salutationData: home.salutationData, login, cityStateData: home.cityStateData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateCustomerActionInvoker: updateCustomerAction,
        startSpinner: startSpinner,
        navigateToDomesticCustomerInvoker: navigateToDomesticCustomer,
        zipToCitySateActionInvoker: zipToCitySateAction,
        clearZipToCitySateDataActionInvoker: clearZipToCitySateDataAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomer);
