import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";

type TableCardProps = {
    restaurantName: string,
    restaurantGuid: string,
    maxSeats: number,
    positionName: string,
    guid: string
};

export class TableCard extends Component<TableCardProps, {}> {
    render() {
        const randomImages: any = {
            0: 'https://media.istockphoto.com/photos/fried-spaghetti-with-salmon-on-white-dish-picture-id803229734',
            1: 'https://media.istockphoto.com/photos/chef-frying-mussels-picture-id135950713',
            2: 'https://media.istockphoto.com/photos/martabak-picture-id522652191',
            3: 'https://media.istockphoto.com/photos/the-chef-prepares-a-gourmet-meal-picture-id802772412',
            4: 'https://media.istockphoto.com/photos/chef-decorating-grilled-steak-picture-id546184046',
            5: 'https://media.istockphoto.com/photos/empty-glasses-in-restaurant-picture-id522645617',
            6: 'https://media.istockphoto.com/photos/chef-in-kitchen-at-stove-with-high-burning-flames-picture-id1136342322',
            default: 'https://media.istockphoto.com/photos/chef-frying-mussels-picture-id135950713'
        };

        const randomNumber = (Math.floor(Math.random() * 6));
        const image = randomImages[randomNumber] || randomImages.default;
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Header>{this.props.restaurantName}</Card.Header>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{this.props.positionName}</Card.Title>
                    <Card.Text>
                        Max seats: {this.props.maxSeats}
                    </Card.Text>
                    <Nav>
                        <Nav.Item>
                            <Link className="btn btn-outline-primary" to={`/restaurants/${this.props.restaurantGuid}/tables/${this.props.guid}/add-reservation`}>Reserve</Link>
                        </Nav.Item>
                    </Nav>
                </Card.Body>
            </Card>
        );
    }
}