import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RemoveBootstrapDefault.css";
import "../css/App.css";
import "../css/TextStyles.css";
import { Route, Routes, useNavigate } from "react-router";
import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import DisplayGames from "./DisplayGames";
import axios from "axios";

function App() {
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("userObj"))
  );
  const navigate = useNavigate();

  function setLocalStorageWithUser(user) {
    try {
      const userStringified = JSON.stringify(user);
      localStorage.setItem("userObj", userStringified);
    } catch (error) {
      console.error(error);
    }
  }

  function createNewUser(newUser) {
    console.log("newUser Object", newUser);
    setActiveUser(newUser);
    setLocalStorageWithUser(newUser);
    navigate("/search-games");
  }

  function handleLogout() {
    setActiveUser(null);
    localStorage.clear();
    navigate("/");
  }

  async function userLogin(userObj) {
    try {
      const res = await axios.get("http://localhost:8000/login");
      const data = res.data;

      const fetchedUsername = data[0];
      const fetchedPassword = data[1];
      if (
        fetchedUsername === userObj.email &&
        fetchedPassword === userObj.password
      ) {
        setLocalStorageWithUser(userObj);
        setActiveUser(userObj);
        navigate("/search-games");
      } else {
        alert("Password and username not right  ");
        console.error("PW and USERNAME dont matach");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <NavigationBar
        handleLogout={handleLogout}
        activeUser={activeUser}
        showSignupModal={() => setSignupModalShow(true)}
        showLoginModal={() => setLoginModal(true)}
      />
      <SignupModal
        createNewUser={createNewUser}
        show={signupModalShow}
        onHide={() => setSignupModalShow(false)}
      />
      <LoginModal
        userLogin={userLogin}
        show={loginModal}
        onHide={() => setLoginModal(false)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              showLoginModal={() => setLoginModal(true)}
              showSignupModal={() => setSignupModalShow(true)}
              activeUser={activeUser}
            />
          }
        />
        <Route
          path="/search-games"
          element={
            // <ProtectedRoute>
            <DisplayGames />
            // </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
