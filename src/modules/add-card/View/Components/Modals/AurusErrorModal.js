import React,{Component} from 'react';
import Modal from 'react-responsive-modal';
import  warning from '../../../../../resources/images/Warning.svg';


export class AurusErrorModal extends Component {
    constructor(props){
        super(props);
}
    render (){
        return(
            <Modal  open={this.props.aurusErrorModal} onClose={() => { }} little showCloseIcon={false} classNames={{modal: 'addCard-result-modal-container'}}>
                <div className = 'addCard-result-modal'>
                    <div className = 'addCard-result-modal-icon'>
                        <img src = {warning}/>
                    </div>
                    <div className = 'addCard-result-modal-message-area'>
                        <div className = 'addCard-result-modal-message'>{this.props.message}</div>
                    </div>
                    <div className = 'addCard-result-modal-close-btn-area' onClick = {this.props.closeModal}>
                        <div className = 'addCard-result-modal-close-btn-text'>OK</div>
                    </div>
                </div>
           </Modal>)
    }

}

