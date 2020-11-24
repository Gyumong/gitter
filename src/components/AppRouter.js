import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
function AppRouter({ LoggedIn }) {
  return (
    <Router>
      <Switch>
        {LoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
