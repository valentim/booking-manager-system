import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import { TableDeck } from './components/TableDeck';
import { Manager } from './components/Pages/Manager';
import { Reservation } from './components/Pages/Reservation';
import { BookingApi } from './services/booking/BookingApi';
import './App.css';

const App: React.FC = () => {

    const bookingApi = new BookingApi();

    return (
        <BrowserRouter>
            <Navbar className="bg-light-blue" sticky="top" expand="lg">
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
                    <Route exact path="/" render={props => {
                                return <TableDeck bookingApi={bookingApi} />;
                            }}
                    />
                    <Route exact path="/manager" render={props => {
                                return <Manager bookingApi={bookingApi} />;
                            }}
                    />
                    <Route path="/restaurants/:restaurantGuid/tables/:tableGuid/add-reservation"
                            render={props => {
                                return <Reservation bookingApi={bookingApi} restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                            }}
                    />
                    <Route path="/restaurants/:restaurantGuid/tables/:tableGuid/waiting-queue"
                            render={props => {
                                return <Reservation bookingApi={bookingApi} isWaitingQueueReservation={true} restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                            }}
                    />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
