import React, {Component} from 'react';
import Moment from 'moment';

import SaleKeypad from '../../SaleKeypad';
import SaleFooter from '../../SaleFooter';
import SaleItems from '../../SaleItems';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import '../../sale-content.css';
import './alternateLineItems.css';


export default class AlternateLineItems extends Component{
    handleOnClick = (lineNumber) => {
        //only handle click if alteration or giftWrap and came from sales container
        if(this.props.nonSkuItemsAreClickable && (this.props.title === "Alterations" || this.props.title === "Gift Wrap:" )){
            this.props.selectNonSkuItem(lineNumber);
        }
    }

    render(){   
        const indexStyle = this.props.selectedItemStyle ? 'selected' : this.props.indexStyle;

        var taxLength;
        var taxperc2 =  this.props.pricingLine2.replace(/\D/g,'');
        var taxperc = taxperc2.replace(/[\])}[{(]/g, '').replace(/(\%)/, "");
       
       if(taxperc.length=='0' || taxperc.length==0)
       {
        taxLength = 'taxlength1';
       }
       
        if(taxperc.length==2)
        {
            taxLength = 'taxlength3';
        }
        if(taxperc.length==3)
        {
            taxLength = 'taxlength4';
        }
        if(taxperc.length==4)
        {
            taxLength = 'taxlength5';
        }
        if(taxperc.length==5)
        {
            taxLength = 'taxlength6';
        }
        if(taxperc.length=='6')
        {
            taxLength = 'taxlength7';
        }
        return(
            (this.props.obj.quantity > 0) ? (<div className="saleContent-card-large" onClick={()=>{this.handleOnClick(this.props.obj.lineNumber)}}>
            <div style={this.props.selectedItemStyle} className='item' key={this.props.obj.pim_SKU_ID + '-' + this.props.index}>
                <div className={this.props.comment?"item-extraDetail-container " + this.props.containerStyle+" giftwrap-message-container":"item-extraDetail-container " + this.props.containerStyle} >
                    {this.props.giftCardItem === 'giftCardIndex' ? 
                    <div className={'item-index-extra-line-items '+ this.props.giftCardItem} >{this.props.obj.lineNumber}</div>
                    :
                    <div className={'item-index-extra-line-items '+ indexStyle} >{this.props.obj.lineNumber}</div>
                    }

                    {this.props.giftCardItem === 'giftCardIndex' ? 
                    <div className="card-info-container">

                        <div className="card-small-container">
                            {/* <img className="card-info-img" src={this.props.img}/> */}
                            <div className="card-info-small">{this.props.title}</div>
                            <div className="card-price-small">{this.props.obj.itemsPrice}</div>
                        </div>

                        <div className="card-title-container">
                            <div className="card-info-title">{this.props.title}</div>
                            <div className="card-info-desc">{this.props.descriptionLine1}</div>
                        </div>
                    </div>
                    : 
                    
                    <div className={"item-info-card-title "+ this.props.titleStyle}>
                        {this.props.title}
                    </div>
                    }
                    
                    {this.props.giftCardItem === 'giftCardIndex' ? null :
                    <div className="item-info-card-description">
                   
                        <div className={this.props.comment?"item-info-card-description-line1 wrap-message":"item-info-card-description-line1"}>
                            {this.props.descriptionLine1}
                        </div>

                        <div className={this.props.comment?"item-info-card-description-line2 wrap-message":"item-info-card-description-line2"}>
                            {this.props.descriptionLine2}
                        </div>
                    
                    <div className="giftwrap-message">
                    {this.props.comment}
                    </div>
                    </div> 
                    }

                    <div className={"item-info-card-qty giftcard-container-quantity"}>
                        {"Qty " + this.props.obj.quantity}
                    </div>

                    {this.props.giftCardItem === 'giftCardIndex' ? null :
                    <div className={"item-info-extra-space " + this.props.spaceStyle}>
                    </div>
                    }

                    <div className="item-info-card-pricing">
                        <div className="item-info-card-pricing-line1 giftcard-priceline1">
                            {this.props.pricingLine1}
                        </div>
                        <div className={this.props.obj.itemsTax>0?"item-info-card-pricing-line2 ":"item-tax-container-hide"}>
                            {this.props.pricingLine2}
                        </div>
                    </div>

                    <div className="item-info-card-totals">
                        <div className="item-info-card-totalPrice">
                            {parseFloat(this.props.obj.itemsPrice).toFixed(2)}
                        </div>
                        <div className={this.props.obj.itemsTax>0?"item-info-card-totalTax":"item-tax-container-hide"}>
                            {this.props.itemsTax}
                        </div>
                    </div>

                </div>
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