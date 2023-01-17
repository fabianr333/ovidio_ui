import React, { Component } from "react";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render () {
        return (
            <div className="submit-form">
                <h1>
                Log in to your account
                </h1>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        name="email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sku">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        name="password"
                    />
                </div>
                
                <button
                type="submit"
                className="btn btn-success"
                >
                Login
                </button>
            </div>
        )
    }
}

export default Login;