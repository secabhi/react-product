import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import { TextField } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './accountlookupmodals.css';

import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'

import AccountLookupImg from '../../../resources/images/Account_Lookup.svg';

import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import arrowdownicon from '../../../resources/images/Arrow_Down.svg';
import Warning from '../../../resources/images/Warning.svg';

export default class ConfrimDetailsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const errorStyle = {
            bottom: '0',
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#d53560',
            lineHeight: '20px !important'
        }
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }

        const textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
            fontSize: "24px"
        }

        var underlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        return (
            <div>

                <img src={AccountLookupImg} className='confirm-details-modal-image' />
                <div className="confirm-details-modal-confirm-details-label">Confirm Details</div>
                <div className="confirm-details-modal-confirm-details-second-label">Are you sure this is</div>
                <div className="confirm-details-modal-confirm-details-customer">
                    {this.props.firstName} {this.props.lastName}<br />
                    {this.props.address1}<br />
                    {this.props.city} {this.props.zip}
                </div>
                <div className="confirm-details-modal-btn">
                    <div onClick={() => { this.props.closeconfirmdetails() }} className="confirm-details-modal-btn-cancel">

                        <div className="confirm-details-modal-btn-cancel-label">NO</div>
                    </div>
                    <div onClick={() => { this.props.storeCardData() }} className="confirm-details-modal-btn-next">
                        <div className="confirm-details-modal-btn-next-label">YES</div>
                    </div>
                </div>

            </div>
        );
    }
}