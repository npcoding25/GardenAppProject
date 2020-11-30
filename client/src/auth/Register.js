import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
// import ErrorNotice from "../misc/ErrorNotice";

// import { Navbar, Nav, Button,Form } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:3001/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page" style={{marginTop: "180px", marginRight: "25%", marginLeft: "25%"}}>
      <h2>Register</h2>
      {/* {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )} */}
      <form className="form-group" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input  className="form-control"  aria-describedby="emailHelp"
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input  className="form-control"  aria-describedby="emailHelp"
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input  className="form-control"  aria-describedby="emailHelp"
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display name</label>
        <input  className="form-control" aria-describedby="emailHelp"
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" className="btn btn-success" style={{marginTop: "5px"}} />
      </form>
    </div>
  );
}