# NodeJS Service with SocketIO for HRMIS

## Set Environment vars

```
PORT=3000
SERVICE_HEADER=SERVICE_HEADER_12312313
JWT_SECRET=APP_JWT_SECRET
```

App JWT Secret should be the same on the HRMIS Backend JWT_SECRET

Service Header should be set on Backend as well, we have a private secret key for deployment so you can generate your own