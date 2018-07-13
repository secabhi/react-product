import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import { TextField, Divider } from 'material-ui';

import './sale-keypad.css';
import Modal from '../../UI/modal-two/modal-two';
import SaleContent from './SaleContent';
import keyIn from '../../resources/images/Key_In_PED_White.svg';
import keypad from '../../resources/images/Keypad_Grey.svg';
import productSearch from '../../resources/images/Product_Search.svg';


export default (props) => {
  console.log('disable header'+props.disabledHeaderStyle);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     skuModalShow: false
  //   }
  //   this.openModal = this.openModal.bind(this)
  // }

  // openModal() {
  //   this.setState({
  //     skuModalShow: true
  //   })
  // }

  // closeModal() {
  //   this.setState({
  //     skuModalShow: false
  //   })
  // };

  // render() {
    // const content = () => {
    //   return (
    //     <Modal top="300px" left="600px" width="725px" height="568px"  className="saleKeypadModal">
    //     <div>
    //       <img src={keypad} className='key-sku-modal-icon'/>
    //       <div className='key-sku-modal-label'>Key SKU</div>
    //       <div className='key-sku-modal-message'>Please enter SKU Number to Add Items</div>
    //       <div className='key-sku-modal-button'>
    //         <span className="key-sku-button-text">Submit</span>
    //       </div>  
    //     </div>
    //     {/* <button onClick={() => this.props.getItem()}>Submit</button> */}
    //     </Modal>

    //   )
    // }
    // const SkuModal = this.state.skuModalShow ? content() : null 
  function openNav(){
    document.getElementById("modifyMenu").style.display = "block";
    document.getElementById("modifyMenuOverlay").style.display = "block";
  }

    return (
      
      <div style={props.disableHeaderOptions?props.disabledHeaderStyle:props.enabledHeaderStyle} className={props.disabled ? 'keypad-container element-disabled' : 'keypad-container'}>
      {console.log('props in keypad'+JSON.stringify(props))}
        <button className="options-button" onClick={() => openNav()} ><span className="options-button-text">Options</span></button>
        <button className="product-search-button">
          <img className="product-search-logo" src={productSearch} alt="product-search"/>
          <span className="product-search-text">Product Search</span>
        </button>

        <button className="key-sku-button" onClick={() => props.openModal()}>
          <img className="key-sku-logo" src={keyIn} alt="key-sku"/>
          <span className="key-sku-text">Key SKU</span>
        </button>
      </div>
    )

};
