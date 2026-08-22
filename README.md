# CS 465 Full Stack Development

## Travlr Getaways

This repository contains my completed full stack web application for Travlr Getaways. The project includes a customer-facing website, a MongoDB database, RESTful API endpoints, an Angular single-page application (SPA) for administrators, and authentication features used to protect administrative functions.

## Architecture

Throughout this project, I worked with several types of frontend development, including Express HTML, JavaScript, and an Angular single-page application. The Express application was used for the customer-facing portion of the Travlr Getaways website. It generates and displays information to customers using server-side routing and templates. JavaScript was used throughout the project to control application logic, communicate with the API, and connect the different parts of the application.

The Angular SPA was developed for the administrative side of the application. Unlike the traditional customer-facing website, the SPA can update information without requiring the entire webpage to reload each time the administrator performs an action. Angular also allowed the application to be divided into reusable components, such as trip listings, trip cards, navigation, login, and forms.

The backend uses a NoSQL MongoDB database because the trip information can be stored as flexible document-based data. MongoDB works well with JavaScript applications because its documents closely resemble JSON objects. Using MongoDB also made it possible to retrieve and update trip information through the application's API.

## Functionality

JSON and JavaScript are related, but they serve different purposes. JavaScript is a programming language that contains logic and instructions that an application can execute. JSON is a data format used to organize and exchange information. In the Travlr Getaways application, JSON helps connect the frontend and backend because the API can return trip information from the database as JSON, which can then be used by the customer-facing website or Angular SPA.

Several parts of the application were refactored as the project developed. One example was changing the customer-facing travel page so that it retrieved trip information through the API instead of relying on locally stored data. The Angular administrative application also used reusable components and services to avoid repeating the same code. Reusable UI components make an application easier to maintain because developers can update one component and reuse it in multiple areas. They also help keep the appearance and behavior of the application consistent.

## Testing

Testing was an important part of developing the full stack application. API endpoints provide specific locations where the frontend can communicate with the backend. Different HTTP methods are used depending on the requested action. For example, GET can retrieve trip information, POST can create information, and PUT can update existing information.

I tested API endpoints to make sure requests returned the expected data and HTTP responses. Testing became more complicated after authentication was added because protected requests also needed a valid authorization token. The administrative application uses authentication so that users must log in before performing protected actions. This demonstrated why both functionality and security need to be tested. An endpoint may work correctly with an authorized user while properly rejecting a request that does not contain valid authentication.

## Reflection

This course helped me better understand how the different parts of a full stack application work together. Before completing this project, many of these technologies seemed like separate pieces. Building Travlr Getaways helped me understand how the frontend, API, server, database, and authentication system communicate with each other to create one working application.

Throughout the course, I gained experience with JavaScript, Express, Node.js, MongoDB, RESTful APIs, Angular, reusable components, authentication, and testing API requests. I also gained more experience troubleshooting errors and working through problems when different parts of an application did not communicate correctly.

These skills will help me become a more marketable candidate because I now have experience developing and testing a complete full stack application rather than only individual pieces of one. I also have a completed project that demonstrates my ability to work with frontend and backend technologies, databases, APIs, and application security. This project has given me a stronger understanding of the full software development process and skills that I can continue developing as I move forward in my career.

