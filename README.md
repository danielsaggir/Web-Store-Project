Project Summary: SkiDis E-commerce Platform

Overview

The SkiDis project is a full-stack e-commerce web application built with Node.js, Express.js, MongoDB (Mongoose), and EJS for templating. It provides an online store specializing in ski-related products, including ski equipment, clothes, and accessories. The project follows an MVC (Model-View-Controller) architecture, ensuring structured code organization.

Key Features

User Management
Authentication System: Users can register, log in, log out, and manage their accounts.
User Roles: The system differentiates between regular users and admins.
User Dashboard: Users can view order history, change passwords, and update account details.
Product Management
Categories: Products are organized into Ski Equipment, Clothes, and Accessories.
Search & Filters: Users can search for products and filter them by different criteria (price, category, etc.).
Single Product View: Detailed product pages allow users to view product specifications, select sizes, and add items to the cart.
Shopping Cart & Orders
Cart System: Users can add/remove products to/from the cart.
Checkout: Users can place orders and view total price calculations.
Order History: Users can track past orders and retrieve order details.
Admin & Management Features
Admin Dashboard: Accessible to managers only, allowing inventory management.
Product Upload & Editing: Admins can add, edit, and remove products.
Order Tracking & User Statistics: The manager's page displays order statistics, customer data, and branch details.
Technical Breakdown

Backend (Node.js & Express)
Controllers: Handle the business logic for different features.
accountController.js & usersController.js → User authentication & profile management.
productsController.js & SingleproductController.js → Product listing and individual product pages.
cartController.js → Shopping cart management.
ordersController.js → Order processing and order history retrieval.
managerController.js → Admin functionalities (product management, analytics, and order tracking).
Database (MongoDB with Mongoose)
users.js → Stores user information.
products.js, Accessories.js, Clothes.js, SkiProducts.js → Manage product inventory.
cartList.js → Handles shopping cart data.
orders.js → Tracks user purchases and order details.
Frontend (EJS, CSS, JavaScript)
Dynamic Pages using EJS:
home.ejs → Home page.
account.ejs → User profile and order history.
products.ejs → Product listing page.
SingleProduct.ejs → Individual product details.
manager.ejs → Admin dashboard.
CSS for Styling:
home.css, account.css, products.css, Singleproduct.css, manager.css → Provide the website’s design and layout.
Responsive design with Bootstrap for styling.
Additional Features
Session Management: Using express-session to track user logins.
Security: Authentication and authorization to restrict admin functionalities.
Search & Sorting System: Users can search and sort products dynamically.
Bootstrap & Icons Integration: Provides a modern UI with a clean and interactive experience.
Possible Enhancements

Payment Integration: Add PayPal, Stripe, or another payment gateway for real transactions.
Order Status Updates: Implement an order tracking system.
Wishlist Feature: Allow users to save products for later.
Reviews & Ratings: Enable users to leave reviews on products.
Would you like me to tweak this summary, add more details, or focus on any specific part? 🚀







