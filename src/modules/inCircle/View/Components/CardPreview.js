/* Dependencies import */
import React, {Component} from 'react';

//Images
import viewcards from "../../../../resources/images/View_Cards.svg";

export class CardPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        
    }

    componentDidMount() {}

    render()
    {
        return (
            <div className="hasCard-container">
                <div className="card-column">
                    <div className="pointCard-label">
                        <span className="pointCard-label-text">Point Cards</span>
                        <span className="pointCard-icon">
                            <span className="pointCard-icon-text">
                                {this.props.props.numofPointCards.toLocaleString()}
                            </span>
                        </span>
                        <span className="cardPreview-pointcardBalance">
                            ${this
                                .props.props
                                .pointCardBalance.toLocaleString()
                                }
                        </span>
                    </div>
                    <div className="perkCard-label">
                        <span className="perkCard-label-text">Perk Cards</span>
                        <span className="perkCard-icon">
                            <span className="perkCard-icon-text">{this.props.props.numofPerkCards}</span>
                        </span>
                        <span className="cardPreview-perkcardBalance">
                            ${this
                                .props.props
                                .perkCardBalance.toLocaleString()
                                }
                        </span>
                    </div>
                </div>
                <div className="view-cards-container">
                    <div className="view-cards-label">
                        <img
                            src={viewcards}
                            className="view-cards-icon"
                            alt="view-cards-icon"
                            onClick={this.props.props.viewCards}/>View Cards
                    </div>
                </div>
            </div>
        );

    }
}