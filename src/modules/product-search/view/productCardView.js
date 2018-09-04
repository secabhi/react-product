import React, { Component } from 'react';

import './ProductSearch.css';

export default class ProductCardView extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className = 'card-product'>
                <div className='card-product-top'>
                    <div className='card-product-image-container'><img className='card-product-image' src={this.props.productDetails.mainImageUrl} /></div>
                </div>
                <div className='card-product-bottom'>
                     <div className="card-product-swatches"></div> 
                    <div className="card-product-designer">{this.props.productDetails.brandIdDesc}</div>
                    <div className="card-product-description">{this.props.productDetails.groupName}</div>
                    <div className="card-product-percentOff"></div>
                </div>
            </div>
        )
    }
}