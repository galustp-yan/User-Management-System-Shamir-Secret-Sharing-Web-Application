# User Management System & Shamir Secret Sharing Web Application

This repository contains two projects: a User Management System and a Shamir Secret Sharing Web Application.

## User Management System with MongoDB

This Node.js application provides a user management system with MongoDB as the database. It allows users to sign in, create new accounts, manage user information, and perform various administrative tasks.

### Features

- User authentication and authorization
- Creation of new user accounts
- User information retrieval and modification
- Admin panel for managing user accounts, permissions, and secret keys
- Integration with MongoDB for data storage

### Technologies Used

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript) for templating
- Body-parser middleware for parsing request bodies
- Cookie-parser middleware for handling cookies

### Installation

1. Clone this repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Set up a MongoDB database and adjust the connection settings in `server.js` if necessary.
5. Start the server by running `node server.js` or `npm start`.
6. Access the application in your web browser at `http://localhost:3000`.

### Usage

1. Visit the sign-in page to log in with an existing account or create a new one.
2. Once logged in, users can access their user cabinet to manage their account information.
3. Admin users can access the admin panel to manage user accounts, permissions, and secret keys.
4. Super admin users have additional privileges, such as granting super admin status to other users.

### Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Shamir Secret Online with Authorization

This project is a web application for Shamir Secret Sharing, allowing users to securely split a secret into multiple parts and distribute them among trusted individuals.

### Features

- **Shamir Secret Sharing**: Implement Shamir's Secret Sharing algorithm to securely split a secret into multiple parts.
- **Access Control**: Control access to the secret sharing functionality based on user roles and permissions.
- **Intuitive Interface**: Provide a user-friendly interface for seamless interaction with the application.
- **Custom Styling**: Use modern design principles and styling techniques to create a visually appealing interface.

### Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - Frontend Framework (JQuery)
  - Styling Framework (e.g., Bootstrap)

- **Backend**:
  - Programming Language (e.g., Node.js)
  - Web Framework (e.g., Express.js)
  - Database (e.g., MongoDB)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shamir-secret-online.git
