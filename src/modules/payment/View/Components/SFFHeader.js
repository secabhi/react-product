/* Dependencies import */
import React, {Component} from 'react';

//Images
import backArrowWhite from "../../../../resources/images/Back_White.svg";
var incircle_purple_large_bttn = require("../../../../resources/images/Incircle_Level_purple_large_bttn.svg");

export class SFFHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
       
                <div className="sff-sub-header">
                    <div className="" onClick={this.props.props.navigateBack}>
                        <img src={backArrowWhite} className='back-button' alt="navigate-back"/>
                    </div>
                    <div className="payment-divider"></div>
                    <div className="payment-title">
                        Payment
                    </div>
                    <div className="payment-customerDetails">
                        <div className="payment-CustomerName">{this.props.props.inCircleInfo.salutation}. {this.props.props.inCircleInfo.firstname}
                            &nbsp; {this.props.props.inCircleInfo.lastname}</div>
                        <div>
                            <div className="payment-customerAddress">{this.props.props.saleCartItems.address}</div>
                        </div>
                    </div>
                    <div className="incircle-details">
                        <span className="ssf-subheader-iconNum">{this.props.props.currentlvl}</span>
                        <img
                            className="ssf-subheader-circleStatusicon"
                            src={incircle_purple_large_bttn}
                            alt="profile-tab-icon"/>

                    </div>

                </div>

            
        );
    }}