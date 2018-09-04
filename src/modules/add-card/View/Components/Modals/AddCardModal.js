import React,{Component} from 'react';
import Modal from 'react-responsive-modal';
import cards from "../../../../../resources/images/Add_Card.svg";
import purpleCross from "../../../../../resources/images/Close_Bttn_Purple.svg";
import KeyIn from "../../../../../resources/images/Key_In_PED_White.svg";



export class AddCardModal extends Component{
    render(){
        return(
            <Modal  open={this.props.addCardModal}  little showCloseIcon={false}  classNames={{
                modal: 'addcard-modal-wrapper'
            }}>
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
            </Modal>
        )
    }
}