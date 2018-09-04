import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal'

import Header from '../common/header/header';
import Footer from '../common/footer/footer';

import ProductDetailsView from "./view/ProductDetailsView";

import { productRowAction, getPriceAction } from './ProductRowAction';
import { productDetailInfoAction } from './ProductDetailinfoAction';
import { productSearchAction } from '../product-search/ProductSearchAction';
import { startSpinner } from '../../modules/common/loading/spinnerAction';
import {changeItemPurchasedFlag} from '../customer-details/CustomerDetailsActions';

import {warningIcon} from '../../resources/images/Warning.svg'

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
      currentSelectedSize: '',
      currentSelectedColor:'',
      errorPresent: false,
      errorDescription: '',

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
    this.prevSizeIndex = null;
    this.prevColorIndex = null;
    this.uniqueColorsOriginal = [];
    this.uniqueSizesOriginal = [];
  }

  componentDidMount(){
    if (this.state.product && !this.props.customerDetails.itemPurchased) {
      let pimStyleId = this.state.product.pimstyleId;
      let pimskuId = this.state.product.pimskuId;
      //let pimStyleId = 1713023;
      this.props.startSpinner(true);
      this.props.productSearhActionInvoker("filter_set", { pimStyleId }, () => {
        //this.props.history.push("/product-details/"+pimskuId);
      });

      this.props.productDetailInfoInvoker("get_info", { pimskuId }, () => {
        this.props.startSpinner(false);
      });

      console.log("shiv pimsku cmd", pimskuId)

      //SHIV: CHANGE TO PIN FROM REDUX (HARDCODING FOR DEV PURPOSES)
      // this.props.getPriceAction('930924', pimskuId, () => {
      //   this.props.startSpinner(false);
        
      // });
      
    }


  }


  componentDidUpdate(prevProps, prevState) {
    if(this.props.customerDetails.itemPurchased == false) {
      console.log('SHIV PREVPROPS', prevProps)
      console.log('SHIV this.PROPS', this.props)
  
      if(prevProps.storeList.storeList.length != this.props.storeList.storeList.length && this.props.storeList.error === false){
        this.props.storeList.storeList.map((store, index)=>{
          console.log("Shiv configStore:", store)
          if(store.storeId == parseInt(clientConfig.clientConfig.Store, 10)){
            this.setState({currentStore:store})
          }
        });
      }else if(prevProps.storeList.error != this.props.storeList.error && this.props.storeList.error === true){
        this.setState({errorDescription: "Storelist could not be retrieved."})
        this.handleErrorPopup();
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

  handleErrorPopup = () =>{
    if(this.state.errorPresent){
      this.setState({errorPresent:false, errorDescription:''});
    }else{
      this.setState({errorPresent:true})
    }
  }

  apiCallOnClick = (pimSkuIdFromClick) =>{
    //let pimStyleId = this.state.product.pimstyleId;
    let pimskuId = pimSkuIdFromClick;
    this.productId = pimskuId;
    //let pimStyleId = 1713023;
    this.props.purchHistProdDetail("pimsku_search", { pimskuId }, () => {
      //this.props.history.push("/product-details/"+pimskuId);
      // this.props.getPriceAction('930924', pimskuId, () => {
      //   this.props.startSpinner(false);
      // });
    });

    this.props.productDetailInfoInvoker("get_info", { pimskuId }, () => {
      this.props.startSpinner(false);
    });
      
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
        selected:false,
        disabled: true
      }

      let uniqueColorObj = {
        colorDesc : item.colorDesc,
        colorCd : item.colorCd,
        sizeCd: item.sizeCd,
        swatchImageUrl: item.swatchImageUrl,
        selected:false,
        disabled: true
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

    this.uniqueColorsOriginal = uniqueColors;
    this.uniqueSizesOriginal = uniqueSizes;

    this.setState({
      colorDisplayArr:uniqueColors,
      sizeDisplayArr: uniqueSizes
    }, ()=>{
    });

    let initialSizeIndex = this.uniqueSizesOriginal.map( (obj) => {return obj.sizeCd}).indexOf(this.product.sizeCd)

    let initialColorIndex = this.uniqueColorsOriginal.map( (obj) => {return obj.colorCd}).indexOf(this.product.colorCd)
    
    console.log("SHIV TEST", this.uniqueColorsOriginal.map( (obj) => {return obj.colorCd}).indexOf(this.product.colorCd));

    this.updateSelectionSize(this.product, initialSizeIndex);
    this.updateSelectionColor(this.product, initialColorIndex);

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
  updateSelectionSize = (item, index) => {
    console.log("SHIV SELECTED ITEM:", item);
    let testArr = [];
    let alteredColorArr = [];
    let alteredSizeArr = [];

    alteredSizeArr = this.uniqueSizesOriginal.slice();
    alteredColorArr = this.uniqueColorsOriginal.slice();
    
    alteredSizeArr[index].selected = true;

    if(this.prevSizeIndex != null){
      alteredSizeArr[this.prevSizeIndex].selected = false;
    }

    //returns array of objects that are available for current selected size
    this.props.productRow.forEach(function(element) {
      // console.log("SHIV SELECTED element:", element);
      
      if(item.sizeCd === element.sizeCd){
        testArr.push(element);
      }
    }, this);
    
    for(var i = 0; i < alteredColorArr.length; i++){
      alteredColorArr[i].disabled = true;
      for(var j = 0; j < testArr.length; j++){
        if(alteredColorArr[i].colorCd == testArr[j].colorCd){
          alteredColorArr[i].disabled = false;
        }
      }
    }

    console.log("SHIV alteredColorArr", alteredColorArr)
    

    this.setState({
      sizeDisplayArr: alteredSizeArr,
      colorDisplayArr:alteredColorArr,
      currentSelectedSize : item.sizeCd,
    },
    ()=>{
        if(this.state.currentSelectedSize != '' && this.state.currentSelectedColor != '' && this.prevSizeIndex !== null){
        this.props.productRow.map((item, index) => {
          console.log("shiv calling api", this.prevSizeIndex)
          if(item.sizeCd === this.state.currentSelectedSize && item.colorCd === this.state.currentSelectedColor){
            this.apiCallOnClick(item.pimskuId);
          }
        }, this)
      }else if(this.prevSizeIndex !== null){
        console.log("SHIV PIMSKU FOR API CALL:", testArr[0].pimskuId)
        // this.apiCallOnClick(testArr[0].pimskuId);
      }
      this.prevSizeIndex = index;
    }
  );
  

    console.log("SHIV SELECTED AR", testArr)
  }

  //update selection when user clicks on different size or colors.
  updateSelectionColor = (item, index) => {
    console.log("SHIV SELECTED ITEM:", index);
    let selectedColorArr = [];

    let alteredColorArr = [];
    let alteredSizeArr = [];

    alteredSizeArr = this.uniqueSizesOriginal.slice();
    alteredColorArr = this.uniqueColorsOriginal.slice();

    alteredColorArr[index].selected = true;

    if(this.prevColorIndex != null){
      alteredColorArr[this.prevColorIndex].selected = false;
    }

    //returns array of objects that are available for current selected size
    this.props.productRow.forEach(function(element) {
      // console.log("SHIV SELECTED element:", element);
      
      if(item.colorCd === element.colorCd){
        selectedColorArr.push(element);
      }
    }, this);
    
    for(var i = 0; i < alteredSizeArr.length; i++){
      alteredSizeArr[i].disabled = true;
      for(var j = 0; j < selectedColorArr.length; j++){
        if(alteredSizeArr[i].sizeCd == selectedColorArr[j].sizeCd){
          alteredSizeArr[i].disabled = false;
        }
      }
    }

    console.log("SHIV alteredSizeArr", alteredSizeArr)
    
    this.setState({
      sizeDisplayArr: alteredSizeArr,
      colorDisplayArr:alteredColorArr,
      currentSelectedColor : item.colorCd
    },
    ()=>{
        if(this.state.currentSelectedSize != '' && this.state.currentSelectedColor != '' && this.prevColorIndex !== null){
        this.props.productRow.map((item, index) => {
          console.log("shiv calling color api", this.prevColorIndex)
          if(item.sizeCd === this.state.currentSelectedSize && item.colorCd === this.state.currentSelectedColor){
            this.apiCallOnClick(item.pimskuId);
          }
        }, this)
      }else if(this.prevColorIndex !== null){
        // console.log("SHIV PIMSKU FOR API CALL:", testArr[0].pimskuId)
        // this.apiCallOnClick(testArr[0].pimskuId);
      }
      this.prevColorIndex = index;
    });

    

    console.log("SHIV SELECTED AR", selectedColorArr)   
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

    // console.log("shiv storelist", this.props.storeList);
    // console.log("SHIV SORTED:", this.state.sizeColorArr);
    // console.log("SHIV SORTED REDUX?:", this.props.productRow);
    // console.log("shiv product update", this.state.product)
    return(
      <div>
        <Header history={this.props.history} prodDetailInfo={this.props.productDetailInfoInvoker}></Header>
        { this.product &&
          <ProductDetailsView 
            product={this.product}
            currentStore={this.state.currentStore}
            storeList={this.props.storeList.storeList}
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

        <Modal open={this.state.errorPresent} little classNames={{ modal: 'sale-errorModal' }} onClose={() => { }}
          little showCloseIcon={false}>
          <div className='sale-errorModal-container'>
            <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
            <div className="sale-errorModal-text">{this.state.errorDescription}</div>
            <button className="sale-errorModal-button" onClick={() => { 
                this.handleErrorPopup()
                  {/* this.props.clearForProduct('CLEAR_ERROR');   */}
                }}>
              <div className="sale-errorModal-button-text">CLOSE</div>
            </button>
          </div>

        </Modal>
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
