import React, {Component} from 'react';
import QuantityValidation from './QuantityValidation/QuantityValidation';
import ShippingOptionsOptionSeven from './ShippingOptionsOptionSeven/ShippingOptionsOptionSeven.js';
import SelectStore from './SelectStore/SelectStore';
import ServicesFooter from '../../sale-services/services-common/ServicesFooter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startSpinner} from '../../../common/loading/spinnerAction';
import {selectStoreApi} from './OptionSevenActions';

class OptionSeven extends Component {
    constructor(props) {
        super(props)
        this.state = {
			
				StoreNumber:'',
				AssociatePin:'',
				firstName:'',
			
		//componentName : "quantityValidation"
		 componentName : "shippingOptions"
		//componentName : "selectStore"
		}
		this.setStoreNumber = this.setStoreNumber.bind(this);
		this.setAssociatePin = this.setAssociatePin.bind(this);
		this.selectstore = this.selectstore.bind(this);
	}
	componentWillReceiveProps(nextprops){
		console.log(nextprops.optionSevenSend.dataFrom);
	}

	setStoreNumber = (StoreNum) => {
		
		
			this.setState({						
							StoreNumber:StoreNum.target.value
						  })

	}
	setAssociatePin = (AssocPin) => {
		
		this.setState({
				AssociatePin:AssocPin.target.value
					})
	}
	setFirstName  = (firstName) => {
		
		this.setState({
			firstName:firstName.target.value
					})
	}
	selectstore= (StoreNum,AssocPin) => {
	

		//this.props.startSpinner(true);
this.props.selectStoreApiInvoker(StoreNum,AssocPin);
	}
    render() {
		
        return (
			
            <div>
                {
					this.displayComponent()
				}
            
			 <ServicesFooter additionalStyle='sendComponent-offset'>
			  <div  className="giftwrap-cancel" onClick={() => {this.props.history.goBack()}}><span className="giftwrap-cancel-text">Cancel</span></div>
			  <div className="giftwrap-next"  onClick={() => 
				  {
					   
					  if(this.state.componentName === 'selectStore'){
						
						   this.selectstore(this.state.StoreNumber,this.state.AssociatePin);
						}
					 
				  }}>
			  <span className="giftwrap-next-text">Next</span></div>
		     </ServicesFooter>
		  </div>
        )
    }

    displayComponent = (component) => {
		var renderComponent;
		if(this.state.componentName === 'quantityValidation') {
			renderComponent = (<QuantityValidation
				items={this.props.items}

			>
			</QuantityValidation>);
		}
		else if(this.state.componentName === 'selectStore') {
			
			renderComponent = (<SelectStore
			
				setAssociatePin={this.setAssociatePin}
				setStoreNumber={this.setStoreNumber}
				StoreNumber={this.state.StoreNumber}
				AssociatePin={this.state.AssociatePin}
				firstName={this.state.firstName}
				setFirstName={this.setFirstName}
			>
				
			</SelectStore>)
		}else if(this.state.componentName ==='shippingOptions'){
			renderComponent = (<ShippingOptionsOptionSeven>

				</ShippingOptionsOptionSeven>)
		}
        return renderComponent;
    }
};

function mapStateToProps({optionSevenSend, cart, selectedItems}) {
    return {
		optionSevenSend, 
		cart, 
		selectedItems
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		startSpinner,
		selectStoreApiInvoker:selectStoreApi
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionSeven);