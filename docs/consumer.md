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

**Endpoint:** `GET /api/health/check`

**Description:** Retrieves health of the application

**Request:**

```
GET /api/health/check
```

**Response:**

```json
{
    "success": true,
    "request_timestamp": "2025-01-18T18:35:27.915Z",
    "response_timestamp": "2025-01-18T18:35:27.924Z",
    "processing_time": "9ms",
    "data": {
        "uptime": 36.235476833,
        "message": "OK",
        "timestamp": 1737225327924
    },
    "message": "Health check passed successfully!!!!"
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. Common status codes include:

- `200 OK`: The request was successful.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.


## Conclusion

This documentation provides a comprehensive guide to consuming the API. For further assistance, please refer to the official API documentation or contact support.
