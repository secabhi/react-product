import React, { Component } from 'react';

import './saleitemGiftReceipt.css'
import warningImage from '../../../resources/images/Warning.svg';

import ErrorAlertImage from '../../../resources/images/Error_Alert.svg';
import Confirm_Email from '../../../resources/images/Confirm_Email.svg';
import trans_Modify from '../../../resources/images/Trans_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';
import Warning from '../../../resources/images/Warning.svg';
import scan from '../../../resources/images/Scan_Item_Borderless.svg';

import Modal from 'react-responsive-modal';
export class SaleItemGiftReceipt extends Component {

    configFile = require('../../../resources/stubs/config.json')
    url = this.configFile.apisaleitemModifyGiftReceipt
    params = {}; // parameters object to be sent to api
    errorPresent = false; //to check if error was present

    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',
            giftitem:''

        }
        this.SaleItemGiftReceiptSubmit = this.SaleItemGiftReceiptSubmit.bind(this);
    }

    SaleItemGiftReceiptSubmit(e){
        e.preventDefault();
        console.log('Sales Item gift registry SUBMITING');
        this.props.saleitemGiftReceiptUpdate(this.state.giftitem,this.props.modify_type);
        this.props.showItemGiftReceiptModal(false,this.props.modify_type);  
    }


    /*updateQuantityEntry(e) {
        const qtypattern = /^[0-9\b]+$/;
        const { quantityitem } = this.state;
        this.setState({ quantityitem: e.target.value })
        if ((e.target.value > 9999) || (e.target.value < 1) || (qtypattern.test(e.target.value)) > 9999 || (qtypattern.test(e.target.value)) < 1  ) {
            document.getElementById("sale-item-modify-quantity-error").style.display = "block";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled = true;
        }
        else {
            document.getElementById("sale-item-modify-quantity-error").style.display = "none";
            document.getElementsByClassName("sale-item-modify-quantity-ok")[0].disabled =  false;
        }
    }*/

    updateGiftReceiptEntry(e) {
        const { giftitem } = this.state;
        this.setState({giftitem: e.target.value })
         
        if ((e.target.value < 1) ) {
           // document.getElementById("sale-item-modify-gift-registry-error").style.display = "block";
            document.getElementsByClassName("sale-item-gift-receipt-ok")[0].disabled = true;
        }
        else {
           // document.getElementById("sale-item-modify-gift-registry-error").style.display = "none";
            document.getElementsByClassName("sale-item-gift-receipt-ok")[0].disabled =  false;
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
        


        return (
            <div className='sale-item-gift-receipt-container'>
                <img src={trans_Modify} className='sale-item-gift-receipt-icon' />
                <div className='sale-item-gift-receipt-label'>Gift Receipt</div>
                <form class="SaleItemGiftReceiptForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.SaleItemGiftReceiptSubmit(e)}}>
                    
                
                <div className='sale-item-gift-receipt-content'>Click OK to <strong>apply</strong> gift receipt to all line items</div>
                    <div className="sale-item-gift-receipt-buttons-lff">
                    <div className="sale-item-gift-receipt-cancel" onClick={() => this.props.showItemGiftReceiptModal(false,this.props.modify_type)}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="sale-item-gift-receipt-cancel-btn">CANCEL</div>
                    </div>
                    <button className="sale-item-gift-receipt-ok" type="submit" >OK</button>
                    </div>
                </form>
            </div>
        )
    }
};



export class SaleItemGiftReceiptRemove extends Component {

  
    constructor(props) {
        super(props)
        this.state = {
            quantityitem: '',
            giftitem:''

        }
        this.SaleItemGiftReceiptRemoveSubmit = this.SaleItemGiftReceiptRemoveSubmit.bind(this);
    }

    SaleItemGiftReceiptRemoveSubmit(e){
        e.preventDefault();
        console.log('Sales Item gift registry Remove SUBMITING');
        this.props.saleitemGiftReceiptUpdate(this.state.giftitem,this.props.modify_type);
        this.props.showItemGiftReceiptModal(false,this.props.modify_type);  
    }

    updateGiftReceiptEntry(e) {
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
        return (
            <div className='sale-item-gift-receipt-remove-container'>
                <img src={trans_Modify} className='sale-item-gift-receipt-icon' />
                <div className='sale-item-gift-receipt-remove-label'>Gift Receipt</div>
                <form class="SaleItemGiftReceiptForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.SaleItemGiftReceiptRemoveSubmit(e)}}>
                    <div className='sale-item-gift-receipt-remove-content'> Gift receipts are applied.
                        Click OK to <strong>remove</strong> gift receipts from all line items.
                    </div>
                    <div className="sale-item-gift-receipt-remove-buttons-lff">
                    <div className="sale-item-gift-receipt-remove-cancel" onClick={() => this.props.showItemGiftReceiptModal(false,this.props.modify_type)}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="sale-item-gift-receipt-remove-cancel-btn">CANCEL</div>
                    </div>
                    <button className="sale-item-gift-receipt-remove-ok" type="submit" >OK</button>
                    </div>
                </form>
            </div>
        )
    }
};

export class SaleItemGiftReceiptSFF extends Component {

 

    constructor(props) {
        super(props)
        this.state = {
            giftregistry: '',
            isEnabled:true,
       
            currentItem:''

        }
        this.saleitemGIftRecieptSubmit = this.saleitemGIftReceiptSubmit.bind(this);
        
    }

    
    saleitemGIftReceiptSubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING');
     // console.log(this.props.currentItem);
        this.props.saleitemGiftReceiptUpdate(this.props.modify_type);
    }
    
    updategiftreceiptEntry(e) {
        
        const {giftreceipt} = this.state;
        this.setState({giftreceipt: e.target.value ,
                    
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
       

        return (
            <div className='sale-item-gift-receipt-container'>
            
              <div className='sale-item-gift-receipt-label sff-receipt'>{'Trans Modify: Gift Receipt'}</div>
              <form className="SaleItemGiftReceiptForm" onSubmit={(e) => {
                  e.preventDefault();
                  this.saleitemGIftReceiptSubmit(e)}}>
                <div className="sff-receipt">
                <div className='sale-item-gift-receipt-content'>Click OK to <strong>apply</strong> gift receipt to all line items.</div>

               </div>
                <div className={this.props.modify_type=='item'?"sale-item-gift-reciept-buttons":"sale-item-gift-receipt-buttons trans-modify-buttons-sfff"}>
                <div className="sale-item-gift-receipt-canceldiv" onClick={this.props.hideItemModifyModalSmallFF}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className="sale-item-gift-receipt-cancel-btn">CANCEL</div>
                </div>
                <button className="sale-item-gift-receipt-ok-btn " type="submit" >OK</button>
                </div>
              </form>
              

            </div>
        )
    }
};


export class SaleItemRemoveGiftReceiptSFF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            giftReceiptErrorModal:true,
           giftregistry:""

        }
        this.saleitemremoveGiftReceiptySubmit = this.saleitemremoveGiftReceiptSubmit.bind(this);
    }   
    saleitemremoveGiftReceiptSubmit(e){
        e.preventDefault();
        console.log('Sales Item Update SUBMITING');
     // console.log(this.props.currentItem);
     this.props.saleitemGiftReceiptUpdate(this.state.giftitem,this.props.modify_type);
     this.giftReceiptCloseModal();  
    }
    
    giftReceiptCloseModal = () =>{
        this.setState({ giftReceiptErrorModal:false})
        this.props.hideItemModifyModalSmallFF();
        document.getElementsByClassName('sale-sff-item-modify-container')[0].style.display = "none";
        document.getElementsByClassName('sale-content-container-outer')[0].style.display = "block";
        document.getElementsByClassName('sale-footer-container-outer')[0].style.display = "block";
    }
    render() {
        return (
   

    <div className='sale-item-gift-receipt-container-remove'>
            
            <div className='sale-item-gift-receipt-label sff-receipt'>{'Trans Modify: Gift Receipt'}</div>
            <form className="SaleItemGiftReceiptForm" onSubmit={(e) => {
                e.preventDefault();
                this.saleitemremoveGiftReceiptSubmit(e)}}>
              <div className="sff-receipt">
              <div className='sale-item-gift-receipt-content-remove'> <div>Gift receipts are applied.</div><div> Click OK to <strong>remove</strong> gift receipts from all</div><div> line items.</div></div>

             </div>
              <div className={this.props.modify_type=='item'?"sale-item-gift-receipt-buttons":"sale-item-gift-receipt-buttons trans-modify-buttons-sfff"}>
              <div className="sale-item-gift-receipt-canceldiv" onClick={this.props.hideItemModifyModalSmallFF}>
                <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                <div className="sale-item-gift-receipt-cancel-btn">CANCEL</div>
              </div>
              <button className="sale-item-gift-receipt-ok-btn " type="submit" >OK</button>
              </div>
            </form>
            

          </div>
    

        )
}
};


