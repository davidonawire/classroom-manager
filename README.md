# Class Manager: A Full-Stack React Application

The Class Manager application was built to demonstrate a full-featured CRUD app built with React on top of a REST API. Class Manager makes use of React Hooks for context and state management, as well as `react-router-dom` for single-page app navigation and appropriate routing through user authentication and authorization.

The app presents a list of courses available, in both index and detail views. Users can create an account, or sign into one, at which point they are able to create new courses, or update or delete courses they already own.

Course description and materials needed both accept Markdown formatting.

The signed-in user session persists through browser reloads or loading in a new tab by way of a client cookie, which is removed on sign out.

## Installation

Both the client app and the backing REST API must be installed and started.

### Class Manager API

From the project root, change to the API's folder of `api`:

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

The API runs on localhost port 5000.

### React Front-end

From the project root, change to the folder `client`:

Install the project dependencies.

```
npm install

```

Start the application.

```
npm start
```

You may now access the app in your browser at [http://localhost:3000/](http://localhost:3000/).