import React, { Component } from 'react';
import CartRenderer from '../../../../common/cartRenderer/cartRenderer';

import './quantity-validation.css';



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../../../../common/loading/spinnerAction';
import { itemSelectedAction } from '../../../../common/cartRenderer/actions';


class QuantityValidation extends Component {
    constructor(props) {
        super(props);

        this.state = {
          itemsArray : [], //Temporary fix
          itemAvailabilityArray : []
        }
    }

    componentWillMount() {
      console.log('QuantityValidation componentDidMount: ', JSON.stringify(this.props.items));
      this.setState({ 
        itemsArray : [[{"saleDAL":{},"itemNumber":"27","pim_SKU_ID":"401023029986","itemDesc":"Xmas Decor","styleDesc":"GLD OXFORD STRP TOWEL","brandDesc":"Caspari","color":"NO COLOR","size":"NO SIZE","taxCode":"\u0000","itemPrice":1,"salePrice":1,"taxPercent":10.5,"quantity":1,"itemsPrice":1,"totalPrice":1.1,"itemsTax":0.1,"itemTax":0.1,"department":"2022","class":"708","subClass":"708","itemType":"","priceType":"","currencyCode":"","unitOfMeasure":"","imgLink":"Image Not Found","presaleFlag":false,"lineNumber":"1","itemStatus":"1","item_Flag_1":0,"item_Flag_2":0,"item_Flag_3":0,"item_Misc_Flag":0,"eventNumber":"","eventDescription":"","replenishQty":0,"replenishDays":0,"gift_reg":"0","promisedDate":" ","alterationID":"0","salesId":"0","assistId":"0","egcAccountNum":"0","print_GWGR_Msg":null,"maxDiscount":78,"discounts":[],"comment":[],"sendOption":0,"isAutoReplenish":false}]],
        itemAvailabilityArray : [{
          "skuId": "401023029986",
          "lineNumber": "1",
          "availabilityStatus": "NONOST",
          "store": "0000"
          }] 
      });
    }
  
  render() {
      
    return (
      <div className="quantity-validation-container">

        <div className="quantity-validation-content">
          <div className="quantity-validation-text">Quantity Validation</div>
            <CartRenderer
              style= {{boxShadow: 'none'}}
              items = {this.state.itemsArray}
              //items = {this.props.items}
              setCurrentItem = {() => {console.log('setCurrentItem')}}
              quantityValidationFlag = {true}
              itemAvailabilityArray = { this.state.itemAvailabilityArray }
            />
            {/* <div className="cart-render-status">Available</div> 
             STILL FIGURING OUT A WAY OF DISPLAYING THE AVAILABLE, NON-OST, & MKD FLAGS ON CART ITEMS
            */}

        </div>
      </div>
    )
  }

  setCurrentItem = (itemNumber, itemPrice, itemSku, selectedItem, index) => {
    this.props.itemSelectedAction(selectedItem);
  }


}; // END CLASS


function mapStateToProps({ cart, sale, selectedItems  }) {
    return { cart, 
             lineNumber: selectedItems
            }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
          startSpinner,
          itemSelectedAction
        }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuantityValidation);
