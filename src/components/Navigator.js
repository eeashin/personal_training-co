import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigator extends Component {
    render() {
        return (
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <button class="navbar-toggler navbar-toggler-right" type="button"
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        ariacontrols="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link class="navbar-brand" to="./About">Personal Training Company</Link>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link className="nav-link" to='./CustomerList'>Customer List</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to='./TrainingList'>Training List</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to='./Calendar'>Calendar</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
export default Navigator;