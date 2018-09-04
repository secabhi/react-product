// Dependencies
import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { productImgSearchAction } from '../product-search/ProductSearchAction';

// Components
import CartRenderer from '../common/cartRenderer/cartRenderer';
import {store} from '../../store/store';

// Common
import Footer from '../common/footer/footer'
import { HeaderView } from '../common/header/View/HeaderView';
import postVoidCall from '../payment/Orders/void';
import {xml2json} from '../common/helpers/helpers'

// Styles
import './postVoid.css';


class PostVoidDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: '$0.00',
            subTotal: '$0.00',
            totalTax: '$0.00'
        }
    }
    
    componentDidMount() {
        this.props.startSpinner(true)
        if (this.props.cart.dataFrom === 'UPDATE_IMAGES') {
            //this.props.startSpinner(true);
            this.props.productImgSearchAction(this.props.cart.productImages.imageUrls);
        }
        else if (this.props.cart.dataFrom === '') {
            //Do nothing
        } else {
            //this.props.startSpinner(false);
            this.setState({
                items: this.props.cart.data.cartItems.items,
                total: this.props.cart.data.total,
                subTotal: this.props.cart.data.subTotal,
                totalTax: this.props.cart.data.totalTax
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.postvoid.error) {
            throw new Error('POST VOID error: '+ nextProps.postvoid.error);
        }
        if (nextProps.cart.dataFrom === 'UPDATE_IMAGES') {
            //this.props.startSpinner(true);
            this.props.productImgSearchAction(nextProps.cart.productImages.imageUrls);
        }
        else if (this.props.cart.dataFrom === '') {
            //Do nothing
        } else {
            this.props.startSpinner(false);
            this.setState({
                items: this.props.cart.data.cartItems.items,
                total: this.props.cart.data.total,
                subTotal: this.props.cart.data.subTotal,
                totalTax: this.props.cart.data.totalTax
            });
        }
    }

   async completePostVoid(){
        const total = this.props.postvoid.selectedTransaction.total;
        const aurusTicket = this.props.postvoid.selectedTransaction.tender_List_Info.tenders[0].chrg.aurus_whizticketnum;
        const jsonResponse = await postVoidCall(total, aurusTicket);
        //waiting...
        console.log('POST VOID RESPONSE ', jsonResponse);
    }

   

 
    render() {
        console.log('home props'+JSON.stringify(store.getState().home));
        return (
            <div>
                <HeaderView
                    history={this.props.history}
                    openPostVoidModal={this.props.openPostVoidModal}
                    navigateToHome={this.navigateToHome}
                    userPin={this.props.login.userpin}
                />
                <div className="postvoiddeetails-container">
                    <div className="postvoid-details-heading">
                        <label className="labelCls">{store.getState().home.trans_type=='print-send'?'Print / Send Receipt':'Post Void'}</label>
                    </div>
                    <div className="isthiscls">Is this the correct transaction?</div>

                    {this.state.items[0] 
                        ?   
                            <div>
                                <CartRenderer
                                    style={{ boxShadow: 'none', marginLeft: '20px' }}
                                    items={this.state.items}
                                    subTotal={this.state.subTotal}
                                    taxTotal={this.state.totalTax}
                                    total={this.state.total}
                                    setCurrentItem={this.setCurrentItem}
                                />
                                <div className="post-void_priceDetails_total">
                                    <label className="subTtl">Subtotal </label>
                                    <label className="subTtlPrice"> {this.state.subTotal}</label>
                                    <label className="tacCls">Tax </label>
                                    <label className="tacClsPrice"> {this.state.totalTax}</label>
                                    <label className="totalcls">Total</label>
                                    <label className="totalclsPrice"> {this.state.total}</label>
                                </div> 
                            </div>    
                        :
                        <div></div> 
                    }   

                </div>

                <div className="postvoiddetails-footer-button-area">
                    <button className="nobtn">NO</button>
                    <button className="yesbtn" onClick={()=>this.completePostVoid()}>YES</button>
                </div>
                <Footer />
            </div>
        )
    }

}// end of class


function mapStateToProps(state) {
    return { cart: state.cart, login: state.login, postvoid: state.postvoid };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startSpinner: startSpinner, productImgSearchAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidDetails);
