// JavaScript source code
import React, {Component} from "react";
import Modal from "../../UI/modal/modal.js";

import "./addCard.css";

import backArrowWhite from "../../resources/images/Back_White.svg";
import productSearchWhite from "../../resources/images/Product_Search_White.svg";
import proceedToSaleWhite from "../../resources/images/Sale_White_Filled.svg";
import AddCardContext from "./addCardContext/addCardContext.js";

import cardicon from '../../resources/images/Add_Card.svg';
import error from '../../resources/images/Error_Red.svg'
import {addCardAction, getAddCardAurusResponse, getCardDetails, getStoreClientId,addCardDetailsToClientele,submitRequestToAurus} from "./actions";
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
import Overlay from "../../UI/overlay/overlay.js";
import deletebutton from '../../resources/images/Delete_Purple.svg'
import customer from "../../resources/stubs/customer.json";
import CardDisplay from "./cardDisplay";
import incirclePurple from "../../resources/images/Incircle_Level_purple_small_bttn.svg";
import incircleLarge from "../../resources/images/Incircle_Level_purple_large_bttn.svg";
import successicon from "../../resources/images/Success.svg"
import cardDisplay from "./cardDisplay";
import CardContainer from './cardContainer'
import {json2xml,xml2json} from '../common/helpers/helpers';
import {startSpinner} from '../common/loading/spinnerAction';
import {AddCardResultDisplay} from './AddCardResultDisplay/AddCardResultDisplay'
import  warning from '../../resources/images/Warning.svg'
import { goToSalesPage } from '../sale/SaleAction.js';
import { getAurusResponse} from '../payment/Controller/paymentActions'
import {AddCardModal} from '../add-card/View/Components/Modals/AddCardModal/AddCardModal'
import {AddCardResultModal} from '../add-card/View/Components/Modals/AddCardModal/AddCardResultModal'


var incircle_purple_large_bttn = require("../../resources/images/Incircle_Level_purple_large_bttn.svg");

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.inCircleInfo = require("../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;
        this.nextLvl = parseInt(this.data[parseInt(this.currentlvl) - 1].nextLvl);
        this.totalpoints = parseInt(this.inCircleInfo.total_points);
        this.pointsToNextLvl = this.nextLvl - this.totalpoints;
        this.state = {
                addProfileShown : true,
                addCardImage : addcardselected,
                addCardModal : false,
                maxCardWarning : false,
                cardDetails : '',
                profileInfo : (props.customerDetails.clientNumber) ? props.customerDetails : '',
                aurusResponse : '',
                isCardAdded : false,
                addCardResultModal : false,
        };
        this.aurusVars = require("../../resources/aurus/aurusVars")
        this.getCardBinJson = require("../../resources/aurus/GetCardBINRequest.json");
        this.CloseTran = require("../../resources/aurus/CloseTran.json");
        this.bypass =  require("../../resources/aurus/BypassScreen.json");
        const addCardScuccessMessage = "The card has been added.";
        const addCardFailMessage = "The card has been added.";
    }

    componentDidMount = () => {
        try{
            if(this.props.customerDetails){
                this.props.startSpinner(true);   
                this.getCardDetails(this.props.customerDetails.clientNumber); 
            }
        }
        catch(err){
            console.log("AddCard: card details fetch failed",err);
        }  
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("addCard>>>>>>>>nextProps",nextProps);
            if(nextProps.addCard.viewCarDetailsResp && nextProps.addCard.viewCarDetailsResp != '' &&  nextProps.addCard.viewCarDetailsResp != undefined && nextProps.addCard.viewCarDetailsResp != this.props.addCard.viewCarDetailsResp ){
                this.setState({ cardDetails: nextProps.addCard.viewCarDetailsResp.cardList});
                this.props.startSpinner(false);
            }
     
            if(nextProps.addCard.getCardBinResp && nextProps.addCard.getCardBinResp != '' && nextProps.addCard.getCardBinResp != undefined && nextProps.addCard.getCardBinResp != this.props.addCard.getCardBinResp){
                this.processGetCardBinResponse(nextProps.addCard.getCardBinResp);
            }

            if(nextProps.addCard.bypassResp && nextProps.addCard.bypassResp != '' && nextProps.addCard.bypassResp != undefined ){
                this.processBypassResp(nextProps.addCard.bypassResp);
            }
            
            if(nextProps.addCard.closeTransactionResp != "" && nextProps.addCard.closeTransactionResp != "" && nextProps.addCard.closeTransactionResp != this.props.addCard.closeTransactionResp){
                this.processCloseTransactionResp(nextProps.addCard.closeTransactionResp);
                
            }

            if(nextProps.addCard.response != '' && nextProps.addCard.response != undefined && nextProps.addCard.isAddCardClientele == true){
                this.setState({
                    isCardAdded : true,
                    addCardResultModal : true   
                }); 
                
                // () => { 
                //         var closetxnreq = json2xml(this.CloseTran);
                //         this.props.submitRequestToAurusInvoker(closetxnreq,"CLOSETRANSACTION");}
                    
            }

            if(nextProps.addCard.response != '' && nextProps.addCard.response != undefined && nextProps.addCard.isAddCardClienteleFail == true ){
                this.setState({
                    isCardAdded : false,
                    addCardResultModal : true
                } );
                
                // () => { 
                //     var closetxnreq = json2xml(this.CloseTran);
                //     this.props.aurusActionInvoker(closetxnreq,"CLOSETRANSACTION");}
               
            }

         
    }

    processBypassResp = (data) =>{
        console.log("AddCard: processBypassResp response returned",data);
        clearTimeout(this.timer);
        //data = JSON.parse(data);
        try{
            if (data.ByPassScreenResponse.ResponseCode == "00000") {
                //  var closetxnreq = json2xml(this.CloseTran);
                //  this.props.aurusActionInvoker(closetxnreq,"CLOSETRANSACTION");
                 this.addCard("Y");
                 this.timer = setTimeout(function(){ console.log("AddCard : CLOSETRANSACTION timeout"); }, 45000);
             }else{
                console.log("AddCard: processBypassResp returned error code ",data.ByPassScreenResponse.ResponseCode)
             }  
        }catch(err){
            console.log("AddCard: processBypassResp Catch block",err)
        }
    }

    processGetCardBinResponse = (data) => {
        console.log("AddCard: processGetCardBinResponse response returned",data)
        clearTimeout(this.timer);
        //data = JSON.parse(data);
        try{
            if (data.GetCardBINResponse.ResponseCode == "00000") {
            this.setState({
                addCardModal : false,
                aurusResponse :data.GetCardBINResponse
            },function(){
                this.addCardDetailsToClienteleInvoker();
            })
            }else{
                this.setState({ 
                    addCardModal : false 
                },function(){
                    this.openAddCardResultModal();
                })
            }
        }catch(err){
            console.log("AddCard: processGetCardBinResponse catch block",err)
        }   
    }

    processCloseTransactionResp = (data) =>{
        data = JSON.parse(data);
        clearTimeout(this.timer);
        try{
           if(data.CloseTransactionResponse.ResponseCode == "00000"){
               this.addCard("Y");
           }
           else{
             console.log("AddCard: processCloseTransactionResp error response",data.CloseTransactionResponse.ResponseCode)
           }
        }catch(err){
            console.log("AddCard: processCloseTransactionResp catch block",err)
        }
    }

    cancelSwipeMode = () => {
            clearTimeout(this.timer);
            var bypassrequest = json2xml(this.bypass);
            this.props.aurusActionInvoker(bypassrequest,"BYPASS");
            this.timer = setTimeout(function(){ console.log("AddCard : cancelSwipeMode timeout"); }, 35000);
    }

    openCardModals = () => {
        if(this.state.cardDetails.length == 4){
            this.setState({
                maxCardWarning : true
            })
        }
        else{
            this.setState({
                addCardModal : true   
            },function(){
              this.addCard("N");
            })
        }
    }


    closeOverlayModal = () => {
        this.setState({addCardModal: false});
    }

    //entrymode = N for swipe: entrymode= Y for keyin

    addCard = (entrymode) => {
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = 0;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = entrymode;
        var request = json2xml(this.getCardBinJson);
        this.props.aurusActionInvoker(request,"GETCARDBIN");
        console.log("AddCard:GetCardBin Request ",request) ;
        this.timer = setTimeout(function(){ console.log("add card timeout"); }, 450000);
    }

    addCardDetailsToClienteleInvoker = () => {
        let req = {
            "expiration" : (this.state.aurusResponse.CardExpiryDate[0]) ? (this.state.aurusResponse.CardExpiryDate[0]) : '',
            "cardToken" : (this.state.aurusResponse.CardToken[0]) ? (this.state.aurusResponse.CardToken[0]) : '',
            "responseCode" : (this.state.aurusResponse.ResponseCode[0]) ? (this.state.aurusResponse.ResponseCode[0]) : '',
            "kiNum" : (this.state.aurusResponse.KI[0]) ? (this.state.aurusResponse.KI[0]) : '',
            "lastname" : (this.state.aurusResponse.LastName[0]) ? ((this.state.aurusResponse.LastName[0]).trim()) : '',
            "cardType" :  (this.state.aurusResponse.CardType[0]) ? (this.state.aurusResponse.CardType[0]) : '',
            "hashAcct" : "",
            "transNum" : "",
            "hashType" : "",
            "sigonFile" : "" ,
            "storeClientNo" : (this.props.customerDetails.clientNumber) ? this.props.customerDetails.clientNumber : ''
        }
        this.props.addCardDetailsToClienteleActionInvoker(req);
    }

   
    getCardDetails = (client_id) => {
        
        let request = {
            "storeClientNo" : client_id
        }

        if(this.state.addCardResultModal == true && this.state.isCardAdded == true){
            this.setState({addCardResultModal : false},
            function(){
                // this.props.startSpinner(true);
                this.props.getCardDetailsActionInvoker(request);
            })
        }
        else if(this.state.addCardResultModal == true && this.state.isCardAdded == false){
            this.setState({addCardResultModal : false})
        }
        else{
            this.props.getCardDetailsActionInvoker(request);
        }
        
    }

    // openAddCardResultModal = () => {
    //     return(
    //         <div>
    //              <Overlay/>
    //              <Modal open = {()=>{}}  little showCloseIcon='false'  classNames={{"modal": "addCard-result-modal-container"}}>                   
    //                 <AddCardResultDisplay
    //                     icon = { this.state.isCardAdded ? successicon : warning }
    //                     message = {this.state.isCardAdded ? "The card has been added." : "The card has not been added."} 
    //                     getCardDetails = {this.getCardDetails}
    //                     storeClientNo = {this.state.storeClientNo}
    //                 />
    //             </Modal>
    //         </div>)
    // }

    navigateToCustomerSearch = () => {
        this.props.history.push("/customer-search");
    };
  
    navigateToSale = () => {
        this.props.goToSalesPage(false, { 
            cust_cssId: this.props.customerDetails.profileData.names[0].css_id,
            salutation:(this.state.profileInfo.names && this.state.profileInfo.names.length > 0 && this.state.profileInfo.names[0].salutation !== '') ? this.state.profileInfo.names[0].salutation : '',
            firstname: (this.state.profileInfo.names.length > 0)
                        ? (this.state.profileInfo.names[0].firstName)
                        : '',
            lastname: (this.state.profileInfo.names.length > 0)
                    ? (this.state.profileInfo.names[0].lastName)
                    : '',
            address1: (this.state.profileInfo.physicalAddresses && this.state.profileInfo.physicalAddresses.length > 0 && this.state.profileInfo.physicalAddresses[0].addressLines.length > 0) ? this.state.profileInfo.physicalAddresses[0].addressLines[0] : '',
            city: (this.state.profileInfo.physicalAddresses.length > 0)
            ? (this.state.profileInfo.physicalAddresses[0].cityName)
            : '',
            state: (this.state.profileInfo.physicalAddresses && this.state.profileInfo.physicalAddresses.length > 0) ? this.state.profileInfo.physicalAddresses[0].state : '',
            zip: (this.state.profileInfo.physicalAddresses.length > 0)
                    ? (this.state.profileInfo.physicalAddresses[0].postalCode)
                    : '',
            address2: (this.state.profileInfo.physicalAddresses && this.state.profileInfo.physicalAddresses.length > 0 && this.state.profileInfo.physicalAddresses[0].addressLines.length > 1) ? this.state.profileInfo.physicalAddresses[0].addressLines[1] : '',
            email:(this.state.profileInfo.emailAddresses && this.state.profileInfo.emailAddresses.length > 0) ? this.state.profileInfo.emailAddresses[0].id : '',
            mobile:(this.state.profileInfo.phoneNumbers && this.state.profileInfo.phoneNumbers.length > 0) ? this.state.profileInfo.phoneNumbers[0].rawValue : '',
            otherMobile: (this.state.profileInfo.phoneNumbers && this.state.profileInfo.phoneNumbers.length > 1) ? this.state.profileInfo.phoneNumbers[1].rawValue : ''}
        );
            this.props.history.push('/sale')
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

    if( this.props.customerSearch.incircleData){
    var  maxIncircleVal =  Math.max(
            this.props.customerSearch.incircleData.data.lyBenefitLevelCode,
            this.props.customerSearch.incircleData.data.lyEarnedlevelCode,
            this.props.customerSearch.incircleData.data.tyBenefitlevelCode,
            this.props.customerSearch.incircleData.data.tyEarnedlevelCode
        )
    }
    else {
        var  maxIncircleVal = ''
    }

    if(this.props.customerSearch && this.props.customerSearch.incircleData){
        var nextPointCardVal = this.props.customerSearch.incircleData.data.pointsAwayToNextPointCard
    }
    else{
        var nextPointCardVal = ''
    }
    return (
            <div>
                <div className="cusdet-container">
                    <div className="cusdet-header">
                        <Header history={this.props.history}/>
                    </div>
                    <div className="cusdet-sub-header">
                        <div className="back-button" onClick={this.navigateToCustomerSearch}>
                            <img className="back-arrow" src={backArrowWhite} alt="navigate-back"/>
                        </div>
                        <div className="divider"/>
                        <div className="customer-name">
                            <div className="customer-name-label">
                                {(this.state.profileInfo != '')
                                    ? ((this.props.customerDetails.salutation) + ((this.props.customerDetails.salutation)
                                        ? '.'
                                        : '') + (this.props.customerDetails.firstName) + ' ' + (this.props.customerDetails.lastName))
                                    : ''
                                }
                            </div>
                        </div>
                        {
                            maxIncircleVal>0  ? <div>
                            <div className="divider"/>
                        <div className="incircle-details">
                            <span className="subheader-iconNum">{maxIncircleVal}</span>
                            <img
                                className="subheader-circleStatusicon"
                                src={incircle_purple_large_bttn}
                                alt="profile-tab-icon"/>
                            <div className="incircle-description">
                                <div className="incircle-description-level">
                                    CIRCLE {maxIncircleVal}
                                </div>
                                <div className="incircle-description-points">
                                    Points to next point card: {nextPointCardVal}
                                </div>
                            </div>
                        </div>
                        </div> : <div></div> 
                        }
                     
                        <div className="spacer-div"/>
                        <div className="product-search">
                            <img
                                className="product-search-icon"
                                src={productSearchWhite}
                                alt="product-search-icon"/>
                            <div className="product-search-label">Product Search</div>
                        </div>
                        <div className="proceed-to-sale" onClick={()=>this.navigateToSale()}>
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
                        ? (this.props.customerDetails.firstName)
                        : ''}/>

                    <div className='credit-debit-title-container'>
                        <div className='credit-debit-title-text'>Credit And Debit Cards</div>
                    </div>
                    <CardContainer
                        cardData={
                            (this.state.cardDetails != "" || this.state.cardDetails !=undefined) ? this.state.cardDetails : '' }
                            openCardModals = {this.openCardModals}
                            custFname = {(this.props.customerDetails.firstName) != '' && (this.props.customerDetails.firstName) != undefined ? ((this.props.customerDetails.firstName).trim()) : ''}
                        /> 
                        {maxCardWarningMessage()}
                    <Footer/>
                </div>
                <AddCardModal
                    little showCloseIcon={false}
                    addCardModal = {this.state.addCardModal}
                    done = {() => {this.closeOverlayModal()}}
                    cancelSwipeMode = {this.cancelSwipeMode}>
                </AddCardModal>
                <AddCardResultModal
                    addCardResultModal = {this.state.addCardResultModal}
                    icon = { this.state.isCardAdded ? successicon : warning }
                    message = {this.state.isCardAdded ? "The card has been added." : "The card has not been added."} 
                    getCardDetails = {this.getCardDetails}
                    storeClientNo = {this.state.storeClientNo}
                ></AddCardResultModal>
              </div>
          );
    }
}

function mapStateToProps({addCard, customerDetails, customerSearch}) {

    console.log("customerDetails in addcard props",customerDetails);
    return {addCard, customerDetails, customerSearch};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        aurusActionInvoker : getAurusResponse,
        getCardDetailsActionInvoker : getCardDetails,
        getStoreClientIdActionInvoker : getStoreClientId,
        addCardDetailsToClienteleActionInvoker : addCardDetailsToClientele,
        startSpinner : startSpinner,
        goToSalesPage: goToSalesPage,
        submitRequestToAurusInvoker : submitRequestToAurus
      },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
