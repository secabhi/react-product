import React from 'react';
import './historySlide.css';
import noImageAvailable from '../../../../resources/images/Image_placeholder.svg';
export default (props) => {
  
  const {mySale, index, productImageURL, prodDesc, displayModal} = props;
  const rtn = props.return;
  let imageURL;
  let itemIndicator = 'indicator '
  if(mySale){
    if(rtn){
      itemIndicator += 'refund';
    } else {
      itemIndicator += 'purchase';
    }
  }
  if(props.productImageURL)
  {
    imageURL=productImageURL;

  }
  else{
    imageURL=noImageAvailable
  }
  return (
    <div className='historySlide' onClick={() => displayModal(index)}>
      <div className={itemIndicator}></div>
      <img className='image' src={imageURL} alt={imageURL} />
      <div className='image-details'>
        <div className="brand">No Designer</div>
        <div className="descrip">{prodDesc}</div>
      </div>
    </div>
  )  
}
