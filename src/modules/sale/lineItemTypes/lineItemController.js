import React, {Component} from 'react';

import MainItemLarge from '../lineItemTypes/mainItem/mainItemLarge';
import MainItemSmall from '../lineItemTypes/mainItem/mainItemSmall';
import AlternateLineItems from '../lineItemTypes/alternateLineItems/alternateLineItems.js';
import AlternateLineItemsSmall from '../lineItemTypes/alternateLineItems/alternateLineItemsSmall.js';


export default class LineItemController extends Component{

    constructor(props){
        super(props);

        this.state = {
            smallFormFactor : window.innerWidth > 1900 ? false:true,
            itemType : this.props.itemType,
            
        };

        this.saleItemType = this.saleItemType.bind(this);
    }


    render(){
        console.log("SMALL",this.state.smallFormFactor)
        return(
            <this.saleItemType />
        )
    }
    
    
    saleItemType(){
        console.log("ITEMTYPE:", this.state.itemType);
        if(this.state.itemType == "alterationsnp"){
            // console.log('IN ALTERATIONS', this.props);
            // alert("hello")
            // this.props.lastStatusIndicatorFunction("A");
            
            if(this.state.smallFormFactor){
                var date = this.props.obj.promisedDate;
                var month = date.substr(0,2);
                var day = date.substr(2, 2);
                var year = date.substr(4,2);

                return(
                    <AlternateLineItemsSmall
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"alterations-title"}
                        spaceStyle = {"alterations-space"}
                        containerStyle = {"alterations-container"}
                        title = {"Alterations"}
                        descriptionLine1 = {"Test Data"}
                        descriptionLine2 = {"Promised: " + month + '/' + day + '/' + year}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {"TAX(" + (parseFloat(this.props.tax * 100).toFixed(3)) + "%" + ")" + "101000"}
                        qtyPrice = {this.props.qtyPrice}
                        itemsTax = {parseFloat(this.props.obj.itemsTax).toFixed(2) + " T"}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
            else{
                var date = this.props.obj.promisedDate;
                var month = date.substr(0,2);
                var day = date.substr(2, 2);
                var year = date.substr(4,2);


                return(
                    <AlternateLineItems
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"alterations-title"}
                        spaceStyle = {"alterations-space"}
                        containerStyle = {"alterations-container"}
                        title = {"Alterations"}
                        descriptionLine1 = {"Test Data"}
                        descriptionLine2 = {"Promised: " + month + '/' + day + '/' + year}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {"TAX(" + (parseFloat(this.props.tax * 100).toFixed(3)) + "%" + ")" + "101000"}
                        qtyPrice = {this.props.qtyPrice}
                        itemsTax = {parseFloat(this.props.obj.itemsTax).toFixed(2) + " T"}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
        }
        else if(this.state.itemType == "giftwrap"){
            if(this.state.smallFormFactor){
                return(
                    <AlternateLineItemsSmall
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"giftWrap-title"}
                        spaceStyle = {"giftWrap-space"}
                        containerStyle = {"giftWrap-container"}
                        title = {"Gift Wrap:"}
                        descriptionLine1 = {"Test Data"}
                        descriptionLine2 = {"Gift Message Enclosed"}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        //pricingLine2 = {"TAX(" + (this.props.tax * 100) + "%" + ")" + "101000"} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
            else{

                return(
                    <AlternateLineItems
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"giftWrap-title"}
                        spaceStyle = {"giftWrap-space"}
                        containerStyle = {"giftWrap-container"}
                        title = {"Gift Wrap:"}
                        descriptionLine1 = {"Test Data"}
                        descriptionLine2 = {"Gift Message Enclosed"}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        //pricingLine2 = {"TAX(" + (this.props.tax * 100) + "%" + ")" + "101000"} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
                
            }
        }
        else if(this.state.itemType == "deliveryFee"){
            if(this.state.smallFormFactor){

            }
            else{
                
            }
        }
        else if(this.state.itemType == "giftCard"){
            if(this.state.smallFormFactor){

            }
            else{
                
            }
        }
        else{
            if(this.state.smallFormFactor){
                return(
                    <MainItemSmall 
                        selectedItemStyle = {this.props.selectedItemStyle}
                        selectedItemIndexStyle = {this.props.selectedItemIndexStyle}
                        voidLineItem = {this.props.voidLineItem}
                        setCurrentItem = {this.props.setCurrentItem}
                        qtyPrice = {this.props.qtyPrice}
                        tax = {this.props.tax}
                        salesDiscountAmount = {this.props.salesDiscountAmount}
                        transactionDiscount = {this.props.transactionDiscount}
                        transactionDiscountAmount = {this.props.transactionDiscountAmount}  
                        associateDiscount = {this.props.associateDiscount}
                        associateDiscountAmount = {this.props.associateDiscountAmount}                      
                        taxAmount = {this.props.taxAmount}
                        isDiscount = {this.props.isDiscount}
                        isREPL = {this.props.isREPL}
                        isGiftReg = {this.props.isGiftReg}
                        isGiftRec = {this.props.isGiftRec}
                        isSplInstn = {this.props.isSplInstn}
                        index = {this.props.index}
                        currentItem = {this.props.currentItem}
                        obj = {this.props.obj}
                        comments = {this.props.comments}
                        updateLastStatusIndicatorFunction = {this.props.updateLastStatusIndicatorFunction}
                        showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
                    />
                )
            }
            else{
                
                return(
                    <MainItemLarge
                        selectedItemStyle = {this.props.selectedItemStyle}
                        selectedItemIndexStyle = {this.props.selectedItemIndexStyle}
                        voidLineItem = {this.props.voidLineItem}
                        setCurrentItem = {this.props.setCurrentItem}
                        tax = {this.props.tax}
                        qtyPrice = {this.props.qtyPrice}
                        salesDiscountAmount = {this.props.salesDiscountAmount}
                        transactionDiscount = {this.props.transactionDiscount}
                        transactionDiscountAmount = {this.props.transactionDiscountAmount}    
                        associateDiscount = {this.props.associateDiscount}
                        associateDiscountAmount = {this.props.associateDiscountAmount}                    
                        taxAmount = {this.props.taxAmount}
                        isDiscount = {this.props.isDiscount}
                        isREPL = {this.props.isREPL}
                        isGiftReg = {this.props.isGiftReg}
                        isGiftRec = {this.props.isGiftRec}
                        saleID = {this.props.saleID}
                        isSplInstn = {this.props.isSplInstn}
                        index = {this.props.index}
                        currentItem = {this.props.currentItem}
                        obj = {this.props.obj}
                        comments = {this.props.comments}
                        showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
                    />
                )
            }
        }
    }
}