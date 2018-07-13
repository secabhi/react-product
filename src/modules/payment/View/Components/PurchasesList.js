/* Dependencies import */
import React, {Component} from 'react';

//Images
import crossBlack from '../../../../resources/images/Cross_Black.svg';


export class PurchasesList extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
            <div>
{/* <div className="right-content-header">
                    <span className="right-content-header-title">Purchases</span >
                    <span className="close-purchasesList">
                        <img
                            src={crossBlack}
                            alt='close'
                            onClick=
                            { () => this.props.props.closepurchaseModal()}/>
                    </span>
                </div>
                <div className="sale-items-container">
                    {this.props
                        .props
                        .cart
                        .map((item, index) => (
                            <div className="productItem" key={index}>
                                <div className="productCount">
                                    <div>{index + 1}</div>
                                </div>
                                <img className="productImage" src={item.ImgLink} alt="productImage"/>
                                <table className="productItemtable">
                                    <tbody>
                                        <tr>
                                            <td className="itemName" colSpan="2">{item.ItemDesc}</td>
                                            <td className="qty" colSpan="1">Qty: {item.Quantity}</td>
                                        </tr>
                                        <tr>
                                            <td className="sku" colSpan="2">{item.Pim_SKU_ID}</td>
                                        </tr>
                                        <tr>
                                            <td className="description" colSpan="2">{item.Style}</td>
                                        </tr>
                                        <tr>
                                            <td className="size" colSpan="1">Size: {item.Size}</td>
                                            <td className="color" colSpan="1">Color: {item.Color}</td>
                                            <td className="price" colSpan="1">${item.ItemPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))
}
                </div> */
}
                <div className="right-content-totals">
                    <table>
                        <tbody>
                            <tr>
                            <td colspan="2"><div class="payment-tblTitle">Payment Details</div></td>
                            </tr>
                            <tr>
                            <td className="payment-tblText">SubTotal</td >
                            <td className="payment-tblValue">${this.props.props.subtotal}</td>
                            </tr>
                            <tr><td>  </td ><td>  </td></tr>
                            <tr>
                            <td className="payment-tblText">Tax</td >
                            <td className="payment-tblValue">${this.props.props.taxAmount}</td>
                            </tr>
                            <tr><td style={{height: 39 + 'px'}}>  </td ><td>  </td></tr>
                            <tr>
                            <td className="payment-tblTotalText">TOTAL</td >
                            <td className="payment-tblTotalValue">${this.props.props.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}