import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import warningImage from '../../../resources/images/Warning.svg';

import './sale-item-modify-price.css';

export class SaleItemModifyPriceSFF extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fieldValue : '',
            errorText : '',
            buttonEnabled : false
        }
    }

    componentDidMount() {
        console.log('componentDidMount SaleItemModifyPriceSFF this.props ',this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps SaleItemModifyPriceSFF nextProps ',nextProps);
        this.setState({ fieldValue : nextProps.saleItemModifyPriceSFFValue })
    }

    handleTextFieldChange = (event) => {
        var validValueCheckFlag = false;
        var fieldValue = event.target.value;
        if(this.props.title === "Price : Mkd % Off") {
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Mkd $ Off") {           
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Price Override") {
            //No Validation
            validValueCheckFlag = true;
        }
        else if(this.props.title === "Price : Mkd New Price") {
            //No Validation
            validValueCheckFlag = true;
        }
        else if(this.props.title === "Price : Omni Mkd % Off") {
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Omni Mkd $ Off") {
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Omni Mkd New Price") {
            //No Validation
            validValueCheckFlag = true;
        }
        else {
            //DO NOTHING
        }
        this.setState({ fieldValue : event.target.value, 
            errorText : (validValueCheckFlag)?"":"Please enter a valid value",
            buttonEnabled : (validValueCheckFlag)?true:false
        });
    }

    modifyPrice = () => {
        //this.props.showManagerApprovalModal(true,this.props.title);
        var showManagerModalFlag = false;
        var itemPrice = this.props.item.itemPrice;
        var fieldValue = this.state.fieldValue;
        var validValueCheckFlag = false;
        if(this.props.title === "Price : Mkd % Off") {            
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDPEROFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = itemPrice - ((fieldValue/100)*itemPrice);
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Mkd $ Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDDOLOFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = itemPrice - fieldValue;
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }            
            if(fieldValue > 0 && fieldValue <= 100 && fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Price Override") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_PRICEOVERRIDE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = fieldValue;
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Mkd New Price") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDNEWPRICE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = fieldValue;
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Omni Mkd % Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDPEROFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = itemPrice - ((fieldValue/100)*itemPrice);
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Omni Mkd $ Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDDOLOFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = itemPrice - fieldValue;
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue > 0 && fieldValue <= 100 && fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if(this.props.title === "Price : Omni Mkd New Price") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDNEWPRICE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage/100)*itemPrice);
            var discountedPrice = fieldValue;
            if(discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else 
            {
                showManagerModalFlag = false;
            }
            if(fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else {
            //DO NOTHING
        }

        if(validValueCheckFlag) {
            if(showManagerModalFlag === false) {
                this.props.modifyPrice(this.state.fieldValue,this.props.title); 
            }
            else {
                this.props.showManagerApprovalModal(true,this.state.fieldValue,this.props.title);
            }
        }
        else {
            this.setState({ errorText : "Discount not allowed" });
        }
    }

    hideItemModifyModalSmallFF = () => {
        this.setState({ fieldValue : '', errorText: '' });
        this.props.hideItemModifyModalSmallFF();
    }

    render(){
        var textFieldStyle = {
            height: '100px',
            paddingTop: '20px',
            fontSize: '48px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            color: '#333333'
        }
    
        var textFieldFloatingLabelStyle = {
            height: '37px',    
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '300',
            fontStyle: 'normal',            
            letterSpacing: 'normal',            
            textAlign: 'left',
            color: '#333333',
            paddingBottom: '20px'
        }

        var errorStyle= {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: '34px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textAlign: 'right',
            color: '#d53560',
            bottom:'-20px',
            right:'20px'
        }
    
        var underlineStyle= {
            backgroundColor: '#828282'            
        }

        var disabledButtonStyle = {
            opacity : 0.4
        }

        var enabledButtonStyle = {
            opacity : 1
        }

        return (
            <div className="sff-sale-item-modify-price-inner-container">
                <div className="sff-sale-item-modify-price-title-container">
                    <div className="sff-sale-item-modify-price-title">
                        {this.props.title}
                    </div>
                </div>
                <div className="sff-sale-item-modify-price-text-field-container">
                    <div className="sff-sale-item-modify-price-text-field">
                        <TextField
                            type="number"
                            floatingLabelText = {this.props.placeholder}
                            floatingLabelStyle = {textFieldFloatingLabelStyle} 
                            underlineStyle = {underlineStyle}
                            errorStyle = {errorStyle}                                   
                            style = {textFieldStyle}
                            fullWidth = {true}
                            onChange={this.handleTextFieldChange}
                            errorText= {this.state.errorText}
                            value = {this.state.fieldValue}
                        />
                    </div>
                </div>
                <div className="sff-sale-item-modify-price-buttons-container">
                    <div className="sff-modify-price-item-cancel-button" onClick = {() => {
                        this.hideItemModifyModalSmallFF();
                    }}>
                        <div className="sff-modify-price-item-cancel-button-icon-container">
                            <img className="sff-modify-price-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                        </div>
                        <div className="sff-modify-price-item-cancel-button-text">CANCEL</div>                
                    </div>
                    <div onClick={() => {
                        if(this.state.buttonEnabled) {
                            this.modifyPrice();
                        }
                        else {
                            //DO NOTHING
                        }
                        //this.props.showItemModifyPriceModal(false,'','');
                    }} className="sff-modify-price-item-ok-button" style={(this.state.buttonEnabled)?enabledButtonStyle:disabledButtonStyle}>
                        <div className="sff-modify-price-item-ok-button-text">OK</div>
                    </div>
                </div>
            </div>
        );
    }
}