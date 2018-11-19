import React, { Component } from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class CustomerList extends Component {
    constructor(params){
        super(params);
        this.state = {customers:[]};
    }
    
    listCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
               customers: responseData.content,
            });
        })
    }

    componentDidMount(){
        this.listCustomers();
    }

    render() {
        const columns = [{
            Header: 'Customer Name',
            columns: [
                {
                    Header: 'First Name',
                    accessor: 'firstname'
                },
                {
                    Header: 'Last Name',
                    accessor: 'lastname'
                }
            ]
        },
        {
            Header: 'Address Information',
            columns: [
                {
                    Header: 'Street Address',
                    accessor: 'streetaddress'
                },
                {
                    Header: 'Post Code',
                    accessor: 'postcode'
                },
                {
                    Header: 'City',
                    accessor: 'city'
                }
            ]
            
        },
        {
            Header: 'Contact Information',
            columns: [
                {
                    Header: 'Email ',
                    accessor: 'email'
                },
                {
                    Header: 'Phone Number',
                    accessor: 'phone'
                }
            ]
            
        }
        
        ]
    return (
        <div class="container">
            <ReactTable className="-striped -highlight"
            filterable= {true} 
            defaultPageSize={10} 
            data= {this.state.customers}
            columns={columns} />
        </div>
    )
    }
}
export default CustomerList;