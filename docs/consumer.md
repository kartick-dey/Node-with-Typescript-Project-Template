# Consumer Documentation

## Overview

This document provides information on how to consume the API provided by the Node-With-Typescript-Project-Template. It includes details on authentication, available endpoints, request/response formats, and examples.

## Authentication

To access the API, you need to authenticate using an API key. Include the API key in the `Authorization` header of your requests.

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### 1. Get All Items

**Endpoint:** `GET /api/items`

**Description:** Retrieves a list of all items.

**Request:**

```
GET /api/items
```

**Response:**

```json
[
    {
        "id": 1,
        "name": "Item 1",
        "description": "Description of Item 1"
    },
    {
        "id": 2,
        "name": "Item 2",
        "description": "Description of Item 2"
    }
]
```

### 2. Get Item by ID

**Endpoint:** `GET /api/items/:id`

**Description:** Retrieves a specific item by its ID.

**Request:**

```
GET /api/items/1
```

**Response:**

```json
{
    "id": 1,
    "name": "Item 1",
    "description": "Description of Item 1"
}
```

### 3. Create Item

**Endpoint:** `POST /api/items`

**Description:** Creates a new item.

**Request:**

```json
{
    "name": "New Item",
    "description": "Description of the new item"
}
```

**Response:**

```json
{
    "id": 3,
    "name": "New Item",
    "description": "Description of the new item"
}
```

### 4. Update Item

**Endpoint:** `PUT /api/items/:id`

**Description:** Updates an existing item by its ID.

**Request:**

```json
{
    "name": "Updated Item",
    "description": "Updated description of the item"
}
```

**Response:**

```json
{
    "id": 1,
    "name": "Updated Item",
    "description": "Updated description of the item"
}
```

### 5. Delete Item

**Endpoint:** `DELETE /api/items/:id`

**Description:** Deletes an item by its ID.

**Request:**

```
DELETE /api/items/1
```

**Response:**

```json
{
    "message": "Item deleted successfully"
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. Common status codes include:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: Authentication is required and has failed or has not yet been provided.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Examples

### cURL

#### Get All Items

```sh
curl -X GET "https://api.example.com/api/items" -H "Authorization: Bearer YOUR_API_KEY"
```

#### Create Item

```sh
curl -X POST "https://api.example.com/api/items" -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"name": "New Item", "description": "Description of the new item"}'
```

### JavaScript (Fetch)

#### Get All Items

```javascript
fetch('https://api.example.com/api/items', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
    .then(response => response.json())
    .then(data => console.log(data));
```

#### Create Item

```javascript
fetch('https://api.example.com/api/items', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'New Item',
        description: 'Description of the new item'
    })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

## Conclusion

This documentation provides a comprehensive guide to consuming the API. For further assistance, please refer to the official API documentation or contact support.
