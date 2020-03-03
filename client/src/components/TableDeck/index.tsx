import React, { Component } from "react";
import { TableCard } from "../TableCard";
import { BookingApi } from "../../services/booking/BookingApi";
import Container from "react-bootstrap/Container";
import CardDeck from 'react-bootstrap/CardDeck';
import Badge from 'react-bootstrap/Badge';

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
                const restaurantsData = data.data.sort((a: any, b:any) => b.tables.length - a.tables.length);
                this.setState({ restaurants: restaurantsData });
            });
        });

    }

    render() {
        const restaurants = this.state.restaurants;
        return(
            <Container>
                {restaurants.map((restaurant: any) =>
                    <div key={restaurant.guid}>
                        <h2><Badge variant="info" className="d-flex justify-content-center badge-restaurant">{restaurant.name}</Badge></h2>
                        <CardDeck className="d-flex">
                            {restaurant.tables.map((table: any) =>
                                <div key={table.guid} >
                                    <TableCard open={restaurant.opensAt} close={restaurant.closesAt} restaurantName={restaurant.name} available={true} guid={table.guid} positionName={table.positionName} maxSeats={table.maxSeats} restaurantGuid={restaurant.guid} />
                                </div>
                            )}

                            {restaurant.tables.length < 1 && (
                                <div>
                                    <TableCard open={restaurant.opensAt} close={restaurant.closesAt} restaurantName={restaurant.name} available={false} guid={restaurant.guid} positionName={restaurant.name} maxSeats={0} restaurantGuid={restaurant.guid} />
                                </div>
                            )}
                        </CardDeck>
                    </div>
                )}
            </Container>
        );
    }
}