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
import {addCardAction, getAddCardAurusResponse} from "./actions";
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
import {json2xml} from '../common/helpers/helpers';

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
            addProfileShown: true,
            addCardImage: addcardselected,
            addCardModal: false,
            maxCardWarning: false
        };
        this.aurusVars = require("../../resources/aurus/aurusVars")
        this.getCardBinJson = require("../../resources/aurus/GetCardBINRequest.json");
    }
    
    openCardModals = () => {
        this.addCard(0);
        (customer.creditCardInfo.length == 5)
            ? this.setState({maxCardWarning: true})
            : this.setState({addCardModal: true});
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
                    addCard = {this.addCard}
                  />
                </Modal>
            </div>
        );
    };
    
    closeOverlayModal = () => {
        this.setState({addCardModal: false});
    };

    //add_type = 0 for swipe/insert card add_type = 1 for keyin

    addCard = (add_type) => {
        console.log("add_type"+add_type);
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = 0;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = (add_type == 0)
            ? "N"
            : "Y";
        var request = json2xml(this.getCardBinJson);
        this
            .props
            .aurusActionInvoker(request)
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
                                {this.inCircleInfo.salutation}. {this.inCircleInfo.firstname}{" "} {this.inCircleInfo.lastname}
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
                    <Tabheader history={this.props.history}/>

                    <div className='credit-debit-title-container'>
                        <div className='credit-debit-title-text'>Credit And Debit Cards</div>
                    </div>
                    <CardContainer customer={customer} openCardModals={this.openCardModals}/> {maxCardWarningMessage()}
                    <Footer/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({addCard}) {
    return {addCard};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCardActionInvoker: addCardAction,
        aurusActionInvoker: getAddCardAurusResponse
    }, dispatch);

    // return { dispatch, addCardActionInvoker: () => dispatch(addCardAction()) };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
