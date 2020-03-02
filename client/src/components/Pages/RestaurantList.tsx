import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { BookingApi } from "../../services/booking/BookingApi";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";

type RestaurantListStates = {
    restaurants: any[],
}

export class RestaurantList extends Component<{}, RestaurantListStates> {

    constructor(props: any) {
        super(props);

        this.state = {
            restaurants: []
        };
    }

    public componentDidMount() {
        this.getRestaurants();
    }
  
    public getRestaurants() {
        const bookingApi = new BookingApi('');
        bookingApi.listRestaurants().then(response => {
            response.json().then(data => {
                this.setState({ restaurants: data.data });
            });
        });
    }

    render() {
        const restaurants = this.state.restaurants;

        return(
            <Table responsive>
                <thead>
                    <tr>
                    <th>Restaurant</th>
                    <th>Business hours</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant: any) =>
                        <tr key={restaurant.guid}>
                            <td>{restaurant.name}</td>
                            <td>From {restaurant.opensAt} to {restaurant.closesAt} </td>
                            <td>
                                <Nav>
                                    <Nav.Item>
                                        <Link className="btn btn-outline-primary" to={`/restaurants/${restaurant.guid}/list-tables`}>List tables</Link>
                                        <Link className="btn btn-outline-primary" to={`/restaurants/${restaurant.guid}/add-table`}>Add table</Link>
                                    </Nav.Item>
                                </Nav>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}