import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup';
import About from './views/About';
import User from './views/User';
import NotFound from './views/NotFound';

import NavigationBar from './components/NavigationBar';

const App = () => (
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/user/:id" element={<User />} />
      <Route path="/about" element={<About />} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  </Router>
);

export default App;