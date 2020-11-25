import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbserver";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 회원가입
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  };
  const ToggleAccount = () => setNewAccount((prev) => !prev);
  const onSocial = async (e) => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="email"
          name="password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
      </form>
      <span onClick={ToggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
      <button onClick={onSocial}>Goggle</button>
    </>
  );
}

export default Auth;
