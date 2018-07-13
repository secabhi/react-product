import React, {Component} from 'react'

import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import HomeHeaderSmall from '../home/home-header-small';
import {HeaderView} from '../common/header/View/HeaderView';
import MainItemSmall from '../../modules/sale/lineItemTypes/mainItem/mainItemSmall.js'; 
import './postvoiddetailssmallff.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { postVoidFinalTransaction } from '../post-void/postVoidAction';
class PostVoidDetailssmallff extends Component {

    constructor(props)
    {
        super(props);
        this.state = {}
    }
    postVoidInvoker = () => {
        this.props.PostVoidCallInvoker();
    }

    componentDidMount () {
        
        console.log("PostVoidDetailsSFF componentDidMount");
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <HomeHeaderSmall
                    history = {this.props.history}
                    openPostVoidModal={this.props.openPostVoidModal}
                    navigateToHome = {this.navigateToHome}
                    isSale={this.state.isSale}
                    userPin = {this.props.userPin}/>
                
                <div className="postvoid-container">
                <div className="postvoid-header-container"> <div className="postvoid-header-label">Post Void</div></div>
                </div>
                <div className="postvoid-subheader-container"><div className="postvoid-subheader-label">Is this correct transaction?</div></div>
                {this.props.postvoidtransdetails.response.cartItems.items.map(function(items) {
                        return (
            <div className="scrolldiv">
              <div className="post-void-sff-item-content-container">
              <div className="post-void-sff-item-index">{items.lineNumber}</div>
              <img className="post-void-sff-item-image" src="http://via.placeholder.com/114x144"/>
              <div className="post-void-sff-item-descrption">
              
              <div  className="post-void-sff-item-One">{items.itemDesc}</div>
              <div  className="post-void-sff-item-two">{items.pim_SKU_ID}</div>
              <div  className="post-void-sff-item-three">3/4-Sleeve Organic Linen...</div>
              <div  className="post-void-sff-item-four">Helmut Lang</div>
              <div  className="post-void-sff-item-five">
              <div  className="post-void-sff-item-six">Color:Graphite</div>
              <div  className="post-void-sff-item-seven">Size:M</div>
              <div  className="post-void-sff-item-eight">Qty {items.quantity}</div>
              </div>
              <div  className="post-void-sff-item-nine">600.00 EA</div>
              <div  className="post-void-sff-item-ten">TAX(8.000%) 10100</div>
              
              </div>
              <div className="post-void-sff-item-price">
              <div  className="post-void-sff-item-priceVal">S</div>
              <div  className="post-void-sff-item-pricetax">600.00</div>
              <div  className="post-void-sff-item-priceDesc">36.00 T</div>
                         </div>
              </div>

              
</div>

               );
            })}
              {/* <div className="post-void-sff-item-content-container">
              <div className="post-void-sff-item-index">2</div>
              <img className="post-void-sff-item-image" src="http://via.placeholder.com/114x144"/>
              <div className="post-void-sff-item-descrption">
              
              <div  className="post-void-sff-item-One">Shirts/Tops</div>
              <div  className="post-void-sff-item-two">5903-45-45-673279312864</div>
              <div  className="post-void-sff-item-three">3/4-Sleeve Organic Linen...</div>
              <div  className="post-void-sff-item-four">Helmut Lang</div>
              <div  className="post-void-sff-item-five">
              <div  className="post-void-sff-item-six">Color:Graphite</div>
              <div  className="post-void-sff-item-seven">Size:M</div>
              <div  className="post-void-sff-item-eight">Qty1</div>
              </div>
              <div  className="post-void-sff-item-nine">600.00 EA</div>
              <div  className="post-void-sff-item-ten">TAX(8.000%) 10100</div>
              
              </div>
              <div className="post-void-sff-item-price">
              <div  className="post-void-sff-item-priceVal">S</div>
              <div  className="post-void-sff-item-pricetax">600.00</div>
              <div  className="post-void-sff-item-priceDesc">36.00 T</div>
                         </div>
              </div> */}
              <div className="postvoiddetailssmallff-footer-button">
                    <button className="post-void-sff-item-nobtn">NO</button>
                    <button className="post-void-sff-item-yesbtn" onClick={this.postVoidInvoker}>YES</button>
                </div>
                <Footer />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { postvoid: state.postvoid, postvoidtransdetails : state.postvoidtransdetails };
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidCallInvoker: postVoidFinalTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidDetailssmallff);



