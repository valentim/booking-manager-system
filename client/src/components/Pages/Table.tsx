import React, { Component, RefObject } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import { BookingApi } from "../../services/booking/BookingApi";
import { GenericModal } from "../Modal";

type ResponseData = {
    data?: string,
    message: string,
    status: string
};

type TableStates = {
    positionName: string,
    maxSeats: string,
    showModal: boolean,
    response: ResponseData,
    redirect: string
};

type TableProps = {
    restaurantGuid: string,
    tableGuid?: string,
    bookingApi: BookingApi
};

export class Table extends Component<TableProps, TableStates> {
    private genericModal: RefObject<GenericModal>;

    constructor(props: TableProps) {
        super(props);

        this.state = {
            positionName: '',
            maxSeats: '0',
            showModal: false,
            redirect: `/restaurants/${this.props.restaurantGuid}/list-tables`,
            response: {
                message: '',
                data: '',
                status: ''
            }
        }

        this.genericModal = React.createRef();

        this.handleDataChange = this.handleDataChange.bind(this);
        this.saveTable = this.saveTable.bind(this);
        this.getTable = this.getTable.bind(this);
    }

    public componentDidMount() {
        this.getTable();
    }

    private getTable() {
        if (this.props.tableGuid) {

            this.props.bookingApi.getTable(this.props.restaurantGuid, this.props.tableGuid).then(result => {
                result.json().then((response) => {
                    this.setState({
                        maxSeats: response.data.maxSeats,
                        positionName: response.data.positionName
                    })
                });
            });
        }
    }

    private handleDataChange(event: any) {
        const name = event.target.id;
        const value = event.target.value;
        const data = {
            [name]: value
        } as TableStates;

        this.setState(data);
    }

    private saveTable(event: any) {
        const defaultResponse = {
            message: 'Restaurant registered with success',
            status: 'success'
        }

        if (this.props.tableGuid) {
            this.props.bookingApi.updateTable(this.state.positionName, Number(this.state.maxSeats), this.props.restaurantGuid, this.props.tableGuid).then(result => {
                result.json().then(response => {
                    let newResponse = defaultResponse;
                    newResponse.message = 'Table updated with success!';
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
            this.props.bookingApi.addTable(this.state.positionName, Number(this.state.maxSeats), this.props.restaurantGuid).then(result => {
                result.json().then(response => {

                    let newResponse = defaultResponse;
                    newResponse.message = 'Table added with success!';
                    if (201 !== result.status) {
                        newResponse.message = response.message;
                        newResponse.status = response.status;
                    }

                    this.setState({ showModal: true, response: newResponse });
                });
            }).catch((err: any) => {
                defaultResponse.status = 'error';
                defaultResponse.message = err;
                this.setState({ showModal: true, response: defaultResponse });
            }).finally(() => {
                this.genericModal.current?.openModal();
            });
        }

        event.preventDefault();
    }

    render() {
        return(
            <Container>
                <nav>
                {this.props.tableGuid ?
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <Link className="breadcrumb-item" to="/manager">Manager restaurants</Link>
                            <Link className="breadcrumb-item" to={`/restaurants/${this.props.restaurantGuid}/list-tables`}>List tables</Link>
                            <li className="breadcrumb-item active">Edit table</li>
                        </ol>
                    :
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Home</a>
                            </li>
                            <Link className="breadcrumb-item" to="/manager">Manager restaurants</Link>
                            <Link className="breadcrumb-item" to={`/restaurants/${this.props.restaurantGuid}/list-tables`}>List tables</Link>
                            <li className="breadcrumb-item active">Add table</li>
                        </ol>
                    }
                </nav>
                <Form onSubmit={this.saveTable}>
                    <GenericModal ref={this.genericModal} redirect={this.state.redirect} message={this.state.response.message} status={this.state.response.status} />
                    <Form.Group controlId="positionName">
                        <Form.Label>Table position name</Form.Label>
                        <Form.Control value={this.state.positionName} onChange={this.handleDataChange} placeholder="Table positoin name" required />
                    </Form.Group>

                    <Form.Group controlId="maxSeats">
                        <Form.Label>Max seats</Form.Label>
                        <Form.Control type="number" value={this.state.maxSeats} onChange={this.handleDataChange} placeholder="Max seats" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Container>
        );
    }
}
