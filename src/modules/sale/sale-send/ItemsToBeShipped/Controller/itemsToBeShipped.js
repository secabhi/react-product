import React, { Component } from 'react';
import ItemsToBeshippedView from '../View/itemsToBeShippedView'

export default class ItemsToBeShipped extends Component {
    render() {
        return (
            <ItemsToBeshippedView
                items={this.props.items}
            />
        );
    }
}