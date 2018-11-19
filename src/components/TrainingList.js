import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

class TrainingList extends Component {
constructor(params){
    super(params);
    this.state = {
        trainings:[]
    };
}

listTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
            trainings: responseData.content
        })
    })
}
componentDidMount(){
    this.listTrainings();
}

render() {
    const columns = [
        {
        Header:'Date',
        accessor: 'date',
        Cell: row => (
            <span>
                {moment(row.value).format("DD MM YYYY")}
            </span>
        )
    },
    {
        Header: 'Activity',
        accessor: 'activity'
    },
    {
        Header: 'Duration',
        accessor: 'duration'

    }
]
return (
    <div class="container">
        <ReactTable className="-striped -highlight"
        data= {this.state.trainings}
        filterable={true}
        defaultPageSize={10} 
        columns={columns} />
    </div>
)
}

}
export default TrainingList;