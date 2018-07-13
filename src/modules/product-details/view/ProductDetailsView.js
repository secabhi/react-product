import React, { Component } from 'react';
import { Switch, Route,Link } from 'react-router-dom'
//Header and Footer


//View Components
import ProductDetailsHeader from './Components/ProductDetailsHeader';
import ProductDetailsImages from './Components/ProductDetailsImages';
import ProductDetailsRows from './Components/ProductDetailsRows';
//constans

//Material UI

//
import './ProductDetailsView.css';

export default class ProductDetailsView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            radioValue: '',
            pimSKU: '',
            productSearchResult: [],
            productSearchSKUResult : '',
        }
    }

    handleTextFieldInput = (event) =>{
        document.getElementsByClassName('product-search-input-area-clear-btn')[0].style.opacity = "1";
        document.getElementsByClassName('product-search-input-area-search-btn')[0].style.opacity = "1";
        this.setState({pimSKU: event.target.value})
    };

    handleAPIInvoker = () => {
        this.props.invokePimSKUAPI(this.state.pimSKU)
        .then(res => {
            this.setState({productSearchSKUResult : res.data.data.products[0]});
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleChangeRadio = (event) => {
        this.setState({ radioValue: event.target.value });
      };

    render() {

      let { product } = this.props;
      return(
        <div className='product-details-container'>
          <div className='product-details-content'>
            <ProductDetailsHeader product={product}/>
            <div className="product-details-info">
              <div className="product-details-images">
                <div>
                  <ProductDetailsImages product={product}/>
                </div>
                <div>
                  <span>Similar Items</span>
                </div>
              </div>
              <div className="product-details-rows">
                <ProductDetailsRows product={product}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
