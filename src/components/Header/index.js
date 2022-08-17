import Logo from "../../assets/logo1.png";
import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { auth } from '../../firebase/utils'
import "./styles.scss";

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="LOGO" />
          </Link>
        </div>

        <div className="callToActions">

          {currentUser && 
          <ul>
            <span onClick={()=> auth.signOut()}>LOGOUT</span>
          </ul>
          }
          {!currentUser && ( //if the user is not logged in
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}

        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ( { user }) => ({
  currentUser: user.currentUser
});
export default connect(mapStateToProps, null)(Header);
