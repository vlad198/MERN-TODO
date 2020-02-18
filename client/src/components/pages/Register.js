import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom';

const Register = (props) => {

    const { registerUser, userAuth, errors, clearError ,setError} = useContext(AuthContext);

    useEffect(() => {
        clearError();
        if (userAuth !== null) {
            props.history.push('/');
        }
    }, [userAuth, props.history]);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = e => {
        clearError();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        const { name, email, password } = user;

        if (user.passwordConfirm === user.password) {
            registerUser({ name, email, password });
        } else {
            setError({
                msg : "Passwords don't match"
            });
        }
    }

    return (
        <div>
            <h1 className="text-center">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={user.name} onChange={handleChange} type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" value={user.email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" value={user.password} onChange={handleChange} type="password" className="form-control" id="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Password</label>
                    <input name="passwordConfirm" value={user.passwordConfirm} onChange={handleChange} type="password" className="form-control" id="passwordConfirm" />
                </div>
                <button type="submit" className="btn btn-primary btn-block text-center">Submit</button>
                <br />
                {
                    errors !== null ?
                       (<div className="alert alert-danger alert-dismissible fade show" role="alert">
                             {errors.msg ? errors.msg : errors.error[0].msg}
                             <button type="button" className="close" onClick={() => clearError()}>
                                <span>&times;</span>
                            </button>
                        </div>) : null
                }
            </form>
            <div>Already registered?
                <Link to="/login">{" "}Log In</Link>
            </div>
        </div>
    );
}

export default Register;