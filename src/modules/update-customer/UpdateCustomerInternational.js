/* Importing the required libraries and plugins*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {store} from '../../store/store';

/* Importing required Actions */
import { navigateToDomesticCustomer } from '../customer-details/CustomerDetailsActions.js';
import { getCountryList,fetchSalutation } from './UpdateCustomerInternationalActions';
import { updateInternationalApi } from './UpdateCustomerInternationalActions';
import { parsePhoneNumber,validZip } from '../common/helpers/helpers';
import { startSpinner } from '../common/loading/spinnerAction';

/* Importing View Components */
import UpdateCustomerInternationalView from '../update-customer/View/UpdateCustomerIntView';

class UpdateCustomerInternational extends Component {
    constructor(props) {
        super(props);
        this.states = [
            'TX', 'AR'
        ]

        this.states = ['TX', 'DS']

        //this.defaultOption = this.options[0];
        this.defaultState = this.states[0];

        /**by manjunath, for validate customer popup */
        this.state = {
            showPopup: false,
            salutation: '',
            currentAddress: {},
            failModal1: false,
            failedToUpdateModal: false,
            changedAddress: {
                update_int_salutation: '',
                update_int_fname: '',
                update_int_lname: '',
                update_int_address1: '',
                update_int_address2: '',
                update_int_mobile: '',
                update_int_email: '',
                update_int_otherMobile: '',
                update_int_city: '',
                update_int_province: '',
                update_int_country: '',
                update_int_pincode: ''
            },
            UpdatedInteranationalCustomerData:{

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
            phoneModal: false,
            textOptModal: false,
            emailModal: false,
            succesModal: false,
            failModal: false,
            selectedCountry: '',
            selectedProvince: '',        
            fields: {},
            errors: {},
            countryList: [],
            salutationDataDrop:[]
            
        }
        this.isValid=true
    }
    componentWillMount() {
        console.log("UpdateCustomer International Will mount");
        this.props.updateCustomerintInvoker();
        this.fetchSalutation();
        this.props.startSpinner(false);
    }

    componentDidMount() {
        console.log("UpdateCustomer International Did mount");
        this.getAddress();
    }

    /**Fetch the salutations list  */

    fetchSalutation(){
        if(this.props.salutationData){
            this.setState({ 
                salutationDataDrop: this.props.salutationData.Salutations 
            });
        }
    }
     /* This method is invoked if any of the props changes, via reducer */

    componentWillReceiveProps(nextProps) {
        console.log('international receive props ',nextProps)
        this.setState({
            countryList: nextProps.updateCustomerInternational.countryList
        });
        /*if(nextProps.updateCustomerInternational.successModalFlag === true) {
            this.openSuccesModal();
        } */

        if(nextProps.updateCustomerInternational.successModalFlag === true) {
            this.props.startSpinner(false);
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
                failModal1: false
            })
            this.setState({
                addrEmailMOdal: false
            });
            this.setState({
                succesModal: true
            })
        }

        if (nextProps.updateCustomerInternational.verifyEmailFlag === true && nextProps.updateCustomerInternational.successModalFlag === false) {
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

        if (nextProps.updateCustomerInternational.notFoundFlag === true && nextProps.updateCustomerInternational.successModalFlag === false) {
            this.custNotFound();
        }

        if (nextProps.updateCustomerInternational.updateFailModalFlag === true && nextProps.updateCustomerInternational.successModalFlag === false) {
            //this.setState({ failedToUpdateModal: true});
        }

        if(nextProps.updateCustomerInternational.errors.length > 0 && nextProps.updateCustomerInternational.successModalFlag === false) {
            this.setState({
        
                emailModal: false
            });
            if(nextProps.updateCustomerInternational.errors[0].cust_email==='INVALID EMAIL')
            {   
                this.setState({
        
                    emailModal: false
                });

                this.openaddrEmailMOdal();
            }

 
            
            
            //this.props.startSpinner(false);
            //console.log(nextProps.updateCustomer.errors[0].dom_cust_mobile);
            this.setState({errors : nextProps.updateCustomerInternational.errors});
        }


        // if((nextProps.updateCustomerInternational.isProfileLoaded) && (nextProps.updateCustomerInternational.customerProfile != '{}'))
        //     {
              
        //         console.log(Object.keys(this.state.currentAddress).length);
        //         if(Object.keys(this.state.currentAddress).length == 0)
        //         {
                  
        //             this.setState({profileData :  nextProps.updateCustomerInternational.customerProfile}, function(){
        //                 this.getAddress();
        //             })
        //         }
                
        //     }
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

    openSuccesModal = () => {
        this.setState({
            emailModal: false
        });
        this.setState({
            succesModal: true
        })
        this.props.startSpinner(false);
    }
    openaddrEmailMOdal = () => {
        this.setState({
            addrEmailMOdal: true
        });
    }

    closeaddrEmailMOdal = () => {
            this.setState({
                addrEmailMOdal: false
            });
        }

        goBacktoCustDetails=()=>{
            this.props.navigateToDomesticCustomerInvoker(this.state.profileData.cust_cssId);
            this.props.history.push('/customer-details');
        }

    handleValidationInternational() {
        let fields = this.state.changedAddress;
        let errors = {};
    
        if (!fields['update_int_fname']) {
            errors['update_int_fname'] = 'First Name cannot be empty';
             
        } 
        if (!fields['update_int_lname']) {
            errors['update_int_lname'] = 'Last Name cannot be empty';
        } 
        /*else if(fields['update_int_fname'] && fields['update_int_fname'] && (!fields['update_int_address1'] && !fields['update_int_email']))
        {   
            console.log('HELLO!')
           this.isValid = false;
           
           this.openaddrEmailMOdal();
           console.log(this.isValid)
           return this.isValid;
        }*/
        if (!fields['update_int_address1']) {
            errors['update_int_address1'] = 'Address Line 1 cannot be empty';
            this.isValid = false;
        } 
         if (!fields['update_int_country']) {
            errors['update_int_country'] = 'Country cannot be empty';
            this.isValid = false;
        } 
         if (!fields['update_int_city']) {
            errors['update_int_city'] = 'City cannot be empty';
            this.isValid = false;
        } 
        else{
            console.log("setting to true")
            this.isValid = true;
        }
        if (fields['update_int_mobile'] !== '' && fields['update_int_mobile'] !== undefined) {
            if (fields['update_int_mobile'].length < 10 || fields['update_int_mobile'].length > 16) {
                console.log('update_int_mobile' + fields['update_int_mobile'].length);
                errors['update_int_mobile'] = 'Please enter the correct phone number';
                this.isValid = false;    
            }
        }
        if(fields['update_int_pincode'])
        {
            if(!validZip(fields['update_int_pincode']))
            {
                errors['update_int_pincode'] = 'Invalid postal code';
                this.isValid = false;    
            }
        }

        if ( fields["update_int_email"] !== '' &&  fields["update_int_email"] !== undefined &&  fields["update_int_email"] !== null) {
            let lastAtPos = fields["update_int_email"].lastIndexOf('@');
            let lastDotPos = fields["update_int_email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["update_int_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["update_int_email"].length - lastDotPos) > 2)) {
                errors["update_int_email"] = "Email is not valid";
                this.isValid = false;
            }
        }
        
        this.isValid=isObjectEmpty(errors);
        this.setState({errors: errors});
        this.setState({isValid:this.isValid});
        return this.isValid;
    }
    handleChangeonInternationalError(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields: fields
        });
        let errors = this.state.errors;
        errors[field] = "";
        this.setState({
            errors: errors
        });
    }
    /* Country change - International */
    handleCountryChange = (value, e) => {
        console.log(e.target.textContent);
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        console.log(fields)
        this.setState({
            changedAddress: fields
        },function(){
            console.log(this.state.changedAddress)
        });

        // let errorsInt = this.state.errorsInt;
        // errorsInt['selectedCountry'] = ''; 

        // this.setState({ selectedCountry : value, errorsInt:errorsInt });
    }

    bypassEmailValidation = () => {
        this.setState({ failModal1: false }, () => {
            this.updateInternationalCustomerInvoker(true);
        });
    }

    closeFailModal = () => {
        this.setState({
            failModal1: false
        });
    }

    resetAll = () =>{
        this.setState({changedAddress:Object.create(this.state.currentAddress)})
        this.setState({errors: {}})
    }
    /**functions  by manjunath, for validate customer popup */
    handleChange(name, event) {

        var changedAddress = this.state.changedAddress;
        changedAddress[name] = event.target.value;
        this.setState({
            changedAddress
        });
    }
/* Salutation change - Domestic */
    salutationChange = (value, e) => {
        console.log(e.target.textContent);
        let fields = this.state.changedAddress;
        fields[value] = e.target.textContent;
        console.log(fields)
        this.setState({
            changedAddress: fields
        });
    }

    /**functions for validate customer popup */

    togglePopup=()=> {
        this.setState({
            emailModal: false
        });
        this.setState({
            addrEmailMOdal: false
        });
        this.setState({
            phoneModal: false
        });
        if (this.handleValidationInternational()) {
            console.log("ISVALID:", this.isValid)
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }

    openModals = () => {
        if (this.handleValidationInternational()) {
            this.setState({showPopup:false})

            if (this.state.changedAddress['update_int_mobile'] && (this.state.changedAddress['update_int_mobile']!=this.state.currentAddress['update_int_mobile'])) {
                this.setState({
                    phoneModal: true
                });

            } else if (this.state.changedAddress['update_int_email']  && (this.state.changedAddress['update_int_email']!=this.state.currentAddress['update_int_email'])) {
                this.setState({
                    emailModal: true
                });
            } else {
                this.setState({
                    emailModal: false
                });
                this.updateInternationalCustomerInvoker(false); 
                this.props.startSpinner(true);
            }
        }
    }

    openTextOptModal = () => {
        this.setState({
            phoneModal: false
        });

        this.setState({
            textoptModal: true
        });
    }

    setCustTextOpt = () => {
        this.setState({
            cust_text_opt: 'Y'
        });
        if (this.state.changedAddress['update_int_email']  && (this.state.changedAddress['update_int_email']!=this.state.currentAddress['update_int_email'])) {
                this.openEmailModal();
            }
            else{
                this.updateInternationalCustomerInvoker(false);
            }
    }

    closePhoneModal = () => {
        this.setState({
            phoneModal: false
        });
    }

    openEmailModal = () => {
        this.setState({
            textoptModal: false
        });
        if (this.state.changedAddress['update_int_email'] && (this.state.changedAddress['update_int_email']!=this.state.currentAddress['update_int_email'])) {
            this.setState({
                emailModal: true
            });
        } else {
            this.updateInternationalCustomerInvoker();
        }
    }

    closeEmailModal = () => {
        this.setState({
            emailModal: false
        });
    }

    closeSuccessModal = () => {
        this.setState({
            succesModal: false,
            failModal1: false
        })
        this.setState({succesModal:false});
        var UpdatedInteranationalCustomerData = store.getState().customerDetails;
        console.log('UpdatedInteranationalCustomerData',UpdatedInteranationalCustomerData)
        UpdatedInteranationalCustomerData.selectedAddress.Addr1 = this.state.changedAddress['update_int_address1'];
        UpdatedInteranationalCustomerData.selectedAddress.Addr2 = this.state.changedAddress['update_int_address2'];
        UpdatedInteranationalCustomerData.selectedAddress.City = this.state.changedAddress['update_int_city'];
        UpdatedInteranationalCustomerData.selectedAddress.Country = this.state.changedAddress['update_int_country'];
        UpdatedInteranationalCustomerData.selectedAddress.Zip = this.state.changedAddress['update_int_pincode'];
        UpdatedInteranationalCustomerData.selectedAddress.province = this.state.changedAddress['update_int_province'];
        UpdatedInteranationalCustomerData.lastName = this.state.changedAddress['update_int_lname'];
        UpdatedInteranationalCustomerData.firstName = this.state.changedAddress['update_int_fname'];
        UpdatedInteranationalCustomerData.emailAddress = this.state.changedAddress['update_int_email'];
        if (UpdatedInteranationalCustomerData.selectedAddress.PhoneNumbers.length === 1) {
            UpdatedInteranationalCustomerData.selectedAddress.PhoneNumbers[0].phoneNumber = this.state.changedAddress['update_int_mobile'];
        }
        if (UpdatedInteranationalCustomerData.selectedAddress.PhoneNumbers.length > 1) {
            UpdatedInteranationalCustomerData.selectedAddress.PhoneNumbers[1].phoneNumber = this.state.changedAddress['update_int_otherMobile'];
        }
        console.log('profile-prev-data',JSON.stringify(store.getState().customerDetails));
        this.props.updateCustomerIntServiceInvoker(UpdatedInteranationalCustomerData);
        this.props.history.push('/customer-details');
    }

    getAddress() {
        // var profile = {
        //     update_int_salutation: 'Mr',
        //     update_int_fname: 'Janci',
        //     update_int_lname: 'Smith',
        //     update_int_address1: '4200 Northumberland Street',
        //     update_int_address2: 'Apt. 6',
        //     update_int_mobile: '(978) 629-8858',
        //     update_int_email: 'areally@anyemail.com',
        //     update_int_otherMobile: '(978) 629-8858',
        //     update_int_city: 'Dallas',
        //     update_int_province: 'TX',
        //     update_int_country: 'CANADA',
        //     update_int_pincode: '75222'
        // }
        console.log("SHIV PROFILEDATA",this.state.profileData)
        var profile = {
            update_int_salutation: this.state.profileData.cust_dom_salutation,
            update_int_fname: this.state.profileData.cust_dom_fname,
            update_int_lname: this.state.profileData.cust_dom_lname,
            update_int_address1: this.state.profileData.cust_dom_address1,
            update_int_address2: this.state.profileData.cust_dom_address2,
            update_int_mobile: this.state.profileData.cust_dom_mobile,
            update_int_email: this.state.profileData.cust_dom_email,
            update_int_otherMobile: this.state.profileData.cust_dom_otherMobile,
            update_int_city: this.state.profileData.cust_dom_city,
            update_int_province: this.state.profileData.cust_dom_province,
            update_int_country: this.state.profileData.cust_dom_country,
            update_int_pincode: this.state.profileData.cust_dom_zip
        }
        console.log('int cust data'+profile);

        this.setState({currentAddress: profile});
        
        this.setState({selectedSalutation: this.state.profileData.cust_dom_salutation});
        

        var changedProfile = Object.create(profile);

        this.setState({
            changedAddress: changedProfile
        });

    }

    /* Submit add customer data - International */

    updateInternationalCustomerInvoker = (bypassFlag) => {
        const config = require('../../resources/stubs/config.json');
        const clientConfig = config.clientConfig;

        this.props.startSpinner(true);
        this.setState({emailModal:false, textoptModal:false});
        this.setState({failModal1: false});
        let addCustDomData = {
           ...clientConfig,
           'ClientTypeID': '1000',
           "AddressSeque":this.props.customerDetails.selectedAddress.sequenceKey,
           'CFirstName': this.state.changedAddress['update_int_fname'],
           'CLastName': this.state.changedAddress['update_int_lname'],
           'Salutation': this.state.selectedSalutation,
           'Address_Ln1': this.state.changedAddress['update_int_address1'],
           'Address_Ln2': this.state.changedAddress['update_int_address2'],
           'City': this.state.changedAddress['update_int_city'],
           'Zip5': this.state.changedAddress['update_int_pincode'],
           'CEmail': this.state.changedAddress['update_int_email'],
           'Country': this.state.changedAddress['update_int_country'],
           'storeClientNo': this.props.customerDetails.clientNumber,
           'storeAssoc': this.props.login.userpin,
           'donotcall': this.state.cust_text_opt,
           'flagByPASS': true,
           'EmailFlagByPass': bypassFlag,
           "ClienteleUpdateFlag":true,
            "CCssNo":this.props.customerDetails.cCSNumber,
           'CMobile': this.state.changedAddress['update_int_mobile'].replace(/[^A-Z0-9]+/ig, ""),
            "COtherPhone":this.state.changedAddress['update_int_otherMobile'].replace(/[^A-Z0-9]+/ig, "")

       }
       console.log('calling invoker',addCustDomData)
       this.props.updateCustomerIntServiceInvoker(addCustDomData);
   }
    handleChangeonInternational = (field, e) => {
        let fields = this.state.changedAddress;
        fields[field] = e.target.value;
        this.setState({
            changedAddress: fields
        });
        let errors = this.state.errors;
        errors[field] = "";
        this.setState({
            errors: errors
        });
    }

    render() {
        return (
            <UpdateCustomerInternationalView
            history = {this.props.history}
            salutationChange = {this.salutationChange}
            countryList = {this.state.countryList}
            selectedSalutation = {this.state.selectedSalutation}
            selectedSalutationInt = {this.props.selectedSalutationInt}
            salutationDataDrop = {this.state.salutationDataDrop}
            handleChangeonInternational = {this.handleChangeonInternational}
            handleCountryChange = {this.handleCountryChange}
            fields = {this.state.fields}
            errors = {this.state.errors}               
            openModals = {this.openModals}
            phoneModal = {this.state.phoneModal}
            textoptModal = {this.state.textoptModal}                        
            emailModal = {this.state.emailModal}
            succesModal = {this.state.succesModal}
            failModal = {this.state.failModal}
            failModal1={this.state.failModal1}
            goBacktoCustDetails = {this.goBacktoCustDetails}
            resetAll = {this.resetAll}
            closePhoneModal = {this.closePhoneModal}
            openTextOptModal = {this.openTextOptModal}
            openEmailModal = {this.openEmailModal}
            setCustTextOpt = {this.setCustTextOpt}
            closeEmailModal = {this.closeEmailModal}
            updateInternationalCustomerInvoker = {this.updateInternationalCustomerInvoker}
            closeSuccessModal = {this.closeSuccessModal}
            closeFailModal = {this.closeFailModal}
            bypassAddressValidation = {this.bypassAddressValidation}
            closeaddrEmailMOdal = {this.closeaddrEmailMOdal}
            togglePopup = {this.togglePopup}
            addrEmailMOdal = {this.state.addrEmailMOdal}
            showPopup = {this.state.showPopup}
            isValid = {this.state.isValid}
            cust_text_opt = {this.state.cust_text_opt}
            currentAddress = {this.state.currentAddress}
            changedAddress = {this.state.changedAddress}
            update_int_country = {this.state.update_int_country}
            bypassEmailValidation={this.bypassEmailValidation}
            custNotFoundModal={this.state.custNotFoundModal}
            closeNotFoundModal={this.closeNotFoundModal}
            failedToUpdateModal={this.state.failedToUpdateModal}
            closeFailedToUpdate={this.state.closeFailedToUpdate}
            failedToUpdate={this.failedToUpdate}
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
function mapStateToProps({ updateCustomerInternational, home, login,customerDetails }) {
    return { updateCustomerInternational, salutationData: home.salutationData, login,customerDetails };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateCustomerintInvoker: getCountryList ,
        updateCustomerIntServiceInvoker:updateInternationalApi,
        navigateToDomesticCustomerInvoker: navigateToDomesticCustomer,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerInternational);