import React, {Component} from 'react'

import './lookup-dummy.css';

import Header from '../common/header/header'
import Footer from '../common/footer/footer'

class LookupDummy extends Component {

    constructor(props)
    {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Header history={this.props.history}></Header>
                <div className="dummyClass">THIS IS A DUMMY LOOKUP PAGE</div>
                <Footer></Footer>
            </div>
        );
    }
}

export default LookupDummy;