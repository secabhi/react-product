/* Importing the required libraries and plugins*/

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Importing the local files*/

import './Styles/footer.css';
import FooterDateTime from '.././footerDateTime.js'

/* Importing the resource images and icons*/

import neimanlogo from '../../../../resources/images/NeimanWhiteLogo.svg';
import statuslogo from '../../../../resources/images/Status_Green.svg'
import Spinner from '../../loading/spinner';

export default class FooterView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="backgroundfooter">
                <Spinner />
                {/*
                    (window.innerWidth > 1900) ?
                        (
                            <div className="logo-container">
                                <img src={neimanlogo} className="logo-width" alt="neiman-logo" />
                            </div>
                        ) :
                        (null)
                    */}
                {
                    (window.innerWidth > 1900) ?
                        (<div className="left-spacer"></div>) :
                        (null)
                }

                <div className="footerText">
                    <div className="register-details-label sff-reg-number">0010/0243{this.props.getTransactioText(this.props.hideTransactionId)}</div>
                    <div className="register-details-label sff-reg-open">Open</div>
                    <div className="register-details-label sff-reg-ready">Ready</div>
                    <div className="register-details-label sff-reg-version">v128.31</div>
                    <div className="register-details-label sff-reg-online">Online</div>
                    <img src={statuslogo} className="status-logo-width" alt="status-logo" />

                </div>
                {
                    (window.innerWidth > 1900) ?
                        (<div className="right-spacer"></div>) :
                        (null)
                }
                <FooterDateTime />
            </div>
        );
    }
}
