import React, { Component } from 'react';

import accordianOpen from '../../../resources/images/Accordian_Open.svg';
import accordianClose from '../../../resources/images/Accordian_Closed.svg';
import services from '../../../resources/images/Services.svg';
import selectedServices from '../../../resources/images/Services_Selected.svg';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {navigate, setCurrnetItem} from '../SalesCartAction';
import { startSpinner } from '../../common/loading/spinnerAction';
// import { setCurrnetItem } from './SalesCartAction';

import './SaleServicesMenu.css';


class SaleServicesMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDown: false,
            altDropDown: false,
            giftWrapMode : false,
            alerationMode : false,
            activated: false,
            isSelected: ''
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

    renderGiftWrap = (data) => {
        this.props.navigate(data)
        this.props.history.push('/gift-wrap')
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
        console.log('MENU', this.props)
        return (
            <div className={(this.props.currentItem !== '')?"services-enabled-style":"services-disabled-style"}>
                <div className="option-list services-menu">
                    <img onClick={this.handleDropDown} className="services-icon" src={this.state.dropDown?selectedServices:services} alt="services"/>
                    <div onClick={this.handleDropDown} className="services-text">Services</div>
                    <img onClick={this.handleDropDown} className="menu-dropdown" src={this.state.dropDown?accordianOpen:accordianClose} alt="dropdown"/>
                </div>

                {this.state.dropDown ? 
                    <div className="drop-menu">

                        <div className="drop-menu-items" onClick={(e) => {this.renderGiftWrap(this.props); this.activeLink(e);}}>Gift Wrap</div>
                      
                        <div className="drop-menu-items" onClick={this.activeLink}>Gift Wrap COM</div>
                    
                        <div className="drop-menu-items" onClick={(e) => {this.renderAlterations(this.props.cart.data); this.activeLink(e);}}>Alterations</div>
                    
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


function mapStateToProps({cart}) {
    return { cart }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navigate: navigate,
            setCurrnetItemInvoker : setCurrnetItem,
            startSpinner: startSpinner 
        }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SaleServicesMenu);