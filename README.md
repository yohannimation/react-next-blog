# Blog App

This project is a simple blog developed with React.js for the frontend and Next.js for the backend. It includes:

- User authentication with JWT
- Management of public and private posts
- Dynamic creation and display of user-related posts
- Post search by title

The project is designed to run in production mode with Docker, but it can also be launched locally without containerization.

## 🚀 Demo

See my [portfolio yohannimation](https://blog-app.yohannimation.fr/).

---

## 🧰 Tech Stack

- ⚙️ Front-end – React.js, Vite, TypeScript, React Router Dom, Fromix & Yup, Sass
- ⚡ Back-end – Next.js, JWT, Bcrypt
- 🧠 Containerization – Docker & Docker Compose for deployment
- 🟦 TypeScript – Type safety
- 🎨 Sass – Styling

---

## 🎯 Project Goal

The goal of this project was to learn how to use React.js and Next.js.<br/>
I decided to create a Blog App.

This project is for educational purposes.

---

## 📦 Installation

```sh
# Clone the repository
git clone https://github.com/yohannimation/react-next-blog

cd react-next-blog

# Next.js
cd next.js
npm install
npm run dev

# React.js
cd react.js
npm install
npm run dev
```

### Set the environment variables :

- Next.js : `JWT_SECRET`
- React.js : `VITE_BACK_URL` (http://localhost:3000 for local)

### URLs

- Front-end : http://localhost:5173
- Back-end : http://localhost:3000

---

## 🧭 Planned Features

- Migrate all files into a single folder (move React.js into Next.js)
- 📱 Improve accessibility
- 📋 Add full CRUD functionality

---

## 🙋‍♂️ Author

Created by **Yohann RENAULD**

[Github](https://github.com/yohannimation) - [Portfolio yohannimation](https://yohannimation.fr)