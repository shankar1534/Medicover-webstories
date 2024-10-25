import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
                setSuccess('Login Successful');
                setError('');

                sessionStorage.setItem('user', JSON.stringify(userData));

                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5 col-xl-4">
            {/* <h2 className="text-center mb-4">Login</h2> */}
            <form onSubmit={handleLogin} className="p-4 border rounded shadow">
                <div className="mb-3">
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Name"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            {success && <p className="mt-3 text-success">{success}</p>}
            {error && <p className="mt-3 text-danger">{error}</p>}
        </div>
    );
};

export default Login;
