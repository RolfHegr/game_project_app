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
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("userObj"))
  );
  const navigate = useNavigate();

  async function setLocalStorageWithUser(user) {
    try {
      const userStringified = JSON.stringify(user);
      localStorage.setItem("userObj", userStringified);
    } catch (error) {
      console.error(error);
    }
  }

  async function createNewUser(newUser) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        newUser
      );
      console.log("response from axios.POST", res);
      const { user, token } = res.data;

      const userAndToken = user;
      userAndToken.token = token;

      setActiveUser(userAndToken);
      setLocalStorageWithUser(userAndToken);
      setIsLoading(false);
      navigate("/search-games");
    } catch (error) {
      console.error("error from post to server", error);
      setErrorMsg(error.msg || error);
    }
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
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        show={signupModalShow}
        isLoading={isLoading}
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
