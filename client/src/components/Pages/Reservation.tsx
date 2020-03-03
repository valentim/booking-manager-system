import React, { Component, RefObject } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { BookingApi } from "../../services/booking/BookingApi";
import { GenericModal } from "../Modal";
import InputMoment from 'input-moment';
import moment from 'moment';
import uuid from 'uuid/v4';
import './Calendar.css';

type ResponseData = {
    reservationCode?: string,
    message: string,
    status: string
};

type ReservationStates = {
    when: moment.Moment,
    seats: string,
    showModal: boolean,
    response: ResponseData
};

type ReservationProps = {
    reservationGuid?: string,
    restaurantGuid: string,
    tableGuid: string,
};

export class Reservation extends Component<ReservationProps, ReservationStates> {
    private genericModal: RefObject<GenericModal>;

    constructor(props: ReservationProps) {
        super(props);

        const now = moment();
        now.set({minute: 0});

        this.state = {
            when: now,
            showModal: false,
            seats: '1',
            response: {
                message: '',
                reservationCode: '',
                status: ''
            }
        }

        this.genericModal = React.createRef();

        this.handleDataChange = this.handleDataChange.bind(this);
        this.saveReservation = this.saveReservation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    private handleDataChange(event: any) {
        const name = event.target.id;
        const value = event.target.value;
        const data = {
            [name]: value
        } as ReservationStates;

        this.setState(data);
    }

    private saveReservation() {
        const bookingApi = new BookingApi('');
        const defaultResponse = {
            message: 'Reservation done with success!',
            status: 'success'
        }

        const userGuid = uuid();

        const when = this.state.when.format('YYYY-MM-DD HH:mm:00');

        if (this.props.reservationGuid) {
            bookingApi.updateReservation(when, userGuid, Number(this.state.seats), this.props.restaurantGuid, this.props.tableGuid, this.props.reservationGuid).then(result => {
                result.json().then(response => {
                    let newResponse = defaultResponse;
                    newResponse.message = 'Reservation updated with success!';
                    if (200 !== result.status) {
                        newResponse.message = response.message;
                        newResponse.status = response.status;
                    }

                    this.setState({ showModal: true, response: newResponse });
                });

            }).catch(err => {
                defaultResponse.status = 'error';
                defaultResponse.message = err;
                this.setState({ showModal: true, response: defaultResponse });
            }).finally(() => {
                this.genericModal.current?.openModal();
            });
        } else {
            bookingApi.createReservation(when, userGuid, Number(this.state.seats), this.props.restaurantGuid, this.props.tableGuid).then(result => {
                result.json().then(response => {
                    let newResponse = defaultResponse;
                    if (201 !== result.status) {
                        newResponse.message = response.message;
                        newResponse.status = response.status;
                    }

                    this.setState({ showModal: true, response: newResponse });
                });
            }).catch(err => {
                defaultResponse.status = 'Error';
                defaultResponse.message = err;
                this.setState({ showModal: true, response: defaultResponse });
            }).finally(() => {
                this.genericModal.current?.openModal();
            });
        }
    }

    private handleChange(when: moment.Moment) {
        this.setState({ when });
    };
    
    private handleSave() {
        if (this.state.seats) {
            console.log('saved', this.state.when.format('llll'), this.state.seats);
            this.saveReservation();
        }
    };

    public addWaitingQueue() {
        const bookingApi = new BookingApi('');

        const userGuid = uuid();

        const when = this.state.when.format('YYYY-MM-DD HH:mm:00');

        bookingApi.addWaitingQueue(when, userGuid, Number(this.state.seats), this.props.restaurantGuid, this.props.tableGuid).then(result => {
            result.json().then(response => {
                console.log(response);
            });

        });
    }

    render() {
        return(
            <Container>
                <nav>
                    {this.props.reservationGuid ?
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <Link className="breadcrumb-item" to="/manager">Manager restaurants</Link>
                            <Link className="breadcrumb-item" to={`/restaurants/${this.props.restaurantGuid}/list-tables`}>List tables</Link>
                            <Link className="breadcrumb-item" to={`/restaurants/${this.props.restaurantGuid}/tables/${this.props.tableGuid}/reservations`}>List reservations</Link>
                            <li className="breadcrumb-item active">Edit reservation</li>
                        </ol>
                    :
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Reserve</li>
                        </ol>
                    }
                </nav>
                <Row className="justify-content-md-center">
                    <GenericModal onWaitingQueue={this.addWaitingQueue} ref={this.genericModal} message={this.state.response.message} status={this.state.response.status} />
                    <div className="reservation-form">
                        <Form.Group controlId="seats">
                            <Form.Label>Seats</Form.Label>
                            <Form.Control type="number" value={this.state.seats} onChange={this.handleDataChange} placeholder="How many people" required />
                        </Form.Group>
                        <Form.Group controlId="when">
                            <Form.Label>Date and time</Form.Label>
                            <Form.Control value={this.state.when.format('llll')} readOnly />                        
                            <InputMoment moment={this.state.when}
                                onChange={this.handleChange}
                                onSave={this.handleSave}
                                minStep={60} // default
                                hourStep={1} // default
                                prevMonthIcon="ion-ios-arrow-left" // default
                                nextMonthIcon="ion-ios-arrow-right" // default
                            />
                        </Form.Group>
                    </div>
                </Row>
            </Container>
        );
    }
}
