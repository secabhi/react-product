/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';


//Images
import warningIcon from '../../../resources/images/Warning.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';


export class ErrorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClienteled:true
        }

    }
    render() {
        
        return (
            <Modal
            open={this.props.errorModal}
            little
            showCloseIcon={false}>
             <div className='sale-errorModal-container'>
             <div><img className='sale-errorModal-icon' src={warningIcon} /></div>
             <div className="sale-errorModal-text">Invalid Request</div>
             <div className="sale-errorModal-button" onClick={this.props.closeInvalidErrorModal}>
               <div className="sale-errorModal-button-text">CLOSE</div>
             </div>
           </div>
        </Modal>
        );
    }}

    export default ErrorModal