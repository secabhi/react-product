import React from 'react';
import './addCard.css'
export default(props) => {
    const {cardNumber, custFname, lastName, cardType} = props;
    return (
        <div className = 'card-display-container'>
            <div className = 'card-display-customername-area'>
                <div className = 'card-display-customername'>{custFname}</div> 
            </div>
            <div className = 'card-display-cardnumberarea'>
                <div className = 'card-display-cardstars'>**** **** ****</div>
                <div className = 'card-display-cardnumber'>{cardNumber}</div>
            </div>
            <div className = 'card-display-cardtypearea'>
                <div className = 'card-display-cardtype'>{cardType}</div>
            </div>
        </div>
    )
}