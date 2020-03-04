export class BookingApi {
    private url: string;

    constructor() {
        this.url = process.env.API_URL || 'http://localhost:3002';
    }

    public async listRestaurants() {
        return await fetch(`${this.url}/v1/restaurants`);
    }

    public async listTables(restaurantsGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantsGuid}/tables`);
    }

    public async getTable(restaurantsGuid: string, tableGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantsGuid}/tables/${tableGuid}`);
    }

    public async listReservations(restaurantsGuid: string, tablesGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantsGuid}/tables/${tablesGuid}/reservations`);
    }

    public async getReservation(restaurantsGuid: string, tablesGuid: string, reservationGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantsGuid}/tables/${tablesGuid}/reservations/${reservationGuid}`);
    }

    public async createRestaurant(name: string, open: string, close: string) {
        return await fetch(`${this.url}/v1/restaurants/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                opensAt: open,
                closesAt: close
            })
        });
    }

    public async createReservation(when: string, user: string, seats: number, restaurantGuid: string, tableGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables/${tableGuid}/reservations`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                when,
                seats,
                user
            })
        });
    }

    public async updateReservation(when: string, user: string, seats: number, restaurantGuid: string, tableGuid: string, reservationGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables/${tableGuid}/reservations/${reservationGuid}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                when,
                seats,
                user
            })
        });
    }

    public async addRestaurantWaitingQueue(when: string, user: string, seats: number, restaurantGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/waiting-queues`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                when,
                seats,
                user
            })
        });
    }

    public async addTableWaitingQueue(when: string, user: string, seats: number, restaurantGuid: string, tableGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables/${tableGuid}/waiting-queues`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                when,
                seats,
                user
            })
        });
    }

    public async cancelReservation(restaurantGuid: string, tableGuid: string, reservationGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables/${tableGuid}/reservations/${reservationGuid}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    public async addTable(positionName: string, maxSeats: number, restaurantGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                positionName,
                maxSeats
            })
        });
    }

    public async updateTable(positionName: string, maxSeats: number, restaurantGuid: string, tableGuid: string) {
        return await fetch(`${this.url}/v1/restaurants/${restaurantGuid}/tables/${tableGuid}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                positionName,
                maxSeats
            })
        });
    }
}