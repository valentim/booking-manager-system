import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import { TableDeck } from './components/TableDeck';
import { Manager } from './components/Pages/Manager';
import './App.css';
import { Reservation } from './components/Pages/Reservation';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Navbar className="bg-light-blue" expand="lg">
            <Navbar.Brand href="#restaurants">Menu</Navbar.Brand>
            <Nav fill defaultActiveKey="/">
                <Nav.Item>
                    <Link to="/" className="nav-link">Restaurants</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/manager" className="nav-link">Manager</Link>
                </Nav.Item>
            </Nav>
        </Navbar>
        <Container className="p-3">
            <Switch>
                <Route exact path="/" component={TableDeck} />
                <Route exact path="/manager" component={Manager} />
                <Route path="/restaurants/:restaurantGuid/tables/:tableGuid/add-reservation"
                        render={props => {
                            return <Reservation restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                        }}
                />
            </Switch>
        </Container>
    </BrowserRouter>
  );
};

export default App;
