import React, { Component } from 'react';
import KeyIn from '../../../resources/images/Key_In_PED_White.svg';
import cards from '../../../resources/images/Add_Card.svg';
import purpleCross from '../../../resources/images/Cross_Purple.svg';

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
        <div>
            <img className="cardsmodal" src={cards} width="61.5" height="2.8" alt="cards" />
              <img className="cardsModalImage" src={cards} alt="cards" />
            <h1 className="swipe">Swipe Or Insert Card Information</h1>
            <div className="cancelAddCard">
              <img className="cancelImage" src={purpleCross} alt="cancel" onClick={() => this.props.done()} />
              <div className="cancelText" onClick={() => this.props.done()} >CANCEL</div>
            </div>

            <div className="addCardButtonClass"><div className="sendAddCardDiv">
              <img className="sendAddCard" src={KeyIn} alt="send" onClick={() => this.setState({processing: 'true'})}/>
            <div className="onPedText" onClick={() => {
                this.props.addCard(1)
              }}>KEY IN CARD ON PED</div></div></div>
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
