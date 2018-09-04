import React, { Component } from "react";
import ShowMore from "react-show-more";
import Modal from 'react-responsive-modal';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../../../../modules/common/loading/spinnerAction';
import { connect } from 'react-redux';


import AddtoBag from "../../../../resources/images/Add_to_Bag.svg";
import PrintIcon from "../../../../resources/images/Print.svg";

import { productRowAction } from '../../ProductRowAction';
import { productDetailInfoAction } from '../../ProductDetailinfoAction';

import { pluck, map, each } from 'underscore';

const PurchaseDetailRows = (props) => {
    const {product, prodDetails} = props;
    return ([
        <div className="rows-size-desc">
          <div className="rows-size-title">Size : {prodDetails.sizeDesc}</div>
          <div className="rows-color-title">Color : {prodDetails.colorDesc}</div>
          <div className="rows-qty-title">Qty : {product.quantity}</div>
        </div>,
        <div className="rows-size-desc">
          <div className="rows-purchase-date-title">Purchased on : {product.purchaseDate} </div>
          <div className="rows-purchase-loc-title">Location : {product.location}</div>          
        </div>,
        <div className="rows-size-desc">
          <div className="rows-transid-title">Trans. ID : {product.transactionId}</div>
        </div>
      ]
    )
  }

  const ProductDetailsDefault = (props) => {
    const {product, colorDisplayArr, sizeDisplayArr, currentStoreStock} = props; 
   
         return([
          <div className="rows-size-desc">
            <div className="rows-size-title">Size : {product.sizeDesc}</div>
            {map(sizeDisplayArr, (item, i) => {
              return <div key={i} className="rows-size-alt" onClick={() => { props.updateSelectionSize(item) }}>{item.sizeDesc.split('(')[0]}</div>
            })}
            <div className="rows-size-alt-selected-size-guide">
              <a href="">Size Guide</a>
            </div>
          </div>,
            <div className="rows-color">
            <div className="rows-color-title">Color : {product.colorDesc}</div>
            <div className="rows-color-inner">
              {map(colorDisplayArr, (item, i) => {
                return <div key={i} className="rows-color-inner-circle" onClick={() => { props.updateSelectionColor(item) }}
                  style={{ 'background': item.colorDesc }} />
              })}
            </div>
            <div className="rows-other">Not Available</div>
          </div>, 
          
          <div className="rows-checkout">
            <div className="rows-checkout-left">
              <div className="rows-checkout-title"><em>{"On Hand in Store (" + currentStoreStock +")"}</em></div>
              <div className="rows-checkout-check-availability">
                <a onClick={()=> props.handleCheckAvail()}>Check Availablity</a>            
              </div>
            </div>
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
        ]
    )
  }

class ProductDetailsRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productFilterData: '',
      currentStoreStock: '',
      openAvailModal:false,
    }
  }

  componentDidMount() {
    //debugger;
    console.log("Shiv: this.props.product", this.props.product)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentStore != this.props.currentStore){
      this.setState({currentStoreStock:this.props.currentStore.totalAvailQty});
    }
  }

  handleCheckAvail = () =>{
    if(this.state.openAvailModal){
      this.setState({openAvailModal:false})
    }else{
      this.setState({openAvailModal:true})
    }
  }

  render() {
    let product = this.props.product;
    let productFilterData = this.props.productsFilter;   
    console.log("Shiv: this.props.product", this.props.product)
    //debugger;
    return (
      <div className="product-details-rows-content">
        <div className="rows-main-content">
          <div>
            {product.brandId} - {this.props.customerDetails.itemPurchased == true ? this.props.prodDetails.brandIdDesc : product.brandIdDesc}
          </div>
          <div>
            {this.props.customerDetails.itemPurchased == true ? 
              product.pimstyleIdDesc : 
              product.pimstyleId + " - " + product.pimstyleIdDesc
            }
          </div>
          <div className="rows-main-content-price">
            <strong>{product.currencyCode === "USD"?"$ ":null}{product.salePrice}</strong>
            <span className="span-text">{product.currencyCode === "USD" && product.price != product.salePrice?"$ ":null}{product.price == product.salePrice? null:product.price}</span>
            {/* <span className="span-text-green">25% off</span>
            <span className="span-text-green">Promo</span>
            <span className="span-text-green">-NM25</span> */}
          </div>
        </div>

        <div className="rows-description">
          <ShowMore lines={2} more="more" less="less" anchorClass="">
            {/* <div dangerouslySetInnerHTML={{__html : product.advertisedDescription}} /> */}
            {this.props.customerDetails.itemPurchased == true ? this.props.prodDetails.advertisedDescription : product.advertisedDescription}
          </ShowMore>
        </div>
        {this.props.customerDetails.itemPurchased == true ? 
        <PurchaseDetailRows 
          product={product}
          prodDetails={this.props.prodDetails} /> 
        : 
        <ProductDetailsDefault 
          product={product} 
          productFilterData={productFilterData} 
          currentStoreStock={this.state.currentStoreStock}
          handleCheckAvail={this.handleCheckAvail}
          updateSelectionSize={this.props.updateSelectionSize}
          updateSelectionColor={this.props.updateSelectionColor}
          colorDisplayArr={this.props.colorDisplayArr}
          sizeDisplayArr={this.props.sizeDisplayArr}
        />}

        <Modal 
          open={this.state.openAvailModal} 
          onClose={()=>this.handleCheckAvail()} 
          classNames={{modal: 'productDetails-checkAvailModal'}}
        >
          <div className={'checkAvailModal-mainHeader'}>
            <div className={'checkAvailModal-mainHeader-text'}>Check Availablity</div>
          </div>
          <div className={'checkAvailModal-productDescHeader'}>
            <div className={'checkAvailModal-productDesc'}>
              {product.pimstyleIdDesc}
            </div>
            <div className={'checkAvailModal-productSku'}>
              {"SKU - "+ product.pimskuId}
            </div>
          </div>
          <div className={'checkAvailModal-availList-container'}>
            {this.props.storeList.length > 1?
              this.props.storeList.map((store, index) =>{
                return(<div className={'checkAvailModal-storeList'}>
                        <div className={'checkAvailModal-storeList-store'}>{store.storeName}</div>
                        <div className={'checkAvailModal-storeList-qty'}>{store.totalAvailQty}</div>
                      </div>)
              })
            :null}
          </div>
          <div className={'checkAvailModal-footer'}>
            <button className={'checkAvailModal-footer-printButton'}>
              <img src={PrintIcon} className={'checkAvailModal-footer-printButton-icon'}></img>
              <span>PRINT</span>
            </button>
            <button onClick={()=>this.handleCheckAvail()} className={'checkAvailModal-footer-okButton'}>OK</button>
          </div>
        </Modal>    

      </div>
    );
  }
}


function mapStateToProps(state) {
 // debugger;
  return {
    productsFilter: state.productRow,
    productDetailInfo: state.productDetailInfo,
    customerDetails: state.customerDetails,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startSpinner: startSpinner,
    productSearhActionInvoker: productRowAction,
    productDetailInfoInvoker:productDetailInfoAction
  },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsRows)