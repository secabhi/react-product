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
        this.props.PostVoidCallInvoker();
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
                            <div className="rowoneitem">{items.itemDesc}</div>
                            <div className="rowtwoitem">{items.pim_SKU_ID}</div>
                            <div className="rowthreeitem">High Neck Blouse with Tie</div>
                            <div className="rowfouritem">Helmut Lang</div>
                        </div>
                        <div className="columntwo-container">
                            <div className="rowoneitem">Qty {items.quantity}</div>
                            <div className="rowtwoitem"></div>
                            <div className="rowthreeitem">Blue Chambray</div>
                            <div className="rowfouritem">Size</div>
                        </div>
                        <div className="columnthree-container">
                            <div className="rowoneitem">S</div>
                        </div>
                        <div className="columnfour-container">
                            <div className="rowoneitem"></div>
                            <div className="rowtwoitem">MKD% (25%)</div>
                            <div className="rowthreeitem">Savings (30%)</div>
                            <div className="rowfouritem">TAX (8.00%)</div>
                        </div>
                        <div className="columnfive-container">
                            <div className="rowoneitem">600.00 EA</div>
                            <div className="rowtwoitem">- 150.00</div>
                            <div className="rowthreeitem">- 150.00</div>
                            <div className="rowfouritem">10100</div>
                        </div>
                        <div className="columnfive-container">
                            <div className="rowoneitem">600.00</div>
                            <div className="rowtwoitem"></div>
                            <div className="rowthreeitem"></div>
                            <div className="rowfouritem">36.00 T</div>
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
    return { postvoid: state.postvoid, postvoidtransdetails : state.postvoidtransdetails };
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidCallInvoker: postVoidFinalTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidDetails);
