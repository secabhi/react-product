import React, { Component } from "react";
import ProductListItem from "./Components/List/ProductListItem";

export default class ProductSearchList extends Component {
  render() {
      let products = this.props.products;
      return(
        <div className="product-search-list-details">
          {
            products.map((product) => {
              return <ProductListItem product={product} onProductClick={this.props.onProductClick}/>;
            })
          }
          {
            products.length > 0 &&
            <div className="product-scroll-up">
            </div>
          }
        </div>
      );
    }
}
