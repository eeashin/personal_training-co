import React, { Component } from "react";
import SkyLight from "react-skylight";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

class Addtraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            activity: '',
            duration: '',
            customer: ''
        };

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    //Save training and closing modal
    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.props.value.value
        }
        // console.log(this.props.value);
        this.props.saveTraining(newTraining)
        this.refs.simpleDialog.hide();
    }

    render() {

        const addDialog = {
            width: '50%',
            height: '450px',
            marginTop: '-300px',
            marginLeft: '-35%'
        };

        return (
            <div>
                <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref="simpleDialog">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className="card-title">Enter New Training Info</h5>

                            <TextField placeholder="Date" onChange={this.handleChange} name="date" type="date" /> <br />
                            <TextField placeholder="Activity" onChange={this.handleChange} name="activity" type="text" /> <br />
                            <TextField placeholder="Duration in Minutes" onChange={this.handleChange} name="duration" type="number" /> <br />

                            <div className="col-md-2">
                                <button className="btn btn-success btn-sm"
                                    onClick={this.handleSubmit}><SaveIcon /> Save New Training</button>
                            </div>
                        </div>
                    </div>
                </SkyLight>
                <div className="col-md-2">
                    <button className="btn btn-success btn-sm"
                        onClick={() => this.refs.simpleDialog.show()}>Add Training</button>
                </div>
            </div>


        );
    }
}

export default Addtraining;

