import { Link } from 'react-router-dom';
import { jwtToken, userInfo } from './Signals';

export default function NavigationBar() {

    console.log('navbar token: ' + jwtToken.value);

    function logout(){
        console.log('logout');
        jwtToken.value = '';
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
                        <li className="nav-item active">
                            <Link to={'/about'} className='nav-link'>About</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/user/testusername'} className='nav-link'>Profile</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/login'} className='nav-link'>Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/signup'} className='nav-link'>Sign up</Link>
                        </li>
                        {
                            jwtToken.value.length !== 0
                                ? <button onClick={logout}>Logout</button>
                                : <h2>Logged out</h2>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}