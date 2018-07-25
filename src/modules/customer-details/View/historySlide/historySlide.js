import React from 'react';
import './historySlide.css';
import noImageAvailable from '../../../../resources/images/Image_placeholder.svg';

export default (props) => {

  const {index, userPin, prodDesc, displayModal, salesPin} = props;
  let {productImageURL} = props;
  console.log(`userPin ${userPin}, salesPin ${salesPin}, Equal ${salesPin === userPin}`);
  const rtn = props.return;
  let itemIndicator = 'indicator '
  if(userPin === salesPin){
    if(rtn){
      itemIndicator += 'refund';
    } else {
      itemIndicator += 'purchase';
    }
  } 

  //if no image add no ImageAvailable
  if(!productImageURL){
    productImageURL = noImageAvailable;
  }

  return (
    <div className='historySlide' onClick={() => displayModal(index)}>
      <div className={itemIndicator}></div>
      <img className='image' src={productImageURL} alt={productImageURL} />
      <div className='image-details'>
        <div className="descrip">{prodDesc}</div>
      </div>
    </div>
  )  
}
