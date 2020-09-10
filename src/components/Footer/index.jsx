import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import Button from '../Button';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="upper">
        <Link to="/register" className="btn-link">
          <Button className="btn btn-white" value="Get Started" />
        </Link>
      </section>
      <section className="bottom">
        <div className="footer-group">
          <Link className="footer-link brand" to="/">
            Shara shoes
          </Link>
        </div>
        <div className="footer-group">
          <div>
            Copyright &copy;
            <>{new Date().getFullYear()}</>. Shara shoes
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
