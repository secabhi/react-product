import React from 'react';
import CardDisplay from './cardDisplay';
import cardicon from '../../resources/images/Add_Card.svg';
import './addCard.css'

export default(props) => {
    const {cardData} = props;

    return (
        <div className='cardlist-container'>
            {cardData != ''
                                ? <div className='cardlist-display'>
                        {cardData.map(function (item) {
                                return (<CardDisplay
                                    cardNumber = {item.lastFour}
                                    cardType = {item.chargeType}
                                    custFname = { (props.custFname).toUpperCase()}
                                />);
                            })}
                        <div className='add-card-button-section' onClick={props.openCardModals}>
                            <div className='add-card-icon-section'>
                                <img src={cardicon} className='addcard-icon' alt='addcard'/>
                            </div>
                            < div className='add-card-label-section'>
                                <div className='addcard-label'>Add Card</div>
                            </div>
                        </div>
                    </div>
                : (
                    <div className='add-card-button-section' onClick={props.openCardModals}>
                        <div className='add-card-icon-section'>
                            <img src={cardicon} className='addcard-icon' alt='addcard'/>
                        </div>
                        < div className='add-card-label-section'>
                            <div className='addcard-label'>Add Card</div>
                        </div>
                    </div>
                )
}
        </div>
    )
}