import React from 'react';
import './recommendSlide.css';
import noImageAvailable from '../../../../resources/images/Image_placeholder.svg';
export default (props) =>{
    let imageURL;  
    if(props.url)
    {
      imageURL=props.url;
  
    }
    else{
      imageURL=noImageAvailable
    }
    return(
    <div className='recommendSlide' onClick={() => props.displayModal(props.index)}>
        <img src={imageURL} className='img' alt={imageURL} />
        <div className='img-details'>
            <div className='brand'>{props.vendor}</div>
            <div className='descrip'>{props.proddesc}</div>
        </div>    
    </div>
)
}