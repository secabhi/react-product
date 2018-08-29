import React, { Component } from 'react'
import Modal from 'react-responsive-modal';

import './accountlookupmodals.css';

import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import Warning from '../../../resources/images/Warning.svg';

class CardDetailsModal extends Component {

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

                <img src={Warning} className='carddetails-modal-image' />
                <div className="carddetails-modal-label">Continue tendering with this card?</div>
                <div className="carddetails-modal-message">NM CHARGE XXXXXXXX1234</div>
                <div className="carddetails-details-modal-btn">
                    <div onClick={() => { this.props.setUseStoredCard(false); this.props.closetenderingCard(); }} className="carddetails-details-modal-btn-cancel">
                        <div className="carddetails-details-modal-btn-cancel-label">NO</div>
                    </div>
                    <div onClick={() => { this.props.setUseStoredCard(true); }} className="carddetails-details-modal-btn-next">
                        <div className="carddetails-details-modal-btn-next-label">YES</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CardDetailsModal