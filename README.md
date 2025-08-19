DineRate – Restaurant Rating Dashboard
A **full-stack web app** to manage restaurants, users, and reviews with a modern dashboard UI.

## Features

* Dashboard with stats (restaurants, ratings, users, reviews)
* Add & view restaurants (filter, open/close status, price level)
* Ratings & reviews system (1–5 stars)
* Roles: **Admin**, **Owner**, **User**
* Responsive dashboard with Tailwind CSS animations

---

## 🛠Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios
* **Backend:** Node.js, Express, Prisma, SQLite/Postgres, JWT

---

## Setup

```bash
# Clone repo
git clone https://github.com/your-username/DineRate-App.git
cd DineRate-App
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed   # optional
npm run dev
```

### Frontend

bash
cd frontend
npm install
npm run dev


* Backend → `http://localhost:4000`
* Frontend → `http://localhost:5173`


Test Logins

Admin:admin@dinerate.com / Admin@123
  Owner:owner@dinerate.com / Owner@123
