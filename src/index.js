import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { json2xml } from './modules/common/helpers/helpers'
//import {initAurus} from './';
import { connect } from 'react-redux'


const startApp = () => {
    const initJson = require('./resources/aurus/InitAdsdkRequest.json');
    const regJson = require('./resources/aurus/AESDKRegistrationRequest.json');
    var initReq=json2xml(initJson);
    var regReq=json2xml(regJson);
    //this.props.initAurus(initReq, 'INIT');
    //this.props.initAurus(regReq, 'AESDKREG');

    ReactDOM.render(<App />, document.getElementById('root'));
}

if (!window.cordova) {
    startApp()
} else {
    document.addEventListener('deviceready', startApp, false)
}


/* function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        initAurus: (data, type) => dispatch(initAurus(data, type))
    }
} 
export default connect(mapStateToProps, mapDispatchToProps);*/