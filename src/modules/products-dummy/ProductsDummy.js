import React, {Component} from 'react'

import './products-dummy.css';

// import Header from '../common/header/header'
// import Footer from '../common/footer/footer'

import CrossBlack from "../../resources/images/Cross_Black.svg";

class ProductsDummy extends Component {

     constructor(props)
     {
         super(props);
         this.state = {}
     }

     navigateToCustomerDetails = () => {
        this.props.history.push("/customer-details");
        // console.log(this.props.history.location.pathname);
      };
     render() {
         return (
             <div>
{/*                 <Header history={this.props.history}></Header> */}
                 <div><img className="goToCustomerDetails" src={CrossBlack}  onClick={this.navigateToCustomerDetails} /></div>

                 <div className="dummyClass">This is a dummy Product DetailS page</div>
{/*                <Footer></Footer>*/}

             </div>
         );
     }
}

export default ProductsDummy;

