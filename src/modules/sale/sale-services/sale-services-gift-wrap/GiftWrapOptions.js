import React, { Component } from 'react';
import './GiftWrap.css';




export default (props) => {
    // console.log(this)
    // const test = props.options.map((item) => {
    //     <div className="options-container" key={props.options.wrapNumber}>
    //       <img src={props.options.imagePath}/>
    //       <div>{props.options.wrapDescription}</div>
    //       <div>{props.options.wrapNumber}</div>
    //       <div>{props.options.price}</div>
    //      </div>
    // })
 
    // const test = for(var i = 0; i < props.options.length; i++) {
    //       return(
    //         <div className="options-container" key={props.options[i]}>
    //          <img src={props.options.imagePath}/>
    //          <div>{props.options.wrapDescription}</div>
    //          <div>{props.options.wrapNumber}</div>
    //          <div>{props.options.price}</div>
    //         </div>
    //       )
    //     }
    //     console.log(props, 'test props')
    

    return(

      <div className="giftwrap-options-container">
      <div>Gift Wrap Options</div>
        {test}
      </div>
    )
}
