import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './postVoid.css';
import { startSpinner } from '../common/loading/spinnerAction';
import { postVoidFinalTransaction } from '../post-void/postVoidAction';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import {HeaderView} from '../common/header/View/HeaderView';
class PostVoidDetails extends Component {


    postVoidInvoker = () => {
      
        this.props.PostVoidCallInvoker(this.props.login.userpin,this.props.postvoidtransdetails.transacID);
    }

    constructor(props)
    {
        super(props);
        this.state = {}
    }
    
    componentDidMount () {
        console.log("PostVoidDetails componentDidMount");
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <HeaderView
                    history = {this.props.history}
                    openPostVoidModal={this.props.openPostVoidModal}
                    navigateToHome = {this.navigateToHome}
                    isSale={this.state.isSale}
                    userPin = {this.props.userPin}/>
                <div className="postvoiddeetails-container">
                    <div className="postvoid-details-heading">
                        <label className="labelCls">Post Void</label>
                    </div>
                    <div className="isthiscls">Is this the correct transaction?</div>
                    {this.props.postvoidtransdetails.response.cartItems.items.map(function(items) {
                        return (
                    <div className="cardlayout-container">
                        <div className="rectangle-block"><label className="lineNumber">{items.lineNumber}</label></div>
                        <img className="detailsimagecls" src='http://via.placeholder.com/114x144'/>
                        <div className="columnone-container">
                            <div className="rowoneitem">{items.brandDesc}</div>
                            <div className="rowtwoitem">{items.pim_SKU_ID}</div>
                            <div className="rowthreeitem">{items.itemDesc}</div>
                            <div className="rowfouritem">{items.eventDescription}</div>
                        </div>
                        <div className="columntwo-container">
                            <div className="rowoneitem">Qty {items.quantity}</div>
                            <div className="rowtwoitem"></div>
                            <div className="rowthreeitem">{items.color}</div>
                            <div className="rowfouritem">{items.size}</div>
                        </div>
                        <div className="columnthree-container">
                            <div className="rowoneitem">S</div>
                        </div>
                        <div className="columnfour-container">
                            <div className="rowoneitem"></div>
                            <div className="rowtwoitem">MKD% ({items.maxDiscount}%)</div>
                            <div className="rowthreeitem">Savings ({items.subClass}%)</div>
                            <div className="rowfouritem">TAX ({items.taxPercent}%)</div>
                        </div>
                        <div className="columnfive-container">
                            <div className="rowoneitem">{items.itemPrice} EA</div>
                            <div className="rowtwoitem">- {items.salesId}</div>
                            <div className="rowthreeitem">- {items.itemsTax}</div>
                            <div className="rowfouritem">{items.salePrice}</div>
                        </div>
                        <div className="columnfive-container">
                            <div className="rowoneitem">{items.totalPrice}</div>
                            <div className="rowtwoitem"></div>
                            <div className="rowthreeitem"></div>
                            <div className="rowfouritem">{items.class}T</div>
                        </div>
                        
                            
                        
                    </div>
                    );
                })}
                    <div className="priceCls">
                    <label className="subTtl">Subtotal </label>
                    <label className="subTtlPrice"> {this.props.postvoidtransdetails.response.subTotal}</label>
                    <label className="tacCls">Tax </label>
                    <label className="tacClsPrice"> {this.props.postvoidtransdetails.response.totalTax}</label>
                    <label className="totalcls">Total</label>
                    <label className="totalclsPrice"> {this.props.postvoidtransdetails.response.total}</label>
                   
                    
                </div>
                </div>
                <div className="postvoiddetails-footer-button-area">
                    <button className="nobtn">NO</button>
                    <button className="yesbtn" onClick={this.postVoidInvoker}>YES</button>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { postvoid: state.postvoid, postvoidtransdetails : state.postvoidtransdetails,login:state.login};
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidCallInvoker: postVoidFinalTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidDetails);
