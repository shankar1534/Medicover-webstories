// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Storyupload from './components/pages/storyupload';
import Login from './components/pages/login';
import Dashboard from './components/pages/dashboard';
import Storyscroll from './components/pages/storyscroll'
import Header from './components/pages/header';
import Imagefirebase from './components/pages/firebaseimgurl'
// import { Provider } from 'react-redux';
// import store from './redux/store';


const App = () => {
    return (

      
            <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} /> 
                    <Route path="/storyupload" element={<Storyupload />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/storyscroll" element={<Storyscroll />} />
                    <Route path="/header" element={<Header />} />
                    <Route path="/firebaseimgurl" element={<Imagefirebase />} />


                </Routes>
            </div>
        </Router>
     
    );
};

export default App;
