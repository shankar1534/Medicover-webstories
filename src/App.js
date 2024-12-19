import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation,useNavigate } from 'react-router-dom';

import './App.css';
import Sidebar from './components/pages/sidebar';
import Login from './components/pages/Login';
import AddStory from './components/pages/AddStory';
import EditStory from './components/pages/EditStory';
import PublishedStories from './components/pages/PublishedStories';
import UnpublishedStories from './components/pages/UnpublishedStories';
import Categories from './components/pages/Categories';
import AddCategory from './components/pages/AddCategory';
import Reports from './components/pages/Reports';
import Saved from './components/pages/Saved';
import Shared from './components/pages/Shared';
import Views from './components/pages/Views';
import Liked from './components/pages/Liked';
import Settings from './components/pages/Settings';
import Header from './components/pages/Header';
import Dashboard from './components/pages/Dashboard'

function AppContent() {
  const navigate = useNavigate(); 

  const [isLightTheme, setIsLightTheme] = useState(true);

  const [foreditId,setforedIt] = useState('appp')
  const [storyZindex,setstoryZindex] = useState(false)


  useEffect(() => {
    const sessionUserData = JSON.parse(sessionStorage.getItem('user'));
    if (!sessionUserData) {
        navigate('/');
    }
 
}, [navigate]);



  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  

  const eventSidebarClick = () =>{
    setIsSidebarVisible(!isSidebarVisible)
    console.log('hellllooooooooadfasf',isSidebarVisible)
  }


  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <div className="app-container" style={{ background:isLightTheme ? 'rgb(245,246,250)' : 'grey' }}>
      {!isLoginPage && <Sidebar isSidebarVisible={isSidebarVisible} isLightTheme={isLightTheme}/>}
      <div className="content right-side-section">
        {!isLoginPage && <Header eventSidebarClick={eventSidebarClick} toggleTheme={toggleTheme} isLightTheme={isLightTheme} storyZindex={storyZindex}/>}
        <div className="main-section">
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-story" element={<AddStory />} />
            <Route path="/edit-story" element={<EditStory foreditId={foreditId}/>} />
            <Route path="/published" element={<PublishedStories setforedIt={setforedIt} foreditId={foreditId} setstoryZindex={setstoryZindex}/>} />
            <Route path="/unpublished" element={<UnpublishedStories setforedIt={setforedIt} foreditId={foreditId}  setstoryZindex={setstoryZindex}/>} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/views" element={<Views />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
