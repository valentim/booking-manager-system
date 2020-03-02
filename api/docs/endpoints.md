## Endpoints

### Add restaurants
POST - /restaurants

#### Request
```
{
    name: "STRING" | "Nice pan",
    opensAt: "DATE" | "03:00PM"
    closesAt: "DATE" | "11:00PM"
}
```

#### Response 201
```
{
    status: "STRING" | "success",
    data: {
        guid: "GUID" | "",
        name: "STRING" | "Nice pan"
    }
}
```

#### Response 400
```
{
    status: "STRING" | "error",
    message: "There is an exceptional error. Please, contact the administrator and inform the code: 123456"
}
```

### Add tables registration
POST - /restaurants/{restaurant_guid}/tables

#### Request
```
{
    positionName: "STRING" | "Center",
    maxSeats: "INTEGER" | 5
}
```

#### Response 201
```
{
    status: "STRING" | "success",
    data: {
        guid: "GUID" | "",
        positionName: "STRING" | "Facade 1"
    }
}
```

#### Response 409
```
{
    status: "STRING" | "error",
    message: "This table already exists"
}
```

#### Response 404
```
{
    status: "STRING" | "error",
    message: "The restaurant does not exist"
}
```

#### Response 400
```
{
    status: "STRING" | "error",
    message: "There is an exceptional error. Please, contact the administrator and inform the code: 123456"
}
```

### Show the tables
GET - /restaurants/{restaurant_guid}/tables

#### Response 200

```
{
    status: "success",
    data: [
        {
            name: "Center",
            maxSeats: 5,
            guid: "GUID" | ""
        },
        {
            name: "Facade",
            maxSeats: 5,
            guid: "GUID" | ""
        }
    ]
}
```

### Make a reservation
POST - /restaurants/{restaurant_guid}/tables/{table_guid}/reservations

#### Request
```
{
    user: "GUID" | "",
    when: "DATETIME" | "2020-03-10 10:00:00"
}
```

#### Response 201
```
{
    status: "STRING" | "success",
    reservation_code: "GUID" | ""
}
```

#### Response 404
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table does not exist"
}
```

#### Response 400
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table already booked"
}
```

#### Response 412
```
{
    status: "STRING" | "error",
    message: "STRING" | "The restaurant is closed in this hour"
}
```

### Edit a table reservation
PUT - /restaurants/{restaurant_guid}/tables/reservations/{reservation_guid}

### Request
```
{
    when: "DATETIME" | "2020-03-04 12:20",
    user: "GUID" | ""
}
```

### Response 200
```
{
    status: "STRING" | "success",
    reservationCode: "GUID" | ""
}
```

#### Response 404
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table does not exist"
}
```

#### Response 400
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table already booked"
}
```

#### Response 412
```
{
    status: "STRING" | "error",
    message: "STRING" | "The restaurant is closed for this hour"
}
```

### Cancel a table reservation
DELETE - /restaurants/{restaurant_guid}/tables/{table_guid}/reservations/{reservation_guid}


#### Response 200
```
{
    status: "STRING" | "success"
}
```

#### Response 404
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table does not exist"
}
```

#### Response 400
```
{
    status: "STRING" | "error",
    message: "STRING" | "Table does not cancelled. Please, contact the administrator and inform the code: 123456"
}
```

### Show reservations
GET - /restaurants/{restaurant_guid}/tables/{tableGuid}/reservations

#### Response 200
```
{
    data: [
        {
            reservationCode: "GUID" | "",
            tableGuid: "GUID" | "",
            user: "GUID" | "",
            when: "Date" | "2020-01-01 11:00:00"
        },
        {
            reservationCode: "GUID" | "",
            tableGuid: "GUID" | "",
            user: "GUID" | "",
            when: "Date" | "2020-01-01 10:00:00"
        }
    ]
}
```