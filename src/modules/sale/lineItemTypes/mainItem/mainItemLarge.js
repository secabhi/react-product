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

    constructor(props){
        super(props);

        this.state = {
        };
    }

    selectItem(itemNumber,itemPrice,itemSku,selectedItem,index) {


        if(this.props.currentItem === selectedItem) {
            this.props.setCurrentItem('','','','','');
            
            console.log("not selected")
        }
        else {
            console.log("selected", index)
            
            this.props.setCurrentItem(itemNumber,itemPrice,itemSku,selectedItem,index);
        }
    }

    sendGiftReceipt = () =>{
        console.log('prop in large item'+JSON.stringify(this.props));
        this.props.showItemGiftReceiptModal(true,'itemreceipt');
    }
    
    render(){
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
        itemSize = "Size:"+" "+this.props.obj.size;
      }
        if(this.props.obj.imgLink !== 'Image Not Found') {
          imageURL = this.props.obj.imgLink
        } else {
          imageURL = noImageAvailable;
        }
        
        return(
            (this.props.obj.quantity > 0) ? (<div className="saleContent-card-large">
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
                        this.selectItem(this.props.obj.itemNumber,this.props.obj.itemPrice,this.props.obj.pim_SKU_ID,this.props.obj.lineNumber,this.props.index);
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
                <div className="item-info-container" onClick={() => this.selectItem(this.props.obj.itemNumber,this.props.obj.itemPrice,this.props.obj.pim_SKU_ID,this.props.obj.lineNumber,this.props.index)} >
                    <div className='item-info'>
                    <div className='item-index' style={this.props.selectedItemIndexStyle}>{this.props.obj.lineNumber}</div>
                    <div className='item-image' >
                      <img src={imageURL}  alt='item picture' height='144px' width='113px'/>
                    </div>
                    <div className='item-description'>
                        {/*<div className="item-category">{"Shirts/Tops"}</div> */}
                        <div className="item-desc">{this.props.obj.itemDesc}</div>
                        <div className="item-sku">{this.props.obj.department+"-"+this.props.obj.class+"-"+this.props.obj.subClass+'-'+this.props.obj.pim_SKU_ID}</div>
                        <div className="item-style-desc">{this.props.obj.styleDesc}</div>
                        <div className="item-brand-desc">{this.props.obj.brandDesc}</div>
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
                         <span className={this.props.obj.print_GWGR_Msg || this.props.isGiftReg ? "giftregistry_symbol":"lineItemDisplayNone"}>G</span> 
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
                                   <span> {"Savings " + "(" + this.props.transactionDiscount + "%)"}</span>

                                <div className="item-discount-number-off">
                                    -{parseFloat(this.props.transactionDiscountAmount).toFixed(2)}</div>
                                </div>
    :''}
                            </div>
                        </div>
                        <div className="item-tax-container">
                            <div className="item-discount-percent-spacing-tax">
                                {/*{"TAX(" + parseFloat(this.props.obj.taxPercent * 100).toFixed(3) + "%" + ")" + "10100"} */}
                                {`TAX (${this.props.obj.taxPercent}%)`}
                            </div>
                            <div className="item-tax-amount">{parseFloat(this.props.obj.itemsTax).toFixed(2)}</div>
                            <div className="item-tax-text">T</div>
                        </div>
                    </div>
                    </div>
                <table className="item-extra-item-details">
                    <tbody>
                        {/*NEEDS TO BE CHANGED AND PROPERLY IMPLIMENTED  */}
                     <tr className={this.props.obj.print_GWGR_Msg || this.props.isGiftReg ? "item-extra-gift-receipt":"item-extra-gift-receipt lineItemDisplayNone"}>
                        <td className="item-extra-line-item-titles">Gift Receipt:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.print_GWGR_Msg}</td>
                    </tr> 
                    <tr className={ this.props.isREPL ? "item-extra-REPL": "item-extra-REPL lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">REPL:</td>
                        <td className="item-extra-line-item-data">In {this.props.obj.replenishDays}, {this.props.obj.eventDescription} </td>
                    </tr>
                    <tr className={this.props.obj.salesId > 0 ? "item-extra-split-comm":"item-extra-split-comm lineItemDisplayNone"} >
                        <td className="item-extra-line-item-titles">Split Commission:</td>
                        <td className="item-extra-line-item-data">PIN - {this.props.obj.salesId}{(this.props.obj.assistId > 0) ? (',' + this.props.obj.assistId) : ''}</td>
                    </tr>
                    <tr className={ this.props.isGiftReg ? "item-extra-gift-registry": "item-extra-gift-registry lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Gift Registry #:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.gift_reg}</td>
                    </tr>
                    
                    <tr className={ this.props.isSplInstn ? this.props.obj.comment[0]===""?"item-extra-special-instructions lineItemDisplayNone": "item-extra-special-instructions":"item-extra-special-instructions lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Special Instruction:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.comment}</td>
                    </tr> 
                    </tbody>
                </table>
                </div>
                </Swipeout>
            </div>
            </div>) : (<div className="item-voided-container">
            <div className='item-info'>
                <div className='item-index-void-line'>{this.props.index+1}</div>
                <div className='item-description-void-line'>Line Voided</div> 
            </div>
            </div>)
        )
    }

    
}


