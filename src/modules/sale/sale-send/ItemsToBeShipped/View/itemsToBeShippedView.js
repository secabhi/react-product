// Dependencies
import React, { Component } from 'react';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {itemsSelectedAction, itemSelectedAction } from '../../../../common/cartRenderer/actions';

import './itemsToBeShipped.css';

import CartRenderer from '../../../../common/cartRenderer/cartRenderer';

class ItemsToBeShippedView extends Component {
    render() {
        console.log('Sweezey : itemsToBeShippedView.js', this.props.items);
        return (
            
            <CartRenderer
                items={this.props.items}
                setCurrentItem = {(itemNumber,itemPrice,itemSku,selectedItem,index) => this.props.itemsSelectedAction(selectedItem)}
            />
            // <div>this is bob</div>
        );
    }

    
}


const mapDispatchToProps = (dispatch)  => {
    return bindActionCreators(
        {
          itemsSelectedAction,
          itemSelectedAction
        }, dispatch)
  }

  export default connect(null, mapDispatchToProps)(ItemsToBeShippedView);