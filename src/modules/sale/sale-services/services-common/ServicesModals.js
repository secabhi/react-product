import React, { Component } from 'react';
import {TextField} from 'material-ui';
// import {DatePicker} from 'material-ui';
import InputMask from 'react-input-mask';
import services from '../../../../resources/images/Services_Black.svg';
import scanItem from '../../../../resources/images/Scan_Item_Borderless.svg';
import calendar from '../../../../resources/images/Calendar.svg';
import confirmEmail from '../../../../resources/images/Confirm_Email.svg';
import success from '../../../../resources/images/Success.svg';
import warning from '../../../../resources/images/Warning_101.svg';
import './services-common.css';
import moment from 'moment';

const textFieldFloatingLabelStyle = {
    height: '28px',
    fontFamily: 'Roboto',
    fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
    fontWeight: '300',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#333333',
}

// const textFieldStyle = {
//     height: '60px',
//     width: '619.5px',
//     maxWidth: '680px',
//     paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
//     paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
// }

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
    paddingLeft : (window.innerWidth > 1900) ? "10px" : "10px",
}

// const textFieldFloatingLabelStyle = {
//     height: '28px',
//     fontSize: (window.innerWidth > 1900) ? '30px' : '48px',
//     fontWeight: '300',
//     fontFamily : 'Roboto-Light',
//     fontStyle: 'normal',
//     fontStretch: 'normal',
//     letterSpacing: '2px',
//     lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
//     textAlign: 'left',
//     color: '#333333'
// }

const textFieldStyle = {
    height: '60px',
    width: '619.5px',
    maxWidth: '680px',
    paddingTop: (window.innerWidth > 1900) ? '22.2px' : '55px',
    paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
}

const textAreaStyle = {
    padding: '25px',
    height: '300px',
    width: '620px',
    marginTop: (window.innerWidth > 1900) ? "30px" : "0px",
    marginLeft: (window.innerWidth > 1900) ? "52px" : "0px",
    marginRight: (window.innerWidth > 1900) ? "52px" : "0px",
    marginBottom: (window.innerWidth > 1900) ? "30px" : "0px",
    border: '1px solid black'
}

const textAreaInputStyle = {
    fontFamily: "Roboto",
    fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
    lineHeight: (window.innerWidth > 1900) ? "1.25" : '1.25',
    marginTop: (window.innerWidth > 1900) ? "0px" : "0px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#3a3a3a"
}

// const textFieldInputStyle = {
//     height: '37px',
//     fontFamily: 'Roboto-Light',
//     fontSize: (window.innerWidth > 1900) ? '32px': '56px',
//     lineHeight: '1.19',
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     fontStretch: 'normal',
//     letterSpacing: '2px',
//     textAlign: 'left',
//     color: '#505050',
//     paddingBottom: '4.5px',
//     paddingLeft:'13px'
// }

const textAreaUnderline = {
    display: 'none'
}

const underlineStyle = {
    borderColor: '#757575'
}


export class ContactDetailsModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactDetails: {
                promiseDate: '',
                alterationID: '',
                quotedPrice: '',
                contactName: '',
                contactExt: ''
            }
        }
        this.state.contactDetails = this.props.alterationObject
    }

    getContactName = (e) => {
        let associateName = e.target.value;
        this.setState({
            contactDetails : {
                ...this.state.contactDetails,
                contactName: associateName
            }
        })
    }

    getContactExt = (e) => {
        let associateExt = e.target.value;
        this.setState({
            contactDetails : {
                ...this.state.contactDetails,
                contactExt: associateExt
            }
        })
    }

    render() {
        return (
            <div className="contact-details-modal">
                <img src={services} alt="services" className='contact-modal-icon'/>     
                <form onSubmit={(e) => {
                    e.preventDefault();
			        this.props.setObject(this.state.contactDetails);
                    this.props.changeModal()}
                }>
        
                    <div className='contact-modal-label'>Contact Details</div>

                    <TextField className="contact-modal-textfield" 
                        type="text"
                        onChange={(e) => {this.getContactName(e)}}
                        value={this.state.contactDetails.contactName}
                        floatingLabelText="Contact Name"
                        floatingLabelStyle={textFieldFloatingLabelStyle}                    
                        style = {textFieldStyle}
                        inputStyle = {textFieldInputStyle}
                        underlineStyle= {underlineStyle}
                        refs="contact-details-modal"
                        required
                    />

                    <TextField className="contact-modal-textfield" 
                        type="tel"
                        onChange={(e) => {this.getContactExt(e)}}
                        value={this.state.contactDetails.contactExt}
                        floatingLabelText="Contact Extention"
                        floatingLabelStyle={textFieldFloatingLabelStyle}                    
                        style = {textFieldStyle}
                        inputStyle = {textFieldInputStyle}
                        underlineStyle= {underlineStyle}
                        refs="contact-details-modal" 
                        minLength="7"
                        maxLength="9"
                        required
                    />
                
                    <div className="contact-modal-button-container">
                        <button className="contact-modal-button-cancel" 
                            onClick={() => this.props.closeModal()}>CANCEL
                        </button> 
                        <button type="submit" className="contact-modal-button-ok">OK</button>
                    </div>
                </form>
            </div>
        )
    }
}

export class AlterationDetailsModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alterationData: {
                promiseDate: '',
                alterationID: '',
                quotedPrice: '',
                contactName: '',
                contacteExt: ''
            }
        }
        this.state.alterationData = this.props.alterationObject
    }
   
    // componentWillReceiveProps(nextprops) {
    //     if(nextprops.formData) {
    //         this.setState({
    //             alterationID: nextprops.formData.alterationID,
    //             quotedPrice: nextprops.formData.quotedPrice,
    //             promiseDate: nextprops.formData.promiseDate
    //         })
    //     }
    //     //passed in from alteration container but really comes from calendar
    //     console.log('Sweezey : ServicesModal : nextprops.promiseDate', nextprops.promisedDate);
        
    //     if(nextprops.promisedDate){
    //         const formatedDate = this.formatToMMDDYYYY(nextprops.promisedDate);
    //         console.log('Sweezey : ServicesModal: formatedDate ',  formatedDate);
    //         const newAlteration = {...this.state.alterationData, promiseDate: formatedDate}
    //         this.setState({alterationData: newAlteration})
    //     }
    // }

    // componentWillMount() {
    //     console.log('ALTERATIONS COMPONENT MOUNT', this.state.alterationData.promiseDate)
    // }

    // componentDidMount() {
    //     if(this.state.alterationData.promiseDate){
    //         const formatedDate = this.formatToMMDDYYYY(this.state.alterationData.promiseDate);
    //         console.log('Sweezey : ServicesModal: formatedDate ',  formatedDate);
    //         const newAlteration = {...this.state.alterationData, promiseDate: formatedDate}
    //         this.setState({alterationData: newAlteration})
    //     }
    // }

    // formatToMMDDYYYY = (stringDate) => {
    //        //date from calendar comes in with month at m/DD/YYY
    //     console.log('sweezey : formatToMMDDYYY : stringDate',stringDate);
    //    if(stringDate.split('/')[0].length < 2) {
    //     return '0'+stringDate;
    //    } else {
    //        return stringDate;
    //    }
    // }

    getAlterationId = (e) => {
        let altId = e.target.value
        this.setState({
            alterationData : {
                ...this.state.alterationData,
                alterationID: altId
            }
        })
    }

    getQuotedPrice = (e) => {
        let price = e.target.value
        this.setState({
            alterationData : {
                ...this.state.alterationData,
                quotedPrice: price
            }
        })
    }

    getPromiseDate = (e) => {
        let date = e.target.value
        this.setState({
            alterationData : {
                ...this.state.alterationData,
                promiseDate: date
            }
        })
    }

    render() {
        return (
            <div className="alteration-details-modal">
                <img src={services} alt="services" className='alteration-modal-icon'/>        
                <form onSubmit={(e) => {
			            e.preventDefault();
			            this.props.alterationsApiCall(this.state.alterationData)}
		  }>
                <div className='alteration-modal-label'>Alteration Details</div>
               
                <TextField className="alteration-modal-textfield" 
                    type="tel"
                    onChange={(e) => {this.getAlterationId(e)}}
                    value={this.state.alterationData.alterationID}
                    floatingLabelText="Alteration ID Tag"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="alteration-details-modal" 
                    minLength="7"
                    maxLength="9"
                    required
                />
                <img src={scanItem} className="scan-item-img" alt="scanner"/>

                <TextField className="alteration-modal-textfield" 
                    type="text"
                    onChange={(e)=> {this.getQuotedPrice(e)}}
                    value={this.state.alterationData.quotedPrice}
                    floatingLabelText="Quoted Price"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="alteration-details-modal" 
                    // onInput = {(e) => 
                    // {e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,3)}}
                    pattern="\d*"
                    maxlength="6"
                    required
                />

                <TextField className="alteration-modal-textfield" 
                    type="text"
                    onChange={(e)=> {this.getPromiseDate(e)}}
                    value={this.state.alterationData.promiseDate}
                    floatingLabelText="Promise Date"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="alteration-details-modal" 
                    required
                >
                    {/* <InputMask 
                        refs="alterations-details-modal"
                        mask="mm/dd/yyyy"
                    /> */}

                </TextField>
                
                <img className="calendar-img"  
                    src={calendar} 
                    alt="calendar"
                    onClick={()=>{
                        this.props.showCalendar(); 
                        this.props.setObject(this.state.alterationData)}} 
                />

                <div className="alteration-modal-button-container">

                    <button className="alteration-modal-button-cancel" 
                        onClick={this.props.closeModal}>CANCEL
                    </button> 

                    <button type="submit" className="alteration-modal-button-ok">
                        OK
                    </button>
                </div>
                </form>
            </div>
        )
    }
}

export class CustomerDetailsModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerData: {
                lastName: '',
                firstName: '',
                phoneNumber: '',
            }
        }
    }

    getLastName = (e) => {
        let lname = e.target.value
        this.setState({
            customerData : {
                ...this.state.customerData,
                lastName: lname
            }
        })
    }

    getFirstName = (e) => {
        let fname = e.target.value
        this.setState({
            customerData : {
                ...this.state.customerData,
                firstName: fname
            }
        })
    }

    getPhoneNumber = (e) => {
        let phone = e.target.value
        this.setState({
            customerData : {
                ...this.state.customerData,
                phoneNumber: phone
            }
        })
    }
    
    render() {
    return (
        <div className="customer-details-modal">
            <img src={confirmEmail} alt="details" className='customer-modal-icon'/>
            <form>
                <div className='customer-modal-label'>Customer Details</div>
               
                <TextField className="customer-modal-textfield" 
                    type="text"
                    onChange={(e) => {this.getLastName(e)}}
                    value={this.state.customerData.lastName}
                    floatingLabelText="Last Name"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="customer-details-modal" 
                    required
                />

                <TextField className="customer-modal-textfield" 
                    type="text"
                    onChange={(e) => {this.getFirstName(e)}}
                    value={this.state.customerData.firstName}
                    floatingLabelText="First Name"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="customer-details-modal" 
                    required
                />

                <TextField className="customer-modal-textfield" 
                    type="number"
                    onChange={(e) => {this.getPhoneNumber(e)}}
                    value={this.state.customerData.phoneNumber}
                    floatingLabelText="Phone Number"
                    floatingLabelStyle={textFieldFloatingLabelStyle}                    
                    style = {textFieldStyle}
                    inputStyle = {textFieldInputStyle}
                    underlineStyle= {underlineStyle}
                    refs="customer-details-modal" 
                    required
                    >
                    <InputMask 
                        refs="customer-details-modal"
                        mask="(999) 999-9999"
                    />
                </TextField>
                
                <div className="customer-modal-button-container">

                    <div className="customer-modal-button-no" 
                        onClick={this.props.closeModal}>NO
                    </div> 

                    <div className="customer-modal-button-yes" 
                        onClick={() => {this.props.changeModal(true); this.props.apiCustomerDetails(this.state.customerData)}}>YES
                    </div>
                </div>
          </form>
      </div>
        )
    }
}

export class AlterationSuccessModal extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
    return (
        <div className="alteration-success-modal">
            <img className="alteration-succes-modal-icon" src={success} alt="success"></img>        
            <div className="alteration-success-label">Alteration request has been submitted successfully.</div>
            <div className="alteration-success-link" onClick={this.props.changeModal}>NEXT ALT ID TAG</div>
            <div className="alteration-success-button-container">
                <div className="alteration-success-ok" onClick={() => this.props.closeModal()}>OK</div>
            </div>
        </div>
        )
    }
}

export class MessagePromptModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
    return (
        <div className="message-prompt-modal">
            <img className="message-prompt-icon" src={services} alt="services" className='alteration-modal-icon'/>
            <div className="message-prompt-label">Do you want to include a gift message card?</div>
            <div className="message-modal-button-container">

                <div className="message-modal-button-no" 
                    onClick={() => {this.props.apiGift(false); this.props.changeModal(true);}}>NO
                </div> 
                
                <div className="message-modal-button-yes" 
                    onClick={() => {this.props.apiGift(true); this.props.changeModal(true);}}>YES
                </div>

            </div>
        </div>
        )
    }
}

export class GiftWrapOptionsModal extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
    return (
        <div className="giftwrap-options-modal">
            <img className="options-modal-icon" src={services} alt="services" />
            <div className="options-modal-label">Is this an Option 7?</div>
            <div className="options-modal-button-container">
                
                <div className="options-modal-button-no" 
                    onClick={() => {
                        this.props.apiOption7(false); 
                        if(this.props.needGiftMessage) {
                            this.props.changeModal(true);
                        } else {
                            this.props.giftWrapCall();
                        }
                        
                    }}
                >NO
                </div> 
                
                <div className="options-modal-button-yes" 
                    onClick={() => {
                        this.props.apiOption7(true); 
                        if(this.props.needGiftMessage) {
                            this.props.changeModal(true);
                        } else {
                            this.props.giftWrapCall();
                        }
                    }}
                >YES
                </div>
            </div>
        </div>
        )
    }
}


export class GiftWrapMessageModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            giftWrapMessage: ''
        }
    }

    getMessage = (e) => {
        let message = e.target.value;
        this.setState({
            giftWrapMessage: message
        })
    }

    render() {
        return (
            <div className="giftwrap-message-modal">
                <img className="giftwrap-message-icon" src={services} alt="services" />
                <div className="giftwrap-message-label">Gift Message</div>
                <form>
                <TextField className="giftwrap-message-textarea" 
                    type="text"
                    onChange={(e) => {this.getMessage(e);}}
                    value={this.state.giftWrapMessage}
                    placeholder="Enter Gift Card Message"  
                    // floatingLabelStyle={textFieldFloatingLabelStyle}                
                    style = {textAreaStyle}
                    inputStyle = {textAreaInputStyle}
                    underlineStyle= {textAreaUnderline}
                    multiLine={true}
                    rows={8}  
                    rowsMax={10}
                    maxLength="150"
                    refs="giftwrap-message-modal" 
                    required
                />
                <div className="giftwrap-modal-maxchar">Maximum Characters: [150]</div>
                <div className="giftwrap-modal-button-container">

                    <div className="giftwrap-modal-button-cancel" 
                        onClick={() => {this.props.closeModal(true);}}>CANCEL
                    </div> 

                    <div className="giftwrap-modal-button-ok" 
                        onClick={() => {this.props.apiMessage(this.state.giftWrapMessage); this.props.giftWrapCall();}}>OK
                    </div>
                </div>
             </form>
            </div>
        )
    }
}


export class InvalidAlterationTagModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="invalid-tag-modal">
                <img className="invalid-tag-icon" src={warning} alt="warning" />
                <div className="invalid-tag-label">Invalid Alteration Tag</div>
                <div className="invalid-tag-button-container">
                    <div className="invalid-tag-ok" onClick={() => this.props.closeModal()}>OK</div>
                </div>
            </div>
        )
    }
}


export class ErrorModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="res-error-modal">
                <img className="res-error-icon" src={warning} alt="warning" />
                <div className="res-error-label">Error</div>
                <div className="res-error-button-container">
                    <div className="res-error-ok" onClick={() => this.props.closeModal()}>OK</div>
                </div>
            </div>
        )
    }
}