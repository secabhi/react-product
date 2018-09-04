import React, { Component } from "react";
import "./cust-det-tabheader.css";

import profile from "../../../resources/images/Profile.svg";
import profileSelected from '../../../resources/images/Profile_Selected.svg';
import cards from "../../../resources/images/Add_Card.svg";
import cardSelected from '../../../resources/images/Add_Card_Selected.svg'
import reminder from "../../../resources/images/Reminder.svg";
import reminderSelected from '../../../resources/images/Reminder_Selected.svg';
import incircle from "../../../resources/images/Incircle_Purple.svg";
import incircleSelected from "../../../resources/images/Incircle_Purple_Selected.svg";

var incircle_purple_large_bttn = require("../../../resources/images/Incircle_Level_purple_large_bttn.svg");

export default class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileClassName: "profile-tab-label",
      cardClassName: "cards-tab-label",
      reminderClassName: "reminder-tab-label",
      incircleClassName: "incircle-tab-label",
      profileIcon: profile,
      cardsIcon: cards,
      reminderIcon: reminder,
      incircleIcon: incircle,
     

    };
    //console.log(this.props.history.location.pathname);
  }

  componentDidMount(){
    this.props.history.location.pathname==='/customer-details'?this.setState({profileClassName:"profile-tab-label selected-tab-label", profileIcon:profileSelected}):""
    this.props.history.location.pathname==='/customer-details-international'?this.setState({profileClassName:"profile-tab-label selected-tab-label", profileIcon:profileSelected}):""
    this.props.history.location.pathname==='/add-card'?this.setState({cardClassName:"cards-tab-label selected-tab-label",cardsIcon: cardSelected}):""
    this.props.history.location.pathname==='/reminders'?this.setState({reminderClassName:"reminder-tab-label selected-tab-label", reminderIcon: reminderSelected}):""
    this.props.history.location.pathname==='/incircle'?this.setState({incircleClassName:"incircle-tab-label selected-tab-label", incircleIcon: incircleSelected}):""
    this.props.history.location.pathname==='/incircle-non-member'?this.setState({incircleClassName:"incircle-tab-label selected-tab-label", incircleIcon: incircleSelected}):""

    
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <div>
        <div className="cusdet-tab-header">
          <div
            className="profile-tab-header"
            onClick={this.navigateToCustomerDetails}
          >
            <img
              src={this.state.profileIcon}
              className="profile-tab-icon"
              alt="profile-tab-icon"
            />
            <div className={this.state.profileClassName}>Profile</div>
          </div>
          <div
            className="cards-tab-header"
            onClick={this.navigateToAddCard}
          >
            <img src={this.state.cardsIcon} className="cards-tab-icon" alt="cards-tab-icon" />
            <div className={this.state.cardClassName}>{this.props.customerName}'s Cards</div>
          </div>
          <div
            className="reminder-tab-header"
            onClick = { this.navigateToReminders}
          >
            {
              <img
                src={this.state.reminderIcon}
                className="reminder-tab-icon"
                alt="reminder-tab-icon"
              />
            }

            {(this.props.reminderCount > 0)?
            <div className="notification_count_circle"><span>{this.props.reminderCount}</span></div>:''}
            <div className={this.state.reminderClassName}>Reminders</div>
          </div>
          <div
            className="incircle-tab-header"
            onClick={this.navigateToIncircleMember}
          >
            <img
              src={this.state.incircleIcon}
              className="incircle-tab-icon"
              alt="incircle-tab-icon"
            />
            <div className={this.state.incircleClassName}>
              <b>IN</b>CIRCLE
            </div>
          </div>
          <div className="tab-header-spacer" />
        </div>
      </div>
    );
  }

  navigateToCustomerDetails = () => {
    this.props.history.push("/customer-details");
    console.log(this.props.history.location.pathname);
  };
  navigateToCards = () => {
    this.props.history.push("/cards");
    console.log(this.props.history.location.pathname);
  };
  navigateToReminders = () => {
    this.props.history.push("/reminders");
    console.log(this.props.history.location.pathname);
  };
  navigateToIncircleNonMember = () => {
    this.props.history.push("/incircle-non-member");
    console.log(this.props.history.location.pathname);
  };

  navigateToIncircleMember = () => {
    this.props.history.push("/incircle");
    console.log(this.props.history.location.pathname);
  };
  navigateToAddCard = () => {
    this.props.history.push("/add-card");
    console.log(this.props.history.location.pathname);
  };
}
