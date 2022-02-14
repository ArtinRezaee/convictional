# Convictional_Challenge

This application exposes a series of APIs as outlined in `contract.yml`.

## Running the Application

To run this application, first make sure you have docker desktop, then run `docker-compose up -d`. Once completed, you should be able to see the `backend` container under the `convictional_challenge` working directory on docker desktop. Visit the following urls on your browser to see the API respinse or use applications like [postman](https://www.postman.com/) to call the endpoints.

- [Get all products](localhost:4001/products)
- [Get a single product](localhost:4001/products/1000000001)
- [Supply an invalid product id](localhost:4001/products/1000000001)
- [Search for a product that doesn't exist](localhost:4001/products/500)
- [Get inventory](localhost:4001/store/inventory)

## Tech Stack Used

- Node.js
- Express
- Typescript

## Assumptions

I made a few assumptions while creating the endpoints. These assumptions were:

- The application needs to be extended in the future to handle multiple product sources. Hence, an abstract class was created that would allow us to extend it and normalize the product data for each integration
- The [integration endpoint](https://my-json-server.typicode.com/convictional/engineering-interview-api/products) provides no information about product/variant quantity. As the result, all attributes related to quantity and it's availability are set to `0` and `false` respectively.
- This application assumes that the data provided by the [integration endpoint](https://my-json-server.typicode.com/convictional/engineering-interview-api/products) are related to a particular store and uses that information to return the inventory infromation

## Future

With more time, I would have:

- Added automated tests
- Created a frontend for the application
