// Dependencies
import React, { Component, Fragment } from 'react';

import './itemsToBeShipped.css';

import CartRenderer from '../../../../common/cartRenderer/cartRenderer';

export default class ItemsToBeShippedView extends Component {
    render() {
        const ServicesFooter = this.props.optionalFooter;
        
        return (
            <Fragment>
                <CartRenderer
                    items={this.props.items}
                    selectedItems={this.props.selectedItems}
                    setCurrentItem = {this.props.setCurrentItem}
                />

                <ServicesFooter additionalStyle='sendComponent-offset'>
                    <div  className="giftwrap-cancel" onClick={this.props.navigate}><span className="giftwrap-cancel-text">Cancel</span></div>
                        <div className="giftwrap-next" 
                        onClick={() => {
                                this.props.updateObjectHandler("ItemList",this.props.getItemDetails());
                                this.props.componentChangeHandler("sendweightchart") 
                            }}>
                    <span className="giftwrap-next-text">Next</span></div>
                </ServicesFooter>
            </Fragment>
        );
    }

}


