import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './modalComponent.css';

import keypad from '../../../resources/images/Keypad_Grey.svg';
import warning from '../../../resources/images/Warning.svg';
import scanner from '../../../resources/images/Scan_Item.svg';
import scannerBtnImg from '../../../resources/images/Scan_Item_Selected.svg';
import voidLineWarningIcon from '../../../resources/images/Warning.svg';
import itemModifyImage from '../../../resources/images/Item_Modify_Black.svg';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import transModifyImage from '../../../resources/images/Trans_Modify.svg';




export class AddSkuModal extends Component {
    constructor(props) {
        super(props)
        this.state= {
            sku: ''
        }
    }

    updateSkuEntry(e) {
        if(e.target.value.length <= 12){
            this.setState({sku: e.target.value})
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
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
    }


    return (
 
        <div className="key-sku-modal-container">
          <form onSubmit={(event) => {
			  event.preventDefault();
			  this.props.do(this.state.sku)}
		  }>
          <img src={keypad} className='key-sku-modal-icon'/>
          <div className='key-sku-modal-label'>Key SKU</div>
          <div className='key-sku-modal-message'>Please enter SKU Number to Add Items</div>

            <TextField className="key-sku-modal-textfield"
                //maxLength='2' 
                onChange={e => this.updateSkuEntry(e)}
                value={this.state.sku} 
                type="number"
                floatingLabelText="Enter SKU or dept#"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                style = {textFieldStyle}
                 //fullWidth = {true} 
                inputStyle = {textFieldInputStyle}
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                }}
                min={0}
                refs="sku-modal" 
                required
                />


            <div className="key-sku-modal-link"><a>Select Dept</a></div>
            <button className='key-sku-modal-button' type="submit">
                <span className="key-sku-button-text">Submit</span>
            </button> 
            </form>
        </div>

      
    )
  }
};

export const WarningCountModal = (props) => {
    return(
        <div className="max-warning-modal-flex">
             <div className="max-warning-modal-container-img">
                <img src={warning}></img>
            </div>
            <div className="max-warning-modal-container-text">
                <div>Too many items.</div><div> You have reached a limit of {props.MAX_ITEM_COUNT} line items,<div> only 5 more lines available</div></div>
            </div> 
            <button className="max-warning-modal-button" type="button" onClick={() => props.done()}><div className="max-warning-button-text">Close</div></button>
        </div>
    )
}


export const SearchModal = (props) => {
    return (
        <div>
            <h3> IT'S IN DEVELOPMENT DUMMY!</h3>
        </div>
    )
}


export const MaxItemCountModal = (props) => {
    return (
        // <div className="max-count">
        //     <h3>Max number of items have been reached</h3>
        //     <button type="button" onClick={() => props.done()}>OK</button>
        // </div>

        <div className="max-warning-modal-flex">
             <div className="max-warning-modal-container-img">
                <img src={warning}></img>
            </div>
            <div className="max-number-modal-container-text">
                <div>Max number of items have been reached</div>
            </div> 
            <button className="max-limit-modal-button" type="button" onClick={() => props.done()}><div className="max-warning-button-text">Close</div></button>
        </div>
    )
}


export const TaxAttemptModal = (props) => {
    return (
        <div className="max-warning-modal-flex">
             <div className="max-warning-modal-container-img">
                <img src={warning}></img>
            </div>
            <div className="tax-exempt-already-modal-container-text">
                <div>Tax Exempt Already Done</div>
            </div> 
            <button className="tax-exempt-already-modal-button" type="button" onClick={() => props.done()}><div className="tax-exempt-already-button-text">CLOSE</div></button>
        </div>
    )
}

export const ScannerNotDockedModal = (props) => {
    return (
        // <div className="max-count">
        //     <h3>Max number of items have been reached</h3>
        //     <button type="button" onClick={() => props.done()}>OK</button>
        // </div>

        <div className="scanner-notDocked-modal-flex">
             <div className="scanner-notDocked-modal-container-img">
                <img src={scanner}></img>
            </div>
            <div className="scanner-notDocked-modal-container-title">
                <div>Scanner Not Docked</div>
            </div> 
            <div className="scanner-notDocked-modal-container-text">
                <div>Check if scanner is docked to device OR Use device Scanner</div>
            </div>
            <button className="scanner-notDocked-modal-button" type="button" onClick={() => props.done()}>
                <img className="scanner-notDocked-button-img" src={scannerBtnImg}/>
                <div className="scanner-notDocked-button-text">USE DEVICE SCANNER</div>
            </button>
        </div>
    )
}

export const VoidLineConfirmModal = (props) => {
    return (
        <div className="void-line-modal-inner-container">
            <div className="void-line-warning-icon-container">
                <img src={voidLineWarningIcon} alt="warning-icon" className="void-line-warning-icon" />
            </div>
            <div className="void-line-confirm-msg">Are you sure you want to line void the item?</div>
            <div className="void-line-button-container">
                <div className="void-line-no-button">
                    <div className="void-line-no-label" onClick={() => {
                        props.showVoidLineConfirmModal(false,'');
                    }}>NO</div>
                </div>
                <div className="void-line-yes-button">
                    <div className="void-line-yes-label"onClick={() => {
                        console.log("MODAL props.item: ", props.item)
                        props.voidLineItem(props.item);
                        props.showVoidLineConfirmModal(false,'');
                    }}>YES</div>
                </div>
            </div>
        </div>
    )
}

export class ModifyPriceModal extends Component {
    constructor(props) {
        super(props);

        this.state= {
            fieldValue : '',
            errorText : '',
            buttonEnabled : false
        }
    }

    componentDidMount() {
        console.log('componentDidMount ModifyPriceModal this.props ',this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ModifyPriceModal nextProps ',nextProps);
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

    render() {

        var textFieldStyle = {
            height: '85px',
            paddingTop: '10px',
            fontSize: '32px', 
            color: '#828282'
        }
    
        var textFieldFloatingLabelStyle = {
            height: '37px',    
            fontFamily: 'Roboto',
            fontSize: '30px',
            fontWeight: '300',
            fontStyle: 'normal',            
            letterSpacing: 'normal',            
            textAlign: 'left',
            color: '#333333'
        }

        var errorStyle= {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: '22px',
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

        return (<div className="modify-price-modal-inner-container">
            <div className="modify-price-item-modify-icon-container">
                <img className="modify-price-item-modify-icon" src={itemModifyImage} alt="item-modify-image" />
            </div>
            <div className="modify-price-item-modify-title-container">
                <div className="modify-price-item-modify-title">{this.props.title}</div>
            </div>
            <div className="modify-price-item-modify-text-field-container">
                <div className="modify-price-item-modify-text-field">
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
            <div className="modify-price-item-modify-buttons-container">
                <div onClick={() => {
                    this.props.showItemModifyPriceModal(false,'','');
                }} className="modify-price-item-cancel-button">
                    <div className="modify-price-item-cancel-button-icon-container">
                        <img className="modify-price-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="modify-price-item-cancel-button-text">CANCEL</div>                
                </div>
                <div onClick={() => {
                    if(this.state.buttonEnabled) {
                        this.modifyPrice();
                    }
                    else {
                        //DO NOTHING
                    }
                    //this.props.showItemModifyPriceModal(false,'','');
                }} className="modify-price-item-ok-button" style={(this.state.buttonEnabled)?enabledButtonStyle:disabledButtonStyle}>
                    <div className="modify-price-item-ok-button-text">OK</div>
                </div>
            </div>
        </div>);
    }
}

export class ManagerApprovalModal extends Component {
    constructor(props) {
        super(props);

        this.state= {
            fieldValue : ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount ManagerPINModal this.props ',this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ManagerPINModal nextProps ',nextProps);
    }

    handleTextFieldChange = (event) => {
        this.setState({ fieldValue : event.target.value });
    }

    validateManagerApproval = () => {
        this.props.validateManagerApproval(this.state.fieldValue);   
    }

    render() {

        var textFieldStyle = {
            height: (window.innerWidth>1900)?'85px':'100px',
            paddingTop: '10px',
            fontSize: (window.innerWidth>1900)?'32px':'56px', 
            color: '#828282'
        }
    
        var textFieldFloatingLabelStyle = {
            height: (window.innerWidth>1900)?'37px':'74px',    
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth>1900)?'30px':'56px',
            fontWeight: '300',
            fontStyle: 'normal',            
            letterSpacing: 'normal',            
            textAlign: 'left',
            color: '#333333'
        }

        var errorStyle= {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth>1900)?'22px':'34px',
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

        return (<div className="modify-price-modal-inner-container">
            <div className="modify-price-item-modify-icon-container">
                <img className="modify-price-item-modify-icon" src={itemModifyImage} alt="item-modify-image" />
            </div>
            <div className="modify-price-item-modify-title-container">
                <div className="modify-price-item-modify-title">Enter Manager PIN to continue</div>
            </div>
            <div className="modify-price-item-modify-text-field-container">
                <div className="modify-price-item-modify-text-field">
                    <TextField
                        type="number"
                        floatingLabelText = "Enter Manager Approval PIN"
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
            <div className="modify-price-item-modify-buttons-container">
                <div onClick={() => {
                    this.props.showManagerApprovalModal(false,'',this.props.activeModifyPriceOption);
                }} className="modify-price-item-cancel-button">
                    <div className="modify-price-item-cancel-button-icon-container">
                        <img className="modify-price-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="modify-price-item-cancel-button-text">CANCEL</div>                
                </div>
                <div onClick={() => {
                    this.validateManagerApproval();
                    //this.props.showItemModifyPriceModal(false,'','');
                }} className="modify-price-item-ok-button">
                    <div className="modify-price-item-ok-button-text">OK</div>
                </div>
            </div>
        </div>);
    }
}

export class ModifyPriceErrorModal extends Component {
    constructor(props) {
        super(props);

        this.state= {
            
        }
    }

    render() {

        return (<div className="modify-price-error-modal-inner-container">
            <div className="modify-price-error-icon-container">
                <img alt="warning-icon" className="modify-price-error-icon" src={require('../../../resources/images/Warning.svg')}/>
            </div>
            <div className="modify-price-error-text-container">
                <div className="modify-price-error-text">{this.props.errorText}</div>
            </div>
            <div className="modify-price-error-button-container" onClick={() => {
                this.props.showModifyErrorModal(false,'');
            }}>
                <div className="modify-price-error-ok-button">OK</div>
            </div>
        </div>);
    }
}
export class AmountToBeEnteredModal extends Component {
    constructor(props) {
        super(props);

        this.state= {
           
        }
    }

    handleamountchange = (event, index, value) => {
        if (event.target.value) {
            if (window.innerWidth > 1900) {


                document.getElementsByClassName('Ok-button-area')[0].style.opacity = "1";
                document.getElementsByClassName('Ok-button-area')[0].classList.remove('button-disabler');



            }
            else {
                document.getElementsByClassName('Ok-button-area')[0].style.opacity = "1";
                document.getElementsByClassName('Ok-button-area')[0].classList.remove('button-disabler');
            }
        }
        else {
            //DO NOTHING
        }



    }
    render() {

        var textFieldStyle = {
            height: (window.innerWidth>1900)?'85px':'100px',
            paddingTop: '10px',
            fontSize: (window.innerWidth>1900)?'32px':'56px', 
            color: '#828282'
            
        }
    
        var textFieldFloatingLabelStyle = {
            height: (window.innerWidth>1900)?'37px':'74px',    
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth>1900)?'30px':'56px',
            fontWeight: '300',
            fontStyle: 'normal',            
            letterSpacing: 'normal',            
            textAlign: 'left',
            color: '#333333'
        }

        var errorStyle= {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth>1900)?'22px':'34px',
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

        return (<div className="amount-to-be-entered-modal">
            <div className="enter-amount-icon"> <img className="enter-amt-icon" src={itemModifyImage} alt="enter-amount" /></div>
            <div className="enter-amount-label">Enter Amount</div>
            <div className="modify-amount-item-modify-text-field">
                    <TextField
                        type="number"
                        floatingLabelText = "Price"
                        floatingLabelStyle = {textFieldFloatingLabelStyle} 
                        underlineStyle = {underlineStyle}
                        errorStyle = {errorStyle}                                   
                        style = {textFieldStyle}
                        fullWidth = {true}
                        onChange={this.handleamountchange}
                       
                    />
            <div className="amount-to-be-entered-button-area">
            <div className="cancel-button-area" onClick={() => {
                this.props.amount_to_be_inserted_modal(false);}}><img className="modify-amount-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" /><div className="modify-amount-cancel-label">CANCEL</div></div>
            <div className="Ok-button-area button-disabler"><div className="modify-amount-ok-label">OK</div></div>
            </div>
                </div>
        </div>);
    }
}