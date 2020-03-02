import React, { Component } from "react";
import { TableCard } from "../TableCard";
import { BookingApi } from "../../services/booking/BookingApi";
import Container from "react-bootstrap/Container";
import CardDeck from 'react-bootstrap/CardDeck';

type SliderState = {
    restaurants: any[]
};

export class TableDeck extends Component<{}, SliderState> {
    constructor(props: any) {
        super(props);

        this.state = {
            restaurants: []
        };
    }

    componentDidMount() {
        this.getRestaurants();
    }
  
  
    private getRestaurants() {
        const bookingApi = new BookingApi('');
        bookingApi.listRestaurants().then(response => {
            response.json().then(data => {
                const restaurantsData = data.data;
                const filteredRestaurants = restaurantsData.filter((r: any) => r.tables.length > 0).sort((a: any, b:any) => b.tables.length - a.tables.length);
                this.setState({ restaurants: filteredRestaurants });
            });
        });

    }

    render() {
        const restaurants = this.state.restaurants;
        return(
            <Container>
                {restaurants.map((restaurant: any) =>
                    <CardDeck key={restaurant.guid} className="d-flex justify-content-center">
                        {restaurant.tables.map((table: any) =>
                            <div key={table.guid} >
                                <TableCard restaurantName={restaurant.name} guid={table.guid} positionName={table.positionName} maxSeats={table.maxSeats} restaurantGuid={restaurant.guid} />
                            </div>
                        )}
                    </CardDeck>
                )}
            </Container>
        );
    }
}