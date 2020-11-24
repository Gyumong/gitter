import React, { useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../fbserver";
function App() {
  const [LoggedIn, setLoggedIn] = useState(authService.currentUser);
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter LoggedIn={LoggedIn} />
    </>
  );
}

export default App;
