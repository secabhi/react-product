// JavaScript source code
import React, {Component} from "react";
import Modal from "../../UI/modal/modal.js";

import "./addCard.css";

import backArrowWhite from "../../resources/images/Back_White.svg";
import productSearchWhite from "../../resources/images/Product_Search_White.svg";
import proceedToSaleWhite from "../../resources/images/Sale_White_Filled.svg";
import AddCardContext from "./addCardContext/addCardContext.js";
import purpleCross from "../../resources/images/Cross_Purple.svg";
import cardicon from '../../resources/images/Add_Card.svg';
import error from '../../resources/images/Error_Red.svg'
import {addCardAction, getAddCardAurusResponse, getCardDetails, getStoreClientId,addCardDetailsToClientele} from "./actions";
// Components
import Header from "../common/header/header";
import Tabheader from "../common/tabheaders/cust-det-tabheader";
import Footer from "../common/footer/footer";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import cards from "../../resources/images/Add_Card.svg";
import addcardselected from "../../resources/images/Add_Card_Selected.svg";
import cardblack from "../../resources/images/Add_Card_Black.svg";
import deletepurple from "../../resources/images/Delete_Purple.svg";
import visa from "../../resources/images/Add_Card_Black.svg";
import mastercard from "../../resources/images/Mastercard.svg";
import viewcardselected from "../../resources/images/View_Cards_Selected.svg";
import viewcards from "../../resources/images/View_Cards.svg";
import KeyIn from "../../resources/images/Key_In_PED_White.svg";
import Overlay from "../../UI/overlay/overlay.js";
import deletebutton from '../../resources/images/Delete_Purple.svg'
import customer from "../../resources/stubs/customer.json";
import CardDisplay from "./cardDisplay";
import incirclePurple from "../../resources/images/Incircle_Level_purple_small_bttn.svg";
import incircleLarge from "../../resources/images/Incircle_Level_purple_large_bttn.svg";
import cardDisplay from "./cardDisplay";
import CardContainer from './cardContainer'
import {json2xml,xml2json} from '../common/helpers/helpers';
import {startSpinner} from '../common/loading/spinnerAction';

var incircle_purple_large_bttn = require("../../resources/images/Incircle_Level_purple_large_bttn.svg");

class AddCard extends Component {
    constructor(props) {
        console.log("props add-card", props);
        super(props);
        this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;
        this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
        this.totalpoints = parseInt(this.inCircleInfo.total_points);
        this.pointsToNextLvl = this.nextLvl - this.totalpoints;
        this.state = {
            addProfileShown: true,
            addCardImage: addcardselected,
            addCardModal: false,
            maxCardWarning: false,
            cardDetails: '',
            profileInfo: (props.customerDetails.cssId) ? props.customerDetails.profileData : '',
            aurusResponse : '',
            storeClientNo: ''
        };
        this.aurusVars = require("../../resources/aurus/aurusVars")
        this.getCardBinJson = require("../../resources/aurus/GetCardBINRequest.json");
        this.cancellasttxn = require("../../resources/aurus/CancelLastTransRequest.json");
    }

    openCardModals = () => {
        (customer.creditCardInfo.length == 5)
            ? this.setState({maxCardWarning: true})
            : this.setState({addCardModal: true});
        this.addCard(0);
    }

    openOverlayModal = () => {
        return (
            <div>
                <Overlay/>
                <Modal>
                    <AddCardContext
                        done={() => {
                        this.closeOverlayModal();
                    }}
                        addCard={this.addCard}
                    />
                </Modal>
            </div>
        );
    };

    closeOverlayModal = () => {
        this.setState({addCardModal: false});
    };



    // switchToKeyInMode = () =>{

    // }

    // cancelLastTransRequest = () => {
    //     this.cancellasttxn.CancelLastTransRequest.

    // }

    //add_type = 0 for swipe/insert card,add_type = 1 for keyin
    addCard = (add_type) => {
        console.log("add_type", add_type);
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = 0;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = (add_type == 0)
            ? "N"
            : "Y";
        var request = json2xml(this.getCardBinJson);
        this.props.aurusActionInvoker(request)
    }


    addCardDetailsToClienteleInvoker = () => {
        console.log("yaay",this.state.aurusResponse);
        let req = {
            "expiration" : (this.state.aurusResponse.CardExpiryDate) ? (this.state.aurusResponse.CardExpiryDate) : '',
            "cardToken" : (this.state.aurusResponse.CardToken) ? (this.state.aurusResponse.CardToken) : '',
            "responseCode" : (this.state.aurusResponse.ResponseCode) ? (this.state.aurusResponse.ResponseCode) : '',
            "kiNum" : (this.state.aurusResponse.KI) ? (this.state.aurusResponse.KI) : '',
            "lastname":  (this.state.aurusResponse.LastName) ? (this.state.aurusResponse.LastName) : '',
            "cardType":  (this.state.aurusResponse.CardType) ? (this.state.aurusResponse.CardType) : '',
            "hashAcct" : "$AFFFJKKHFRAAADEAaEERTAassssGHJKasKIUJHGQASASRFDAADGHTHASGTTKIKHFFQDIUHIUA",
            "terminalNum" : "01",
            "transNum" : "",
            "hashType" :"",
            "sigonFile" :"" ,
            // "storeClientNo" : (this.state.storeClientNo) ? (this.state.storeClientNo) : ''
            "storeClientNo"  : "0001000161091"
        }
        this.props.addCardDetailsToClienteleActionInvoker(req);
    }



    getStoreClientIdInvoker = () => {
        console.log("in getStoreClientIdInvoker ");
        let clientData = {
            "ClientTypeID": "1000",
            "CFirstName": (this.state.profileInfo.names.length > 0)
                ? (this.state.profileInfo.names[0].firstName)
                : '',
            "CLastName": (this.state.profileInfo.names.length > 0)
                ? (this.state.profileInfo.names[0].lastName)
                : '',
            "CEmail": (this.state.profileInfo.emailAddresses.length > 0)
                ? (this.state.profileInfo.emailAddresses[0].id)
                : '',
            "COtherPhone": '',
            "Address_Ln1": (this.state.profileInfo.physicalAddresses.length > 0)
                ? (this.state.profileInfo.physicalAddresses[0].addressLines[0])
                : '',
            "City": (this.state.profileInfo.physicalAddresses.length > 0)
                ? (this.state.profileInfo.physicalAddresses[0].cityName)
                : '',
            "Zip5": (this.state.profileInfo.physicalAddresses.length > 0)
                ? (this.state.profileInfo.physicalAddresses[0].postalCode)
                : '',
            "CCssNo": this.state.profileInfo.css_id,
            "StoreClientNo": "",
            "Country": (this.state.profileInfo.physicalAddresses.length > 0)
                ? (this.state.profileInfo.physicalAddresses[0].countryName)
                : '',
            "flagByPASS": true,
            "ClienteleUpdateFlag": false
        };
        this.props.getStoreClientIdActionInvoker(clientData);
    }

    getCardDetails = (client_id) => {
        console.log("client id" + client_id);
        let request = {
            //"storeClientNo" : client_id
            "storeClientNo": "0001900075246" // hard coded for testing since i was not getting customer with card details
        }
        this.props.getCardDetailsActionInvoker(request);
    }

    componentDidMount = () => {
        this.props.startSpinner(true);
        this.getStoreClientIdInvoker();
    }

    componentWillReceiveProps = (nextProps) => {
    
        if (nextProps.addCard.response) {
            if (nextProps.addCard.response.storeClientNo && nextProps.addCard.isGetStoreClientId == true) {
                this.setState({storeClientNo :nextProps.addCard.response.storeClientNo },
                    this.getCardDetails(nextProps.addCard.response.storeClientNo));    
            }
            if (nextProps.addCard.response.cardList && nextProps.addCard.isGetCardDetails == true) {
                this.setState({cardDetails: nextProps.addCard.response.cardList});
                this.props.startSpinner(false);
            }
            if(nextProps.addCard.response != '' && nextProps.addCard.response != undefined && nextProps.addCard.isAurusResponse == true){
                var jsonResp =JSON.parse(xml2json(nextProps.addCard.response));
                if(jsonResp.GetCardBINResponse.ResponseCode == "00000"){
                    this.setState({aurusResponse :jsonResp.GetCardBINResponse},function(){
                        this.addCardDetailsToClienteleInvoker();
                    })
                }
            }
        }
    }


    render() {
        const maxCardWarningMessage = () => {
            return ((this.state.maxCardWarning === true)
                ? (
                    <div className="addcard-warning-container">
                        <img src={error} className='addcard-warning-icon'/>
                        <div className='addcard-warning-message'>
                            The maximum allowed cards are on file. To add another card, please remove an
                            existing card first
                        </div>
                    </div>
                )
                : (null));
        };
        return (
            <div>
                <div className="cusdet-container">
                    {this.state.addCardModal
                        ? this.openOverlayModal()
                        : <noscript/>}
                    <div className="cusdet-header">
                        <Header history={this.props.history}/>
                    </div>
                    <div className="cusdet-sub-header">
                        <div className="back-button" onClick={this.navigateBack}>
                            <img className="back-arrow" src={backArrowWhite} alt="navigate-back"/>
                        </div>
                        <div className="divider"/>
                        <div className="customer-name">
                            <div className="customer-name-label">
                                {(this.state.profileInfo != '')
                                    ? ((this.state.profileInfo.names[0].salutation) + ((this.state.profileInfo.names[0].salutation)
                                        ? '.'
                                        : '') + (this.state.profileInfo.names[0].firstName) + ' ' + (this.state.profileInfo.names[0].lastName))
                                    : ''
                                }

                            </div>
                        </div>
                        <div className="divider"/>
                        <div className="incircle-details">
                            <span className="subheader-iconNum">{this.currentlvl}</span>
                            <img
                                className="subheader-circleStatusicon"
                                src={incircle_purple_large_bttn}
                                alt="profile-tab-icon"/>
                            <div className="incircle-description">
                                <div className="incircle-description-level">
                                    CIRCLE {this.currentlvl}
                                </div>
                                <div className="incircle-description-points">
                                    Points to next point card: {this.pointsToNextLvl}
                                </div>
                            </div>
                        </div>
                        <div className="spacer-div"/>
                        <div className="product-search">
                            <img
                                className="product-search-icon"
                                src={productSearchWhite}
                                alt="product-search-icon"/>
                            <div className="product-search-label">Product Search</div>
                        </div>
                        <div className="proceed-to-sale">
                            <img
                                className="proceed-to-sale-icon"
                                src={proceedToSaleWhite}
                                alt="proceed-to-sale-icon"/>
                            <div className="proceed-to-sale-label">Proceed to Sale</div>
                        </div>
                    </div>
                    <Tabheader
                        history={this.props.history}
                        customerName={(this.state.profileInfo)
                        ? (this.state.profileInfo.names[0].firstName)
                        : ''}/>

                    <div className='credit-debit-title-container'>
                        <div className='credit-debit-title-text'>Credit And Debit Cards</div>
                    </div>
                    <CardContainer
                        cardData={
                            (this.state.cardDetails != "" || this.state.cardDetails !=undefined) ? this.state.cardDetails : '' }
                            openCardModals = {this.openCardModals}
                            custFname = {(this.state.profileInfo.names) != '' && (this.state.profileInfo.names) != undefined ? (this.state.profileInfo.names[0].firstName) : ''}
                        /> 
                        {maxCardWarningMessage()}
                    <Footer/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({addCard, customerDetails}) {

    return {addCard, customerDetails};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCardActionInvoker: addCardAction,
        aurusActionInvoker: getAddCardAurusResponse,
        getCardDetailsActionInvoker: getCardDetails,
        getStoreClientIdActionInvoker: getStoreClientId,
        addCardDetailsToClienteleActionInvoker : addCardDetailsToClientele,
        startSpinner: startSpinner
    }, dispatch);

    // return { dispatch, addCardActionInvoker: () => dispatch(addCardAction()) };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
