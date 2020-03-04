import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Badge from 'react-bootstrap/Badge';

type TableCardProps = {
    restaurantName: string,
    restaurantGuid: string,
    maxSeats: number,
    positionName: string,
    guid: string,
    open: string,
    close: string,
    available?: boolean
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
                <Card.Header>{this.props.restaurantName} <Badge variant="primary" className="badge-restaurant">restaurant</Badge></Card.Header>
                <Card.Img variant="top" src={image} />

                {this.props.available ?
                    <Card.Body>
                        <Card.Title>{this.props.positionName} <Badge variant="success">table</Badge></Card.Title>
                        <Card.Text>
                            Max seats: {this.props.maxSeats}
                        </Card.Text>
                        <Nav>
                            <Nav.Item className="btn-block">
                                <Link className="btn btn-outline-primary btn-block" to={`/restaurants/${this.props.restaurantGuid}/tables/${this.props.guid}/add-reservation`}>Reserve</Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Body>
                :
                    <Card.Body>
                        <Card.Title><Badge variant="warning" className="d-flex justify-content-center">unavailable</Badge></Card.Title>
                        <Nav>
                            <Nav.Item className="btn-block">
                                <Link className="btn btn-outline-primary btn-block" to={`/restaurants/${this.props.restaurantGuid}/tables/${this.props.guid}/waiting-queue`}>Waiting queue</Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Body>
                }
                <Card.Footer>
                    <small className="text-muted">
                        <strong>Open at:</strong> {this.props.open} - <strong>Close at:</strong> {this.props.close}
                    </small>
                </Card.Footer>
            </Card>
        );
    }
}