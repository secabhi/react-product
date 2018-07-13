import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './transTaxExempt.css'

import trans_Modify from '../../../../resources/images/Trans_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../../resources/images/Cancel_Purple_SFF.svg';


export class TransTaxExempt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transtaxexempt: '',
            
        }
        this.TransTaxExemptSubmit = this.TransTaxExemptSubmit.bind(this);
    }

    updatetransTaxExemptEntry(e) {
        const { transtaxexempt } = this.state;
        this.setState({ transtaxexempt: e.target.value,
        });
        if ((e.target.value.length < 1)){
            document.getElementsByClassName("trans-tax-exempt-ok")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("trans-tax-exempt-ok")[0].disabled =  false;
        }
    }

    TransTaxExemptSubmit(e) {
        e.preventDefault();
        console.log('TransTaxExempt Update Update SUBMITING');
        this.props.transTaxExemptUpdate(this.state.transtaxexempt);
        this.props.showTransTaxExempt(false); 
    }

    
    render() {
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
            marginTop:'-12px'
        }

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '15.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '56px' : '65px',
            marginTop: (window.innerWidth > 1900) ? "20px" : "25px",
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
        }
        const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        


        return (
            <div className='trans-tax-exempt-container'>
                <img src={trans_Modify} className='trans-tax-exempt-icon' />
                <div className='trans-tax-exempt-label'>Tax Exempt</div>
                <form class="TransTaxExemptForm" onSubmit={(e) => { 
                    e.preventDefault();
                    this.TransTaxExemptSubmit(e) }}>
                    <TextField
                        required
                        type="text"
                        floatingLabelText="Enter Tax Exempt ID"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        fullWidth={true}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={textFieldUnderlineStyle}
                        style={textFieldStyle}
                        maxlength="16"
                        value={this.state.transtaxexempt.replace(/[^a-zA-Z0-9]+/ig, "")}
                        onChange={e => this.updatetransTaxExemptEntry(e)}
                    />
                    <div className="trans-tax-exempt-cancel" onClick={() => this.props.showTransTaxExempt(false)}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="trans-tax-exempt-cancel-btn">CANCEL</div>
                    </div>
                    <button className="trans-tax-exempt-ok" type="submit" disabled>OK</button>
                </form>
            </div>
        )
    }
};

export class TransTaxExemptSFF extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            transtaxexempt: '',
        }
        this.TransTaxExemptSubmit = this.TransTaxExemptSubmit.bind(this);
    }

    updatetransTaxExemptEntry(e) {
        const { transtaxexempt } = this.state;
        this.setState({ transtaxexempt: e.target.value,
        });
        if ((e.target.value.length < 1)){
            document.getElementsByClassName("trans-tax-exempt-ok-btn")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("trans-tax-exempt-ok-btn")[0].disabled =  false;
        }
    }

    TransTaxExemptSubmit(e) {
        e.preventDefault();
        console.log('TransTaxExempt Update Update SUBMITING');
        this.props.transTaxExemptUpdate(this.state.transtaxexempt);
    }

    render() {
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
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
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '56px' : '0px',
            marginTop: (window.innerWidth > 1900) ? "20px" : "133px",
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
        }
        const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "920px",
            backgroundColor: '#333333',
        }

        return (
            <div className='trans-tax-exempt-container'>
              <div className='trans-tax-exempt-label'>Trans Modify: Tax Exempt</div>
              <form class="TransTaxExemptForm" onSubmit={(e) => { 
                  e.preventDefault();
                  this.TransTaxExemptSubmit(e) }}>
              <TextField
                        required
                        type="text"
                        floatingLabelText="Enter Tax Exempt ID"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        fullWidth={true}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={textFieldUnderlineStyle}
                        style={textFieldStyle}
                        value={this.state.transtaxexempt}
                        maxlength="16"
                        onChange={e => this.updatetransTaxExemptEntry(e)}
                />
                <div className="trans-tax-exempt-buttons">
                <div className="trans-tax-exempt-canceldiv" onClick={() => {
                            this.setState({transtaxexempt : '',});
                            this.props.hideItemModifyModalSmallFF();
                        }}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className="trans-tax-exempt-cancel-btn">CANCEL</div>
                </div>
                <button className="trans-tax-exempt-ok-btn" type="submit" disabled>OK</button>
                </div>
              </form>
            </div>
        )
    }
};
