import React, { Component } from 'react';
import BackSVG from "../../../../resources/images/Back_White.svg";
import BagSVG from "../../../../resources/images/Add_to_Bag_bttn.svg";
import ProceedToSale from "../../../../resources/images/Sale_White_Filled.svg";

const CustInfoHeader = (props) => {
  const {custInfo} = props;
  return([
    <div className="sale-customer-name">
      <div className="sale-customer-name-label">
        {custInfo.salutation} {custInfo.firstName} {custInfo.lastName}
      </div>
      <div className={(custInfo.firstName != "") ? "divider" : "subheader-circleStatusicon-display"} />
      {/* <div className="incircle-details">
        <span className={(this.props.firstName != "") ? "subheader-iconNum" : "subheader-circleStatusicon-display"} >{this.props.currentLvl}</span>
        <img
          className={(this.props.firstName != "") ? "subheader-circleStatusicon" : "subheader-circleStatusicon-display"}
          src={incircle_purple_large_bttn}
          alt="profile-tab-icon" />
      </div> */}
      <div style={{marginRight: '28px'}}></div>
      <div className="sale-customer-address">
        <div>{custInfo.selectedAddress.Addr1}</div>
        <div style={{textAlign:'left'}}>{custInfo.selectedAddress.City} {custInfo.selectedAddress.State} {custInfo.selectedAddress.Zip}</div>
      </div>
    </div>
  ])
}

class ProductDetailsHeader extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let product = this.props.product;
    let prodDetails = this.props.prodDetails;
    console.log('PRANAV PDV HEADER PRODDETAILS', this.props.prodDetails)

    return (
      <div>
        <div className="product-details-header">
          <div className="product-details-back">
            <img src={BackSVG} onClick={this.props.onGoBack} />
          </div>
          <div className='product-details-header-name'>
            {this.props.custInfo.itemPurchased == true ? prodDetails.brandIdDesc : product.brandIdDesc} {this.props.custInfo.itemPurchased == true ? prodDetails.classDesc : product.classDesc}
          </div>
          {this.props.custInfo.itemPurchased ? <CustInfoHeader custInfo={this.props.custInfo} /> : null}
        </div>
        <div className="product-details-sub-header">
          <div className="product-details-sub-name">
            <div>SKU - {product.pimskuId}</div>
            <div>UPC - {this.props.custInfo.itemPurchased == true ? prodDetails.upcs : product.upcs}</div>
          </div>
  
          <div className="product-details-meta">
            <div>DEPT - {product.deptCd}</div>
            <div>CLASS - {product.classCd}</div>
          </div>
          <div className="product-details-sub-header-40">
          {product.price == '' ? 
            (<div className="product-details-checkout">
              <div className="bag-div">
                <img className="bag-img" src={BagSVG} />
                <span className="bag-text">Bag</span>
              </div>
              <div>
                <img className="sale-img" src={ProceedToSale} />
                <span className="sale-text">Proceed to sale</span>
              </div>
            </div>) : (<div className="product-details-checkout"></div>)
          }
          </div>
        </div>
  
      </div>
  
    );
  }
}

export default ProductDetailsHeader;