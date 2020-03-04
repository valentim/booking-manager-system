import React, { Component, RefObject } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import { BookingApi } from '../../services/booking/BookingApi';
import { GenericModal } from "../Modal";
import moment from 'moment';

type ReservationListStates = {
    reservations: any[],
    message: string,
    status: string,
    showModal: boolean,
    redirect: string
}

type ReservationListProps = {
    restaurantGuid: string,
    tableGuid: string,
    bookingApi: BookingApi
};

export class ReservationList extends Component<ReservationListProps, ReservationListStates> {
    private genericModal: RefObject<GenericModal>;

    constructor(props: ReservationListProps) {
        super(props);

        this.state = {
            reservations: [],
            message: 'Reservation was canceled with success!',
            status: 'success',
            showModal: false,
            redirect: `/restaurants/${this.props.restaurantGuid}/list-tables`
        };

        this.genericModal = React.createRef();
        this.cancelReservation = this.cancelReservation.bind(this);
    }

    public componentDidMount() {
        this.getReservations();
    }

    private getReservations() {
        this.props.bookingApi.listReservations(this.props.restaurantGuid, this.props.tableGuid).then(response => {
            response.json().then(data => {
                this.setState({ reservations: data.data });
            });
        });
    }

    private cancelReservation(e: any, reservationGuid: string) {
        this.props.bookingApi.cancelReservation(this.props.restaurantGuid, this.props.tableGuid, reservationGuid).then(response => {
            let message = this.state.message;
            let status = this.state.status;

            if (response.status !== 200) {
                message = 'The reservation was not canceled';
                status = 'error';
            }

            this.setState({ showModal: true, message, status });
        }).catch(err => {
            this.setState({ showModal: true, message: err, status: 'error' });
        }).finally(() => {
            this.genericModal.current?.openModal();
        });

        e.preventDefault();

    }

    render() {
        const reservations = this.state.reservations;

        return(
            <Container>
                <GenericModal ref={this.genericModal} redirect={this.state.redirect} message={this.state.message} status={this.state.status} />
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <Link className="breadcrumb-item" to="/manager">Manager restaurants</Link>
                        <Link className="breadcrumb-item" to={`/restaurants/${this.props.restaurantGuid}/list-tables`}>List tables</Link>
                        <li className="breadcrumb-item active">List reservations</li>
                    </ol>
                </nav>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                        <th>Reservation code</th>
                        <th>Date</th>
                        <th>User</th>
                        <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation: any) => {
                            const date = moment(reservation.when);

                            return(<tr key={reservation.reservationCode}>
                                <td>{reservation.reservationCode}</td>
                                <td>{date.format('YYYY-MM-DD')} at {date.format('hh:mm A')}</td>
                                <td>{reservation.user}</td>
                                <td>
                                    <Nav>
                                        <Nav.Item>
                                            <Link className="btn btn-outline-primary" to={`/restaurants/${this.props.restaurantGuid}/tables/${this.props.tableGuid}/reservations/${reservation.reservationCode}`}>Edit</Link>
                                            <Link className="btn btn-outline-primary" to="/" onClick={(e) => this.cancelReservation(e, reservation.reservationCode)}>Cancel</Link>
                                        </Nav.Item>
                                    </Nav>
                                </td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}