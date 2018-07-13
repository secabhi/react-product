import React, { Component } from "react";

export default class ProductDetailsRows extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let product = this.props.product;
    return(
      <div className="product-details-rows-content">
        <div className="rows-main-content">
          <div>
            {product.brandId} - {product.brandIdDesc}
          </div>
          <div>
            {product.pimstyleId} - {product.pimstyleIdDesc}
          </div>
          <div className="rows-main-content-price">

          </div>
        </div>

        <div className="rows-description">
          {product.advertisedDescription}
        </div>

        <div className="rows-size-desc">
          <div className="rows-size-title">
            Size : {product.sizeDesc}
          </div>
          <div className="rows-size-alt">
            XL
          </div>
        </div>

        <div className="rows-color">
          <div className="rows-color-title">
            Color : {product.colorDesc}
          </div>
          <div className="rows-color-alt">
            XL
          </div>

        </div>

        <div className="rows-other">
          Not Available
        </div>

        <div className="rows-print">
        </div>
      </div>
    );
  }
}
