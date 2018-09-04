import React, { Component } from 'react';

import LineItemController from '../../sale/lineItemTypes/lineItemController';
import noImageAvailable from '../../../resources/images/Image_placeholder.svg';

export default class SelectItemCartRenderer extends Component{
    constructor(props){
        super(props);


    }

    render(){
        console.log('content', this.props)

        const itemStyle = {
        boxShadow: '0 0 6px 0 #613b8c',
        backgroundColor: 'rgba(168, 126, 214, 0.05)',
        border: 'solid 2px #a87ed6'
        };

        const selectedIndexStyle = {
        backgroundColor: "#a87ed6 ",
        border: '2px solid #a87ed6'

        }

        //const selectedItemStyle = this.props.selected ? itemStyle : null;
        //Create array of items to display
console.log('items in render'+JSON.stringify(this.props.items));

var selectedItemObject = (<div></div>);

const disabledStyle = {
  opacity: this.props.items[0] ? '1' : '.5',
  disabled: this.props.items[0] ? 'false' : 'true',
  pointerEvents: this.props.items[0] ? 'auto' : 'none'
}

  const obj = this.props.items;
  /*const selectedItemStyle = {
    boxShadow: '0 0 6px 0 #613b8c',
    backgroundColor: 'rgba(168, 126, 214, 0.05)',
    border: 'solid 2px #a87ed6'
  };*/

  //let qtyPrice = parseFloat(obj.itemPrice * obj.quantity).toFixed(2);
  console.log("state.items: in selectitem cart", JSON.stringify(this.props));
  console.log("state.currentIndex:", this.props.currentItemIndex);

  let selectedItemStyle = (obj.lineNumber === this.props.currentItem) ? itemStyle : null;
  let selectedItemIndexStyle = (obj.lineNumber === this.props.currentItem) ? selectedIndexStyle : null;
  let qtyPrice = parseFloat(obj.itemPrice * obj.quantity).toFixed(2);
  let salesDiscountAmount = parseFloat(obj.taxPercent * obj.itemsPrice).toFixed(2);
  let taxAmount = parseFloat((qtyPrice - salesDiscountAmount) * this.SALES_TAX).toFixed(2);
  let isDiscount = obj.discounts.length > 0 ? true:false;
  let isComment = obj.comment.length > 0 ? true:false;
  // let isGiftReceipt = obj.
  let isREPL = obj.replenishDays > 0 ? true:false;
  let isGiftReg = obj.gift_reg == 0 || obj.gift_reg === '' ||obj.gift_reg === null ? false:true;
  let isGiftRec = obj.print_GWGR_Msg == 0 || obj.print_GWGR_Msg == undefined || obj.print_GWGR_Msg === '' || obj.print_GWGR_Msg === null ? false:true;
  let isSplInstn = obj.comment.length > 0 ? true:false; //needs to be changed!!!
  let saleID= obj.salesId;
  let imageURL;
    if(obj.image) {
      imageURL = obj.imgLink
    } else {
      imageURL = noImageAvailable;
    }

  console.log("obj.print_GWGR_Msg", obj.print_GWGR_Msg)
  if(isDiscount){
  // var transactionDiscount = obj.discounts[0].discountValue;
  // var transactionDiscountAmount = obj.discounts[0].discountAmount;
  var transactionDiscount = 0;
  var transactionDiscountAmount = 0;
  var associateDiscount = 0;
  var associateDiscountAmount = 0;

  for(var i =0; i < obj.discounts.length;i++){
      if(obj.discounts[i].discounttype === "Associate Discount"){
      associateDiscount = obj.discounts[i].discountValue;
      associateDiscountAmount = obj.discounts[i].discountAmount;
      }
      transactionDiscount += obj.discounts[i].discountValue;
      transactionDiscountAmount += obj.discounts[i].discountAmount;
  }
  }

  if(isComment){
  var comments = obj.comment[0];
  }
  selectedItemObject = (<div style={selectedItemStyle} onClick={() => this.selectItem(obj.itemNumber,obj.itemPrice,obj.pim_SKU_ID,obj.lineNumber,this.props.currentItemIndex)} className='item' key={obj.sku + '-' + this.props.currentItemIndex}>
      <div className="item-info-container">
          <div className='item-info'>
              <div className='item-index' style={this.props.selectedItemIndexStyle}>{this.props.currentItemIndex+1}</div>
              <div className='item-image' >
                  <img src={imageURL}  alt='item picture'/>
              </div>
              <div className='item-description'>
              <div class="sffrow1">
                  <div className="item-category">{"Shirts/Tops"}</div>
                  
              </div>   
                  <div className="item-sku">{obj.department+"-"+obj.class+"-"+obj.subClass+'-'+obj.pim_SKU_ID}</div>
                  <div className="item-desc">{obj.itemDesc}</div>
                  <div className="item-designer">{obj.style}</div>
              <div className="item-color-size"> 
                  <div className="item-color-small">
                     <div> Color:</div> 
                     <div>{obj.color=='NO COLOR'?'Graphite':obj.color}</div>
                  </div> 
                  <div className="item-color-small-dividers"></div>
                  <div className="item-size-small">
                      <div>Size:</div> 
                      <div>{obj.size=='NO SIZE'?'M':obj.size}</div>
                  </div> 
                  <div className="item-color-small-dividers"></div>
                  <div className="item-qty">
                      <div>Qty&nbsp;</div> 
                      <div>{obj.quantity}</div>
                  </div>    
              </div>  
              </div>  
              <div className="item-codes"> 
                  {/* <span>Gp</span> */}
                      {/* <span className=''>{this.props.indicators}</span>  */}
                  <span className={isGiftRec? "giftregistry_symbol":"lineItemDisplayNone"}>G</span> 
                  {/* <span className={this.props.isSplInstn ? "":" lineItemDisplayNone"}>S</span> */}
               </div> 
          </div>
          
          <div className="item-qty-calc-flex">
              {/*<div className="item-qty">Qty {this.props.obj.quantity}</div>    */}
               
              <div className="item-calc">
                  <div className="item-price-original">
                       {parseFloat(obj.salePrice).toFixed(2)}
                  </div> 
                  <div className="item-price-each-text">EA</div>
                  <div className="item-price-amount">
                       {parseFloat(obj.itemsPrice).toFixed(2)}
                  </div>
              </div>
              <div className="item-discount-small">
                  <div className={associateDiscount > 0 ?"item-discount-associate":"item-discount-associate lineItemDisplayNone"}>
                      <div className="item-associate-discount-text">
                           {"Assoc Disc " + "(" + associateDiscount + "%)"} 
                      </div>
                      <div className="item-associate-discount-amount">
                          -{parseFloat(associateDiscountAmount).toFixed(2)}
                      </div>
                  </div>
                  <div className={isDiscount ? "item-normal-discount-small":"item-normal-discount-small lineItemDisplayNone"}>
                      <div className="item-discount-text">
                           {"Savings " + "(" + transactionDiscount + "%)"} 
                      </div>
                      <div className="item-discount-number-off">
                          -{parseFloat(transactionDiscountAmount).toFixed(2)}
                      </div>
                  </div>
                  <div className="item-tax-small">
                      <div className="item-discount-percent-spacing-tax">
                           {"TAX(" + parseFloat(this.props.tax * 100).toFixed(3) + "%" + ")" + "10100"} 
                      </div>
                      <div className="item-tax-amount">
                           {parseFloat(obj.itemsTax).toFixed(2)} 
                      </div>
                      <div className="item-tax-text">T</div>
                  </div>
              </div>
          </div>
      </div>
      
  </div>);
        

        return (selectedItemObject)   
    }
}