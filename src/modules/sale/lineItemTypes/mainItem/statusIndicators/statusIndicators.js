import React, {Component} from 'react';

export default class StatusIndicators extends Component {



    state = {
        indicators : [],
    }

    componentDidMount() {
        // alert("COMPONENT MOUNTED")
        // this.props.updateLastStatusIndicatorFunction(this.updateStatus.bind(this));
    }

    componentDidUpdate(){
        console.log('UPDATING', this.state.indicators);
    }

    updateStatus(indicator){
        console.log("indicator", indicator);
        const previousIndicators = [...this.state.indicators, indicator];
        console.log("previousIndicator", previousIndicators);
        // this.setState({indicators : previousIndicators}, () => {alert("yes hello",this.state.indicators)})
        // console.log("indicators", this.state.indicators);
    }

    render(){
        console.log("STATE", this.state)
        return(
            <div className="item-codes">
                {/* <span>G</span> */}
                    <span className=''>{this.state.indicators}</span> 
                {/* <span className={is}>GP</span> */}
                <span className={this.props.isSplInstn ? "":" lineItemDisplayNone"}>S</span>
            </div>
        )
    }
}