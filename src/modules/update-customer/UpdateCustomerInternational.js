/* Importing the required libraries and plugins*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip'
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import InputMask from 'react-input-mask';
import Modal from 'react-responsive-modal';

/* Importing the required images and icons for the files*/


/* Importing the required local files*/

import { getCountryList,fetchSalutation } from './UpdateCustomerInternationalActions';
import { updateInternationalApi } from './UpdateCustomerInternationalActions';
import Popup from '../popup/popup';
import VerifyCustomer from '../verify_customer/View/VerifyCustomerIntView';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import { parsePhoneNumber,validZip } from '../common/helpers/helpers'
import { startSpinner } from '../common/loading/spinnerAction';
import Spinner from '../common/loading/spinner';

/* View Components import */
import UpdateCustomerInternationalView from '../update-customer/View/UpdateCustomerIntView'

import { navigateToDomesticCustomer } from '../customer-details/CustomerDetailsActions.js'

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


        if(nextProps.updateCustomerInternational.errors.length > 0) {
            console.log("66666");
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

 
            
            
            this.props.startSpinner(false);
            //console.log(nextProps.updateCustomer.errors[0].dom_cust_mobile);
            this.setState({errors : nextProps.updateCustomerInternational.errors});
        }


        if((nextProps.updateCustomerInternational.isProfileLoaded) && (nextProps.updateCustomerInternational.customerProfile != '{}'))
            {
              
                console.log(Object.keys(this.state.currentAddress).length);
                if(Object.keys(this.state.currentAddress).length == 0)
                {
                  
                    this.setState({profileData :  nextProps.updateCustomerInternational.customerProfile}, function(){
                        this.getAddress();
                    })
                }
                
            }
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
                errors['update_int_mobile'] = 'Invalid Phone Number';
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
            succesModal: false
        })
        this.setState({succesModal:false});
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
    
    componentDidMount() {
        //this.getAddress();
    }

    /* Submit add customer data - International */

    updateInternationalCustomerInvoker = (bypassFlag) => {
        this.props.startSpinner(true);
        this.setState({emailModal:false, textoptModal:false});
       let addCustDomData = {
           'ClientID': '0101:0169:04042018:033639',
           'ClientTypeID': '1000',
           'SourceApp': 'CMOS',
           'SourceLoc': 'NM-DIRECT',
           'CFirstName': this.state.changedAddress['update_int_fname'],
           'CLastName': this.state.changedAddress['update_int_lname'],
           'Salutation': this.state.selectedSalutation,
           'Address_Ln1': this.state.changedAddress['update_int_address1'],
           'City': this.state.changedAddress['update_int_city'],
           'Zip5': this.state.changedAddress['update_int_pincode'],
           'CEmail': this.state.changedAddress['update_int_email'],
           'Country': this.state.changedAddress['update_int_country'],
           'CMobile': this.state.changedAddress['update_int_mobile'].replace(/[^A-Z0-9]+/ig, ""),
           'storeClientNo': '',
           'storeAssoc': this.props.login.userpin,
           'donotcall': this.state.cust_text_opt,
           'flagByPASS': true,
           "ClienteleUpdateFlag":true,
            "CCssNo":this.props.customerDetails.cssId,
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