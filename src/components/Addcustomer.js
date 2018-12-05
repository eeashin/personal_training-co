import React, { Component } from "react";
import SkyLight from "react-skylight";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";


class Addcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''

        };

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //Save Customer and closing modal
    handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone,
        }

        this.props.saveCustomer(newCustomer)
        this.props.listCustomers();
        this.refs.simpleDialog.hide();
    }

    render() {

        const addDialog = {
            width: '70%',
            height: '450px',
            marginTop: '-300px',
            marginLeft: '-35%'
        };

        return <div>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref="simpleDialog">
                <div className="card" style={{ width: "95%" }}>
                    <div className="card-body">
                        <h5 className="card-title">Enter New Customer Info</h5>
                        <TextField placeholder="First Name" onChange={this.handleChange} name="firstname" /> <br />
                        <TextField placeholder="Last Name" onChange={this.handleChange} name="lastname" /> <br />
                        <TextField placeholder="Address" onChange={this.handleChange} name="streetaddress" /> <br />
                        <TextField placeholder="Post Code" onChange={this.handleChange} name="postcode" /> <br />
                        <TextField placeholder="City" onChange={this.handleChange} name="city" /> <br />
                        <TextField placeholder="Email" onChange={this.handleChange} name="email" /> <br />
                        <TextField placeholder="Phone" onChange={this.handleChange} name="phone" /> <br />
                        <div className="col-md-2">
                            <button style={{ margin: "10px" }} className="btn btn-primary" onClick={this.handleSubmit}>
                                <SaveIcon /> Save New Customer
                            </button>
                        </div>
                    </div>
                </div>
            </SkyLight>
            <div className="col-md-2">
                <button style={{ margin: "10px" }} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>
                    Add Customer
              </button>
            </div>
        </div>;
    }
}

export default Addcustomer;

