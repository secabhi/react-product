import React from 'react';
import addcardselected from '../../resources/images/Add_Card_Selected.svg';
import cardblack from '../../resources/images/Add_Card_Black.svg';
import deletepurple from '../../resources/images/Delete_Purple.svg';
import visa from '../../resources/images/Visa.svg';
import mastercard from '../../resources/images/Mastercard.svg';
import cards from '../../resources/images/Add_Card.svg';
import deletebutton from '../../resources/images/Delete_Purple.svg'
//import cardtype from "../../resources/images/Rect_Gray.svg"

import './addCard.css'

export default(props) => {

    const {cardNumber, custFname, lastName, cardType} = props;
    console.log("props in card display",props);
    
    const cardImagePaths = {
        visa,
        mastercard
    }
    return (
        <div className="card-layout-main">
            <div className="card-layout-details">
                <div className="card-icon-div">
                   <div className = "card-type-outer">
                        <div className = "card-type-name">{cardType}</div>
                   </div>
                </div>
                <div className="card-layout-text">
                    <label className="card-cust-name-text">{custFname}</label>
                    <div className="card-cust-number">
                        <div className="card-number-star-text">****</div>
                        <div className="card-number-text">{cardNumber}</div>
                    </div>
                </div>
            </div>
            {/* commented out because delete card is not in scope for phase 1  */}
            {/* <div className="card-layout-delete">
                      <img src={deletebutton} className="delete-icon"/>
                  </div> */}
        </div>
    )
  
}