# LeadDesk Mini

LeadDesk Mini is a full-stack lead-capture and management application built as a complete frontend and backend project.

The application provides a public-facing landing page where visitors can submit their project details and an authenticated admin dashboard where administrators can view, manage, update, and delete submitted leads.

---

## Features

### Public Side

* Responsive landing page
* Lead capture form
* Collects:

  * Name
  * Email
  * Budget range
  * Message
* Client-side form validation
* Server-side validation
* Lead data stored in MongoDB
* Public users can submit leads without authentication

### Admin Side

* Admin login system
* JWT-based authentication
* HTTP-only authentication cookie
* Protected admin APIs
* View all submitted leads
* Lead summary statistics
* Search leads by name or email
* Filter leads by status
* Update lead status
* Delete leads
* Admin logout

### Lead Statuses

Leads can have one of the following statuses:

* New
* Contacted
* Qualified
* Closed

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* CORS

### Development Tools

* VS Code
* Git
* GitHub
* Postman

---

## Project Structure

```text
LeadDesk-Mini/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── Lead.js
│   │   └── Admin.js
│   │
│   ├── routes/
│   │   ├── leadRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── controllers/
│   │   ├── leadController.js
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Application Flow

### Public Lead Submission

```text
Visitor
   │
   ▼
Landing Page
   │
   ▼
Lead Form
   │
   ▼
Client-side Validation
   │
   ▼
POST /api/leads
   │
   ▼
Express Server
   │
   ▼
Server-side Validation
   │
   ▼
Lead Controller
   │
   ▼
MongoDB
```

### Admin Authentication

```text
Admin
   │
   ▼
Login Page
   │
   ▼
POST /api/auth/login
   │
   ▼
Admin Credentials Verified
   │
   ▼
JWT Generated
   │
   ▼
HTTP-only Cookie
```

### Admin Lead Management

```text
Admin Dashboard
      │
      ▼
GET /api/leads
      │
      ▼
Authentication Middleware
      │
      ▼
JWT Verification
      │
      ▼
Lead Controller
      │
      ▼
MongoDB
```

---

## API Endpoints

### Lead Routes

| Method | Endpoint         | Authentication | Description        |
| ------ | ---------------- | -------------- | ------------------ |
| POST   | `/api/leads`     | Public         | Submit a new lead  |
| GET    | `/api/leads`     | Admin          | Get all leads      |
| PATCH  | `/api/leads/:id` | Admin          | Update lead status |
| DELETE | `/api/leads/:id` | Admin          | Delete a lead      |

### Authentication Routes

| Method | Endpoint           | Authentication | Description                     |
| ------ | ------------------ | -------------- | ------------------------------- |
| POST   | `/api/auth/login`  | Public         | Admin login                     |
| POST   | `/api/auth/logout` | Admin          | Admin logout                    |
| GET    | `/api/auth/me`     | Admin          | Get current authenticated admin |

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

CLIENT_URL=http://localhost:5173
```

Replace the values with your own configuration.

Do not commit your `.env` file to GitHub.

Your `.gitignore` should include:

```text
node_modules
.env
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd LeadDesk-Mini
```

---

### 2. Setup Backend

Open a terminal:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## Admin Account

Create an admin account using the project's admin creation script.

Example:

```bash
node createAdmin.js
```

Use the credentials created during the setup to access:

```text
http://localhost:5173/login
```

The admin can then access the dashboard and manage submitted leads.

---

## Admin Dashboard

The admin dashboard provides:

### Lead Summary

* Total leads
* New leads
* Contacted leads
* Qualified leads
* Closed leads

### Lead Search

Search leads using:

* Name
* Email

### Lead Filtering

Filter leads by:

* All statuses
* New
* Contacted
* Qualified
* Closed

### Lead Management

Administrators can:

* View submitted lead details
* Change lead status
* Delete leads

---

## Authentication and Security

The application uses JWT-based authentication.

After successful admin login:

1. Admin credentials are verified.
2. A JWT is generated.
3. The JWT is stored in an HTTP-only cookie.
4. Protected API requests include the authentication cookie.
5. The authentication middleware verifies the JWT.
6. Unauthorized requests receive a `401 Unauthorized` response.

Public users do not need to authenticate to submit a lead.

Admin-only operations are protected by authentication middleware.

---

## Data Model

### Lead

A lead contains:

```text
name
email
budget
message
status
createdAt
updatedAt
```

The default lead status is:

```text
New
```

### Admin

An admin account contains authentication-related information such as:

```text
email
password
```

Passwords are securely hashed before being stored.

---

## Validation

The lead form validates required fields on both sides of the application.

### Client-side

The frontend checks that:

* Name is provided
* Email is provided
* Email format is valid
* Budget is selected
* Message is provided

### Server-side

The backend validates incoming lead data before saving it to MongoDB.

This ensures that invalid requests cannot bypass frontend validation by directly calling the API.

---

## Error Handling

The application handles common errors including:

* Invalid form input
* Invalid email addresses
* Failed database operations
* Invalid admin credentials
* Unauthorized admin requests
* Failed lead updates
* Failed lead deletion
* Network and API errors

---

## Running the Full Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Then open:

```text
http://localhost:5173
```

The public landing page allows visitors to submit leads.

The admin dashboard can be accessed through:

```text
http://localhost:5173/login
```

---

## Future Improvements

Possible future improvements include:

* Pagination for large numbers of leads
* Lead sorting
* Export leads to CSV
* Admin profile management
* Multiple admin roles
* Email notifications for new leads
* Dashboard analytics
* Lead activity history
* Deployment with production environment variables

---

## Author

Built as a full-stack development project demonstrating:

* Frontend development
* Backend API development
* REST API design
* Database integration
* Authentication
* Authorization
* Form validation
* CRUD operations
* Responsive UI development

---

## License

This project is created for educational and assignment purposes.
