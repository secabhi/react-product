import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';

import IdleTimer from 'react-idle-timer';
import PostVoidDetails from './modules/post-void/postVoidDetails';
import Home from './modules/home/Home';
import AddCustomer from './modules/add-customer/BusinessLogic/AddCustomer';
import UpdateCustomer from './modules/update-customer/UpdateCustomerDomestic';
import UpdateCustomerInternational from './modules/update-customer/UpdateCustomerInternational';
import CustomerDetails from './modules/customer-details/CustomerDetails';
import InCircle from './modules/inCircle/Controller/InCircle';
import IncircleNonMember from './modules/incircle-non-member/IncircleNonMember';
import Sale from './modules/sale/Sale';
import LookupDummy from './modules/lookup-dummy/LookupDummy';
// import ProductsDummy from './modules/products-dummy/controller/ProductsDummy';
import AddCard from './modules/add-card/addCard';
import Payment from './modules/payment/Controller/payment';
import CustomerDetailsInternational from './modules/customer-details-international/CustomerDetailsInternational';
import CustomerSearchResult from './modules/customer-search/customerSearchResult';
import CustomerSearch from './modules/customer-search-sale/customersearchsale';
import ViewEditCustomer from './modules/viewedit-customer/Controller/vieweditCustomer';
import ViewEditCustomerSff from './modules/viewedit-customer-sff/Controller/vieweditCustomer';
import ProductSearch from './modules/product-search/ProductSearch';
import GiftWrap from './modules/sale/sale-services/sale-services-gift-wrap/GiftWrapContainer';
import Send from './modules/sale/sale-send/SendContainer';
import ProductDetails from "./modules/product-details/ProductDetails";
import Alterations from './modules/sale/sale-services/sale-services-alterations/AlterationsContainer';
import PostVoidDetailssmallff from './modules/post-void/postvoiddetailsmallff';
//import PostVoidTransaction from './modules/post-void/post-void-transaction-model'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

    //window.cordova.plugins.nmplugin.returnANumber("<InitAdsdkRequest> <POSID> 006402</POSID> <APPID>402</APPID> <CCTID>402</CCTID> <ServerIP>10.198.5.203</ServerIP> <ServerPort>4060</ServerPort> </InitAdsdkRequest>");
  }

  render() {
    return (
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
                <Route path="/customer-search-result" component={CustomerSearchResult} />
                <Route path="/customer-details-international" component={CustomerDetailsInternational} />
                <Route path="/incircle" component={InCircle} />
                <Route path="/postvoiddetails" component={PostVoidDetails} />
                <Route path="/sale" component={Sale} />
                <Route path='/gift-wrap' component = {GiftWrap}/>
                <Route path='/alterations' component = {Alterations}/>
                {/* <Route path="/products-dummy" component={ProductsDummy} /> */}
                <Route path="/lookup-dummy" component={LookupDummy} />
                <Route path="/incircle-non-member" component={IncircleNonMember} />
                <Route path="/customer-search" component={CustomerSearch} />
                <Route path="/view-edit-customer" component={window.innerWidth<1920?ViewEditCustomerSff:ViewEditCustomer} />

                <Route path="/payment" component={Payment} />
                <Route path="/send" component={Send} />
                 {/* <Route path='/postvoidtransactionmodel' component = {PostVoidTransaction}/>   */}
                 <Route path='/postvoiddetailsff' component = {PostVoidDetailssmallff}/>
                 <Route path="/product-search/:type?" component={ProductSearch}/>
                 <Route path="/product-details/:pimskuId" component={ProductDetails}/>


              </div>
            </MuiThemeProvider>
          </IdleTimer>
        </HashRouter>
      </Provider>
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

}

export default App;
