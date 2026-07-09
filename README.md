# TourGO — Travel Admin Dashboard

A full-stack travel management dashboard built with **Spring Boot** and **React**, featuring JWT authentication, role-based authorization, and paginated public browsing of tours.

---

## 🚀 Features

- **JWT-based authentication** — register and log in via secure, stateless tokens
- **Role-based access control** — `USER` and `ADMIN` roles with different permissions
- **Tour management (CRUD)** — create, view, update, and delete tours
- **Ownership-aware permissions** — users can only edit/delete their own tours; admins can manage all tours
- **Public tour listing with pagination** — browse tours without logging in
- **Password encryption** — passwords are hashed with Spring Security's `PasswordEncoder`, never stored in plain text

---

## 🛠 Tech Stack

**Backend**
- Java, Spring Boot
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL

**Frontend**
- React (Vite)

**Deployment**
- Backend: Render
- Frontend: Vercel
- Database: Neon (managed PostgreSQL)

---

## 📂 Project Structure

```
travel-admin-dashboard/
├── backend/                  ← Spring Boot API
│   └── src/main/java/com/TourGO/backend/
│       ├── model/             Tour, User
│       ├── dto/                RegisterRequest, LoginRequest, LoginResponse, TourDto, UserDto
│       ├── repository/       TourRepository, UserRepository
│       ├── service/           JwtService
│       ├── controller/       AuthController, TourController, UserController
│       └── config/             SecurityConfig, WebConfig
│
└── TourGO/                   ← React frontend
    ├── src/
    └── vite.config.js
```

---

## 🔌 API Endpoints

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT |

**Tours**
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/tours/public` | Paginated list of public tours | Public |
| GET | `/api/tours` | List tours (all tours for admins, own tours for users) | Authenticated |
| POST | `/api/tours` | Create a new tour | Authenticated |
| PUT | `/api/tours/{id}` | Update a tour | Owner or Admin |
| DELETE | `/api/tours/{id}` | Delete a tour | Owner or Admin |

---

## ⚙️ Setup Instructions

### Backend

1. Clone the repository
```bash
git clone https://github.com/Mohitrawal7/travel-admin-dashboard.git
cd travel-admin-dashboard/backend
```

2. Set the following environment variables (do **not** hardcode these in `application.properties`):
```bash
db_url=jdbc:postgresql://localhost:5432/tourgo
db_username=your_username
db_passsword=your_password
```

3. Run the application
```bash
./mvnw spring-boot:run
```
The API will start on `http://localhost:8080`.

### Frontend

```bash
cd travel-admin-dashboard/TourGO
npm install
npm run dev
```

---

## ✅ Production Checklist

- [ ] Move `jwt.secret` out of `application.properties` into an environment variable
- [ ] Change `spring.jpa.hibernate.ddl-auto` from `update` to `validate`
- [ ] Restrict CORS allowed origins to the deployed frontend domain
- [ ] Add rate limiting on `/api/auth/login` to reduce brute-force risk

---

## 📈 Future Improvements

- Booking/reservation flow on top of tour listings
- Image upload for tours
- Admin analytics dashboard (tours per user, activity over time)
- Automated tests for controllers and services

---

## 👨‍💻 Author

**Mohit Rawal**
- GitHub: [@Mohitrawal7](https://github.com/Mohitrawal7)
- Email: rawalmohit12@gmail.com
- LinkedIn: [mohit-rawal](https://www.linkedin.com/in/mohit-rawal-9480a52b2/)
