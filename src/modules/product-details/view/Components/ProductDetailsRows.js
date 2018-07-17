import React, { Component } from "react";
import ShowMore from "react-show-more";
import { bindActionCreators } from 'redux';
import { startSpinner } from '../../../../modules/common/loading/spinnerAction';
import { connect } from 'react-redux';


import AddtoBag from "../../../../resources/images/Add_to_Bag.svg";
import PrintIcon from "../../../../resources/images/Print.svg";

import { productRowAction } from '../../ProductRowAction';
import { productDetailInfoAction } from '../../ProductDetailinfoAction';

import { pluck, map, each } from 'underscore';

class ProductDetailsRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFilterData: ''
    }
  }

  componentDidMount() {
    debugger;
    if (this.props.product) {
      let pimStyleId = this.props.product.pimstyleId;
      let pimskuId = this.props.product.pimskuId;
      //let pimStyleId = 1713023;
      this.props.startSpinner(true);
      this.props.productSearhActionInvoker("filter_set", { pimStyleId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });

      this.props.productDetailInfoInvoker("get_info", { pimskuId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });
      
    }
  }

  updateSelection = (item) => {
    debugger;
  }

  render() {
    let product = this.props.product;
    let productFilterData = this.props.productsFilter;
    debugger;
    return (
      <div className="product-details-rows-content">
        <div className="rows-main-content">
          <div>
            {product.brandId} - {product.brandIdDesc}
          </div>
          <div>
            {product.pimstyleId} - {product.pimstyleIdDesc}
          </div>
          <div className="rows-main-content-price">
            <strong>$400</strong>
            <span className="span-text">$1000.00</span>
            <span className="span-text-green">25% off</span>
            <span className="span-text-green">Promo</span>
            <span className="span-text-green">-NM25</span>
          </div>
        </div>

        <div className="rows-description">
          <ShowMore lines={2} more="more" less="less" anchorClass="">
            {product.advertisedDescription}
          </ShowMore>
        </div>

        <div className="rows-size-desc">
          <div className="rows-size-title">Size : {product.sizeDesc}</div>
          {map(productFilterData, (item, i) => {
            return <div key={i} className="rows-size-alt">{item.sizeDesc.split('(')[0]}</div>
          })}
          <div className="rows-size-alt-selected-size-guide">
            <a href="">Size Guide</a>
          </div>
        </div>
        <div className="rows-color">
          <div className="rows-color-title">Color : {product.colorDesc}</div>
          <div className="rows-color-inner">
            {map(productFilterData, (item, i) => {
              return <div key={i} className="rows-color-inner-circle" onClick={() => { this.updateSelection(item) }}
                style={{ 'background': item.colorDesc }} />
            })}
          </div>
          <div className="rows-other">Not Available</div>
        </div>
        <div className="rows-checkout">
          <div className="rows-checkout-title"><em>On Hand in Store (3)</em></div>
          <div className="rows-checkout-check-availability"><a href="">Check Availablity</a></div>
          <div className="rows-checkout-inner">
            <span className="rows-checkout-span-bag">
              <img className="rows-checkout-inner-bag" src={AddtoBag} />
              <span className="rows-checkout-inner-text">ADD TO BAG</span>
            </span>
            <span className="rows-checkout-span">
              <img className="rows-checkout-inner-print" src={PrintIcon} />
              <span className="rows-checkout-inner-text">PRINT</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  debugger;
  return {
    productsFilter: state.productRow,
    productDetailInfo: state.productDetailInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startSpinner: startSpinner,
    productSearhActionInvoker: productRowAction,
    productDetailInfoInvoker:productDetailInfoAction
  },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsRows)