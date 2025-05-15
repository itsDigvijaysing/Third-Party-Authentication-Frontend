# Third-Party Authentication System

A multi-module project providing:

1. **Central Auth Service**: Flask backend + React dashboard for user & organization management.  
2. **Third-Party Face-Auth API**: Two-step token + face-recognition login for external apps.  
3. **Organization Samples**: “face-auth-organizations” contains example Angular (TikTok) and React (Zomato) clients.  
4. **Legacy Static**: A static HTML/JS version of the auth flows.

---

## Table of Contents

1. [Core Features](#core-features)  
2. [Technology Stack](#technology-stack)  
3. [Folder Structure](#folder-structure)  
4. [Prerequisites](#prerequisites)  
5. [Setup & Installation](#setup--installation)  
6. [Running the Application](#running-the-application)  
7. [API Endpoints](#api-endpoints)  
8. [Example Organization Clients](#example-organization-clients)  
9. [Current Status & Known Issues](#current-status--known-issues)  
10. [Future Improvements](#future-improvements)  

---

## Core Features

### 1. User Management (Flask + React Dashboard)
- **Registration**: email, password, phone + face image (face detection via `face_recognition`).  
- **Login**: standard email/password for dashboard access.  
- **Profile**: view/update user data and image.  
- **History**: view personal login history.

### 2. Organization Management
- Organizations register to obtain a `company_id` API credential.  
- Full CRUD on organization records via React UI.

### 3. Third-Party Face-Auth API (Flask)
1. **Token Request** — `POST /login-req`  
   - Input: `email`, `company_id` → issues a 4-digit token, logs it.  
2. **Face Verification** — `POST /login`  
   - Input: `email`, `token`, live face image → compares to stored image → returns user record on success.

### 4. Legacy Static Frontend
- Static HTML/JS version of registration, login, and face-auth flows (for reference / deprecation).

---

## Technology Stack

- **Backend**: Flask, Flask-PyMongo, `face_recognition`, Flask-CORS, Flask-Limiter, Flask-Mail, Python 3.7+  
- **Dashboard Frontend**: React.js, react-router-dom, axios, react-webcam, joi, Bootstrap  
- **Sample Clients** (face-auth-organizations): Angular (TikTok), React (Zomato)  
- **Static Legacy**: Vanilla HTML, CSS, JS  
- **Database**: MongoDB (local or Atlas)

---

## Folder Structure

```
Third-Party Authentication System Project/
├── face-auth-organizations/
│   ├── tiktok/              # Angular sample client
│   └── zomato/              # React sample client
├── Third-Party-Auth-Backend/ # Flask backend
│   ├── main.py
│   ├── requirements.txt
│   └── static/
│       ├── uploads/         # Registered face images
│       └── temp\_uploads/    # Live verification images
└── Third-Party-Authentication-Frontend/
├── Layout/              # draw\.io diagrams
├── third-party-auth-react/  # React dashboard
└── Third-Party-Auth-Website/ # Static legacy frontend

```

---

## Prerequisites

- **Python 3.7+**, `pip`  
- **Node.js** & **npm** (or yarn)  
- **MongoDB** running locally or via Atlas  
- System libraries for `face_recognition` (e.g. `dlib`, `cmake`)

---

## Setup & Installation

### 1. Backend (Flask)

```bash
cd Third-Party-Auth-Backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
````

* Edit `main.py` or `.env` to set:

  ```ini
  MONGO_URI=...
  SECRET_KEY=...
  MAIL_USERNAME=...
  MAIL_PASSWORD=...
  ```
* Ensure `static/uploads` and `static/temp_uploads` exist (permissions writable).

### 2. Dashboard Frontend (React)

```bash
cd ../Third-Party-Authentication-Frontend/third-party-auth-react
npm install
```

* Update any API base-URL in `src/` (e.g. to `http://localhost:5000`).

### 3. Sample Organization Clients

#### TikTok (Angular)

```bash
cd ../../face-auth-organizations/tiktok
npm install
```

#### Zomato (React)

```bash
cd ../zomato
npm install
```

---

## Running the Application

1. **Start Flask Backend**

   ```bash
   cd Third-Party-Auth-Backend
   source venv/bin/activate
   python main.py
   # or flask run
   ```
2. **Start React Dashboard**

   ```bash
   cd ../Third-Party-Authentication-Frontend/third-party-auth-react
   npm start
   ```
3. **Start Sample Clients**

   ```bash
   # TikTok
   cd ../../../face-auth-organizations/tiktok
   ng serve

   # Zomato
   cd ../zomato
   npm start
   ```

---

## API Endpoints

* **Users**
  `POST /user`, `GET /user`, `GET/PUT/DELETE /user/<id>`

* **Auth**
  `POST /login-user` (dashboard)
  `POST /login-req` → issue token
  `POST /login` → verify face + token

* **Organizations**
  `POST /company`, `GET /company`, `GET/PUT/DELETE /company/<id>`

* **History**
  `GET/DELETE /history/<user_id>`

* **Utility**
  `POST /file` → face detection on upload

---

## Example Organization Clients

* **TikTok** (`face-auth-organizations/tiktok`): Angular + login service tests.
* **Zomato** (`face-auth-organizations/zomato`): React + sample branding.

Each client demonstrates how a third-party app would call `/login-req` and `/login`.

---

## Current Status & Known Issues

* **Plain-text passwords** (must implement hashing).
* **Missing token validation** in `/login`.
* **Hard-coded file paths** in backend.
* **Flask-Mail configured but unused**.
* **Basic error handling**; needs better logging.
* **Static legacy frontend** is deprecated.

---

## Future Improvements

* Add **bcrypt**/`passlib` hashing for passwords.
* Enforce **token validation** in face verification.
* Refactor file paths to be **configurable**.
* Integrate **email delivery** for tokens.
* Enhance **error handling** & add **logging** (e.g. Sentry).
* Write **unit & integration tests**.
* Publish **API docs** (Swagger/OpenAPI).
* Improve **React dashboard UI/UX**.
* Demonstrate **real third-party integration** with sample clients.