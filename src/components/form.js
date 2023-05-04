import React, { useEffect, useRef, useState } from "react";
import { client } from "../app/app";
import { useNavigate } from "react-router-dom";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  flexDirection: "column",
};

const Form = ({ form, link }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const canSubmit = state.username && state.email && state.password;

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleSignup = async () => {
    const data = await client.post("/createuser", {
      username: state.username,
      email: state.email,
      password: state.password,
    });

    const createAccount =
      data.data.student.message || "Account Successfully created";

    if (createAccount === "Account Successfully created") {
      navigate("/home");
    } else {
      navigate("/");
    }

    alert(createAccount);
    setState({ username: "", email: "", password: "" });
    return data;
  };

  const handleLogin = async () => {
    await null;
  };

  useEffect(() => {
    if (form === "Login") {
      ref.current.style.display = "none";
      state.email = "email";
    } else if (link === "Login") {
      ref2.current.style.display = "none";
    }
  }, [form, link]);

  return (
    <div className="container mt-5 pt-5" style={styles}>
      <h1>{form}</h1>
      <form className="mt-4">
        <p>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
        </p>
        <p>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            ref={ref}
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <button
            type="button"
            className="form-control bg-success"
            onClick={form === "Login" ? handleLogin : handleSignup}
            disabled={!canSubmit}
          >
            {form}
          </button>
        </p>
      </form>
      <p ref={ref2}>
        Or<a href="/signup"> {link}</a>
      </p>
    </div>
  );
};

export default Form;
