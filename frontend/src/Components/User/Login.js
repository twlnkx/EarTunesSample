import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Layout/Loader';
import Metadata from '../Layout/Metadata';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { authenticate } from '../../utils/helpers';
import { getUser } from '../../utils/helpers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' }); // State for form errors
    const navigate = useNavigate();
    let location = useLocation();
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config);
            console.log(data);
            authenticate(data, () => navigate('/'));
        } catch (error) {
            toast.error('Invalid email or password', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        // Validate email
        if (!email || !email.includes('@')) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }

        // Validate password
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(email, password);
        }
    };

    useEffect(() => {
        if (getUser() && redirect === 'shipping') {
            navigate(`/${redirect}`);
        }
    }, []);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Metadata title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className={`form-control ${errors.email && 'is-invalid'}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className={`form-control ${errors.password && 'is-invalid'}`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">
                                    Forgot Password?
                                </Link>

                                <button id="login_button" type="submit" className="btn btn-block py-3">
                                    LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">
                                    New User?
                                </Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Login;
