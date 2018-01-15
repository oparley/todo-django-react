import React, {Component} from 'react';
import moment from 'moment';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

import { REPORTS_URL } from './constants'
import { API } from './BasePage'

// let API = API()

class Reports extends Component{
    constructor(props){
        super(props)
        this.state = {
            report: '',
            day: '',
        }
    }

    report(date){
        let day = moment(date).format('YYYY-MM-DD');
        API().get(REPORTS_URL, {params: {day: day}})
        .then((response) => this.setState({report: response.data, day: day}))
    }

    print(){
        window.print()
    }

    render(){
        let report =
            // <div className="tile is-ancestor">
                <div className="tile is-parent" id="report">
                    <article className="tile is-child box">
                    <div className="content">
                        <p className="title">Daily Report</p>
                        <p className="subtitle">{this.state.day}</p>
                        <div className="content">
                            <pre> {this.state.report} </pre>
                        </div>
                    </div>
                    <div className="level">
                        <div className="level-right">
                            <a onClick={() => this.print() }className="button is-link is-right"> Print </a>
                        </div>
                    </div>
                    </article>
                </div>
            // </div>

        return(
        <div className="columns" >
            <div className="column is-three-fifths is-offset-one-fifth">
                <div className="columns">
                    <div className="column is-two-fifths">
                        <label className="label"> Select a day</label>
                        <Flatpickr
                            options={{
                                inline: true,
                                maxDate: "today",
                                dateFormat: 'Y-m-d',
                            }}
                            onChange={(date) => this.report(date[0])}
                            value={this.state.day}/>
                    </div>
                    <div className="column">
                        {report}
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default Reports;
