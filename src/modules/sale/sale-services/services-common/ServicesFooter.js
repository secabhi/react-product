import React, { Component } from 'react';
import './services-common.css';


export default (props) => (
  <div className="common-footer footer-fixed">
    {props.children}
  </div>
)