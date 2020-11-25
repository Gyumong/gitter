import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbserver";

function Profile() {
  const history = useHistory();
  const Logout = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <div>Profile</div>
      <button onClick={Logout}>Logout</button>
    </>
  );
}

export default Profile;
