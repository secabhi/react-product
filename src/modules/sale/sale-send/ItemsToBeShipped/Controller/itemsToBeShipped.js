import React, { Component } from 'react';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {itemsSelectedAction, itemSelectedAction } from '../../../../common/cartRenderer/actions';

import ItemsToBeshippedView from '../View/itemsToBeShippedView'

class ItemsToBeShipped extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectionMade : false
        }
    }

    getItemDetails = () =>{
        var requestObjectArr = [];
        for(var i = 0; i<this.props.items.length;i++){
            console.log('SHIV: GETITEMDETAILS: In first for',this.props.items[i][0])
            console.log('SHIV: GETITEMDETAILS: In second for', this.props.selectedItems[j])
            for(var j = 0; j <this.props.selectedItems.length;j++){
                console.log('SHIV: GETITEMDETAILS: In second for', this.props.selectedItems[j])
                if(i === this.props.selectedItems[j]){
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

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.selectedItems.length > 0){
        //     this.setState({selectionMade:true})
        // }else{
        //     this.setState({selectionMade:false})
        // }
    }

    render() {
        return (
            <ItemsToBeshippedView
                items={this.props.items}
                selectedItems={this.props.selectedItems}
                getItemDetails={this.getItemDetails}
                updateObjectHandler={this.props.updateObjectHandler}
                componentChangeHandler={(value) => {this.props.componentChangeHandler(value)}}
                setCurrentItem = {(itemNumber,itemPrice,itemSku,selectedItem,index) => this.props.itemSelectedAction(index)}
                optionalFooter={this.props.optionalFooter}
                selectionMade={this.state.selectionMade}
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
          itemSelectedAction
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsToBeShipped);