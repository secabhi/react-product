import React, { Component } from 'react';

import SendTitleHeaderView from '../View/sendTitleHeaderView'

export default class SendTitleHeader extends Component {
    render() {
        return (
            <SendTitleHeaderView 
                title = {this.props.title}
                optional = {this.props.optional}
            />
        );
    }
}