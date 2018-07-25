// Dependencies
import React, {Component} from "react";
import {connect} from 'react-redux';

import {updateCustDetails,getCustDetails,clearState,getAurusResponse,UpdateCartStatusAction,printReceipt,addTender,completeTrans} from './paymentActions';
import {itemSelectedAction} from '../../common/cartRenderer/actions';
import { store } from '../../../store/store';

// Components
import {PaymentView} from '../View/paymentView';
import { startSpinner } from '../../common/loading/spinnerAction';

//Functions
import { json2xml, base64toHEX, xml2json } from './converter';


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
        //this.UpdateRequestScanJson=require("../../../resources/aurus/UpdateRequestScan.json")

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
            authModal:false,
            signatureModal: false,
            receiptModal: false,
            emailModal: false,
            emailverifyModal:false,
            printModal: false,
            queueprintModal: false,
            purchasesListModal:false,
            error: "", 
            print: true,
            update: true,
            emailFailure: false,
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
            this.orderNumber = this.state.orderNumber;
            this.cartID = this.state.cartID;
    }

    componentWillMount() {
        this.screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
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
         console.log("props")
        console.log(nextProps)
        nextProps.Payment.data&&this.state.print?this.printReceiptActionReturned(nextProps.Payment.data):this.setState({print:true});
        nextProps.Payment.clientData&&this.state.update?this.updateCustomerActionReturned(nextProps.Payment.clientData):this.setState({update:true});
       { /*if(nextProps.Payment.type=='UPDATE_ISELL_SUCCESS')
        {   
            //this.props.startSpinner(false);
            //alert('I sell cart update successfully');
            console.log('Isell cart updated successfully');
            //added for update cart status
           // this.props.startSpinner(false);

            //this.continue();
           // debugger;
        */} 
    }

    componentDidMount() {
        //this.activateScanner();     
        setTimeout(()=>{this.cardLookup()}, 100);
    }

//Navigate back to sale page
    navigateBack = () => {
        this.props.clearItemSelected("");
        this.props.history.push('/sale');
    }

    activateScanner=()=> {
        this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
        this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
        this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = this.aurusVars.UpgradeType;
        this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
        this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
        this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
        var req = json2xml(this.UpdateRequestScanJson);
        this.props.aurusActionInvoker(req);
        if(store.getState().Payment.aurusresponse.UpgradeResponse.ResponseCode[0]==="00000"){

        } else {
            console.log(store.getState().Payment.aurusresponse.UpgradeResponse.ResponseCode[0]);
            this.UpdateRequestScanJson.UpgradeRequest.POSID = this.aurusVars.POSID;
            this.UpdateRequestScanJson.UpgradeRequest.APPID = this.aurusVars.APPID;
            this.UpdateRequestScanJson.UpgradeRequest.UpgradeType = 31;
            this.UpdateRequestScanJson.UpgradeRequest.ClerkID = this.aurusVars.ClerkID;
            this.UpdateRequestScanJson.UpgradeRequest.ServerIP = this.aurusVars.ServerIP;
            this.UpdateRequestScanJson.UpgradeRequest.ServerPort = this.aurusVars.ServerPort;
            var req = json2xml(this.UpdateRequestScanJson);
            this.props.aurusActionInvoker(req);
            this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
    }

//Aurus GetCardBIN Request
    cardLookup = () =>{
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = this.aurusVars.LookUpFlag;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = this.aurusVars.AllowKeyedEntry;
        var req = json2xml(this.getCardBinJson);
        this.props.aurusActionInvoker(req);
        if (store.getState().Payment.aurusresponse.GetCardBINResponse.ResponseCode[0]==="00000") {
            var newArray = this.state.cards.slice();  
            newArray.push(store.getState().Payment.aurusresponse.GetCardBINResponse)  
           this.setState({
               cards: newArray,
               isCards: true
           })
        }
        else {
            console.log(store.getState().Payment.aurusresponse.GetCardBINResponse.ResponseCode[0])
            this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
        
    }

//Pay Amount
    handleChange=(index, event)=> {
        let newArray = [...this.state.payValues];
        let value = event.target.value;
        newArray[index] = parseFloat(value).toFixed(2);
        this.setState({ payValues: newArray });
        
    }
    
    //Aurus Transaction Request
    getAmountDue=(e, i, authFlag)=>{
        let copyArray = [...this.state.payValues];
        let value = e.currentTarget.input.value;
        copyArray[i] = parseFloat(value).toFixed(2);
        this.setState({payValues: copyArray})
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
        this.TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = this.state.total + "~" + parseFloat(this.state.payValues[i]);
        this.TransRequestJson.TransRequest.CustomerFirstName = this.state.cards[i].FirstName;
        this.TransRequestJson.TransRequest.CustomerLastName = this.state.cards[i].LastName;

        if (this.aurusVars.SignatureFlag == "Y") {
            this.TransRequestJson.TransRequest.SignatureFlag = "Y"
        }
        if (authFlag === "T") {
            this.TransRequestJson.TransRequest.ApprovalCode = this.state.authCode;
            this.TransRequestJson.TransRequest.TransactionType = 40;
        }
        var xml = json2xml(this.TransRequestJson)
        this.props.aurusActionInvoker(xml)
        //var json=xml2json("<TransResponse> <POSID>01</POSID> <APPID>04</APPID> <CCTID>06</CCTID> <TransDetailsData> <TransDetailData> <CardNumber>411111XXXXXX1111</CardNumber> <CardType>VIC</CardType> <TransactionTypeCode>1</TransactionTypeCode> <CardEntryMode>M</CardEntryMode> <KI></KI> <KIType></KIType> <TransactionAmount>15.00</TransactionAmount> <TipAmount>0.00</TipAmount> <DonationAmount>0.00</DonationAmount> <TransactionIdentifier>900002162</TransactionIdentifier> <ResponseCode>00000</ResponseCode> <TransactionResponseText>APPROVED</TransactionResponseText> <ApprovalCode>044648</ApprovalCode> <BalanceAmount>0.00</BalanceAmount><SignatureReceiptFlag>Y</SignatureReceiptFlag></TransDetailData> </TransDetailsData> <BatchNumber>063001</BatchNumber> <AurusPayTicketNum>499969481908909696</AurusPayTicketNum> </TransResponse>")
        var newArray = this.state.transInfo.slice();
        newArray.push(store.getState().Payment.aurusresponse.TransResponse)
        this.setState({ transInfo: newArray })
        var transResponse = store.getState().Payment.aurusresponse.TransResponse.TransDetailsData[0].TransDetailData[0]
        if (transResponse.ResponseCode[0] === "00000") {
            const paidValues = this.state.paidValues;
            paidValues[i] = transResponse.TransactionAmount[0];
            this.forceUpdate();
            this.setState({ amountDue: this.state.total - parseFloat(paidValues.reduce((a, b) => a + b, 0)), receiptModal: false, emailModal: false, printModal: false, emailverifyModal: false }, function(){console.log(this.state.amountDue)})
            this.openSignatureModal(transResponse)
        } else if (transResponse.ResponseCode[0] === "20001") {
            this.setState({ authModal: true });
        } else {
            console.log(transResponse.TransactionResponseText);
            this.props.startSpinner(false);
            //this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
        this.setState({ currentCard: i });
    }

    setInactive=()=>{
        var formElements=document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>form")
        var labelElements = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>span.amountLabel")
        var inputElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div>form>input")
        for(var x=0; x<formElements.length; x++){
            formElements[x].className="amountInputForm hide"
            labelElements[x].className="amountLabel";
            inputElement[x].blur();
        }
    }

//Call for Auth
    handleAuthorizationCodeInput = (event) => {
        this.setState({ authCode: event.target.value })
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
  
    closeSignatureModal = () => {
        this.setState({
                signatureModal: false
        })
    }

//Receipt Options Menu Modal
    openreceiptModal = (sig) => {
        this.props.startSpinner(true);
        this.updateCartStatus();
        var hexSig = (base64toHEX(sig.toDataURL().slice(22)));
        this.signatureJson.SignatureRequest.SignatureData = hexSig;
        this.signatureJson.SignatureRequest.TransactionIdentifier = this.props.Payment.aurusresponse.TransResponse.TransDetailsData[0].TransDetailData[0].TransactionIdentifier;
        var sigXml = json2xml(this.signatureJson);
        this.props.aurusActionInvoker(sigXml);
        console.log(store.getState().Payment.aurusresponse.SignatureResponse.ResponseCode)
        if (store.getState().Payment.aurusresponse.SignatureResponse.ResponseCode[0] === "0") {
            this.props.startSpinner(false);
            this.setState({ signatureModal: false });
            if (this.state.amountDue === "0.00" || this.state.amountDue=== "0" || this.state.amountDue === 0) { //need to show receipt/email only if entire amount is paid
                this.setState({ receiptModal: true })
                var closeTransXml = json2xml(this.closeTransJson);
                this.props.aurusActionInvoker(closeTransXml);
/* 
                this.addToTender();
                if (this.props.data.response_code === 0) {
                    this.completeTransaction();
                    if (this.props.data.response_code === 29) {

                    } else {
                        console.log(this.props.data.response_text)
                    }
                } else {
                    console.log(this.props.data.response_text)
                } */

            }
            else {
                var closeTransXml = json2xml(this.closeTransJson);
                this.props.aurusActionInvoker(closeTransXml);

               /*  this.addToTender();
                if (this.props.data.response_code === 0) {
                    this.completeTransaction();
                    if (this.props.data.response_code === 29) {
                        this.cardLookup();
                    } else {
                        console.log(this.props.data.response_text)
                    }
                } else {
                    console.log(this.props.data.response_text)
                }
 */
            }

        } else {
            console.log(store.getState().Payment.aurusresponse.SignatureResponse.ResponseCode)
            this.props.aurusActionInvoker(json2xml(this.bypassJson));
        }
    }

//Print Reciept
    printReceipt = (val) => {
        this.props.startSpinner(true);
        this.props.clearState();
        var params = {
            "ClientID": "0010:0243:07182018:033639",
            "SourceApp": "MPOS",
            "SourceLoc": "NM-DIRECT",
            "Store": "0010",
            "Terminal": "243",
            "StoreAssoc": this.props.login.userpin,
            "TransactionId": "3639",
            "registerNum": val
        }

        this.props.printReceiptInvoker(params);
    }

    printReceiptActionReturned=(data)=>{
        if(data.responseCode===0){
            this.props.startSpinner(false);
            this.exit();  
          } else {
              console.log(data.responseText)
              this.props.startSpinner(false);
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
    emailSend = () => {
        this.props.clearState();
        this.setState({emailFailure:false})
         var params = {
            "ReqHeader": {
                "StoreNum": "0010",/* Hardcoded, to be removed */
                "RegisterNum": "218",/* Hardcoded, to be removed */
                "AssociateNumber": "209289",/* this.props.login.associatePin */
                "TransactionNum": "1114"/* Hardcoded, to be removed */
            },
            "FirstName": this.state.fname, 
            "LastName": this.state.lname, 
            "EmailAddress": this.state.email,
            "ClientSmartId": "0001000284641"
        };
        this.props.updateCustDetailsInvoker(params);
        this.props.startSpinner(true);
    }

    updateCustomerActionReturned=(data)=>{
        console.log(data)
        this.setState({emailFailure:false})
        if (data.ResponseCode==="0") {
            if (this.state.queueprintModal) {
                this.props.startSpinner(false);
                this.openprintModal();
                this.setState({update:false})
            } else {
                this.exit()
            }
        } else if(data.ResponseCode==="1"){
            console.log(data.ResponseString)
            this.props.startSpinner(false);
            this.setState({
                emailverifyModal:true,
                emailFailure: true,
                update: false
            })
        } 
    }

    closeError=()=>{
        this.setState({emailFailure:false})
    }
    updateCustDetails=(params)=>{
      this.props.updateCustDetailsInvoker(params);
    }

    getClientDetails = (params) => {
        this.props.getClientDetailsInvoker(params);
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

    openemailverifyModal=()=>{
        this.props.clearState();
        if ( this.state.email !== '' &&  this.state.email !== undefined &&  this.state.email !== null) {
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
        this.props.clearState();
        this.setState({
            emailverifyModal:false, 
            emailModal: true, 
            emailFailure: false
        })
    }
 
//iSell
    updateCartStatus=(/*e*/)=>{
       // e.preventDefault();
        
        /*this.setState({orderNumber:"323345435890"});
        this.setState({cartID:"201803082365"});*/
        var cartID = this.cartID;
        console.log("cart id in payment.js"+cartID);
        console.log("order id and cartid"+this.orderNumber+' '+this.cartID)
        if(this.state.isIsellTrans)
        this.props.UpdateCartStatusInvoker({orderNumber : this.orderNumber,cartID:this.cartID});
        else
        console.log('this is iSell cart Transaction');
        //this.props.startSpinner(true);
        
    }

//T-Log
    addToTender = () => {
        const transactionObj = {
            "ClientID":"0010:0008:07182018:033639",
            "Store": "0010",//this.props.
            "Terminal": "0216",//this.props.
            "StoreAssoc": "209289",//this.props.
            "TransactionId" : this.props.cart.data.transactionId,
            "ClientTypeID" : "1000"
        }

        const tenderDetails = this.props.Payment.aurusresponse.TransResponse.TransDetailsData[0].TransDetailData[0];
        const addTenderObj = { 
            "CardTender": {
                "TenderType":7,//tenderDetails.TransactionTypeCode[0]
                "TranslatorTenderType":7,
                "TenderAmount":"17693",//tenderDetails.TotalApprovedAmount[0]
                "TenderLocale":1,
                "ForeignAmount":0,
                "ForeignLocale":0,
                "ExchangeRate":0,//tenderDetails.DCCDetails[0].DCCExchangeRate[0]
                "TenderQty":0,
                "TenderFlags":8020,
                "AuthFlags":"0",       
                "ManagerID":"0",           
                "NonSwipeReason":0,//tenderDetails
                "MerchantID":"",//tenderDetails.ECOMMInfo[0].MerchantIdentifier[0]
                "TerminalID":"",//tenderDetails.ECOMMInfo[0].TerminalId[0]
                "StatusCode":"01", 
                "Auth":"",     
                "Data_Type":3,     
                "ChargeInfo": {
                    "Account":"000000000000000000000000000000",
                    "Hash_Acct":"$FF74A1$A602AD97682B9F6E0885D915582FAEFD98804EAE1D7FC2AD92BB656FA186C724",
                    "Hash_Type":'0',                     
                    "Enc_Acct":"da854488be433882b1071f1f02ab51aca1ae3efa05959a08b7006cc655fbd4404f1039120e776d3287308c2d656f788a6cfa7faf7fe41896dd3474975fde2cee",
                    "Enc_Type":'0',
                    "Last_Four":"7894",
                    "KI":"711843611411",//tenderDetails.KI[0]
                    "Name":"NETWORK/DISCOVER",//tenderDetails.CardType[0]
                    "Expdate":"10160000",//tenderDetails.CardExpiryDate[0]
                    "Effdate":"00000000",
                    "Issue_no":"",//tenderDetails.IssuerNumber[0]
                    "Plan_Code":"",
                    "Charge_Trans_Ident":"",
                    "Charge_Validation_Code":"",
                    "Payment_Svce_Indicator":'0',
                    "Payment_Svce_Swipecode":"90",
                    "Auth_Reason_Code":"",
                    "Promo_Terms_Code":"",
                    "POS_Data_Code":"",
                    "EGC_Account_Type":'',
                    "GC_Promo_Code":"",
                    "Credit_Plan":"00000",
                    "Flags":'',
                    "Usage_Type":'',
                    "Misc_Flags":'0',
                    "Discretionary_Data_Length":'0',
                    "Discretionary_Data":"",
                    "Partial_Approval":'N',//tenderDetails.PartialApprovedFlag[0]
                    "Authorization_Service":'', 
                    "Aurus_Cust_ID":"",//tenderDetails.CustomerTokenNumber[0]
                    "Aurus_Whizticketnum":"181801398482901891",
                    "Aurus_Cardtoken":"369989XXXX7894",//tenderDetails.CardToken[0]
                    "KI_Type":"71",//tenderDetails.KIType[0]
                    "Customer_Present":'',//tenderDetails.PurchaserPresent[0]
                    "Card_Present":'',//tenderDetails.CardPresent[0]
                    "Debit_Flag":'',
                    "Aurus_CardEntryMode":'',//tenderDetails.CardEntryMode[0]
                    "Aurus_Cardtype":"",//tenderDetails.CardType[0]
                    "Aurus_Transaction_Identifier":"193181801398482965"//tenderDetails.TransactionIdentifier[0]
                },
                "aurus_Transaction_Identifier":"",//tenderDetails.TransactionToken[0]
                "aurus_whizticketnum":""
            }
        }

        this.props.addTenderInvoker(addTenderObj, transactionObj);
    }

    completeTransaction = () => {
        const transactionObj = {
            "ClientID": "0010:0008:07182018:033639",
            "Store": "0010",
            "Terminal": "0216",
            "StoreAssoc": "209289",
            "TransactionId": this.props.cart.data.transactionId,
            "ClientTypeID": "1000"
        }

        this.props.completeTransactionInvoker(transactionObj)
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

    //keyPad = () => {}

    //advanceDeposit = () => {}

    //giftCard = () => {}

//Exit back to landing page
    exit = () => {
        this.props.startSpinner(false);
        this.props.history.push('/')
    }

    render() {
        return (<PaymentView
            updateCartStatus = {this.updateCartStatus}
           /* updateCartStatus = {this.updateCartStatus}*/
            history={this.props.history}
            /*added for testing**/customerInfo={this.customerInfo}
            getAmountDue={this.getAmountDue}
            cards={this.state.cards}
            transInfo={this.state.transInfo}
            isCards={this.state.isCards}
            cart={this.state.cart}
            amountDue={this.state.amountDue}
            subtotal={this.state.subtotal}
            total={this.state.total}
            taxAmount={this.state.taxAmount}
            payValues={this.state.payValues}
            paidValues={this.state.paidValues}
            showMore={this.state.showMore}
            currentCard={this.state.currentCard}
            authModal={this.state.authModal}
            signatureModal={this.state.signatureModal}
            receiptModal={this.state.receiptModal}
            emailModal={this.state.emailModal}
            emailverifyModal={this.state.emailverifyModal}
            printModal={this.state.printModal}
            queueprintModal={this.state.queueprintModal}
            //purchasesListModal={this.state.purchasesListModal}
            fname={this.state.fname}
            lname={this.state.lname}
            email={this.state.email}
            error={this.state.error}
            emailFailure={this.state.emailFailure}
            navigateBack={this.navigateBack}
            keyPad={this.keyPad}
            advanceDeposit={this.advanceDeposit}
            giftCard={this.giftCard}
            getAmountDue={this.getAmountDue}
            printReceipt={this.printReceipt}
            emailSend={this.emailSend}
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
            handleAuthorizationCodeInput={this.handleAuthorizationCodeInput}
            handleEmailInput={this.handleEmailInput}
            handleLnameInput={this.handleLnameInput}
            handleFnameInput={this.handleFnameInput}
            //showPurchasesModal={this.showPurchasesModal}
            //closepurchaseModal={this.closepurchaseModal}
            showMoreToggle={this.showMoreToggle}
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


function mapStateToProps({Payment, sale, customerSearch, cart,login}) {
    return { Payment, otherPageData: sale.otherPageData, incircleData: customerSearch.incircleData, cart,login }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getClientDetailsInvoker: (data) => dispatch(getCustDetails(data)),
        updateCustDetailsInvoker: (data) => dispatch(updateCustDetails(data)), 
        startSpinner: (data)=> dispatch(startSpinner(data)), 
        clearState:()=> dispatch(clearState()),
        aurusActionInvoker : (data) => dispatch(getAurusResponse(data)),
        UpdateCartStatusInvoker : (data) => dispatch(UpdateCartStatusAction(data)),
		printReceiptInvoker: (data)=>dispatch(printReceipt(data)),
        addTenderInvoker : (data) => dispatch(addTender(data)),
        completeTransactionInvoker : (data) => dispatch(completeTrans(data))    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
