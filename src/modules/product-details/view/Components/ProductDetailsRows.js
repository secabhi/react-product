import React, { Component } from "react";
import ShowMore from "react-show-more";
import { bindActionCreators } from 'redux';
import { startSpinner } from '../../../../modules/common/loading/spinnerAction'; 
import { connect } from 'react-redux';


import AddtoBag from "../../../../resources/images/Add_to_Bag.svg";
import PrintIcon from "../../../../resources/images/Print.svg";

import { productDetailAction } from '../../../../modules/product-details/ProductDetailsAction';

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
      this.props.startSpinner(true);
      this.props.productSearhActionInvoker("filter_set", { pimStyleId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });
    }
  }

  render() {
    let product = this.props.product;
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
          <div className="rows-size-alt">XL</div>
          <div className="rows-size-alt">XL</div>
          <div className="rows-size-alt">XL</div>
          <div className="rows-size-alt-selected">XL</div>
          <div className="rows-size-alt-selected-size-guide">
            <a href="">Size Guide</a>
          </div>
        </div>
        <div className="rows-color">
          <div className="rows-color-title">Color : {product.colorDesc}</div>
          <div className="rows-color-inner">
            <div className="rows-color-inner-circle" />
            <div className="rows-color-inner-circle" />
            <div className="rows-color-inner-circle" />
            <div className="rows-color-inner-circle" />
            <div className="rows-color-inner-circle" />
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
  return { productsFilter: state.productDetails };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startSpinner: startSpinner,
    productSearhActionInvoker: productDetailAction
  },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsRows)