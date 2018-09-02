// Dependecies
import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nonSkuItemSelectionAction } from './actions'
// Components
import LineItemController from '../../sale/lineItemTypes/lineItemController';


class CartRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagsObject: {
                displayFlag: false
            }
        }
    }

    componentDidUpdate() {
        if (this.props.scrollCheck)
            this.scrollTolastItem();
    }

    scrollTolastItem() {
        this.lastItem.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        const itemStyle = {
            boxShadow: '0 0 6px 0 #613b8c',
            backgroundColor: 'rgba(168, 126, 214, 0.05)',
            border: 'solid 2px #a87ed6'
        };

        const selectedIndexStyle = {
            backgroundColor: "#a87ed6",
            border: '2px solid #a87ed6'
        };

        const nonSkuItemsAreClickable = this.props.nonSkuItemsAreClickable ? true : false;

        //get all selected Items lineNumbers will used to set selected style(see below code)
        const allSelectedLineNumbers = this.props.selectedItems.map(index => { return this.props.items[index][0].lineNumber });
        //if giftWrap or alteration is selected lets put it on allSelectedLineNumber;
        if (this.props.nonSkuSelection) { allSelectedLineNumbers.push(this.props.nonSkuSelection) };
        //const selectedItemStyle = this.state.selected ? itemStyle : null;
        //Create array of items to display
        const items = this.props.items.map((itemGroup, pointer) => {
            return itemGroup.map((obj, index) => {
                let isCurrentSelection = allSelectedLineNumbers.includes(obj.lineNumber);
                let selectedItemStyle = isCurrentSelection ? itemStyle : null;
                let selectedItemIndexStyle = isCurrentSelection ? selectedIndexStyle : null;
                let selectedContentStyle = isCurrentSelection ? {
                    backgroundColor: 'rgba(168, 126, 214, 0.06)'
                } : null;
                let qtyPrice = parseFloat(obj.itemPrice * obj.quantity).toFixed(2);
                let salesDiscountAmount = parseFloat(obj.taxPercent * obj.itemsPrice).toFixed(2);
                let taxAmount = parseFloat((qtyPrice - salesDiscountAmount) * this.props.tax).toFixed(2);
                let isDiscount = obj.discounts.length > 0 ? true : false;
                let isComment = obj.comment.length > 0 ? true : false;
                let quantity = obj.quantity.length > 0 ? true : false;
                // let isGiftReceipt = obj.
                let isREPL = obj.replenishDays > 0 ? true : false;
                let isGiftReg = obj.gift_reg == 0 || obj.gift_reg === '' || obj.gift_reg === null ? false : true;
                let isGiftRec = obj.print_GWGR_Msg == 0 || obj.print_GWGR_Msg == undefined || obj.print_GWGR_Msg === '' || obj.print_GWGR_Msg === null ? false : true;
                let isSplInstn = obj.comment.length > 0 ? true : false; //needs to be changed!!!
                let saleID = obj.salesId;

                let itemAvailability = 'INVALID';

                if(this.props.itemAvailabilityArray.length > 0) {
                    var itemAvailabilityArrayLength = this.props.itemAvailabilityArray.length;
                    for(var i=0; i<itemAvailabilityArrayLength; ++i) {
                        if(obj.lineNumber === this.props.itemAvailabilityArray[i].lineNumber) {
                            itemAvailability = this.props.itemAvailabilityArray[i].availabilityStatus;
                            break;
                        }
                    }
                }

                
                if (isDiscount) {
                    // var transactionDiscount = obj.discounts[0].discountValue;
                    // var transactionDiscountAmount = obj.discounts[0].discountAmount;
                    var transactionDiscount = 0;
                    var transactionDiscountAmount = 0;
                    var associateDiscount = 0;
                    var associateDiscountAmount = 0;

                    var discountsAppliedArray = [];

                    for (var i = 0; i < obj.discounts.length; i++) {
                        if (obj.discounts[i].discounttype === "Associate Discount") {
                            associateDiscount = obj.discounts[i].discountValue;
                            associateDiscountAmount = obj.discounts[i].discountAmount;
                        }
                        else if (obj.discounts[i].discounttype === "Mkd Percentage Off") {
                            //percentageMarkdownDiscount = percentageMarkdownDiscount + obj.discounts[i].discountValue;
                            //percentageMarkdownDiscountAmount = percentageMarkdownDiscountAmount + obj.discounts[i].discountAmount.toFixed(2); 
                            discountsAppliedArray.push({
                                discountName : 'Mkd Percentage Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: obj.discounts[i].discountAmount.toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Mkd Dollar Off") {
                            //dollarMarkdownDiscount = dollarMarkdownDiscount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            //dollarMarkdownDiscountAmount = dollarMarkdownDiscountAmount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            discountsAppliedArray.push({
                                discountName : 'Mkd Dollar Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Price Override Off") {
                            //priceOverrideMarkdownDiscount = priceOverrideMarkdownDiscount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            //priceOverrideMarkdownDiscountAmount = priceOverrideMarkdownDiscountAmount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            console.log('WHAT IS OBJ', obj)
                            console.log('discount', 'old price', obj.discounts[i].oldPrice, 'new price', obj.discounts[i].newPrice, 'disc amount', obj.discounts[i].oldPrice - obj.discounts[i].newPrice)
                            console.log('quantity:', obj.quantity)
                            discountsAppliedArray.push({
                                discountName : 'Price Override Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: (obj.discounts[i].newPrice).toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Mkd New Price Off") {
                            //newPriceMarkdownDiscount = newPriceMarkdownDiscount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            //newPriceMarkdownDiscountAmount = newPriceMarkdownDiscountAmount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            discountsAppliedArray.push({
                                discountName : 'Mkd New Price Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: (obj.discounts[i].newPrice).toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Omni Percentage Off") {
                            //percentageMarkdownDiscount = percentageMarkdownDiscount + obj.discounts[i].discountValue;
                            //percentageMarkdownDiscountAmount = percentageMarkdownDiscountAmount + obj.discounts[i].discountAmount.toFixed(2);
                            discountsAppliedArray.push({
                                discountName : 'Omni Percentage Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: obj.discounts[i].discountAmount.toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Omni Dollar Off") {
                            //dollarMarkdownDiscount = dollarMarkdownDiscount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            //dollarMarkdownDiscountAmount = dollarMarkdownDiscountAmount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            discountsAppliedArray.push({
                                discountName : 'Omni Dollar Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else if (obj.discounts[i].discounttype === "Omni New Price Off") {
                            //newPriceMarkdownDiscount = newPriceMarkdownDiscount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            //newPriceMarkdownDiscountAmount = newPriceMarkdownDiscountAmount + (obj.discounts[i].oldPrice - obj.discounts[i].newPrice).toFixed(2);
                            discountsAppliedArray.push({
                                discountName : 'Omni New Price Off',
                                originalAmount: (obj.discounts[i].oldPrice).toFixed(2),
                                discountAmount: (obj.discounts[i].newPrice).toFixed(2),
                                discountValue: obj.discounts[i].discountValue
                            });
                        }
                        else {
                            transactionDiscount += obj.discounts[i].discountValue;
                            transactionDiscountAmount += obj.discounts[i].discountAmount.toFixed(2);
                        }
                    }
                }

                if (isComment) {
                    for (let i = 0; i < obj.comment.length; i++) {
                        var comments = + obj.comment;
                    }
                }
                console.log('this.props Loop Cartrenderer', this.props);
                console.log('obj',obj);
                //var giftweap =this.props.getisellFlagDisplayObject;
                if (this.props.GetisellFlag !== '') {
                    if (this.props.GetisellFlag === true) {
                    if(this.props.gp ===true){
                        var flagsObject = {
                            giftwrapdisplayFlag: false,
                            alterationdisplayFlag:false,
                            sendsdisplayFlag:false,
                            sends7displayFlag:false,
                        }
                        
                        for (var i = 0; i < this.props.getisellFlagDisplayObject.length; ++i) {
                            if (obj.pim_SKU_ID === this.props.getisellFlagDisplayObject[i].skuId) {
                                flagsObject = {
                                    giftwrapdisplayFlag: this.props.getisellFlagDisplayObject[i].giftwrapdisplayFlag,
                                    alterationdisplayFlag:this.props.getisellFlagDisplayObject[i].alterationdisplayFlag,
                                    sendsdisplayFlag:this.props.getisellFlagDisplayObject[i].sendsdisplayFlag,
                                    sends7displayFlag:this.props.getisellFlagDisplayObject[i].sends7displayFlag,
                                }

                            }

                        }

                    }
                    }
                }

                return ((this.props.autoreplenishflag) ? (null) : (
                    <LineItemController
                        selectedItemStyle={selectedItemStyle}
                        selectedItemIndexStyle={selectedItemIndexStyle}
                        selectedContentStyle={selectedContentStyle}
                        voidLineItem={this.props.voidLineItem}
                        setCurrentItem={this.props.setCurrentItem}
                        qtyPrice={qtyPrice}
                        salesDiscountAmount={salesDiscountAmount}
                        transactionDiscount={transactionDiscount}
                        transactionDiscountAmount={transactionDiscountAmount}
                        associateDiscount={associateDiscount}
                        associateDiscountAmount={associateDiscountAmount}
                        discountsAppliedArray={discountsAppliedArray}
                        tax={this.props.tax}
                        taxAmount={taxAmount}
                        isDiscount={isDiscount}
                        isREPL={isREPL}
                        isGiftReg={isGiftReg}
                        isGiftRec={isGiftRec}
                        showItemGiftReceiptModal={this.props.showItemGiftReceiptModal}
                        saleID={saleID}
                        isSplInstn={isSplInstn}
                        quantity={quantity}
                        index={pointer}
                        currentItem={this.props.currentItem}
                        obj={obj}
                        itemType={obj.itemDesc.toLowerCase().replace(/\s+/g, '')}
                        comments={comments}
                        quantityValidationFlag={this.props.quantityValidationFlag}
                        nonSkuItemsAreClickable={nonSkuItemsAreClickable}
                        selectNonSkuItem={this.props.nonSkuItemSelectionAction}
                        getisellFlagDisplayed={flagsObject}
                        gp={this.props.gp}
                        itemAvailability={itemAvailability}
                    // lastStatusIndicatorFunction = {this.lastStatusIndicatorFunction}
                    // updateLastStatusIndicatorFunction = {this.updateLastStatusIndicatorFunction.bind(this)}
                    />)
                )
            },this)
        },this)

        const skuDisplay = <div className="sku-text">Scan or Key SKU</div>

        return (
            <div className={(this.props.quantityValidationFlag === true) ? "sale-content-quantity-validation" : "sale-content"} style={this.props.style ? this.props.style : null}>
                {items[0] ? items : skuDisplay}
                <div ref={(el) => { this.lastItem = el; }} />
            </div>
        )
    }
}

CartRenderer.defaultProps = {
    quantityValidationFlag: false,
    getisellFlagDisplayObject: [{
        skuId: '',
        giftwrapdisplayFlag: false,
        alterationdisplayFlag:false,
        sendsdisplayFlag:false,
        sendsdisplayFlag:false,
    }],
    itemAvailabilityArray : []
}

const mapStateToProps = ({ selectedItems, nonSkuSelection }) => {
    return ({ selectedItems, nonSkuSelection });
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nonSkuItemSelectionAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartRenderer);