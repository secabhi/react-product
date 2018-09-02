// Dependencies
import React, {Component} from "react";
import {connect} from 'react-redux';

import {updateCustDetails,getCustDetails,clearState,getAurusResponse,UpdateCartStatusAction,printReceipt,addTender,completeTrans, voidTransaction,cardNotSwiped, convertSALT} from './paymentActions';
import { store } from '../../../store/store';

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
            printFailure: false,
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
            giftCardNumber:"",
            isSavedCardTrans: false,
            UseInTransAccount: null,
            otherCardList: []
        };

        // Variables
            this.orderNumber = this.state.orderNumber;
            this.cartID = this.state.cartID;
            this.value=null;
            this.i=null;
            this.bypassSource=null;
            this.timer=null;
            this.tries=0;
            this.ticketNum=0;
            this.voidFlow=false;
            this.error=false;
            this.lookup=false;
            this.giftcardnum=null;

            this.navigateBack=this.navigateBack.bind(this);
    }

    componentWillMount() {
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
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

        console.log("PURNIMA: props.cards in payment page" + this.props.cards);
        console.log("PURNIMA: props.cards.usintransaccount in payment page" + this.props.cards.UseInTransAccount);
        console.log("PURNIMA: props.cards.useintransaccount.kinum in payment page" + this.props.cards.UseInTransAccount.kiNum);
        
        if(this.state.total==0&&this.props.cart.data.transactionId&&store.getState().cart.data){
            this.completeTransaction();
        } else if (this.props.cards && this.props.cards.UseInTransAccount && this.props.cards.UseInTransAccount.kiNum && this.props.cards.UseInTransAccount.kiNum != '') {
            console.log("PURNIMA: Payment Account look up scenario");
            var accDetail = this.props.cards.UseInTransAccount;
            var accDetails = this.props.cards.UseInTransAccounts;
            this.setState({ isSavedCardTrans: true, UseInTransAccount: accDetail, otherCardList:accDetails });
            //this.bypass();
            //this.closeTrans();
        } else {
            this.cardLookup();
        }
    }

    componentDidCatch(error, info) {
        this.setState({ errorModal: true, cardErrorMsg: error+": "+info });
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextprops")
        console.log(JSON.stringify(nextProps.Payment))
        if (nextProps.Payment.getCardBinRes != this.props.Payment.getCardBinRes) {
            this.getCardBinResReturned(nextProps.Payment.getCardBinRes)
        }
        if (nextProps.Payment.notSwipedRes != this.props.Payment.notSwipedRes) {
            console.log("Not Swiped Reason API Response: ", nextProps.Payment.notSwipedRes)
        }
        if (nextProps.Payment.scannerRes != this.props.Payment.scannerRes) {
            this.scannerResReturned(nextProps.Payment.scannerRes)
        }
        if (nextProps.Payment.cancelSwipeRes != this.props.Payment.cancelSwipeRes) {
            this.cancelSwipeResReturned(nextProps.Payment.cancelSwipeRes)
        }
        if (nextProps.Payment.convertSALTRes!=this.props.Payment.convertSALTRes){
            this.convertSALTResReturned(nextProps.Payment.convertSALTRes)
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
        if (nextProps.Payment.printRes != this.props.Payment.printRes) {
            this.printReceiptActionReturned(nextProps.Payment.printRes)
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
        if (nextProps.Payment.midVoidRes != this.props.Payment.midVoidRes) {
            this.props.voidTransactionInvoker(this.props.login.userpin, this.props.cart.data.transactionId)
        }
        //if void log successful 
        if (nextProps.Payment.voidRes!=this.props.Payment.voidRes) {
            sessionStorage.setItem("loggedIn", "false");
            this.props.history.push('/');
        }
        if(nextProps.Payment.failure!=this.props.Payment.failure){
            this.setState({errorModal:true, cardErrorMsg:nextProps.Payment.failure, errorSource:"Failure"})
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
    async navigateBack() {
        // this.props.clearItemSelected("");
        this.props.history.push('/sale');
        await this.bypass();
        this.props.clearState()   
    }

    //Aurus Scanner Request
    activateScanner=()=> {
        this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
        this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
        if (this.toggle=='on') {//toggle scanner on
            this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 30;
        } else if(this.toggle=='off'){//toggle scanner off
            this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 31;
        }
        this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
        this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
        this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
        this.setState({returnScannerRes:true});
        var req = json2xml(this.UpdateRequestScanJson);
       
        this.props.aurusActionInvoker(req,'SCANNER');
    }

    scannerResReturned=(data)=>{
        
        clearTimeout(this.timer);
        this.setState({returnScannerRes:false});
        if(data.UpgradeResponse.ResponseCode[0]=="00000"){
            if (this.toggle == 'on') {//checks if scanner toggled on and proceed to cardlookup
                this.cardLookup()
            } 
        } else {
            this.setState({ errorModal: true, cardErrorMsg: data.UpgradeResponse.ResponseText })        }
    }

//Aurus GetCardBIN Request
    cardLookup = (entrySource) =>{
        this.error=false;
        this.lookup=false;
        console.log("cardlookup "+entrySource)
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = this.aurusVars.LookUpFlag;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.NotAllowedKeyedEntry;
        if (entrySource == 1) { //entry source 1 means key-in
            this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.AllowKeyedEntry;
            if (this.giftcardnum != null) {//checks if a gift card number was keyed-in
                this.getCardBinJson.GetCardBINRequest.CardNumber = this.giftcardnum;
                this.error = false;
                this.giftcardnum = null;
            } 
        }
        if (!this.error) { //checks if there was an error in key-in giftcard
            var req = json2xml(this.getCardBinJson);
            setTimeout(() => {this.props.aurusActionInvoker(req, 'GETCARDBIN')}, 1000);
            this.timer = setTimeout(function () {this.openErrorModal('timeout',"Timeout") }, 240000);
            
        }
        setTimeout(() => {this.getCardBinJson.GetCardBINRequest.CardNumber = ""}, 1000) //clears out card number
    };

    getCardBinResReturned=(data)=>{
        console.log("getcardbin returned")
        this.setState({giftCardModal: false});
        clearTimeout(this.timer);
        if (data.GetCardBINResponse.ResponseCode[0] == "00000") {
            if (['VIC', "VID", "MCC", "MCD", "AXC", "DCC", "NVC", "NVD", "JBC", "GCC", "SCC", "PLC"].includes(data.GetCardBINResponse.CardType[0])){
                var dateObj = new Date();
                console.log(this.bypassSource, data.GetCardBINResponse.CardEntryMode[0])
                if (data.GetCardBINResponse.CardExpiryDate[0] != "") {
                    if (data.GetCardBINResponse.CardExpiryDate[0].substr(2) > ((dateObj.getUTCFullYear()).toString().substr(2))) {
                        var newArray = this.state.cards.slice();
                        newArray.push(data.GetCardBINResponse);
                        this.setState({
                            cards: newArray,
                            isCards: true
                        });
                        this.toggle = "off";//turn scanner off
                        if (this.bypassSource == 'KEYPAD' && data.GetCardBINResponse.CardEntryMode[0] == 'K') {
                            this.handleCardSwiped();
                        }
                    } else if (data.GetCardBINResponse.CardExpiryDate[0].substr(2) == ((dateObj.getUTCFullYear()).toString().substr(2))) {
                        if (data.GetCardBINResponse.CardExpiryDate[0].substr(0, 2) >= (dateObj.getUTCMonth() + 1)) {
                            var newArray = this.state.cards.slice();
                            newArray.push(data.GetCardBINResponse);
                            this.setState({
                                cards: newArray,
                                isCards: true
                            });
                            this.toggle = "off";
                            if (this.bypassSource == 'KEYPAD' && data.GetCardBINResponse.CardEntryMode[0] == 'K') {
                                this.handleCardSwiped();
                            }
                        } else {
                            this.openErrorModal('GETCARDBIN', "Card expired")
                        }
                    }
                }
                else {
                    var newArray = this.state.cards.slice();
                    newArray.push(data.GetCardBINResponse);
                    this.setState({
                        cards: newArray,
                        isCards: true
                    });
                    if (this.bypassSource == 'KEYPAD' && data.GetCardBINResponse.CardEntryMode[0] == 'K') {
                        this.handleCardSwiped();
                    }
                }
            } else {
                this.openErrorModal('GETCARDBIN',"Card type is not supported")
            }
            
        } else if(data.GetCardBINResponse.ResponseText[0].startsWith("Transaction Cancelled")){
            this.cardLookup();
        }  else if (data.GetCardBINResponse.ResponseCode[0].startsWith("4")) {
            this.bypass('GETCARDBIN', data.GetCardBINResponse.ResponseText[0])
        }   else {
            console.log(data.GetCardBINResponse.ResponseCode[0]);
            this.bypass('GETCARDBIN', data.GetCardBINResponse.ResponseText[0])
        }
        this.bypassSource=''; //clear bypass source
    }

    keyGiftCard=(giftcardnum)=>{
        if (giftcardnum.length > 16 && giftcardnum.length < 18) {
            this.props.convertSALT(giftcardnum)
        } else {
            this.setState({ error: "A 17-digit gift card number is required" })
            this.error = true;
        }
    }
    convertSALTResReturned=(data)=>{
        if (data.code == 200) {
            this.giftcardnum = data.Result.GC.embossedCardNumber;
            this.lookup = true;
            this.cancelSwipe();
        } else {
            this.setState({ errorModal: true, error: data.message })
            this.error = true;
        }
    }
    cancelSwipe=()=>{
       console.log("sending cancel swipe bypass request")
       setTimeout(() => {this.props.aurusActionInvoker(json2xml(this.bypassJson),'CANCELSWIPE')},1000);
        this.timer = setTimeout(function(){this.openErrorModal('timeout',"Timeout") }, 35000);
    }

    cancelSwipeResReturned=(data)=>{
        console.log("cancelswipe returned")
        clearTimeout(this.timer);
        if(data.ByPassScreenResponse.ResponseCode=="00000"){
            this.error = false;
            if (this.lookup == true) {//check if giftcard lookup is toggled on
                this.cardLookup(1)
            } else {
                this.cardLookup();
            }
        } else {
            this.bypass();
        }
    }
    
  //Aurus Bypass Request
  bypass=(source, msg)=>{
    this.bypassSource=source;
    console.log("sending bypass: "+this.bypassSource+" "+msg)
    this.setState({bypassErrorMsg:msg})
   
    setTimeout(() => {this.props.aurusActionInvoker(json2xml(this.bypassJson),'BYPASS')},1000);

    this.timer = setTimeout(function(){this.openErrorModal('timeout',"Timeout") }, 35000);
}

bypassResReturned = (data) => {
    console.log("bypass returned: source "+this.bypassSource);
    
    clearTimeout(this.timer);
    if (data.ByPassScreenResponse.ResponseCode == "00000") {
        switch (this.bypassSource) {
            case 'KEYPAD':
                {
                    console.log("bypass keypad") 
                    this.cardLookup(1)
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
                    this.setState({ errorModal: true, cards: copyArray, transInfo: copyTransInfoArray, cardErrorMsg: "Card declined" });//this.state.bypassErrorMsg
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
                console.log("bypass giftcard");
                this.toggle="on";
                this.activateScanner()
                this.setState({giftCardModal:true}) 
                break;
            }
            case 'BYPASS':{
                this.cancelSwipe();
            }

            default:
                {
                    console.log("inside default switch bypass")
                        //this.setState({errorModal:true})
                    break;
                }
        }
    }
    
    }

    openErrorModal = (src, msg) => {
        this.setState({ errorModal: true, cardErrorMsg: msg, errorSource: src })
    }

    closeErrorModal = () => {
        this.setState({ errorModal: false })
        if (this.state.cardErrorMsg.startsWith("Unable To Connect")) {
            this.bypass();
        } else if (this.state.cardErrorMsg.startsWith("PED ")) {
            this.cancelSwipe();
        } else if (this.state.cardErrorMsg.startsWith("Card declined")) {
            this.cardLookup();
        }
        switch (this.state.errorSource) {
            case "tenderLog": {
                this.addToTender();
            } case "transLog": {
                this.completeTransaction();
            } case 'SIG': {
                this.setState({ signatureModal: true });
            } case 'Failure': {
                //void
            } case 'timeout':{

            } default: {
                this.cardLookup();
            }
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

    cancelPay=(i,e)=>{
        e.preventDefault()
        this.i=i;
        var copyArray = [...this.state.cards];
        copyArray.splice(this.i, 1);
        var copyTransInfoArray = [...this.state.transInfo];
        copyTransInfoArray.splice(this.i, 1)
        this.setState({ cards: copyArray, transInfo: copyTransInfoArray});
        this.cardLookup()
    }
    
    //Aurus Transaction Request
    getAmountDue=(i,e )=>{
            console.log("sending transreq")
            e.preventDefault()
            this.i=i;
            if(e.currentTarget.tagName != 'BUTTON') { //if source is not from callfromauth
                if (e.currentTarget.input.value <= this.state.amountDue) {
                    let copyArray = [...this.state.payValues];
                    this.value = e.currentTarget.input.value;
                    copyArray[i] = parseFloat(this.value).toFixed(2);
                    this.setState({ payValues: copyArray })
                }
            }
            var amount=parseFloat(this.state.amountDue)==NaN?0:parseFloat(this.state.amountDue);
            var condition=this.value <= amount;
            if (condition) {
                this.setInactive();
                this.props.startSpinner(true);
                if (this.state.isSavedCardTrans) {
                    var state = this.state;
                    this.TransRequestJson.TransRequest.POSID = this.aurusVars.POSID;
                    this.TransRequestJson.TransRequest.APPID = this.aurusVars.APPID;
                    this.TransRequestJson.TransRequest.CCTID = this.aurusVars.CCTID;
                    this.TransRequestJson.TransRequest.KI = this.state.otherCardList[i].kiNum;
                    this.TransRequestJson.TransRequest.KIType = "12";
                    this.TransRequestJson.TransRequest.CardType = this.state.otherCardList[i].chargeType;
                    this.TransRequestJson.TransRequest.CardToken = this.state.otherCardList[i].cardToken;
                    this.TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = this.state.total + "~" + parseFloat(this.value).toFixed(2);
                    this.TransRequestJson.TransRequest.CustomerFirstName = this.state.otherCardList[i].customerFname;
                    this.TransRequestJson.TransRequest.CustomerLastName = this.state.otherCardList[i].customerLname;
                    this.TransRequestJson.TransRequest.TransactionType = '';
                }
                else {
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
                    /*this.TransRequestJson.TransRequest.TicketProductData.TicketCount=this.state.cart.length;
                    this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.TicketNumber=this.state.cart
                    this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.ProductCount=this.state.cart.length;
                    this.TransRequestJson.TransRequest.TicketProductData.Tickets.Ticket.Products.Product=this.state.cart */
                    if (this.state.transInfo.length != 0) {
                        //Call for Auth
                        if (this.state.transInfo[this.state.currentCard].ResponseCode[0] == "20001") {
                            this.TransRequestJson.TransRequest.ApprovalCode = this.state.authCode;
                            this.TransRequestJson.TransRequest.TransactionType = 40;
                        }
                    }
                    if (this.state.cards[i].CardType == "GCC") {
                        this.TransRequestJson.TransRequest.TransactionType = "42";
                    }
                }
    
    
                if (this.aurusVars.SignatureFlag == "Y") {
                    this.TransRequestJson.TransRequest.SignatureFlag = "Y"
                }
    
                var xml = json2xml(this.TransRequestJson)
                this.props.aurusActionInvoker(xml, 'TRANSACTIONREQUEST')
    
                this.timer = setTimeout(function(){this.openErrorModal('timeout',"Timeout") }, 240000);
            }
    }

    transResReturned=(data)=>{
        console.log("recieved transresponse")
        this.props.startSpinner(false);
        
        clearTimeout(this.timer);
        var newArray = this.state.transInfo.slice();
        var transResponse = data.TransResponse.TransDetailsData[0].TransDetailData[0];
        this.ticketNum = data.TransResponse.AurusPayTicketNum[0];

        newArray.push(transResponse)
        this.setState({ transInfo: newArray, currentCard: this.i })
        if (transResponse.ResponseCode[0] == "00000") {
            const paidValuesCopy = [...this.state.paidValues];
            paidValuesCopy[this.i] = transResponse.TransactionAmount[0];
            this.setState({ paidValues: paidValuesCopy, amountDue: parseFloat(this.state.amountDue - this.value).toFixed(2), receiptModal: false, emailModal: false, printModal: false, emailverifyModal: false, authModal:false  })
            this.openSignatureModal(transResponse);
            //hides cursor
            var inputElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>form>.inputAmount input")
            for(var x=0; x<inputElement.length; x++){
                inputElement[x].blur();
            }

        } else if (transResponse.ResponseCode[0] == "20001") { //show call for auth modal
            this.setState({ authModal: true });
        } else if (transResponse.ResponseCode[0].startsWith("2") || transResponse.ResponseCode[0].startsWith("1")) {
            console.log(transResponse.TransactionResponseText);
            this.bypass('TRANS', transResponse.TransactionResponseText[0])
            
        } else if(transResponse.TransactionResponseText[0].startsWith("Transaction Cancelled")){
            this.bypass('TRANS', "Transaction Cancelled")
        }else if(transResponse.ResponseCode[0].startsWith("4")) {
            this.bypass('TRANS', transResponse.TransactionResponseText[0])
        }
        this.bypassSource=''; //clear bypass source
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
            this.signatureJson.SignatureRequest.SignatureData = hexSig;
            this.signatureJson.SignatureRequest.TransactionIdentifier = this.props.Payment.transactionRes.TransResponse.TransDetailsData[0].TransDetailData[0].TransactionIdentifier;
            var sigXml = json2xml(this.signatureJson);
           
            this.props.aurusActionInvoker(sigXml, 'SIGNATURE');

            this.timer = setTimeout(function(){this.openErrorModal('timeout',"Timeout") }, 35000);
        }
    }

    sigResReturned = (data) => {
        console.log("signature req returned")
        
        clearTimeout(this.timer);
        if (data.SignatureResponse.ResponseCode[0] == "00000") {
            this.props.startSpinner(false);
            this.setState({ signatureModal: false});
            this.addToTender();
        } else {
            this.props.startSpinner(false);
            this.openErrorModal("SIG","Signature request error")
        }
        this.bypassSource=''; //clear bypass source
    }

    //AddTenderAPI Call
    addToTender = () => {
        var tenderDetails=this.state.transInfo[this.state.currentCard]
        console.log("sending addtoTender: ", JSON.stringify(tenderDetails))

        const transactionObj = {
            "ClientID": clientConfig.ClientID,
            "ClientTypeID": clientConfig.ClientTypeID,
            "SourceApp": clientConfig.SourceApp,
            "SourceLoc": clientConfig.SourceLoc,
            "Store": clientConfig.Store,
            "Terminal": clientConfig.Terminal,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId,
            "CardTender": {
                "TenderType": tenderDetails.TransactionTypeCode[0],
                "TranslatorTenderType": 7,
                "TenderAmount": "9",//tenderDetails.TransactionAmount[0],
                "ForeignAmount": 0,
                "ForeignLocale": 0,
                "ExchangeRate": tenderDetails.DCCDetails?tenderDetails.DCCDetails[0].DCCExchangeRate[0]:"0",
                "TenderQty": 0,
                "ManagerID": "0",
                "NonSwipeReason": this.state.nonSwipeReason!=''?this.state.nonSwipeReason:0,
                "MerchantID":  tenderDetails.ECOMMInfo?tenderDetails.ECOMMInfo[0].MerchantIdentifier[0]:"",
                "TerminalID":  tenderDetails.ECOMMInfo?tenderDetails.ECOMMInfo[0].TerminalId[0]:"",
                "StatusCode": "01",
                "Auth": "",
                "ChargeInfo": {
                    "Account": "000000000000000000000000000000",
                    "Last_Four": tenderDetails.CardNumber[0].slice(-4),
                    "KI": tenderDetails.KI[0],
                    "Name": tenderDetails.CardType[0],
                    "Expdate": tenderDetails.CardExpiryDate[0],
                    "Effdate": "00000000",
                    "Issue_no": tenderDetails.IssuerNumber?tenderDetails.IssuerNumber[0]:"",
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
                    "Discretionary_Data": "",
                    "Partial_Approval": tenderDetails.PartialApprovedFlag[0],
                    "Aurus_Cust_ID": tenderDetails.CustomerTokenNumber[0],
                    "Aurus_Whizticketnum": this.ticketNum,
                    "Aurus_Cardtoken": tenderDetails.CardNumber[0],
                    "KI_Type": tenderDetails.KIType[0],
                    "Customer_Present": tenderDetails.PurchaserPresent?tenderDetails.PurchaserPresent[0]:"",
                    "Card_Present": tenderDetails.CardPresent?tenderDetails.CardPresent:"",
                    "Debit_Flag": '',
                    "Aurus_CardEntryMode": tenderDetails.CardEntryMode[0],
                    "Aurus_Cardtype": tenderDetails.CardType[0],
                    "Aurus_Transaction_Identifier": tenderDetails.TransactionIdentifier[0],
                },
                "aurus_Transaction_Identifier": tenderDetails.TransactionIdentifier[0],
                "aurus_whizticketnum": this.ticketNum
            }
        }
       
        this.props.addTenderInvoker(transactionObj);
    }

    //check if amountdue is 0
    tenderLogReturned = (data) => {
        
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
            if (this.tries < 4) { //retry 3 times
                this.openErrorModal("tenderLog", "Failed to log Tender. Try again?");
                this.tries += 1;
            } else {
                this.openErrorModal("Failure", "Unable to log Transaction. Proceed to void.");
            }
        }
    }

    //CompleteTransactionAPI Call
    completeTransaction = () => {
        console.log("sending translog api")

        const transactionObj = {
            "ClientID": clientConfig.ClientID,
            "ClientTypeID": clientConfig.ClientTypeID,
            "SourceApp": clientConfig.SourceApp,
            "SourceLoc": clientConfig.SourceLoc,
            "Store": clientConfig.Store,
            "Terminal": clientConfig.Terminal,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId
        }
       
        this.props.completeTransactionInvoker(transactionObj);
    }

    transLogReturned = (data) => {
        console.log("translog returned")
        
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
                this.setState({ errorModal: true, cardErrorMsg: "Unable to log Transaction. Proceed to void", errorSource: "Failure" });
            }
        }
    }

    //Aurus Close Transaction
    closeTrans = () => {

        var closeTransXml = json2xml(this.closeTransJson);
       
        this.props.aurusActionInvoker(closeTransXml, 'CLOSETRANSACTION');
        this.timer = setTimeout(function () {this.openErrorModal('timeout',"Timeout")}, 35000);
    }

    closeTransReturned=(data)=>{
        
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
            "Store": clientConfig.Store,
            "Terminal": clientConfig.Terminal,
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": this.props.cart.data.transactionId,
            "registerNum": val,
            "multiGiftWrap": "true",
            "RePrint": "true"
        }
        if(val==null || val==""){

        }else {
            this.props.startSpinner(true);
           this.setState({printFailure:false})
            this.props.printReceiptInvoker(params);
        }
    }

    printReceiptActionReturned=(data)=>{
        
        this.props.startSpinner(false);
        if(data.responseCode==0){
            this.exit();  
          } else {
            this.setState({printFailure:true})
        }
    }

    openprintModal = () => {
        this.setState({printModal: true, receiptModal: false, emailModal: false, queueprintModal:false})
    }
    closePrintModal = () => {
        this.setState({printModal: false, receiptModal: true, emailModal: false})
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
            emailFailure: false,
            error:""
        })
    }

    emailSend = () => {
        var params = {
            "ReqHeader": {
                "RegisterNum": clientConfig.RegisterNum,
                "StoreNum": clientConfig.Store,
                "AssociateNumber": this.props.login.userpin,
                "TransactionNum": this.props.cart.data.transactionId
            },
            "FirstName": this.state.emailFname,
            "LastName": this.state.emailLname,
            "EmailAddress": this.state.email,
            "ClientSmartId": clientConfig.ClientID
        };
        if(this.state.email=="" || this.state.email==null){

        } else {
            this.props.startSpinner(true);
            this.setState({ emailFailure: false})
           
            this.props.updateCustDetailsInvoker(params);
        }
    }

    updateCustomerActionReturned=(data)=>{
        
        this.props.startSpinner(false);
        this.setState({emailFailure:false})
        if (data.responseCode=="0") {
            if (this.state.queueprintModal) {
                this.openprintModal();
            } else {
                this.exit()
            }
        } else {
            this.setState({
                emailverifyModal:true,
                emailFailure: true,
            })
        } 
    }

    closeError=()=>{
        this.setState({emailFailure:false, printFailure:false})
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
    updateCartStatus = (/*e*/) => {
        // e.preventDefault();

        /*this.setState({orderNumber:"323345435890"});
        this.setState({cartID:"201803082365"});*/
        var cartID = this.cartID;
        console.log("cart id in payment.js" + cartID);
        console.log("order id and cartid" + this.orderNumber + ' ' + this.cartID)
        if (this.state.isIsellTrans) {
            this.props.UpdateCartStatusInvoker({ orderNumber: this.orderNumber, cartID: this.cartID });
        } else {
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
            this.cancelSwipe();
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
        this.props.clearState();
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

    // CALLING AURUS ISSUE GIFTCALL API AFTER SUCCESSFUL PAYMENT
     aurusIssueGiftCardCall = () => {
        this.TransRequestJson.TransRequest.CardNumber =" this.state.validCardNumber GET FROM JSON OBJECT";
        this.TransRequestJson.TransRequest.EntrySource = 'K';
        this.TransRequestJson.TransRequest.TransAmountDetails.ServicesTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.ProductTotalAmount = "this.validIncreaseAmount GET FROM CART";
        this.TransRequestJson.TransRequest.TransAmountDetails.TaxAmount = "this.tax GET FROM CART";
        this.TransRequestJson.TransRequest.TransAmountDetails.Discount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.EBTAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FSAAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DutyTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FreightTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.AlternateTaxAmount ="0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TipAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DonationAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = "this.validIncreaseAmount + this.tax GET FROM CART";
       
        this.TransRequestJson.TransRequest.TransactionType = 11;
        const params = json2xml(this.TransRequestJson);
        this.props.getAurusResponse(params)
      }
    

    // CALLING AURUS RELOADING GIFCARD API AFTER THE SUCCESSFULL PAYMENT
       aurusReloadGiftCardCall = () => {
        this.TransRequestJson.TransRequest.CardNumber = "GET FROM OBJECT CREATED";
        this.TransRequestJson.TransRequest.EntrySource = 'K';
        this.TransRequestJson.TransRequest.TransAmountDetails.ServicesTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.ProductTotalAmount = "GET FROM CART";
        this.TransRequestJson.TransRequest.TransAmountDetails.TaxAmount = "GET FROM CART";
        this.TransRequestJson.TransRequest.TransAmountDetails.Discount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.EBTAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FSAAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DutyTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FreightTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.AlternateTaxAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TipAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DonationAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = "this.validIncreaseAmount + this.tax GET FROM CART";
    
        this.TransRequestJson.TransRequest.TransactionType = 16;
        const params = json2xml(this.TransRequestJson);
        this.props.getAurusResponse(params);
      }


    render() {
        return (<PaymentView
            useStoredCard = {this.props.cards.useStoredCard}
            path = {this.props.cards.path}
            updateCartStatus = {this.updateCartStatus}
            useStoredCard = {this.props.cards.useStoredCard}
            otherCards = {this.props.cards.UseInTransAccount}
            history={this.props.history}
            /*added for testing**/customerInfo={this.customerInfo}
            cards={this.state.cards}
            transInfo={this.state.transInfo}
            isCards={this.state.isCards}
            cart={this.state.cart}
            cardLookup={this.cardLookup}
            keyGiftCard={this.keyGiftCard}
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
            otherCardList = {this.state.otherCardList}
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
            printFailure={this.state.printFailure}
            giftCardNumber={this.state.giftCardNumber}
            PinNUM={this.state.PinNUM}
            navigateBack={this.navigateBack}
            keyPad={this.keyPad}
            advanceDeposit={this.advanceDeposit}
            giftCardModal={this.state.giftCardModal}
            handleGiftCardModal={this.handleGiftCardModal}
            cancelPay={this.cancelPay}
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
        voidTransactionInvoker:(data)=>dispatch(voidTransaction(data)),
        convertSALT:(data)=>dispatch(convertSALT(data))    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
