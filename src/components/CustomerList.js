import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import { CSVLink } from "react-csv";
import Snackbar from "@material-ui/core/Snackbar";
import Addcustomer from "./Addcustomer";
import "react-confirm-alert/src/react-confirm-alert.css";
import Addtraining from "./Addtraining"

class CustomerList extends Component {
    constructor(params) {
        super(params);
        this.state = { customers: [], showSnack: false, msg: "" };
    }

    componentDidMount() {
        this.listCustomers();
    }

    //list all customers using REST API
    listCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    customers: responseData.content
                });
            });
    };

    deleteCustomer = idLink => {
        confirmAlert({
            title: "",
            message: "  Hey! Be aware of deleting this?  ",
            buttons: [
                {
                    label: "  Yes  ",
                    onClick: () => {
                        fetch(idLink, { method: "DELETE" })
                            .then(res => {
                                this.setState({ showSnack: true, msg: '  Customer Data Deleted !!! ' })
                                this.listCustomers()
                            })
                            .catch(err => console.error(err));
                    }
                },
                {
                    label: "  No  ",
                    onClick: () => alert(" Cancelled Deleting ")
                }
            ]
        });
    };
    saveTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(res => {
                this.setState({ showSnack: true, msg: '  Training Saved Successful √ ' })
            })
            .catch(err => console.error(err))
    };
    // To create a new customer
    saveCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(res => {
                this.setState({ showSnack: true, msg: '  Customer Saved Successful √ ' })
                this.listCustomers()
            })
            .catch(err => console.error(err))
    };

    updateCustomer(customer, link) {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => {
                this.setState({ showSnack: true, msg: ' Data Update Successful √  ' })
            }

            )
            .catch(err => console.error(err));
        console.log(customer);
        console.log(link);
    }

    renderEditable = cellInfo => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.customers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ customers: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.customers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };
    handleClose = () => {
        this.setState({ showSnack: false });
    };

    render() {
        return (
            <div className="container">
            <h1>Customer List</h1>
                <div className="row">
                    <Addcustomer saveCustomer={this.saveCustomer} listCustomers={this.listCustomers} />
                    <CSVLink style={{ padding: 20 }} data={this.state.customers}>Downloan Customer List</CSVLink>
                </div>
                <ReactTable
                    data={this.state.customers}
                    columns={[
                        {
                            columns: [
                                {
                                    accessor: "links[0].href",
                                    show: false
                                },
                                {
                                    Header: "Add Training",
                                    id: "button",
                                    sortable: false,
                                    filterable: false,
                                    width: 150,
                                    accessor: "links[0].href",
                                    Cell: (value) => (
                                        <Addtraining value={value} saveTraining={this.saveTraining} />
                                    )

                                },
                                {
                                    Header: "First Name",
                                    accessor: "firstname",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Last Name",
                                    accessor: "lastname",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Street",
                                    accessor: "streetaddress",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Post Code",
                                    accessor: "postcode",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "City",
                                    accessor: "city",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Phone",
                                    accessor: "phone",
                                    Cell: this.renderEditable
                                },
                                {
                                    Header: "Update",
                                    id: "button",
                                    sortable: false,
                                    filterable: false,
                                    width: 70,
                                    accessor: "links[0].href",
                                    Cell: ({ value, row }) => (
                                        <Button color="primary" size="small"
                                            onClick={() => {
                                                this.updateCustomer(row, value)
                                            }}><SaveIcon /></Button>
                                    )
                                },
                                {
                                    Header: "Delete",
                                    id: "button",
                                    sortable: false,
                                    filterable: false,
                                    width: 70,
                                    accessor: "links[0].href",
                                    Cell: ({ value }) => (
                                        <Button color="secondary" size="small"
                                            onClick={() => {
                                                this.deleteCustomer(value)
                                            }}><DeleteIcon /></Button>
                                    )
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    filterable className="-striped -highlight">

                </ReactTable>
                <Snackbar
                    message={this.state.msg}
                    autoHideDuration={2000}
                    open={this.state.showSnack}
                    onClose={this.handleClose}>
                </Snackbar>

            </div>
        );
    }
}
export default CustomerList;
