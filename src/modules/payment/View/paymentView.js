// Dependencies
import React, {Component} from "react";
import { Button} from "reactstrap";


// CSS
import "../../common/subheaders/payment-subheader.css";
import "./payment.css";
// Components
import Header from "../../common/header/header";
import Footer from "../../common/footer/footer";
import {PaymentCard} from './Components/PaymentCard';
import {PurchasesList} from './Components/PurchasesList';
import {SFFPurchasesModal} from './Components/Modals/SFFPurchasesModal';
import {ReceiptMenuModal} from './Components/Modals/ReceiptMenuModal';
import {EmailReceiptModal} from './Components/Modals/EmailReceiptModal';
import {PrintReceiptModal} from './Components/Modals/PrintReceiptModal';
import {SignatureModal} from './Components/Modals/SignatureModal';
import {VerifyEmailModal} from './Components/Modals/VerifyEmailModal';
import {SFFHeader} from './Components/SFFHeader';
import {SFFPaymentCard} from './Components/SFFPaymentCard';
import {SFFCardList} from './Components/SSFCardList';

// Images
import backArrowWhite from "../../../resources/images/Back_White.svg";
import keyPad from '../../../resources/images/Key_In_Green_80.svg';
var incircle_purple_large_bttn = require("../../../resources/images/Incircle_Level_purple_large_bttn.svg");


export class PaymentView extends Component {
    componentWillMount() {
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    toCamelCase(str) {
        return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
            return match.charAt(match.length-1).toUpperCase();
        });
      }

    render() {
        //console.log(this.props)
        var leftContentHeader = (
            <div className="left-content-header">
                <span className="amountDueLabel">Amount Due&nbsp;
                    <span className="amountDue">${this.props.amountDue}</span>
                </span>
                <span className="headerInstructions">Insert / Swipe Card or Select Tender Type</span>
            </div>
        );

        var emptyCardContainer = (
            <p className="emptyCardContainer"> Insert / Swipe Card <br /> or Select Tender Type </p>
        );

        if (this.screenWidth === 1920) {
            return (
                <div className="cusdet-container">
                    <div className="cusdet-header">
                        <Header sale="true" history={this.props.history} />
                    </div>
                    <div className="cusdet-sub-header">
                        <div className="back-button" onClick={this.props.navigateBack}>
                            <img className="back-arrow" src={backArrowWhite} alt="navigate-back" />
                        </div>
                        <div className="divider" />
                        <div className="title-container">
                            <div className="payment-title">
                                Payment
                            </div>
                        </div>
                        < div className="payment-spacer-div" />
                        <div className="subheader-right-container">
                            <div className="customer-name">
                             {/* <div className="customer-name-label">{this.toCamelCase(this.props.salutation)} {this.toCamelCase(this.props.firstName)} {this.toCamelCase(this.props.lastName)}</div> */}
                            </div>
                            <div className="divider" />
                            <div className="incircle-details">
                                <span className="subheader-iconNum">{this.props.currentLvl}</span>
                                <img
                                    className="subheader-circleStatusicon"
                                    src={incircle_purple_large_bttn}
                                    alt="profile-tab-icon" />
                             <div className="payment-cust-address-container">
                                <div className="payment-cust-address">
                                <div>{this.props.address1}</div>
                                <div style={{textAlign:'left'}}>{this.props.city} {this.props.state} {this.props.zip}</div>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-page-content">
                        <div className="payment-left-content">
                            {this.props.isCards === true
                                ? leftContentHeader
                                : <div/>}
                            <div className="payment-cards-container">
                                {this.props.isCards === true
                                    ? this.props.cards.map((currentCard, index) => {
                                        console.log("CARDS values",this.props.values); 
                                        return <PaymentCard props={this.props} index = {index} value = {this.props.values[index]} />
                                        })
                                    : emptyCardContainer}
                            </div >
                            <div className="left-content-footer">
                                <button className="gift-cards" onClick={this.props.giftCard}>GIFT CARDS</button>
                                <img className="keypad" src={keyPad} onClick={this.props.keyPad}></img>
                            </div>
                        </div>
                        <div className="payment-right-content">
                            <PurchasesList props={this.props} />
                        </div>
                    </div>
                    < div className="cusdet-footer">
                        <Footer />
                    </div>
                    <ReceiptMenuModal props={this.props}/><SFFPurchasesModal props={this.props} /><EmailReceiptModal props={this.props} /><PrintReceiptModal props={this.props} /><SignatureModal props={this.props} /><VerifyEmailModal props={this.props} />
                </div >


            );
        }
        else if (this.screenWidth === 1080) {
            return (
                <div className="sff-payment-content">
                    <div className='payment-header'>
                        <Header history={this.props.history}></Header>
                    </div>
                    <SFFHeader props={this.props} />

                    {/* Amount Section */}
                    <div className="payment-AmountSection">
                        <div>
                            <span className="payment-AmountText">Amount Due
                            </span>
                            <span className="payment-Amount">${this.props.amountDue}</span>
                            <span className="sff-purchasesView" onClick={this.props.showPurchasesModal}>
                                <u>View Purchases</u>
                            </span>
                        </div>

                    </div>
                    <div className="payment-mainSection">
                        <SFFCardList props={this.props} />
                        {this.props.isCards
                            ? <SFFPaymentCard props={this.props} />
                            : (this.props.cards.length < 3 ? emptyCardContainer : '')}
                    </div>
                    <div className="payment-MoreSection">
                        <div className="payment-MoreText" hidden={!this.props.showMore}>
                            <u onClick={() => this.props.showMoreToggle()} hidden={!this.props.showMore}>View More</u>

                        </div>
                        <div className="payment-LessText" hidden={this.props.showMore}>
                            <u onClick={() => this.props.showMoreToggle()} hidden={this.props.showMore}>View Less</u>
                            <div>
                                <Button className="sff-paymentbtns advancebtn">ADVANCED DEPOSITS</Button>
                                <Button className="sff-paymentbtns gftbtn" onClick={this.props.giftCard}>GIFT CARDS</Button>
                            </div>
                        </div>
                        <div className="payment-MoreImg">
                            <img src={keyPad} />>
                        </div>
                    </div>
                    <div className="payment-TotalSection">
                        <table cellspacing="20">    
                            <tr>
                                <td className="payment-tblText">SubTotal</td>
                                <td className="payment-tblValue">${(this.props.subtotal)}</td>
                            </tr>
                            <tr>
                                <td className="payment-tblText">Tax</td>
                                <td className="payment-tblValue">${this.props.taxAmount}</td>
                            </tr>
                            <tr>
                                <td className="payment-tblTotal">TOTAL</td>
                                <td className="payment-tblTotal">${this.props.total}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="sff-payment-footer">
                        <Footer></Footer>
                    </div>
                    <ReceiptMenuModal props={this.props}/><SFFPurchasesModal props={this.props} /><EmailReceiptModal props={this.props} /><PrintReceiptModal props={this.props} /><SignatureModal props={this.props} /><VerifyEmailModal props={this.props} />
                </div>
            )

        } else return (<div></div>)
    }
}

