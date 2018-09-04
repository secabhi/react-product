// Dependencies
import React, { Component, Fragment } from 'react';

import './itemsToBeShipped.css';

import CartRenderer from '../../../../common/cartRenderer/cartRenderer';
import SendTitleHeader from '../../FreqShippedAddresses/SendTitleHeader/Controller/sendTitleHeader';

export default class ItemsToBeShippedView extends Component {
    render() {
        const ServicesFooter = this.props.optionalFooter;
        
        return (
            <Fragment>
                <SendTitleHeader 
                    title = {"Items to be shipped"} 
                />
                <div className={"cartRenderInSend"}>
                <CartRenderer
                    items={this.props.items}
                    setCurrentItem = {this.props.setCurrentItem}
                    adjustmentStyle={"cartRender-send"}
                />
                </div>

                <ServicesFooter additionalStyle='sendComponent-offset'>
                    <div  className="giftwrap-cancel" onClick={this.props.navigate}><span className="giftwrap-cancel-text">Cancel</span></div>
                        <button className="giftwrap-next"
                        disabled={this.props.selectionMade}
                        onClick={() => {
                                this.props.updateObjectHandler("ItemList",this.props.getItemDetails());
                                this.props.componentChangeHandler("sendweightchart") 
                            }}>
                    <span className="giftwrap-next-text">Next</span></button>
                </ServicesFooter>
            </Fragment>
        );
    }

}


