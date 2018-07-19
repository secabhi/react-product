import React from 'react';
import CardDisplay from './cardDisplay';
import cardicon from '../../resources/images/Add_Card.svg';
import './addCard.css'

export default(props) => {
    
    console.log("props add card container", props);
    const {cardData} = props;


    return (
        <div className='cardlist-container'>
            {cardData != ''
                                ? <div className='cardlist-display'>
                        {cardData.map(function (item) {
                                return (<CardDisplay
                                    // firstname={item.firstname}
                                    // lastname={item.lastname}
                                    cardNumber = {item.lastFour}
                                    cardType = {item.chargeType}
                                    custFname = {props.custFname}
                                />);
                            })}
                            {/* <CardDisplay
                                    // firstname={item.firstname}
                                    // lastname={item.lastname}
                                    cardNumber={cardData.lastFour}
                                    cardType={cardData.chargeType}
                                /> */}
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