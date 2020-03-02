import React, { Component, RefObject } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { BookingApi } from "../../services/booking/BookingApi";
import { GenericModal } from "../Modal";

type ResponseData = {
    message: string,
    status: string
};

type RestaurantStates = {
    open: string,
    close: string,
    name: string,
    businessHourData: string[],
    showModal: boolean,
    response: ResponseData
};

type RestaurantProps = {
    restaurantGuid: string
};

export class Restaurant extends Component<RestaurantProps, RestaurantStates> {
    private genericModal: RefObject<GenericModal>;

    constructor(props: any) {
        super(props);

        this.state = {
            open: '',
            close: '',
            name: '',
            businessHourData: [],
            showModal: false,
            response: {
                message: '',
                status: ''
            }
        }

        this.genericModal = React.createRef();

        this.handleDataChange = this.handleDataChange.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
    }

    public componentDidMount() {
        this.generateTimes();
    }

    private generateTimes() {
        const hours = [1,2,3,4,5,6,7,8,9,10,11];
        const convertTime = (hours: number[], a: string): string[] => {
            return hours.map((i: number) => {
                const hour = i + 0;
                if (hour.toString().length > 1) {
                    return `${hour}:00 ${a}`;
                }
    
                return `0${hour}:00 ${a}`;
            });
        };

        this.setState({ businessHourData: ['12:00', ...convertTime(hours, 'AM'), ...convertTime(hours, 'PM')] });
    }

    private handleDataChange(event: any) {
        const name = event.target.id;
        const value = event.target.value;
        const data = {
            [name]: value
        } as RestaurantStates;

        this.setState(data);
    }

    private createRestaurant(event: any) {
        const bookingApi = new BookingApi('');
        const response = {
            message: 'Restaurant registered with success',
            status: 'success'
        }

        bookingApi.createRestaurant(this.state.name, this.state.open, this.state.close).then(result => {
            result.json().then(data => {

                const allowedStatus = [200, 201];

                if (!allowedStatus.includes(result.status)) {
                    response.message = data.message;
                    response.status = data.status;
                }

                this.setState({ showModal: true, response });
            });
        }).catch(err => {
            response.status = 'Error';
            response.message = err;
            this.setState({ showModal: true, response });
        }).finally(() => {
            this.genericModal.current?.openModal();
        });

        event.preventDefault();
    }

    render() {
        const businessHours = this.state.businessHourData.map((hour: string, i: number) => <option key={i}>{hour}</option>);

        return(
            <Form onSubmit={this.createRestaurant}>
                <GenericModal ref={this.genericModal} message={this.state.response.message} status={this.state.response.status} />
                <Form.Group controlId="name">
                    <Form.Label>Restaurant name</Form.Label>
                    <Form.Control value={this.state.name} onChange={this.handleDataChange} placeholder="Restaurant name" required />
                </Form.Group>

                <Form.Group controlId="open">
                    <Form.Label>Open</Form.Label>
                    <Form.Control as="select" value={this.state.open} onChange={this.handleDataChange}  required>
                        <option></option>
                        {businessHours}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="close">
                    <Form.Label>Close</Form.Label>
                    <Form.Control as="select" value={this.state.close} onChange={this.handleDataChange} required>
                        <option></option>
                        {businessHours}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        );
    }
}
