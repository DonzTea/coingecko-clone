import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/icons/logo.svg';

import './Navbar.scss';

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg navbar-light border-bottom py-3 px-5"
    >
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          width="140"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Markets</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">DeFi</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">NFT</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Portfolio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Exchanges</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">News</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Tools</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Resources</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Learn</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Community</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
