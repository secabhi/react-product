/* Dependencies import */
import React, {Component} from 'react';
import Input from 'material-ui/TextField';
import CancelIcon from '../../../../resources/images/Cross_Green.png'

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
        var inputElement = document.querySelector("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div[row="+"'"+index+"'"+"]>form>.inputAmount input")
        inputElement.focus();
        var labelElement = document.querySelectorAll("div>div>div.payment-page-content>div.payment-left-content>div.payment-cards-container>div>div[row="+"'"+index+"'"+"]>span.amountLabel")
        labelElement[0].className="amountLabel hide"
    }
    render() {
        console.log('cards in paymentcards'+JSON.stringify(this.props.otherCards));
        return (
            <div>
                {this.props.otherCards?
                <div className="payment-card thirparty-card" key={this.props.index} tabIndex="0" row={this.props.index} onClick={this.props.props.paidValues[this.props.index]!==undefined?console.log(this.props.props.paidValues[this.props.index]):()=>this.setActive(this.props.index)} onBlur={this.props.props.paidValues[this.props.index]?()=>this.setInactive(this.props.index):""}> 
                <span className="type-Number">
                    <span className="payment-cardNumber">
                        {this.props.card?this.props.card.chargeType+" XXXXXXXXXXXX"+ this.props.card.lastFour:
                         <span className="payment-asterisk">XXXXXXXXXXXX</span>
                        }
                    </span>
                </span>
                <form
                    className={this.props.props.paidValues[this.props.index]?"amountInputForm hide":"amountInputForm"}
                    onSubmit={this
                        .props
                        .props
                        .getAmountDue
                        .bind(this, this.props.index)}
                    >
                    <Input
                        className="inputAmount"
                        autoFocus
                        type="number"
                        min="0.01"
                        step="0.01"
                        key={this.props.index}
                        onChange={this
                        .handleChange
                        .bind(this, this.props.index)}
                        defaultValue={this.props.props.amountDue}
                        name="input"/>
                    <button className="acceptAmountbttn" type="submit">ACCEPT AMOUNT</button>
                </form>
                <span className={this.props.props.paidValues[this.props.index]?"amountLabel":"amountLabel hide"}>Amount Paid ${this.props.props.paidValues[this.props.index]}</span>
            </div>:
                <div className="payment-card" key={this.props.index} tabIndex="0" row={this.props.index} onClick={this.props.props.paidValues[this.props.index]!==undefined?console.log(this.props.props.paidValues[this.props.index]):()=>this.setActive(this.props.index)} onBlur={this.props.props.paidValues[this.props.index]?()=>this.setInactive(this.props.index):""}> 
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                            {this.props.card?this.props.card.CardType+" "+ this.props.card.CardToken:
                             <span className="payment-asterisk">XXX 000000XXXXXX0000</span>
                            }
                        </span>
                    </span>
                    <form
                        className={this.props.props.paidValues[this.props.index]?"amountInputForm hide":"amountInputForm"}
                        onSubmit={this
                            .props
                            .props
                            .getAmountDue
                            .bind(this, this.props.index)}
                        >
                        <span class="currencyinput">$</span>
                        <Input
                            className="inputAmount"
                            autoFocus
                            type="number"
                            min="0.01"
                            step="0.01"
                            key={this.props.index}
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}
                            name="input"/>
                        <button className="acceptAmountbttn" type="submit">ACCEPT AMOUNT</button>
                        <button className="cancelAmountbttn" onClick={this.props.props.cancelPay.bind(this, this.props.index)} ><img className="cancelIcon" src={CancelIcon}/>CANCEL</button>

                    </form>
                    <span className={this.props.props.paidValues[this.props.index]?"amountLabel":"amountLabel hide"}>Amount Paid ${this.props.props.paidValues[this.props.index]}</span>
                </div>}
            </div>
        );
    }
}