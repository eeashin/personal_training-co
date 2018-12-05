import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';



const localizer = BigCalendar.momentLocalizer(moment);

class Calender extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cal_events: [
                //State is updated via componentDidMount
            ],
            customerTrainings: []

        }
    }

    convertDate = (date) => {
        return moment.utc(date).toDate();
    }
    componentDidMount() {
        this.getTrainings();
    }

    getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ customerTrainings: responseData });
                let appointments = [];

                for (let i = 0; i < this.state.customerTrainings.length; i++) {

                    if (this.state.customerTrainings[i].customer !== null) {
                        let schedule = {
                            title: '',
                            start: 0,
                            end: 0

                        }

                        schedule.title = this.state.customerTrainings[i].customer.firstname
                            + " " + this.state.customerTrainings[i].customer.lastname
                            + " √ " + this.state.customerTrainings[i].activity;
                        schedule.start = this.convertDate(this.state.customerTrainings[i].date);
                        schedule.end = this.convertDate(this.state.customerTrainings[i].date
                            + (this.state.customerTrainings[i].duration * 60000));
                        appointments.push(schedule);

                    }
                }
                this.setState({
                    cal_events: appointments
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const { cal_events } = this.state

        return (
            <div className="container"><br />

                <h1 className="text-center font-weight-bold">Training Schedule</h1>

                <div style={{ height: 700 }}>
                    <BigCalendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='month'
                        views={['month', 'week', 'day']}
                        defaultDate={new Date()}
                    />
                </div>
            </div>
        );
    }
}

export default Calender;
