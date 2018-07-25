import React, { Component } from 'react';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {itemsSelectedAction, itemSelectedAction } from '../../../../common/cartRenderer/actions';

import ItemsToBeshippedView from '../View/itemsToBeShippedView'

class ItemsToBeShipped extends Component {

    getItemDetails = () =>{
        var requestObjectArr = [];
        for(var i = 0; i<this.props.items.length;i++){
            console.log('SHIV: GETITEMDETAILS: In first for',this.props.items[i][0])
            for(var j = 0; j <this.props.selectedItems.length;j++){
                console.log('SHIV: GETITEMDETAILS: In second for', this.props.selectedItems[j])
                if(this.props.items[i][0].lineNumber === this.props.selectedItems[j]){
                    console.log('SHIV: GETITEMDETAILS: In if', this.props.items[i]);
                    requestObjectArr.push(
                        {
                            "ItemNumber":this.props.items[i][0].itemNumber,
                            "LineNumber":this.props.items[i][0].lineNumber
                        }
                    )
                }
            }
        }
        console.log('SHIV: GETITEMDETAILS REQUESTOBJ:',requestObjectArr)
        return requestObjectArr;
    }

    render() {
        console.log("SHIV: ITEMSTOBESHIPPED SELECTED ITEMS", this.props.selectedItems)
        console.log('Sweezey : itemsToBeShippedView.js', this.props.items);
        return (
            <ItemsToBeshippedView
                items={this.props.items}
                selectedItems={this.props.selectedItems}
                getItemDetails={this.getItemDetails}
                updateObjectHandler={this.props.updateObjectHandler}
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                setCurrentItem = {(itemNumber,itemPrice,itemSku,selectedItem,index) => this.props.itemsSelectedAction(selectedItem)}
                optionalFooter={this.props.optionalFooter}
            />
        );
    }
}


function mapStateToProps({selectedItems}) {
    return { selectedItems }
  }

const mapDispatchToProps = (dispatch)  => {
    return bindActionCreators(
        {
          itemsSelectedAction,
          itemSelectedAction
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsToBeShipped);