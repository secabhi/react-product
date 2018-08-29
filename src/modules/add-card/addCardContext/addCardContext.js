import React, { Component } from 'react';
import KeyIn from '../../../resources/images/Key_In_PED_White.svg';
import cards from '../../../resources/images/Add_Card.svg';
import purpleCross from '../../../resources/images/Close_Bttn_Purple.svg';

import  './addCardContext.css';


class  addCardContext extends Component {
  constructor(props) {
    super(props)
      this.state = {processing:'false'};

  }


  processing(somethingToDo) {
    this.setState({processing:'true'})
    const action = new Promise((res, rej) => {

    })


  }

  chooseDisplay(){
    if (this.state.processing ==='false'){
      return (
        <div className = "addcard-Modal-Container">
          <div className = "addcard-Modal-iconArea">
            <img src={cards} className = "addcard-Modal-icon" />
          </div>
          <div className = "addcard-Modal-text-area">
            <div className = "addcard-Modal-text">Swipe or Insert Card Information</div>
          </div>
          <div className = "addcard-Modal-buttons-area">
            <div className ="addcard-Modal-cancel-button" onClick={() => this.props.done()}>
              <div className = "addcard-Modal-cancel-label"><img src = {purpleCross}  className= "addcard-Modal-cancel-icon"/>CANCEL</div>
            </div>
            <div className ="addcard-Modal-keyin-button" onClick={() => {this.props.cancelSwipeMode()}}>
              <div className = "addcard-Modal-keyin-label"><img src = {KeyIn}  className= "addcard-Modal-keyin-icon"/>KEY IN CARD ON PED</div>
            </div>
          </div>           
        </div>
      )
    }
    if (this.state.processing === 'true'){
      return (
      <div className="processLoader">
          <div className="loader"></div>
          <br></br>
          <br></br>
          <div className="processText">Processing...</div>
          <div className="cancelProcess" onClick={() => this.props.done()}><div className="cancelProcessText">CANCEL</div></div>
      </div>
    )
    }
  }

  render() {
    return (
      <div>
        {this.chooseDisplay()}
      </div>

    )

  }
}

export default addCardContext;
