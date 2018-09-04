import React, { Component } from "react";
import ProductDetailsImages from "./ProductDetailsImages";
import crossPurpl from "../../../../resources/images/Cross_Purple.svg";

export default class Modal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { product } = this.props;
		return (
			<div>
				<div className="product-zoomed-image">
		      	</div>
		      	<div className="product-zoomed-info">
		    		<ProductDetailsImages 
		    			altImages={product.imageList.thumbnailAlt}
		    			zoomImages={product.imageList.zoomAlt}
		    			altImgClass={"zoom-image-each"}
		    			zoomImgClass={"zoom-full-image"}
		    			/>
		    		<img
		    			onClick={this.props.handleClose}
		    			src={crossPurpl} 
		    			width="25px" 
		    			height="25px"
		    			className="zoom-close"/>
		        </div>
		        
	        </div>
		);
	}
}