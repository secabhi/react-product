import React, { Component } from "react";

import imageNotFound from '../../../../resources/images/Image_placeholder.svg';

export default class ProductDetailsImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeThumbnailId: 0,
      currentImage: 0,
    }
  }

  handleChangeImage = (index) => {
    this.setState({currentImage:index});
  }

  checkImageList = (prod, imgList) => {
    console.log('check img list - prod', prod)
    console.log('check img list - imglist', imgList, imgList.length)
    if(imgList != {}) {
      imgList && imgList.thumbnailAlt.map((thumbnail, index) => {
        return(
          <div className="thumbnail-image-each" onClick={() => this.handleChangeImage(index)}>
            <img src={thumbnail}/>
          </div>
        )
      })
    } else {
      console.log('purchase History?')
      return;
    }
  }

  render() {
    let product = this.props.product;
    let imageList = product.imageList;

    // debugger;
    // if(product.imageList){
    //   if(product.imageList.zoomAlt.length > 0){
    //     imageList = product.imageList
    //   }else if(product.productImageURL){
    //     imageList = product.productImageURL
    //   }else{
    //     imageList = null;
    //   }
  // }

    console.log("SHIV PRODIMGURL",product)

    console.log("SHIV IMAGELIST", imageList);
    return(
      <div className="detail-images">
        <div className="thumbnail-images">
          {this.props.navFromCustDetails ? null : imageList.thumbnailAlt ?
            imageList.thumbnailAlt.map((thumbnail, index) => {
              return(
                <div className="thumbnail-image-each" onClick={() => this.handleChangeImage(index)}>
                  <img src={thumbnail}/>
                </div>
              )
            }):
            null
          }
        </div>
        <div className="thumbnail-full-image">
          <img src={this.props.navFromCustDetails ? product.mainImageUrl: imageList.zoomAlt ?imageList.zoomAlt[this.state.currentImage]:imageNotFound}/>
        </div>
      </div>
    );
  }
}
