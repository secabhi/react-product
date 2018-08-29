// Dependencies
import React, {Component} from "react";
import { Button} from "reactstrap";
import Modal from 'react-responsive-modal';


// CSS
import "../../common/subheaders/payment-subheader.css";
import "./payment.css";
// Components
import Header from "../../common/header/header";
import Footer from "../../common/footer/footer";
import {PaymentCard} from './Components/PaymentCard';
import {PurchasesList} from './Components/PurchasesList';
// import {SFFPurchasesModal} from './Components/Modals/SFFPurchasesModal';
import {ReceiptMenuModal} from './Components/Modals/ReceiptMenuModal';
import {EmailReceiptModal} from './Components/Modals/EmailReceiptModal';
import {PrintReceiptModal} from './Components/Modals/PrintReceiptModal';
import {SignatureModal} from './Components/Modals/SignatureModal';
import {VerifyEmailModal} from './Components/Modals/VerifyEmailModal';
import {CardAuthorizationModal} from './Components/Modals/CardAuthorizationModal';
import GiftCardScanSwipeModal from './Components/Modals/GiftCardScanSwipeModal';
import ReasonsCardNotSwiped from './Components/Modals/ReasonsCardNotSwiped';
import {SFFHeader} from './Components/SFFHeader';
import {SFFPaymentCard} from './Components/SFFPaymentCard';
import {CardErrorModal} from './Components/Modals/cardErrorModal';
import {PrintGiftReceiptModal} from './Components/Modals/printGiftReceiptModal';

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
        
        console.log('cards in payment view'+JSON.stringify(this.props.otherCards.kiNum));
        console.log('path in payment view'+this.props.path);
        console.log('usestoredcard in payment vieww'+this.props.useStoredCard);
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
                        <Header sale="true" startMidVoid={this.props.startMidVoid} history={this.props.history} inTransaction={this.props.transInfo.length>0?true:false}/>
                    </div>
                    <div className="cusdet-sub-header">
                        <div className="back-button" onClick={this.props.transInfo.length>0?"":this.props.navigateBack}>
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
                             <div className="customer-name-label">{this.toCamelCase(this.props.salutation)} {this.toCamelCase(this.props.fname)} {this.toCamelCase(this.props.lname)}</div>
                            </div>
                            <div className="divider" />
                            <div className="incircle-details">
                            {
                                   (this.props.currentLvl != 0) ?
                                   (<span className="subheader-iconNum">{this.props.currentLvl}</span>):
                                   (<span></span>)
                               }
                               {
                                   (this.props.currentLvl != 0) ?
                                   (<img
                                    className="subheader-circleStatusicon"
                                    src={incircle_purple_large_bttn}
                                    alt="profile-tab-icon" />):
                                    (<span></span>)
                            }

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
                                {
                                    
                                    this.props.isCards === true 
                                    ? this.props.cards.map((card, index) => {
                                        return <PaymentCard props={this.props} index = {index} card={card} />
                                        })
                                    : this.props.otherCards.kiNum && (this.props.useStoredCard || this.props.path=='/payment')
                                    ? <PaymentCard props={this.props} otherCards={true} card={this.props.otherCards}/>
                                        :emptyCardContainer}
                            </div >
                            <div className="left-content-footer">
                                <button className="gift-cards" onClick={this.props.handleGiftCardModal}>GIFT CARDS</button>
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
                    <ReasonsCardNotSwiped props={this.props} />
                    <ReceiptMenuModal props={this.props}/>
                    <EmailReceiptModal props={this.props} />
                    <PrintReceiptModal props={this.props} />
                    <SignatureModal props={this.props} />
                    <VerifyEmailModal props={this.props} />
                    <CardAuthorizationModal props={this.props} />
                    {this.props.giftCardModal && (!this.props.useStoredCard || this.props.path=='/payment') ?<GiftCardScanSwipeModal props={this.props} onClose={() => { }} showCloseIcon={false}
                        closeOnOverlayClick={false} /> : null}
                    <Modal classNames={{ modal: 'card-error-modal-container' }}
                        open={this.props.errorModal}
                        onClose={this.props.closeErrorModal}
                        showCloseIcon={false}
                        closeOnOverlayClick={false}>
                        <CardErrorModal
                            errorText={<div>{this.props.cardErrorMsg}</div>}
                            props={this.props}
                            onClose={() => { }}
                            showCloseIcon={false}
                            closeOnOverlayClick={false}/>
                    </Modal>
                    <PrintGiftReceiptModal props={this.props}/>
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
                            {/* <span className="sff-purchasesView" onClick={this.props.showPurchasesModal}>
                                <u>View Purchases</u>
                            </span> */}
                        </div>

                    </div>
                    <div className="payment-mainSection">
                        {this.props.isCards
                            ? this.props.cards.map((card, index) => {
                                return <SFFPaymentCard props={this.props} index = {index} card={card} />
                                })
                            : emptyCardContainer}
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
                    <ReceiptMenuModal props={this.props}/>
                    <EmailReceiptModal props={this.props} />
                    <PrintReceiptModal props={this.props} />
                    <SignatureModal props={this.props} />
                    <VerifyEmailModal props={this.props} />
                    {/* <SFFPurchasesModal props={this.props} /> */}
                    <CardAuthorizationModal props={this.props} />
                    {this.props.giftCardModal?<GiftCardScanSwipeModal props={this.props} />:null}
                    <Modal classNames={{ modal: 'card-error-modal-container' }}
                        open={this.props.errorModal}
                        onClose={this.props.closeErrorModal}
                    >
                     <CardErrorModal
                            errorText={<div>{this.props.cardErrorMsg}</div>}
                            props={this.props}
                                    />  
                    </Modal>
                </div>
            )

        } else return (<div></div>)
    }
}

