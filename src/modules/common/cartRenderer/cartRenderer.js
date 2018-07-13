import React, { Component } from 'react';

import { connect } from 'react-redux';

import LineItemController from '../../sale/lineItemTypes/lineItemController';

class CartRenderer extends Component{
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
       
        if(this.props.scrollCheck)
          this.scrollTolastItem();
    }

    scrollTolastItem() {
        this.lastItem.scrollIntoView({behavior: "smooth"});
    }

    render() {
        const itemStyle = {
            boxShadow: '0 0 6px 0 #613b8c',
            backgroundColor: 'rgba(168, 126, 214, 0.05)',
            border: 'solid 2px #a87ed6'
        };

        const selectedIndexStyle = {
            backgroundColor: "#a87ed6 ",
            border: '2px solid #a87ed6'
        }

        //const selectedItemStyle = this.state.selected ? itemStyle : null;
        //Create array of items to display
        const items = this.props.items.map((itemGroup, pointer) => {
            return  itemGroup.map((obj, index) => {
                let isCurrentSelection = this.props.selectedItems.includes(obj.lineNumber);
                let selectedItemStyle = isCurrentSelection ? itemStyle : null;
                let selectedItemIndexStyle = isCurrentSelection ? selectedIndexStyle : null;
                let qtyPrice = parseFloat(obj.itemPrice * obj.quantity).toFixed(2);
                let salesDiscountAmount = parseFloat(obj.taxPercent * obj.itemsPrice).toFixed(2);
                let taxAmount = parseFloat((qtyPrice - salesDiscountAmount) * this.props.tax).toFixed(2);
                let isDiscount = obj.discounts.length > 0 ? true:false;
                let isComment = obj.comment.length > 0 ? true:false;
                let quantity = obj.quantity.length > 0 ? true:false;
                // let isGiftReceipt = obj.
                let isREPL = obj.replenishDays > 0 ? true:false;
                let isGiftReg = obj.gift_reg == 0 || obj.gift_reg === '' ||obj.gift_reg === null ? false:true;
                let isGiftRec = obj.print_GWGR_Msg == 0 || obj.print_GWGR_Msg == undefined || obj.print_GWGR_Msg === '' || obj.print_GWGR_Msg === null ? false:true;
                let isSplInstn = obj.comment.length > 0 ? true:false; //needs to be changed!!!
                let saleID= obj.salesId;

                console.log("obj.print_GWGR_Msg", obj.print_GWGR_Msg)
                if(isDiscount){
                    // var transactionDiscount = obj.discounts[0].discountValue;
                    // var transactionDiscountAmount = obj.discounts[0].discountAmount;
                    var transactionDiscount = 0;
                    var transactionDiscountAmount = 0;
                    var associateDiscount = 0;
                    var associateDiscountAmount = 0;

                    for(var i =0; i < obj.discounts.length;i++){
                        if(obj.discounts[i].discounttype === "Associate Discount") {
                        associateDiscount = obj.discounts[i].discountValue;
                        associateDiscountAmount = obj.discounts[i].discountAmount;
                        }
                        else{
                        transactionDiscount += obj.discounts[i].discountValue;
                        transactionDiscountAmount += obj.discounts[i].discountAmount;
                        }
                    }
                }

                if(isComment){
                    for(let i=0;i<obj.comment.length;i++)
                    {   
                    var comments =+ obj.comment;
                    }
                }                

                return (
                    <LineItemController
                        selectedItemStyle = {selectedItemStyle}
                        selectedItemIndexStyle = {selectedItemIndexStyle}
                        voidLineItem = {this.props.voidLineItem}
                        setCurrentItem = {this.props.setCurrentItem}
                        qtyPrice = {qtyPrice}
                        salesDiscountAmount = {salesDiscountAmount}
                        transactionDiscount = {transactionDiscount}
                        transactionDiscountAmount = {transactionDiscountAmount}
                        associateDiscount = {associateDiscount}
                        associateDiscountAmount = {associateDiscountAmount}
                        tax = {this.props.tax}
                        taxAmount = {taxAmount}
                        isDiscount = {isDiscount}
                        isREPL = {isREPL}
                        isGiftReg = {isGiftReg}
                        isGiftRec = {isGiftRec}
                        showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
                        saleID = {saleID}
                        isSplInstn = {isSplInstn}
                        quantity={quantity}
                        index = {pointer}
                        currentItem = {this.props.currentItem}
                        obj = {obj}
                        itemType = {obj.itemDesc.toLowerCase().replace(/\s+/g, '')}
                        comments = {comments}
                    // lastStatusIndicatorFunction = {this.lastStatusIndicatorFunction}
                    // updateLastStatusIndicatorFunction = {this.updateLastStatusIndicatorFunction.bind(this)}
                    />
                )
            })
        })

        const skuDisplay = <div className="sku-text">Scan or Key SKU</div>

        return (
            <div className="sale-content" style={this.props.style ? this.props.style :null}>
                {items[0] ? items : skuDisplay}
                <div ref={(el) => {this.lastItem = el;}}  />
            </div>
        )   
    }
}

const mapStateToProps = ({selectedItems}) => {
    return {selectedItems}
}

export default connect(mapStateToProps, null)(CartRenderer);