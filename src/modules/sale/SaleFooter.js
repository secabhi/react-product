import React, { Component } from 'react';
import './sale-footer.css';
import payment from '../../resources/images/Go_To_Payment.svg';

function viewMoreFunc() {
  if(window.innerWidth > 1080){
    document.getElementsByClassName("sale-content")[0].style.height = "525px";
  }
  else if(window.innerWidth < 1081){
  document.getElementsByClassName("sale-content")[0].style.height = "781px";
  }
  document.getElementById("footerContainer").className = "viewMoreClass";
  document.getElementById("total").style.display = "flex";
  document.getElementById("total").className = "viewMoreTotal";
  document.getElementById("viewMoreLink").style.display = "none";
  document.getElementById("viewLessLink").style.display = "block";
  // document.getElementById("modifyMenuOverlay").style.display = "block";
}

function viewLessFunc() {
  if(window.innerWidth > 1080){
  document.getElementsByClassName("sale-content")[0].style.height = "651px";
  }
  else if(window.innerWidth < 1081){
  document.getElementsByClassName("sale-content")[0].style.height = "1055px";
  }
  document.getElementById("footerContainer").className = "footer-container";
  document.getElementById("viewMoreLink").style.display = "block";
  document.getElementById("viewLessLink").style.display = "none";
  document.getElementById("total").style.display = "none";
  document.getElementById("total").className = "viewMoreTotal";
  // document.getElementById("modifyMenuOverlay").style.display = "block";
}

export default (props) => (

  <div className="footer-container" id="footerContainer">
    <div id="total">
      <div className="item-total" id="total-small">Total<span className="item-total-amount">$&nbsp;{parseFloat(props.total).toFixed(2)}</span></div>
      <div><a id="viewLessLink" className="viewless-link" onClick={() => viewLessFunc()}>View Less</a></div>
    </div>
    <div className="price-Details" id="priceDetails">
      <div className="item-subtotal" style={(props.cartExist)?{}:{visibility: 'hidden'}}>Subtotal<span className="item-subtotal-amount">$&nbsp;{parseFloat(props.subTotal).toFixed(2)}</span></div>
      <div className="item-taxed" style={(props.cartExist)?{}:{visibility: 'hidden'}}>
        <span className="item-taxed-align">Tax</span><span className="item-taxed-amount">$&nbsp;{parseFloat(props.totalTax).toFixed(2)}</span>
      </div>
      
      {props.taxExemptID ?
      <div className="item-taxed-exempt" style={(props.cartExist)?{}:{visibility: 'hidden'}}>
        <span className="item-taxed-exempt-align">Tax Exempt</span><span className="item-taxed-exempt-ID">{props.taxExemptID}</span>
      </div>
      :null
      }

      <div className="item-total" style={(props.cartExist)?{}:{visibility: 'hidden'}}>
        <span>Total</span><span className="item-total-amount-align">$&nbsp;{parseFloat(props.total).toFixed(2)}</span></div>

      <div className="viewmore-link" id="viewMoreLink" style={(props.cartExist)?{}:{visibility: 'hidden'}}><a className="viewmore-link-text" onClick={() => viewMoreFunc()}>View More</a></div>

      <button className="payment-button" onClick={() => props.history.push('/payment', props.history.location.state ? { isClienteled: props.history.location.state.isClienteled } : { isClienteled: true })}>
        <img className="payment-logo" src={payment} alt="payment" />
        <span className="payment-text">Payment</span>
      </button>
    </div>

  </div>
 
)
