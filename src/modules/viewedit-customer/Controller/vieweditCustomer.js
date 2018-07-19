import ReactTooltip from 'react-tooltip'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {viewCustomerAction,getCountryList} from './vieweditCustomerAction';
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

/* View Components import */
import ViewEditCustomerView from '../View/vieweditCustomerView'
import { goToSalesPage } from '../../sale/SaleAction.js'

/**/
import profileselected from '../../../resources/images/Profile_Selected.svg';
import profileunselected from '../../../resources/images/Profile.svg';
import remainderselected from '../../../resources/images/Reminder.svg';

class ViewEditCustomer extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            statesList: [],
            profileselect : profileselected,
            reminderselect : remainderselected,
            showPopup: false,
            fields : {},
            currentAddress1: {},
            currentAddressForVerify: {},
            phoneModal: false,
            textOptModal: false,
            cust_dom_state:'',
            dom_cust_country:'US',
            emailModal: false,
            succesModal: false,
            failModal: false,
            selectedCountry : '',
            isClienteled:false,
            cust_text_opt: 'N',
            countryList:[],
            userType : '',
            selectedSalutation : "",
            errors: {},
            salutationDataDrop:[],
            changedAddress: {
                cust_cssId: '',
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
                cust_dom_postal : '',
                cust_dom_province:'',
                cust_dom_zip    : ''
            },

            profileData: { 
                cust_cssId: '',
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
                cust_dom_postal : '',
                cust_dom_province:'',
                cust_dom_zip    : ''
            },

            changedAddressForVerify: {},
            currentLvl: '0',
            pointsToNextLvl: '0'
        }
        this.profileData = {};
        
        this.isValid=true;
    }
    openSuccesModal = () => {
        this.setState({
            emailModal: false,phoneModal: false,succesModal: true
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
        this.setState({succesModal:false});
        this.props.history.push('/sale', { isClienteled: true });
        this.setState({ isClienteled: true });

    }
    componentWillReceiveProps = nextProps => {
        console.log('Update Customer: componentWillReceiveProps', nextProps);
        if(nextProps.viewEditCustomer.successModalFlag === true  && nextProps.viewEditCustomer.clienteleUpdateFlag === true) {
            this.setState({
                emailModal: false,phoneModal: false,textoptModal : false,succesModal: true
            });
        }
        else if (nextProps.viewEditCustomer.successModalFlag === true  && nextProps.viewEditCustomer.clienteleUpdateFlag === false) {
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
        var profile = nextProps.viewEditCustomer.profileData;
        if (profile && JSON.stringify(profile) != "{}" && nextProps.viewEditCustomer.isProfileData == true) {
            var profileData = {
                cust_cssId: profile.css_id,
                //cust_dom_salutation : (profile.names && profile.names.length > 0 && profile.names[0].salutation !== '') ? profile.names[0].salutation : '',
                cust_dom_salutation : (profile.names && profile.names.length > 0 && profile.names[0].prefix !== undefined) ? this.toCamelCase(profile.names[0].prefix) : '',
                cust_dom_fname : (profile.names && profile.names.length > 0) ? profile.names[0].firstName : '',
                cust_dom_lname : (profile.names && profile.names.length > 0) ? profile.names[0].lastName : '',
                cust_dom_address1 : (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 0) ? profile.physicalAddresses[0].addressLines[0] : '',//'9303 Spring Hollow Dr',
                cust_dom_address2 : (profile.physicalAddresses && profile.physicalAddresses.length > 0 && profile.physicalAddresses[0].addressLines.length > 1) ? profile.physicalAddresses[0].addressLines[1] : '',
                cust_dom_mobile : (profile.phoneNumbers && profile.phoneNumbers.length > 0) ? profile.phoneNumbers[0].id : '',
                cust_dom_email : (profile.emailAddresses && profile.emailAddresses.length > 0) ? profile.emailAddresses[0].id : '',
                cust_dom_otherMobile : (profile.phoneNumbers && profile.phoneNumbers.length > 1) ? profile.phoneNumbers[1].id : '',
                cust_dom_city : (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].cityName : '', //"New york"
                cust_dom_state : (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '', //'NY'
                cust_dom_country : (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].countryCode : '', //'CANADA',
                cust_dom_postal : (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '', //'78750',
                cust_dom_province: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].state : '', //'ON',
                cust_dom_zip: (profile.physicalAddresses && profile.physicalAddresses.length > 0) ? profile.physicalAddresses[0].postalCode : '', //'78750',
            }            
            this.setState({ profileData: profileData }, () => {
                this.getAddress();
            });
        }
        if (nextProps.viewEditCustomer.isCountryList == true) {
                    this.setState({
                        countryList: nextProps.viewEditCustomer.countryList
                    });
                }
        }
        if (nextProps.incircleData  !== null && nextProps.incircleData !== undefined) {
            var circleData = nextProps.incircleData.data;
            this.setState({ currentLvl: circleData.lyBenefitLevelCode, pointsToNextLvl: circleData.pointsAwayToNextPointCard });
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
        return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
            return match.charAt(match.length-1).toUpperCase();
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
        if(this.props.viewEditCustomer.profileData != {} && this.props.viewEditCustomer.profileData != undefined && this.props.viewEditCustomer.profileData != null) {
            var profileDataLocal = Object.assign({}, this.state.profileData)
            profileDataLocal.cust_dom_country = this.props.viewEditCustomer.profileData.country;
            this.profileData = profileDataLocal;          
        }     
        //this.getAddress();
        // this.props.startSpinner(false);
    }



    fetchSalutation(){
        var salutationData = require('../../../resources/stubs/salutationList.json');
        if(salutationData){
            this.setState({ salutationDataDrop: salutationData.Salutation});
        }
    }

    fetchStates(){
        const statesList = require('../../../resources/stubs/states.json');
        if(statesList){
            this.setState({ statesList: statesList.states});
        }
    }

    getAddress(){
        var profile = Object.assign({},this.state.profileData);
    var changedProfile = Object.create(profile);
    // var changedProfileForVerify = Object.create(profileForVerify);
    this.setState({currentAddress1:profile,changedAddress:changedProfile,
     });
         if(profile.cust_dom_country == null || profile.cust_dom_country == undefined || profile.cust_dom_country == "" || profile.cust_dom_country=='US')
            {
                console.log("we are dealing with a domestic customer")
                this.setState({
                    userType:'dom'
                })

            }
            else{
                console.log("we are dealing with an international customer")
                this.setState({
                    userType:'int'
                })

                this.props.getCountriesInvoker();
            }
    }

    openVerifyPopup=()=> {
        this.setState({emailModal: false,addrEmailMOdal: false,phoneModal: false});
        if (this.handleValidation()) {
            if(this.getClienteleUpdateFlag()) {
                this.setState({showPopup: !this.state.showPopup});
            }
            else {
                this.viewDomesticCustomerInvoker();
            }
        }
    }

    openaddrEmailMOdal = () => {
        this.setState({addrEmailMOdal: true});
    }

    closeaddrEmailMOdal = () => {
        this.setState({addrEmailMOdal: false});
    }

    openTextOptModal = () => {
        this.setState({phoneModal: false,textoptModal: true});
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

    openModals = () => {
        if(this.handleValidation()){
                this.setState({showPopup:false})
                console.log(this.state.changedAddress['cust_dom_email']!==this.state.currentAddress1['cust_dom_email']);
                if (this.state.changedAddress['cust_dom_mobile'] && (this.state.changedAddress['cust_dom_mobile']!==this.state.currentAddress1['cust_dom_mobile'])) {
                    this.setState({
                        phoneModal: true
                    });
        
                } else if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress1['cust_dom_email'])) {
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
        this.setState({errors:errors,fields : fields ,changedAddress:changedAddress});
    }

    switchtoRemainder = () =>  {
        document.getElementsByClassName('viewedit-customer-label')[0].classList.remove('selected-tab-label')
        document.getElementsByClassName('viewedit-customerint-label')[0].classList.add('selected-tab-label')
        this.setState({ 
        profileselect : profileunselected,
        });
    }
    switchtoProfile = () =>  {
        document.getElementsByClassName('viewedit-customer-label')[0].classList.add('selected-tab-label')
        document.getElementsByClassName('viewedit-customerint-label')[0].classList.remove('selected-tab-label')
        this.setState({ 
        profileselect : profileselected
        });
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

    closePhoneModal = () => {
        this.setState({
            phoneModal: false
        });
    }
    openEmailModal = () => {
        this.setState({textoptModal: false,emailModal: true});
       if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress1['cust_dom_email'])) {
        this.setState({emailModal: true});
        }
    
        else{
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
        if (this.state.changedAddress['cust_dom_email']  && (this.state.changedAddress['cust_dom_email']!==this.state.currentAddress1['cust_dom_email'])) {
            this.openEmailModal();
        }
        else{
            this.viewDomesticCustomerInvoker();
        }
    }

    cancelViewEdit = () =>{       

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
        return ClienteleUpdateFlag;
    }

/*** update customer data */
    /* Submit add customer data - Domestic */
    viewDomesticCustomerInvoker = () => {
        this.setState({ emailModal: false });
        //alert(ClienteleUpdateFlag);
        this.props.startSpinner(true);
        let addCustDomData = {
            "ClientID": "0010:0169:06062018:013639",
            "ClientTypeID": "1000",
            "SourceApp": "POS",
            "Country": "INDIA",
            "storeAssoc": "110010",
            "SourceLoc": "0010",
            "CFirstName": this.state.changedAddress['cust_dom_fname'],
            "CLastName": this.state.changedAddress['cust_dom_lname'],
            "CEmail": this.state.changedAddress['cust_dom_email'],
            "COtherPhone": this.state.changedAddress['cust_dom_mobile'] ? this.state.changedAddress['cust_dom_mobile'].replace(/[^A-Z0-9]+/ig, ""): "",
            "Address_Ln1": this.state.changedAddress['cust_dom_address1'],
            "City": this.state.changedAddress['cust_dom_city'],
            "Zip5": this.state.changedAddress['cust_dom_zip'],
            "CCssNo": this.state.changedAddress['cust_cssId'],
            "StoreClientNo": "",
            "flagByPASS": true,
            "ClienteleUpdateFlag": this.getClienteleUpdateFlag()
        }

        this.props.viewCustomerActionInvoker(addCustDomData);

    }
    render() {

        return (
            <ViewEditCustomerView 
                statesList = {this.state.statesList}
                history = {this.props.history}
                switchtoProfile = {this.switchtoProfile}
                switchtoRemainder = {this.switchtoRemainder}
                openVerifyPopup = {this.openVerifyPopup}
                closePhoneModal = {this.closePhoneModal}
                openTextOptModal = {this.openTextOptModal}
                openEmailModal = {this.openEmailModal}
                setCustTextOpt = {this.setCustTextOpt}
                closeEmailModal = {this.closeEmailModal}
                viewDomesticCustomerInvoker = {this.viewDomesticCustomerInvoker}
                closeSuccessModal = {this.closeSuccessModal}
                closeFailModal = {this.closeFailModal}
                bypassAddressValidation = {this.bypassAddressValidation}
                closeaddrEmailMOdal = {this.closeaddrEmailMOdal}
                handleSalutationChange = {this.handleSalutationChange}
                handleCountryChange = {this.handleCountryChange}
                handleStateChange = {this.handleStateChange}
                salutationDataDrop = {this.state.salutationDataDrop}
                showPopup = {this.state.showPopup}
                isValid = {this.state.isValid}
                cust_dom_state = {this.state.cust_dom_state}
                selectedSalutation = {this.state.selectedSalutation}
                cust_text_opt = {this.state.cust_text_opt}
                currentAddress={this.state.currentAddress1} 
                changedAddress={this.state.changedAddress}
                profileselect = {this.profileselect}
                errors = {this.state.errors}
                reminderselect = {this.state.reminderselect}
                userType = {this.state.userType}
                countryList = {this.state.countryList}
                phoneModal = {this.state.phoneModal}
                textoptModal = {this.state.textoptModal}
                emailModal = {this.state.emailModal}
                succesModal = {this.state.succesModal}
                failModal = {this.state.failModal}
                addrEmailMOdal = {this.state.addrEmailMOdal}
                handleChange = {this.handleChange}
                openModals={this.openModals}
                toCamelCase={this.toCamelCase}
                navigateToCustomerSearch={this.navigateToCustomerSearch}
                currentLvl={this.state.currentLvl}
                pointsToNextLvl={this.state.pointsToNextLvl}
                cancelViewEdit = {this.cancelViewEdit}
            />
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

function mapStateToProps({ viewEditCustomer, customerSearch }) {
    return { viewEditCustomer, incircleData: customerSearch.incircleData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getCountriesInvoker:getCountryList,viewCustomerActionInvoker: viewCustomerAction, goToSalesPage: goToSalesPage, startSpinner: startSpinner }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEditCustomer);