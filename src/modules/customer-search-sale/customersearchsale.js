import React, { Component } from 'react';
import './customersearchsale.css';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';
import InputMask from 'react-input-mask';

// Header and Footer
import Header from '../common/header/header';
import Footer from '../common/footer/footer';


//Action Import
import { getCustomers, setCustomer, setClienteled, setSearchItemAction } from './actions.js';
import { navigateToEditCustomer as navigateToEditCustomerSmall } from '../viewedit-customer-sff/Controller/vieweditCustomerAction.js'; //'../sale-view-or-edit-customer/SaleEditCustomerAction.js';
import { navigateToEditCustomer as navigateToEditCustomerLarge } from '../viewedit-customer/Controller/vieweditCustomerAction.js';
import { navigateToDomesticCustomer } from '../customer-details/CustomerDetailsActions.js'
import { startSpinner } from '../common/loading/spinnerAction';
import { goToSalesPage } from '../sale/SaleAction.js';
import { GetIsellCart, GetIsellCartScanner } from './get-isell-cart/getIsellCart';
import { getIsellCartUpdateAction,getCustomerDetailsClienteleAction } from './get-isell-cart/getIsellCartUpdateAction';
import { custIncircleInfoRequest } from './actions.js';


// Icons Import
import addcustomer from '../../resources/images/Add_Customer.svg';
import isellcart from '../../resources/images/Isell_Cart_Purple.svg'
import searchBtnIcon from '../../resources/images/Search.svg';
import crossicon from '../../resources/images/Cross_White.svg';
import accordianOpen from '../../resources/images/Accordian_Open.svg';
import accordianClose from '../../resources/images/Accordian_Closed.svg';
import warning from '../../resources/images/Warning.svg';


import martkedTrangle from '../../resources/images/Marked_Triangle_Purple.svg';


class CustomerSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchItem: '',
            isClienteled: true,
            searchResult: [],
            maxLimit_modal: false,
            reduxResult: {},
            modal_isell_cart: false,
            modal_isell_cart_scanner: false,
            customerDetailsList:{},
        }
    }

    componentDidMount() {

        (this.state.searchItem === '') ? (document.getElementsByClassName('customer-search-button-sff')[0].disabled) : ('');
        if (this.props.customerSearch.data.customerList != undefined) {
            if (this.props.customerSearch.data.customerList.length > 0) {
                const list = this.props.customerSearch.data.customerList;
                this.setResults(list);
            }
            this.setState({ maxLimit_modal: false })
        }
        if (this.props.customerSearch.searchItem != null || this.props.customerSearch.searchItem != '') {
            this.setState({ searchItem: this.props.customerSearch.searchItem })
        }


    }



    componentWillMount() {
        if (this.props.customerSearch.buttonId != '' && this.props.customerSearch.buttonId != undefined && this.props.customerSearch.buttonId != null) {
            if (this.props.customerSearch.buttonId == '1') {
                console.log('FROM SALE BUTTON');
            }
            else {
                console.log('FROM SEARCH BUTTON');
            }
        }
        else {
            console.log('this.props.customerSearch.buttonId is empty');
        }

        console.log('customer searc123', this.props);


    }



    // method to control accordion
    openAccordion({ currentTarget }) {
        document.getElementsByClassName("accordion-expand-button")[0].src = accordianOpen;
        var current_id = currentTarget.id;
        var acc = document.getElementsByClassName("customer-search-result-panel");
        for (var i = 0; i < acc.length; i++) {
            if (current_id === "panel-" + i) {
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
                if (panel != null) {
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

    handleChange = (event, index, value) => {

        if (event.target.value == "") {
            if (window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4";
                document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none";
                document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none";
            }
            else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4";
                document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none";
            }

        }
        else {
            if (window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "1";
            } else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "1";
            }
        }

        this.setState({ searchItem: event.target.value });
    }

    clearSearch = (field, e) => {
        this.setState({ searchItem: '', searchResult: '' });
        (window.innerWidth > 1900) ? (document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4",
            document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none",
            document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "0.4",
            //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
            document.getElementsByClassName('add-customer-icon')[0].classList.add('button-disabler'),
            document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "1",
            document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
            document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none") :

            (document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4",
                //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
                document.getElementsByClassName('add-customer-icon')[0].classList.add('button-disabler'),
                document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
                document.getElementsByClassName('customer-search-clear-input-icon')[0].style.display = "none",
                document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none")

    }

    navigateToViewEditCustomer = (data) => {

        if (this.props.customerSearch.buttonId == '1') {
            if (window.innerWidth < 1920) {
                this.props.navigateToEditCustomerInvokerSmall(data);
            }
            else {
                this.props.navigateToEditCustomerInvokerLarge(data);
            }
            this.props.history.push('/view-edit-customer');
        }
        else {
            this.props.navigateToDomesticCustomerInvoker(data.cssId);
            this.props.history.push('/customer-details/domestic');
        }
        this.props.custIncircleInfoRequestInvoker(data.cssId);
        /* if(data.country === 'US') {
            this.props.history.push('/customer-details');
        } else {
            this.props.history.push('/customer-details-international');
        } */
    }

    navigateToAddCustomer(event) {
        //console.log(document.getElementsByClassName('add-customer-icon')[0].classList.contains('button-disabler'));
        //(document.getElementsByClassName('add-customer-icon')[0].style.opacity === "0.4") ? (console.log('yes')) : (console.log('no'))
        if (document.getElementsByClassName('add-customer-icon')[0].classList.contains('button-disabler')) {
            // DO NOTHING AS BUTTON IS DISABLED
        }
        else {
            this.props.history.push('/add-customer');
        }
    }


    navigateToSale = () => {
        this.props.goToSalesPage(true, null);
        this.props.history.push('/sale', { isClienteled: false });
        this.setState({ isClienteled: false });
    }


    searchForCustomer = () => {

        if (window.innerWidth > 1900) {
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

        if (this.state.searchItem != '') {
            this.props.setSearchItem(this.state.searchItem);
            this.displayCustomers();
        }
    }
    getIsellCartUpdateAction = (getIsellCart) => {
        this.props.startSpinner(true);
        this.props.getIsellCartUpdateActionInvoker(getIsellCart);
    }
    getCustomerDetailsClienteleApi = (customerDetailsList) =>{
        this.props.getCustomerDetailsClienteleActionInvoker(customerDetailsList);
    }

    openIsellcartScanner = () => {
        this.showopenIsellcartScannerModal(true);
    }
    openIsellcart = () => {
        this.showOpenIsellcartModal(true);
    }
    showopenIsellcartScannerModal = (showFlag) => {
        this.setState({ modal_isell_cart_scanner: showFlag });
        this.setState({ modal_isell_cart: false });
    }

    showOpenIsellcartModal = (showFlag) => {
        this.setState({ modal_isell_cart: showFlag });
        this.setState({ modal_isell_cart_scanner: false });
    }

    componentWillReceiveProps(nextProps) {
        console.log('props', nextProps)
        //console.log(this.state)
        // Checks for existing response data
        if ((nextProps.customerSearch.data.customerList) && (!nextProps.customerSearch.isSearchItemSet)) {
            this.props.startSpinner(false);

            const list = nextProps.customerSearch.data.customerList;
            //const resultList = [];

            this.setResults(list);

        }
        else if (nextProps.customerSearch.dataFrom === 'GET_ISELL_CART_REQUEST_UPDATE') {
            console.log('GET_ISELL_CART_REQUEST_UPDATE');
            // this.props.startSpinner(false);
            if (nextProps.customerSearch.data.customerDetails.cssId !== "") {
                // const cssId = nextProps.customerSearch.data.customerDetails.cssId;
                // const customerFirstName = nextProps.customerSearch.data.customerDetails.customerFirstName;
                // const customerLastName = nextProps.customerSearch.data.customerDetails.customerLastName;
                // const email = nextProps.customerSearch.data.customerDetails.email;
                var customerDetailsList = nextProps.customerSearch.data.customerDetails;
                this.getCustomerDetailsClienteleApi(customerDetailsList);
            }
        }
        else if (nextProps.customerSearch.dataFrom === 'GET_CLIENT_TELE_REQUEST_UPDATE') {
            console.log('GET_CLIENT_TELE_REQUEST_UPDATE'+" " +nextProps.customerSearch.data.data.cSSNo);
            this.props.startSpinner(false);
            this.navigateSale();

            
        }
    }

    navigateSale =() =>{
        this.props.history.push('/sale')
    }

    setResults = (list) => {

        // debugger;
        const resultList = [];
        // Iterates through array of customer objects

        list.map((customer, i) => {
            if (customer.personNames === null || customer.personNames.length < 1) {
                customer.phoneNumbers = [""]
            }
            if (customer.phoneNumbers === null || customer.phoneNumbers.length < 1) {
                customer.phoneNumbers = [""]
            }
            if (customer.emails === null || customer.emails.length < 1) {
                customer.emails = [""]
            }
            if (customer.addresses === null || customer.addresses.length < 1) {
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
                            <div className='customer-search-result-panel-custname' onClick={this.navigateToViewEditCustomer.bind(this, customer)}>{customer.personNames[0].firstName},&nbsp;{customer.personNames[0].lastName}{customer.personNames[0].salutation}</div>
                            <div className="customer-search-result-panel-phone"><InputMask className="customer-search-result-phone" style={{ borderBottom: 'none' + '' }} mask="(999) 999-9999" maskChar="" onChange={this.navigateToViewEditCustomer.bind(this, customer)} value={customer.phoneNumbers[0]} /></div>
                            <div className="customer-search-result-panel-email" onClick={this.navigateToViewEditCustomer.bind(this, customer)}>{customer.emails[0]}</div>
                            <div className="customer-search-result-panel-address" onClick={this.navigateToViewEditCustomer.bind(this, customer)}>{customer.addresses[0]}</div>
                            <div className='customer-search-result-panel-custid' onClick={this.navigateToViewEditCustomer.bind(this, customer)}>{customer.cssId}</div>
                            <div className='customer-search-result-panel-accordion-btn'>
                                {((customer.emails.length > 1 || customer.addresses.length > 1 || customer.addresses.length === null) && (window.innerWidth > 1900)) ?
                                    (<img className='accordion-expand-button' id={"panel-" + i} src={accordianClose} onClick={this.openAccordion.bind(this)} />) : (<span></span>)}
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
        }, function () {
            if (resultList.length === 0) {
                document.getElementsByClassName('customer-search-results-display-no-results-label')[0].style.display = "block";
            }
        });

        (window.innerWidth > 1900) ? ((document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "block"),
            (document.getElementsByClassName('count-of-customers-lff')[0].style.display = "block"))
            : (document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "block")

        // checks for 0 length of array and returns JSX

    }

    displayCustomers() {
        // REDUX CALL
        const query = this.state.searchItem;
        const associatePin = 228697;

        this.props.startSpinner(true);

        this.props.getCustomers(query, associatePin);
    }

    render() {

        const searchButton = <div className='customer-search-button-lff' onClick={this.searchForCustomer}>
            <img src={searchBtnIcon} className='customer-search-button-icon-lff' />
            <span className='customer-search-button-label-lff'>SEARCH</span>
        </div>

        var searchFieldStyle = {
            height: (window.innerWidth > 1900) ? '43px' : '63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '45px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAalign: 'left',
            color: '#ffffff'
        }

        var searchFieldEnteredTextStyle = {
            height: (window.innerWidth > 1900) ? '43px' : '63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontHeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#ffffff',
            width:(window.innerWidth > 1900) ? '100%': '835px'
        }

        return (
            <div className='customer-search-container'>
                <Header className="header-customer-search-lff" history={this.props.history}></Header>
                <div className='customer-search-subheader'>
                    <div className='customersearch-subheader-label-container'>
                        <span className='customersearch-subheader-label' onClick={() => this.displayCustomers()}>Customer Search</span>
                    </div>
                    <div className='customersearch-subheader-icons-container'>
                        <div className="customersearch-subheader-icon-container-frst-part" onClick={() => this.openIsellcartScanner()}>
                            <div><img src={isellcart} className='customersearch-subheader-icon isellcart-icon'></img></div>
                            <div className="isellcart-label-lff">ISELL CART</div>
                        </div>
                        <div className="customersearch-subheader-icon-container-second-part" onClick={this.navigateToAddCustomer.bind(this)}>
                            <div><img src={addcustomer} className='customersearch-subheader-icon add-customer-icon button-disabler'></img></div>
                            <div className="add-customer-label-lff">ADD CUSTOMER</div>
                        </div>
                    </div>
                </div>

                <div className='customer-search-input-area'>
                    <div className='customer-search-input-area-row1'>
                        <div className='customer-search-input-area-label-text'>
                            Who are you looking for?
                            </div>
                        {
                            /*(window.innerWidth <= 1080 && this.props.customerSearch.buttonId == '1') ? 
                            ( 
                                <div className="skip-to-sale-sff" onClick={this.navigateToSale.bind(this)}>SKIP TO SALE</div>
                            ) : (null)*/

                            (window.innerWidth <= 1080) ?
                                (
                                    (this.props.customerSearch.buttonId == '1') ? <div className="skip-to-sale-sff" onClick={this.navigateToSale.bind(this)}>SKIP TO SALE</div> : ''
                                ) : (null)
                        }
                        <div className="no-of-search-result-lff">Search Results for {this.state.searchItem}</div>
                        <div className="count-of-customers-lff">{this.state.searchResult.length} customers found</div>
                    </div>
                    <div className='customer-search-input-area-row2'>
                        <TextField hintText={(window.innerWidth > 1900 )?"Search with last name, first name, phone or email":"Search with last name, first name, pho..."}
                            id='searchitem'
                            type="text"
                            fullWidth={true}
                            hintStyle={searchFieldStyle}
                            inputStyle={searchFieldEnteredTextStyle}
                            className='search-field-style'
                            value={this.state.searchItem}
                            onFocus={this.showClearSearchIcon.bind('searchitem', this)}
                            onFocusOut={this.hideClearSearchIcon.bind('searchitem', this)}
                            //onBlur = {this.hideClearSearchIconOnBlur.bind('searchitem',this)}
                            onChange={this.handleChange}
                        />
                        <img src={crossicon} className='customer-search-clear-input-icon'
                            id='searchitem-clearinput-icon' style={{ display: 'none' }}
                            onClick={this.clearSearch.bind(this, 'searchitem')} />

                        {
                            (window.innerWidth > 1900) ? (
                                <div>
                                    <div className='customer-search-button-lff' onClick={this.searchForCustomer}>
                                        <img src={searchBtnIcon} className='customer-search-button-icon-lff' />
                                        <span className='customer-search-button-label-lff'>SEARCH</span>
                                    </div>
                                </div>
                            ) :
                                (null)
                        }




                    </div>

                    <div className="customer-search-input-area-row-4-lff">
                        {/*(this.props.customerSearch.buttonId == '1') ? (<div className='customer-search-input-area-skip-label-lff' onClick={this.navigateToSale.bind(this)}>
                            SKIP TO SALE
                    </div>) : (<span></span>)*/}
                        {(this.props.customerSearch.buttonId == '1') ?
                            <div className='customer-search-input-area-skip-label-lff' onClick={this.navigateToSale.bind(this)}>
                                SKIP TO SALE
                        </div> : ''}
                    </div>



                    <div className='customer-search-input-area-row3'>
                        {(window.innerWidth > 1900) ? (null) :
                            (
                                <div className='customer-search-result-count-dispaly-area'>
                                    <span className='customer-search-result-count-dispaly-label'>{this.state.searchResult.length} Results for “{this.state.searchItem}”</span>
                                </div>
                            )}
                        <div onClick={this.searchForCustomer} className='customer-search-button-sff'  ><img src={searchBtnIcon} className='customer-search-button-icon' />
                            <span className='customer-search-button-label'>SEARCH</span>
                        </div>
                    </div>
                </div>
                {
                    (this.state.searchResult.length > 0) ?
                        (
                            <div>

                                <div className='customer-search-result-display-container'>
                                    <div className='customer-search-results-display-header'>
                                        <div className='customer-search-result-display-header-title1'>NAME</div>
                                        <div className='customer-search-result-display-header-title2'>PHONE NUMBER</div>
                                        <div className='customer-search-result-display-header-title3'>E-MAIL</div>
                                        <div className='customer-search-result-display-header-title4'>ADDRESS</div>
                                        <div className='customer-search-result-display-header-title5'>CSS ID</div>
                                        <div className='customer-search-result-display-header-title6'></div>
                                    </div>
                                    <div className='customer-search-results-display-area'>
                                        {this.state.searchResult}
                                    </div>
                                </div>
                            </div>
                        ) : (this.state.searchResult.length === 0 || this.state.searchResult.length === null) ?
                            (
                                <div>
                                    <div className='customer-search-results-display-no-results'>
                                        <span className='customer-search-results-display-no-results-label'>No results found</span>
                                    </div>
                                </div>
                            ) : null
                }

                {(this.state.searchResult.length >= 50 && window.innerWidth > 1919) ?
                    <Modal classNames={{ modal: 'customer-limit-modal' }} open={this.state.maxLimit_modal} onClose={() => this.setState({ maxLimit_modal: false })} closeOnOverlayClick={false}>
                        <div className="customer-limit-modal-img">
                            <img src={warning}></img>
                        </div>

                        <div className="customer-limit-modal-msg"> A max limit of 50 customers has returned. Please refine your search. </div>
                        <div className="customer-limit-modal-btn" onClick={() => this.setState({ maxLimit_modal: false })}><span className="customer-limit-modal-txt">CLOSE</span></div>
                    </Modal>
                    : null
                }
                {this.state.modal_isell_cart ?
                    <Modal classNames={{ modal: 'get-isell-cart-modal-container' }} open={(sku) => {

                    }} onClose={() => {

                    }}>
                        <GetIsellCart
                            showOpenIsellcartModal={this.showOpenIsellcartModal}
                            showopenIsellcartScannerModal={this.showopenIsellcartScannerModal}
                            getIsellCartUpdateAction={this.getIsellCartUpdateAction}
                        />
                    </Modal>
                    :
                    null
                }
                {this.state.modal_isell_cart_scanner ?
                    <Modal classNames={{ modal: 'get-isell-cart-scanner-modal-container' }} open={(sku) => {

                    }} onClose={() => {

                    }}>
                        <GetIsellCartScanner
                            openIsellcart={this.openIsellcart}
                            showopenIsellcartScannerModal={this.showopenIsellcartScannerModal}
                        />
                    </Modal>
                    :
                    null
                }


                <Footer className="footer-customer-search-lff"></Footer>
            </div>);
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
            navigateToDomesticCustomerInvoker: navigateToDomesticCustomer,
            custIncircleInfoRequestInvoker: custIncircleInfoRequest,
            getCustomers: getCustomers,
            setCustomer: setCustomer,
            setClienteled: setClienteled,
            startSpinner: startSpinner,
            getIsellCartUpdateActionInvoker: getIsellCartUpdateAction,
            getCustomerDetailsClienteleActionInvoker:getCustomerDetailsClienteleAction,
            goToSalesPage: goToSalesPage,
            setSearchItem: setSearchItemAction
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);