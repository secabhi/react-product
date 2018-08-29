// Dependencies
import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { sendEmail, printReceipt, clearPrintSend } from './printRecieptAction';
import { productImgSearchAction } from '../product-search/ProductSearchAction';

// Components
import CartRenderer from '../common/cartRenderer/cartRenderer';
import { ReceiptMenuModal } from './Modals/ReceiptMenuModal';
import { EmailReceiptModal } from './Modals/EmailReceiptModal';
import { PrintReceiptModal } from './Modals/PrintReceiptModal';
import { PrintGiftReceiptModal } from './Modals/printGiftReceiptModal';
import { ErrorModal } from './Modals/ErrorModal';
import { EmailSugestionModal } from './Modals/EmailSugestionModal'
import { VerifyEmailModal } from './Modals/VerifyEmailModal';
import { store } from '../../store/store'



// Common
import Footer from '../common/footer/footer'
import { HeaderView } from '../common/header/View/HeaderView';

// Styles
import './printItemsList.css';
const CONFIG_FILE = require('../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;


class PrintItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: '$0.00',
            subTotal: '$0.00',
            totalTax: '$0.00',
            menuOptoins: false,
            emailModal: false,
            emailFailure: false,
            emailverifyModal: false,
            queueprintModal: false,
            printModal: false,
            receiptModal: false,
            fname: '',
            lname: '',
            email: '',
            isClienteled: false,
            multiGiftWrap: false,
            printGiftModal: false,
            errorModal: false,
            emailSugestionModal:false,
            suggestedEmail:'',
            emailSugError:'',
            error:'',

        }
    }
    componentDidMount() {
        console.log("post void", this.props)
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
        console.log('print or send', JSON.stringify(nextProps));
        /*if (nextProps.cart.dataFrom === 'UPDATE_IMAGES') {
            this.props.productImgSearchAction(nextProps.cart.productImages.imageUrls);
        }*/
        
        if (nextProps.PrintSend.dataFrom === 'REPRINT_RECEIPT_FAILURE') {
            this.props.startSpinner(false);
            this.setState({ receiptModal: false,
                errorModal: true })
            this.props.clearPrintSend();

        }
       else if (nextProps.PrintSend.dataFrom === 'FAILURE') {
            this.props.startSpinner(false);
            this.setState({ emailSugestionModal: true,
                suggestedEmail:this.state.email  })
            this.props.clearPrintSend();

        }
        else if (nextProps.PrintSend.dataFrom === 'UPDATE_CLIENT_DETAILS') {
            debugger
            this.props.startSpinner(false);
            //this.setState({ emailSugestionModal: false})
             this.props.clearPrintSend();
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

        //if(nextProps.cart.detailsFetchSuccessFlag)
        if (nextProps.cart.data.cartItems.purchaseClientNumber && nextProps.cart.data.cartItems.purchaseClientNumber != '00000000000000') {
            this.setState({
                fname: nextProps.cart.data.customerInfo.first_name,
                lname: nextProps.cart.data.customerInfo.last_name,
                email: nextProps.cart.data.customerInfo.email_address

            })
        }


    }

    closeInvalidErrorModal = () => {
        this.setState({ errorModal: false });
    }

    //Receipt Options
    openReceiptMenu = () => {
        this.setState({ receiptModal: true });
    }
    closeReceiptMenu = () => {
        this.setState({ receiptModal: false });
    }

    //Print Gift Receipt Options
    openPrintGiftModal = () => {
        this.setState({ printGiftModal: true });
    }
    closePrintGiftModal = () => {
        this.setState({
            printGiftModal: false,
            receiptModal: true
        })
    }


    //Print Reciept
    printReceipt = (multiGiftWrap) => {
        const config = require('../../resources/stubs/config.json');
        const clientConfig = config.clientConfig;
        var params = {
            "Store" : clientConfig.Store,
            "Terminal" : clientConfig.Terminal,
            "TransactionId": this.props.cart.data.transactionId,
            "registerNum" : clientConfig.registerNum,            
            "multiGiftWrap": multiGiftWrap ? true : false,            
            "StoreAssoc": this.props.login.userpin,//this.props.login.userpin,            
            "RePrint" : "true"

        }

        this.props.startSpinner(true);
        // this.props.clearEmail();
        this.props.printReceiptInvoker(params);

    }

    printReceiptActionReturned = (data) => {
        this.props.startSpinner(false);
        if (data.responseCode == 0) {
            this.exit();
        } else {
            console.log(data.responseText)
        }
    }

    openprintModal = () => {
        this.setState({ printModal: true, receiptModal: false, emailModal: false, queueprintModal: false })
    }
    closePrintModal = () => {
        this.setState({ printModal: false, receiptModal: false, emailModal: false })
        this.exit();
    }

    //Email Receipt
    handleLnameInput = (event) => {
        this.setState({
            lname: event.target.value
        })
    }
    handleFnameInput = (event) => {
        this.setState({
            fname: event.target.value
        })
    }
    handleEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handlesuggestedEmailInput = (event) => {
        this.setState({
            suggestedEmail: event.target.value
        })
        
    }

    openemailverifyModal = () => {
        if (this.state.email != '' && this.state.email != undefined && this.state.email != null) {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.state.email).toLowerCase()) || !(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                this.setState({ error: "Email is not valid" })
            } else {
                this.setState({
                    emailverifyModal: true,
                    emailModal: false,
                    emailFailure: false,
                    error: ""
                })
            }
        }
    }

    verifySuggestionEmail = () => {
        if (this.state.suggestedEmail != '' && this.state.suggestedEmail != undefined && this.state.suggestedEmail != null) {
            let lastAtPos = this.state.suggestedEmail.lastIndexOf('@');
            let lastDotPos = this.state.suggestedEmail.lastIndexOf('.');
            var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(this.state.suggestedEmail).toLowerCase()) || !(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.suggestedEmail.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.suggestedEmail.length - lastDotPos) > 2)) {
                this.setState({ emailSugError: "Email is not valid" });
            } else {
                this.setState({ emailSugError: '' });
               this.emailSugestionSend();
            }
        }
    }

    closeEmailverifyModal = () => {
        //this.props.clearEmail();
        this.setState({
            emailverifyModal: false,
            emailModal: true,
            emailFailure: false
        })
    }
    closeEmailSuggestionModal = () => {
        //this.props.clearEmail();
        this.setState({
            emailSugestionModal: false,
            fname: '',
            lname: '',
            email: '',
            suggestedEmail:'',
            emailSugError: ''
        })
    }
    emailSend = () => {
        this.setState({ emailverifyModal: false})
        var params = {
            "ReqHeader": {
                "StoreNum":clientConfig.StoreNum,
                "RegisterNum":clientConfig.RegisterNum,
                "AssociateNumber": this.props.login.userpin,
                "TransactionNum": store.getState().home.transactionData.transactionNumber ? store.getState().home.transactionData.transactionNumber : '1249'
            },
            "FirstName": this.state.fname,
            "LastName": this.state.lname,
            "EmailAddress": this.state.email,
            "ClientSmartId": "0001000284641"
        };
        if (this.state.email == "" || this.state.email == null) {

        } else {
            this.props.startSpinner(true);
            this.setState({ emailFailure: false })
            this.props.sendRecieptActionInvoker(params);
        }
    }

    emailSugestionSend = () => {
        this.setState({ emailSugestionModal: false,
            emailSugError: '',
            email:this.state.suggestedEmail  })
        var params = {
            "ReqHeader": {
                "StoreNum":clientConfig.StoreNum,
                "RegisterNum":clientConfig.RegisterNum,
                "AssociateNumber": this.props.login.userpin,
                "TransactionNum": store.getState().home.transactionData.transactionNumber ? store.getState().home.transactionData.transactionNumber : '1249'
            },
            "FirstName": this.state.fname,
            "LastName": this.state.lname,
            "EmailAddress": this.state.suggestedEmail,
            "ClientSmartId": "0001000284641"
        };
        if (this.state.suggestedEmail == "" || this.state.suggestedEmail == null) {

        } else {
            this.props.startSpinner(true);
            this.setState({ emailFailure: false })
            this.props.sendRecieptActionInvoker(params);
        }
    }

    emailPrintReceipt = () => {
        this.setState({ emailModal: true, queueprintModal: true, receiptModal: false, printModal: false })
    }

    openemailModal = () => {
        this.setState({ emailModal: true, receiptModal: false })
    }

    closeEmailModal = () => {
        this.setState({ emailModal: false,
            receiptModal:false,
            fname: '',
            lname: '',
            email: '',
            error:'',
            suggestedEmail:'' })
        if (this.state.queueprintModal) {
            this.openprintModal();
        } /*else {
            this.setState({ receiptModal: true })
        }*/
    }
    closeErrorModal = () => {
        this.setState({ errorModal: false })
        if (this.state.cardErrorMsg.startsWith("Unable To Connect")) {
            //openerrormodal and suspend
        } else {
            this.cardLookup();
        }

    }
    navigateToHome = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            this.state.items[0] ? (
                <div>
                    <HeaderView
                        history={this.props.history}
                        openPostVoidModal={this.props.openPostVoidModal}
                        navigateToHome={this.navigateToHome}
                        userPin={this.props.login.userpin}
                    />
                    <div className="postvoiddeetails-container">
                        <div className="postvoid-details-heading print-send-heading">
                            <label className="labelCls">Print / Send Receipt</label>
                        </div>

                        <div className="isthiscls">Is this the correct transaction?</div>

                        <CartRenderer
                            style={{ boxShadow: 'none', marginLeft: '20px' }}
                            items={this.state.items}
                            subTotal={this.state.subTotal}
                            taxTotal={this.state.totalTax}
                            total={this.state.total}
                            setCurrentItem={this.setCurrentItem}
                        />
                        {this.state.subTotal ?
                            <div className="post-void_priceDetails_total print-send-price-details">
                                <label className="subTtl">Subtotal </label>
                                <label className="subTtlPrice"> {this.state.subTotal}</label>
                                <label className="tacCls">Tax </label>
                                <label className="tacClsPrice"> {this.state.totalTax}</label>
                                <label className="totalcls">Total</label>
                                <label className="totalclsPrice"> {this.state.total}</label>
                            </div> :
                            null
                        }
                    </div>

                    <div className="postvoiddetails-footer-button-area">
                        <button className="nobtn" onClick={this.navigateToHome}>NO</button>
                        <button className="yesbtn" onClick={this.openReceiptMenu}>YES</button>
                    </div>
                    <Footer />
                    <ReceiptMenuModal
                        receiptModal={this.state.receiptModal}
                        printReceipt={this.printReceipt}
                        openReceiptMenu={this.openReceiptMenu}
                        closeReceiptMenu={this.closeReceiptMenu}
                        openemailModal={this.openemailModal}
                        closeEmailModal={this.closeEmailModal}
                        openemailverifyModal={this.openemailverifyModal}
                        closeEmailverifyModal={this.closeEmailverifyModal}
                        closeError={this.closeError}
                        openprintModal={this.openprintModal}
                        closePrintModal={this.closePrintModal}
                        openPrintGiftModal={this.openPrintGiftModal}
                    />
                    <EmailReceiptModal
                        handleEmailInput={this.handleEmailInput}
                        fname={this.state.fname}
                        lname={this.state.lname}
                        emailModal={this.state.emailModal}
                        isClienteled={this.state.isClienteled}
                        email={this.state.email}
                        handleLnameInput={this.handleLnameInput}
                        handleFnameInput={this.handleFnameInput}
                        openemailverifyModal={this.openemailverifyModal}
                        emailverifyModal={this.state.emailverifyModal}
                        openemailModal={this.openemailModal}
                        closeEmailModal={this.closeEmailModal}
                        error={this.state.error}
                    />
                    <PrintReceiptModal
                        printReceipt={this.printReceipt}
                        emailSend={this.emailSend}
                        printModal={this.state.printModal}
                        openprintModal={this.openprintModal}
                        closePrintModal={this.closePrintModal}
                    />
                    <VerifyEmailModal
                        emailverifyModal={this.state.emailverifyModal}
                        emailSend={this.emailSend}
                        email={this.state.email}
                        openemailverifyModal={this.openemailverifyModal}
                        closeEmailverifyModal={this.closeEmailverifyModal}
                    />
                    <PrintGiftReceiptModal
                        printGiftModal={this.state.printGiftModal}
                        printReceipt={this.printReceipt}
                        openPrintGiftModal={this.openPrintGiftModal}
                        closePrintGiftModal={this.closePrintGiftModal}
                    />
                    <EmailSugestionModal
                    emailSugestionModal= {this.state.emailSugestionModal}
                    email={this.state.email}
                    suggestedEmail={this.state.suggestedEmail}       
                    handlesuggestedEmailInput={this.handlesuggestedEmailInput}
                    verifySuggestionEmail={this.verifySuggestionEmail}
                    emailSugError={this.state.emailSugError}
                    closeEmailSuggestionModal={this.closeEmailSuggestionModal}/>
                    <ErrorModal
                        errorModal={this.state.errorModal}
                        closeInvalidErrorModal={this.closeInvalidErrorModal}
                    />
                </div>

            )
                :
                (<div>
                </div>)
        )
    }

    postVoidInvoker = () => {
        this.props.PostVoidCallInvoker(this.props.login.userpin);
    }

    setCurrentItem = () => {

    }

}// end of class


function mapStateToProps(state) {

    return { cart: state.cart, PrintSend: state.PrintSend, login: state.login, postvoidtransdetails: state.postvoidtransdetails };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendRecieptActionInvoker: sendEmail,
        startSpinner: startSpinner, productImgSearchAction,
        printReceiptInvoker: printReceipt,
        clearPrintSend: clearPrintSend

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintItemsList);
