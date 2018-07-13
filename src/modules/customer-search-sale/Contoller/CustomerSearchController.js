import React, { Component } from 'react';
import './customersearchsale.css';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';


// Header and Footer
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';


//Action Import
import { getCustomers, setCustomer } from './CustomerSearchAction';
import { navigateToEditCustomer as navigateToEditCustomerSmall } from '../viewedit-customer-sff/Controller/vieweditCustomerAction.js'; //'../sale-view-or-edit-customer/SaleEditCustomerAction.js';
import { navigateToEditCustomer as navigateToEditCustomerLarge } from '../viewedit-customer/Controller/vieweditCustomerAction.js';
import { startSpinner } from '../../common/loading/spinnerAction';

// Icons Import
import addcustomer from '../../../resources/images/Add_Customer.svg';
import isellcart from '../../../resources/images/Isell_Cart_Purple.svg'
import searchBtnIcon from '../../../resources/images/Search.svg';
import crossicon from '../../../resources/images/Cross_White.svg';
import accordianOpen from '../../../resources/images/Accordian_Open.svg';
import accordianClose from '../../../resources/images/Accordian_Closed.svg';
import warning from '../../../resources/images/Warning.svg';
import martkedTrangle from '../../../resources/images/Marked_Triangle_Purple.svg';


class CustomerSearch extends Component {
    
    constructor(props){
        super(props)
        this.state={
            searchItem : '',    
            isClienteled:false,
            searchResult : [],
            maxLimit_modal: false,
            reduxResult: {}
        }
    }

    componentDidMount(){
        ( this.state.searchItem === '') ? (document.getElementsByClassName('customer-search-button-sff')[0].disabled) : ('')  
    }

    componentWillMount() {
        if(this.props.customerSearch.buttonId != '' && this.props.customerSearch.buttonId != undefined && this.props.customerSearch.buttonId != null) {
            if(this.props.customerSearch.buttonId == '1') {
                console.log('FROM SALE BUTTON');
            }
            else {
                console.log('FROM SEARCH BUTTON');
            }
        }
        else {
            console.log('this.props.customerSearch.buttonId is empty');
        }
    }

    componentWillReceiveProps(nextProps) {
        // Checks for existing response data
        if(nextProps.customerSearch.data.customerList) {
            this.props.startSpinner(false);
            const list = nextProps.customerSearch.data.customerList;
            const resultList = [];

            // Iterates through array of customer objects
            list.map((customer, i) => {
                if(customer.personNames === null || customer.personNames.length < 1) {
                    customer.phoneNumbers = [""]
                } 
               if(customer.phoneNumbers === null || customer.phoneNumbers.length < 1) {
                   customer.phoneNumbers = [""]
                } 
               if(customer.emails === null || customer.emails.length < 1) {
                    customer.emails = [""]
                } 
              if(customer.addresses === null || customer.addresses.length < 1) {
                    customer.addresses = [""]
                } 
            
            // push JSX to empty array
            resultList.push(
                <div key={customer.cssId}>
                    <div className='customer-search-result-panel'>
                    {
                        (customer.myCustomer === true) ? 
                    <img src={martkedTrangle} className='customer-search-triangle-icon'></img> : null
                    }
                    <div className='customer-search-result-panel-content'>                   
                    <div className='customer-search-result-panel-custname' onClick={this.navigateToViewEditCustomer.bind(this,customer)}>{customer.personNames[0].firstName},&nbsp;{customer.personNames[0].lastName}{customer.personNames[0].salutation}</div>
                        <div className="customer-search-result-panel-phone" onClick={this.navigateToViewEditCustomer.bind(this,customer)}>{customer.phoneNumbers[0]}</div>
                        <div className="customer-search-result-panel-email" onClick={this.navigateToViewEditCustomer.bind(this,customer)}>{customer.emails[0]}</div>
                        <div className="customer-search-result-panel-address" onClick={this.navigateToViewEditCustomer.bind(this,customer)}>{customer.addresses[0]}</div>
                        <div className='customer-search-result-panel-custid' onClick={this.navigateToViewEditCustomer.bind(this,customer)}>{customer.cssId}</div>
                        <div className='customer-search-result-panel-accordion-btn'>
                            {((customer.emails.length > 1 || customer.addresses.length > 1 || customer.addresses.length === null) && (window.innerWidth > 1900))?
                            (<img className='accordion-expand-button' id={"panel-"+i} src={accordianClose} onClick={this.openAccordion.bind(this)} />):(<span></span>)}
                        </div>
                    </div> 
                </div> 
                {
                    (customer.emails.length > 1 || customer.addresses.length > 1 || customer.addresses.length === null) ?
                    <div className='customer-search-result-accordion'>
                        <div className='customer-search-result-accordion-row1'>
                            <div className='customer-search-result-accordion-spacer1'></div>
                            <div className='customer-search-result-accordion-spacer2'></div>
                            <div className='row-seperator-accordion1'></div>
                            <div className='row-seperator-accordion2'></div> 
                            <div className='customer-search-result-accordion-spacer3'></div> 
                        </div>  
                        <div className='customer-search-result-accordion-row2'>
                            <div className='customer-search-result-accordion-spacer1'></div>
                            <div className='customer-search-result-accordion-spacer2'></div>
                            <div className="customer-search-result-panel-email">{customer.emails[1]}</div>
                            <div className="customer-search-result-panel-address">{customer.addresses[1]}</div>
                            <div className='customer-search-result-accordion-spacer1'></div> 
                        </div>  
                    </div> : null
                 }
            </div>); 
            });

           //sets modal state + result array
           this.setState({
               searchResult: resultList,
               maxLimit_modal: true,
            });
           
            (window.innerWidth > 1900)?((document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "block"),
            (document.getElementsByClassName('count-of-customers-lff')[0].style.display = "block"))
            :(document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "block")
        
        // checks for 0 length of array and returns JSX
        if(resultList.length === 0) {
            document.getElementsByClassName('customer-search-results-display-no-results-label')[0].style.display = "block";
            }
        }    
    }



// method to control accordion
    openAccordion({currentTarget}){
        document.getElementsByClassName("accordion-expand-button")[0].src = accordianOpen;
        var current_id = currentTarget.id;
        var acc = document.getElementsByClassName("customer-search-result-panel");
        for(var i=0;i<acc.length;i++) {
            if(current_id === "panel-"+i) {
                var panel = acc[i].nextElementSibling;
                acc[i].classList.add('active');
                panel.classList.add('active-result');
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    document.getElementsByClassName("accordion-expand-button")[0].src = accordianClose;
                } else {
                    panel.style.maxHeight = "300px";
                
                    // panel.style.height = "300px";
                } 
            } else {
                var panel = acc[i].nextElementSibling;
                acc[i].classList.remove('active');
                if(panel != null) {
                    panel.classList.remove('active-result');
                    panel.style.maxHeight = null; 
                }
            }
        }
    }



    showClearSearchIcon = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'block';
    }

    hideClearSearchIcon = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'none';
    }

    hideClearSearchIconOnBlur = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'none';        
    }

    handleChange = (event,index,value) => {  

        if(event.target.value == ""){
            if(window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4";
                document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none";
                document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none";
            }
            else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4";
                document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none";
            }
			
        }
        else{
            if(window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "1";
            } else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "1";
            }
        }
        
        this.setState({searchItem: event.target.value});   
    }

    clearSearch = (field, e) => 
        {this.setState({searchItem : '',searchResult :''});
        (window.innerWidth>1900) ? (document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4" ,
        document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none",
        document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "0.4" ,
        //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
        document.getElementsByClassName('add-customer-icon')[0].classList.add('button-disabler'),
        document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "1",
        document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
        document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none") : 

        (document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4" ,
        //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
        document.getElementsByClassName('add-customer-icon')[0].classList.add('button-disabler'),
        document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
        document.getElementsByClassName('customer-search-clear-input-icon')[0].style.display = "none" ,
        document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none")
        
    }

    navigateToViewEditCustomer = (data) => {

        if(this.props.customerSearch.buttonId == '1') {
            if (window.innerWidth<1920) {
                this.props.navigateToEditCustomerInvokerSmall(data);
            }
            else {
                this.props.navigateToEditCustomerInvokerLarge(data);
            }
            this.props.history.push('/view-edit-customer');
        }
        else {
            // COMENTING OUT CODE UNTIL PROPER DATA IS RECEIVED
            // if(data.country === 'US') {
            //     this.props.history.push('/customer-details/domestic');
            //     // details/domestic
            // } else {
            //     this.props.history.push('/customer-details/international');
            // } 
            this.props.history.push('/customer-details/domestic')

            this.props.setCustomer(data)
            this.setState({
                reduxResult: data
            })
            
        }
        /* if(data.country === 'US') {
            this.props.history.push('/customer-details');
        } else {
            this.props.history.push('/customer-details-international');
        } */
    }

    navigateToAddCustomer(event){
        //console.log(document.getElementsByClassName('add-customer-icon')[0].classList.contains('button-disabler'));
        //(document.getElementsByClassName('add-customer-icon')[0].style.opacity === "0.4") ? (console.log('yes')) : (console.log('no'))
        if(document.getElementsByClassName('add-customer-icon')[0].classList.contains('button-disabler')) {
            // DO NOTHING AS BUTTON IS DISABLED
        }
        else {
            this.props.history.push('/add-customer');
        }
    }

    navigateToSale = () => {
       this.setState({isClienteled:false});
        this.props.setClienteled(false)
        this.props.history.push('/sale');
    }



    searchForCustomer = () => {

    if(window.innerWidth > 1900) {
        document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "1";
        //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
        document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
        document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "0.4";
        document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";

        
    } else {
        //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
        document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
        document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";
    }
    
    if(this.state.searchItem != '') {
            this.displayCustomers();
    }
}


    displayCustomers() {
        // REDUX CALL
        const query = this.state.searchItem;
        const associatePin = 228697;

        this.props.startSpinner(true);

        this.props.getCustomers(query, associatePin);
    }

    render() {
        return(
            <CustomerSearch
            history = {this.props.history}
            searchItem = {this.state.searchItem}    
            searchResult = {this.state.searchResult}
            maxLimit_modal = {this.state.maxLimit_modal}
            reduxResult = {this.state.reduxResult}
            openAccordion = {this.openAccordion}
            showClearSearchIcon = {this.showClearSearchIcon}
            hideClearSearchIcon = {this.hideClearSearchIcon}
            hideClearSearchIconOnBlur = {this.hideClearSearchIconOnBlur}
            handleChange = {this.handleChange}
            clearSearch = {this.clearSearch}
            navigateToViewEditCustomer = {this.navigateToViewEditCustomer}
            navigateToAddCustomer = {this.navigateToAddCustomer}
            navigateToSale = {this.navigateToSale}
            searchForCustomer = {this.searchForCustomer}
            displayCustomers = {this.displayCustomers}
            />
        )
    }
}

function mapStateToProps({ customerSearch }) {
    return { customerSearch }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navigateToEditCustomerInvokerSmall: navigateToEditCustomerSmall,
            navigateToEditCustomerInvokerLarge: navigateToEditCustomerLarge,
          getCustomers: getCustomers,
          setCustomer: setCustomer,
          startSpinner:startSpinner 
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);