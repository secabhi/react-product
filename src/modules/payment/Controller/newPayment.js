// Dependencies
import React, {Component} from "react";

// Redux
import {connect} from 'react-redux';
import { store } from '../../../store/store';
   // Actions
import {
    updateCustDetails, getCustDetails, clearState, getAurusResponse,
    UpdateCartStatusAction, printReceipt, addTender, completeTrans, 
    voidTransaction, cardNotSwiped, convertSALT 
} from './paymentActions';
import { startSpinner } from '../../common/loading/spinnerAction';

// Components
import {PaymentView} from '../View/paymentView';

//Functions
import { json2xml, base64toHEX } from '../../common/helpers/helpers';
import prepare4MidVoid from '../void/void';

//Configurations
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const clientConfig = CONFIG_FILE.clientConfig;



class Payment extends Component {
    constructor(props) {
        super(props);
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
        } // end of state variables

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
    }// end of constructor

    //REACT LIFE CYCLE METHODS
    componentWillMount() {
        //THIS SHOULD BE DONE WITHIN THE CONSTRUCTOR
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

} //end of class Payment