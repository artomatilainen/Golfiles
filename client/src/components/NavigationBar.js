import React from 'react';
import { Link } from 'react-router-dom';
import { jwtToken } from './Signals';
import '../style.css';

export default function NavigationBar() {
   function logout() {
      jwtToken.value = '';
      alert('Logout - thanks for using the app!');
      window.location.href = '/';
   }

   return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto justify-content-center">
                  <li className="nav-item">
                     <Link to={'/about'} className='nav-link'>About</Link>
                  </li>
                  <li className="nav-item">
                     <Link to={'/user/testusername'} className='nav-link'>Profile</Link>
                  </li>
                  <li className="nav-item">
                     <Link to={'/login'} className='nav-link'>Login</Link>
                  </li>
                  <li className="nav-item">
                     <Link to={'/signup'} className='nav-link'>Sign up</Link>
                  </li>
                  <li className="nav-item">
                     {jwtToken.value.length !== 0 ? (
                        <Link to={'/logout'} className='nav-link' onClick={logout}>Logout</Link>
                     ) : (
                        <h2>Logged out</h2>
                     )}
                  </li>
               </ul>
            </div>
         </nav>
      </div>
   );
}
