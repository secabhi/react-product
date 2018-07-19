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

        }
    }

  render() {
      
    return (
      <div className="quantity-validation-container">

        <div className="quantity-validation-content">
          <div className="quantity-validation-text">Quantity Validation</div>
            <CartRenderer
              style= {{boxShadow: 'none'}}
              items = {this.props.items}
              // setCurrentItem = {this.setCurrentItem}
            />
            {/* <div className="cart-render-status">Available</div> */}
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
