import React from 'react';
import CardDisplay from './cardDisplay';
import cardicon from '../../resources/images/Add_Card.svg';
import './addCard.css'

export default(props) => {
    console.log("props", props);
    const {customer} = props;


    return (
        <div className='cardlist-container'>
            {customer.creditCardInfo.length > 0
                ? <div className='cardlist-display'>
                        {customer
                            .creditCardInfo
                            .map(function (item) {
                                return (<CardDisplay
                                    firstname={item.firstname}
                                    lastname={item.lastname}
                                    cardNumber={item.number}
                                    cardType={item.type}/>);
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