import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import accordianOpen from '../../../resources/images/Accordian_Open.svg';
import accordianClose from '../../../resources/images/Accordian_Closed.svg';
import services from '../../../resources/images/Services.svg';
import selectedServices from '../../../resources/images/Services_Selected.svg';
import {ModifyPriceErrorModal} from '../../sale/modal-component/modalComponent'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {navigate, setCurrnetItem} from '../SalesCartAction';
import {giftWrapType, getGiftWrap} from './sale-services-gift-wrap/GiftWrapActions';

import { startSpinner } from '../../common/loading/spinnerAction';
// import { setCurrnetItem } from './SalesCartAction';

import './SaleServicesMenu.css';


class SaleServicesMenu extends Component {
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            dropDown: false,
            altDropDown: false,
            giftWrapMode : false,
            alerationMode : false,
            activated: false,
            isSelected: '',
            gifwrapError:false
            
        };
    }


    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.currentItem === '') {
    //       this.setState({dropDown:false})
    //     }
    //   }

    handleDropDown = () => {
        this.setState({dropDown: !this.state.dropDown})
    }

    handleAltDropDown = () => {
        this.setState({altDropDown: !this.state.altDropDown})
    }

    renderGiftWrap = (data,type) => {
       if(data.currentItem!=="" && data.cart.data.cartItems.items[data.currentItem].length>1 && data.cart.data.cartItems.items[data.currentItem][1].print_GWGR_Msg!==null)
       {
        this.props.showGiftWrapError();
       }
       else{
        this.props.navigate(data);
        this.props.giftWrapType(type);
        this.props.history.push('/gift-wrap')
       }
    }
    renderGiftWrapCom = (data,type) => {
        this.props.navigate(data)
        this.props.giftWrapType(type);
        this.props.startSpinner(true);
        this.props.getGiftWrap(501);
        this.props.history.push('/gift-wrap-com')
    }
    
    renderAlterations = (data) => {
        this.props.navigate(data)
        this.props.history.push('/alterations')
    }

    activeLink = (e) => {
        this.setState({
            activated: !this.state.activated
        })

        if(this.state.activated) {
            e.currentTarget.style.color = '#4b2b6f',
            e.currentTarget.style.textDecoration = 'underline #4b2b6f',
            e.currentTarget.style.fontWeight = '500'
        } else {
            e.currentTarget.style.color = '#3a3a3a',
            e.currentTarget.style.textDecoration = 'none',
            e.currentTarget.style.fontWeight = 'normal'
        }
    }


    
    render() {
       //isEnabled - true, only if we have items in cart and a nonSkuItem is not Selected 
       const isEnabled  = this.props.items[0] && !this.props.nonSkuSelection;
        return (
            //<div className="services-enabled-style">
            <div className={ isEnabled ?"services-enabled-style":"services-disabled-style"}>
                <div className="option-list services-menu">
                    <img onClick={this.handleDropDown} className="services-icon" src={this.state.dropDown?selectedServices:services} alt="services"/>
                    <div onClick={this.handleDropDown} className="services-text">Services</div>
                    <img onClick={this.handleDropDown} className="menu-dropdown" src={this.state.dropDown?accordianOpen:accordianClose} alt="dropdown"/>
                </div>

                {this.state.dropDown ? 
                    <div className="drop-menu">

                        <div className={isEnabled ? "drop-menu-items services-enabled-style":"drop-menu-items services-disabled-style"} onClick={(e) => {
                            if(isEnabled) {
                                this.renderGiftWrap(this.props,"giftwrap"); 
                                this.activeLink(e);
                            }
                        }}>Gift Wrap</div>
                      
                        <div className={isEnabled ? "drop-menu-items services-enabled-style":"drop-menu-items services-disabled-style"} onClick={(e) => {
                            if(isEnabled) {
                                this.renderGiftWrapCom(this.props,"giftwrapcom"); 
                                this.activeLink(e);
                            }
                        }}>Gift Wrap COM</div>
                    
                        <div className={isEnabled ? "drop-menu-items services-enabled-style":"drop-menu-items services-disabled-style"} onClick={(e) => {
                            if(isEnabled) {
                                this.renderAlterations(this.props.cart.data); 
                                this.activeLink(e);
                            }
                        }}>Alterations</div>
                    
                        <div className="drop-menu-items alterations-only" onClick={this.handleAltDropDown}>Alterations Only
                            <img onClick={this.handleAltDropDown} className="menu-dropdown" src={this.state.altDropDown?accordianOpen:accordianClose} alt="dropdown" />
                        </div>
                            {this.state.altDropDown ? 
                                <div>
                                    <div className="alt-drop-menu-items" onClick={this.activeLink}>COM</div> 
                                    <div className="alt-drop-menu-items" onClick={this.activeLink}>Online Purchase</div> 
                                    <div className="alt-drop-menu-items" onClick={this.activeLink}>RFA Altn Redo</div> 
                                </div>
                                : (null) }
                    </div>
                    : (null)}
                    
            </div>
               
    )
  }
};


function mapStateToProps(state) {
    return { cart: state.cart }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navigate: navigate,
            giftWrapType: giftWrapType,
            getGiftWrap: getGiftWrap,
            setCurrnetItemInvoker : setCurrnetItem,
            startSpinner: startSpinner 
        }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SaleServicesMenu);

