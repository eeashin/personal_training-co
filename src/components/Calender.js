import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

class Calender extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cal_events: [
                //State is updated via componentDidMount
            ],
            customerTrainings:[]

    }
}

    convertDate = (date) => {
        return moment.utc(date).toDate();
    }
    componentDidMount() {
        this.getTrainings();
      }

    getTrainings=()=> {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                this.setState({customerTrainings: responseData});
                let appointments = [];
                
                for (let i = 0; i < this.state.customerTrainings.length; i++) {
                    // appointments[i].start = this.convertDate(appointments[i].start)
                    console.log(this.convertDate(this.state.customerTrainings[i].date));
                    let schedule = {
                        title: '',
                        start: 0,
                        end:0
                    }
                    schedule.start = this.convertDate(this.state.customerTrainings[i].date);
                    schedule.end = this.convertDate(this.state.customerTrainings[i].date);
                    schedule.title = this.state.customerTrainings[i].activity + " " + this.state.customerTrainings[i].customer.firstname + " " + this.state.customerTrainings[i].customer.lastname
                    console.log(schedule);
                    appointments.push(schedule);
                }
                console.log(appointments);
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
            <div>

                <h1>Training Schedule</h1>

                <div style={{ height: 700 }}>
                    <BigCalendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='week'
                        views={['month', 'week', 'day']}
                        defaultDate={new Date()}
                    />
                </div>
            </div>
        );
    }
}

export default Calender;
