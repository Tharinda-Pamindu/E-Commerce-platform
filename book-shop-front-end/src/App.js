import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/navigation/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Helmet } from "react-helmet";
import ForgotPs from "./pages/ForgotPs";
import About from "./pages/About";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Help from "./pages/Help";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>එච්චරයි.LK</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/protect" element={<Home />} />
            <Route path="/protect/book" element={<Book />} />
            <Route path="/protect/category" element={<Category />} />
            <Route path="/protect/profile" element={<Profile/>}/>
            <Route path="/protect/about" element={<About />} />
            <Route path="/protect/help" element={<Help />} />
            <Route path="/cart" element={<Cart />} />
            <Route />
          </Route>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category" element={<Category />} />
            <Route path="/book" element={<Book />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
