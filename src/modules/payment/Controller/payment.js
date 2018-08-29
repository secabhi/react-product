// Dependencies
import React, {Component} from "react";
import {connect} from 'react-redux';

import {updateCustDetails,getCustDetails,clearState,getAurusResponse,UpdateCartStatusAction,printReceipt,addTender,completeTrans, voidTransaction,cardNotSwiped} from './paymentActions';import { store } from '../../../store/store';

// Components
import {PaymentView} from '../View/paymentView';
import { startSpinner } from '../../common/loading/spinnerAction';

//Functions
import { json2xml, base64toHEX } from '../../common/helpers/helpers';
import prepare4MidVoid from '../void/void';
const CONFIG_FILE = require('../../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;


class Payment extends Component {
    constructor(props) {
        super(props);
        // JSON
        this.aurusVars = require("../../../resources/aurus/aurusVars.json");
        this.getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
        this.TransRequestJson = require("../../../resources/aurus/TransRequest.json");
        /*added for testing**/this.customerInfo = require("../../../resources/stubs/customer.json");
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
            cards: [],
            transInfo:[],
            isCards: false,
            cart: [],
            amountDue: 0,
            subtotal: 0,
            total: 0,
            taxAmount: 0,
            payValues: [],
            paidValues: [],
            orderNumber:"323345435890",
            cartID:"201803082365",
            isIsellTrans:true,
            showMore: true,
            currentCard: 0,
            cardErrorMsg: "",
            bypassErrorMsg:"",
            errorModal: false,
            authModal:false,
            giftCardModal:false,
            isPinReq:false,
            signatureModal: false,
            nonSwipeReason: '',
            didNotSwipe:false,
            receiptModal: false,
            emailModal: false,
            emailverifyModal:false,
            printModal: false,
            printGiftModal: false,
            queueprintModal: false,
            purchasesListModal:false,
            error: "", 
            emailFailure: false,
            emailFname:"",
            emailLname:"",
            salutation: this.props.customerDetails.salutation ? this.props.customerDetails.salutation + '.' : '',
            fname: this.props.customerDetails.firstName  ? this.props.customerDetails.firstName : '',
            lname: this.props.customerDetails.lastName ? this.props.customerDetails.lastName : '',
            address1: this.props.customerDetails.selectedAddress.Addr1 ? this.props.customerDetails.selectedAddress.Addr1 : '',
            address2: this.props.customerDetails.selectedAddress.Addr2 ? this.props.customerDetails.selectedAddress.Addr2  : '',
            city: this.props.customerDetails.selectedAddress.City  ? this.props.customerDetails.selectedAddress.City  : '',
            state: this.props.customerDetails.selectedAddress.State ? this.props.customerDetails.selectedAddress.State : '',
            zip: this.props.customerDetails.selectedAddress.Zip ? this.props.customerDetails.selectedAddress.Zip  : '',
            email: this.props.customerDetails.emailAddress ? this.props.customerDetails.emailAddress : '',
            currentLvl: this.props.incircleData ? ((this.props.incircleData.data.lyBenefitLevelCode > this.props.incircleData.data.tyBenefitlevelCode) ? this.props.incircleData.data.lyBenefitLevelCode : this.props.incircleData.data.tyBenefitlevelCode) : 0,
            Update:false,
            PinNUM:"",
            giftCardNumber:""
        };

        // Variables
            this.orderNumber = this.state.orderNumber;
            this.cartID = this.state.cartID;
            this.value=null;
            this.i=null;
            this.source=null;
            this.key_in=null;
            this.timer=null;
            this.tries=0;
            this.ticketNum=0;
            this.voidFlow=false;
            this.bypassReason='';
            this.error=false;
            this.returned=false;
            this.bypassFlag=false;
    }

    componentWillMount() {
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        //this.bypass()
        if (store.getState().cart.data) {
            console.log(store.getState().cart)
            this.setState({
                cart: store.getState().cart.data.cartItems,
                taxAmount: parseFloat(store.getState().cart.data.totalTax).toFixed(2),
                subtotal: parseFloat(store.getState().cart.data.subTotal).toFixed(2),
                total: parseFloat(store.getState().cart.data.total).toFixed(2),
                amountDue: parseFloat(store.getState().cart.data.total).toFixed(2),
            });
        } 
    }

    componentDidMount() {
        //this.activateScanner(); 
        if(this.state.total==0&&this.props.cart.data.transactionId&&store.getState().cart.data){
            this.completeTransaction();
        } else if (this.props.cards.UseInTransAccount && this.props.cards.UseInTransAccount.kiNum !== "") {
            console.log("Account lookup payment call");
        } else {
            this.cardLookup();
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("nextprops")
        console.log(JSON.stringify(nextProps.Payment))
    
        
        if(this.returned){   
            if (nextProps.Payment.getCardBinRes != this.props.Payment.getCardBinRes&&nextProps.Payment.getCardBinRes !== null) {
                this.getCardBinResReturned(nextProps.Payment.getCardBinRes)
            }
            if(nextProps.Payment.notSwipedRes!=this.props.Payment.notSwipedRes){
                console.log("Not Swiped Reason API Response: ",nextProps.Payment.notSwipedRes)
            }
            if (nextProps.Payment.scannerRes != this.props.Payment.scannerRes) {
                this.scannerResReturned(nextProps.Payment.scannerRes)
            }
            if (nextProps.Payment.cancelSwipeRes != this.props.Payment.cancelSwipeRes) {
                this.cancelSwipeResReturned(nextProps.Payment.cancelSwipeRes)
            }
            if (nextProps.Payment.transactionRes != this.props.Payment.transactionRes) {
                this.transResReturned(nextProps.Payment.transactionRes)
            }
            if (nextProps.Payment.signatureRes != this.props.Payment.signatureRes) {
                this.sigResReturned(nextProps.Payment.signatureRes)
            }
            if (nextProps.Payment.bypassRes != this.props.Payment.bypassRes) {
                this.bypassResReturned(nextProps.Payment.bypassRes)
            }
            if (nextProps.Payment.tenderLog != this.props.Payment.tenderLog) {
                this.tenderLogReturned(nextProps.Payment.tenderLog)
            }
            if (nextProps.Payment.data != this.props.Payment.data) {
                this.printReceiptActionReturned(nextProps.Payment.data)
            };
            if (nextProps.Payment.clientData != this.props.Payment.clientData) {
                this.updateCustomerActionReturned(nextProps.Payment.clientData)
            };
            if (nextProps.Payment.transLog != this.props.Payment.transLog) {
                this.transLogReturned(nextProps.Payment.transLog)
            }
            if (nextProps.Payment.closeTransactionRes != this.props.Payment.closeTransactionRes) {
                this.closeTransReturned(nextProps.Payment.closeTransactionRes)
            }
            //if void successful 
            if(nextProps.Payment.midVoidRes!= this.props.Payment.midVoidRes) {
                this.props.voidTransactionInvoker(this.props.login.userpin, this.props.cart.data.transactionId)
            }
            //if void log successful 
            if(nextProps.Payment.voidRes) {
                sessionStorage.setItem("loggedIn", "false");
                this.props.history.push('/');
            }

        }
        { /*if(nextProps.Payment.type=='UPDATE_ISELL_SUCCESS')
            //this.props.startSpinner(false);
            //alert('I sell cart update successfully');
            console.log('Isell cart updated successfully');
            //added for update cart status
           // this.props.startSpinner(false);

            //this.continue();
           // debugger;
        */} 
    }


    /* handler for requiring pin or not */
    handlePINReq = () => {
        if(this.state.isPinReq){
            this.setState({isPinReq:false})
        }else{
            this.setState({isPinReq:true})
        }
    }

    /* handler for showing card not swiped modal */
    handleCardSwiped = () => {
        if(this.state.didNotSwipe){
            this.setState({didNotSwipe:false})
        }else{
            this.setState({didNotSwipe:true})
        }
    }

    handleNotCardSwipedReason = (selectedReason) => {
        this.setState({nonSwipeReason: selectedReason})
        let obj = {
            "Reason" : selectedReason
        }
        this.props.cardNotSwipedInvoker(obj)
    }

//Navigate back to sale page
    navigateBack = () => {
        // this.props.clearItemSelected("");
        this.props.history.push('/sale');
        this.props.clearState()
        this.bypass();
    }

    //Aurus Scanner Request
    activateScanner=()=> {
        this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
        this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
        this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 30;
        this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
        this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
        this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
        this.setState({returnScannerRes:true});
        var req = json2xml(this.UpdateRequestScanJson);
        this.returned=true;
        this.props.aurusActionInvoker(req,'SCANNER');
        
    }

    scannerResReturned=(data)=>{
        this.returned=false;
        clearTimeout(this.timer);
        this.setState({returnScannerRes:false});
        if(data.UpgradeResponse.ResponseCode[0]=="00000"){
        } else {
            this.setState({ errorModal: true, cardErrorMsg: data.UpgradeResponse.ResponseText })        }
    }

//Aurus GetCardBIN Request
    cardLookup = (entrySource, manuallyEnteredCardNum) =>{
        this.error=false;
        console.log("cardlookup "+entrySource)
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        if (this.bypassFlag) {
            this.getCardBinJson.GetCardBINRequest.LookUpFlag = 2;
        }
        else {
            this.getCardBinJson.GetCardBINRequest.LookUpFlag = this.aurusVars.LookUpFlag;

        }
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.NotAllowedKeyedEntry;

        if (entrySource == 1) {
            console.log(manuallyEnteredCardNum)
            this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.AllowKeyedEntry;
            if (manuallyEnteredCardNum) {
                if (manuallyEnteredCardNum.length > 16 && manuallyEnteredCardNum.length < 18) {
                    this.bypassFlag=true;
                    //this.getCardBinJson.GetCardBINRequest.EntrySource = entrySource;
                    this.getCardBinJson.GetCardBINRequest.CardNumber = manuallyEnteredCardNum;
                    this.getCardBinJson.GetCardBINRequest.LookUpFlag = 2;
                    this.error = true;
                    this.cancelSwipe()
                } else {
                    this.setState({ error: "A 17-digit gift card number is required" })
                    this.error = true;
                }
            } else {
                //this.getCardBinJson.GetCardBINRequest.EntrySource = entrySource;
            }
        }
        if (!this.error) {
            var req = json2xml(this.getCardBinJson);
            this.returned=true;
            this.props.aurusActionInvoker(req, 'GETCARDBIN');
            this.bypassFlag=false;
            this.timer = setTimeout(function () { }, 240000);
        }
    };

    getCardBinResReturned=(data)=>{
        console.log("getcardbin returned")
        this.returned=false;
        clearTimeout(this.timer);
        if (data.GetCardBINResponse.ResponseCode[0] == "00000") {
            var newArray = this.state.cards.slice();
            newArray.push(data.GetCardBINResponse);
            this.setState({
                cards: newArray,
                isCards: true, 
                giftCardModal: false
            });
            /* this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 31;
            var req = json2xml(this.UpdateRequestScanJson);
            this.props.aurusActionInvoker(req, 'SCANNER'); */
            if(this.key_in==true && this.source=='KEYPAD' && data.GetCardBINResponse.CardEntryMode[0] == 'K'){
                this.key_in=null;
                this.handleCardSwiped();
            }
        } else if (data.GetCardBINResponse.ResponseText[0].startsWith("Transaction Cancelled")) {
            if(this.key_in==true){
                this.key_in=null;
                this.cancelSwipe()
            } else {
                this.cardLookup();
            }  
        } else if (data.GetCardBINResponse.ResponseCode[0] == "40099"){
            this.setState({ errorModal: true, cardErrorMsg: data.GetCardBINResponse.ResponseText[0] });
        }  else if (data.GetCardBINResponse.ResponseCode[0].startsWith("4")) {
            this.bypass('GETCARDBIN', data.GetCardBINResponse.ResponseText[0])
        }   else {
            console.log(data.GetCardBINResponse.ResponseCode[0]);
            this.bypass('GETCARDBIN', data.GetCardBINResponse.ResponseText[0])
        }
        this.source='';
    }

    cancelSwipe=()=>{
        this.returned=true;
        this.props.aurusActionInvoker(json2xml(this.bypassJson),'CANCELSWIPE');
        this.timer = setTimeout(function(){ }, 35000);
    }

    cancelSwipeResReturned=(data)=>{
        this.returned=false;
        clearTimeout(this.timer);
        if(data.ByPassScreenResponse.ResponseCode=="00000"){
            this.error = false;
            this.cardLookup(1)
        }
    }
  
    //Paying Amount
     handleChange=(index, event)=> {
        event.preventDefault()
        let newArray = [...this.state.payValues];
        this.value = event.target.value;
        newArray[index] = parseFloat(this.value).toFixed(2);
        this.setState({ payValues: newArray });

    }
    
    //Aurus Transaction Request
    getAmountDue=(i,e )=>{
        console.log("sending transreq")
        e.preventDefault()
        this.i=i
        this.setState({authModal:false})
        if(e.currentTarget.tagName != 'BUTTON') {
            if (e.currentTarget.input.value <= this.state.amountDue) {
                let copyArray = [...this.state.payValues];
                this.value = e.currentTarget.input.value;
                copyArray[i] = parseFloat(this.value).toFixed(2);
                this.setState({ payValues: copyArray })
            }
        }
        var amount=parseFloat(this.state.amountDue)==NaN?0:parseFloat(this.state.amountDue)
        var condition=this.value <= amount
        if (condition) {
            this.setInactive();
            this.props.startSpinner(true);
            //this.updateCartStatus();
            //this.props.UpdateCartStatusInvoker(this.orderNumber,this.carID);
            this.TransRequestJson.TransRequest.POSID = this.state.cards[i].POSID;
            this.TransRequestJson.TransRequest.APPID = this.state.cards[i].APPID;
            this.TransRequestJson.TransRequest.CCTID = this.state.cards[i].CCTID;
            this.TransRequestJson.TransRequest.KI = this.state.cards[i].KI;
            this.TransRequestJson.TransRequest.KIType = this.state.cards[i].KIType;
            this.TransRequestJson.TransRequest.CardType = this.state.cards[i].CardType;
            this.TransRequestJson.TransRequest.CardToken = this.state.cards[i].CardToken;
            this.TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = this.state.total + "~" + parseFloat(this.value).toFixed(2);
            this.TransRequestJson.TransRequest.CustomerFirstName = this.state.cards[i].FirstName;
            this.TransRequestJson.TransRequest.CustomerLastName = this.state.cards[i].LastName;
/*             this.TransRequestJson.TransRequest.TicketProductData.TicketCount=this.state.cart.length;
            this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.TicketNumber=this.state.cart
            this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.ProductCount=this.state.cart.length;
            this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.Products.Product=this.state.cart */

            if (this.state.transInfo.length != 0) {
                if (this.state.transInfo[this.state.currentCard].ResponseCode[0] == "20001") {
                    this.TransRequestJson.TransRequest.ApprovalCode = this.state.authCode;
                    this.TransRequestJson.TransRequest.TransactionType = 40;
                }
            }
            if (this.state.cards[i].CardType == "GCC") {
                this.TransRequestJson.TransRequest.TransactionType = "42";
            }

            if (this.aurusVars.SignatureFlag == "Y") {
                this.TransRequestJson.TransRequest.SignatureFlag = "Y"
            }

            var xml = json2xml(this.TransRequestJson)
            this.returned=true;
            this.props.aurusActionInvoker(xml, 'TRANSACTIONREQUEST')

            this.timer = setTimeout(function(){  }, 240000);
        }

        console.log("skipped if statement")
    }

    transResReturned=(data)=>{
        console.log("recieved transresponse")
        this.props.startSpinner(false);
        this.returned=false;
        clearTimeout(this.timer);
        var newArray = this.state.transInfo.slice();
        var transResponse = data.TransResponse.TransDetailsData[0].TransDetailData[0];
        this.ticketNum = data.TransResponse.AurusPayTicketNum[0];

        newArray.push(transResponse)
        this.setState({ transInfo: newArray, currentCard: this.i })
        if (transResponse.ResponseCode[0] == "00000") {
            const paidValuesCopy = [...this.state.paidValues];
            paidValuesCopy[this.i] = transResponse.TransactionAmount[0];
            this.setState({ paidValues: paidValuesCopy, amountDue: parseFloat(this.state.amountDue - this.value).toFixed(2), receiptModal: false, emailModal: false, printModal: false, emailverifyModal: false  })
            this.openSignatureModal(transResponse)
        } else if (transResponse.ResponseCode[0] == "20001") {
            this.setState({ authModal: true });
        } else if (transResponse.ResponseCode[0].startsWith("2") || transResponse.ResponseCode[0].startsWith("1")) {
            console.log(transResponse.TransactionResponseText);
            this.bypass('TRANS', transResponse.TransactionResponseText[0])
            
        } else if(transResponse.TransactionResponseText[0].startsWith("Transaction Cancelled")){
            this.bypass('TRANS', "Transaction Cancelled")
        }else if(transResponse.ResponseCode[0].startsWith("4")) {
            //openerrormodal and suspend
            this.bypass('TRANS', transResponse.TransactionResponseText[0])
        }
    }

    //Aurus Bypass Request
    bypass=(source, msg)=>{
        console.log("sending bypass")
        this.source=source;
        this.setState({bypassErrorMsg:msg})
        this.returned=true;
        this.props.aurusActionInvoker(json2xml(this.bypassJson),'BYPASS');

        this.timer = setTimeout(function(){ }, 35000);
    }

    bypassResReturned = (data) => {
        console.log("bypass returned", data);
        this.returned=false;
        clearTimeout(this.timer);
        if (data.ByPassScreenResponse.ResponseCode == "00000") {
            switch (this.source) {
                case 'KEYPAD':
                    {
                        //If someone presses key-in button after card was added but before clicking accept amount
                        if (this.state.cards.length > 0) {
                            //remove card
                            console.log(this.state.paidValues[this.state.paidValues.length-1])
                            if (this.state.paidValues[this.state.paidValues.length-1]==undefined && this.state.cards[this.state.cards.length - 1].ResponseCode) {
                                var copyArray = [...this.state.cards];
                                copyArray.splice(this.state.cards.length - 1, 1);
                                this.setState({ cards: copyArray });
                                this.cardLookup();
                            }
                        } else {
                            this.key_in = true;
                            this.cardLookup(1)
                        }
                        console.log("bypass keypad")
                        break;
                    }
                case 'GETCARDBIN':
                    {
                        console.log("bypass getcardbin")
                        this.setState({ errorModal: true, cardErrorMsg: this.state.bypassErrorMsg });
                        break;
                    }
                case 'TRANS':
                    {
                        //remove card
                        console.log("bypass trans")
                        var copyArray = [...this.state.cards];
                        copyArray.splice(this.i, 1);
                        var copyTransInfoArray = [...this.state.transInfo];
                        copyTransInfoArray.splice(this.i, 1)
                        this.setState({ errorModal: true, cards: copyArray, transInfo: copyTransInfoArray, cardErrorMsg: this.state.bypassErrorMsg });
                        break;
                    }
                case 'MIDVOID':
                {
                    console.log("bypass MIDVOID")

                    this.voidFlow=true;
                    this.closeTrans();
                    break;
                }
                case 'GIFTCARD':{
                    console.log("bypass giftcard")  
                    this.setState({giftCardModal:true})
                    this.cardLookup()
                    break;
                }

                default:
                    {
                        console.log("inside default switch bypass")
                        if(this.state.cardErrorMsg.startsWith("4")){
                            this.setState({errorModal:true})
                        }
                        //this.props.clearState();
                        break;
                    }
            }
        }
    }

    closeErrorModal=()=>{
        this.setState({errorModal:false})
        if(this.state.cardErrorMsg.startsWith("Unable To Connect")||this.state.cardErrorMsg.startsWith("PED IS ")){
            this.exit();
        } else if(this.state.errorSource=="tenderLog"){
            this.addToTender();
        } else if(this.state.errorSource=="transLog"){
            this.completeTransaction();
        } else if(this.state.errorSource=="Failed") {
            this.cardLookup();
        } else {
            this.cardLookup();
        }
        
    }

    //Payment card row CSS
    setInactive=()=>{
        var formElements=document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>form")
        var labelElements = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>span.amountLabel")
        var inputElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>form>.inputAmount input")
        for(var x=0; x<formElements.length; x++){
            formElements[x].className="amountInputForm hide"
            labelElements[x].className="amountLabel";
            inputElement[x].blur();
        }
    }

    //Call for Auth
    handleAuthorizationCodeInput = (event) => {
        this.setState({ authCode: event.target.value})
    }

    closeCardAuthorizationModal=()=>{
        this.setState({authModal:false})
    }

    //Signature
    openSignatureModal=(transResponse)=>{
        this.props.startSpinner(false);
        if (transResponse.SignatureReceiptFlag) {
            this.setState({ signatureModal: true })
        }
    }

    //Submit signature Aurus
    submitSignature = (sig) => {
        console.log("sending signature req")
        this.props.startSpinner(true);
        //this.updateCartStatus();
        if (sig == "") {
            this.props.startSpinner(false);
            this.setState({ signatureModal: false });
            this.addToTender();
        } else {
            var hexSig = (base64toHEX(sig.toDataURL('image/jpeg', .1).slice(23)));
            console.log(hexSig)
            this.signatureJson.SignatureRequest.SignatureData = hexSig;
            this.signatureJson.SignatureRequest.TransactionIdentifier = this.props.Payment.transactionRes.TransResponse.TransDetailsData[0].TransDetailData[0].TransactionIdentifier;
            var sigXml = json2xml(this.signatureJson);
            this.returned=true;
            this.props.aurusActionInvoker(sigXml, 'SIGNATURE');

            this.timer = setTimeout(function(){  }, 35000);
        }
    }

    sigResReturned = (data) => {
        console.log("signature req returned")
        this.returned=false;
        clearTimeout(this.timer);
        if (data.SignatureResponse.ResponseCode[0] == "00000") {
            this.props.startSpinner(false);
            this.setState({ signatureModal: false});
            this.addToTender();
        } else {
            this.props.startSpinner(false);
            this.bypass()
            this.setState({ signatureModal: true});
        }
    }

    //AddTenderAPI Call
    addToTender = () => {
        console.log("sending addtoTender")
        var tenderDetails=this.state.transInfo[this.currentCard]
        const transactionObj = {
            ...clientConfig,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId,
            "CardTender": {
                "TenderType": tenderDetails.TransactionTypeCode[0],
                "TranslatorTenderType": 7,
                "TenderAmount": tenderDetails.TransactionAmount[0],
                "TenderLocale": 1,
                "ForeignAmount": 0,
                "ForeignLocale": 0,
                "ExchangeRate": tenderDetails.DCCDetails[0].DCCExchangeRate[0],
                "TenderQty": 0,
                "TenderFlags": 8020,
                "AuthFlags": "0",
                "ManagerID": "0",
                "NonSwipeReason": 0,
                "MerchantID": tenderDetails.ECOMMInfo[0].MerchantIdentifier[0],
                "TerminalID": tenderDetails.ECOMMInfo[0].TerminalId[0],
                "StatusCode": "01",
                "Auth": "",
                "Data_Type": 3,
                "ChargeInfo": {
                    "Account": "000000000000000000000000000000",
                    "Hash_Acct": "$FF74A1$A602AD97682B9F6E0885D915582FAEFD98804EAE1D7FC2AD92BB656FA186C724",
                    "Hash_Type": '0',
                    "Enc_Acct": "da854488be433882b1071f1f02ab51aca1ae3efa05959a08b7006cc655fbd4404f1039120e776d3287308c2d656f788a6cfa7faf7fe41896dd3474975fde2cee",
                    "Enc_Type": '0',
                    "Last_Four": "7894",
                    "KI": tenderDetails.KI[0],
                    "Name": tenderDetails.CardType[0],
                    "Expdate": tenderDetails.CardExpiryDate[0],
                    "Effdate": "00000000",
                    "Issue_no": tenderDetails.IssuerNumber[0],
                    "Plan_Code": "",
                    "Charge_Trans_Ident": "",
                    "Charge_Validation_Code": "",
                    "Payment_Svce_Indicator": '0',
                    "Payment_Svce_Swipecode": "90",
                    "Auth_Reason_Code": "",
                    "Promo_Terms_Code": "",
                    "POS_Data_Code": "",
                    "EGC_Account_Type": '',
                    "GC_Promo_Code": "",
                    "Credit_Plan": "00000",
                    "Flags": '',
                    "Usage_Type": '',
                    "Misc_Flags": '0',
                    "Discretionary_Data_Length": '0',
                    "Discretionary_Data": "",
                    "Partial_Approval": tenderDetails.PartialApprovedFlag[0],
                    "Authorization_Service": '',
                    "Aurus_Cust_ID": tenderDetails.CustomerTokenNumber[0],
                    "Aurus_Whizticketnum": this.ticketNum,
                    "Aurus_Cardtoken": tenderDetails.CardToken[0],
                    "KI_Type": tenderDetails.KIType[0],
                    "Customer_Present": tenderDetails.PurchaserPresent[0],
                    "Card_Present": tenderDetails.CardPresent[0],
                    "Debit_Flag": '',
                    "Aurus_CardEntryMode": tenderDetails.CardEntryMode[0],
                    "Aurus_Cardtype": tenderDetails.CardType[0],
                    "Aurus_Transaction_Identifier": tenderDetails.TransactionIdentifier[0],
                },
                "aurus_Transaction_Identifier": tenderDetails.TransactionIdentifier[0],
                "aurus_whizticketnum": this.ticketNum
            }
        }
        this.returned=true;
        this.props.addTenderInvoker(transactionObj);
    }

    //check if amountdue is 0
    tenderLogReturned = (data) => {
        this.returned=false;
        console.log("addtoTender returned")
        if (data.response_code==0) {
            if (this.state.amountDue === "0.00" || this.state.amountDue === "0" || this.state.amountDue === 0) { //need to show receipt/email only if entire amount is paid
                this.completeTransaction()
            } else {
                this.setState({ signatureModal: false })
                this.cardLookup();
            }
            this.tries=0;
        } else {
            if (this.tries < 4) {
                this.setState({ errorModal: true, cardErrorMsg: "Failed to log Tender. Try again?", errorSource: "tenderLog" });
                this.tries += 1;
            } else {
                this.setState({ errorModal: true, cardErrorMsg: "Unable to log Transaction. Proceed to void", errorSource: "Failed" });
            }
        }
    }

    //CompleteTransactionAPI Call
    completeTransaction = () => {
        console.log("sending translog api")

        const transactionObj = {
            ...clientConfig,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId
        }
        this.returned=true;
        this.props.completeTransactionInvoker(transactionObj);
    }

    transLogReturned = (data) => {
        console.log("translog returned")
        this.returned=false;
        if(data.response_code==29){
            if(this.state.cards.length==0){
                this.setState({ receiptModal: true })
            } else {
                
                this.closeTrans()
            }
            this.tries=0;
        } else {
            if (this.tries < 4) {
                this.setState({ errorModal: true, cardErrorMsg: "Failed to log Transaction. Try again?", errorSource: "transLog" });
                this.tries += 1;
            } else {
                this.setState({ errorModal: true, cardErrorMsg: "Unable to log Transaction. Proceed to void", errorSource: "Failed" });
            }
        }
    }

    //Aurus Close Transaction
    closeTrans = () => {

        var closeTransXml = json2xml(this.closeTransJson);
        this.returned=true;
        this.props.aurusActionInvoker(closeTransXml, 'CLOSETRANSACTION');
        this.timer = setTimeout(function () { }, 35000);
    }

    closeTransReturned=(data)=>{
        this.returned=false;
        clearTimeout(this.timer);
        if(data.CloseTransactionResponse.ResponseCode=="00000"){

            if(this.voidFlow){
                this.midVoidRequest();

            } else {
                this.setState({ receiptModal: true })
            }
        }
    }

    //Print Gift Receipt
    printGiftReceipt=()=>{

    }

    closePrintGiftReceiptModal=()=>{
        this.setState({printGiftModal:false})
    }

    //Print Reciept
    printReceipt = (val) => {
        var params = {
     
            ...clientConfig,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId,
            "registerNum": val
        }
        if(val==null || val==""){

        }else {
            this.props.startSpinner(true);
            this.returned=true;
            this.props.printReceiptInvoker(params);
        }
    }

    printReceiptActionReturned=(data)=>{
        this.returned=false;
        this.props.startSpinner(false);
        if(data.responseCode==0){
            this.exit();  
          } else {
              console.log(data.responseText)
          }
    }

    openprintModal = () => {
        this.setState({printModal: true, receiptModal: false, emailModal: false, queueprintModal:false})
    }
    closePrintModal = () => {
        this.setState({printModal: false, receiptModal: false, emailModal: false})
        this.exit();
    }

    //Email Receipt
    handleLnameInput = (event) => {
        this.setState({
            emailLname: event.target.value
        })
    }

    handleFnameInput = (event) => {
        this.setState({
            emailFname: event.target.value
        })
    }

    handleEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }  
    
    openemailverifyModal=()=>{
        if ( this.state.email != '' &&  this.state.email != undefined &&  this.state.email != null) {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            var re = /^(([^<>!*&%$^#()\[\]\\._,;:\s@"]+([\._][^<>()\[\]\\._,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;       
            if (!re.test(String(this.state.email).toLowerCase())||!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                 this.setState({error: "Email is not valid"})
            } else {
                this.setState({
                    emailverifyModal: true,
                    emailModal: false,
                    emailFailure: false
                })
            }
        }
    }

    closeEmailverifyModal=()=>{
        this.setState({
            emailverifyModal:false, 
            emailModal: true, 
            emailFailure: false
        })
    }

    emailSend = () => {
        var params = {
            "ReqHeader": {
                ...clientConfig,
                "AssociateNumber": this.props.login.userpin,
                "TransactionNum": this.props.cart.data.transactionId            
            },
            "FirstName": this.state.emailFname,
            "LastName": this.state.emailLname,
            "EmailAddress": this.state.email,
            "ClientSmartId": "0001000284641"
        };
        if(this.state.email=="" || this.state.email==null){

        } else {
            this.props.startSpinner(true);
            this.setState({ emailFailure: false})
            this.returned=true;
            this.props.updateCustDetailsInvoker(params);
        }
    }

    updateCustomerActionReturned=(data)=>{
        this.returned=false;
        this.props.startSpinner(false);
        this.setState({emailFailure:false})
        if (data.ResponseCode=="0") {
            if (this.state.queueprintModal) {
                this.openprintModal();
            } else {
                this.exit()
            }
        } else {
            console.log(data.ResponseString)
            this.setState({
                emailverifyModal:true,
                emailFailure: true,
            })
        } 
    }

    closeError=()=>{
        this.setState({emailFailure:false})
    }
   
    openemailModal = () => {
        this.setState({ emailModal: true, receiptModal: false, signatureModal: false })
    }

    closeEmailModal = () => {
        this.setState({ emailModal: false })
        if (this.state.queueprintModal) {
            this.openprintModal();
        } else {
            this.setState({ receiptModal: true })
        }
    }

    //iSell
    updateCartStatus=(/*e*/)=>{
       // e.preventDefault();
        
        /*this.setState({orderNumber:"323345435890"});
        this.setState({cartID:"201803082365"});*/
        var cartID = this.cartID;
        console.log("cart id in payment.js"+cartID);
        console.log("order id and cartid"+this.orderNumber+' '+this.cartID)
        if(this.state.isIsellTrans){
        this.props.UpdateCartStatusInvoker({orderNumber : this.orderNumber,cartID:this.cartID});
    }else{
        console.log('this is iSell cart Transaction');
        //this.props.startSpinner(true);
    }
    }

    emailPrintReceipt = () => {
        this.setState({ emailModal: true, queueprintModal: true, receiptModal: false, printModal: false })
    }

    /*showPurchasesModal = () => {
        this.setState({purchasesListModal: true});
    }
    closepurchaseModal = () => {
        this.setState({purchasesListModal: false})
    } */

    //Footer
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

    keyPad = () => {
        this.bypass('KEYPAD')
    }

    //advanceDeposit = () => {}

    //Gift Card
    handleGiftCardModal = () => {
        if(this.state.giftCardModal == true){
            this.setState({giftCardModal:false})
        }else{
            this.bypass('GIFTCARD')
        }
    }
    handleGiftCardNumInput = (e) =>{
        this.setState({giftCardNumber:e.target.value, error: ""})
    }

    handlePinNUMInput = (e) =>{
        this.setState({PinNUM:e.target.value, error: ""});
    }

    //Exit back to landing page
    exit = () => {
        this.props.startSpinner(false);
        this.bypass();
        sessionStorage.setItem("loggedIn", "false");
        this.props.history.push('/');
    }

    onMidVoid = () => {
        this.bypass('MIDVOID');
        //if we took a payment
    }
    
    midVoidRequest=()=>{
        console.log("in midvoidRequest function")
        if(this.state.transInfo[0]) {
            console.log("in midvoidRequest if function")

            //prepare4MidVoid takes in voidType, any payment data response, plus firstName & lastName of Customer
            const midVoidXML = json2xml(prepare4MidVoid('MID_VOID',this.state.total-this.state.amountDue,  this.ticketNum))
            this.props.aurusActionInvoker(midVoidXML, 'MID_VOID');

        }  
    }

    render() {
        console.log('cards in payment'+JSON.stringify(this.props.cards));
        return (<PaymentView
            useStoredCard = {this.props.cards.useStoredCard}
            path = {this.props.cards.path}
            updateCartStatus = {this.updateCartStatus}
            useStoredCard = {this.props.cards.useStoredCard}
            otherCards = {this.props.cards.UseInTransAccount}
            history={this.props.history}
            /*added for testing**/customerInfo={this.customerInfo}
            getAmountDue={this.getAmountDue}
            cards={this.state.cards}
            transInfo={this.state.transInfo}
            isCards={this.state.isCards}
            cart={this.state.cart}
            cardLookup={this.cardLookup}
            amountDue={this.state.amountDue}
            subtotal={this.state.subtotal}
            total={this.state.total}
            taxAmount={this.state.taxAmount}
            payValues={this.state.payValues}
            paidValues={this.state.paidValues}
            showMore={this.state.showMore}
            currentCard={this.state.currentCard}
            cardErrorMsg={this.state.cardErrorMsg}
            errorModal={this.state.errorModal}
            closeErrorModal={this.closeErrorModal}
            authModal={this.state.authModal}
            signatureModal={this.state.signatureModal}
            receiptModal={this.state.receiptModal}
            emailModal={this.state.emailModal}
            emailverifyModal={this.state.emailverifyModal}
            printModal={this.state.printModal}
            printGiftModal={this.state.printGiftModal}
            closePrintGiftReceiptModal={this.closePrintGiftReceiptModal}
            queueprintModal={this.state.queueprintModal}
            //purchasesListModal={this.state.purchasesListModal}
            fname={this.state.fname}
            lname={this.state.lname}
            emailFname={this.state.emailFname}
            emailLname={this.state.emailLname}
            email={this.state.email}
            currentLvl={this.state.currentLvl}
            error={this.state.error}
            emailFailure={this.state.emailFailure}
            giftCardNumber={this.state.giftCardNumber}
            PinNUM={this.state.PinNUM}
            navigateBack={this.navigateBack}
            keyPad={this.keyPad}
            advanceDeposit={this.advanceDeposit}
            giftCardModal={this.state.giftCardModal}
            handleGiftCardModal={this.handleGiftCardModal}
            getAmountDue={this.getAmountDue}
            printGiftReceipt={this.printGiftReceipt}
            printReceipt={this.printReceipt}
            emailSend={this.emailSend}
            submitSignature={this.submitSignature}
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
            handleAuthorizationCodeInput={this.handleAuthorizationCodeInput}
            closeCardAuthorizationModal={this.closeCardAuthorizationModal}
            handleEmailInput={this.handleEmailInput}
            handleLnameInput={this.handleLnameInput}
            handleFnameInput={this.handleFnameInput}
            //showPurchasesModal={this.showPurchasesModal}
            //closepurchaseModal={this.closepurchaseModal}
            showMoreToggle={this.showMoreToggle}
            salutation={this.state.salutation}
            address1={this.state.address1}
            address2={this.state.address2}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            isPinReq={this.state.isPinReq}
            didNotSwipe={this.state.didNotSwipe}
            handleCardSwiped={this.handleCardSwiped}
            handleNotCardSwipedReason= {this.handleNotCardSwipedReason}
            startMidVoid={this.onMidVoid}
            handleGiftCardNumInput={this.handleGiftCardNumInput}
            handlePinNUMInput={this.handlePinNUMInput}
            />);
    }
}


function mapStateToProps({Payment, customerDetails, customerSearch, cart,login, Cards}) {
    return { Payment, customerDetails, incircleData: customerSearch.incircleData, cart,login,cards:Cards }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getClientDetailsInvoker: (data) => dispatch(getCustDetails(data)),
        updateCustDetailsInvoker: (data) => dispatch(updateCustDetails(data)), 
        startSpinner: (data)=> dispatch(startSpinner(data)), 
        clearState:()=> dispatch(clearState()),
        aurusActionInvoker : (data, type) => dispatch(getAurusResponse(data, type)),
        UpdateCartStatusInvoker : (data) => dispatch(UpdateCartStatusAction(data)),
		printReceiptInvoker: (data)=>dispatch(printReceipt(data)),
        addTenderInvoker : (data) => dispatch(addTender(data)),
        cardNotSwipedInvoker : (data) => dispatch(cardNotSwiped(data)),
        completeTransactionInvoker : (data) => dispatch(completeTrans(data)),
        voidTransactionInvoker:(data)=>dispatch(voidTransaction(data))    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
