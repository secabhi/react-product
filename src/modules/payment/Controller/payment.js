// Dependencies
import React, {Component} from "react";
import {connect} from 'react-redux';
import {updateCustDetails,getCustDetails,clearState,getAurusResponse} from './paymentActions';
import { store } from '../../../store/store';

// Components
import {PaymentView} from '../View/paymentView';
import { startSpinner } from '../../common/loading/spinnerAction';

//Functions
import { json2xml, base64toHEX } from './converter';


class Payment extends Component {
    constructor(props) {
        super(props);

        // JSON
        this.aurusVars = require("../../../resources/aurus/aurusVars.json");
        this.getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
        this.TransRequestJson = require("../../../resources/aurus/TransRequest.json");
        this.getAccountLookupJson = require("../../../resources/aurus/GetAccountLookupRequest.json");
        this.plccJson = require("../../../resources/aurus/PLCCApplicationRequest.json");
        this.signatureJson = require("../../../resources/aurus/SignatureRequest.json");
        this.ticketJson = require("../../../resources/aurus/TicketProductDataRequest.json");
        this.closeTransJson = require("../../../resources/aurus/CloseTran.json");
        this.cancelTransJson = require("../../../resources/aurus/CancelLastTransRequest.json");
        this.bypassJson = require("../../../resources/aurus/BypassScreen.json");
        this.UpdateRequestScanJson=require("../../../resources/aurus/UpdateRequestScan.json")

        //States
        this.state = {
            cards: [""],
            isCards: true,
            cart: [],
            amountDue: 0,
            subtotal: 0,
            total: 0,
            taxAmount: 0,
            values: [],
            showMore: true,
            partpayment: 0.00,
            currentCard: 0,
            signatureModal: false,
            receiptModal: false,
            emailModal: false,
            emailverifyModal:false,
            printModal: false,
            queueprintModal: false,
            purchasesListModal:false,
            error: "", 
            failure: null,
            isSkip: this.props.otherPageData.isSkip,
            salutation: (this.props.otherPageData.details && this.props.otherPageData.details.salutation) ? (this.props.otherPageData.details.salutation + '.') : '',
            fname: this.props.otherPageData.details ? this.props.otherPageData.details.firstname : '',
            lname: this.props.otherPageData.details ? this.props.otherPageData.details.lastname : '',
            address1: this.props.otherPageData.details ? this.props.otherPageData.details.address1 : '',
            address2: this.props.otherPageData.details ? this.props.otherPageData.details.address2 : '',
            city: (this.props.otherPageData.details && this.props.otherPageData.details.city) ? (this.props.otherPageData.details.city + ',') : '',
            state: this.props.otherPageData.details ? this.props.otherPageData.details.state : '',
            zip: this.props.otherPageData.details ? this.props.otherPageData.details.zip : '',
            email: this.props.otherPageData.details ? this.props.otherPageData.details.email : '',
            currentLvl: this.props.incircleData ? this.props.incircleData.data.lyBenefitLevelCode: '0'
        };

        // Variables
        this.getAmountDue = this
            .getAmountDue
            .bind(this);
    }

    componentWillMount() {
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        //this.calculate();
        console.log(store.getState());
        if(store.getState().cart.data){
        this.setState({
            cart: store.getState().cart.data.CartItems,
            taxAmount: parseFloat(store.getState().cart.data.totalTax).toFixed(2),
            subtotal: parseFloat(store.getState().cart.data.subTotal).toFixed(2),
            total: parseFloat(store.getState().cart.data.total).toFixed(2),
            amountDue: parseFloat(store.getState().cart.data.total).toFixed(2),
        });
        } 
    }

    componentWillReceiveProps(nextProps){
        this.setState({failure:null})
        console.log(JSON.stringify(nextProps))
        if(store.getState().Payment.failure==0){
        this.setState({
            failure: 0
        });
        this.continue();}
        else if (store.getState().Payment.failure == 1) {
            this.setState({
                failure: 1,
                emailverifyModal: true
            });
        } else if (store.getState().Payment.failure == null) {
            this.setState({
                emailverifyModal: false
            })
        }
    }

    componentDidMount() {
        this.cardLookup();
        console.log(base64toHEX("oAAABTUAAg=="));
        //this.activateScanner();
    }

    activateScanner=()=> {
        this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
        this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
        this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = this.aurusVars.UpgradeType;
        this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
        this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
        this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
        var req = json2xml(this.UpdateRequestScanJson);

        this.props.aurusActionInvoker(this.UpdateRequestScanJson);
    }

    cardLookup = () =>{
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = this.aurusVars.LookUpFlag;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.AllowKeyedEntry;
        var req = json2xml(this.getCardBinJson);
        
        //submit to aurus- action
        this.props.aurusActionInvoker(req);
        if (store.getState().Payment.aurusresponse/* .GetCardBINResponse.ResponseCode==="00000" */) {
            var newArray = this.state.cards.slice();  
            newArray.push(store.getState().Payment.aurusresponse.GetCardBINResponse)  
           this.setState({
               cards: newArray,
               isCards: true
           })
        }
        else {
          this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
        
    }

    /*Navigate back*/
    navigateBack = () => {
        this
            .props
            .history
            .push('/sale',{isClienteled:this.props.history.location.state.isClienteled});
    }

    //keyPad = () => {}

    //advanceDeposit = () => {}

    //giftCard = () => {}

    //calculate() {
    //    this
    //        .setState({}, function () {
    //            this.setState({
    //                partpayment: (this.state.total - this.state.partpayment)
    //            })
    //        })
    //}

    getAmountDue(i, e) {
        e.preventDefault();
        if (e.currentTarget.input.value !== "") {
            this.state.values[i] = e.currentTarget.input.value;
            if (this.state.values !== [] && this.state.values[i] !== undefined) {
                //Transaction Request
                this.TransRequestJson.TransRequest.POSID = this.state.cards[this.state.currentCard].POSID;
                this.TransRequestJson.TransRequest.APPID = this.state.cards[this.state.currentCard].APPID;
                this.TransRequestJson.TransRequest.CCTID = this.state.cards[this.state.currentCard].CCTID;
                this.TransRequestJson.TransRequest.KI = this.state.cards[this.state.currentCard].KI;
                this.TransRequestJson.TransRequest.KIType = this.state.cards[this.state.currentCard].KIType;
                this.TransRequestJson.TransRequest.CardType = this.state.cards[this.state.currentCard].CardType;
                this.TransRequestJson.TransRequest.CardToken = this.state.cards[this.state.currentCard].CardToken;
                this.TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = this.state.values[this.state.currentCard];
                this.TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = this.state.total;
                this.TransRequestJson.TransRequest.CustomerFirstName = this.state.cards[this.state.currentCard].FirstName;
                this.TransRequestJson.TransRequest.CustomerLastName = this.state.cards[this.state.currentCard].LastName;

                if (this.aurusVars.SignatureFlag=="Y") {
                    this.TransRequestJson.TransRequest.SignatureFlag = "Y"
                }
                var xml = json2xml(this.TransRequestJson)
                console.log(xml)
                this.props.aurusActionInvoker(xml)
                console.log(store.getState().Payment.aurusresponse)
                if (store.getState().Payment.aurusresponse) {
                    this.setState({ amountDue: store.getState().Payment.aurusresponse.TransResponse.BalanceAmount, receiptModal: false, emailModal: false, printModal: false, emailverifyModal: false })
                    if(store.getState().Payment.aurusresponse.TransResponse.SignatureDataFlag==="1"){
                        this.setState({signatureModal:true})
                    } 
                } else {
                    var xml = json2xml(this.bypassJson)
                    this.props.aurusActionInvoker(xml)
                }
            }
            this.setState({currentCard: i});
        }
    }

    checkAllpaid = () => {
        this.props.startSpinner(false);
        this.props.clearState();
        if (this.state.amountDue === "0.00") {
            if ((!this.state.printModal)) {
                this.setState({signatureModal: true});
            } else {
                this.exit();
            }
        }

    }

    transactionComplete = () => {
        this.exit()
    }

    emailSend = () => {
        this.props.clearState();
        this.params = {
            "ReqHeader": {
                "StoreNum": "001",/* Hardcoded, to be removed */
                "RegisterNum": "218",/* Hardcoded, to be removed */
                "AssociateNumber": "930991",/* Hardcoded, to be removed */
                "TransactionNum": "4"/* Hardcoded, to be removed */
            },
            "FirstName": this.state.fname, //Not mandatory
            "LastName": this.state.lname, // Not mandatory
            "EmailAddress": this.state.email,
            "ClientSmartId": "0001000284641"
        };
        this.updateCustDetails();
        this.props.startSpinner(true);
    }

    continue(){
        if (store.getState().Payment.clientData !== null) {
            if (this.state.queueprintModal) {
                this.props.startSpinner(false);
                this.closeEmailverifyModal();
                this.openprintModal();
            } else if (this.state.printModal) {

            } else {
                this.transactionComplete();
            }
        } else if(this.state.failure==1){
            this.props.startSpinner(false);
            this.setState({
                emailverifyModal:true
            })
        } 
    }

    closeError=()=>{
        this.setState({
            failure: null
        })
    }
    updateCustDetails(){
      this.props.updateCustDetails(this.params);
    }

    getClientDetailsInvoker = () => {

        this
            .props
            .getClientDetailsInvoker(this.params);
    }

    closeSignatureModal = () => {
        this
            .setState({
                signatureModal: false
            }, function () {

                if (this.state.cards.length > 0) {
                    var cardslist = this.state.cards;
                    // console.log(JSON.stringify(cardslist))
                    cardslist.splice(cardslist.length - 1, 1);
                    //console.log(JSON.stringify(cardslist))
                    this.setState({cards: cardslist});

                }

                if (this.state.values.length > 0) {
                    var newValues = this.state.values;
                    var newValuesLength = newValues.length
                    // console.log(this.state.values[this.state.values.length-1])
                    // console.log(JSON.stringify(newValues))
                    this.setState({
                        amountDue: (parseFloat(this.state.amountDue) + parseFloat(this.state.values[newValuesLength - 1])).toFixed(2)
                    }, function () {

                        newValues.splice(newValues.length - 1, 1);
                        this.setState({
                            partpayment: this.state.amountDue,
                            values: newValues,
                            currentCard: this.state.currentCard.length - 2
                        })
                    })

                } else 
                    this.setState({amountDue: this.state.total})

            })

    }
    openreceiptModal=(sig)=> {
        var hexSig = (base64toHEX(sig));
        this.signatureJson.SignatureData = hexSig;
        var sigXml = json2xml(this.signatureJson);
        this.props.aurusActionInvoker(sigXml);
        this.setState({signatureModal: false});
        if(sigXml){
            this.props.aurusActionInvoker(json2xml(this.closeTransJson));
        } else {
            this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
        if (this.state.amountDue === "0.00") { //need to show receipt/email only if entire amount is paid
            this.setState({receiptModal: true})
        }

    }
    emailPrintReceipt = () => {
        this.setState({ emailModal: true, queueprintModal: true, receiptModal: false, printModal: false })
    }
    openemailModal = () => {

        this.setState({ emailModal: true, receiptModal: false, signatureModal: false })
    }
    closeEmailModal = () => {
        this.setState({ emailModal: false })
        if (this.state.queueprintModal) {
            this.openprintModal();
        }  else {
            this.setState({ receiptModal: true })
        } 
    }

    openemailverifyModal=()=>{
        if ( this.state.email !== '' &&  this.state.email !== undefined &&  this.state.email !== null) {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;       
            if (!re.test(String(this.state.email).toLowerCase())||!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                 this.setState({error: "Email is not valid"})
            } else {
                 this.setState({
            emailverifyModal: true,
            emailModal: false
        })
            }
        }
       
    }

    closeEmailverifyModal=()=>{
        this.setState({
            emailverifyModal:false, 
            emailModal: true,
            failure: null
        })
    }
    openprintModal = () => {
        this.setState({printModal: true, receiptModal: false, emailModal: false, queueprintModal:false})
    }
    closePrintModal = () => {
        this.setState({printModal: false, receiptModal: false, emailModal: false})
        this.exit();
    }
    exit = () => {
        this.props.startSpinner(false);
        this
            .props
            .history
            .push('/')
    }
    handleChange(index, event) {
        let values = [...this.state.values];
        let value = event.target.value;
        values[index] = parseFloat(value).toFixed(2);
        //console.log(values)
        this.setState({ values: values });

    }
    handleLnameInput=(event)=>{
        this.setState({
            lname: event.target.value
        })
    }
    handleFnameInput=(event)=>{
        this.setState({
            fname: event.target.value
        })
    }
    handleEmailInput=(event)=>{
        this.setState({
            email: event.target.value
        })
    }

    showPurchasesModal = () => {
        this.setState({purchasesListModal: true});
    }

    closepurchaseModal = () => {
        this.setState({purchasesListModal: false})
    }

    showMoreToggle = () => {
        this
            .setState({
                showMore: !this.state.showMore
            }, function () {
                if (!this.state.showMore) {
                    document.getElementsByClassName("payment-mainSection")[0].style.height = "510.2px";
                    document.getElementsByClassName("payment-MoreSection")[0].style.height = "520px";
                } else {
                    document.getElementsByClassName("payment-mainSection")[0].style.height = null;
                    document.getElementsByClassName("payment-MoreSection")[0].style.height = null;
                }
            })

    }

    handleChangeAmount = (e, index) => {

        if ((e.target.value).substr(2).length > 0) 
            this.setState({
                partpayment: (e.target.value).substr(2)
            }, function () {
                this.handleInputedAmount(index, this.state.partpayment);
            })
        else 
            this
                .setState({
                    partpayment: 0.00
                }, function () {
                    this.handleInputedAmount(0, this.state.partpayment);
                })

        
    }

    handleInputedAmount = (index, payedAmount) => {

        let values = [...this.state.values];
        let value = payedAmount;
        values[index] = parseFloat(value).toFixed(2);
        //console.log(values)
        this.setState({values: values});
    }

    calculateDueAmount = (i) => {
        var cardsList = this.state.cards;
        if (this.state.values !== [] && this.state.values[i] !== undefined) 
            this.setAmountDue(i);
        else {

            let values = [...this.state.values];
            let value = this.state.partpayment;
            values[i] = parseFloat(value).toFixed(2);
            this.setState({
                values: values
            }, function () {
                this.setAmountDue(i)
            });

        }

        this.setState({cards: cardsList, isCards: false})

    }
    setAmountDue = (i) => {
        this
            .setState({
                amountDue: (this.state.total - this.state.values.filter(Boolean).reduce(function (nums, val) {
                    return Number(nums) + Number(val)

                })).toFixed(2),
                currentCard: i
            }, function () {
                this
                    .setState({
                        partpayment: this.state.amountDue,
                        signatureModal: true
                    }, function () {
                        this.checkAllpaid();
                    })

            })
    }
    render() {

        return (<PaymentView
            history={this.props.history}
            getAmountDue={this.getAmountDue}
            cards={this.state.cards}
            isCards={this.state.isCards}
            cart={this.state.cart}
            amountDue={this.state.amountDue}
            subtotal={this.state.subtotal}
            total={this.state.total}
            taxAmount={this.state.taxAmount}
            values={this.state.values}
            showMore={this.state.showMore}
            partpayment={this.state.partpayment}
            currentCard={this.state.currentCard}
            signatureModal={this.state.signatureModal}
            receiptModal={this.state.receiptModal}
            emailModal={this.state.emailModal}
            emailverifyModal={this.state.emailverifyModal}
            printModal={this.state.printModal}
            queueprintModal={this.state.queueprintModal}
            purchasesListModal={this.state.purchasesListModal}
            fname={this.state.fname}
            lname={this.state.lname}
            email={this.state.email}
            error={this.state.error}
            failure={this.state.failure}
            params={this.params}
            navigateBack={this.navigateBack}
            keyPad={this.keyPad}
            advanceDeposit={this.advanceDeposit}
            giftCard={this.giftCard}
            calculate={this.calculate}
            getAmountDue={this.getAmountDue}
            checkAllpaid={this.checkAllpaid}
            transactionComplete={this.transactionComplete}
            emailSend={this.emailSend}
            getClientDetailsInvoker={this.getClientDetailsInvoker}
            closeSignatureModal={this.closeSignatureModal}
            openreceiptModal={this.openreceiptModal}
            emailPrintReceipt={this.emailPrintReceipt}
            openemailModal={this.openemailModal}
            closeEmailModal={this.closeEmailModal}
            openemailverifyModal={this.openemailverifyModal}
            closeEmailverifyModal={this.closeEmailverifyModal}
            closeError={this.closeError}
            openprintModal={this.openprintModal}
            closePrintModal={this.closePrintModal}
            exit={this.exit}
            handleChange={this.handleChange}
            handleEmailInput={this.handleEmailInput}
            handleLnameInput={this.handleLnameInput}
            handleFnameInput={this.handleFnameInput}
            showPurchasesModal={this.showPurchasesModal}
            closepurchaseModal={this.closepurchaseModal}
            showMoreToggle={this.showMoreToggle}
            handleChangeAmount={this.handleChangeAmount}
            handleInputedAmount={this.handleInputedAmount}
            calculateDueAmount={this.calculateDueAmount}
            setAmountDue={this.setAmountDue}
            salutation={this.state.salutation}
            skipCustomerInfo={this.state.isSkip}
            address1={this.state.address1}
            address2={this.state.address2}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            cardLookup = {this.cardLookup}
            />);
    }
}


function mapStateToProps({Payment, sale, customerSearch}) {
    return { Payment, otherPageData: sale.otherPageData, incircleData: customerSearch.incircleData }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getClientDetailsInvoker: (data) => dispatch(getCustDetails(data)),
        updateCustDetails: (data) => dispatch(updateCustDetails(data)), 
        startSpinner: (data)=> dispatch(startSpinner(data)), 
        clearState:()=> dispatch(clearState()),
        aurusActionInvoker : (data) => dispatch(getAurusResponse(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
