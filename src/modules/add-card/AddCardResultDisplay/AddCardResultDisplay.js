import React,{Component} from 'react';
import Modal from 'react-responsive-modal';
import successicon from '../../../resources/images/Success.svg';


export class AddCardResultDisplay extends Component {
    constructor(props){
        super(props);
}
    render (){
        return(
            <div className = 'addCard-result-modal'>
                <div className = 'addCard-result-modal-icon'>
                    <img src = {successicon}/>
                </div>
                <div className = 'addCard-result-modal-message-area'>
                    <div className = 'addCard-result-modal-message'>The card has been added.</div>
                </div>
                <div className = 'addCard-result-modal-close-btn-area'
                     onClick = {this.props.closeAddCardDetailsFailModal()} 
                
                >
                    <div className = 'addCard-result-modal-close-btn-text'>CLOSE</div>
                </div>
            </div>
        )
    }

}

