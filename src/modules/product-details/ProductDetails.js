import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

import ProductDetailsView from "./view/ProductDetailsView";

class ProductDetails extends Component {
  static mapStateToProps(state) {
    return {
      products: state.productDetails
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
  }

  constructor(props) {
    super(props);
    this.productId = this.props.match.params.pimskuId;
  }

  render() {
    if(!this.props.products){
      return null;
    }
    let { products = [] } = this.props;
    let product = products[this.productId];
    return(
      <div>
        <Header history={this.props.history}></Header>
        { product &&
          <ProductDetailsView product={product}/>
        }
        <Footer hideTransactionId={true}></Footer>
      </div>
    );
  }
}

export default connect(ProductDetails.mapStateToProps, ProductDetails.mapDispatchToProps)(ProductDetails);
