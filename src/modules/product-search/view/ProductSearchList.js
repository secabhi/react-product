import React, { Component } from "react";
import ProductListItem from "./Components/List/ProductListItem";
import NoResultsFound from "./../../noResultsFound/noResultsFound";
import arrowupicon from '../../../resources/images/Arrow_Up.svg';

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
      let keyword = this.props.searchFieldName;
      console.log("Count of Items", products.Count);
      return(
        <div className="product-search-list-details">
          {products.length>0?
          <div class="product-serach-result-count-header">
          <span>Search results for - {keyword} </span>
          <span> Total {products.length} products found </span></div>:null}
          {products.length > 0?
            products.map((product) => {
              return <ProductListItem product={product} onProductClick={this.props.onProductClick} onGoBack = {this.props.onGoBack}/>;
            })
          :this.checkElement()}
          {
            products.length > 0 &&
            <a href="javascript:void(0)" className="return-to-top-scroll">
            <svg aria-hidden="true" style={{ marginLeft: '13px', marginTop: '10px'}} width="25px" height="25px" data-prefix="fas" data-icon="arrow-up" class="svg-inline--fa fa-arrow-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
            </a>
          }
        </div>
      );
    }
}
