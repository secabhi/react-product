/* Dependencies import */
import React, {Component} from 'react';

//Components
import {Modal} from './Modal';
import {CardPreview} from './CardPreview';

//Images
var incircle_grey_bttn = require("../../../../resources/images/Incircle_Level_grey_small_bttn.svg");
var incircle_green_large_bttn = require("../../../../resources/images/Incircle_Level_green_large_bttn.svg");
var incircle_purple_bttn = require("../../../../resources/images/Incircle_Level_purple_small_bttn.svg");
var incircle_green_bttn = require("../../../../resources/images/Incircle_Level_green_small_bttn.svg");
var incircleConfig =require('../../../../resources/stubs/incircleConfig.json');

export class IncirclePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {}

    render() {
        
    var noCards = (
        <div className="noCard-container">
          <span className="noCard-msg">{incircleConfig.noCardMsg}</span>
        </div>
      );
        return (
            <div className="cusdet-incircle-tab-content">
                <div className="content-left-part">
                    <div className="content-left-container">
                        <div className="content-row1">
                            <div className="inCircle-header">Points This Year</div>
                            <div className="tabbed">
                                <div className="inCircle-points">
                                    <div className="point-text">
                                        <div className="inCircle-point-value">
                                            {this.props.props.incircleData.tyPointsEarned}
                                            <span className="inCircle-point-label">Total Points</span>
                                        </div>
                                    </div>
                                    {/* <div className="available-text-container">
                                        <div
                                            className="available-text"
                                            style={{
                                            width: this.props.props.availabletextPercent
                                        }}>
                                            <div className="available-label">Available</div>
                                            <div className="available-value">{this.props.props.available}</div>
                                        </div>
                                    </div> */}
                                    <div className="bar-container">
                                        <div className="inCircle-point-bar">
                                            <div
                                                className="availableProgress-bar"
                                                style={{
                                                width: this.props.props.availablePercent
                                            }}/>
                                            <div
                                                className="redeemedProgress-bar"
                                                style={{
                                                width: this.props.props.percentage,//redeemedPercent,
                                                transition: "width 1s ease-in"
                                            }}/>
                                        </div>
                                        <div className="next-level-text">
                                            <div className="next-level-value">
                                                {this.props.props.pointsToNextLvl}
                                                <span className="next-level-label">
                                                    Points to next point card
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="redeemed-text-container">
                                        <div
                                            className="redeemed-text"
                                            style={{
                                            width: this.props.props.textPercent//redeemedtextPercent
                                        }}>
                                            <div className="redeemed-label">Redeemed</div>
                                            <div className="redeemed-value">{this.props.props.incircleData.tyPointsRedeemed/* redeemed */}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-row2">
                            <div className="inCircle-cards-header">
                                <span>
                                    <b>IN</b>CIRCLE Cards
                                </span>
                            </div>
                            <div className="tabbed">
                                {this.props.props.hasCards === true
                                    ? <CardPreview props={this.props.props}/>
                                    : noCards}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-right-part">
                    <div className="content-row1">
                        <div className="indent">
                            <div className="inCircle-cards-header">
                                <span>
                                    <b>IN</b>CIRCLE Status
                                </span>
                            </div>
                        </div>

                        {/* The inCircle Meter */}
                        <table className="table">
                            <tbody>
                                <tr className="tabler" id="btn1">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 1
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 1
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 1
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 1"
                                            value="1"
                                            onClick={() => this.props.props.setActive("1")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 1
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 1
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                1
                                            </span>
                                            {this.props.props.activeIcon == 1
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 1
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 1
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 1
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 1 {this.props.props.currentlvl === "1"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn2">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 2
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 2
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 2
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 2"
                                            onClick={() => this.props.props.setActive("2")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 2
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 2
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                2
                                            </span>
                                            {this.props.props.activeIcon == 2
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 2
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 2
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 2
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 2 {this.props.props.currentlvl === "2"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn3">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 3
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 3
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 3
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 3"
                                            onClick={() => this.props.props.setActive("3")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 3
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 3
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                3
                                            </span>
                                            {this.props.props.activeIcon == 3
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 3
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 3
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 3
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 3 {this.props.props.currentlvl === "3"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn4">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 4
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 4
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 4
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 4"
                                            onClick={() => this.props.props.setActive("4")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 4
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 4
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                4
                                            </span>
                                            {this.props.props.activeIcon == 4
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 4
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 4
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 4
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 4 {this.props.props.currentlvl === "4"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn5">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 5
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 5
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 5
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 5"
                                            onClick={() => this.props.props.setActive("5")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 5
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 5
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                5
                                            </span>
                                            {this.props.props.activeIcon == 5
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 5
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 5
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 5
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 5 {this.props.props.currentlvl === "5"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn6">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 6
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 6
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 6
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level 6"
                                            onClick={() => this.props.props.setActive("6")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 6
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 6
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                6
                                            </span>
                                            {this.props.props.activeIcon == 6
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 6
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 6
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 6
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Circle 6 {this.props.props.currentlvl === "6"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn7">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 7
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 7
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 7
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level p"
                                            onClick={() => this.props.props.setActive("7")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 7
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 7
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                P
                                            </span>
                                            {this.props.props.activeIcon == 7
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 7
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 7
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 7
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        President's circle
                                    </td>
                                </tr>
                                <tr className="tabler">
                                    <td className="spacer"/>
                                </tr>
                                <tr className="tabler" id="btn8">
                                    <td className="years"></td>
                                    <td className="circleStatusbttnContainer">
                                        <div
                                            className={this.props.props.activeIcon == 8
                                            ? this.props.props.activebttn
                                            : "circleStatusbttn"}
                                            style={parseInt(this.props.props.currentlvl) > 8
                                            ? {
                                                backgroundImage: "url(" + incircle_grey_bttn + ")"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 8
                                                ? this.props.props.init == false
                                                    ? {
                                                        backgroundImage: "url(" + incircle_green_bttn + ")"
                                                    }
                                                    : {
                                                        backgroundImage: "url(" + incircle_green_large_bttn + ")",
                                                        transform: "scale(1.5, 1.5)"
                                                    }
                                                : {
                                                    backgroundImage: "url(" + incircle_purple_bttn + ")"
                                                }}
                                            alt="level c"
                                            onClick={() => this.props.props.setActive("8")}>
                                            <span
                                                className="circleNum"
                                                style={this.props.props.activeIcon == 8
                                                ? {
                                                    color: "#ffffff"
                                                }
                                                : parseInt(this.props.props.currentlvl) >= 8
                                                    ? {
                                                        color: "#ffffff"
                                                    }
                                                    : {
                                                        color: "#6b4893"
                                                    }}>
                                                C
                                            </span>
                                            {this.props.props.activeIcon == 8
                                                ? <Modal props={this.props.props}/>
                                                : ""}
                                        </div>
                                    </td>
                                    <td
                                        className="circle-label"
                                        style={this.props.props.activeIcon == 8
                                        ? {
                                            "fontSize": "30px",
                                            color: "#613b8c"
                                        }
                                        : parseInt(this.props.props.currentlvl) > 8
                                            ? {
                                                color: "#505050"
                                            }
                                            : parseInt(this.props.props.currentlvl) === 8
                                                ? this.props.props.init == false
                                                    ? {
                                                        color: "#9ebe1d"
                                                    }
                                                    : {
                                                        color: "#9ebe1d",
                                                        "fontSize": "30px"
                                                    }
                                                : {
                                                    color: "#613b8c"
                                                }}>
                                        Chairman's circle {this.props.props.currentlvl === "c"
                                            ? " - Current"
                                            : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="tip">
                            {incircleConfig.incircleStatusTip}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}