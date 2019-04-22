import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProfileUser from './../../images/support.png';
import EventLogo from './../../images/eventsz.png';
import PostsIcon from './../../images/posticon.png';
import LogoutIcon from './../../images/logouticon.png';


export class AppNavBar extends Component {
  render() {
    return (  
      <header className="navbar">
        <div className="logo">
            Skillz-Forever
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/events">
                  <div className="container">
                    <img src={EventLogo} alt="Avatar" className="image"/>
                      <div className="middle">
                        <div className="text">Events</div>
                      </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/posts">
                  <div className="container">
                    <img src={PostsIcon} alt="Avatar" className="image"/>
                      <div className="middlePosts">
                        <div className="text">Posts</div>
                      </div>
                  </div>
                </Link>
                </li>
              <li>
                <Link to="/contactus">
                <div className="container">
                  <img src={ProfileUser}  alt="Avatar" className="image"/>
                    <div className="middleProfile">
                      <div className="text">Contact </div>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/">
                <div className="container">
                  <img src={LogoutIcon}  alt="Avatar" className="image" />
                  <div className="middleLogout">
                      <div className="text">Logout</div>
                  </div>
                </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default AppNavBar
