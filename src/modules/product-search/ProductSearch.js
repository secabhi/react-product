import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProductSearchView } from './view/ProductSearchView';
import ProductSearchList from './view/ProductSearchList';
import { PORDUCT_SEARCH } from '../../../src/pathConstants';
import axios from 'axios';
import { startSpinner } from '../common/loading/spinnerAction';
import {changeItemPurchasedFlag} from '../customer-details/CustomerDetailsActions';



// actions import

import { productSearchAction } from './ProductSearchAction';





// Icons Import

import scanicon from '../../resources/images/Scan_Item.svg';
import scaniconSelected from '../../resources/images/Scan_Item_Selected.svg';
import searchicon from '../../resources/images/Product_Search.svg';
import searchiconSelected from '../../resources/images/Product_Search_Selected.svg';
import browseicon from '../../resources/images/Browse.svg';
import browseiconSelected from '../../resources/images/Browse_Selected.svg';

//API Address Import
import configFile from '../../resources/stubs/config.json';

const APP_KEY = configFile.cxp.AppKey;
const URL = configFile.cxp.getProductSearchSKU;


class ProductSearch extends Component {
    constructor(props) {
        super(props);
        let params = new URLSearchParams(this.props.location.search);

        this.state = {
            selectedCategory: "",
            selectedSubCategory: "",
            selectedDetail: "",
            isSearchHit: false,
            //scanProductTab : true,
            scanProductShown: true,
            scanProductImage: scaniconSelected,
            searchProductImage: searchicon,
            browseProductImage: browseicon,
            scannedSKU: "TWK25356431", //to be replaced when scanner is implimented.
            searchFields: {
               // search_keyword: params.get('keyword'),
              //  search_pimsku: params.get('pimsku'),
              //  search_upc: params.get('upc'),
              //  search_style: params.get('style')
            },
            activeRadioBtn: '',
        }
    }



    componentDidMount = () => {
        let searchType = this.props.match.params.type;

        if (searchType === "search") {
            this.switchToSearchProduct();
        } else if (searchType === "browse") {
            this.switchToBrowseProduct();
        } else {
            this.switchToScanProduct();
        }
        this.props.changeItemPurchasedFlag(false)
    }


    componentWillReceiveProps = nextProps => {

        console.log("nextProps", nextProps);
    }


    // Tab switching methods
    handleCategoryChange = (event, index, value) => {
        this.setState({ selectedCategory: value, selectedSubCategory: '', selectedDetail: '' });
    }

    handleSubCategoryChange = (event, index, value) => {
        this.setState({ selectedSubCategory: value });
    }

    handleDetailChange = (event, index, value) => {
        this.setState({ selectedDetail: value });
    }

    resetProductSearch = () => {
        if (this.state.selectedCategory && this.state.selectedSubCategory && this.state.selectedDetail) {
            this.setState({ selectedCategory: '', selectedSubCategory: '', selectedDetail: '' });
        }
    }

    clickProductSearch = () => {
        if (this.state.selectedCategory && this.state.selectedSubCategory && this.state.selectedDetail) {
            alert('Searching for the product');
        }
    }

    switchToScanProduct = () => {
        document.getElementsByClassName('product-serch-subheader-scan-label')[0].classList.add('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-search-label')[0].classList.remove('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-browse-label')[0].classList.remove('product-search-tab-label-selected');
        // document.getElementsByClassName('product-scan-input-area-searchtab-content')[0].style.display = 'flex';
        // document.getElementsByClassName('product-search-input-area-searchtab-content')[0].style.display = 'none';

        this.setState({
            scanProductShown: true,
            searchProductShown: false,
            scanProductImage: scaniconSelected,
            searchProductImage: searchicon,
            browseProductImage: browseicon,

        });
    }


    switchToSearchProduct = () => {
        document.getElementsByClassName('product-serch-subheader-scan-label')[0].classList.remove('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-search-label')[0].classList.add('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-browse-label')[0].classList.remove('product-search-tab-label-selected');
        // document.getElementsByClassName('product-scan-input-area-searchtab-content')[0].style.display = 'none';
        //document.getElementsByClassName('product-search-input-area-searchtab-content')[0].style.display = 'flex';

        this.setState({
            scanProductShown: false,
            searchProductShown: true,
            scanProductImage: scanicon,
            searchProductImage: searchiconSelected,
            browseProductImage: browseicon,
        });
    }

    switchToBrowseProduct = () => {
        document.getElementsByClassName('product-serch-subheader-scan-label')[0].classList.remove('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-search-label')[0].classList.remove('product-search-tab-label-selected');
        document.getElementsByClassName('product-serch-subheader-browse-label')[0].classList.add('product-search-tab-label-selected');


        this.setState({
            scanProductShown: false,
            searchProductShown: false,
            scanProductImage: scanicon,
            searchProductImage: searchicon,
            browseProductImage: browseiconSelected,

        });
    }


    // Radio button content dispaly

    showRadioBtn1 = ({ currentTarget }) => {

        document.getElementsByClassName('product-search-input-area-section1-row3-pimsku-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-upc-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-style-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-itemid-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-keyword-search')[0].style.display = 'flex';
        this.setState({
            activeRadioBtn: currentTarget.id
        });
    }
    showRadioBtn2 = ({ currentTarget }) => {
        document.getElementsByClassName('product-search-input-area-section1-row3-keyword-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-upc-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-style-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-itemid-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-pimsku-search')[0].style.display = 'flex';
        this.setState({
            activeRadioBtn: currentTarget.id
        });
    }
    showRadioBtn3 = ({ currentTarget }) => {
        document.getElementsByClassName('product-search-input-area-section1-row3-keyword-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-pimsku-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-style-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-itemid-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-upc-search')[0].style.display = 'flex';
        this.setState({
            activeRadioBtn: currentTarget.id
        });
    }
    showRadioBtn4 = ({ currentTarget }) => {
        document.getElementsByClassName('product-search-input-area-section1-row3-keyword-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-pimsku-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-upc-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-itemid-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-style-search')[0].style.display = 'flex';
        this.setState({
            activeRadioBtn: currentTarget.id
        });
    }
    showRadioBtn5 = ({ currentTarget }) => {
        document.getElementsByClassName('product-search-input-area-section1-row3-keyword-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-pimsku-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-upc-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-style-search')[0].style.display = 'none';
        document.getElementsByClassName('product-search-input-area-section1-row3-itemid-search')[0].style.display = 'flex';
        this.setState({
            activeRadioBtn: currentTarget.id
        });
    }

    // Handle change

    handleChange = (field, e) => {
        document.getElementsByClassName('product-search-input-area-clear-btn')[0].style.opacity = "1";
        document.getElementsByClassName('product-search-input-area-search-btn')[0].style.opacity = "1";
        let searchFields = this.state.searchFields;
        searchFields[field] = e.target.value;
        this.setState({
            searchFields: searchFields
        });
    }


    clearAll = () => {
        document.getElementsByClassName('product-search-input-area-clear-btn')[0].style.opacity = ".4";
        document.getElementsByClassName('product-search-input-area-search-btn')[0].style.opacity = ".4";
        this.setState({
            searchFields: {
                search_keyword: '',
                search_upc: '',
                search_style: '',
                search_catid: '',
                search_itemid: '',
                search_pimsku: ''
            }
        })
    }


    handleApiInvoker = () => {
        this.props.startSpinner(true);
        this.props.productSearhActionInvoker(this.state.activeRadioBtn, this.state.searchFields, 
            (pimskuId) => {

            if (pimskuId.failure) {
                this.setState({ isSearchHit: true });
            }
            else {
                this.setState({ isSearchHit: false });
            }
            if(!pimskuId.failure && (this.state.activeRadioBtn
                === 'pimsku_search' || 
               this.state.activeRadioBtn ===
               'upc_search')){
                this.props.history.push("/product-details/"+ this.state.searchFields.search_pimsku);

               }
               
               

        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.productDetails != this.props.productDetails){
        }
    }


    onProductClick = (search_pimsku) => {
        //debugger;
        this.props.startSpinner(true);
        this.props.productSearhActionInvoker("pimsku_search", { search_pimsku }, (pimskuId) => {
            this.props.history.push("/product-details/" + pimskuId);
        });
    }

    render() {
        //debugger;
        let searchType = this.props.match.params.type;
        return (
            <div className="product-search-main">
                <ProductSearchView
                    history={this.props.history}
                    scanProductImage={this.state.scanProductImage}
                    searchProductImage={this.state.searchProductImage}
                    browseProductImage={this.state.browseProductImage}
                    switchToScanProduct={this.switchToScanProduct}
                    switchToSearchProduct={this.switchToSearchProduct}
                    switchToBrowseProduct={this.switchToBrowseProduct}
                    showRadioBtn1={this.showRadioBtn1}
                    showRadioBtn2={this.showRadioBtn2}
                    showRadioBtn3={this.showRadioBtn3}
                    showRadioBtn4={this.showRadioBtn4}
                    showRadioBtn5={this.showRadioBtn5}
                    scanProductShown={this.state.scanProductShown}
                    searchProductShown={this.state.searchProductShown}
                    scannedSKU={this.state.scannedSKU}
                    invokePimSKUAPI={this.searchByPimSKU}
                    searchFields={this.state.searchFields}
                    handleChange={this.handleChange}
                    clearAll={this.clearAll}
                    handleCategoryChange={this.handleCategoryChange}
                    handleSubCategoryChange={this.handleSubCategoryChange}
                    handleDetailChange={this.handleDetailChange}
                    resetProductSearch={this.resetProductSearch}
                    clickProductSearch={this.clickProductSearch}
                    handleApiInvoker={this.handleApiInvoker}
                    productPimSKUResult={this.props.products}
                />

                {
                    searchType === "search" &&
                    <ProductSearchList
                        isSearchHit={this.state.isSearchHit}
                        products={this.props.products}
                        onProductClick={this.onProductClick} />
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    console.log("**** Product***",state.productSearch )
    return { products: state.productSearch, productDetails:state.productDetails };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startSpinner: startSpinner,
        productSearhActionInvoker: productSearchAction,
        changeItemPurchasedFlag: changeItemPurchasedFlag
    },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch)
