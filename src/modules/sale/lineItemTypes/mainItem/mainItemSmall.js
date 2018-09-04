import React, {Component} from 'react';
import SaleKeypad from '../../SaleKeypad';
import SaleFooter from '../../SaleFooter';
import SaleItems from '../../SaleItems';
import Swipeout from 'rc-swipeout';
import noImageAvailable from '../../../../resources/images/Image_placeholder.svg';
import 'rc-swipeout/assets/index.css';
import '../../sale-content.css';


export default class MainItemSmall extends Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    selectItem(itemNumber,itemPrice,itemSku,selectedItem,index) {

        if(this.props.currentItem === selectedItem) {
        this.props.setCurrentItem('','','','','');
        }
        else {
        this.props.setCurrentItem(itemNumber,itemPrice,itemSku,selectedItem,index);
        }
    }

    sendGiftReceipt = () =>{
        this.props.showItemGiftReceiptModal(true,'itemreceipt');
    }
    render(){
        let imageURL;
        if(this.props.obj.imgLink !== 'Image Not Found') {
            imageURL = this.props.obj.imgLink
          } else {
            imageURL = noImageAvailable;
        }
        console.log("GIFT REG:",this.props.isGiftReg)
        return(
            
            (this.props.obj.quantity > 0) ? (<div className="saleContent-card-small">
                <Swipeout
                right={[{
                    text: <div className="swipe-button-container">
                        <div className="swipe-button-icon-container">
                            <img className="swipe-button-icon-line-void" src={require('../../../../resources/images/Delete_White.svg')} />
                        </div>
                        <div className="swipe-button-text">Line</div>
                        <div className="swipe-button-text">Void</div>
                    </div>,
                    onPress: () => {
                        this.props.voidLineItem(this.props.index);
                    },
                    style: {
                        backgroundColor: '#b33d5d',
                        color: 'white',
                        height: '505px',
                        width: '250px',
                        marginTop: '2px',
                        marginBottom: '1px'
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
                        height: '505px',
                        width: '250px',
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
                    height: '100%'
                }}
                >
                <div style={this.props.selectedItemStyle} onClick={() => this.selectItem(this.props.obj.itemNumber,this.props.obj.itemPrice,this.props.obj.pim_SKU_ID,this.props.obj.lineNumber,this.props.index)} className='item' key={this.props.obj.sku + '-' + this.props.index}>
                    <div className="item-info-container">
                        <div className='item-info'>
                            <div className='item-index' style={this.props.selectedItemIndexStyle}>{this.props.index+1}</div>
                            <div className='item-image' >
                                <img src={imageURL}  alt='item picture' height='237.8px' width='190px'/>
                            </div>
                            <div className='item-description'>
                            <div class="sffrow1">
                                <div className="item-category">{"Shirts/Tops"}</div>
                                
                            </div>   
                                <div className="item-sku">{this.props.obj.department+"-"+this.props.obj.class+"-"+this.props.obj.subClass+'-'+this.props.obj.pim_SKU_ID}</div>
                                <div className="item-desc">{this.props.obj.itemDesc}</div>
                                <div className="item-designer">{this.props.obj.style}</div>
                            <div className="item-color-size"> 
                                <div className="item-color-small">
                                   <div> Color:</div> 
                                   <div>{this.props.obj.color=='NO COLOR'?'Graphite':this.props.obj.color}</div>
                                </div> 
                                <div className="item-color-small-dividers"></div>
                                <div className="item-size-small">
                                    <div>Size:</div> 
                                    <div>{this.props.obj.size=='NO SIZE'?'M':this.props.obj.size}</div>
                                </div> 
                                <div className="item-color-small-dividers"></div>
                                <div className="item-qty">
                                    <div>Qty&nbsp;</div> 
                                    <div>{this.props.obj.quantity}</div>
                                </div>    
                            </div>  
                            </div>  
                            <div className="item-codes"> 
                                {/* <span>Gp</span> */}
                                    {/* <span className=''>{this.state.indicators}</span>  */}
                                <span className={this.props.isGiftRec? "giftregistry_symbol":"lineItemDisplayNone"}>G</span> 
                                {/* <span className={this.props.isSplInstn ? "":" lineItemDisplayNone"}>S</span> */}
                             </div> 
                        </div>
                        
                        <div className="item-qty-calc-flex">
                            {/*<div className="item-qty">Qty {this.props.obj.quantity}</div>    */}
                             
                            <div className="item-calc">
                                <div className="item-price-original">
                                     {parseFloat(this.props.obj.salePrice).toFixed(2)}
                                </div> 
                                <div className="item-price-each-text">EA</div>
                                <div className="item-price-amount">
                                     {parseFloat(this.props.obj.itemsPrice).toFixed(2)}
                                </div>
                            </div>
                            <div className="item-discount-small">
                                <div className={this.props.associateDiscount > 0 ?"item-discount-associate":"item-discount-associate lineItemDisplayNone"}>
                                    <div className="item-associate-discount-text">
                                         {"Assoc Disc " + "(" + this.props.associateDiscount + "%)"} 
                                    </div>
                                    <div className="item-associate-discount-amount">
                                        -{parseFloat(this.props.associateDiscountAmount).toFixed(2)}
                                    </div>
                                </div>
                                {this.props.transactionDiscount || this.props.transactionDiscount!=0 ?

                                <div className={this.props.isDiscount ? "item-normal-discount-small":"item-normal-discount-small lineItemDisplayNone"}>

                                    <div className="item-discount-text">
                                         {"Savings " + "(" + this.props.transactionDiscount + "%)"} 
                                    </div>
                                    <div className="item-discount-number-off">
                                        -{parseFloat(this.props.transactionDiscountAmount).toFixed(2)}
                                    </div>
                               
                                </div>
                                 :''}
                                <div className="item-tax-small">
                                    <div className="item-discount-percent-spacing-tax">
                                         {"TAX(" + parseFloat(this.props.tax * 100).toFixed(3) + "%" + ")" + "10100"} 
                                    </div>
                                    <div className="item-tax-amount">
                                         {parseFloat(this.props.obj.itemsTax).toFixed(2)} 
                                    </div>
                                    <div className="item-tax-text">T</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </Swipeout> 
                <table className="item-extra-item-details">
                    <tbody>
                        {/*NEEDS TO BE CHANGED AND PROPERLY IMPLIMENTED  */}
                    {/* <tr className={this.props.isSplInstn ? "item-extra-gift-receipt":"item-extra-gift-receipt lineItemDisplayNone"}>
                        <td className="item-extra-line-item-titles">Gift Receipt:</td>
                        <td className="item-extra-line-item-data">{}</td>
                    </tr> */}
                    <tr className={ this.props.isREPL ? "item-extra-REPL": "item-extra-REPL lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">REPL:</td>
                        <td className="item-extra-line-item-data">In {this.props.obj.replenishDays}, {this.props.obj.itemDesc} </td>
                    </tr>
                    <tr className={this.props.obj.salesId > 0 ? "item-extra-split-comm":"item-extra-split-comm lineItemDisplayNone"} >
                        <td className="item-extra-line-item-titles">Split Comm:</td>
                        <td className="split-commisn-line-item-data item-extra-line-item-data">PIN - {this.props.obj.salesId},{this.props.obj.assistId}</td>
                    </tr>
                    <tr className={ this.props.isGiftReg ? "item-extra-gift-registry": "item-extra-gift-registry lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Gift Registry #:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.gift_reg}</td>
                    </tr>
                    <tr className={ this.props.isSplInstn ? "item-extra-special-instructions": "item-extra-special-instructions lineItemDisplayNone" }>
                        <td className="item-extra-line-item-titles">Spl Instn:</td>
                        <td className="item-extra-line-item-data">{this.props.obj.comment}</td>
                    </tr>
                    </tbody>
                </table>
            </div>):
            (<div className="item-voided-container">
            <div className='item-info-voided'>
                <div className='item-index-void-line'>{this.props.obj.lineNumber}</div>
                <div className='item-description-void-line'>Line Voided</div> 
            </div>
            </div>)
        )
    }
}