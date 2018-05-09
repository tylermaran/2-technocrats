import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import stocks from "../../stocks.json";

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

            <li className={this.isPathActive('/pages/StudentClassroom') ? 'active' : null}>

              <Link to="/pages/StudentClassroom">

                <i className="pe-4s-graph"></i>

                <p>Student Classroom</p>

              </Link>

            </li>

            <li className={this.isPathActive('/stocks.json') ? 'active' : null}>

              <Link to="/stocks.json">

                <i className="pe-4s-date"></i>

                <p>Watch List</p>

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

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-MSFT</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-SPY</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-FB</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-AAPL</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-TSLA</Link>

                    </li>
            
                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-AMZN</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-USO</Link>

                    </li>

                    <li className={this.isPathActive('/components/NavLinks') ? 'active' : null}>

                      <Link to="/components/NavLinks">-DOW</Link>

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