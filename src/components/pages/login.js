import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import medicovericon from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const sessionUserData = JSON.parse(sessionStorage.getItem('user'));
        if (sessionUserData) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            username: name,       
            password: password,
            access_key: "123e4567-e89b-12d3-a456-426614174000"
        };

        try {
            const response = await fetch('https://www.medicoverhospitals.in/apis/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData) 
            });

            const data = await response.json();

            if (response.ok && data.message === "Login successful") {
                setError('');
                sessionStorage.setItem('user', JSON.stringify(userData.username));
                navigate('/dashboard');
            } else {
              navigate('/dashboard');
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred during login. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='login-section'>
            <div className="row gy-4 justify-content-center">
                <div className="col-xxl-7 col-md-7">
                    <div className="card">
                        <div className="card-header text-center">
                            <img src={medicovericon} alt="site logo" className="light-logo" />
                        </div>
                        <div className="card-body">
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label className="form-label">User Id</label>
                                    <div className="icon-field">
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56">
                                                <path fill="currentColor" d="M28.012 28.023c5.578 0 10.125-4.968 10.125-11.015c0-6-4.5-10.711-10.125-10.711c-5.555 0-10.125 4.805-10.125 10.758c.023 6.023 4.57 10.968 10.125 10.968m0-3.539c-3.422 0-6.352-3.28-6.352-7.43c0-4.077 2.883-7.218 6.352-7.218c3.515 0 6.351 3.094 6.351 7.172c0 4.148-2.883 7.476-6.351 7.476m-14.719 25.22h29.438c3.89 0 5.742-1.173 5.742-3.75c0-6.142-7.735-15.024-20.461-15.024c-12.727 0-20.485 8.883-20.485 15.023c0 2.578 1.852 3.75 5.766 3.75m-1.125-3.54c-.61 0-.867-.164-.867-.656c0-3.844 5.953-11.04 16.71-11.04c10.759 0 16.688 7.196 16.688 11.04c0 .492-.234.656-.843.656Z"></path>
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Enter User id"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Password</label>
                                    <div className="icon-field">
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M9 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2"></path>
                                                <path fill="currentColor" fill-rule="evenodd" d="M5.25 8v1.303q-.34.023-.642.064c-.9.12-1.658.38-2.26.981c-.602.602-.86 1.36-.981 2.26c-.117.867-.117 1.97-.117 3.337v.11c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.981 2.26c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h8.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26s-1.36-.86-2.26-.981a10 10 0 0 0-.642-.064V8a6.75 6.75 0 0 0-13.5 0M12 2.75A5.25 5.25 0 0 0 6.75 8v1.253q.56-.004 1.195-.003h8.11q.635 0 1.195.003V8c0-2.9-2.35-5.25-5.25-5.25m-7.192 8.103c-.734.099-1.122.28-1.399.556c-.277.277-.457.665-.556 1.4c-.101.755-.103 1.756-.103 3.191s.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.754.101 1.756.103 3.191.103h8c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191s-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.277-.277-.665-.457-1.4-.556c-.755-.101-1.756-.103-3.191-.103H8c-1.435 0-2.437.002-3.192.103" clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 text-end">
                                    <Link to="/forgot-password" className="text-decoration-none small">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div>
                                    {error && <p className="text-danger">{error}</p>}
                                </div>
                                <div className="col-12">
                                    <button onClick={handleLogin} className="btn btn-warning-600 w-100">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
