import React,{Component} from 'react';
import Modal from 'react-responsive-modal';
import successicon from '../../../resources/images/Success.svg';


export class AddCardResultModal extends Component {
 
    constructor(props){
        super(props);
}
    render (){
        return(
            <div className = 'addCard-result-modal'>
                <div className = 'addCard-result-modal-icon'>
                    <img src = {this.props.icon}/>
                </div>
                <div className = 'addCard-result-modal-message-area'>
                    <div className = 'addCard-result-modal-message'>{this.props.message}</div>
                </div>
                <div className = 'addCard-result-modal-close-btn-area'
                      onClick = {() => (this.props.getCardDetails(this.props.storeClientNo))} 
                
                >
                    <div className = 'addCard-result-modal-close-btn-text'>OK</div>
                </div>
            </div>
        )
    }

}

