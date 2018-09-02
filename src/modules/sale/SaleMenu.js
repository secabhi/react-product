// Dependecies
import React, { Component } from 'react';

// Images
import itemModify from '../../resources/images/Item_Modify.svg';
import services from '../../resources/images/Services.svg';
import transModify from '../../resources/images/Trans_Modify.svg';
import followUp from '../../resources/images/Reminder.svg';
import send from '../../resources/images/Send.svg';
import giftCard from '../../resources/images/Gift_Card.svg';
import closeButton from '../../resources/images/Cross_Black.svg';
import send_selected from '../../resources/images/Send_Selected.svg';


// Components
import {activateSwipGiftCard} from '../sale/sale-giftcard/GiftCardContainer';
//import GiftCard from '../sale/sale-giftcard/GiftCardContainer';
import ItemModifyDropdown from './ItemModifyDropdown';
import SaleServicesMenu from './sale-services/SaleServicesMenu';
import TransModifyDropDown from './transModifiy/transModifyDropDown/transModifyDropDown';
import {each} from 'underscore';
// Styles
import './sale-menu.css';


export default class SaleMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      sendOptionSelected: false,
      discountsApplied:[],
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log("SaleMenu componentWillReceiveProps: ",nextProps);
  }

  closeNav() {
    document.getElementById("modifyMenu").style.display = "none";
    document.getElementById("modifyMenuOverlay").style.display = "none";
  }

  voidLineItem = (index) => {
    console.log('MIKE CART ITEMS ', this.props.items)
    console.log('MIKE CART ITEMS + INDEX', this.props.items[index]);

    var clickedItem = Object.assign({},this.props.items[index[0]][index[1]]);
    console.log('Void Line clickedItem: ', clickedItem);
    this.props.voidLineItem(clickedItem);
  }

  showVoidLineConfirmModal = (showFlag,index) => {
    var clickedItem = Object.assign({},this.props.items[index][0])
    //clickedItem.LineNumber = "100";
    console.log('Void Line clickedItem: ', clickedItem);
    console.log('Void Line props: ', this.props.items[index][0]);
    this.closeNav();
    this.props.showVoidLineConfirmModal(true,clickedItem);
    //this.props.voidLineItem(clickedItem);
  }

  renderGiftCard = () => {
    this.props.history.push('/gift-card')
    this.props.activateSwipGiftCard();
  }

  render() {
    return (
      [
        <div className="sidenav" key='lff'>
              <ItemModifyDropdown history={this.props.history} 
              currentItem={this.props.currentItem} 
              selectedItem = {this.props.selectedItem}
              registryCLickStyle = {this.props.registryCLickStyle}
              voidLineItem={this.voidLineItem}
              showQuantityModal={this.props.showQuantityModal}
              showVoidLineConfirmModal={this.showVoidLineConfirmModal}
              showReplenishmentModal={this.props.showReplenishmentModal}
              showGiftRegistryModal={this.props.showGiftRegistryModal}
              handleChangedropdownColor = {this.props.handleChangedropdownColor}
              showSplitCommissionModal={this.props.showSplitCommissionModal}
              showItemModifyPriceModal={this.props.showItemModifyPriceModal}
              showItemModifyTaxModal={this.props.showItemModifyTaxModal}
              showItemGiftRegistryModal={this.props.showItemGiftRegistryModal}
              showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
              showSpecialInstructionsModal={this.props.showSpecialInstructionsModal}
              isItemSelected={this.props.isItemSelected}
              loadPriceDrpDown={this.props.loadPriceDrpDown}
              itemPromotionDetails = {this.props.itemPromotionDetails}
              disableGiftReceipt = {this.props.disableGiftReceipt}
              item={this.props.items[this.props.currentItem]}
              items={this.props.items}
              showModifyErrorModal={this.props.showModifyErrorModal}
              nonSkuSelection={this.props.nonSkuSelection}
              />
    
              <SaleServicesMenu
                history={this.props.history} 
                currentItem={this.props.currentItem} 
                voidLineItem={this.voidLineItem}
                items={this.props.items}
                nonSkuSelection={this.props.nonSkuSelection}
                showGiftWrapError = {this.props.showGiftWrapError}
              />

              <div className="option-list">
                <TransModifyDropDown
                  CLickStyle = {this.props.CLickStyle} 
                  disableOptionsMenu={this.props.disableOptionsMenu}
                  showTransGiftRegistryModal={this.props.showTransGiftRegistryModal}
                  showTransGiftReceiptModal={this.props.showTransGiftReceiptModal}
                  showTransGiftReceiptModal={this.props.showTransGiftReceiptModal}
                  closeNav={this.closeNav}
                  showSplitCommissionModal={this.props.showSplitCommissionModal}
                  showTransDiscount={() => this.props.showTransDiscount()}
                  showAssociateDiscount={() => this.props.showAssociateDiscount()}
                  activeTransModify={this.props.activeTransModify}
                  active={this.props.active}
                  disableGiftReceipt ={this.props.disableGiftReceipt}
                  items={this.props.items}
                  TransTaxExempt={() => this.props.TransTaxExempt()}
                  transGiftRegistry={() => this.props.transGiftRegistry('transGiftregistry')}
                  transGiftReceipt={() => this.props.transGiftReceipt()}
                  splitCommissionOpened={() => this.props.splitCommissionOpened('transmodifysplit')}
                  handleChangeTransdropdownColor = {this.props.handleChangeTransdropdownColor}
                  currentItem={this.props.currentItem} 
                  nonSkuSelection={this.props.nonSkuSelection}
                />
              </div>

              {/* <div className="option-list"><img className="icon-followup" src={followUp} alt="follow-up"/>Follow Up</div> */}

              <div 
                className='option-list' 
                style={ this.props.items[0] ? {opacity: '1'} : {opacity: '.5', pointerEvents: 'none'} }
                onClick={
                  () => {
                    this.props.setSendOptionSelected(true);
                    this.props.showEmailTrackingModal(true);
                  }
                }
              >
                <img className='icon-send' src={this.props.isSendOptionSelected ? send_selected : send} alt="send"/>Send
              </div>
              <div className="option-list"><img className="icon-gift-card" src={giftCard} alt="gift-card" onClick={ () =>this.renderGiftCard()}/>Gift Card</div> 
              
        </div>,
        
        <div className="saleMenu-overlay" id='modifyMenuOverlay' key='sff'>
          <div className="sidenav-small" id="modifyMenu">
                
                <div className="option-list-closeButton" >Options<img className="close-button" onClick={this.closeNav} src={closeButton}/></div>
                {/*<div className="option-list"><img className="icon-modify" src={itemModify} alt="item-modify"/>Item Modify</div>*/}
                <ItemModifyDropdown history={this.props.history} 
                  currentItem={this.props.currentItem} 
                  voidLineItem={this.voidLineItem}
                  showQuantityModal={this.props.showQuantityModal}
                  showSpecialInstructionsModal={this.props.showSpecialInstructionsModal}
                  showVoidLineConfirmModal={this.showVoidLineConfirmModal}
                  closeNav={this.closeNav}
                  showItemModifyModalSmallFF={this.props.showItemModifyModalSmallFF}
                  itemPromotionDetails = {this.props.itemPromotionDetails}
                  item={this.props.items[this.props.currentItem]}
                  showModifyErrorModal={this.props.showModifyErrorModal}/>
                  
                <SaleServicesMenu
                  history={this.props.history} 
                  currentItem={this.props.currentItem}
                  items={this.props.items}
                />

                <div className="option-list">
                  <TransModifyDropDown 
                    disableOptionsMenu={this.props.disableOptionsMenu}
                    closeNav={this.closeNav}
                    transGiftRegistry={() => this.props.transGiftRegistry('transmodifysplit')}
                    transGiftReceipt={() => this.props.transGiftReceipt()}
                    showTransDiscount={() => this.props.showTransDiscount()}
                    showAssociateDiscount={() => this.props.showAssociateDiscount()}
                    active={this.props.active}
                    showSplitCommissionModal={this.props.showSplitCommissionModal}
                    TransTaxExempt={() => this.props.TransTaxExempt()}
                    splitCommissionOpened={() => this.props.splitCommissionOpened('transmodifysplit')}
                    
                  />
              </div>
                <div className="option-list"><img className="icon-followup" src={followUp} alt="follow-up"/>Follow Up</div>
                
                <div 
                  className="option-list"
                  style={ this.props.items[0] ? {opacity: '1'} : {opacity: '.5', pointerEvents: 'none'} }
                  onClick={
                    () => {
                      this.closeNav();
                      this.props.showEmailTrackingModal(true);
                    }
                  }  
                >
                  <img className="icon-send" src={send} alt="send"/>Send
                </div>
                <div className="option-list"><img className="icon-gift-card" src={giftCard} alt="gift-card"/>Gift Card</div>  
          </div>
        </div>
      ]
    )
  }
};



