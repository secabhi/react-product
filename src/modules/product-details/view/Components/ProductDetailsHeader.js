import React, { Component } from 'react';

export default function ProductDetailsHeader(props) {
  let product = props.product;
  return(
    <div className="product-details-header">
      <div className="product-details-back">

      </div>
      <div className='product-details-header-name'>
        {product.brandIdDesc}
      </div>
      <div className="product-details-sub-name">
        <div>SKU - {product.pimskuId}</div>
        <div>UPC - {product.upcs}</div>
      </div>
      <div className="product-details-meta">
        <div>DEPT - {product.deptCd}</div>
        <div>CLASS - {product.classCd}</div>
      </div>
      <div className="product-details-checkout">
        <span>Proceed to sale</span>
      </div>
    </div>
  );
}
