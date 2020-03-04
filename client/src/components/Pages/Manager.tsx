import React, { Component } from "react";
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import { BookingApi } from "../../services/booking/BookingApi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Restaurant } from "./Restaurant";
import { RestaurantList } from "./RestaurantList";
import { TableList } from "./TableList";
import { Table } from "./Table";
import { ReservationList } from "./ReservationList";
import { Reservation } from "./Reservation";

type ManagerState = {
    isDefaultActive: boolean
};

type ManagerProps = {
    bookingApi: BookingApi
}

export class Manager extends Component<ManagerProps, ManagerState> {

    constructor(props: ManagerProps) {
        super(props);
        
        this.state = {
            isDefaultActive: true
        };
    }

    public activeLink(isActive: boolean) {
        this.setState({ isDefaultActive: isActive });
    }

    render() {
        return(
            <BrowserRouter>
                <Container>
                    <Row>
                        <Col sm={2}>
                        <Nav variant="pills" defaultActiveKey="/list-restaurants" className="flex-column">
                            <Nav.Link as={NavLink} active={this.state.isDefaultActive} to="/list-restaurants" onClick={() => this.activeLink(true)}>List Restaurants</Nav.Link>
                            <Nav.Link as={NavLink} to="/add-restaurants" onClick={() => this.activeLink(false)} >Add restaurant</Nav.Link>
                        </Nav>
                        </Col>
                        <Col sm={10}>
                            <Switch>
                                <Route path={["/list-restaurants", "/manager"]} render={props => {
                                            return <RestaurantList bookingApi={this.props.bookingApi} />;
                                        }}
                                />
                                <Route path="/add-restaurants" render={props => {
                                            return <Restaurant bookingApi={this.props.bookingApi} />;
                                        }}
                                />
                                <Route path="/restaurants/:restaurantGuid/list-tables"
                                        render={props => {
                                            return <TableList bookingApi={this.props.bookingApi} restaurantGuid={props.match.params.restaurantGuid} />;
                                        }}
                                />

                                <Route path="/restaurants/:restaurantGuid/tables/:tableGuid/reservations/:reservationGuid"
                                        render={props => {
                                            return <Reservation bookingApi={this.props.bookingApi} reservationGuid={props.match.params.reservationGuid} restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                                        }}
                                />

                                <Route path="/restaurants/:restaurantGuid/tables/:tableGuid/reservations"
                                        render={props => {
                                            return <ReservationList bookingApi={this.props.bookingApi} restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                                        }}
                                />

                                <Route path="/restaurants/:restaurantGuid/add-table"
                                        render={props => {
                                            return <Table bookingApi={this.props.bookingApi} restaurantGuid={props.match.params.restaurantGuid} />;
                                        }}
                                />

                                <Route path="/restaurants/:restaurantGuid/tables/:tableGuid"
                                        render={props => {
                                            return <Table bookingApi={this.props.bookingApi} restaurantGuid={props.match.params.restaurantGuid} tableGuid={props.match.params.tableGuid} />;
                                        }}
                                />

                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}