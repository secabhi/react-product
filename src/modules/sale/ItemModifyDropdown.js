import React, { Component } from 'react';
import './item-modify-dropdown.css';
import itemModify from '../../resources/images/Item_Modify.svg';
import itemModifySelected from '../../resources/images/Item_Modify_Selected.svg';

import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import accordianOpen from '../../resources/images/Accordian_Open.svg';
import accordianClose from '../../resources/images/Accordian_Closed.svg';

import { TextField } from 'material-ui';

import Modal from 'react-responsive-modal';

import './sale-menu.css';

export default class ItemModifyDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      dropdownPriceOpen:false,
      registryCLickStyle:'',
      discountsApplied : {
        mkdPerc : false,
        mkdPercCount : 0,
        mkdDollar : false,
        mkdDollarCount : 0,
        mkdNewPrice : false,
        mkdNewPriceCount : 0,
        priceOverride : false,
        priceOverrideCount : 0,
        omniPerc : false,
        omniPercCount : 0,
        omniDollar : false,
        omniDollarCount : 0,
        omniNewPrice : false,
        omniNewPriceCount : 0,
        totalDiscounts : 0
      }
    };

  }

  componentWillReceiveProps(nextProps) {
    debugger;
    console.log("ItemModifyDropdown nextProps: ", nextProps);
    var discountsApplied = {
      mkdPerc : false,
      mkdPercCount : 0,
      mkdDollar : false,
      mkdDollarCount : 0,
      mkdNewPrice : false,
      mkdNewPriceCount : 0,
      priceOverride : false,
      priceOverrideCount : 0,
      omniPerc : false,
      omniPercCount : 0,
      omniDollar : false,
      omniDollarCount : 0,
      omniNewPrice : false,
      omniNewPriceCount : 0,
      totalDiscounts : 0
    }
    if(nextProps.item !== undefined && nextProps.item !== null && nextProps.item !== '') {
      for(var i=0; i<nextProps.item[0].discounts.length; ++i) {
        switch(nextProps.item[0].discounts[i].discounttype) {
          case "Mkd Percentage Off":
            discountsApplied.mkdPerc = true;
            discountsApplied.mkdPercCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Mkd Dollar Off":
            discountsApplied.mkdDollar = true;
            discountsApplied.mkdDollarCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Price Override Off":
            discountsApplied.priceOverride = true;
            discountsApplied.priceOverrideCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Mkd New Price Off":
            discountsApplied.mkdNewPrice = true;
            discountsApplied.mkdNewPriceCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Omni Percentage Off":
            discountsApplied.omniPerc = true;
            discountsApplied.omniPercCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Omni Dollar Off":
            discountsApplied.omniDollar = true;
            discountsApplied.omniDollarCount++;
            discountsApplied.totalDiscounts++;
            break;
          case "Omni New Price Off":
            discountsApplied.omniNewPrice = true;
            discountsApplied.omniNewPriceCount++;
            discountsApplied.totalDiscounts++;
            break;
          default:
            break;
        }
      }
    }
    console.log("discountsApplied: ",discountsApplied);
    /* if (nextProps.isItemSelected === true) {
      this.setState({dropdownOpen:true})
    }
    else if (nextProps.isItemSelected === false) {
      this.setState({dropdownOpen:false})
    }
    else  */
    if (nextProps.currentItem === '' || Object.keys(nextProps.itemPromotionDetails).length === 0) {
      this.setState({dropdownOpen:false, discountsApplied: discountsApplied})
    }
    else {
      this.setState({dropdownPriceOpen:true})
      this.setState({dropdownOpen:true,discountsApplied: discountsApplied})
    }
  }

  handleChangedropdown = () => {
    if(this.props.currentItem !== '') {
      this.setState({dropdownOpen:!this.state.dropdownOpen})
    }
  }
  handleChangePricedropdown = () => {
      if(this.state.dropdownPriceOpen){
        this.setState({dropdownPriceOpen:!this.state.dropdownPriceOpen})
      }else{
        this.props.loadPriceDrpDown();
      }
  }
  
  changeMenu = e => {
    /* if(this.props.itemPromotionDetails !== '' && this.props.itemPromotionDetails !== null && this.props.itemPromotionDetails !== undefined) {
      console.log('PROMOTION DETAILS AVAILABLE');
      console.log(this.props.itemPromotionDetails.pP_MKDPEROFF.enable)
    }
    else {
      console.log('PROMOTION DETAILS NOT AVAILABLE');
    } */
    var discountsApplied = this.state.discountsApplied;
    if(Object.keys(this.props.itemPromotionDetails).length !== 0) {
      if(window.innerWidth > 1080) {
        switch(e.target.getAttribute('off')) {
          case 'mkdPerc' : {
            if(this.props.itemPromotionDetails.pP_MKDPEROFF.enable === true) {
              if(discountsApplied.mkdNewPriceCount > 0) {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Mkd % Off','Enter % Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else if(discountsApplied.priceOverrideCount > 0) {
                if(discountsApplied.totalDiscounts < 3) {
                  this.props.showItemModifyPriceModal(true,'Price : Mkd % Off','Enter % Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Mkd % Off','Enter % Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
            }
            else {
              console.log("Promotion details not available");
              //this.props.showItemModifyPriceModal(true,'Price : Mkd % Off','Enter % Off'); //TO BE REMOVED
            }
            break;
          }
          case 'mkdDollar' : {
            if (this.props.itemPromotionDetails.pP_MKDDOLOFF.enable === true) {
              if(discountsApplied.mkdNewPriceCount > 0) {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Mkd $ Off','Enter $ Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else if(discountsApplied.priceOverrideCount > 0) {
                if(discountsApplied.totalDiscounts < 3) {
                  if(discountsApplied.mkdDollarCount < 1) {
                    this.props.showItemModifyPriceModal(true,'Price : Mkd $ Off','Enter $ Off');
                  }
                  else {
                    this.props.showModifyErrorModal(true,"Only one keyed dollar allowed");
                  }
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                if(discountsApplied.totalDiscounts < 2) {
                  if(discountsApplied.mkdDollarCount < 1) {
                    this.props.showItemModifyPriceModal(true,'Price : Mkd $ Off','Enter $ Off');
                  }
                  else {
                    this.props.showModifyErrorModal(true,"Only one keyed dollar allowed");
                  }
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              };
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          case 'priceOverride' : {
            if (this.props.itemPromotionDetails.pP_PRICEOVERRIDE.enable === true) {
              if(discountsApplied.totalDiscounts < 3) {
                if(discountsApplied.priceOverrideCount < 1) {
                  if(discountsApplied.mkdNewPriceCount < 1) {
                    this.props.showItemModifyPriceModal(true,'Price : Price Override','Enter Ticket Price');
                  }
                  else {
                    this.props.showModifyErrorModal(true,"Price override not allowed on this item")
                  }
                }
                else {
                  this.props.showModifyErrorModal(true,"Price override not allowed on this item")
                }
              }
              else {
                this.props.showModifyErrorModal(true,"No more discounts allowed")
              }
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          case 'mkdNewPrice' : {
            if (this.props.itemPromotionDetails.pP_MKDNEWPRICE.enable === true) {
              //this.props.showItemModifyPriceModal(true,'Price : Mkd New Price','Enter Price');
              if(discountsApplied.totalDiscounts < 2) {
                if(discountsApplied.mkdNewPriceCount < 1) {
                  this.props.showItemModifyPriceModal(true,'Price : Mkd New Price','Enter Price');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                this.props.showModifyErrorModal(true,"No more discounts allowed")
              }
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          case 'omniPerc' : {
            if (this.props.itemPromotionDetails.pP_OMNIMKDPEROFF.enable === true) {
              //this.props.showItemModifyPriceModal(true,'Price : Omni Mkd % Off','Enter % Off');
              if(discountsApplied.omniNewPriceCount > 0) {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Omni Mkd % Off','Enter % Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Omni Mkd % Off','Enter % Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          case 'omniDollar' : {
            if (this.props.itemPromotionDetails.pP_OMNIMKDDOLOFF.enable === true) {
              //this.props.showItemModifyPriceModal(true,'Price : Omni Mkd $ Off','Enter $ Off');
              if(discountsApplied.omniNewPriceCount > 0) {
                if(discountsApplied.totalDiscounts < 2) {
                  this.props.showItemModifyPriceModal(true,'Price : Omni Mkd $ Off','Enter $ Off');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                if(discountsApplied.totalDiscounts < 2) {
                  if(discountsApplied.omniDollarCount < 1) {
                    this.props.showItemModifyPriceModal(true,'Price : Omni Mkd $ Off','Enter $ Off');
                  }
                  else {
                    this.props.showModifyErrorModal(true,"Only one keyed dollar allowed");
                  }
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          case 'omniNewPrice' : {
            if (this.props.itemPromotionDetails.pP_OMNIMKDNEWPRICE.enable === true) {
              //this.props.showItemModifyPriceModal(true,'Price : Omni Mkd New Price','Enter Price');
              if(discountsApplied.totalDiscounts < 2) {
                if(discountsApplied.omniNewPriceCount < 1) {
                  this.props.showItemModifyPriceModal(true,'Price : Omni Mkd New Price','Enter Price');
                }
                else {
                  this.props.showModifyErrorModal(true,"No more discounts allowed")
                }
              }
              else {
                this.props.showModifyErrorModal(true,"No more discounts allowed")
              }
            }
            else {
              console.log("Promotion details not available");
            }
            break;
          }
          default: {
            break;
          }
        }
      }
      else {
        this.props.closeNav();
        this.props.showItemModifyModalSmallFF(e.target.getAttribute('off'));
      }
    }
  }

  voidLineItem = () => {
    if(this.props.currentItem !== '') {
      
      if(window.innerWidth>1080) {
        this.props.handleChangedropdownColor("LineVoid");        
        this.props.voidLineItem(this.props.currentItem);
      }
      else {
        this.props.closeNav();
        this.props.voidLineItem(this.props.currentItem);
      }
      //this.props.showVoidLineConfirmModal(true,this.props.currentItem);
    }
    else {
      //DO NOTHING
    }
  }

  changeQuantity = () => {
    if(this.props.currentItem !== '') {
      
      if(window.innerWidth>1080) {
        this.props.handleChangedropdownColor("Quantity")
        this.props.showQuantityModal(true);
      }
      else {
        this.props.closeNav();
        this.props.showItemModifyModalSmallFF('quantity');
      }
    }
    else {
      //DO NOTHING
    }
  }

  ModifySpecialInstructions = () => {
    if(this.props.currentItem !== '') {
      
      if(window.innerWidth>1080) {
        this.props.handleChangedropdownColor("SpecialInstructions")
        this.props.showSpecialInstructionsModal(true);
      }
      else {
        this.props.closeNav();
        this.props.showItemModifyModalSmallFF('specialInstructions');
        
      }
    }
    else {
      //DO NOTHING
    }
  }

  splitCommissionOpened = (modifytype) => {
    if(this.props.currentItem !== '') {
    if(window.innerWidth > 1080) {
        this.props.handleChangedropdownColor(modifytype);
          this.props.showSplitCommissionModal(true,modifytype);
      }
      else {
        this.props.closeNav();
          if(modifytype=='transmodifysplit'){
           
            this.props.showItemModifyModalSmallFF('transmodifysplit');
       
        }
      else if(modifytype=='itemsplit'){
        //debugger;
        this.props.showItemModifyModalSmallFF('splitCommission');
      
        }    
      }    
    }
  }

  replishmentOpened = () => {
    
    if(window.innerWidth>1080) {
      this.props.handleChangedropdownColor("Replenishment");
      this.props.showReplenishmentModal(true);
    }
    else {
      this.props.closeNav();
      this.props.showItemModifyModalSmallFF('replenishment');
    }
  }

  giftRegistryOpened = () => {
    if(window.innerWidth>1080) {
      this.props.showGiftRegistryModal(true);''
    }
    else {
      this.props.closeNav();
      this.props.showItemModifyModalSmallFF('giftregistry');
    }
  }
  
  itemGiftRegistry = () => {
    if(this.props.currentItem !== '') {

      if(window.innerWidth>1080) {
        this.props.handleChangedropdownColor("IteamRegistry");
        this.props.showItemGiftRegistryModal(true,'IteamRegistry'); 
      }
      else {
        this.props.closeNav();
        this.props.showItemModifyModalSmallFF('gift');
      }
    }
    else {
      //DO NOTHING
    }
  }

  itemGiftReceipt = () => {
    if(this.props.currentItem !== '') {
      
      if(window.innerWidth>1080) {
        this.props.handleChangedropdownColor('itemreceipt');
        this.props.showItemGiftReceiptModal(true,'itemreceipt');
      }
      else {
        this.props.closeNav();
        this.props.showItemModifyModalSmallFF('itemreceipt');
      }
    }
    else {
      //DO NOTHING
    }
  }

  render() {

    return (
               <div className="option-list drop-down-custom" style={this.props.disable}>
                  <div className={(this.props.currentItem !== '')?"button-enabled-style":"button-disabled-style"}>
                    <img onClick={this.handleChangedropdown} className="icon-modify" src={this.state.dropdownOpen?itemModifySelected:itemModify} alt="item-modify"/>
                    <div onClick={this.handleChangedropdown} className="item-modify-menu-item">Item Modify</div>
                    <img onClick={this.handleChangedropdown} className="menu-dropdown" src={this.state.dropdownOpen?accordianOpen:accordianClose} />
                  </div>
                {/*-----------------React Item modify sub menu----------------------*/}
                {this.state.dropdownOpen?
                
                <div className="drop-down-menu-custom">
                  <div className="drop-down-custom-sub">
                    <div className="button-enabled-style">
                      <div onClick={this.handleChangePricedropdown} className={"item-modify-menu-item"}>Price</div>
                      <img onClick={this.handleChangePricedropdown} className="menu-dropdown" src={this.state.dropdownPriceOpen?accordianOpen:accordianClose} />                      
                    </div>
                    {this.state.dropdownPriceOpen?
                    <div className="price-modifications">
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_MKDPEROFF.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="mkdPerc">Mkd % Off</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_MKDDOLOFF.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="mkdDollar">Mkd $ Off</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_PRICEOVERRIDE.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="priceOverride">Price Override</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_MKDNEWPRICE.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="mkdNewPrice">Mkd New Price</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_OMNIMKDPEROFF.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="omniPerc">Omni Mkd% Off</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_OMNIMKDDOLOFF.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="omniDollar">Omni Mkd $ Off</div>
                        <div className={"drop-down-menu-custom-menu" + (Object.keys(this.props.itemPromotionDetails).length !== 0)?(this.props.itemPromotionDetails.pP_OMNIMKDNEWPRICE.enable === true)?(" button-enabled-style"):(" button-disabled-style"):(" button-disabled-style")} onClick={this.changeMenu} off="omniNewPrice">Omni Mkd New Price</div>
                    </div>:
                    ""
                    }
                  </div>
                  <div className="drop-down-custom-sub">
                    <div className={(this.props.registryCLickStyle == "LineVoid")?"item-modify-click-style":""} onClick={this.voidLineItem}>Line Void</div>
                  </div>
                  <div className="drop-down-custom-sub">
                    <div className={(this.props.registryCLickStyle == "IteamRegistry")?"item-modify-click-style":""} onClick={this.itemGiftRegistry.bind(this)}>Gift Registry</div>
                  </div>
                  <div className="drop-down-custom-sub">
                    <div className={(this.props.registryCLickStyle == "itemreceipt")?"item-modify-click-style":""} onClick={this.itemGiftReceipt.bind(this)}>Gift Receipt</div>
                  </div>

                  {/* <div className="drop-down-custom-sub">
                    <div  onClick={this.splitCommissionOpened.bind(this,'transmodifysplit')}>Transmodifysplit</div >
                  </div> */}
                
                  <div className="drop-down-custom-sub"  >
                    <div className={(this.props.registryCLickStyle == "itemsplit")?"item-modify-click-style":""} onClick={this.splitCommissionOpened.bind(this,'itemsplit')}>Split Commission</div>                    
                  </div>


                  <div className="drop-down-custom-sub">
                    <div className={(this.props.registryCLickStyle == "Quantity")?"item-modify-click-style":""} onClick={this.changeQuantity}>Quantity</div>
                  </div>
                  <div className="drop-down-custom-sub">
                  <div className={(this.props.registryCLickStyle == "SpecialInstructions")?"item-modify-click-style":""} onClick={this.ModifySpecialInstructions}>Special Instructions</div>
                  </div>
                  <div className="drop-down-custom-sub">
                    <div className={(this.props.registryCLickStyle == "Replenishment")?"item-modify-click-style":""} onClick={this.replishmentOpened.bind(this)}>Replenishment</div>
                  </div>
                  <div className="drop-down-custom-sub">
                    <span>Tax</span>
                  </div>
                </div>:
              ""
                }
              </div>
 )
   
  }
};