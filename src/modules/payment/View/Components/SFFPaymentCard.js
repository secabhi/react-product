/* Dependencies import */
import React, {Component} from 'react';

export class SFFPaymentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    handleChange = (i, event) => {
        this
            .props.props
            .handleChange(i, event)
    }

    setInactive = (index) => {
        var formElements = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-cont" +
                "ainer>div>div:not([row='" + index + "'])>form")
        var labelElements = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-cont" +
                "ainer>div>div:not([row='" + index + "'])>span.amountLabel")
        for (var x = 0; x < formElements.length; x++) {
            formElements[x].className = "amountInputForm hide"
            labelElements[x].className = "amountLabel"
        }
    }

    setActive = (index) => {
        var formElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-cont" +
                "ainer>div>div[row='" + index + "']>form")
        formElement[0].className = "amountInputForm"
        var inputElement = document.querySelector("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-cont" +
                "ainer>div>div[row='" + index + "']>form>input")
        inputElement.focus();
        var labelElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-cont" +
                "ainer>div>div[row='" + index + "']>span.amountLabel")
        labelElement[0].className = "amountLabel hide"
    }
    render() {
        return (
            <div className="payment-swipedCardData" ref="swipedCards">
                <div
                    className={"sff-payment-card " + this.props.index}
                    key={this.props.index}
                    tabIndex="0"
                    row={this.props.index}
                    onClick={() => this.setActive(this.props.index)}
                    onBlur={() => this.setInactive(this.props.index)}>
                    <span className="sff-type-Number">
                        <div className="sff-payment-cardNumber">
                            {this.props.card
                                ? this.props.card.CardType + " " + this
                                    .props
                                    .card
                                    .CardToken
                                    .slice(-4)
                                : <span className="payment-asterisk">xxxxxxxx</span>
}
                        </div>
                    </span>
                    <form
                        className="sff-amountInputForm hide"
                        onSubmit={this
                        .props
                        .props
                        .getAmountDue
                        .bind(this, this.props.index)}>
                        <input
                            className="sff-inputAmount"
                            autoFocus
                            type="string"
                            min="0.01"
                            step="0.01"
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}></input>
                    </form>
                    <button className="sff-acceptAmountbttn" type="submit">ACCEPT AMOUNT</button >
                </div>

            </div>

        );
    }
}