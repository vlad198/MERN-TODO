import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

    useEffect(() => {
        clearError();
        if (userAuth !== null) {
            props.history.push('/');
        }
    }, [userAuth, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(user);
    }

    return (
        <Fragment>
            <h1 className="text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={user.email} onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={user.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary btn-block text-center">Submit</button>

                <br />
                {
                    errors !== null ?
                        (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errors.msg ? errors.msg : errors.errors[0].msg}
                                <button type="button" className="close" onClick={() => clearError()}>
                                    <span>&times;</span>
                                </button>
                            </div>
                        ) : null

                }
            </form>
            <div>Not registered?
                <Link to="/register">{" "}Create an account</Link>
            </div>
        </Fragment>
    );
}

export default Login;