import React, {Component} from 'react'

import './products-dummy.css';

// import Header from '../common/header/header'
// import Footer from '../common/footer/footer'

class ProductsDummy extends Component {

     constructor(props)
     {
         super(props);
         this.state = {}
     }
     render() {
         return (
             <div>
{/*                 <Header history={this.props.history}></Header> */}
                 <div className="dummyClass">This is a dummy Product DetailS page</div>
{/*                <Footer></Footer>*/}
             </div>
         );
     }
}

 export default ProductsDummy;