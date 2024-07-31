import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import AdminHome from "./modules/admin/AdminHome";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import UserHome from "./modules/user/UserHome";
import { createContext, useEffect, useState } from "react";
import ForgotPassword from "./modules/common/ForgotPassword";


export const UserContext = createContext();

function App() {
  const userLoggedIn = !!localStorage.getItem("user");
  const [userData, setUserData] = useState();

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user.user !== undefined) {
        setUserData(user.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/userhome" element={<UserHome />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">© 2023 Copyright: Book Table</div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
