import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './saleitemGiftRegistry.css'
import warningImage from '../../../resources/images/Warning.svg';

import ErrorAlertImage from '../../../resources/images/Error_Alert.svg';
import Confirm_Email from '../../../resources/images/Confirm_Email.svg';
import item_Modify from '../../../resources/images/Item_Modify_Black.svg';
import trans_Modify from '../../../resources/images/Trans_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';
import Warning from '../../../resources/images/Warning.svg';
import scan from '../../../resources/images/Scan_Item_Borderless.svg';

import Modal from 'react-responsive-modal';
export class SaleItemGiftRegistry extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModifyGiftRegistry
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',
            giftitem:''

        }
        this.SaleItemGiftRegistrySubmit = this.SaleItemGiftRegistrySubmit.bind(this);
    }

    SaleItemGiftRegistrySubmit(e){
        e.preventDefault();
        console.log('Sales Item gift registry SUBMITING');
        this.props.saleitemGiftRegistryUpdate(this.state.giftitem,this.props.modify_type);
        this.props.showItemGiftRegistryModal(false,this.props.modify_type);  
    }
    removeStyleGiftRegistry(){
        this.props.handleChangedropdownColor("");
        this.props.showItemGiftRegistryModal(false,this.props.modify_type)
    }


    updateQuantityEntry(e) {
      /*  const qtypattern = /^[0-9\b]+$/;
        const { quantityitem } = this.state;
        this.setState({ quantityitem: e.target.value })
        if ((e.target.value < 1)) {
            document.getElementById("sale-item-modify-quantity-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled = true;
        }
        else {
            document.getElementById("sale-item-modify-quantity-error").style.display = "none";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled =  false;
        }*/
    }

    updateGiftRegistryEntry(e) {
        const { giftitem } = this.state;
        this.setState({giftitem: e.target.value })
        
        if ((e.target.value < 1) ) {
            //document.getElementById("sale-item-modify-gift-registry-error").style.display = "block";
            document.getElementsByClassName("sale-item-gift-registry-ok")[0].disabled = true;
        }
        else {
           //document.getElementById("sale-item-modify-gift-registry-error").style.display = "none";
            document.getElementsByClassName("sale-item-gift-registry-ok")[0].disabled =  false;
        }
    }

    isEnabled() {
        const {giftitem } = this.state;
        this.props.isEnabled(this.state.giftitem);
        return true;
       /* return (
            giftitem >= 1 &&
            giftitem < 9999        
        );*/
    }
   
    render() {
        const isEnabled = this.isEnabled();
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
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '56px' : '65px',
            marginTop: (window.innerWidth > 1900) ? "20px" : "25px",
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
        const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        


        return (
            <div className='sale-item-gift-registry-container'>
                <img src={this.props.modify_type=='IteamRegistry'?item_Modify:trans_Modify} className='sale-item-gift-registry-icon' />
                <div className='sale-item-gift-registry-label'>Gift Registry</div>
                <form className="SaleItemGiftRegistryForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.SaleItemGiftRegistrySubmit(e)}}>
                    
                    <TextField
                        required
                        type="text"
                        maxLength="12"
                        floatingLabelText="Gift Registry #"
                        floatingLabelStyle={textFieldFloatingLabelStyle}
                        fullWidth={true}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={textFieldUnderlineStyle}
                        style={textFieldStyle}
                        value={this.state.giftitem.replace(/[^0-9]+/ig, "")}
                        onChange={e => this.updateGiftRegistryEntry(e)}
                    />
                    <img className="gift-registry-scan" src={scan}/>
                    <p id="sale-item-gift-registry-error" className="sale-item-gift-registry-error">Gift Registry Number must be between 1 and 9999</p>
                    <div className="sale-item-gift-registry-buttons-lff">
                    <div className="sale-item-gift-registry-cancel" onClick={() => this.removeStyleGiftRegistry()}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="sale-item-gift-registry-cancel-btn" >CANCEL</div>
                    </div>
                    <button className="sale-item-gift-registry-ok" type="submit" disabled>OK</button>
                    </div>
                </form>
            </div>
        )
    }
};



export class SaleItemGiftRegistryRemove extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModifyGiftRegistry
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',
            giftitem:''

        }
        this.SaleItemGiftRegistryRemoveSubmit = this.SaleItemGiftRegistryRemoveSubmit.bind(this);
    }

    SaleItemGiftRegistryRemoveSubmit(e){
        e.preventDefault();
        console.log('Sales Item gift registry Remove SUBMITING');
        this.props.saleitemGiftRegistryUpdate(this.state.giftitem,this.props.modify_type);
        this.props.showItemGiftRegistryModal(false,this.props.modify_type);  
    }

    updateGiftRegistryEntry(e) {
        const { giftitem } = this.state;
        this.setState({giftitem: e.target.value })
        
       /* if ((e.target.value > 9999) || (e.target.value < 1)) {
            document.getElementById("sale-item-gift-registry-error").style.display = "block";
        }
        else {
            document.getElementById("sale-item-gift-registry-error").style.display = "none";
        }*/
    }

    isEnabled() {
        const {giftitem } = this.state;
        this.props.isEnabled(this.state.giftitem);
        return true;
       /* return (
            giftitem >= 1 &&
            giftitem < 9999        
        );*/
    }
   
    render() {
        const isEnabled = this.isEnabled();
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

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '56px' : '65px',
            marginTop: (window.innerWidth > 1900) ? "20px" : "25px",
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
        const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        


        return (
            <div className='sale-item-gift-registry-container sale-item-gift-registry-remove-container'>
                <img src={ErrorAlertImage} className='sale-item-gift-registry-remove-icon' />
                <div className='sale-item-gift-registry-remove-label'>Remove item from gift registry?</div>
                <form class="SaleItemGiftRegistryForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.SaleItemGiftRegistryRemoveSubmit(e)}}>
                    <div className="sale-item-gift-registry-remove-cancel" onClick={() => this.props.showItemGiftRegistryModal(false,this.props.modify_type)}>
                        <div className="sale-item-gift-registry-remove-cancel-btn">NO</div>
                    </div>
                    <button className="sale-item-gift-registry-remove-ok" type="submit" disabled={!isEnabled}>YES</button>
                </form>
            </div>
        )
    }
};

export class SaleItemGiftRegistrySFF extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModiyQuantity
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            giftregistry: '',
            isEnabled:true,
       
            currentItem:''

        }
        this.saleitemGIftRegistrySubmit = this.saleitemGIftRegistrySubmit.bind(this);
        
    }

    
    saleitemGIftRegistrySubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING'+this.props.modify_type);
     // console.log(this.props.currentItem);
        this.props.saleitemGiftRegistryUpdate(this.state.giftregistry,this.props.modify_type);
    }
    
    updategiftregistryEntry(e) {
        
        const {giftregistry} = this.state;
        this.setState({giftregistry: e.target.value ,
                    
                    })
                    if(e.target.value==''){
                        console.log('hi');
                        this.setState({
                            isEnabled:true
                        })
                    }
                    else{
                        this.setState({
                            isEnabled:false
                        })   
                    }
                }
     

    render() {
       // const isEnabled=this.isEnabled();
        const giftregistrytextFieldFloatingLabelStyle = {
            width: '580px',
            height: '63px',
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.34',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
           
            marginBottom:'20px'
            
        }

        const giftregistrytextFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop:  '65px',
            paddingBottom: '20px',
            paddingLeft: '0px',
            marginTop:  "60px",
        }

        const giftregistrytextFieldInputStyle = {

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
        const giftregistrytextFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "920px",
            backgroundColor: '#333333',
        }

        return (
            <div className='sale-item-gift-registry-container'>
            
              <div className='sale-item-gift-registry-label sff-registry'>{this.props.modify_type=='item'?'Gift Registry':'Trans Modify: Gift Registry'}</div>
              <form className="SaleItemGiftRegistryForm" onSubmit={(e) => {
                  e.preventDefault();
                  this.saleitemGIftRegistrySubmit(e)}}>
                <div className="sff-registry">
                <TextField
                  required
                  type="number"
                  floatingLabelText="Gift Registry #"
                  floatingLabelStyle={giftregistrytextFieldFloatingLabelStyle}
                  fullWidth={true}
                  inputStyle={giftregistrytextFieldInputStyle}
                  underlineStyle={giftregistrytextFieldUnderlineStyle}
                  style={giftregistrytextFieldStyle}
                  value={this.state.giftregistry}
                  onChange={e => this.updategiftregistryEntry(e)}
                />
                <img className="gift-registry-scan" src={scan}/>
               </div>
                <div className={this.props.modify_type=='item'?"sale-item-gift-registry-buttons":"sale-item-gift-registry-buttons trans-modify-buttons-sfff"}>
                <div className="sale-item-gift-registry-canceldiv" onClick={this.props.hideItemModifyModalSmallFF}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className="sale-item-gift-registry-cancel-btn">CANCEL</div>
                </div>
                <button className="sale-item-gift-registry-ok-btn " type="submit"  disabled={this.state.isEnabled}>OK</button>
                </div>
              </form>
              

            </div>
        )
    }
};


export class SaleItemRemoveGiftRegistrySFF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            giftRegistryErrorModal:props.errorModal,
           giftregistry:""

        }
        this.setState({giftRegistryErrorModal:true});
        this.saleitemremoveGiftRegistrySubmit = this.saleitemremoveGiftRegistrySubmit.bind(this);
    }   
    componentWillReceiveProps(){
        console.log('giftRegistryErrorModal'+this.state.giftRegistryErrorModal);
    }
    componentDidMount(){
        console.log('giftRegistryErrorModal'+this.state.giftRegistryErrorModal);
        this.state.giftRegistryErrorModal
        this.setState({giftRegistryErrorModal:true});
    }
    saleitemremoveGiftRegistrySubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING mod type'+this.props.modify_type);;
     // console.log(this.props.currentItem);
     this.props.saleitemGiftRegistryUpdate(this.state.giftregistry,this.props.modify_type);
     this.giftRegistryCloseModal();  
    }
    
    giftRegistryCloseModal = () =>{
        
        this.setState({ giftRegistryErrorModal:false})
        this.props.giftRegistryCloseModal();
        this.props.hideItemModifyModalSmallFF();
        /*document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "none";
        document.getElementsByClassName('sale-content-container-outer')[0].style.display = "block";
        document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "block";*/
    }
    giftRegistryRemoveOpen = () =>{
        this.setState({ giftRegistryErrorModal:true})
    }
    render() {
        return (
    <Modal open={this.props.giftRegistryErrorModal} classNames={{ modal: 'gift-Registry-error-modal'}} little >
    <div className='gift-Registry-error-modal-image-width' >
        <img src={ErrorAlertImage} alt="Remove-item-from-gift-registry" />               
    </div>
    <div className="gift-Registry-error-label">Remove item from gift registry?</div>
    
    <div className="gift-Registry-error-btn-group">            
    <div className="gift-Registry-error-no-btn" onClick={this.props.giftRegistryCloseModal}><span className='gift-Registry-error-no-btn-label'>NO</span></div>
    <div className="gift-Registry-error-yes-btn" onClick={(e) => {this.saleitemremoveGiftRegistrySubmit(e)}}><span className='gift-Registry-error-yes-btn-label'>YES</span></div>
    </div>
    
</Modal>
        )
}
};

