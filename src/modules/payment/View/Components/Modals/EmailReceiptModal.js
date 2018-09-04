/* Dependencies import */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';


//Images
import emailmodalicon from '../../../../../resources/images/Confirm_Email.svg';
import registerIcon from '../../../../../resources/images/Print_To_Register.svg';
import crossicon from '../../../../../resources/images/Cross_Purple.svg';


export class EmailReceiptModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClienteled:true
        }

    }

    componentWillReceiveProps(nextProps)
    {
        //console.log('lcoation props in payment page'+JSON.stringify(this.props.props.history.location));
        //this.setState({isClienteled:this.props.props.history.location.state.isClienteled});
        //console.log('nextprops in payment page'+JSON.stringify(nextProps));
    }

    componentDidMount() {}

   

    handleEmailInput=(event)=>{
        this.props.props.handleEmailInput(event)
    }

    handleLnameInput=(event)=>{
        this.props.props.handleLnameInput(event)
    } 
    handleFnameInput=(event)=>{
        this.props.props.handleFnameInput(event)
    }

    render() {
        var errorStyle= {
            paddingTop:'15px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900?'32px':'32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'right',
            color: '#d53560', 
            bottom: "30px"
        }
        if(window.innerWidth < 1900)
        {
        var emailFieldFloatingLabelStyle = {
     
            marginBottom:'20px'
            
        }

        var emailtextFieldStyle = {
         
            marginTop:  "70px",
        }
    }   
    else{
        var emailFieldFloatingLabelStyle = {
            
           
            marginBottom:'20px'
            
        }

        var emailtextFieldStyle = {
           
            marginTop:  "70px",
        }
    }
    var emailtextFieldInputStyle = {

            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
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
        var emailFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }
    

        if(this.props.props.history.location.state)
            var isClienteled =  this.props.props.history.location.state.isClienteled;
        else
            var isClienteled = false;

        return (
            <Modal
            open={this.props.props.emailModal}
            onClose={this.closeEmailModal}
            classNames={{
            //modal: this.props.props.customerInfo.lastName?"add-dom-cust-modal":"add-dom-cust-modal email-receipt-modal"
            modal: isClienteled ? "add-dom-cust-modal email-receipt-modal clientele-modal" :"add-dom-cust-modal email-receipt-modal"
            }}
            little
            showCloseIcon={false}>
            <div className='add-dom-cust-container'>
                <div className="emailModalForm" 
                onSubmit={this.props.props.queueprintModal
                            ? this.props.props.openprintModal
                            : this.props.props.transactionComplete}
                            ><img src={emailmodalicon} className='email-receipt-modal-icon'/>
                    <div className='email-receipt-modal-name'>{isClienteled?'Customer Email':'Customer Details'}</div>
                    
            {isClienteled?"":
                <div className="modalContainer lname-modal-text">
                <TextField
                        type="text"
                        floatingLabelText="Last Name"
                        floatingLabelStyle={emailFieldFloatingLabelStyle}
                        inputStyle={emailtextFieldInputStyle}
                        underlineStyle={emailFieldUnderlineStyle}
                        style={emailtextFieldStyle}
                        className="payment-lname-receipt-input"
                        onChange={(e)=>{this.handleLnameInput(e)}} 
                        //key={this.props.props.lname} 
                        defaultValue={this.props.props.emailLname}/>
                        {/*<span class="required">*</span>*/}
                        </div>
                        }
                        {isClienteled?"":
                <div className="modalContainer fname-modal-text"><TextField
                        type="text"
                        floatingLabelText="First Name"
                        className="payment-fname-receipt-input"
                        floatingLabelStyle={emailFieldFloatingLabelStyle}
                        inputStyle={emailtextFieldInputStyle}
                        underlineStyle={emailFieldUnderlineStyle}
                        style={emailtextFieldStyle}
                        onChange={(e)=>{this.handleFnameInput(e)}} 
                        //key={this.props.props.fname} 
                        defaultValue={this.props.props.emailFname} />
                        {/*<span class="required">*</span>*/}
                        </div>}
                        
                {
                }
                 <div className="modalContainer email-modal-text"><TextField
                        type="email"
                        floatingLabelText="Email"
                        className="payment-email-receipt-input"
                        onChange={(e)=>{this.handleEmailInput(e)}} 
                        floatingLabelStyle={emailFieldFloatingLabelStyle}
                        inputStyle={emailtextFieldInputStyle}
                        underlineStyle={emailFieldUnderlineStyle}
                        style={emailtextFieldStyle}
                        errorText={this.props.props.error}
                        errorStyle ={errorStyle}
                        defaultValue={this.props.props.email}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    this.props.props.openemailverifyModal();
                                }
                            }}   
                        /></div>


                <div className='add-dom-cust-modal-email-button-area'>

                
                    <div className='add-dom-cust-modal-no-btn emailbtns' onClick={this.props.props.closeEmailModal}>
                    <div className="cross-icon-border"><img src={crossicon} className='payment-cancel-btn-cross-icon'/></div>
                    <span className='add-dom-cust-modal-no-btn-label'>CANCEL</span>
                    </div>
                    <div className='add-dom-cust-modal-yes-btn emailbtns' type='submit' onClick ={this.props.props.openemailverifyModal}>
                        <span className='add-dom-cust-modal-yes-btn-label'>OK</span>
                    </div>
                </div>
                </div>
            </div>
        </Modal>
        );
    }}