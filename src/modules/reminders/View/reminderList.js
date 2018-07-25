import React, { Component } from 'react';
import { connect } from 'react-redux';


export class ReminderList extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
           
        };

    
    }

    componentWillMount(){
        
       
    }

    render() {

        return(
            <div className="reminderAreaLFF">
                {this.props.reminderList.map(function (item,index){
                    var date = item.endDate.slice(0,10).split('-');
                    var colorClass="";
                    
                    if((item.longDesc).trim().toUpperCase() === 'REPLENISHMENT')
                        colorClass="text_Replenishment"
                    else if((item.longDesc).trim().toUpperCase() === 'ALTERATIONS PICKUP')
                        colorClass="text_Alterations"
                        return(<div className="reminderDivLFF" key={item.eventNumber}>
                            <div className="reminderDivLFFCol1"><span className={colorClass}>{item.longDesc}</span></div>
                            <div className="reminderDivLFFCol2">{date[1]+'/'+date[2]+'/'+date[0]}</div>
                            <div className="reminderDivLFFCol3">{item.description}</div>
                            <div className="reminderDivLFFCol4">{item.eventNumber}</div>
                        </div>)
                })
        }
            </div>
        )
    }


}



