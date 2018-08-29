import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CartRenderer from '../common/cartRenderer/cartRenderer';

import { setCurrnetItem,addItemsRequest, addItemsSuccess, addItemsFailure } from './SalesCartAction';

class SaleContent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selected: false,
      currentItem:'',
    }

    this.lastStatusIndicatorFunction = '';
  }

  voidLineItem = (index) => {
      var clickedItem = Object.assign({},this.props.items[index][0])
      //clickedItem.LineNumber = "100";
      console.log('Void Line clickedItem: ', clickedItem);
      console.log('Void Line props: ', this.props.items[index][0]);
      this.props.voidLineItem(clickedItem);
      //this.showVoidLineConfirmModal(true,clickedItem)
  }

  sendGiftReceipt = (index) => {
      console.log('Send Gift Receipt: ', this.props.items[index]);
  }

  showVoidLineConfirmModal = (showFlag,item) => {
    this.props.showVoidLineConfirmModal(showFlag,item);
  }
        
  render() {
    console.log('giftWrapFlagDisplayObject SaleContent',this.props.giftWrapFlagDisplayObject);
    console.log('gp SaleContent',this.props.gp);
    return(
      <CartRenderer 
        items = {this.props.items}
        currentItem = {this.props.currentItem}
        tax = {this.props.tax}
        showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
        setCurrentItem = {this.props.setCurrentItem}
        voidLineItem={this.voidLineItem}
        scrollCheck={this.props.scrollCheck}
        nonSkuItemsAreClickable
        autoreplenishflag={this.props.autoreplenishflag}
        getisellFlagDisplayObject={this.props.getisellFlagDisplayObject}
        GetisellFlag = {this.props.GetisellFlag}
        gp={this.props.gp}
      />
    )
  }
};

// SaleContent.defaultProps = {
//   giftWrapFlagDisplayObject: [{
//       skuId: '',
//       displayFlag: false
//   }]
// }

function mapStateToProps(state) {
  return { cart : state.cart }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addItemsRequestInvoker: addItemsRequest,
      setCurrnetItemInvoker : setCurrnetItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleContent);
