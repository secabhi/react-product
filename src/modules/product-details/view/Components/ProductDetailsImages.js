import React, { Component } from "react";

export default class ProductDetailsImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeThumbnailId: 0
    }
  }

  render() {
    let product = this.props.product;
    let imageList = product.imageList;
    return(
      <div className="detail-images">
        <div className="thumbnail-images">
          {imageList && imageList.thumbnailAlt.map((thumbnail) => {
            return(
              <div className="thumbnail-image-each">
                <img src={thumbnail}/>
              </div>
            )
          })}
        </div>
        <div className="thumbnail-full-image">
        {imageList && imageList.thumbnailMain.map((tMain) => {
          return(
            <div>
              <img src={tMain}/>
            </div>
          )
        })}
        </div>
      </div>
    );
  }
}
