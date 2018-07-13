import React, { Component } from 'react';
import './itemsToBeShipped.css';

import CartRenderer from '../../../../common/cartRenderer/cartRenderer';

export default class ItemsToBeShippedView extends Component {
    render() {
        console.log(this.props.items);
        return (
            
            <CartRenderer
                items={this.props.items}
            />
            // <div>this is bob</div>
        );
    }
}