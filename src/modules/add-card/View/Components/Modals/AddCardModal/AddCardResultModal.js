import React,{Component} from 'react';
import Modal from 'react-responsive-modal';

export class AddCardResultModal extends Component {
    constructor(props){
        super(props);
}
    render (){
        return(
            <Modal  open={this.props.addCardResultModal} little showCloseIcon={false} classNames={{modal: 'addCard-result-modal-container'}}>
                <div className = 'addCard-result-modal'>
                    <div className = 'addCard-result-modal-icon'>
                        <img src = {this.props.icon}/>
                    </div>
                    <div className = 'addCard-result-modal-message-area'>
                        <div className = 'addCard-result-modal-message'>{this.props.message}</div>
                    </div>
                    <div className = 'addCard-result-modal-close-btn-area'
                            onClick = {() => (this.props.getCardDetails(this.props.storeClientNo))} >
                        <div className = 'addCard-result-modal-close-btn-text'>OK</div>
                    </div>
                </div>
           </Modal>)
    }

}

