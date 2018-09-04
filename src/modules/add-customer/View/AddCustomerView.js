/* Dependencies import */
import React, {Component} from 'react';
import { Switch, Route,Link } from 'react-router-dom'

/* Components import */
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import {AddCustomerDomesticView} from './Components/Domestic/AddCustomerDomesticView'
import {AddCustomerIntView} from './Components/International/AddCustomerIntView'

/* Images import */
import SvgIcon from 'material-ui/SvgIcon';
import backarrow from '../../../resources/images/Back.svg';

/*Spinner Component*/
import {startSpinner} from '../../common/loading/spinnerAction';
import Spinner from '../../common/loading/spinner';

/* Stylesheet import */
import '../View/Styles/AddCustomerStyle.css';

/* path import */
import {ADD_CUSTOMER} from '../../../pathConstants';


export class AddCustomerView extends Component {

    constructor(props) {
        super(props);
        this.state ={
            
        }
    }
  
  /* Render method for the component */

    render() {   
        
        //props for domestic form
        var domesticProps = {selectedSalutation :this.props.selectedSalutation,
            handleSalutationChange :this.props.handleSalutationChange,
            salutationDataDrop :this.props.salutationDataDrop,
            handleChange :this.props.handleChange,
            fields :this.props.fields,
            errors :this.props.errors,
            statesList: this.props.statesList,
            dom_cust_state : this.props.dom_cust_state,
            handleCustStateChange :this.props.handleCustStateChange,
            zipOverride:this.props.zipOverride,
            closeZipOverideModal:this.props.closeZipOverideModal,
            cityModal:this.props.cityModal,
            cityModalClose:this.props.cityModalClose,
            citystateList:this.props.citystateList,
            stateList:this.props.stateList,
            populateCity:this.props.populateCity,
            clearAllFields :this.props.clearAllFields,
            openModals :this.props.openModals,
            phoneModal :this.props.phoneModal,
            closePhoneModal :this.props.closePhoneModal,
            closeEmailModal :this.props.closeEmailModal,
            openTextOptModal :this.props.openTextOptModal,
            textoptModal :this.props.textoptModal,
            openEmailModal:this.props.openEmailModal,
            setCustTextOpt :this.props.setCustTextOpt,
            emailModal :this.props.emailModal,
            emailModal :this.props.emailModal,
            addDomesticCustomerInvoker :this.props.addDomesticCustomerInvoker,
            succesModal :this.props.succesModal,
            closeSuccessModal :this.props.closeSuccessModal,
            failModal :this.props.failModal,
            failModal1 :this.props.failModal1,
            closeFailModal :this.props.closeFailModal,
            closeFailModal1 :this.props.closeFailModal1,
            bypassAddressValidation :this.props.bypassAddressValidation,
            filedsMissingModal :this.props.filedsMissingModal,
            closeFieldsMissingModal : this.props.closeFieldsMissingModal,
            emailMissingModal :this.props.emailMissingModal,
            addCardModal : this.props.addCardModal,
            maxCardWarning : this.props.maxCardWarning,
            openCardModals : this.props.openCardModals,
            closeAddCardModal : this.props.closeAddCardModal,
            cancelSwipeMode : this.props.cancelSwipeMode,
            customercardDetails : this.props.customercardDetails,
            maxCardWarningMessage : this.props.maxCardWarningMessage,
            cardDisplay : this.props.cardDisplay,
            errorDescription : this.props.errorDescription,
            openErrorModal : this.props.openErrorModal,
            closeErrorModal : this.props.closeErrorModal
        }

        //Props for international form
        var internationalProps = {
            selectedSalutationInt :this.props.selectedSalutationInt,                               
            handleSalutationChangeInt :this.props.handleSalutationChangeInt,
            salutationDataDrop :this.props.salutationDataDrop,
            handleChangeInt :this.props.handleChangeInt,
            fields :this.props.fields,
            clearAllFields :this.props.clearAllFields,
            clearAllFieldsInt :this.props.clearAllFieldsInt,
            openModalsInt :this.props.openModalsInt,
            phoneModalInt :this.props.phoneModalInt,
            closePhoneModalInt :this.props.closePhoneModalInt,
            closeEmailModalInt :this.props.closeEmailModalInt,
            openTextOptModalInt :this.props.openTextOptModalInt,
            textOptModalInt  : this.props.textOptModalInt,
            openEmailModalInt :this.props.openEmailModalInt,
            setCustTextOptInt :this.props.setCustTextOptInt,
            emailModalInt :this.props.emailModalInt,
            emailModal :this.props.emailModal,
            succesModalInt :this.props.succesModalInt,
            closeSuccessModalInt :this.props.closeSuccessModalInt,
            closeEmailModalInt :this.props.closeEmailModalInt, 
            bypassAddressValidationInt :this.props.bypassAddressValidationInt,
            fieldsInt :this.props.fieldsInt,
            errorsInt : this.props.errorsInt,
            selectedCountry : this.props.selectedCountry,
            handleCountryChange : this.props.handleCountryChange,
            countryList : this.props.countryList,
            addInternationalCustomerInvoker : this.props.addInternationalCustomerInvoker,
            failModalInt : this.props.failModalInt,
            failModalInt1 : this.props.failModalInt1,
            closeFailModalInt : this.props.closeFailModalInt,
            closeFailModalInt1 : this.props.closeFailModalInt1,
            addCardModal : this.props.addCardModal,
            maxCardWarning : this.props.maxCardWarning,
            openCardModals : this.props.openCardModals,
            closeAddCardModal : this.props.closeAddCardModal,
            cancelSwipeMode : this.props.cancelSwipeMode,
            customercardDetails : this.props.customercardDetails,
            maxCardWarningMessage : this.props.maxCardWarningMessage,
            cardDisplay : this.props.cardDisplay,
            errorDescription : this.props.errorDescription,
            errorThrown : this.props.errorThrown
        }

        return (
           
            <div className='add-customer-main'>
                <div className='addcust-header'>
                    <Header history={this.props.history}></Header>
                </div>
                <div className='addcust-subheader-container'> 
                    <div className='back-arrow-container' onClick={this.props.navigateToHome}>
                        <img src={backarrow} className='back-arrow' alt="navigate-back"/>
                    </div>
                    <Link to={ADD_CUSTOMER}>   
                        <div
                            className='add-customer-tab-header'
                            onClick={() => this.props.switchToDomestic()}>
                            <img
                                src={this.props.addCustImage}
                                className='add-customer-icon'
                                alt="add-customer-icon"/>
                            <div className='add-customer-label '>Add Customer</div>
                        </div>
                    </Link>
                    <Link to={ADD_CUSTOMER + '/int'}>  
                        <div
                            className='add-int-customer-tab-header'
                            onClick={() => this.props.switchToInternational()}>
                            <img
                                src={this.props.addIntCustImage}
                                className='add-int-customer-icon'
                                alt="add-international-customer-icon"/>
                            <div className='add-int-customer-label '>Add International Customer</div>
                        </div>
                    </Link>                    
                    <div className='tab-header-spacer'></div>
                </div>
                <div className='tab-content'>               
                    <main>
                        <Switch>
                            <Route exact path={ADD_CUSTOMER} render={(props) => <AddCustomerDomesticView {...props} domesticProp={ domesticProps}/>} />
                            <Route path={ADD_CUSTOMER +'/int'} render={(props) => <AddCustomerIntView {...props} internationalProp={ internationalProps }/>} />
                        </Switch>
                    </main>
                </div>
                <div className='addcust-footer'>
                    <Footer></Footer>
                </div>
            </div >
        );
    }

}


