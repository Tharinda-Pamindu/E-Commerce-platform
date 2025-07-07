
# Book Shop 📚

Welcome to the Book Shop, a full-stack e-commerce platform designed for buying and selling books. This project features a React-based front-end and a Spring Boot back-end, providing a robust and scalable solution for online book retail.

-----

## 📖 About The Project

A Bookstore for All එච්චරයි.LK is a bookstore located in Ratnapura, Sri Lanka. It was founded in 2023 by two passionate book lovers, who wanted to create a space where people of all ages could come together to enjoy the written word. The name එච්චරයි.LK is a Sinhala word that means "not much." The owners chose this name because they believe that everyone should have access to books, regardless of their budget. They stock a wide variety of books, from new releases to classics, at affordable prices.

-----

## ✨ Features

  * **User Authentication**: Secure user registration and login functionality
  * **Book Management**: Admins and sellers can add, edit, and delete books from the inventory.
  * **Category Management**: Organize books into different categories, which can be managed by admins.
  * **Shopping Cart**: Users can add and remove books from their shopping cart.
  * **Order Management**: Users can place orders and view their order history. Admins can manage all orders.
  * **User Profiles**: Users can view and edit their profile information.

-----

## 🛠️ Technologies Used

### Back-End

  * **Java**: The primary programming language for the back-end.
  * **Spring Boot**: Framework for creating stand-alone, production-grade Spring-based applications.
  * **Spring Security**: For authentication and access control.
  * **Spring Data JPA**: For data persistence with a relational database.
  * **MySQL**: The relational database used for storing data.
  * **Maven**: For dependency management and building the project.
  * **JWT (JSON Web Tokens)**: For securing the API.

### Front-End

  * **React**: A JavaScript library for building user interfaces.
  * **React Bootstrap**: For UI components.
  * **Axios**: For making HTTP requests from the browser.
  * **React Router**: For declarative routing in the React application.

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * **Java Development Kit (JDK)**: Version 17 or higher.
  * **Maven**: For building the back-end project.
  * **Node.js and npm**: For running the front-end project.
  * **MySQL**: A running instance of the MySQL database.

### Installation

#### Back-End

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/tharinda-pamindu/e-commerce-platform.git
    ```
2.  **Navigate to the back-end directory**:
    ```sh
    cd e-commerce-platform/book-shop-back-end
    ```
3.  **Configure the database**:
    Open `src/main/resources/application.properties` and update the database connection details:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/final_project
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
4.  **Run the application**:
    ```sh
    mvn spring-boot:run
    ```

#### Front-End

1.  **Navigate to the front-end directory**:
    ```sh
    cd ../book-shop-front-end
    ```
2.  **Install NPM packages**:
    ```sh
    npm install
    ```
3.  **Start the development server**:
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

-----

## 🔌 API Endpoints

The back-end provides a RESTful API for interacting with the application. Here are some of the main endpoints:

  * **Authentication**:
      * `POST /auth/register`: Register a new user.
      * `POST /auth/login`: Authenticate a user and get a JWT token.
  * **Books**:
      * `GET /auth/book`: Get a list of all books.
      * `GET /book/{bookID}`: Get a single book by its ID.
      * `POST /book`: Add a new book.
  * **Categories**:
      * `GET /auth/category`: Get all book categories.
      * `POST /category`: Add a new category.
  * **Orders**:
      * `GET /order`: Get all orders (for admins).
      * `POST /order`: Place a new order.
      * `GET /order/{userID}/orders`: Get all orders for a specific user.

For a complete list of endpoints and their details, you can refer to the Postman collection included in the project.

-----

## 🗂️ Project Structure

The project is organized into two main directories: `book-shop-back-end` and `book-shop-front-end`.

  * **`book-shop-back-end`**: Contains the Spring Boot application, including controllers, services, repositories, and entities.
  * **`book-shop-front-end`**: Contains the React application, with components, pages, services, and utilities.

Enjoy exploring and using the Book Shop\! 🛒

https://drive.google.com/drive/folders/1aiFvnBvZ5wtfQyXB4pYKOr9S4F2Cp2x4?usp=sharing
