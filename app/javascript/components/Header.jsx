import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary m-auto">
          <a className="navbar-brand" href="/">
            <h4>Link Shortener</h4>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Links
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;
