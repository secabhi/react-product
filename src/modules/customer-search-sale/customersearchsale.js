//Dependecies 
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Modal from 'react-responsive-modal';
import InputMask from 'react-input-mask';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Actions
import { navigateToEditCustomer as navigateToEditCustomerSmall } from '../viewedit-customer-sff/Controller/vieweditCustomerAction.js';
import { navigateToEditCustomer as navigateToEditCustomerLarge } from '../viewedit-customer/Controller/vieweditCustomerAction.js';
import { getCustomers, setCustomer, setClienteled, setSearchItemAction } from './actions.js';
import { navigateToDomesticCustomer } from '../customer-details/CustomerDetailsActions.js'
import { startSpinner } from '../common/loading/spinnerAction';
import { goToSalesPage } from '../sale/SaleAction.js';
import { GetIsellCart, GetIsellCartScanner } from './get-isell-cart/getIsellCart';
import { getIsellCartUpdateAction,getIsellflow } from './get-isell-cart/getIsellCartUpdateAction';
import { custIncircleInfoRequest,sendCustomerDetailsToAddCustomerAction } from './actions.js';
import {itemSelectedAction} from '../common/cartRenderer/actions';

import {showException} from '../common/exceptionErrorModal/exceptionAction';

//Components
// Header and Footer
import Header from '../common/header/header';
import Footer from '../common/footer/footer';

//Images
import warningIcon from '../../resources/images/Warning.svg';
import addcustomer from '../../resources/images/Add_Customer.svg';
import isellcart from '../../resources/images/Isell_Cart_Purple.svg'
import searchBtnIcon from '../../resources/images/Search.svg';
import crossicon from '../../resources/images/Cross_White.svg';
import accordianOpen from '../../resources/images/Accordian_Open.svg';
import accordianClose from '../../resources/images/Accordian_Closed.svg';
import warning from '../../resources/images/Warning.svg';
import martkedTrangle from '../../resources/images/Marked_Triangle_Purple.svg';

//Styles
import './customersearchsale.css';

class CustomerSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: '',
      isClienteled: true,
      resData:false,
      searchResult: [],
      maxLimit_modal: false,
      reduxResult: {},
      modal_isell_cart: false,
      modal_isell_cart_scanner: false,
      getisellcart_errorModal: false,
      customerDetailsList: {},
      getISellCustomerDetails: {
        customerFirstName: "",
        customerLastName: ""
      },
      getIsellflow:false,
      isCartActive: false
    }

    this.initialCsrTest = {
      ClientNumber: '100000123',
      CCSNumber: '123456',
      MyClient: '',
      SaluationCode: '',
      Salutation: 'Mr.',
      LastName: 'Testa',
      FirstName: 'TestMani',
      International: '1',
      Addresses: {
        seq1: { add1: 'test street', addr2: 'apt.1', city: 'Test City', state: 'California', country: 'United States', phoneNumber: '9786298858' },
        seq2: { add1: 'test street2', addr2: 'apt.12', city: 'Test City2', state: 'New York', country: 'United States', phoneNumber: '9786298858' },
        seq3: { add1: 'test street3', addr2: 'apt.123', city: 'Test City3', state: 'Kansas', country: 'United States', phoneNumber: '9786298858' },
      },
      EmailAddress: 'Test@gmail.com',
      AddressType: '',
    }

  }

  componentWillReceiveProps(nextProps) {
    
    // console.log('customersearch sale component props', nextProps)
    // console.log('nextProps.dataFrom',nextProps.dataFrom);
    //debugger
    if(nextProps.customerSearch.isValid){
    if (nextProps.customerSearch.data != null) {
      console.log('SHIV DATAFROM CUSTSEARCH:', nextProps.customerSearch.dataFrom)
      if ((nextProps.customerSearch.data.cusomerList) && (!nextProps.customerSearch.isSearchItemSet)) {
       // if(this.props.spinner.startSpinner)
          this.props.startSpinner(false);

        const list = nextProps.customerSearch.data.cusomerList;
        //const resultList = [];
        this.setState({resData:false})

        this.setResults(list);

      }
      else if (nextProps.customerSearch.dataFrom === 'GET_ISELL_CART_REQUEST_UPDATE') {
        console.log('GET_ISELL_CART_REQUEST_UPDATE',nextProps.customerSearch.data.customerDetails);
        this.props.startSpinner(false);
        // if (nextProps.customerSearch.data.customerDetails.cssId !== "") {
        //   var customerDetailsList = nextProps.customerSearch.data.customerDetails;
        //   console.log('customerDetailsList',customerDetailsList);
        //   this.navigateToViewEditCustomer(customerDetailsList, '', '');
        // }
        //this.setState({getIsellflow: true })
         this.props.getIsellflowInvoker('sale');
         
        if (nextProps.customerSearch.data.customerDetails.cssId == "" || nextProps.customerSearch.data.customerDetails.cssId !== "" ) {
          var fname = nextProps.customerSearch.data.customerDetails.customerFirstName;
          var lname = nextProps.customerSearch.data.customerDetails.customerLastName;
          var fullname = fname + " " + lname;
          document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "1";
          this.setState({ searchItem: fullname, getISellCustomerDetails: nextProps.customerSearch.data.customerDetails },
            () => {
              this.searchForCustomer();
            });
        }
      }
      // else if (nextProps.customerSearch.dataFrom === "CS_CUSTNOTFOUND") {
      //   this.props.startSpinner(false);
      //   //document.getElementsByClassName('customer-search-results-display-no-results-label')[0].style.display = "block";
      // }
      else if (nextProps.customerSearch.dataFrom === "CS_CUSTNOTFOUND") {
        this.props.startSpinner(false);
        var cusnotfoundarray=[];
        this.setResults(cusnotfoundarray);
        this.setState({resData:true})
        /* if(document.getElementsByClassName('customer-search-results-display-no-results-label').length > 0)
          document.getElementsByClassName('customer-search-results-display-no-results-label')[0].style.display = "block"; */
              
      }

    }
    else if (nextProps.customerSearch.data === null && nextProps.customerSearch.dataFrom === 'GET_ISELL_CART_REQUEST_UPDATE_FAILURE') {
      this.setState({ getisellcart_errorModal: true });
      this.props.startSpinner(false);
    }
  }
  else{
    if (nextProps.customerSearch.error_message != '')
    {  // debugger;
      // this.props.clearState(this.clearParams);
           this.props.callErrorException( {showException: true,
                   error:{failedModule:'Customer Search',failureReason:'Unexpected Response',failureDescription:'Unable to resolve the response structure'}})
}
}

  }

  componentDidUpdate() {
    if (document.getElementsByClassName('customer-search-results-display-area')[0]) {
      document.getElementsByClassName('customer-search-results-display-area')[0].scrollTop = 0;
      if (this.state.searchItem !== '') {
        document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "1";
      }
      else {
        document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4";
      }
    }
  }

//To check if cart is there and if the cart length is >=1 then we are using this flag isCartActive to disable the 
// ISELLCART Label

  checkCartLength = () =>{

    if(this.props.cart && this.props.cart.data){
      if(this.props.cart.data.cartItems && this.props.cart.data.cartItems.items.length >=1){
        this.setState({isCartActive: true});
      }
    }
    else
    this.setState({isCartActive: false});
  }

  render() {
    console.log("SHIV SEARCHRESULTS:", this.state.searchResult.length)

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
      width: (window.innerWidth > 1900) ? '100%' : '835px'
    }

     
   

    return (
      <div className='customer-search-container'>
        <Header className="header-customer-search-lff" history={this.props.history}></Header>
        <div className='customer-search-subheader'>
          <div className='customersearch-subheader-label-container'>
            <span className='customersearch-subheader-label'>Customer Search</span>
          </div>
          <div className='customersearch-subheader-icons-container'>
            <div className= { this.state.isCartActive ? "customersearch-subheader-icon-container-frst-part-disabled" : "customersearch-subheader-icon-container-frst-part"} onClick={() => this.openIsellcartScanner()}>
              <div><img src={isellcart} className='customersearch-subheader-icon isellcart-icon'></img></div>
              <div className= "isellcart-label-lff">ISELL CART</div>
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
            { <div className="no-of-search-result-lff"></div>}

            {/* <div className="no-of-search-result-lff">Search Results for "{this.state.searchItem}"</div> */}
            <div className="count-of-customers-lff">{this.state.searchResult.length} Customers found</div>
          </div>
          <div className='customer-search-input-area-row2'>
            <TextField hintText={(window.innerWidth > 1900) ? "Search with last name, first name, phone or email" : "Search with last name, first name, pho..."}
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
              maxLength={100}
              little showCloseIcon={false}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.clearSearch();
                  this.searchForCustomer();
                  e.preventDefault();
                }
              }}
            />
            <img src={crossicon} className='customer-search-clear-input-icon'
              id='searchitem-clearinput-icon' style={{ display: 'none' }}
              onClick={this.clearSearch.bind(this, 'searchitem')} />

            {
              (window.innerWidth > 1900) ? (
                <div>
                  <button className='customer-search-button-lff'
                    disabled={this.state.searchItem === ''}
                    onClick={() => {
                      this.clearSearch();
                      this.searchForCustomer();
                      this.props.getIsellflowInvoker('');
                    }}
                  >
                    <img src={searchBtnIcon} className='customer-search-button-icon-lff' />
                    <span className='customer-search-button-label-lff'>SEARCH</span>
                  </button>
                </div>
              ) :
                (null)
            }




          </div>

          <div className="customer-search-input-area-row-4-lff">
            {(this.props.customerSearch.buttonId == '1') ? (<div className='customer-search-input-area-skip-label-lff' onClick={this.navigateToSale.bind(this)}>
              SKIP TO SALE
                    </div>) : (<span></span>)}

            {/* <div className='customer-search-input-area-skip-label-lff' onClick={this.navigateToSale.bind(this)}>
                            SKIP TO SALE
                        </div> */}
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
                    <div className='customer-search-result-display-header-title5'>CLIENT SMART ID</div>
                    <div className='customer-search-result-display-header-title6'></div>
                  </div>
                  <div ref={(ref) => this.search_results_div = ref} className='customer-search-results-display-area'>
                    {this.state.searchResult}
                  </div>
                </div>
              </div>
            ) : (this.state.searchResult.length === 0 || this.state.searchResult.length === null) ?
              (
                <div>
                  <div className='customer-search-results-display-no-results'>
                    <span className={(this.state.resData) ?'customer-search-results-display-no-results-label-show':'customer-search-results-display-no-results-label-hide'}>No results found</span>
                  </div>
                </div>
              ) : null
        }

        {(this.state.searchResult.length >= 50) ?
          <Modal classNames={{ modal: 'customer-limit-modal' }} open={this.state.maxLimit_modal} onClose={() => this.setState({ maxLimit_modal: false })} closeOnOverlayClick={false}>
            <div className="customer-limit-modal-img">
              <img src={warning}></img>
            </div>

            <div className="customer-limit-modal-msg"> Too many results. <br /> Please enter additional <br /> information and search again. </div>
            <div className="customer-limit-modal-btn" onClick={() => this.setState({ maxLimit_modal: false })}><span className="customer-limit-modal-txt">SEARCH AGAIN</span></div>
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
        {this.state.getisellcart_errorModal ?
          <Modal open={this.state.getisellcart_errorModal} little classNames={{ modal: 'sale-errorModal' }} >
            <div className='sale-errorModal-container'>
              <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
              <div className="sale-errorModal-text">Cart Not found</div>
              <button className="sale-errorModal-button" onClick={() => { this.setState({ getisellcart_errorModal: false }) }}>
                <div className="sale-errorModal-button-text">CLOSE</div>
              </button>
            </div>

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

  componentDidMount() {
    // ReactDOM.findDOMNode(this).scrollTop = 0
    // ReactDOM.findDOMNode(this).scrollIntoView();
    console.log('SHIV customer searc props', this.props);

    this.state.searchItem === ''? (document.getElementsByClassName('customer-search-button-sff')[0].disabled) : ('');
    if (this.props.customerSearch.data.cusomerList != undefined) {
      if (this.props.customerSearch.data.cusomerList.length > 0) {
        const list = this.props.customerSearch.data.cusomerList;
        this.setResults(list);
        this.setStyling();
      }
      this.setState({ maxLimit_modal: false })
    }
    if (this.props.customerSearch.searchItem != null || this.props.customerSearch.searchItem != '') {
      this.setState({ searchItem: this.props.customerSearch.searchItem })
    }
    // this.search_results_div.scrollTop(0,0);
    this.setState({
      getISellCustomerDetails: {
        customerFirstName: "",
        customerLastName: ""
      }
    });

    this.checkCartLength();
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
          panel.style.maxHeight = "700px";

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

    this.setState({ searchItem: event.target.value.toUpperCase() });
  }

  setStyling = () => {
    if (window.innerWidth > 1900) {
      document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "1";
      //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
      document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
      // document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].classList.add('button-disabler');


    } else {
      //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
      document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
      // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].classList.add('button-disabler');
    }
  }

  clearSearch = (field, e) => {
    // this.setState({ searchItem: '', searchResult: '' });
    (window.innerWidth > 1900) ? (document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4",
      document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none",
      document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "1",
      //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
      document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler'),
      // document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "1",
      // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
      document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none"
      // document.getElementsByClassName('isellcart-icon')[0].classList.remove('button-disabler')
    ) :


      (document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4",
        //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "0.4",
        document.getElementsByClassName('add-customer-icon')[0].classList.add('button-disabler'),
        // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "1",
        document.getElementsByClassName('customer-search-clear-input-icon')[0].style.display = "none",
        document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none"
        // document.getElementsByClassName('isellcart-icon')[0].classList.remove('button-disabler')
      )

  }

  navigateToViewEditCustomer = (data, selectedData, seq) => {
    var selectedCustomer = {};
    if (selectedData != '') {
      selectedCustomer = {
        isProfileDataLoaded: false,
        profileData: null,
        ...data,
        selectedAddress: {
          sequenceKey: seq,
          international: selectedData.international,
          Addr1: selectedData.addr1,
          Addr2: selectedData.addr2,
          City: selectedData.city,
          State: selectedData.state,
          Country: selectedData.country,
          Zip: selectedData.zip,
          PhoneNumbers: selectedData.phoneNumbers,
        }
      }
    }
    else {
      selectedCustomer = {
        /* cssId: "139921540",
        customerFirstName: "LOREE",
        customerLastName: "RYAN",
        email: "loreeryan05@gmail.com",
        phoneNumber: "2085597557",
        addressLine1: "5994 W PLANTATION LN",
        addressLine2: "",
        city: "BOISE",
        state: "ID",
        postalCode: "837032632" */
        isProfileDataLoaded: false,
        profileData: null,
        addresses : {},
        clientNumber: "",
        cCSNumber: data.cssId,
        myClient: "N",
        saluationCode: "",
        salutation: "",
        lastName: data.customerLastName,
        firstName: data.customerFirstName,
        emailAddress: data.email,
        selectedAddress: {
          sequenceKey: '',
          international: '',
          Addr1: '',
          Addr2: '',
          City: '',
          State: '',
          Country: '',
          Zip: '',
          PhoneNumbers: [],
        }
      }
    }
    console.log('isell flow',JSON.stringify(this.props.customerSearch.flow));
    if (this.props.customerSearch.buttonId == '1' || this.props.customerSearch.flow === "sale" ) {
      if (window.innerWidth < 1920) {
        // this.props.navigateToEditCustomerInvokerSmall(data);
        this.props.navigateToDomesticCustomerInvoker(selectedCustomer);
      }
      else {
        // this.props.navigateToEditCustomerInvokerLarge(data);
        this.props.navigateToDomesticCustomerInvoker(selectedCustomer);  
      }
      this.props.history.push('/view-edit-customer');
    }

    else {
      //this.props.startSpinner(true);
      this.props.navigateToDomesticCustomerInvoker(selectedCustomer);
      this.props.history.push('/customer-details');
    }
    this.props.custIncircleInfoRequestInvoker(data.CCSNumber);
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
    this.props.setClienteled(false);
    this.props.itemSelectedAction('');
    this.props.history.push('/sale');

  }

  searchForCustomer = () => {
    if (window.innerWidth > 1900) {
      document.getElementsByClassName('add-customer-label-lff')[0].style.opacity = "1";
      //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
      document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
      // document.getElementsByClassName('isellcart-label-lff')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].classList.add('button-disabler')


    } else {
      //document.getElementsByClassName('add-customer-icon')[0].style.opacity = "1";
      document.getElementsByClassName('add-customer-icon')[0].classList.remove('button-disabler');
      // document.getElementsByClassName('isellcart-icon')[0].style.opacity = "0.4";
      // document.getElementsByClassName('isellcart-icon')[0].classList.add('button-disabler')
    }
    console.log('searchitem',this.state.searchItem);
    if (this.state.searchItem != '') {
      console.log('searchitem2',this.state.searchItem);
      this.props.setSearchItem(this.state.searchItem);
      this.displayCustomers();
    }



  }

  getIsellCartUpdateAction = (getIsellCart) => {
    this.props.startSpinner(true);
    this.props.getIsellCartUpdateActionInvoker(getIsellCart);
  }

  openIsellcartScanner = () => {
   
    if (document.getElementsByClassName('isellcart-icon')[0].classList.contains('button-disabler')) {
    }
    else {
      this.showopenIsellcartScannerModal(true);
    }
  }

  openIsellcart = () => {
    this.showOpenIsellcartModal(true);
  }

  showopenIsellcartScannerModal = (showFlag) => {
    this.setState({ modal_isell_cart_scanner: showFlag, modal_isell_cart: false });
  }

  showOpenIsellcartModal = (showFlag) => {
    this.setState({ modal_isell_cart: showFlag,modal_isell_cart_scanner: false });
  }

  toCamelCase(str) {
    return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function (match) {
      return match.charAt(match.length - 1).toUpperCase();
    });
  }

  navigateVieweditCustomer = () => {
    this.props.history.push('/view-edit-customer')
  }

  navigateSale = () => {

    this.props.history.push('/sale')
  }

  setResults = (list) => {

    const resultList = [];
    // Iterates through array of customer objects

    list.map((customer, i) => {




      //   if (customer.personNames === null || customer.personNames.length < 1) {
      //     customer.phoneNumbers = [""]
      //   }
      //   if (customer.phoneNumbers === null || customer.phoneNumbers.length < 1) {
      //     customer.phoneNumbers = [""]
      //   }
      //   if (customer.emails === null || customer.emails.length < 1) {
      //     customer.emails = [""]
      //   }
      //   if (customer.addresses === null || customer.addresses.length < 1) {
      //     customer.addresses = [""]
      //   }

      //   var phoneNumbers = [];

      //   var emails = [];
      //   var addresses = [];
      //   for (var j = 0; j < customer.phoneNumbers.length; j++) {


      //     if (j + 1 <= customer.phoneNumbers.length) {
      //       phoneNumbers.push(<div className="customer-search-result-panel-phoneNumbers" style={{ marginBottom: '30' + 'px' }}><InputMask className="customer-search-result-phone" style={{ borderBottom: 'none' + '' }} mask="(999) 999-9999" maskChar="" onChange={this.navigateToViewEditCustomer.bind(this, customer)} value={customer.phoneNumbers[j + 1]} /></div>);
      //     }
      //   }
      //   for (var j = 0; j < customer.emails.length; j++) {


      //     if (j + 1 <= customer.emails.length) {
      //       emails.push(<div className="customer-search-result-panel-email-inner email-ellipse" style={{ marginBottom: '30' + 'px' }}>{customer.emails[j + 1]}</div>);
      //     }
      //   }
      //   for (var j = 0; j < customer.addresses.length; j++) {


      //     if (j + 1 <= customer.addresses.length) {
      //       addresses.push(<div className="customer-search-result-panel-address1" style={{ marginBottom: '30' + 'px' }}>{customer.addresses[j + 1]}</div>);
      //     }
      //   }


      let customerKeys = Object.keys(customer.addresses);
      //   console.log("SHIV CUSTOMER OBJECT", this.initialCsrTest.Addresses[customerTest[0]])
      // push JSX to empty array
      resultList.push(
        <div key={customer.clientNumber}>
          <div className='customer-search-result-panel'>
            {
              (customer.myClient === "Y") ?
                <img src={martkedTrangle} className='customer-search-triangle-icon'></img> : null
            }
            <div className='customer-search-result-panel-content'>
              <div className='customer-search-result-panel-content-clickable' onClick={() => this.navigateToViewEditCustomer(customer, customer.addresses[customerKeys[0]], customerKeys[0])}>
                <div className={(customer.myClient === "Y") ?'customer-search-result-panel-custname-remove':'customer-search-result-panel-custname'} >{customer.lastName},&nbsp;{customer.firstName}&nbsp;{customer.salutation}</div>
                <div className='customer-search-result-panel-phone' ><InputMask className="customer-search-result-phone" style={{ borderBottom: 'none' + '' }} mask="(999) 999-9999" maskChar="" value={customer.addresses[customerKeys[0]].phoneNumbers[0].phoneNumber} disabled /></div>
                <div  className='customer-search-result-panel-email' ><div className="customer-search-result-panel-email-inner email-ellipse">{customer.emailAddress}</div></div>
                <div className='customer-search-result-panel-address' >
                  {customer.addresses[customerKeys[0]].addr1 !== "" ? customer.addresses[customerKeys[0]].addr1 + ", " : ""}
                  {customer.addresses[customerKeys[0]].addr2 !== "" ? customer.addresses[customerKeys[0]].addr2 + ", " : ""}
                  {customer.addresses[customerKeys[0]].city !== "" ? customer.addresses[customerKeys[0]].city + ", " : ""}
                  {customer.addresses[customerKeys[0]].state !== "" ? customer.addresses[customerKeys[0]].state : ""}
                  {customer.addresses[customerKeys[0]].zip !== "" ? customer.addresses[customerKeys[0]].zip : ""}
                </div>
                <div className={(customer.myClient === "Y") ?'customer-search-result-panel-custid-remove':'customer-search-result-panel-custid'}>{customer.clientNumber}</div>
              </div>
              <span className='customer-search-result-panel-accordion-btn'>
                {((customerKeys.length > 1 || customerKeys.length === null) && (window.innerWidth > 1900)) ?
                  (<img className='accordion-expand-button' id={"panel-" + i} src={accordianClose} onClick={this.openAccordion.bind(this)} />) : (<span></span>)}
              </span>
            </div>
          </div>
          <div className='customer-search-result-accordion'>
            {customerKeys.map((seq) => {

              return (
                customerKeys[0] != seq ? <div key={seq} className='customer-search-result-accordion-row2' onClick={() => this.navigateToViewEditCustomer(customer, customer.addresses[seq], seq)}>
                  <div className='customer-search-result-accordion-spacer1'></div>

                  <div className="customer-search-result-panel-phone-accordian"><InputMask className="customer-search-result-phone" style={{ borderBottom: 'none' + '' }} mask={"(999) 999-9999"} maskChar={null} onChange='' value={customer.addresses[seq].phoneNumbers[0].phoneNumber} disabled /></div>
                  {/* <div className="customer-search-result-panel-phone"> {customer.addresses[seq].phoneNumber}</div> */}
                  <div className="customer-search-result-panel-email-accordian">{customer.EmailAddress}</div>
                  <div className="customer-search-result-panel-address-accordian">{customer.addresses[seq].addr1 + " " + customer.addresses[seq].addr2 + ", " + customer.addresses[seq].city + ", " + customer.addresses[seq].state + " " + customer.addresses[seq].zip}</div>
                  <div className='customer-search-result-accordion-spacer2'></div>
                </div> : null
              )
            })}
          </div>
        </div>);
    });

    //sets modal state + result array
    this.setState({
      searchResult: resultList,
      maxLimit_modal: true,
    }, function () {
      console.log('resultListlenght',resultList.length)
      if (resultList.length === 0) {
        if (this.state.getISellCustomerDetails.customerFirstName !== '') //Code only for iSell Cart Flow
        {
          this.props.sendCustomerDetailsToAddCustomerActionInvoker(this.state.getISellCustomerDetails);
        }
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
    const associatePin = this.props.login.userpin;//228697;

    this.props.startSpinner(true);

    this.props.getCustomers(query, associatePin);
  }
} //end of class

function mapStateToProps({ customerSearch, login, cart}) {
  return { customerSearch, login, cart }
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
      goToSalesPage: goToSalesPage,
      setSearchItem: setSearchItemAction,
      getIsellflowInvoker:getIsellflow,
      callErrorException : showException,
      sendCustomerDetailsToAddCustomerActionInvoker:sendCustomerDetailsToAddCustomerAction,
      itemSelectedAction : itemSelectedAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);