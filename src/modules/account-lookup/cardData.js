import React, { Component } from 'react';
import './cardData.css';
import {store} from '../../store/store';

export default class CardData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isCurrentSelection: false,
            selectedCardData:{}
        }
    }
    handleOnclick = (obj) => {
        this.setState({ isCurrentSelection: !this.state.isCurrentSelection})
        this.props.selectItem(obj);
    }
   
    render() {
        const itemStyle = {
            boxShadow: '0 0 6px 0 #613b8c',
            backgroundColor: 'rgba(168, 126, 214, 0.05)',
            border: 'solid 2px #a87ed6'
        };
        const IndexStyle = {
            color: "#ffffff",
            backgroundColor: "#a87ed6",
            border: '2px solid #a87ed6'
        };
        let selectedContentStyle = this.state.isCurrentSelection ? itemStyle : null;
        let selectedIndexStyle = this.state.isCurrentSelection ? IndexStyle : null;
        
        return (
            <div className="card-content" style={selectedContentStyle} onClick={() => this.handleOnclick(this.props.cardList)}>
                <div className="card-index-number" style={selectedIndexStyle}>
                    <div className="card-index-number-inside">{this.props.cardList.index}</div>
                </div>
                <div className="card-name-label">
                    <div className="">{this.props.cardList.chargeType}</div>
                </div>
                <div className="card-data-number">
                    <div className="">XXXXXXXX{this.props.cardList.lastFour}</div>
                </div>
            </div>
        )
    }
};
