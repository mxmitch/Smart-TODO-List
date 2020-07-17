# Routes outline

## /

GET 
``` psuedocode
if logged in {
  redirect to /tasks
} else {
  bring up the log in modal with black todo list background
}
```

POST
```
send error
```
## /login

POST
```
if login is valid {
  put users.id into cookie
  redirect to /tasks
} else {
  send error
}
```

## /tasks

GET
```
query SQL and send back all the tasks
```

POST
```
Add task into tasks table
```

## /tasks/:id

PUT
```
See what data is updated, then update the tasks table
```

DEL
```
Set the is_available to FALSE
```
