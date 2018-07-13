import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { json2xml } from './modules/payment/Controller/converter'

const startApp = () => {
    const initJson = require('./resources/aurus/InitAdsdkRequest.json');
    const regJson = require('./resources/aurus/AESDKRegistrationRequest.json');
    this.getCardBinJson = require("./resources/aurus/GetCardBINRequest.json");
    this.bypassJson = require("./resources/aurus/BypassScreen.json");

    ReactDOM.render(<App />, document.getElementById('root'));
}

if (!window.cordova) {
    startApp()
} else {
    document.addEventListener('deviceready', startApp, false)
}