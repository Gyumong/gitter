import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../fbserver";
function App() {
  const [LoggedIn, setLoggedIn] = useState(true);
  const [loading, setloading] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
      }
      setloading(true);
    });
  }, []);
  return (
    <>
      {loading ? (
        <AppRouter LoggedIn={LoggedIn} userObj={userObj} />
      ) : (
        "로딩중..."
      )}
    </>
  );
}

export default App;
