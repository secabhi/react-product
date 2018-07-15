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

  componentDidMount(){

  }

  constructor(props) {
    super(props);
    this.productId = this.props.match.params.pimskuId;
  }

  render() {
    if(!this.props.products){
      // return null
    }
    let { products = [] } = this.props;
    let product = products[this.productId];
    if(!product){
      product = {"pimskuId":"401076746098","upcs":[],"webItemDesc":"ivory flutter slv t w 4 coral handbags","itemDescription":"<b>Mayoral</b><br>Flutter-Sleeve Handbag Jersey Tee, Neutral, Size 3-7<br>Details<ul><li>Mayoral stretch jersey tee with handbag print.</li><li>Features bow appliqués and stud detail.</li><li>Round neckline.</li><li>Sleeveless; pleated shoulders.</li><li>Relaxed fit.</li><li>Vented hem.</li><li>Cotton/spandex.</li><li>Imported.</li></ul><div itemscope itemtype=\"http://schema.org/Product\"><meta itemprop=\"brand\" content=\"MAYORAL\"><meta itemprop=\"name\" content=\"Flutter-Sleeve Handbag Jersey Tee, Neutral, Size 3-7\"><meta itemprop=\"additionalProperty\" content=\"Cotton/spandex\"></div>Designer <div class=\"aboutDesignerCopy\"><B>About Mayoral:</B><br>Spanish Childrenswear line Mayoral has been catering to fashion-savvy kids and their parents for over 75 years. What began as a line of tights and socks has since expanded to a full range of sweaters, dresses, pants, skirts, and more. Mayoral suits girls and boys from newborn to junior with coordinated garments that are timeless and high quality. The brand&apos;s ethos is sweetly summed up in its motto: \"Making friends.\" </div>","divCd":"15","divName":null,"groupCd":"151","groupName":null,"deptCd":"1500","deptDesc":null,"classCd":"1","classDesc":null,"subclassCd":"828","subclassDesc":null,"brandId":"13527","brandIdDesc":"Mayoral","pimstyleId":"2086600","pimstyleIdDesc":"ivory flutter slv t w 4 coral handbags","colorCd":"100319","colorDesc":"NEUTRAL","sizeCd":"102972","sizeDesc":"3","offerItemIds":["LCF18_K0LKQ","OC118_K0LKQ","OB118_K0LKQ"],"advertisedDescription":"Mayoral stretch jersey tee with handbag print. Features bow appliqus and stud detail. Round neckline. Sleeveless; pleated shoulders. Relaxed fit. Vented hem. Cotton/spandex. Imported.","mainImageUrl":"https://www.neimanmarcus.com/product_assets/K/0/L/K/Q/NMK0LKQ_mk.jpg","imageList":{"zoomAlt":[],"thumbnailAlt":[],"zoomMain":["https://www.neimanmarcus.com/product_assets/K/0/L/K/Q/NMK0LKQ_mz.jpg"],"thumbnailMain":["https://www.neimanmarcus.com/product_assets/K/0/L/K/Q/NMK0LKQ_mg.jpg"]},"mpslsku":[],"mpsssku":[],"webId":"prod196720171","supplierId":"60085","supplierSiteId":"10004298","sizeSortSeqId":null,"colorSortSeqId":null,"swatchImageUrl":null,"location":["050","001"]}
    }
    console.log(product)
    return(
      <div>
        <Header history={this.props.history}></Header>
        { product &&
          <ProductDetailsView 
            product={product}
            onGoBack={this.goBack.bind(this)}/>
        }
        <Footer hideTransactionId={true}></Footer>
      </div>
    );
  }
  
  goBack(){
    this.props.history.goBack();
  }
}

export default connect(ProductDetails.mapStateToProps, ProductDetails.mapDispatchToProps)(ProductDetails);
