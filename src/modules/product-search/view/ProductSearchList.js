import React, { Component } from "react";
import ProductListItem from "./Components/List/ProductListItem";
import NoResultsFound from "./../../noResultsFound/noResultsFound";

export default class ProductSearchList extends Component {

  checkElement(){
    if(this.props.isSearchHit){
      return <NoResultsFound/>
    }
    else{
     return null
    }
    
  }

  render() {
      let products = this.props.products;
      let keyword = this.props.searchFields;
      console.log("Count of Items", products.Count);
      return(
        <div className="product-search-list-details">
          {products.length>0?
          <div class="product-serach-result-count-header">
          <span>Search results for - </span>
          <span> Total {products.length} products found </span></div>:null}
          {products.length > 0?
            products.map((product) => {
              return <ProductListItem product={product} onProductClick={this.props.onProductClick} onGoBack = {this.props.onGoBack}/>;
            })
          :this.checkElement()}
          {
            products.length > 0 &&
            <div className="product-scroll-up">
            </div>
          }
        </div>
      );
    }
}
