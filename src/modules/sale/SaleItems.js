import React, { Component } from 'react';
import './sale-items.css';

export default class SaleItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: false
        }
    }


    addSaleItem() {
        // adds item to screen
        // axios call???
    }

    removeSaleItem() {
        // removes item from screen
    }

    selectItem() {
        this.setState({
            selectedItem: !this.state.selectedItem
        })
    }

  render() {
    const itemStyle = {
        boxShadow: '0 0 6px 0 #613b8c',
        backgroundColor: 'rgba(168, 126, 214, 0.05)',
        border: 'solid 2px #a87ed6'
    }
    const selectedItemStyle = this.state.selectedItem ? itemStyle : null

    return (
        [
        <div style={selectedItemStyle} onClick={() => this.selectItem()} className="saleItem-result list-body">
    
                    <div className="saleItem-result list-item">
                        <div className="item-index">1</div>
                        <img className="item-image" alt="Item"/>
                        <div className="item-brand">Elieen Fisher</div>
                        <div className="item-sku">12345</div>
                        <div className="item-description">High Neck Blouse</div>
                    </div>
                    <div className="saleItem-result list-item">
                        <span className="item-color">Blue</span>
                        <span className="item-size">Med</span>
                    </div>
                    <div className="saleItem-result list-item">
                        <div className="item-quantity">Quantity 1</div>
                    </div>
                    <div className="saleItem-result list-item">
                        <div className="item-price">600.00ea</div>
                        <div className="item-discount">25% off</div>
                        <div className="item-salestax">8.000% TAX 10100</div>
                    </div>
                    <div className="saleItem-result list-item">
                        <div className="item-price-amount">600.00</div>
                        <div className="item-discount-amount">-150</div>
                        <div className="item-salestax-amount">36.00 T</div>
                    </div>
                </div>,

                <div className="saleItem-result list-body-small">

                    <div className="saleItem-result list-test">
                        <div className="saleItem-itemNumber">

                        </div>
                        <div className="saleItem-item-img">

                        </div>

                        <div className="saleItem-result list-item">
                            <div className="item-brand">Elieen Fisher</div>
                            <div className="item-sku">12345</div>
                            <div className="item-description">High Neck Blouse</div>
                        </div>
                        <div className="saleItem-result list-item">
                            <span className="item-color">Blue</span>
                            <span className="item-size">Med</span>
                        </div>
                        <div className="saleItem-result list-item">
                            <div className="item-quantity">Qty 1</div>
                        </div>
                        {/* <div className="saleItem-result list-item">
                            <div className="item-price">600.00ea</div>
                            <div className="item-discount">25% off</div>
                            <div className="item-salestax">8.000% TAX 10100</div>
                        </div> */}
                        <div className="saleItem-result list-item">
                            <div className="item-price-amount">600.00</div>
                            <div className="item-discount-amount">-150</div>
                            <div className="item-salestax-amount">36.00 T</div>
                        </div>
                    </div>
                </div>
        ]
    )
  }
};





