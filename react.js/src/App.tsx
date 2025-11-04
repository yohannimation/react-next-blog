import { Routes, Route } from "react-router-dom";

import './App.scss'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account";
import UnknownPage from "./pages/UnknownPage";

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
