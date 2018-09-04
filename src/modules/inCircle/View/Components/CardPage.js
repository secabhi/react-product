/* Dependencies import */
import React, {Component} from 'react';

//CSS
import "../Styles/cardPage.css";

//Images
import backArrowGrey from "../../../../resources/images/Back_Tab.svg";

export class CardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
            <div className="cusdet-incircle-tab-content">
                <div className="cardPage-content-left-part">
                    <div className="content-left-container">
                        <div className="backBtn" onClick={this.props.props.goBack}>
                            <img className="back-arrow" src={backArrowGrey} alt="navigate-back"/>
                        </div>
                        <div className="cardPagecontent-row1">
                            <div className="inCircle-cards-header">
                                <span>
                                    <b>IN</b>CIRCLE Cards
                                </span>
                            </div>
                            <div className="cardPagetabbed">
                                <div className="pointCard-border">
                                    <div className="cardPagepointCard-label">
                                        <span className="cardPagepointCard-label-text">
                                            Point Cards
                                        </span>
                                        <span className="cardPagepointCard-icon">
                                            <span className="cardPage-pointCard-icon-text">
                                                {this.props.props.numofPointCards}
                                            </span>
                                        </span>
                                        <span className="totalpointcardBalance">
                                            ${this
                                                .props
                                                .props
                                                .pointCardBalance
                                                .toLocaleString()}
                                        </span>
                                    </div>

                                    {this.props.props.hasCards
                                        ? this
                                            .props
                                            .props
                                            .gcData.filter(value=>value.cardType==="InCircle Reward")
                                            .map((card, index) => (
                                                <div className="pointCards" key={index}>
                                                    <div className="cardColumnContainer">
                                                        <div className="column1">
                                                            <div className="pointcardBorder">
                                                                <div className="pointcardTitle">THE POINT CARD</div>
                                                                <div className="pointcardBalance">
                                                                    ${parseInt(card.initialBal).toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div className="expireDate">
                                                                Expires {card.expDate}
                                                            </div>
                                                        </div>
                                                        <div className="column2">
                                                            <div className="cardInfo">
                                                                Card #
                                                                <p>{card.cardNumber}</p>
                                                                <p className="initialBalanceLabel">
                                                                    Initial Balance:
                                                                    <span className="initialBalance">
                                                                        ${parseInt(card.initialBal).toLocaleString()}
                                                                    </span>
                                                                </p>
                                                                <p className="currentBalanceLabel">
                                                                    Current Balance:
                                                                    <span className="currentBalance">
                                                                        ${parseInt(card.currentBal).toLocaleString()}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="acctInfo">
                                                                Acct {card.acctNum}&nbsp;| CIN {card.CIN}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cardPage-content-right-part">
                    <div className="cardPagecontent-row1">
                        <div className="inCircle-cards-header"/>
                        <div className="cardPagetabbed">
                            <div className="cardPageperkCard-label">
                                <span className="cardPageperkCard-label-text">Perk Cards</span>
                                <span className="cardPageperkCard-icon">
                                    <span className="cardPage-perkCard-icon-text">
                                        {this.props.props.numofPerkCards}
                                    </span>
                                </span>
                                <span className="totalperkcardBalance">
                                    ${this
                                        .props
                                        .props
                                        .perkCardBalance
                                        .toLocaleString()}
                                </span>
                            </div>
                            {this.props.props.hasCards
                                ? this
                                    .props
                                    .props
                                    .gcData.filter(value=>value.cardType==="NM Earned Perk"||value.cardType==="BG Earned Perk")
                                    .map((card, index) => (
                                        <div className="perkCards" key={index}>
                                            <div className="cardColumnContainer">
                                                <div className="column1">
                                                    <div className="perkcardBorder">
                                                        <div className="perkcardTitle">THE PERK CARD</div>
                                                        <div className="perkcardBalance">
                                                            ${parseInt(card.initialBal).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="expireDate">Expires {card.expDate}</div>
                                                </div>
                                                <div className="column2">
                                                    <div className="cardInfo">
                                                        Card #
                                                        <p>{card.cardNumber}</p>
                                                        <p className="initialBalanceLabel">
                                                            Initial Balance:
                                                            <span className="initialBalance">
                                                                ${parseInt(card.initialBal).toLocaleString()}
                                                            </span>
                                                        </p>
                                                        <p className="currentBalanceLabel">
                                                            Current Balance:
                                                            <span className="currentBalance">
                                                                ${parseInt(card.currentBal).toLocaleString()}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="acctInfo">
                                                        Acct {card.acctNum}&nbsp;| CIN {card.CIN}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}