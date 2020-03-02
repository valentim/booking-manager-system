import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import { BookingApi } from "../../services/booking/BookingApi";
import Container from "react-bootstrap/Container";

type TableListStates = {
    tables: any[],
}

type TableListProps = {
    restaurantGuid: string
};

export class TableList extends Component<TableListProps, TableListStates> {

    constructor(props: TableListProps) {
        super(props);

        this.state = {
            tables: []
        };
    }

    public componentDidMount() {
        this.getTables();
    }

    public getTables() {
        const bookingApi = new BookingApi('');
        bookingApi.listTables(this.props.restaurantGuid).then(response => {
            response.json().then(data => {
                this.setState({ tables: data.data });
            });
        });
    }

    render() {
        const tables = this.state.tables;

        return(
            <Container>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <Link className="breadcrumb-item" to="/manager">Manager restaurants</Link>
                        <li className="breadcrumb-item active">List tables</li>
                    </ol>
                </nav>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>Table position</th>
                        <th>Max seats</th>
                        <th>Availability</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table: any) =>
                            <tr key={table.guid}>
                                <td>{table.positionName}</td>
                                <td>{table.maxSeats}</td>
                                <td>-</td>
                                <td>
                                    <Nav>
                                        <Nav.Item>
                                            <Link className="btn btn-outline-primary" to={`/restaurants/${this.props.restaurantGuid}/tables/${table.guid}`}>Edit table</Link>
                                            <Link className="btn btn-outline-primary" to={`/restaurants/${this.props.restaurantGuid}/tables/${table.guid}/reservations`}>View reservations</Link>
                                        </Nav.Item>
                                    </Nav>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}