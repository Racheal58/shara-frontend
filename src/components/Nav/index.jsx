import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

// utils
import { getToken, isAdmin, decodeToken, logout } from '../../api/helpers';

const Nav = ({ children }) => {
  let first_name = '';

  if (decodeToken()) {
    first_name = decodeToken().data.first_name;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        Shara Shoes
      </Link>
      <button
        className="navbar-toggler bg-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {children}
          {getToken() ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
              {isAdmin() ? (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item ml-0 ml-lg-5">
                  <Link className="nav-link text-white" to="/dashboard">
                    {first_name.replace(
                      first_name[0],
                      first_name[0].toUpperCase(),
                    )}
                    &apos;s Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button
                  type="button"
                  onClick={() => logout()}
                  className="btn btn-transparent nav-link text-white ml-0 ml-lg-5 border-0"
                  to="/products"
                >
                  <i className="fas fa-sign-out-alt mr-2" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item ml-0 ml-lg-5">
                <Link className="nav-link text-white" to="/authenticate">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
