import React, { Component } from 'react';
import BackSVG from "../../../../resources/images/Back_White.svg";
import BagSVG from "../../../../resources/images/Add_to_Bag_bttn.svg";


export default function ProductDetailsHeader(props) {
  let product = props.product;

  return (
    <div>
      <div className="product-details-header">
        <div className="product-details-back">
          <img src={BackSVG} onClick={props.onGoBack} />
        </div>
        <div className='product-details-header-name'>
          {product.brandIdDesc} {product.classDesc}
        </div>
      </div>
      <div className="product-details-sub-header">

        <div className="product-details-sub-name">
          <div>SKU - {product.pimskuId}</div>
          <div>UPC - {product.upcs}</div>
        </div>

        <div className="product-details-meta">
          <div>DEPT - {product.deptCd}</div>
          <div>CLASS - {product.classCd}</div>
        </div>
        <div className="product-details-sub-header-40">
          <div className="product-details-checkout">
            <div className="bag-div">
              <img className="bag-img" src={BagSVG} />
              <span className="bag-text">Bag</span>
            </div>
            <div>
              <img className="sale-img" src={BagSVG} />
              <span className="sale-text">Proceed to sale</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}