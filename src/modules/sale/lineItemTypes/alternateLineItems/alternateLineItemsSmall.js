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

    render(){        
        return(
            (this.props.obj.quantity > 0) ? (<div className="saleContent-card-small">
            <div style={this.props.selectedItemStyle} className='item' key={this.props.obj.pim_SKU_ID + '-' + this.props.index}>
                <div className={"item-extraDetail-container " + this.props.containerStyle} >
                    <div className={'item-index-extra-line-items '+ this.props.indexStyle} >{this.props.index+1}</div>
                    <div className={"item-info-card-title "+ this.props.titleStyle}>
                        {this.props.title}
                    </div>
                    {/* <div className={"item-info-extra-space " + this.props.spaceStyle}>
                    </div> */}
                    <div className="item-information-container-small">
                        <div className="item-info-card-description-container-small">
                            <div className="item-info-card-description">
                                <div className="item-info-card-description-line1">
                                    {this.props.descriptionLine1}
                                </div>
                                <div className="item-info-card-description-line2">
                                    {this.props.descriptionLine2}
                                </div>
                            </div>
                            <div className="item-info-card-qty">
                                {"Qty " + this.props.obj.quantity}
                            </div>
                        </div>
                        <div className="item-info-card-pricing-container-small">
                            <div className="item-info-card-pricing">
                                <div className="item-info-card-pricing-line1">
                                    {this.props.pricingLine1}
                                </div>
                                <div className="item-info-card-pricing-line2">
                                    {this.props.pricingLine2}
                                </div>
                            </div>
                            <div className="item-info-card-totals">
                                <div className="item-info-card-totalPrice">
                                    {parseFloat(this.props.obj.itemsPrice).toFixed(2)}
                                </div>
                                <div className="item-info-card-totalTax">
                                    {this.props.itemsTax}
                                </div>
                            </div>
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