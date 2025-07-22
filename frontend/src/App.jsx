import React from "react";
import LoginForm from "./pages/Auth/Login.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}></Route>
          <Route path="/login" exact element={<LoginForm/>}></Route>
          <Route path="/dashboard" exact element={<Home/>}></Route>
          <Route path="/income" exact element={<Income/>}></Route>
          <Route path="/expense" exact element={<Expense/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
export function Root() {
  //checking if user is authenticated
  //if authenticated redirect to dashboard else redirect to login page
  const isAuthenticated = !!localStorage.getItem("token");
  if(isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}
export default App