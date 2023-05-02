import React, { useEffect, useRef, useState } from "react";

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
  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  useEffect(() => {
    if (form === "Login") {
      ref.current.style.display = "none";
    } else if (link === "Login") {
      ref2.current.style.display = "none";
    }
  }, [form]);

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
          <button type="button" className="form-control bg-success">
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
