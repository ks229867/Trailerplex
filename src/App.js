import {Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movie from "./pages/Movie";
import Home from "./pages/Home";
import SearchedMovie from "./pages/SearchedMovie";
import TV from "./pages/TV";
import CategoryList from "./pages/CategoryList";
import Trailer from "./pages/Trailer";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./pages/Account/SignUp";
import Login from "./pages/Account/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
       <div className="App">
       <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<ProtectedRoute><Movie /></ProtectedRoute>} />
          <Route path="/search/:name" element={<SearchedMovie />} />
          <Route path="/tv/:id" element = {<ProtectedRoute><TV /></ProtectedRoute>} />
          <Route path="/category/:type" element={<ProtectedRoute><CategoryList  /></ProtectedRoute>} />
          <Route path="/trailer/:info" element={<Trailer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
       </AuthContextProvider>
    </div>
   
  );
}

export default App;
