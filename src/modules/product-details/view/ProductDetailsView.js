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
            prodDetails: {},
            prodDetailsUpdated: false
        }

    }

    componentDidMount() {
      if(this.props.navFromCustDetails == true) {
        console.log('PRANAV PDV DIDMOUNT ACTION')
        this.props.prodDetailInfoAction('pimsku_search', this.props.product, () => {
        });
      }
    }

    componentDidUpdate() {
        console.log('PRANAV PDV DIDUPDATE')
        if(this.state.prodDetailsUpdated == false) {
          this.setState({
            prodDetails : this.props.purchHistProdDetail[this.props.product.pimskuId],
            prodDetailsUpdated : true
          });
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
      let { product, onGoBack, currentStore } = this.props;
      return(
        <div className='product-details-container'>
          <div className='product-details-content'>
            <ProductDetailsHeader
              product={product}
              onGoBack={onGoBack}
              custInfo={this.props.custInfo}
              prodDetails={this.state.prodDetails} />
            <div className="product-details-info">
              <div className="product-details-images">
                <div>
                  <ProductDetailsImages 
                    product={product}
                    navFromCustDetails={this.props.navFromCustDetails}
                    prodDetails={this.state.prodDetails}
                  />
                </div>
              </div>
              <div className="product-details-rows">
                <ProductDetailsRows 
                  product={product}
                  prodDetails={this.state.prodDetails}
                  currentStore={this.props.currentStore}
                  storeList={this.props.storeList}
                  updateSelectionSize={this.props.updateSelectionSize}
                  updateSelectionColor={this.props.updateSelectionColor}
                  colorDisplayArr={this.props.colorDisplayArr}
                  sizeDisplayArr={this.props.sizeDisplayArr}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
}
