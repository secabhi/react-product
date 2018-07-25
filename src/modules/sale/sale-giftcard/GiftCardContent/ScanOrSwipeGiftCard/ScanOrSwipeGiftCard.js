import React, { Component } from 'react';
import './ScanOrSwipeGiftCard.css';

import {TextField} from 'material-ui';
import InputMask from 'react-input-mask';

export default class ScanOrSwipeGiftCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            giftCardNumber: ''
        }
    }

    render() {

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
            paddingLeft : (window.innerWidth > 1900) ? "10px" : "10px",
        }
        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '55px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }
        const underlineStyle = {
            borderColor: '#757575'
        }


        return (
        <div className="scan-or-swipe-container">

            <div className="scan-or-swipe-label">Scan or Swipe Gift Card</div>

            <div className="scan-or-swipe-label sub-label">OR</div>

            <TextField className="scan-or-swipe-textfield"
                value={this.state.giftCardNumber}
                onChange={(e) => {this.getGiftCardDetails(e)}}
                style={textFieldStyle}
                floatingLabelText="Gift Card Number"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                inputStyle = {textFieldInputStyle}
                underlineStyle= {underlineStyle}
            >
                <InputMask mask="9999 9999 9999 9999" maskChar=" " />
            </TextField>

        </div>
        )
    }


    getGiftCardDetails = (e) => {
        const cardNum = e.target.value;
        this.setState({giftCardNumber:cardNum});
        this.props.validateCard(cardNum);
        this.props.getCardNumber(cardNum);
    }

};
