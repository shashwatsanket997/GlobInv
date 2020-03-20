# GlobInv | A Product Management System
GlobInv is REST API driven Product Management System developed in NodeJs. Used to manage different categories of products, filtering,
stock-tracking and billings.

This repo also implements a genralized `Model Class` with crud operations, pagination and JSON patch via JSON path pointer. Along with 
`attribute inhertance` a key to support different types of products in the system. The system uses `Token based authentication`, `API-Caching`
and express-validator for request-body validation. The Code Structure strictly follows ``Model-Routes-Controllers`` structure.

## Quick Start

  1. Clone the repository.
  2. cd into the folder with the project files.
  3. ```run npm install ``` command. It will  install the required packages locally. 
  4. Once installation completed. 
  5. run ```node app.js``` to start the project.

## What's Included
The structure of the code strictly follows ``Model-Routes-Controllers``. Here in this project 
+ The ``models`` contains pseudo database entries.
+ The ``routes`` contains all the availble endpoints and serves as mapping of url with its associated controller.
+ The ``controllers`` are mainly responsible for input validation and calling respective operation.

Apart from this, the project has ``validators``, ``const``, ``utils`` and ``public``.
+ ``validators`` contains all the validation logic and constraints which acts as middlewares.
+ ``const`` contains all the ``constants``,``Enum`` for this project as well as ``publicUrls`` the routes that does not seek authentication.
+ ``utils`` contains ``Generic Errors``, ``Generic Responses``, `Token` generator and validator and ``Image Uploader``.
+ ``public`` contains all the static files.

## TO Do
+ Invoices CRUD operation.
+ Query based filtering.
+ Resource/{id}/subResource: API





