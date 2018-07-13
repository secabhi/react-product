/* Dependencies import */
import React, {Component} from 'react';


export class SFFCardList extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (      
             this.props.props.cards.length > 0? (
                    <div className="ssf-swipedCardsList">
                        <div className="ssf-">
                            {this.props.props.cards.map((card, index) => {
                                    return (
                                        <div className="ssf-swipedCardData">
                                            <span className="sff-type-Number">
                                                <div className="ssf-swipedCardName">
                                                    {card.type.toUpperCase()}
                                                    <span className="payment-asterisk">xxxxxxxx</span>
                                                    {card.number.slice(-4)}
                                                </div>
                                                <div className="sff-Amount-Paid">
                                                    <span >Amount Paid</span>
                                                    <span className="sff-Amount-Paid-Value">{' $ ' + this.props.props.values[index]}</span>
                                                </div>
                                            </span>
                                        </div>
                                    )
                                })}

                        </div>

                    </div>
                )
                : ''
            );
        }}