import React, { Component } from 'react';
import './sale-footer.css';
import payment from '../../resources/images/Go_To_Payment.svg';

export default class SaleFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewMoreOpen : false
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  viewLessFunc = () => {
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
    //this.setState({ viewMoreOpen : false });
    // document.getElementById("modifyMenuOverlay").style.display = "block";
  }

  viewMoreFunc = () => {
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
    //this.setState({ viewMoreOpen : true });
    // document.getElementById("modifyMenuOverlay").style.display = "block";
  }
  
  render() {
    console.log('--*******PROPS: sales footer*****  ', this.props.checkForItems);
    return (<div className="footer-container" id="footerContainer">
    <div id="total">
      <div className="item-total" id="total-small">Total<span className="item-total-amount">$&nbsp;{parseFloat(this.props.total).toFixed(2)}</span></div>
    </div>
    <div className="price-Details"id="priceDetails" style={(this.props.taxExemptID)?{alignItems: 'normal', paddingTop: '30px'}:{}}>
      <div className="item-subtotal" style={(this.props.cartExist)?{}:{visibility: 'hidden'}}>
        <span>Subtotal</span>
        <span className="item-subtotal-amount">$&nbsp;{parseFloat(this.props.subTotal).toFixed(2)}</span>
      </div>
      <div className="item-taxed" style={(this.props.cartExist)?{}:{visibility: 'hidden'}}>
        <span className="item-taxed-align">Tax</span>
        <span className="item-taxed-amount">$&nbsp;{parseFloat(this.props.totalTax).toFixed(2)}</span>
      </div>

      {this.props.taxExemptID ?
      <div className="item-taxed-exempt" style={(this.props.cartExist)?{}:{visibility: 'hidden'}}>
        <span className="item-taxed-exempt-ID"><span style={{fontWeight: 400}}>Tax Exempt #&nbsp;&nbsp;&nbsp;</span>{this.props.taxExemptID}</span>
      </div>
      :null
      }

      <div className="item-total" style={(this.props.cartExist)?{}:{visibility: 'hidden'}}>
        <span>Total</span>
        <span className="item-total-amount-align">$&nbsp;{parseFloat(this.props.total).toFixed(2)}</span>
      </div>

      {/* <div className="viewmore-link" id="viewMoreLink" style={(this.props.cartExist)?{}:{visibility: 'hidden'}}><a className="viewmore-link-text" onClick={() => this.viewMoreFunc()}>View More</a></div> */}

      <button className={this.props.checkForItems ? 'payment-button' : 'payment-button-disabled'} style={this.props.taxExemptID !== '' ?  {marginTop: '30px'} : {}} onClick={() => this.props.navigateToPayment()}>
        <img className="payment-logo" src={payment} alt="payment" />
        <span className="payment-text">Payment</span>
      </button>
    </div>

  </div>);
  }
}
