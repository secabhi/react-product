import React, { Component } from 'react'
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';

import IdleTimer from 'react-idle-timer';
import PostVoidDetails from './modules/post-void/postVoidDetails';
import PrintItemsList from './modules/print-send-receipt/PrintItemsList';

import Home from './modules/home/Home';
import AddCustomer from './modules/add-customer/BusinessLogic/AddCustomer';
import UpdateCustomer from './modules/update-customer/UpdateCustomerDomestic';
import UpdateCustomerInternational from './modules/update-customer/UpdateCustomerInternational';
import CustomerDetails from './modules/customer-details/CustomerDetails';
import InCircle from './modules/inCircle/Controller/InCircle';
import IncircleNonMember from './modules/incircle-non-member/IncircleNonMember';
import Sale from './modules/sale/Sale';
import LookupDummy from './modules/lookup-dummy/LookupDummy';
import ProductsDummy from './modules/products-dummy/ProductsDummy';
import AddCard from './modules/add-card/addCard';
import Payment from './modules/payment/Controller/payment';
import CustomerSearch from './modules/customer-search-sale/customersearchsale';
import ViewEditCustomer from './modules/viewedit-customer/Controller/vieweditCustomer';
import ViewEditCustomerSff from './modules/viewedit-customer-sff/Controller/vieweditCustomer';
import ProductSearch from './modules/product-search/ProductSearch';
import GiftWrap from './modules/sale/sale-services/sale-services-gift-wrap/GiftWrapContainer';
import Send from './modules/sale/sale-send/SendContainer';
import GiftCard from './modules/sale/sale-giftcard/GiftCardContainer';
import ProductDetails from "./modules/product-details/ProductDetails";
//import PurchaseDetails from "./modules/purchase-history/PurchaseDetails";
import Alterations from './modules/sale/sale-services/sale-services-alterations/AlterationsContainer';
import AccountLookup from './modules/account-lookup/accountLookup'
import PostVoidDetailssmallff from './modules/post-void/postvoiddetailsmallff';
//import PostVoidTransaction from './modules/post-void/post-void-transaction-model'
import Reminders from './modules/reminders/reminders'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {readStartUpFile} from './modules/common/helpers/helpers';
import ResumeTransactions from './modules/resume/resume-services-transactions/ResumeTransactionsContainer';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './store/store';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      timeout: 60000
    }
  }

  componentWillMount() {
          const CONFIG_FILE = require('./resources/stubs/config.json');

      var URL = CONFIG_FILE.initServiceURL;
      var functionalityId = CONFIG_FILE.timeoutFuncId;
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          "FunctionalityId" : functionalityId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {  return (response.json()) })
      .then((responseJSON) => {
        var timeoutValue = parseInt(responseJSON.timeout);
        this.setState({ timeout : timeoutValue });
      })

      function onBatteryStatus(status) {
        console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
      // this.setState({batteryStatus:status.level});
        store.dispatch({
          type : 'BATTERY_LEVEL',
          payload : {battery_level:status.level}
        });
      }
        
      if(window.cordova) {
        window.addEventListener("batterystatus",onBatteryStatus, false);
      } else {
        //Don't add battery status listener as we are running in browser
        console.log("Cordova not present - batterystatus");
        store.dispatch({
          type : 'BATTERY_LEVEL',
          payload : {battery_level:100}
        });
      }

   }//end of component will mount

  render() {
    return (
      <AppGlobalErrorHandler>
        <Provider store={store} >
          <HashRouter ref='routerRoot'>
            <IdleTimer
            ref="idleTimer"
            element={document}
            activeAction={this._onActive}
            idleAction={this._onIdle}
            timeout={this.state.timeout}
            startOnLoad={true}
            format="MM-DD-YYYY HH:MM:ss.SSS">
              <MuiThemeProvider>
                <div className="routerContainer">
                  <Route exact path="/" component={Home} />
                  <Route path="/add-card" component={AddCard}/>
                  <Route path="/add-customer" component={AddCustomer}/>
                  <Route path="/update-customer" component={UpdateCustomer} />
                  <Route path="/update-customerinternational" component={UpdateCustomerInternational} />
                  <Route path="/customer-details" component={CustomerDetails} />
                  <Route path="/incircle" component={InCircle} />
                  <Route path="/postvoiddetails" component={PostVoidDetails} />
                  <Route path="/print-send-receipt" component={PrintItemsList} />
                  <Route path="/sale" component={Sale} />
                  <Route path='/gift-wrap' component = {GiftWrap}/>
                  <Route path='/gift-wrap-com' component = {GiftWrap}/>
                  <Route path='/alterations' component = {Alterations}/>
                  <Route path="/products-dummy" component={ProductsDummy} />
                  <Route path="/lookup-dummy" component={LookupDummy} />
                  <Route path="/incircle-non-member" component={IncircleNonMember} />
                  <Route path="/customer-search" component={CustomerSearch} />
                  <Route path="/view-edit-customer" component={window.innerWidth<1920?ViewEditCustomerSff:ViewEditCustomer} />
                  <Route path="/payment" component={Payment} />
                  <Route path="/send" component={Send} />
                  <Route path="/gift-card" component={GiftCard} />
                  <Route path="/account-lookup" component={AccountLookup}/>
                  {/* <Route path='/postvoidtransactionmodel' component = {PostVoidTransaction}/>   */}
                  <Route path='/postvoiddetailsff' component = {PostVoidDetailssmallff}/>
                  <Route path="/product-search/:type?" component={ProductSearch}/>
                  <Route path="/product-details/:pimskuId" component={ProductDetails}/>
                  <Route path="/reminders" component ={Reminders} />
                  <Route path='/resume-transactions' component = {ResumeTransactions}/>
                  {/* <Route path='/purchase-history-details' component = {PurchaseDetails}/> */}

                </div>
              </MuiThemeProvider>
            </IdleTimer>
          </HashRouter>
        </Provider>
      </AppGlobalErrorHandler>
    );
  }

  _onActive = () =>
  {
    /* console.log('Active');
    console.log('getRemainingTime: ' + this.refs.idleTimer.getRemainingTime());
    console.log('getElapsedTime: ' + this.refs.idleTimer.getElapsedTime());
    console.log('isIdle: ' + this.refs.idleTimer.isIdle()); */
    // NOTHING TO BE DONE ON ACTIVE
  }

  /* _onIdle = () =>
  {

    console.log("Current Path | Navigate to home (bool) : ", this.refs.routerRoot.history.location.pathname," | ", (this.refs.routerRoot.history.location.pathname !== '/'));
    if(this.refs.routerRoot.history.location.pathname !== '/') //Navigate to home page, if not already on home page
    {
      alert("Sorry, your session has timed out due to inactivity");
      sessionStorage.setItem("loggedIn", "false");
      this.refs.routerRoot.history.push('/');
    }
  } */

  onBatteryStatus = (status) => {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
  }
}

class AppGlobalErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
  //  debugger;
  const CONFIG_FILE_BuildMode= require('./resources/stubs/config.json').buildMode;
    this.setState((prevState, props) => {
      return { hasError: !prevState.hasError,
        error : error, info :info, buildMode :CONFIG_FILE_BuildMode}
     // return { hasError: !prevState.hasError, error: error.message }
    });  
    console.log('componentDidCatch ErrorBoundary error:',error);
    console.log('componentDidCatch ErrorBoundary info:',info);
  }
  onCloseModal(){
    //alert('k')
    this.props.history('/')
  }

  showErrorModal() {
    // return (
    // <div><Modal
    //   open={this.state.hasError}
    //   onClose={this.onCloseModal}
    //   little
    //   showCloseIcon={true}
    //   classNames={{
    //     modal: 'errorHandler-modal'
    //   }}>
    //   <div className='errorHandler-modal' style={{ height: '300px', width: '500px' }}>

    //     <div className='errorHandler-modal-message-area' style={{ fontFamily: 'Roboto', fontSize: '32px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal', lineHeight: '1.19', letterSpacing: 'normal', textAlign: 'center', color: '#505050', marginTop: '20.5px' }}>
    //       <span className='errorHandler-modall-message'>Something went wrong.</span>
    //       {/* <span className='errorHandler-modall-message'>{this.state.error+' '+this.state.info}</span> */}
    //     </div>
    //     <div onClick={() => this.onCloseModal()}
    //        className='errorHandler-modal-ok-btn'
    //        style={{ backgroundColor: '#4b2b6f', color: 'white', fontFamily: 'Roboto', fontSize: '32px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal', lineHeight: '1.19', letterSpacing: 'normal', textAlign: 'center', marginTop: '230px', height: '40px', }}>
    //       <span className='errorHandler-modal-ok-btn-label'>OK</span>
    //       {/* <button onClick={() => console.log('button for cancel clicked')}>Cancel</button> */}
    //     </div>
    //   </div>
    // </Modal></div>)
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
     // console.log(this.refs.routerRoot);
      //window.location.reload(true);
      
        return (
          <div>
            <h1>OOPs! Something went wrong</h1>
            <h2>Error Message:</h2><span style={{ fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal', lineHeight: '1.19', letterSpacing: 'normal', textAlign: 'center', color: '#505050', marginTop: '20.5px' }}> {this.state.error.message}</span>
            { (this.state.buildMode == 'debug')?
              (<div>
                <h2>Error Stack: </h2><span style={{ fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal', lineHeight: '1.19', letterSpacing: 'normal', textAlign: 'center', color: '#505050', marginTop: '20.5px' }}>{this.state.error.stack}</span>
                <h2>Module Stack: </h2><span style={{ fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal', lineHeight: '1.19', letterSpacing: 'normal', textAlign: 'center', color: '#505050', marginTop: '20.5px' }}>{this.state.info.componentStack}</span>
              </div>)
              :'' }
          </div>
            )
    

     
    }
    return this.props.children;
  }
}

export default App;