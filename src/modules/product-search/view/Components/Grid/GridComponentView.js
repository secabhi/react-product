import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

export class GridComponentView extends Component {
    render(){
        <div className = {this.props.scanProductShown ? 'product-search-result-area-container-lff scanPageDisplayAdjust' : 'product-search-result-area-container-lff' }>
         <div className = 'product-search-result-area-header'>
            <div className = 'product-search-result-label'>Search Results for “Helmut Lang”</div>
            <div className = 'product-search-result-count'>15 Products found.</div>
            <div className = 'product-search-result-spacer-lff'></div>
            <div className = 'product-search-result-filter-drop'>
             <SelectField
                    value={cvz}
                    onChange={}
                    floatingLabelText="Filter..."
                    fullWidth={true}
                    floatingLabelStyle={selectFieldFloatingLabelStyle}
                    style={selectFieldStyle}
                    labelStyle={selectFieldLabelStyle}
                    menuItemStyle={selectFieldMenuItemStyle}
                    selectedMenuItemStyle={selectFieldMenuItemStyle}
                    iconStyle={selectFieldIconStyle} //maxHeight = '85.5px'
                    maxHeight={180} dropDownMenuProps={{iconButton: <Dropdownicon/>}}
                    underlineStyle={underlineStyle}>
                    {this.props.salutationDataDrop.
                        map(function (item, i) {
                            return
                            <MenuItem
                                className="select-field-menu-item"
                                key={i}
                                value={item.Value}
                                primaryText={item.Value}
                            />;
                        })
                    }
                </SelectField>

             </div>
            <div className = 'product-search-result-sort-drop'>Drop</div>

          </div>
          <div className='product-search-result-area-lff'>

        <div className='grid'>
             {this.state.productSearchResult[0] ? <ProductCardView/> : null}
             {this.state.productSearchSKUResult ? <ProductCardView productDetails = {this.state.productSearchSKUResult}/> : null}
        </div>
     </div> 

    {this.props.scanProductShown ? (scannerCamera) : null}

    </div>

    }


}
