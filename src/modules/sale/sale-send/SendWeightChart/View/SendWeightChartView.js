import React, { Component } from 'react';

import './SendWeightChart.css';

export default class SendWeightChartView extends Component{

    constructor(props){
        super(props);

    }

    render(){
        

        return(
        <div className="WeightSend-options-container">            
            <div className="Weight-options-container">
                <div className="Weight-options-text">Weight Chart</div>
                    <div className="WeightSend-options-list-large">
                        <div className="WeightSend-options-list ">           
                            <div className="WeightSend-option">1pd&nbsp;-&nbsp; 
                                <input type="radio" name="radio" checked="checked"/>
                                <span className="WeightSend-radio-button"></span>
                                <span className="WeightSend-options-price">Standard</span>
                            </div>

                            <div className="WeightSend-option">10 pd&nbsp;-&nbsp; 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                                <span className="WeightSend-options-price">Hanging Carton - Suits / Gowns</span>
                            </div>

                            <div className="WeightSend-option">71 pd&nbsp;-&nbsp; 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                                <span className="WeightSend-options-price">Oversized > 70 lb</span>
                            </div>

                            <div className="WeightSend-option">5 pd&nbsp;-&nbsp; 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                                <span className="WeightSend-options-price">Associate Sale</span>
                            </div>
                        </div>
                    </div>
                    <div className="WeightSend-options-list-small">
                        <div className="WeightSend-options-list">           
                            <div className="WeightSend-option">1 pound for non/ oversize, overweight merchandise 
                                <input type="radio" name="radio" checked="checked"/>
                                <span className="WeightSend-radio-button"></span>
                            </div>
                            <div className="WeightSend-option">10 pounds for merchandise shipped in a hanging carton. 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>
                            <div className="WeightSend-option">71 pounds for oversize, overweight merchandise. 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>                                
                        </div>
                    </div>
                </div>
                <div className="Send-options-container">
                    <div className="Send-options-text">Choose Send Type</div>
                        <div className="WeightSend-options-list">
                
                            <div className="WeightSend-option">From This Store 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>

                            <div className="WeightSend-option" onClick={
                                (value)=> {this.props.componentChangeHandler("optionSeven"); 
                                this.props.initializeOptionSeven("optionSeven")}}>From Other Location 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>

                            <div className="WeightSend-option">Precious Jewelry 
                                <input type="radio" name="radio" />
                                <span className="WeightSend-radio-button"></span>
                            </div>

                            <div className="WeightSend-option">Leased Departments 
                                <input type="radio" name="radio" checked="checked"/>
                                <span className="WeightSend-radio-button"></span>
                            </div>
                        </div>
                    </div>
                </div>
           
        )
    }
}