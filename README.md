# Wishbook

Create your waitlist of books and check it wherever you go

# Functionality of the application

This application will allow creating/removing/fetching Books items. Each Book item has an attachment image.
User can search for new book with Open Book API and save them 
Each user only has access to Book items that he/she has created/added from Open Book API.

# TODO items

The application should store Book items, and each Book item contains the following fields:

* `bookId` (string) - a unique id for an item
* `userId` (string) - id of the user
* `createdAt` (string) - date and time when an item was created
* `title` (string) - name of a book item (e.g. "Harry Potter")
* `subTitle` (string) - (e.g. "Goblet of Fire")
* `description` (boolean) - short description of the book
* `coverImgUrl` (string) (optional) - a URL pointing to an image attached to a Book item

Book object returns data that looks like this:

```json

{
    "bookId": "123",
    "userId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "title": "Harry Potter",
    "subTitle": "Goblet of Fire",
    "description": "a long description",
    "coverImgUrl": "http://example.com/image.png"
}

```

# Frontend

The `client` folder contains a web application that use the API of the project.

config file `config.js`:

```js
const apiId = 'ufrfpcmqlk';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

export const authConfig = {
    domain: 'guetteluis.auth0.com',            // Auth0 domain
    clientId: '6JmwmnbwB0xzD3HVf2gWTW57P8YLAQWC',          // Auth0 client id
};
```

## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.js` file in the `client` folder.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/config.js` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run serve
```

This should start a development server with the VueJS application that will interact with the serverless Book application.