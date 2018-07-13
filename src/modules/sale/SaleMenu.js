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
import ItemModifyDropdown from './ItemModifyDropdown';
import SaleServicesMenu from './sale-services/SaleServicesMenu';
import TransModifyDropDown from './transModifiy/transModifyDropDown/transModifyDropDown';

// Styles
import './sale-menu.css';


export default class SaleMenu extends Component {
  constructor(props) {
    super(props);
    this.state={
      sendOptionSelected: false,
      discountsApplied:[]
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
    var clickedItem = Object.assign({},this.props.items[index][0])
    //clickedItem.LineNumber = "100";
    console.log('Void Line clickedItem: ', clickedItem);
    console.log('Void Line props: ', this.props.items[index][0]);
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

  render() {
    return (
      [
        <div className="sidenav" key='lff'>
              <ItemModifyDropdown history={this.props.history} 
              currentItem={this.props.currentItem} 
	            registryCLickStyle = {this.props.registryCLickStyle}
              voidLineItem={this.voidLineItem}
              showQuantityModal={this.props.showQuantityModal}
              showVoidLineConfirmModal={this.showVoidLineConfirmModal}
              showReplenishmentModal={this.props.showReplenishmentModal}
              showGiftRegistryModal={this.props.showGiftRegistryModal}
              handleChangedropdownColor = {this.props.handleChangedropdownColor}
              showSplitCommissionModal={this.props.showSplitCommissionModal}
              showItemModifyPriceModal={this.props.showItemModifyPriceModal}
              showItemGiftRegistryModal={this.props.showItemGiftRegistryModal}
              showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
              showSpecialInstructionsModal={this.props.showSpecialInstructionsModal}
              isItemSelected={this.props.isItemSelected}
              itemPromotionDetails = {this.props.itemPromotionDetails}
              item={this.props.items[this.props.currentItem]}
              showModifyErrorModal={this.props.showModifyErrorModal}
              />
    
              <SaleServicesMenu
                history={this.props.history} 
                currentItem={this.props.currentItem} 
                voidLineItem={this.voidLineItem}
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
                  active={this.props.active}
                  TransTaxExempt={() => this.props.TransTaxExempt()}
                  transGiftRegistry={() => this.props.transGiftRegistry('transGiftregistry')}
                  transGiftReceipt={() => this.props.transGiftReceipt()}
                  splitCommissionOpened={() => this.props.splitCommissionOpened('transmodifysplit')}
                  handleChangeTransdropdownColor = {this.props.handleChangeTransdropdownColor}
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
              <div className="option-list"><img className="icon-gift-card" src={giftCard} alt="gift-card"/>Gift Card</div> 
              
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
