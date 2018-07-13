/* Dependencies import */
import React, {Component} from 'react';

export class SFFPaymentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
                <div className="payment-swipedCardData" ref="swipedCards">
                  < div className = "sff-payment-card" > <span className="sff-type-Number">
                    <div className="sff-payment-cardNumber">
                        VISA
                        <span className="payment-asterisk">xxxxxxxx</span>
                        1234 
                    </div>
                </span>
               <form className = "sff-amountInputForm">
                    <input
                        className="sff-inputAmount"
                        autoFocus
                        type="string"
                        min="0.01"
                        step="0.01"
                        onChange={(e) => this.props.props.handleChangeAmount(e, this.props.props.cards.length)}
                        value
                        ={'$ ' + this.props.props.partpayment}>
                    </input> 
                </form>
                    <button className="sff-acceptAmountbttn" onClick={() =>this.props.props.calculateDueAmount(this.props.props.cards.length)}>ACCEPT AMOUNT</button > </div>
               
                </div>
            
        );
    }}