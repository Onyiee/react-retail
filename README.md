# React Retail

A responsive e-commerce application built with React as the capstone project for Udacity's Intermediate React course. The application allows users to browse products, view product details, manage a shopping cart, log in through a simulated authentication flow, and place orders.

## Features

- **Product catalogue:** Browse products with their images, prices, categories, and descriptions.
- **Product details:** View individual product information and add products to the cart.
- **Shopping cart:** Add items, update quantities, remove items, and view the order total.
- **Authentication:** Use a simulated login flow with protected checkout access and redirect handling.
- **Checkout:** Review cart items, enter customer information, and submit orders.
- **Order confirmation:** View the order number and total after a successful order.
- **Loading and error states:** Receive feedback when product requests or order submissions are in progress or fail.
- **Responsive interface:** Navigate the application across desktop and mobile screen sizes.
- **Automated tests:** Test cart logic and key product, login, cart, and checkout interactions.

## Tech Stack

- React
- React Router
- React Query (@tanstack/react-query)
- React Context and `useReducer`
- Tailwind CSS
- Vite
- Vitest
- React Testing Library
- Express (provided mock API)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/Onyiee/react-retail
cd react-retail
npm install
```

### Run the application

Start the mock API in one terminal:

```bash
npm run dev:api
```

Start the React application in a second terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

The mock API runs at `http://localhost:5174`.

## Available API Endpoints

The provided mock API supports the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Retrieve the product catalogue |
| GET | `/api/products/:id` | Retrieve an individual product |
| POST | `/api/orders` | Submit an order |

Orders are stored in memory by the mock API and are not persisted between server restarts.

## Testing

Run the automated test suite with:

```bash
npm test -- --run
```

The tests cover cart state management, product fetching and display, product details, login behaviour, and checkout success and error handling.

## Production Build

Create a production build with:

```bash
npm run build
```

Vite generates the production assets in the `dist` directory.

## Project Limitations

- Authentication is simulated on the client side. The application does not authenticate users against a real authentication service.
- The mock API stores orders in memory rather than a persistent database.
- The application is currently intended to run locally and has not yet been deployed.

## Future Improvements

Potential enhancements include deploying the application, adding persistent cart storage, and integrating a real authentication service and persistent backend.

## Author
Elizabeth Onyemowo Agbo

Built as part of the Intermediate React course capstone project.
