import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
//Header and Footer
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';

//View Components
import { SearchComponentView } from './Components/Search/SearchComponentView';
import { ScanComponentView } from './Components/Scan/ScanComponentView';
import { BrowseComponentView } from './Components/Browse/BrowseComponentView';
//constans
import { PORDUCT_SEARCH } from '../../../../src/pathConstants';
//Material UI
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
//
import ProductCardView from './productCardView';
//import ProductList from './Components/List/ProductList';
import './ProductSearch.css';

export class ProductSearchView extends Component {
    debugger
    constructor(props) {
        super(props);
        this.state = {
            radioValue: '',
            pimSKU: '',
            productSearchResult: [],
            productSearchSKUResult: '',
        }
    }

    handleTextFieldInput = (event) => {
        document.getElementsByClassName('product-search-input-area-clear-btn')[0].style.opacity = "1";
        document.getElementsByClassName('product-search-input-area-search-btn')[0].style.opacity = "1";
        this.setState({ pimSKU: event.target.value })
    };

    handleAPIInvoker = () => {
        this.props.invokePimSKUAPI(this.state.pimSKU)
            .then(res => {
                this.setState({ productSearchSKUResult: res.data.data.products[0] });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangeRadio = (event) => {
        this.setState({ radioValue: event.target.value });
    };

    render() {

        var productSearchProps = {
            searchProductImage: this.props.searchProductImage,
            showRadioBtn1: this.props.showRadioBtn1,
            showRadioBtn2: this.props.showRadioBtn2,
            showRadioBtn3: this.props.showRadioBtn3,
            showRadioBtn4: this.props.showRadioBtn4,
            showRadioBtn5: this.props.showRadioBtn5,
            handleChange: this.props.handleChange,
            searchFields: this.props.searchFields,
            clearAll: this.props.clearAll,
            handleApiInvoker: this.props.handleApiInvoker
        }
        var productBrowseprops = {
            selectedCategory: this.props.selectedCategory,
            handleCategoryChange: this.props.handleCategoryChange,
            selectedSubCategory: this.props.selectedSubCategory,
            handleSubCategoryChange: this.props.handleSubCategoryChange,
            selectedDetail: this.props.selectedDetail,
            selectedDetailChange: this.props.selectedDetailChange,
            resetProductSearch: this.resetProductSearch,
            clickProductSearch: this.clickProductSearch

        }

        return (
            <div className='product-search-container'>
                <div className='product-search-subheader-area-lff'>
                    <div className='product-search-subheader-title-area-lff'>
                        <span className='product-search-subheader-title'>Product Search</span>
                    </div>

                    <div className='product-search-subheader-tabs-area-lff'>
                        <Link to={PORDUCT_SEARCH + '/scan'}>
                            <div className='product-serch-subheader-scanner-tab' onClick={(event) => this.props.switchToScanProduct(event)}>
                                <img src={this.props.scanProductImage} className='product-serch-subheader-scan-icon' />
                                <div className='product-serch-subheader-scan-label product-search-tab-label-selected'>Scan Item</div>
                            </div>
                        </Link>

                        <Link to={PORDUCT_SEARCH + '/search'}>
                            <div className='product-serch-subheader-search-tab' onClick={(event) => this.props.switchToSearchProduct(event)} >
                                <img src={this.props.searchProductImage} className='product-serch-subheader-search-icon' />
                                <div className='product-serch-subheader-search-label'>Search</div>
                            </div>
                        </Link>

                        <Link to={PORDUCT_SEARCH + '/browse'}>
                            <div className='product-serch-subheader-browse-tab' onClick={(event) => this.props.switchToBrowseProduct(event)}>
                                <img src={this.props.browseProductImage} className='product-serch-subheader-browse-icon' />
                                <div className='product-serch-subheader-browse-label'>Browse</div>
                            </div>
                        </Link>

                    </div>
                </div>
                <div className={this.props.scanProductShown ? 'product-search-input-area-lff scanPageAdjust' : 'product-search-input-area-lff'}>
                    <Switch>
                        <Route exact path={PORDUCT_SEARCH + '/scan'} render={(props) => <ScanComponentView {...props} />} />
                        <Route exact path={PORDUCT_SEARCH + '/search'} render={(props) => <SearchComponentView {...props} productSearchProps={productSearchProps} />} />
                        <Route exact path={PORDUCT_SEARCH + '/browse'} render={(props) => <BrowseComponentView {...props} productBrowseprops={productBrowseprops} />} />
                        <Redirect from={PORDUCT_SEARCH} to={PORDUCT_SEARCH + '/scan'} />
                    </Switch>
                </div>

            </div>
        );
    }

}
