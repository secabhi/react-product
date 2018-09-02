import React, {Component} from 'react';

import MainItemLarge from '../lineItemTypes/mainItem/mainItemLarge';
import MainItemSmall from '../lineItemTypes/mainItem/mainItemSmall';
import MainItemLargeQuantityValidation from '../lineItemTypes/mainItem/mainItemLargeQuantityValidation'
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
        
        console.log('giftWrapFlagDisplayed LineitemController',this.props.giftWrapFlagDisplayed);

        console.log("ITEMTYPE:", this.state.itemType);
        if(this.state.itemType == "alterations"){
            // console.log('IN ALTERATIONS', this.props);
            // alert("hello")
            // this.props.lastStatusIndicatorFunction("A");
            
            if(this.state.smallFormFactor){
                var date = this.props.obj.promisedDate;
                var day = date.substr(0,2);
                var month = date.substr(2, 2);
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
                        descriptionLine1 = {"NP "+this.prop.obj.department+' '+this.props.obj.class+"-"+this.prop.obj.subClass+" "+this.props.obj.alterationID}
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
                        descriptionLine1 = {"NP "+this.props.obj.department+' '+this.props.obj.class+"-"+this.props.obj.subClass+" "+this.props.obj.alterationID}
                        descriptionLine2 = {"Promised: " + day + '/' + month + '/' + year}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {"TAX(" + (parseFloat(this.props.tax * 100).toFixed(3)) + "%" + ")"}
                        taxParcent = {parseFloat(this.props.tax * 100).toFixed(3)}
                        qtyPrice = {this.props.qtyPrice}
                        itemsTax = {parseFloat(this.props.obj.itemsTax).toFixed(2) + " T"}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                        nonSkuItemsAreClickable = {this.props.nonSkuItemsAreClickable}
                        selectNonSkuItem = {this.props.selectNonSkuItem}
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
                        descriptionLine1 = {this.props.obj.pim_SKU_ID}
                        descriptionLine2 = {this.props.obj.comment[0] ? this.props.obj.print_GWGR_Msg
                            : ""}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        //pricingLine2 = {"TAX(" + (this.props.tax * 100) + "%" + ")" + "101000"} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
            else{
                
                let displayWrapNumber = (this.props.obj.wrapNumber.toString().length === 1 && this.props.obj.wrapNumber.toString().charAt(0)!=="0" ) ||  this.props.obj.wrapNumber==0?"0"+this.props.obj.wrapNumber : this.props.obj.wrapNumber;

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
                        descriptionLine1 = {this.props.obj.department + '-'+ this.props.obj.class + '-' + this.props.obj.subClass + '-' + displayWrapNumber + '-' + this.props.obj.wrapDescription}
                        descriptionLine2 = {this.props.obj.comment[0] ? this.props.obj.print_GWGR_Msg : ""}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {" "} 
                        comment = {this.props.obj.comment[0]}
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                        nonSkuItemsAreClickable = {this.props.nonSkuItemsAreClickable}
                        selectNonSkuItem = {this.props.selectNonSkuItem}
                    />
                )
                
            }
        }
        else if(this.state.itemType.slice(0,11) == "deliveryfee"){
            if(this.state.smallFormFactor){
                
            }
            else{
                return(
                    <AlternateLineItems
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType.slice(0,11)}
                        titleStyle = {"deliveryFee-title"}
                        spaceStyle = {"deliveryFee-space"}
                        containerStyle = {"delieveryFee-container"}
                        title = {"Delievery Fee"}
                        descriptionLine1 = {this.props.obj.department + '-'+ this.props.obj.class + '-' + this.props.obj.subClass }
                        descriptionLine2 = {this.props.obj.comment[0] ? this.props.obj.print_GWGR_Msg : ""}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {"TAX(" + (parseFloat(this.props.tax * 100).toFixed(3)) + "%" + ")"}
                        itemsTax = {parseFloat(this.props.obj.itemsTax).toFixed(2) + " T"} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
        }
        else if(this.state.itemType == "nmexpsscard"){
            if(this.state.smallFormFactor){
                return(
                    <AlternateLineItemsSmall
                        obj = {this.props.obj}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        img={this.props.obj.imgLink}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"giftcard-title"}
                        spaceStyle = {"giftcard-space"}
                        containerStyle = {"giftcard-container"}
                        // title = {"Gift Wrap:"}
                        descriptionLine1 = {this.props.obj.egcAccountNum}
                        // descriptionLine2 = {this.props.obj.comment[0] ? this.props.obj.print_GWGR_Msg
                        //     : ""}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {""} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
            }
            else {
                return (
                    <AlternateLineItems
                        obj = {this.props.obj}
                        giftCardItem={'giftCardIndex'}
                        selectedItemStyle = {this.props.selectedItemStyle}
                        index = {this.props.index}
                        indexStyle = {this.state.itemType}
                        titleStyle = {"giftcard-title"}
                        spaceStyle = {"giftcard-space"}
                        containerStyle = {"giftcard-container"}
                        title = {"NM Gift Card"}
                        descriptionLine1 = {this.props.obj.egcAccountNum}
                        pricingLine1 = {parseFloat(this.props.obj.salePrice).toFixed(2) + "  EA"}
                        pricingLine2 = {""} 
                        qtyPrice = {this.props.qtyPrice}
                        lastStatusIndicatorFunction = {this.props.lastStatusIndicatorFunction}
                    />
                )
                
            }
        }
        else{
            if(this.state.smallFormFactor){
                return(
                    <MainItemSmall 
                        selectedItemStyle = {this.props.selectedItemStyle}
                        selectedItemIndexStyle = {this.props.selectedItemIndexStyle}
                        selectedContentStyle = {this.props.selectedContentStyle}
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
                if(this.props.quantityValidationFlag === true) {
                    return(
                        <MainItemLargeQuantityValidation
                            selectedItemStyle = {this.props.selectedItemStyle}
                            selectedItemIndexStyle = {this.props.selectedItemIndexStyle}
                            selectedContentStyle = {this.props.selectedContentStyle}
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
                            itemAvailability = {this.props.itemAvailability}
                        />
                    )
                }
                else {                    
                    return(
                        <MainItemLarge
                            selectedItemStyle = {this.props.selectedItemStyle}
                            selectedItemIndexStyle = {this.props.selectedItemIndexStyle}
                            selectedContentStyle = {this.props.selectedContentStyle}
                            voidLineItem = {this.props.voidLineItem}
                            setCurrentItem = {this.props.setCurrentItem}
                            tax = {this.props.tax}
                            qtyPrice = {this.props.qtyPrice}
                            salesDiscountAmount = {this.props.salesDiscountAmount}
                            transactionDiscount = {this.props.transactionDiscount}
                            transactionDiscountAmount = {this.props.transactionDiscountAmount}    
                            associateDiscount = {this.props.associateDiscount}
                            associateDiscountAmount = {this.props.associateDiscountAmount}                 
                            discountsAppliedArray={this.props.discountsAppliedArray}
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
                            getisellFlagDisplayed={this.props.getisellFlagDisplayed}
                            gp={this.props.gp}
                        />
                    )
                }
            }
        }
    }
}