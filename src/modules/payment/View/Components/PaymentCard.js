/* Dependencies import */
import React, {Component} from 'react';

//Images

export class PaymentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isForm:true,
        }
    }

    componentDidMount() {}

    handleChange = (i, event) => {
        this
            .props.props
            .handleChange(i, event)
    }

    showForm=()=>{
        if(this.state.isForm == true){
            this.setState({isForm:false});
        }
        else{
            this.setState({isForm:true});
        }
    }

    render() {

        

        return (
            <div>
                {this.state.isForm ?
                <div className="payment-card" key={this.props.index} tabIndex={this.props.index} onClick={this.showForm}>
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                            { /*{card.CardType}*/}&nbsp;
                            <span className="payment-asterisk">xxxxxxxx</span>
                            {/*{card.CardToken.slice(-4)} */}
                        </span>
                    </span>
                    
                    <span className="amountLabel">Amount Paid ${this.props.props.values[this.props.index]}</span>
                </div>
                :
                <div className="payment-card" key={this.props.index} tabIndex={this.props.index}>  
                    <span className="type-Number">
                        <span className="payment-cardNumber">
                            { /*{card.CardType}*/}&nbsp;
                            <span className="payment-asterisk">xxxxxxxx</span>
                            {/*{card.CardToken.slice(-4)} */}
                        </span>
                    </span>
                    <form
                        className="amountInputForm"
                        onSubmit={this
                        .props
                        .props
                        .getAmountDue
                        .bind(this, this.props.index)}>
                        <input
                            className="inputAmount"
                            autoFocus
                            onBlur={this.showForm}
                            type="number"
                            min="0.01"
                            step="0.01"
                            key={this.props.props.amountDue}
                            onChange={this
                            .handleChange
                            .bind(this, this.props.index)}
                            defaultValue={this.props.props.amountDue}
                            //value={this.props.value}
                            name="input"></input>
                        <button className="acceptAmountbttn" type="button">ACCEPT AMOUNT</button>
                    </form>
                </div>
                }
            </div>
        );
    }
}