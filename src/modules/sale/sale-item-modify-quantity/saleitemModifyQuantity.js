import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './saleitemModifyQuantity.css'

import item_Modify from '../../../resources/images/Item_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';

export class SaleItemModifyQuantity extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModiyQuantity
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',

        }
        this.SaleItemModifyQuantitySubmit = this.SaleItemModifyQuantitySubmit.bind(this);
    }

    SaleItemModifyQuantitySubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING');
        this.props.saleitemModifyQuantityUpdate(this.state.quantityitem);
        this.props.showQuantityModal(false);  
    }

    updateQuantityEntry(e) {
        const qtypattern = /^[0-9\b]+$/;
        const { quantityitem } = this.state;
        this.setState({ quantityitem: e.target.value })
       
        if((e.target.value <1 || (qtypattern.test(e.target.value)) < 1) && (e.target.value) !=""){
            
            document.getElementById("sale-item-modify-quantity-negative-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled = true;

        }
       else if ((e.target.value > 9999) || (qtypattern.test(e.target.value)) > 9999   ) {
            document.getElementById("sale-item-modify-quantity-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled = true;
        }
        else {
            document.getElementById("sale-item-modify-quantity-negative-error").style.display = "none";
            document.getElementById("sale-item-modify-quantity-error").style.display = "none";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled =  false;
        }
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
            <div className='sale-item-modify-quantity-container'>
                <img src={item_Modify} className='sale-item-modify-quantity-icon' />
                <div className='sale-item-modify-quantity-label'>Quantity</div>
                <form class="SaleItemModifyQuantityForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.SaleItemModifyQuantitySubmit(e)}}>
                    <TextField
                        required
                        type="number"
                        floatingLabelText="Enter Quantity"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        fullWidth={true}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={textFieldUnderlineStyle}
                        style={textFieldStyle}
                        value={this.state.quantityitem}
                        onChange={e => this.updateQuantityEntry(e)}
                    />
                    <p id="sale-item-modify-quantity-error" className="sale-item-modify-quantity-error">Quantity must be between 1 and 9999</p>
                    <p id="sale-item-modify-quantity-negative-error" className="sale-item-modify-quantity-negative-error">Quantity not valid.</p>
                    <div className="sale-item-modify-quantity-cancel" onClick={() => this.props.showQuantityModal(false)}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="sale-item-modify-quantity-cancel-btn">CANCEL</div>
                    </div>
                    <button className="sale-item-modify-quantity-ok" type="submit" disabled>OK</button>
                </form>
            </div>
        )
    }
};

export class SaleItemModifyQuantitySFF extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModiyQuantity
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',

        }
        this.SaleItemModifyQuantitySubmit = this.SaleItemModifyQuantitySubmit.bind(this);
    }
    SaleItemModifyQuantitySubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING');
        this.props.saleitemModifyQuantityUpdate(this.state.quantityitem);
        this.setState({ quantityitem:''})
    }

    updateQuantityEntry(e) {
        const qtypattern = /^[0-9\b]+$/;
        const { quantityitem } = this.state;
        this.setState({ quantityitem: e.target.value })
      
             if((e.target.value <1 || (qtypattern.test(e.target.value)) < 1) && (e.target.value) !=""){
          
           document.getElementById("sale-item-modify-quantity-negative-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok-btn")[0].disabled = true;

         }
      else if ((e.target.value > 9999) || (qtypattern.test(e.target.value)) > 9999   ) {
            document.getElementById("sale-item-modify-quantity-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok-btn")[0].disabled = true;
        }
        else {
            document.getElementById("sale-item-modify-quantity-negative-error").style.display = "none";
            document.getElementById("sale-item-modify-quantity-error").style.display = "none";
         document.getElementsByClassName("sale-item-modify-quantity-ok-btn")[0].disabled =  false;
        }
    }

    render() {
        const quantitytextFieldFloatingLabelStyle = {
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

        const quantitytextFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '56px' : '0px',
            marginTop: (window.innerWidth > 1900) ? "20px" : "70px",
            marginLeft: (window.innerWidth > 1900) ? "0px" : "30px",
        }

        const quantitytextFieldInputStyle = {

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
        const quantitytextFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "920px",
            backgroundColor: '#333333',
        }

        return (
            <div className='sale-item-modify-quantity-container'>
              <div className='sale-item-modify-quantity-label'>Quantity</div>
              <form class="SaleItemModifyQuantityForm" onSubmit={(e) => {
                  e.preventDefault();
                  this.SaleItemModifyQuantitySubmit(e)}}>
                <TextField
                  id="quantityfield"
                  required
                  type="number"
                  floatingLabelText="Enter Quantity"
                  floatingLabelStyle={quantitytextFieldFloatingLabelStyle}
                  fullWidth={true}
                  inputStyle={quantitytextFieldInputStyle}
                  underlineStyle={quantitytextFieldUnderlineStyle}
                  style={quantitytextFieldStyle}
                  value={this.state.quantityitem}
                  onChange={e => this.updateQuantityEntry(e)}
                />
                <p id='sale-item-modify-quantity-error' className="sale-item-modify-quantity-error">Quantity must be between 1 and 9999</p>
                <p id="sale-item-modify-quantity-negative-error" className="sale-item-modify-quantity-negative-error">Quantity not valid.</p>
                <div className="sale-item-modify-quantity-buttons">
                <div className="sale-item-modify-quantity-canceldiv" onClick={() => {
                            this.setState({quantityitem : '',});
                            this.props.hideItemModifyModalSmallFF();
                        }}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className="sale-item-modify-quantity-cancel-btn">CANCEL</div>
                </div>
                <button className="sale-item-modify-quantity-ok-btn" type="submit" disabled>OK</button>
                </div>
              </form>
            </div>
        )
    }
};

