import React, { Component } from 'react';
import './sendTitleHeader.css';

export default class SendTitleHeaderView extends Component {


    render() {
        return (
            <div className={"send-title-header " + this.props.title}>
                <div className="send-title-header-text">
                    {this.props.title}
                </div>
                <div className="send-title-header-optional">
                    {this.props.optional}
                </div>
            </div>
        );
    }
}