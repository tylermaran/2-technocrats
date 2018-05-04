import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

class Nav extends Component {

    state = {};

    render() {

        let { location } = this.props;
    
        return (
    
          <ul className="nav">
    
            <li className={location.pathname === '/' ? 'active' : null}>
    
              <Link to="/">
    
                <i className="pe-4s-graph"></i>
    
                <p>Porfolio</p>
    
              </Link>
    
            </li>

            <li className={this.isPathActive('/charts') ? 'active' : null}>
    
              <Link to="/charts">

                <i className="pe-4s-graph"></i>

                <p>Charts</p>

              </Link>

            </li>

            <li className={this.isPathActive('/calendar') ? 'active' : null}>

              <Link to="/calendar">

                <i className="pe-4s-date"></i>

                <p>Calendar</p>

              </Link>

            </li>

    
            <li className={this.isPathActive('/components') || this.state.componentMenuOpen ? 'active' : null}>
    
              <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
    
                data-toggle="collapse">
    
                <i className="pe-4s-plugin"></i>
    
                <p>
    
                  Stocks
    
                <b className="caret"></b>
    
                </p>
    
              </a>
    
              <Collapse in={this.state.componentMenuOpen}>
    
                <div>
    
                  <ul className="nav">
    
                    <li className={this.isPathActive('/components/buttons') ? 'active' : null}>
    
                      <Link to="/components/buttons">Buttons</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/grid') ? 'active' : null}>
    
                      <Link to="/components/grid">Grid System</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/icons') ? 'active' : null}>
    
                      <Link to="/components/icons">Icons</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/notifications') ? 'active' : null}>
    
                      <Link to="/components/notifications">Notifications</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/panels') ? 'active' : null}>
    
                      <Link to="/components/panels">Panels</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/sweetalert') ? 'active' : null}>
    
                      <Link to="/components/sweetalert">Sweet Alert</Link>
    
                    </li>
    
                    <li className={this.isPathActive('/components/typography') ? 'active' : null}>
    
                      <Link to="/components/typography">Typography</Link>
    
                    </li>

                    <li className={this.isPathActive('/components/typography') ? 'active' : null}>
    
                      <Link to="/components/typography">Typography</Link>

                    </li>
    
                  </ul>
    
                </div>
    
              </Collapse>
    
            </li>
    
          </ul>
    
        );
    
      }

      isPathActive(path) {
    
        return this.props.location.pathname.startsWith(path);
    
      }
    
    }
    
    export default withRouter(Nav);