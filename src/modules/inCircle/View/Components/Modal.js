/* Dependencies import */
import React, {Component} from 'react';
import {Popover, PopoverHeader, PopoverBody} from "reactstrap";


//Images
var incircle_purple_large_bttn = require("../../../../resources/images/Incircle_Level_purple_large_bttn.svg");


export class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        return (
            <Popover
                hideArrow={true}
                placement="left-end"
                isOpen={this.props.props.openModal}
                target={"btn" + this.props.props.activeIcon}
                toggle={this.props.props.closeModal}>
                <PopoverHeader>
                    <div className="modalheader">
                        <span className="iconNum">{this.props.props.activeIcon}</span>
                        <img
                            className="circleStatusicon"
                            src={incircle_purple_large_bttn}
                            alt="profile-tab-icon"/>
                        <span className="headerTxt">
                            Circle {this.props.activeIcon}
                            <span className="pointRange">
                                {this.props.activeIcon !== null
                                    ? this.props.props.inCircleDetails.data[this.props.props.activeIcon - 1].amount
                                    : ""}
                            </span>
                        </span>
                    </div>
                </PopoverHeader>
                <PopoverBody>
                    <ul>
                        <li>
                            {this.props.props.activeIcon !== null
                                ? this.props.props.inCircleDetails.data[this.props.props.activeIcon - 1].desc1
                                : ""}
                        </li>
                        <li>
                            {this.props.props.activeIcon !== null
                                ? this.props.props.inCircleDetails.data[this.props.props.activeIcon - 1].desc2
                                : ""}
                        </li>
                        <li>
                            {this.props.props.activeIcon !== null
                                ? this.props.props.inCircleDetails.data[this.props.props.activeIcon - 1].desc3
                                : ""}
                        </li>
                    </ul>
                </PopoverBody>
                <div className="modalFooterContainer">
                    <div className="modalFootertext" onClick={this.props.props.closeModal}>
                        CLOSE
                    </div>
                </div>
            </Popover>
        );
    }
}
