import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

import ProductDetailsView from "./view/ProductDetailsView";

import { productRowAction, getPriceAction } from './ProductRowAction';
import { productDetailInfoAction } from './ProductDetailinfoAction';
import { productSearchAction } from '../product-search/ProductSearchAction';
import { startSpinner } from '../../modules/common/loading/spinnerAction';
import {changeItemPurchasedFlag} from '../customer-details/CustomerDetailsActions';

const clientConfig = require('../../resources/stubs/config.json');

class ProductDetails extends Component {


  constructor(props) {
    super(props);

    this.productId = this.props.match.params.pimskuId;

    this.state = {
      currentStore: {},
      sizeColorArr:[],
      product: this.props.products[this.productId],
      colorDisplayArr:[],
      sizeDisplayArr:[],
    }
    
    if(this.props.customerDetails.itemPurchased == true) {
      let purchasedItem = this.getPurchasedItemDetails();

      this.prodDetails = {
        [this.productId] : {
          advertisedDescription: purchasedItem.prodLongDesc,
          brandId: purchasedItem.brandIdCd,
          classCd: purchasedItem.classCd,
          deptCd: purchasedItem.deptCd,
          groupCd: purchasedItem.groupCd,
          itemDescription: purchasedItem.prodDesc,
          location: purchasedItem.location,
          mainImageUrl: purchasedItem.productImageURL,
          pimskuId: purchasedItem.pimSku,
          pimstyleId: purchasedItem.pimStyle,
          pimstyleIdDesc: purchasedItem.pimStyleDesc,
          webId: purchasedItem.webProductId,
          price: purchasedItem.originalUnitPrice,
          salePrice: purchasedItem.purchaseAmount,
          quantity: purchasedItem.quantity,
          purchaseDate: purchasedItem.purchaseDate,
          transactionId: purchasedItem.transactionId
        }
      }
    }

    this.product = this.props.customerDetails.itemPurchased == true ? this.prodDetails[this.productId] : this.props.products[this.productId];

  }

  componentDidMount(){
    if (this.state.product && !this.props.customerDetails.itemPurchased) {
      let pimStyleId = this.state.product.pimstyleId;
      let pimskuId = this.state.product.pimskuId;
      //let pimStyleId = 1713023;
      // this.props.startSpinner(true);
      this.props.productSearhActionInvoker("filter_set", { pimStyleId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });

      this.props.productDetailInfoInvoker("get_info", { pimskuId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });

      console.log("shiv pimsku cmd", pimskuId)
      this.props.getPriceAction('930924', pimskuId, () => {
        
      });
      
    }


  }

  apiCallOnClick = (pimSkuIdFromClick) =>{
    //let pimStyleId = this.state.product.pimstyleId;
    let pimskuId = pimSkuIdFromClick;
    //let pimStyleId = 1713023;
    // this.props.startSpinner(true);
    // this.props.productSearhActionInvoker("filter_set", { pimStyleId }, () => {
    //   //this.props.history.push("/product-details/"+pimskuId);
    // });

    this.props.productDetailInfoInvoker("get_info", { pimskuId }, () => {
      //this.props.history.push("/product-details/"+pimskuId);
    });

    this.props.getPriceAction((this.props.login.userpin, pimskuId), () => {
      
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.customerDetails.itemPurchased == false) {
      console.log('SHIV PREVPROPS', prevProps)
      console.log('SHIV this.PROPS', this.props)
  
      if(prevProps.storeList.length != this.props.storeList.length){
        this.props.storeList.map((store, index)=>{
          // console.log("Shiv configStore:", store)
          if(store.storeId == parseInt(clientConfig.clientConfig.Store, 10)){
            this.setState({currentStore:store})
          }
        });
      }
  
      if(prevProps.productRow != this.props.productRow){
          this.sortDisplayArrays();
      }
  
      console.log('SHIV BEFORE PRODUCTS IF', prevProps.products[this.productId])
      if(prevProps.products[this.productId] != this.props.products[this.productId]){
        
        this.product = this.props.customerDetails.itemPurchased == true ? this.prodDetails : this.props.products[this.productId];
        this.setState({product: this.props.products[this.productId] })
      }
      console.log('SHIV AFTER PRODUCTS IF', this.props.products[this.productId])
    }
  }

  //sort arrays for sizes and colors to only show unique values
  sortDisplayArrays = () =>{

    let uniqueSizes = [];
    let uniqueColors = [];

    this.props.productRow.map((item, index) => {
      let uniqueSizeObj = {
        sizeDesc : item.sizeDesc,
        sizeCd : item.sizeCd,
        colorCd: item.colorCd,
        pimskuId: item.pimskuId,
        disabled: false
      }

      let uniqueColorObj = {
        colorDesc : item.colorDesc,
        colorCd : item.colorCd,
        sizeCd: item.sizeCd,
        pimskuId: item.pimskuId,
        colorSwatch: item.swatchImageUrl,
        disabled: false
      }

      uniqueSizes.push(uniqueSizeObj);
      uniqueColors.push(uniqueColorObj);
    })

    uniqueSizes = this.removeDuplicates(uniqueSizes, "sizeCd").sort((a,b)=>{
      return a.sizeCd - b.sizeCd;
    });
    uniqueColors = this.removeDuplicates(uniqueColors, "colorCd" ).sort((a,b)=>{
      return a.colorCd - b.colorCd;
    });

    this.setState({
      colorDisplayArr:uniqueColors,
      sizeDisplayArr: uniqueSizes
    });

    console.log("SHIV SORTED:", uniqueSizes);
    console.log("SHIV SORTED:", uniqueColors);
    console.log("SHIV UNSORTED:", this.props.productRow);
  }

  //remove duplicated from array based on propery passed and return unique array of objects
  removeDuplicates = (arr, property) => {
    return arr.filter((item, pos, filterArr) => {
        return filterArr.map(mapObj => mapObj[property]).indexOf(item[property]) === pos;
    });
  }

  //update selection when user clicks on different size or colors.
  updateSelectionSize = (item) => {
   console.log("SHIV SELECTED ITEM:", item);
   let testArr = [];

    this.props.productRow.forEach(function(element) {
      console.log("SHIV SELECTED element:", element);
      if(item.sizeCd === element.sizeCd){
        element.disabled = true;
        testArr.push(element);
      }
    }, this);
    console.log("SHIV SELECTED AR", testArr)
  }

  updateSelectionColor = (item) => {
   console.log("SHIV SELECTED ITEM:", item);
   let testArr = [];

    this.props.productRow.forEach(function(element) {
      console.log("SHIV SELECTED element:", element);
      if(item.colorCd === element.colorCd){
        element.disabled = true;
        testArr.push(element);
      }
    }, this);
    console.log("SHIV SELECTED AR", testArr)
   
  }

  componentWillUnmount() {
    this.props.changeItemPurchasedFlag(false);
  }

  getPurchasedItemDetails = () => {
    for(let i = 0; i < this.props.customerDetails.purchases.length; i++) {
      if (this.props.customerDetails.purchases[i].pimSku == this.props.match.params.pimskuId) {
        return this.props.customerDetails.purchases[i]
      } else {
      }
    }
  }

  render() {

    console.log("shiv storelist", this.props.storeList);
    // console.log("SHIV SORTED:", this.state.sizeColorArr);
    // console.log("SHIV SORTED REDUX?:", this.props.productRow);
    console.log("shiv product update", this.state.product)
    return(
      <div>
        <Header history={this.props.history} prodDetailInfo={this.props.productDetailInfoInvoker}></Header>
        { this.product &&
          <ProductDetailsView 
            product={this.product}
            currentStore={this.state.currentStore}
            storeList={this.props.storeList}
            onGoBack={this.goBack.bind(this)}
            colorDisplayArr={this.state.colorDisplayArr}
            sizeDisplayArr={this.state.sizeDisplayArr}
            updateSelectionSize={this.updateSelectionSize}
            updateSelectionColor={this.updateSelectionColor}
            navFromCustDetails={this.props.customerDetails.itemPurchased}
            custInfo={this.props.customerDetails}
            prodDetailInfoAction={this.props.purchHistProdDetail} // product search action
            purchHistProdDetail={this.props.products} // product details redux obj
          />
        }
        <Footer hideTransactionId={true}></Footer>
      </div>
    );
  }
  
  goBack(){
    this.props.history.goBack();
  }
}

function mapStateToProps(state) {
  return {
    products: state.productDetails,
    storeList:state.productDetailInfo,
    customerDetails :state.customerDetails,
    productRow: state.productRow,
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startSpinner:startSpinner,
    productSearhActionInvoker: productRowAction,
    productDetailInfoInvoker:productDetailInfoAction,
    purchHistProdDetail: productSearchAction,
    changeItemPurchasedFlag: changeItemPurchasedFlag,
    getPriceAction : getPriceAction
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);
