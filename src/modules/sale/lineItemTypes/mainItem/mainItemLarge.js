import React, {Component} from 'react';
import SaleKeypad from '../../SaleKeypad';
import SaleFooter from '../../SaleFooter';
import SaleItems from '../../SaleItems';
import Swipeout from 'rc-swipeout';
import noImageAvailable from '../../../../resources/images/Image_placeholder.svg';
import StatusIndicators from './statusIndicators/statusIndicators';

import 'rc-swipeout/assets/index.css';
import '../../sale-content.css';


export default class MainItemLarge extends Component{

    constructor(props) {
        super(props);

        this.state = {
            getisellFlagDisplayed:[
                {
                    giftwrapdisplayFlag:false
                }
            ]
           
        };
    }

    handleOnclick() {
        //prevent line voids from being selectable
        if(this.props.obj.item_flag_1 !== '128') {
            console.log('this is clickable');
            this.selectItem(this.props.obj.itemNumber,this.props.obj.itemPrice,this.props.obj.pim_SKU_ID,this.props.obj.lineNumber,this.props.index,this.props.obj.gift_reg);
        }       
    }


    selectItem(itemNumber,itemPrice,itemSku,selectedItem,index,giftReg) {


        if(this.props.currentItem === selectedItem) {
            this.props.setCurrentItem('','','','','','');
            
            console.log("not selected")
        }
        else {
            console.log("selected", index)
            
            this.props.setCurrentItem(itemNumber,itemPrice,itemSku,selectedItem,index,giftReg);
        }
    }

    sendGiftReceipt = () =>{
        console.log('prop in large item'+JSON.stringify(this.props));
        this.props.showItemGiftReceiptModal(true,'itemreceipt');
    }
    
    render(){

        console.log('this.props.giftWrapFlagDisplayed Mainitem',this.props)
     let itemColor;
     let itemSize;
     let imageURL;
     
     if(this.props.obj.color=="NO COLOR" || this.props.obj.color=="NO COL") {
        itemColor = ""
       
      } else {
        itemColor = this.props.obj.color;
      }
      if(this.props.obj.size=="NO SIZE" || this.props.obj.size=="NO SIZ") {
       itemSize = ""       
      } else {
        itemSize = "Size "+" "+this.props.obj.size;
      }
        if(this.props.obj.imgLink !== 'Image Not Found') {
          imageURL = this.props.obj.imgLink
        } else {
          imageURL = noImageAvailable;
        }
        
        var taxLength;
        var taxperc = this.props.obj.taxPercent.toString();
       
        
        if(taxperc.length==1)
        {
            taxLength = 'taxlength1';
        }
        if(taxperc.length==2)
        {
            taxLength = 'taxlength2';
        }
        if(taxperc.length==3)
        {
            taxLength = 'taxlength3';
        }
        if(taxperc.length==4)
        {
            taxLength = 'taxlength4';
        }
        if(taxperc.length==5)
        {
            taxLength = 'taxlength5';
        }
        if(taxperc.length==6)
        {
            taxLength = 'taxlength6';
        }
        if(this.props.gp){
            var allservicesflags=this.props.giftWrapFlagDisplayedmaintem
        }

        return(
            
            (this.props.obj.quantity > 0) ? ( <div className="saleContent-card-large"> 
            <div style={this.props.selectedItemStyle} className='item' key={this.props.obj.pim_SKU_ID + '-' + this.props.index+1}>
                <Swipeout
                right={[{
                    text: <div className="swipe-button-container">
                        <div className="swipe-button-icon-container">
                            <img className="swipe-button-icon-line-void" src={require('../../../../resources/images/Line_Void.svg')} />
                        </div>
                        <div className="swipe-button-text">Line Void</div>
                    </div>,
                    onPress: () => {
                        this.props.voidLineItem(this.props.index);
                    },
                    style: {
                        backgroundColor: '#b33d5d',
                        color: 'white',
                        height: '194px',
                        width: '146px',
                        marginTop: '2px',
                        marginBottom: '1px',
                        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)'
                    },
                    className: 'line-void-button'
                },
                {
                    text: <div>
                        <div className="checkbox-icon-container">
                        <input className="swipe-button-icon-gift-receipt" type="checkbox" onClick={this.sendGiftReceipt} name="radio" checked={this.props.isGiftRec?"checked":''}/>
                         {/*<img className="swipe-button-icon-gift-receipt" src={require('../../../../resources/images/Gift_Receipt_Unchecked.svg')} />*/}
                        </div>
                        <div className="swipe-button-text">Gift</div>
                        <div className="swipe-button-text">Receipt</div>
                    </div>,
                    onPress: () => {
                        
                    },
                    style: {
                        backgroundColor: '#4b2b6f',
                        color: 'white',
                        height: '194px',
                        width: '144px',
                        marginTop: '2px',
                        marginBottom: '1px'
                    },
                    className: 'gift-receipt-button'
                }]}
                onOpen={() => {
                    console.log('open');
                    if(this.props.currentItem !== this.props.obj.lineNumber) {
                        this.selectItem(this.props.obj.itemNumber,this.props.obj.itemPrice,this.props.obj.pim_SKU_ID,this.props.obj.lineNumber,this.props.index,this.props.obj.gift_reg);
                    }
                }}
                onClose={() => {
                    console.log('close');
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)'
                }}
                >
                <div className="item-info-container" style={this.props.selectedContentStyle} onClick={() => this.handleOnclick()} >
                    <div className='item-info'>
                    <div className='item-index' style={this.props.selectedItemIndexStyle}>{this.props.obj.lineNumber}</div>
                    <div className='item-image' >
                      <img src={imageURL}  alt='item picture' height='144px' width='113px'/>
                    </div>
                    <div className='item-description'>
                        {/*<div className="item-category">{"Shirts/Tops"}</div> */}
                        <div className="item-desc">{this.props.obj.itemDesc}</div>
                        <div className="item-sku">{this.props.obj.department+"-"+this.props.obj.class+"-"+this.props.obj.subClass+'-'+this.props.obj.pim_SKU_ID}</div>
                        {(this.props.obj.brandDesc!=="UNMAPPED") ?
                            <div className="item-style-desc">{this.props.obj.styleDesc}</div>:null
                        }
                        {(this.props.obj.brandDesc!=="UNMAPPED") ?
                            <div className="item-brand-desc">{this.props.obj.brandDesc}</div>:null
                        } 
                    <div className="item-designer">{this.props.obj.style}</div>
                    </div>   
                    </div>
                    <div className="item-color-size"> 
                    <div className="item-color-size item-qty">Qty {this.props.obj.quantity}</div>    
                    <div className="item-color-size-oneLine"><div className="item-color-text">{itemColor}</div> <div className="item-color-size-Spacing">{itemSize}</div></div>
                    </div>
                    {/* <StatusIndicators 
                        updateLastStatusIndicatorFunction = {this.props.updateLastStatusIndicatorFunction}
                        
                    /> */}
                    <div className="item-codes">
                        {/* <span>Gp</span> */}
                            {/* <span className=''>{this.state.indicators}</span>  */}
                         {/* <span className={(this.props.obj.item_Flag_1 === 2 && this.props.obj.item_Flag_2 === 8192) || (this.props.obj.item_Flag_1 === 2 && this.props.obj.item_Flag_2 === 0) || this.props.isGiftReg ? "giftregistry_symbol":"lineItemDisplayNone"}>G</span>  */}
                         <span className={this.props.isGiftRec ? "giftregistry_symbol":"lineItemDisplayNone"}>G</span> 
                         {/* <span className={this.props.obj.item_Flag_2 === 8192 || this.props.isGiftReg ? "giftregistry_symbol":"lineItemDisplayNone"}>G</span>  */}

                         <span className={this.props.getisellFlagDisplayed.giftwrapdisplayFlag || this.props.obj.item_Flag_2 === 2 || (this.props.obj.item_Flag_1 === 4098 && this.props.obj.item_Flag_2 === 8192) ? "giftregistry_symbol":"lineItemDisplayNone"}>A</span>
                         {/* <span className={this.props.getisellFlagDisplayed.alterationdisplayFlag || this.props.obj.alterationID.length > 1 ? "giftregistry_symbol":"lineItemDisplayNone"}>A</span>  */}
                         <span className={this.props.getisellFlagDisplayed.sendsdisplayFlag || this.props.obj.sendOption === 1 || this.props.obj.sendOption === 2 ? "giftregistry_symbol":"lineItemDisplayNone"}>S</span> 
                         {/* <span className={this.props.getisellFlagDisplayed.sends7displayFlag || this.props.obj.sendOption === 2 ? "giftregistry_symbol":"lineItemDisplayNone"}>S</span>  */}
                        {/* <span className={this.props.isSplInstn ? "":" lineItemDisplayNone"}>S</span> */}
                    </div>
                    <div className="item-price-info-container">
                        <div className="item-price">
                             <div className="item-price-original">{parseFloat(this.props.obj.salePrice).toFixed(2)}</div> 
                            <div className="item-price-each-text">EA</div>
                            <div className="item-price-amount">{parseFloat(this.props.obj.itemsPrice).toFixed(2)}</div>

                        </div>
                    <div className="item-calc">
                        <div className={this.props.isDiscount ? "item-sale-percent":"item-sale-percent lineItemDisplayNone"}>
                            <div className="item-sale-amount">
                                <div className={ this.props.associateDiscount > 0 ? "item-discount-associate":"item-discount-associate lineItemDisplayNone"}>{"Assoc Disc " + "(" + this.props.associateDiscount + "%)"}
                                <span className='item-associate-discount-amount'>-{parseFloat(this.props.associateDiscountAmount).toFixed(2)}</span>
                                </div>
                                {this.props.transactionDiscount || this.props.transactionDiscount!=0 ?
                                <div className="item-discount-percent-spacing">
                                   <div style={{flex: 1, paddingRight: '10px'}}> {"Savings " + "(" + this.props.transactionDiscount + "%)"}</div>

                                <div className="item-discount-number-off">
                                    - {" "+parseFloat(this.props.transactionDiscountAmount).toFixed(2)}</div>
                                </div>
                                :''}
                                {this.props.percentageMarkdownDiscount || this.props.percentageMarkdownDiscount!=0 ?
                                <div className="item-discount-percent-spacing">
                                   <div style={{flex: 1, paddingRight: '10px'}}> {"MKD% (" + this.props.percentageMarkdownDiscount + "%)"}</div>

                                <div className="item-discount-number-off">
                                    -{" "+this.props.percentageMarkdownDiscountAmount}</div>
                                </div>
                                :''}
                                {this.props.dollarMarkdownDiscount || this.props.dollarMarkdownDiscount!=0 ?
                                <div className="item-discount-percent-spacing">
                                   <div style={{flex: 1, paddingRight: '10px'}}> {"MKD$"}</div>

                                <div className="item-discount-number-off">
                                    -{" "+this.props.dollarMarkdownDiscountAmount}</div>
                                </div>
                                :''}
                                {this.props.newPriceMarkdownDiscount || this.props.newPriceMarkdownDiscount!=0 ?
                                <div className="item-discount-percent-spacing">
                                   <div style={{flex: 1, paddingRight: '10px'}}> {"MKD Old/New"}</div>

                                <div className="item-discount-number-off">
                                    -{" "+this.props.newPriceMarkdownDiscountAmount}</div>
                                </div>
                                :''}
                                {this.props.priceOverrideMarkdownDiscount || this.props.priceOverrideMarkdownDiscount!=0 ?
                                <div className="item-discount-percent-spacing">
                                   <div style={{flex: 1, paddingRight: '10px'}}> {"Price Override"}</div>

                                <div className="item-discount-number-off">
                                    -{" "+this.props.priceOverrideMarkdownDiscountAmount}</div>
                                </div>
                                :''}
                            </div>
                        </div>
                        <div className={this.props.obj.itemsTax>0?"item-tax-container":"item-tax-container-hide"}>
                            <div className={"item-discount-percent-spacing-tax "+taxLength}>
                                {/*{"TAX(" + parseFloat(this.props.obj.taxPercent * 100).toFixed(3) + "%" + ")" + "10100"} */}
                                {`TAX (${parseFloat(this.props.obj.taxPercent).toFixed(3)}%) `}{this.props.obj.vertexProdCode}
                            </div>
                            <div className="item-tax-amount">{parseFloat(this.props.obj.itemsTax).toFixed(2)}</div>
                            <div className="item-tax-text">T</div>
                        </div>
                    </div>
                    </div>
                <table className="item-extra-item-details">
                    <tbody>

                        {/*NEEDS TO BE CHANGED AND PROPERLY IMPLIMENTED  */}
                     { !this.props.isGiftReg  &&  <tr className={this.props.obj.print_GWGR_Msg || this.props.isGiftReg ? "item-extra-gift-receipt":"item-extra-gift-receipt lineItemDisplayNone"}>
                        <td className="item-extra-line-item-titles">Gift Receipt:</td>
                        <td className="item-extra-line-item-data">Gift Receipt Requested</td>
                     </tr> } 
                    { this.props.isREPL && <tr className={ this.props.isREPL ? "item-extra-REPL": "item-extra-REPL lineItemDisplayNone" }>
                        {/* <td className="item-extra-line-item-titles">REPL:</td>
                        <td className="item-extra-line-item-data">In {this.props.obj.replenishDays} {(this.props.obj.eventDescription)?',':''} {this.props.obj.eventDescription} </td> */}
                        <td className="item-extra-line-item-titles-repl">REPL</td>
                        <td className="item-extra-line-item-data">In {this.props.obj.replenishDays} Days {(this.props.obj.eventDescription)?',':''}  {this.props.obj.eventDescription} </td>
                    </tr> }
                    { this.props.obj.salesId > 0 && <tr className={this.props.obj.salesId > 0 ? "item-extra-split-comm":"item-extra-split-comm lineItemDisplayNone"} >
                        <td className="item-extra-line-item-titles">Split Commission:</td>
                        <td className="item-extra-line-item-data">PIN - {this.props.obj.salesId}{(this.props.obj.assistId > 0) ? (',  ' + this.props.obj.assistId) : ''}</td>
                    </tr> }
                    { this.props.isGiftReg && <tr className={ this.props.isGiftReg ? "item-extra-gift-registry": "item-extra-gift-registry lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Gift Registry #:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.gift_reg}</td>
                    </tr> }
                    
                    { this.props.isSplInstn && this.props.obj.comment[0]!=="" && <tr className={ this.props.isSplInstn ? this.props.obj.comment[0]===""?"item-extra-special-instructions lineItemDisplayNone": "item-extra-special-instructions":"item-extra-special-instructions lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Special Instructions:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.comment}</td>
                    </tr> }
                    </tbody>
                </table>
                </div>
                </Swipeout>
            </div>
            </div>) : (<div className="item-voided-container">
            <div className='item-info'>
                <div className='item-index-void-line'>{this.props.obj.lineNumber}</div>
                <div className='item-description-void-line'>Line Voided</div> 
            </div>
            </div>)
            
        )
    }

    
}

MainItemLarge.defaultProps = {
    getisellFlagDisplayed : {
        skuId : '',
        giftwrapdisplayFlag : false,
        alterationdisplayFlag: false,
        sendsdisplayFlag:false,
        sends7displayFlag:false,
    }
}

