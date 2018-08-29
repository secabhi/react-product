/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';


//Images
import emailmodalicon from '../../../resources/images/Confirm_Email.svg';
import registerIcon from '../../../resources/images/Print_To_Register.svg';
import crossicon from '../../../resources/images/Cross_Purple.svg';


export class EmailReceiptModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClienteled:true
        }

    }

    componentWillReceiveProps(nextProps)
    {
        //console.log('lcoation props in payment page'+JSON.stringify(this.props.history.location));
        //this.setState({isClienteled:this.props.history.location.state.isClienteled});
        //console.log('nextprops in payment page'+JSON.stringify(nextProps));
    }

    componentDidMount() {}

    handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            
            this.props.openemailverifyModal();    
        }
    } 

    handleEmailInput=(event)=>{
        this.props.handleEmailInput(event)
    }

    handleLnameInput=(event)=>{
        this.props.handleLnameInput(event)
    } 
    handleFnameInput=(event)=>{
        this.props.handleFnameInput(event)
    }

    render() {
        var errorStyle= {
            paddingTop:'15px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900?'22px':'32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'right',
            color: '#d53560', 
            bottom: "30px"
        }
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }

        const textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
        }
        var underlineStyle = {
            backgroundColor: '#828282'

        }

        
        var isClienteled = this.props.isClienteled;
        return (
            <Modal
            open={this.props.emailModal}
            onClose={this.closeEmailModal}
            classNames={{
            //modal: this.props.customerInfo.lastName?"add-dom-cust-modal":"add-dom-cust-modal email-receipt-modal"
            modal: isClienteled ? "add-dom-cust-modal email-receipt-modal clientele-modal" :"add-dom-cust-modal email-receipt-modal"
            }}
            little
            showCloseIcon={false}>
            <div className='add-dom-cust-container'>
                <div className="emailModalForm" 
                onSubmit={this.props.queueprintModal
                            ? this.props.openprintModal
                            : this.props.transactionComplete}
                            ><img src={emailmodalicon} className='email-receipt-modal-icon'/>
                    <div className='email-receipt-modal-name'>{'Customer Details'}</div>
                    
            {
                <div className="modalContainer lname-modal-text">
                <TextField
                        type="text"
                        floatingLabelText="Last Name"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={underlineStyle}
                        className="lname-receipt-input"
                        onChange={(e)=>{this.handleLnameInput(e)}} 
                        //key={this.props.lname} 
                        defaultValue={this.props.lname}/>
                        {/*<span class="required">*</span>*/}
                        </div>
                        }
                        {
                <div className="modalContainer fanme-modal-text">
                <TextField
                        type="text"
                        floatingLabelText="First Name"
                        className="fname-receipt-input"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={underlineStyle}
                        onChange={(e)=>{this.handleFnameInput(e)}} 
                        //key={this.props.fname} 
                        defaultValue={this.props.fname} />
                        {/*<span class="required">*</span>*/}
                        </div>}
                        
                {
                }
                 <div className="modalContainer email-modal-text1"><TextField
                        type="email"
                        floatingLabelText="Email"
                        className="email-receipt-input"
                        onChange={(e)=>{this.handleEmailInput(e)}} 
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        style={textFieldStyle}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={underlineStyle}
                        errorText={this.props.error}
                        errorStyle ={errorStyle}
                        onKeyUp={this.handleKeyUp}
                        //key={this.props.email}
                        defaultValue={this.props.email}/></div>


                <div className='add-dom-cust-modal-email-button-area buttons-area'>

                
                    <div className='add-dom-cust-modal-no-btn emailbtns' onClick={this.props.closeEmailModal}>
                    <div className="cross-icon-border"><img src={crossicon} className='payment-cancel-btn-cross-icon'/></div>
                    <span className='add-dom-cust-modal-no-btn-label'>CANCEL</span>
                    </div>
                    <div className='add-dom-cust-modal-yes-btn emailbtns' type='submit' onClick ={this.props.openemailverifyModal}>
                        <span className='add-dom-cust-modal-yes-btn-label'>OK</span>
                    </div>
                </div>
                </div>
            </div>
        </Modal>
        );
    }}