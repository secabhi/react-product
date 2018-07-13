import React, { Component } from "react";

export default class ProductListItem extends Component {
  render() {
    let { product } = this.props;

    return(
      <div className="list-item-view" onClick={() => this.props.onProductClick(product.pimskuId)}>
        <div className="list-item-image">
          {
            product.mainImageUrl ?
            <img src={product.mainImageUrl} alt=""/> :
            <img src={require("../../../../../resources/images/Image_placeholder.svg")}/>
          }
        </div>

        <div className="list-item-info">
          <div className="list-item-brand">
            {product.brandIdDesc}
          </div>
          <div className="list-item-type">
            {product.pimstyleIdDesc}
          </div>
          <div className="list-item-discount">
            Extra 25% Off
          </div>
        </div>
      </div>
    );
  }
}
