/* Dependencies import */
import React, {Component} from 'react';

//Images

export class PaymentCardTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
           inputClassName: "amountInputForm hide",
           labelClassName: "amountLabel"
        }
    }

    componentDidMount() {}

    handleChange = (i, event) => {
        this
            .props.props
            .handleChange(i, event)
    }

    setInactive=(index)=>{
        //this.setState({inputClassName:"amountInputForm hide", labelClassName: "amountLabel"})
    }

    setActive=()=>{
        this.setState({inputClassName:"amountInputForm", labelClassName: "amountLabel hide"})
    }
    render() {
        return (
            <div>
                <div className="payment-card" onClick={this.setActive}>  
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                          
                            { <span className="payment-asterisk">xxxxxxxx</span> }
                        </span>
                    </span>
                    <form
                        className={this.state.inputClassName}
                        onSubmit={this
                        .props
                        .props
                        .updateCartStatus}
                        >
                        <input
                            className="inputAmount"
                            autoFocus
                            ref={input => input && input.focus()}
                            type="number"
                            min="0.01"
                            step="0.01"
                            key={this.props.props.amountDue}
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}
                            name="input"></input>
                        <button className="acceptAmountbttn" type="button">ACCEPT AMOUNT</button>
                    </form>
                    <span className="amount_paid">Amount Paid ${this.props.props.values[this.props.index]}</span>
                </div>

                {this.props.props.cards
                    .map((card, index) => (
                <div className="payment-card" onBlur={()=>this.setInactive(this.props.index)}  key={this.props.index} tabIndex={this.props.index} onClick={this.setActive}>  
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                            {card.CardType}&nbsp;
                            {/* <span className="payment-asterisk">xxxxxxxx</span> */}
                            {card.CardToken.slice(-4)}
                        </span>
                    </span>
                    <form
                        className={this.state.inputClassName}
                        onSubmit={this
                        .props
                        .props
                        .getAmountDue
                        .bind(this, this.props.index)}
                        >
                        <input
                            className="inputAmount"
                            autoFocus
                            ref={input => input && input.focus()}
                            type="number"
                            min="0.01"
                            step="0.01"
                            key={this.props.props.amountDue}
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}
                            name="input"></input>
                        <button className="acceptAmountbttn" type="button">ACCEPT AMOUNT</button>
                    </form>
                    <span className={this.state.labelClassName}>Amount Paid ${this.props.props.values[this.props.index]}</span>
                </div>
                    ))}
            </div>
        );
    }
}