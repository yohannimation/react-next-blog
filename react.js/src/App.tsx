import { Routes, Route } from "react-router-dom";

import './App.css'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import SearchResult from "./pages/SearchResult";
import UnknownPage from "./pages/UnknownPage";
import PostForm from './components/PostForm/PostForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/search/:search" element={<SearchResult />} />
        <Route path="*" element={<UnknownPage />} />
      </Routes>
      <PostForm />
    </>
  )
}

export default App
