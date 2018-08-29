import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './modalComponent.css';
import '../sale-container.css';
import keypad from '../../../resources/images/Keypad_Grey.svg';
import warning from '../../../resources/images/Warning.svg';
import scanner from '../../../resources/images/Scan_Item.svg';
import scannerBtnImg from '../../../resources/images/Scan_Item_Selected.svg';
import voidLineWarningIcon from '../../../resources/images/Warning.svg';
import itemModifyImage from '../../../resources/images/Item_Modify_Black.svg';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import transModifyImage from '../../../resources/images/Trans_Modify.svg';
import { validateDecimal, validateNonDecimalNumber } from '../../common/helpers/helpers';
import { amountValidation } from '../../common/helpers/helpers';
import CrossBlack from '../../../resources/images/Cross_Black.svg';



export class AddSkuModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sku: ''
                   }
    }

    updateSkuEntry(e) {
        if (e.target.value.length <= 12) {
            this.setState({ sku: e.target.value })
            this.props.changeSku()
                    }
    }

    render() {
        const errorSkuStyle = {
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
        }


        return (

            <div className="key-sku-modal-container">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.do(this.state.sku)
                }
                }>
                   <span className="closeModalLogin"><img className="close-icon-login-modal" src={CrossBlack} onClick={this.props.done}></img></span>
                    <img src={keypad} className='key-sku-modal-icon' />
                    <div className='key-sku-modal-label'>Key ln SKU</div>
                    <div className='key-sku-modal-message'>Please enter SKU Number to Add Items</div>

                    <TextField className="key-sku-modal-textfield"
                        //maxLength='2' 
                        onChange={e => this.updateSkuEntry(e)}
                        value={this.state.sku}
                        type="number"
                        floatingLabelText="SKU Number"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        errorText={this.props.skuError}
                        errorStyle={errorSkuStyle}
                        //fullWidth = {true} 
                        inputStyle={textFieldInputStyle}
                        onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                        }}
                        min={0}
                        refs="sku-modal"
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                this.props.do(this.state.sku)
                                }
                            }}
                        
                    />


            <div className="key-sku-modal-link"><a onClick={() => this.props.showDeptKeyModal(true)}>Key Dept</a></div>
            <button className='key-sku-modal-button' type="submit">
                <span className="key-sku-button-text">Submit</span>
            </button> 
            </form>
        </div>




        )
    }
};

export const WarningCountModal = (props) => {
    return (
        <div className="max-warning-modal-flex">
            <div className="max-warning-modal-container-img">
                <img src={warning}></img>
            </div>
            <div className="max-warning-modal-container-text">
                <div>Too many line items.</div><div> You have reached a limit of {props.MAX_ITEM_COUNT} line items,<div> only {props.REMAINING_COUNT} more lines available. </div></div>
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
            <div className="max-number-modal-container-text" style={{ fontSize: '27px' }}>
                <div>Max number of items have been reached</div>
            </div>
            <button className="max-limit-modal-button" type="button" onClick={() => props.done()}><div className="max-warning-button-text">Close</div></button>
       </div>
   )
}


export const QuantityInfoModal = (props) => {	
   return (
       <div className="max-warning-modal-flex">
           <div className="max-warning-modal-container-img">
               <img src={warning}></img>
           </div>
           <div className="max-number-modal-container-text" style={{ fontSize: '27px' }}>
               <div>Quantity is not updated.</div>
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
                <div>Tax mod already applied to this transaction</div>
            </div>
            <button className="tax-exempt-already-modal-button" type="button" onClick={() => props.done()}><div className="tax-exempt-already-button-text">CLOSE</div></button>
        </div>
    )
}

export const CartWarningModal = (props) => {
    return (
        <div className='cart-to-home-warning-modal-container'>
                <div className="cart-to-home-warning-icon"><img className='sale-errorModal-icon' src={warning} /></div>
                <div className="modal_items_handled_text">Are you sure you want to cancel the transaction?</div>

                <div className="cart-to-home-warning-return-ok-btns">
                  <div className="cart-to-home-no-btn" onClick={() => props.closeCarttoHomeErrorModal()}><div className="cart-to-home-no-btn-text">NO</div></div>
                  <button className="cart-to-home-yes-btn" type="submit" onClick={() => props.navigateToHomeReturn()}><div className="cart-to-home-yes-btn-text">YES</div></button>
                </div>
        </div>
        // <div className="max-warning-modal-flex">
        //     <div className="max-warning-modal-container-img">
        //         <img src={warning}></img>
        //     </div>
        //     <div className="cart-warning-modal-container-text">
        //         <div>Items were there in the cart</div>
        //     </div>
        //     <button className="tax-exempt-already-modal-button" type="button" onClick={() => props.closeCarttoHomeErrorModal()}><div className="tax-exempt-already-button-text">CLOSE</div></button>
        // </div>
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
                <img className="scanner-notDocked-button-img" src={scannerBtnImg} />
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
                        props.showVoidLineConfirmModal(false, '');
                    }}>NO</div>
                </div>
                <div className="void-line-yes-button">
                    <div className="void-line-yes-label" onClick={() => {
                        console.log("MODAL props.item: ", props.item)
                        props.voidLineItem(props.item);
                        props.showVoidLineConfirmModal(false, '');
                    }}>YES</div>
                </div>
            </div>
        </div>
    )
}

export class ModifyPriceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldValue: '',
            errorText: '',
            buttonEnabled: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount ModifyPriceModal this.props ', this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ModifyPriceModal nextProps ', nextProps);
    }

    handleTextFieldChange = (event) => {
        var validValueCheckFlag = false;
        var fieldValue = event.target.value;
        if (this.props.title === "Price : Mkd % Off") {
            if (fieldValue > 0 && fieldValue <= 100 && validateNonDecimalNumber(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Mkd $ Off") {
            if (validateDecimal(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Price Override") {
            if (validateDecimal(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Mkd New Price") {
            if (validateDecimal(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd % Off") {
            if (fieldValue > 0 && fieldValue <= 100 && validateNonDecimalNumber(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd $ Off") {
            if (validateDecimal(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd New Price") {
            if (validateDecimal(fieldValue)) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else {
            //DO NOTHING
        }
        this.setState({
            fieldValue: event.target.value,
            errorText: (validValueCheckFlag) ? "" : "Please enter a valid value",
            buttonEnabled: (validValueCheckFlag) ? true : false
        });
    }

    handleKeyUp = (event) => {
        console.log(event);
        if(event.key === 'Enter') {
            if (this.state.buttonEnabled) {
                this.modifyPrice();
            }
            else {
                //DO NOTHING
            }
        }
    }

    modifyPrice = () => {
        //this.props.showManagerApprovalModal(true,this.props.title);
        var showManagerModalFlag = false;
        var itemPrice = this.props.item.salePrice;
        var fieldValue = this.state.fieldValue;
        var validValueCheckFlag = false;
        var discountedSalePrice = this.props.item.salePrice;
        if(this.props.item.discounts.length > 0) {
            discountedSalePrice = this.props.item.discounts[this.props.item.discounts.length-1].newPrice;
        }
        else {
            discountedSalePrice = this.props.item.salePrice;
        }
        console.log(this.props.item);
        if (this.props.title === "Price : Mkd % Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDPEROFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = discountedSalePrice - ((fieldValue / 100) * discountedSalePrice);
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Mkd $ Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDDOLOFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = discountedSalePrice - fieldValue;
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue > 0 && fieldValue <= 100 && fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Price Override") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_PRICEOVERRIDE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = fieldValue;
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Mkd New Price") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_MKDNEWPRICE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = fieldValue;
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd % Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDPEROFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = discountedSalePrice - ((fieldValue / 100) * discountedSalePrice);
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue > 0 && fieldValue <= 100) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd $ Off") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDDOLOFF.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = discountedSalePrice - fieldValue;
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue > 0 && fieldValue <= 100 && fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else if (this.props.title === "Price : Omni Mkd New Price") {
            var maximumDiscountPercentage = this.props.itemPromotionDetails.pP_OMNIMKDNEWPRICE.maxItemPercentDisc;
            var maximumRevisablePrice = itemPrice - ((maximumDiscountPercentage / 100) * itemPrice);
            var discountedPrice = fieldValue;
            if (discountedPrice < maximumRevisablePrice) //This means discount is greater than threshold
            {
                showManagerModalFlag = true;
            }
            else {
                showManagerModalFlag = false;
            }
            if (fieldValue <= this.props.item.itemPrice) {
                validValueCheckFlag = true;
            }
            else {
                validValueCheckFlag = false;
            }
        }
        else {
            //DO NOTHING
        }

        if (validValueCheckFlag) {
            if (showManagerModalFlag === false) {
                this.props.modifyPrice(this.state.fieldValue, this.props.title);
            }
            else {
                this.props.showManagerApprovalModal(true, this.state.fieldValue, this.props.title);
            }
        }
        else {
            this.setState({ errorText: "Discount not allowed" });
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

        var errorStyle = {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: '22px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textAlign: 'right',
            color: '#d53560',
            bottom: '-20px',
            right: '20px'
        }

        var underlineStyle = {
            backgroundColor: '#828282'

        }

        var disabledButtonStyle = {
            opacity: 0.4
        }

        var enabledButtonStyle = {
            opacity: 1
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
                        floatingLabelText={this.props.placeholder}
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        underlineStyle={underlineStyle}
                        errorStyle={errorStyle}
                        style={textFieldStyle}
                        fullWidth={true}
                        onChange={this.handleTextFieldChange}
                        errorText={this.state.errorText}
                        value={this.state.fieldValue}
                        onKeyUp={this.handleKeyUp}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter' && this.state.buttonEnabled) {
                                e.preventDefault();
                                this.modifyPrice();
                                }
                            }}
                    />
                </div>
            </div>
            <div className="modify-price-item-modify-buttons-container">
                <div onClick={() => {
                    this.props.showItemModifyPriceModal(false, '', '');
                }} className="modify-price-item-cancel-button">
                    <div className="modify-price-item-cancel-button-icon-container">
                        <img className="modify-price-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="modify-price-item-cancel-button-text">CANCEL</div>
                </div>
                <div onClick={() => {
                    if (this.state.buttonEnabled) {
                        this.modifyPrice();
                    }
                    else {
                        //DO NOTHING
                    }
                    //this.props.showItemModifyPriceModal(false,'','');
                }} className="modify-price-item-ok-button" style={(this.state.buttonEnabled) ? enabledButtonStyle : disabledButtonStyle}>
                    <div className="modify-price-item-ok-button-text">OK</div>
                </div>
            </div>
        </div>);
    }
}

export class ModifyTaxModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taxfieldValue: '',
            taxerrorText: '',
            //buttonEnabled: false
        }
    }
    componentDidMount(){        
        if(this.props.is_tax_fail)
        {
            this.setState({
                taxerrorText: 'Invalid override authorization code. Reenter code'
            });
        }
        else
        {
            this.setState({
                taxerrorText: ''
            });
        }
    }
    
    handleTextFieldChange = (event) => {        
        var codeLength = event.target.value.length;
        if(codeLength===5)
        {       
            this.setState({
                taxfieldValue: event.target.value,
                taxerrorText: ''
            });
        }
        else
        {
            this.setState({
                taxfieldValue: event.target.value,
                taxerrorText: 'Data entered is not Valid'
            });
        }
        this.props.setTaxError(false);
    }

    modifyTax = () => {
        this.props.showItemModifyTaxModal(false, '', '');
        this.props.modifyTax(this.state.taxfieldValue);
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

        var errorStyle = {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: '22px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textAlign: 'right',
            color: '#d53560',
            bottom: '-20px',
            right: '20px'
        }

        var underlineStyle = {
            backgroundColor: '#828282'

        }

        var disabledButtonStyle = {
            opacity: 0.4
        }

        var enabledButtonStyle = {
            opacity: 1
        }
        
        return (<div className="modify-price-modal-inner-container">
            <div className="modify-tax-item-modify-icon-container">
                <img className="modify-tax-item-modify-icon" src={itemModifyImage} alt="item-modify-image" />
            </div>
            <div className="modify-tax-item-modify-title-container">
                <div className="modify-tax-item-modify-title">{this.props.title}</div>
            </div>
            <div className="modify-tax-item-modify-text-field-container">
                <div className="modify-tax-item-modify-text-field">
                    <TextField
                        type="number"
                        floatingLabelText={this.props.placeholder}
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        maxLength={5}
                        underlineStyle={underlineStyle}
                        errorStyle={errorStyle}
                        style={textFieldStyle}
                        fullWidth={true}
                        onChange={this.handleTextFieldChange}
                        errorText={this.state.taxerrorText?this.state.taxerrorText:this.props.is_tax_fail?'Invalid override authorization code. Reenter code':''}
                        value={this.state.taxfieldValue}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter' && this.state.taxfieldValue.length===5) {
                                e.preventDefault();
                                this.modifyTax();
                                }
                            }}
                    />
                </div>
            </div>
            <div className="modify-tax-item-modify-buttons-container">
                <div onClick={() => {
                    this.props.showItemModifyTaxModal(false, '', '');
                }} className="modify-tax-item-cancel-button">
                    <div className="modify-tax-item-cancel-button-icon-container">
                        <img className="modify-tax-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="modify-tax-item-cancel-button-text">CANCEL</div>
                </div>
                <div onClick={() => {
                    if (this.state.taxfieldValue.length===5) {
                        this.modifyTax()
                    }
                    else {
                        //DO NOTHING
                    }
                }} className="modify-tax-item-ok-button" style={(this.state.taxfieldValue.length===5) ? enabledButtonStyle : disabledButtonStyle}>
                    <div className="modify-tax-item-ok-button-text">OK</div>
                </div>
            </div>
        </div>);
    }
}

export class ManagerApprovalModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldValue: '',
            errorMessage : ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount ManagerPINModal this.props ', this.props);
        //this.setState({ errorMessage : this.props.managerModalErrorMessage });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ManagerPINModal nextProps ', nextProps);
        this.setState({ errorMessage : nextProps.managerModalErrorMessage });
    }

    handleTextFieldChange = (event) => {
        this.setState({ errorMessage : '', fieldValue: event.target.value });
    }

    validateManagerApproval = () => {
        this.setState({ errorMessage : '' });
        this.props.validateManagerApproval(this.state.fieldValue);
    }

    render() {

        var textFieldStyle = {
            height: (window.innerWidth > 1900) ? '85px' : '100px',
            paddingTop: '10px',
            fontSize: (window.innerWidth > 1900) ? '32px' : '56px',
            color: '#828282'
        }

        var textFieldFloatingLabelStyle = {
            height: (window.innerWidth > 1900) ? '37px' : '74px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '30px' : '56px',
            fontWeight: '300',
            fontStyle: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333'
        }

        var errorStyle = {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '22px' : '34px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textAlign: 'right',
            color: '#d53560',
            bottom: '-20px',
            right: '20px'
        }

        var underlineStyle = {
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
                        floatingLabelText="Enter Manager Approval PIN"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        underlineStyle={underlineStyle}
                        errorStyle={errorStyle}
                        style={textFieldStyle}
                        fullWidth={true}
                        onChange={this.handleTextFieldChange}
                        errorText={this.state.errorMessage}
                        value={this.state.fieldValue}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                this.validateManagerApproval();
                                }
                            }}
                    />
                </div>
            </div>
            <div className="modify-price-item-modify-buttons-container">
                <div onClick={() => {
                    this.props.showManagerApprovalModal(false, '', this.props.activeModifyPriceOption);
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

        this.state = {

        }
    }

    render() {

        return (<div className="modify-price-error-modal-inner-container">
            <div className="modify-price-error-icon-container">
                <img alt="warning-icon" className="modify-price-error-icon" src={require('../../../resources/images/Warning.svg')} />
            </div>
            <div className="modify-price-error-text-container">
                <div className="modify-price-error-text">{this.props.errorText}</div>
            </div>
            <div className="modify-price-error-button-container" onClick={() => {
                this.props.showModifyErrorModal(false, '');
            }}>
                <div className="modify-price-error-ok-button">OK</div>
            </div>
        </div>);
    }
}
export class AmountToBeEnteredModal extends Component {
    constructor(props) {
        super(props);
        
        this.state={

        }
}
    componentDidMount() {
    if (this.props.modified_amount_value !== null && this.props.modified_amount_value !== undefined && this.props.modified_amount_value != '') {
    if(document.getElementsByClassName("Ok-button-area")[0])
        document.getElementsByClassName("Ok-button-area")[0].disabled = false;
    }
    } 
    render() {
        var textFieldStyle = {
            height: (window.innerWidth > 1900) ? '85px' : '100px',
            paddingTop: '10px',
            fontSize: (window.innerWidth > 1900) ? '32px' : '56px',
            color: '#828282'

        }

        var textFieldFloatingLabelStyle = {
            height: (window.innerWidth > 1900) ? '37px' : '74px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '30px' : '56px',
            fontWeight: '300',
            fontStyle: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
            marginTop:'10px'
        }

        var errorStyle = {
            position: 'absolute',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '22px' : '34px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            textAlign: 'right',
            color: '#d53560',
            bottom: '-20px',
            right: '20px'
        }

        var underlineStyle = {
            backgroundColor: '#828282'

        }

        return (<div className="amount-to-be-entered-modal">
            <div className="enter-amount-icon"> <img className="enter-amt-icon" src={itemModifyImage} alt="enter-amount" /></div>
            <div className="enter-amount-label">Enter Amount</div>
            <div className="modify-amount-item-modify-text-field">
                <TextField

                    type="text"
                    floatingLabelText="Price"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    underlineStyle={underlineStyle}
                    errorStyle={errorStyle}
                    style={textFieldStyle}
                    fullWidth={true}
                    //value={this.props.modified_amount_value.replace(/[^0-9\.]+/ig, "")}
                    onChange={this.props.handleamountchange}
                    onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                this.props.modify_amount_on_submit(false);
                                }
                            }}
                   
                />
                <div className="amount-to-be-entered-button-area">
                    <div className="cancel-button-area" onClick={() => {
                        this.props.amount_to_be_inserted_modal(false);
                    }}><img className="modify-amount-item-cancel-button-icon" src={cancelBtnImage} alt="cancel" /><div className="modify-amount-cancel-label">CANCEL</div></div>
                    
                        <div className="modify-amount-ok-label" onClick={() => {
                            this.props.modify_amount_on_submit(false);
                        }}>
                        <button id="Ok-button-area"  className="Ok-button-area" disabled>OK</button>
                        </div>
                
                </div>
            </div>
        </div>);
    }
}


export class KeyDeptModal extends Component {
    constructor(props) {
        super(props)
        this.state= {
           entries:{
                deptNo: '',
                classNo:''
           },
           buttonEnabled:false
        }
    }

    handleChange = (value,name) => {
        var entries = this.state.entries;
        entries[name] = value;
        this.setState({ entries });
        this.enableButtons();
        //console.log(this.state.changedAddress);
    }
    enableButtons=()=>{
        if(this.state.entries.deptNo>0 && this.state.entries.classNo>0)
        this.setState({buttonEnabled:true});
        else
        this.setState({buttonEnabled:false});
    }
    closeDeptModal=(flag)=>{
        this.props.showSelectDeptModal(flag);
    }
    updateEntries(e) {
        if(e.target.value.length <= 12){
            this.setState({sku: e.target.value})
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
        marginLeft:'10px'
    }
    

    const textFieldStyle = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }

    
    const textFieldFloatingLabelStyle1 = {
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
        marginLeft:'10px'
    }

    const textFieldStyle1 = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle1 = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }
    const textFieldUnderlineStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        backgroundColor: '#333333',
    }

    var enabledButtonStyle = {
        opacity : 1
    }
    var disabledButtonStyle = {
        opacity : 0.4
    }

    return (
 
        <div className="dept-key-sku-modal-container">

          <img src={keypad} className='key-deptsku-modal-icon'/>
          <div className='key-sku-modal-label'>Key SKU</div>




            <TextField className="key-deptno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'deptNo')}
                value={this.state.entries.deptNo} 
                type="number"
                floatingLabelText="Department Number"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                style = {textFieldStyle}
                fullWidth = {true} 
                inputStyle = {textFieldInputStyle}
                underlineStyle={textFieldUnderlineStyle}

                min={0}
                //as per mpos2003 we are limiting characters to 5
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                }}
                refs="deptNo" 
                required
                />
                
                <TextField className="key-classno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'classNo')}
                value={this.state.entries.classNo}
                type="number"
                floatingLabelText="Class Number"
                floatingLabelStyle={textFieldFloatingLabelStyle1}                    
                style = {textFieldStyle1}
                fullWidth = {true} 
                inputStyle = {textFieldInputStyle1}
                underlineStyle={textFieldUnderlineStyle}
                 //as per mpos2003 we are limiting characters to 5
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                }}
                min={0}
                refs="classNo"
                onKeyPress={(e) => {
                    if(e.key === 'Enter' && this.state.buttonEnabled) {
                        e.preventDefault();
                        this.props.showHideSubClassModal(true);
                        this.props.setDeptClass(this.state.entries);
                        }
                    }} 
                required
                />
                

            <div className="dept-key-buttons-container">
                <div onClick={() => {this.props.showDeptKeyModal(false);}} className="dept-key-cancel-button">
                    <div className="dept-key-cancel-button-icon-container">
                        <img className="dept-key-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="dept-key-cancel-button-text">CANCEL</div>                
                </div>
                <div onClick={() => { if(this.state.buttonEnabled){ this.props.showHideSubClassModal(true); this.props.setDeptClass(this.state.entries);}}} className="dept-key-ok-button" style={(this.state.buttonEnabled)?enabledButtonStyle:disabledButtonStyle}>
                    <div className="dept-key-ok-button-text">OK</div>
                </div>
            </div>

        </div>

      
    )
  }
};

/** Subclass or find sku modal * */

export class Subclass extends Component {
    constructor(props) {
        super(props)
        this.state= {
           Subclass:'',
           buttonEnabled:false
        }
    }

    handleChange = (value,name) => {
       this.setState({Subclass:value});
      // this.enableButtons();
        //console.log(this.state.changedAddress);
    }
    enableButtons=()=>{
        if(this.state.Subclass)
        this.setState({buttonEnabled:true});
        else
        this.setState({buttonEnabled:false});
    }
    closeSubCLassModal=(flag)=>{
        this.props.showHideSubClassModal(flag);
    }
    updateEntries(e) {
        if(e.target.value.length <= 12){
            this.setState({sku: e.target.value})
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
        marginLeft:'10px'
    }

    const textFieldStyle = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }

   

    var enabledButtonStyle = {
        opacity : 1
    }
    var disabledButtonStyle = {
        opacity : 0.4
    }

    return (
 
        <div className="dept-key-sku-modal-container">

          <img src={keypad} className='key-deptsku-modal-icon'/>
          <div className='key-sku-modal-label'>Key SKU</div>

            <TextField className="key-deptno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'subclass')}
                value={this.state.Subclass} 
                type="number"
                floatingLabelText="Subclass"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                style = {textFieldStyle}
                 //fullWidth = {true} 
                inputStyle = {textFieldInputStyle}
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                }}
                min={0}
                refs="deptNo" 
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        e.preventDefault();
                        this.props.setDefaultSku(false); 
                        this.props.setSubClass(this.state.Subclass); 
                        this.props.getDefaultSKUCall(this.state.Subclass); 
                        }
                    }}
                required
                />
                
               <div className="btn-devider">or</div>
                <div className="find-sku-btn-container">
                    <button className="find-sku-btn" onClick={()=>{this.props.setDefaultSku(true); this.props.setSubClass(this.state.Subclass);this.props.getDefaultSKUCall();}}>FIND DEFAULT SKU</button>
                </div>

            <div className="subclass-key-buttons-container">
                <div onClick={() => {this.closeSubCLassModal(false);}} className="dept-key-cancel-button">
                    <div className="dept-key-cancel-button-icon-container">
                        <img className="dept-key-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="dept-key-cancel-button-text">CANCEL</div>                
                </div>
                <div onClick={() => {/*if(this.state.buttonEnabled){this.props.showHideAmountModal(this.state.Subclass);*/this.props.setDefaultSku(false); this.props.setSubClass(this.state.Subclass); this.props.getDefaultSKUCall(this.state.Subclass); /*}*/}} className="dept-key-ok-button" style={enabledButtonStyle}>
                    <div className="dept-key-ok-button-text">OK</div>
                </div>
            </div>

        </div>

      
    )
  }
};

/** amount modal * */

export class Amount extends Component {
    constructor(props) {
        super(props)
        this.state= {
           amount:'',
           buttonEnabled:false
        }
    }

    handleChange = (value,name) => {      
        this.setState({amount:value});
        //var isTrue;
        //var amnt;
        if(value.indexOf('.')!=-1)
        {
            var amnt = value.split('.');
            var isTrue = amnt[1].length<3?true:false;
            var isTrue1 = amnt[0].length<6?true:false;
        }
        else{
            if(value.length<7)
            var isTrue1 = true;
            else 
            var isTrue1 = false;
            var isTrue = true;
        }

        if((isTrue == true && isTrue1 === true) && value)
       {    if(amountValidation(value))  
           this.setState({buttonEnabled:true});
       } 
       else{
        
        this.setState({buttonEnabled:false});
       }

      
       
        //console.log(this.state.changedAddress);
    }
    enableButtons=(amount)=>{
        if(amount)
        this.setState({buttonEnabled:true});
        else
        this.setState({buttonEnabled:false});
    }
    closeSubCLassModal=(flag)=>{
        this.props.showHideSubClassModal(flag);
    }
    updateEntries(e) {
        if(e.target.value.length <= 12){
            this.setState({sku: e.target.value})
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
        marginLeft:'10px'
    }

    const textFieldStyle = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }

   

    var enabledButtonStyle = {
        opacity : 1
    }
    var disabledButtonStyle = {
        opacity : 0.4
    }

    return (
 
        <div className="amount-key-sku-modal-container">

          <img src={keypad} className='key-deptsku-modal-icon'/>
          <div className='key-sku-modal-label'>Key SKU</div>

            <TextField className="amount-deptno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'amount')}
                value={this.state.amount} 
                type="text"
                floatingLabelText="Amount ($)"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                style = {textFieldStyle}
                 //fullWidth = {true} 
                inputStyle = {textFieldInputStyle}
                onInput={(e)=>{ 
                    
                   return amountValidation(e.target.value)
                }}
                min={0}
                onKeyPress={(e) => {
                    if(e.key === 'Enter' && this.state.buttonEnabled) {
                        e.preventDefault();
                        this.props.setAmount(this.state.amount); 
                        this.props.AddItemtoCartDefault();
                        }
                    }}
                refs="amount" 
                required
                />

            <div className="amount-key-buttons-container">
                <div onClick={() => {this.props.showHideAmountModal(false);}} className="dept-key-cancel-button">
                    <div className="dept-key-cancel-button-icon-container">
                        <img className="dept-key-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="dept-key-cancel-button-text">CANCEL</div>                
                </div>
                <div onClick={() => {if(this.state.buttonEnabled){this.props.setAmount(this.state.amount); this.props.AddItemtoCartDefault();}}} className="dept-key-ok-button" style={(this.state.buttonEnabled)?enabledButtonStyle:disabledButtonStyle}>
                    <div className="dept-key-ok-button-text">OK</div>
                </div>
            </div>

        </div>

      
    )
  }
};

/**PJ Numer modal */
export class PJmodal extends Component {
    constructor(props) {
        super(props)
        this.state= {
            entries:{
                pjNo: '',
                confirmpjNo:''
           },
           buttonEnabled:false,
           pjError:false,
        }
    }

    handleChange = (value,name) => {
        
        var entries = this.state.entries;
        entries[name] = value;
        this.setState({ entries });
        this.enableButtons();
       
    }
    enableButtons=()=>{
        if((this.state.entries.pjNo>0 && this.state.entries.confirmpjNo>0)&&(this.state.entries.pjNo==this.state.entries.confirmpjNo))
        
        {
               this.setState({buttonEnabled:true});
        }

        else
        {
            this.setState({buttonEnabled:false});
        }
    }
    closeDeptModal=(flag)=>{
        this.props.showSelectDeptModal(flag);
    }
    updateEntries(e) {
        if(e.target.value.length <= 12){
            this.setState({sku: e.target.value})
        }
    }
    pjNumberValidation=()=>{
        if(this.state.pjNo==this.state.confirmpjNo)
        {

        }
        else{
            
            //this.setState({pjError:true});
            //this.enableButtons();
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
        marginLeft:'10px'
    }
    

    const textFieldStyle = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }

    
    const textFieldFloatingLabelStyle1 = {
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
        marginLeft:'10px'
    }

    const textFieldStyle1 = {
        height: '60px',
        width: '619.5px',
        maxWidth: '620px',
        paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
        paddingBottom: (window.innerWidth > 1900) ? '3px' : '20px'
    }

    const textFieldInputStyle1 = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        // height: "18px",
        fontFamily: "Roboto",
        fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
        letterSpacing: "normal",
        textAlign: "left",
        color: "#333333",
        paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
        paddingLeft : (window.innerWidth > 1900) ? "0px" : "10px",
        marginLeft:'10px'
    }
    const textFieldUnderlineStyle = {
        width: (window.innerWidth > 1900) ? "619.5px" : "738px",
        backgroundColor: '#333333',
    }

    var enabledButtonStyle = {
        opacity : 1
    }
    var disabledButtonStyle = {
        opacity : 0.4
    }

    return (
 
        <div className="dept-key-sku-modal-container">

          <img src={keypad} className='key-deptsku-modal-icon'/>
          <div className='key-sku-modal-label'>Key SKU</div>




            <TextField className="key-deptno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'pjNo')}
                value={this.state.entries.pjNo} 
                type="number"
                floatingLabelText="PJ Number"
                floatingLabelStyle={textFieldFloatingLabelStyle}                    
                style = {textFieldStyle}
                fullWidth = {true} 
                inputStyle = {textFieldInputStyle}
                underlineStyle={textFieldUnderlineStyle}

                min={0}
                refs="pjNo" 
                required
                />
                
                <TextField className="key-classno-modal-textfield"
                //maxLength='2' 
                onChange={(e)=>this.handleChange(e.target.value,'confirmpjNo')}
                value={this.state.entries.confirmpjNo}
                type="number"
                floatingLabelText="Re-enter PJ Number"
                floatingLabelStyle={textFieldFloatingLabelStyle1}                    
                style = {textFieldStyle1}
                fullWidth = {true} 
                inputStyle = {textFieldInputStyle1}
                underlineStyle={textFieldUnderlineStyle}
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                }}
                min={0}
                onKeyPress={(e) => {
                    if(e.key === 'Enter' && this.state.buttonEnabled) {
                        e.preventDefault();
                        this.props.setPJnum(this.state.entries.pjNo); 
                        this.props.showHidePjModal(false); 
                        this.props.showHideAmountModal(true);
                        }
                    }}
                refs="confirmpjNo" 
                required
                />
                <div className="pjerror-message">
                    {this.state.pjError?'PJ Number not matched':null}
                </div>

            <div className="dept-key-buttons-container">
                <div onClick={() => {this.props.showHidePjModal(false);}} className="dept-key-cancel-button">
                    <div className="dept-key-cancel-button-icon-container">
                        <img className="dept-key-cancel-button-icon" src={cancelBtnImage} alt="cancel" />
                    </div>
                    <div className="dept-key-cancel-button-text">CANCEL</div>                
                </div>

                <div onClick={() => {if(this.state.buttonEnabled){this.props.setPJnum(this.state.entries.pjNo); this.props.showHidePjModal(false); this.props.showHideAmountModal(true); }}} className="dept-key-ok-button" style={(this.state.buttonEnabled)?enabledButtonStyle:disabledButtonStyle}>
                    <div className="dept-key-ok-button-text">OK</div>
                </div>
            </div>

        </div>

      
    )
  }
};
