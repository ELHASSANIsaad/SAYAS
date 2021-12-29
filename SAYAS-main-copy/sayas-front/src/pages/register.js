import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

export default class Register extends Component {

    state = {
        name: '',
        fisrtname:'',
        lastname:'',
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };
    handlefirstnameChange = event => {
        this.setState({ fisrtname: event.target.value });
    };
    handlelastnameChange = event => {
        this.setState({ lastname: event.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'http://localhost:5000/Register';
        
        
        axios.post(url, {username:this.state.name,password:this.state.password,email:this.state.email,firstname:this.state.fisrtname,lastname:this.state.lastname})
            .then(result => {
                
                this.setState({isLoading: false});
                if (result.data.status !== 'fail') {
                    this.setState({redirect: true, authError: true});
                }else {
                    this.setState({redirect: false, authError: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register to SAYAS</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputName" className="form-control" placeholder="username"  name="name" onChange={this.handleNameChange} required/>
                                    <label htmlFor="inputName">username</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputFirstname" className="form-control" placeholder="firstname"  name="firstname" onChange={this.handlefirstnameChange} required/>
                                    <label htmlFor="inputFirstname">firstname</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="inputLastname" className="form-control" placeholder="lastname"  name="lastname" onChange={this.handlelastnameChange} required/>
                                    <label htmlFor="inputLastname">lastname</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputEmail" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email. or Email Exist
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Your Account</Link>
                            <Link className="d-block small" to={'#'}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


