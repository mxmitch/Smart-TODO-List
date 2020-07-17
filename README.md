# Contributors

[Mitch Lum](https://github.com/mxmitch), [Frederick lee](https://github.com/fgfl)

# Smart To Do List

A to do list that can auto categorize the created items into one of four categories: Watch, Eat, Read, or Buy. A date and priority can be given to each item. All the items can be edited if the autocategorization or other information is incorrect.

The user can mark an item as complete to move the item to a completed list. If the user no longer needs the item. It can be deleted.

The list can be filtered to show any one of the categories.

The app was designed with a mobile first approach.

## Project Setup

### Set Up the Database

1. Install psql and set up a user for your machine.
2. Run `psql` to enter the database
3. Run the below code to create a new user and database for the project

```sql
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE midterm OWNER labber;
```

### Set Up the Repo

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- DB_USER: `labber`
- DB_PASS: `labber`
- DB_NAME: `midterm`
- DB_UCLASSIFY_READ_KEY: sign up for a free uClassify account at https://www.uclassify.com/ and add your read key here.

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

## Notes on Usage

A log in form was not built. To login, send a GET request to the login route with the user id as a parameter.

Example: Enter the below into the browser to login. The number '1' can be replaced with another number for another user.

```
http://localhost:8080/login/1
```

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- jQuery 3.4.1 or above
- body-parser 1.19.0 or above
- ejs 2.6.2 or above

## Images

![Mobile view](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/doc/mobileView.png)

- mobile view of app

---

![Full page view](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/doc/fullPageView.png)

- full page view of app

---

![Add new task](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/doc/AddNewTask.gif)

- Adding a new task. The category was left blank, so a category is auto assigned.

---

![Completing a task](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/doc/CompleteTask.gif)

- Marking a task as complete.

---

![Filter task list](https://raw.githubusercontent.com/fgfl/Smart-TODO-List/master/doc/FilterTask.gif)

- Filtering our tasks by the categories.
