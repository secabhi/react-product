/* Dependencies import */
import React, {Component} from 'react';

//Images

export class PaymentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}

    handleChange = (i, event) => {
        this
            .props.props
            .handleChange(i, event)
    }

    setInactive=(index)=>{
        var formElements=document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div:not([row="+"'"+index+"'"+"])>form")
        var labelElements = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div:not([row="+"'"+index+"'"+"])>span.amountLabel")
        for(var x=0; x<formElements.length; x++){
            formElements[x].className="amountInputForm hide"
            labelElements[x].className="amountLabel"
        }
    }

    setActive=(index)=>{
        var formElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div[row="+"'"+index+"'"+"]>form")
        formElement[0].className="amountInputForm"
        var inputElement = document.querySelector("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div[row="+"'"+index+"'"+"]>form>input")
        inputElement.focus();
        var labelElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div[row="+"'"+index+"'"+"]>span.amountLabel")
        labelElement[0].className="amountLabel hide"
    }
    render() {
        return (
            <div>
                <div className={"payment-card " + this.props.index} key={this.props.index} tabIndex="0" row={this.props.index} onClick={()=>this.setActive(this.props.index)} onBlur={()=>this.setInactive(this.props.index)}> 
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                            {this.props.card?this.props.card.CardType+" "+ this.props.card.CardToken:
                             <span className="payment-asterisk">XXXXXXXXXXXXXXXX</span>
                            }
                        </span>
                    </span>
                    <form
                        className="amountInputForm"
                        onSubmit={(e)=>this
                        .props
                        .props
                        .getAmountDue(e, this.props.index, "F")}
                        >
                        <input
                            className="inputAmount"
                            autoFocus
                            ref={input => input && input.focus()}
                            type="number"
                            min="0.01"
                            step="0.01"
                            //key={this.props.props.amountDue}
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}
                            name="input"></input>
                        <button className="acceptAmountbttn" type="submit">ACCEPT AMOUNT</button>
                    </form>
                    <span className="amountLabel hide">Amount Paid ${this.props.props.paidValues[this.props.props.currentCard]}</span>
                </div>
            </div>
        );
    }
}