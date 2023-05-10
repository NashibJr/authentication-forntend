import React, { useEffect, useRef, useState } from "react";
import { client } from "../app/app";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/users/usersSlice";
import Input from "./inputComponent";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  flexDirection: "column",
};

const Form = ({ form, link }) => {
  const ref2 = useRef(null);
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const properties =
    form === "Login"
      ? [
          {
            type: "text",
            name: "username",
            placeholder: "Username",
            value: state.username,
          },
          {
            type: "password",
            name: "password",
            placeholder: "Password",
            value: state.password,
          },
        ]
      : [
          {
            type: "text",
            name: "username",
            placeholder: "Username",
            value: state.username,
          },
          {
            type: "email",
            name: "email",
            placeholder: "Email",
            value: state.email,
          },
          {
            type: "password",
            name: "password",
            placeholder: "Password",
            value: state.password,
          },
        ];
  const canSubmit =
    form === "Login"
      ? state.username && state.password
      : state.username && state.email && state.password;

  const handleChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });

  const handleSignup = async () => {
    try {
      const data = await client.post("/createuser", {
        username: state.username,
        email: state.email,
        password: state.password,
      });

      dispatch(getUserData(data.data.user));

      const createAccount =
        data.data.user.message || "Account Successfully created";

      if (createAccount === "Account Successfully created") {
        navigate("/comfirmation");
      } else {
        navigate("/");
      }
      alert(createAccount);
      setState({ username: "", email: "", password: "" });
      return data;
    } catch (error) {
      alert(error.message);
      alert(error.response.data.message.map((element) => element));
    }
  };

  const handleLogin = async () => {
    try {
      const data = await client.post("/login", {
        username: state.username,
        password: state.password,
      });
      const canContinue = data.data.user.message || "";
      if (canContinue === "") {
        alert("Successfully logged in");
        navigate("/home");
        setState({ username: "", email: "", password: "" });
      } else {
        alert(canContinue);
      }
      dispatch(getUserData(data.data.user));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (link === "Login") {
      ref2.current.style.display = "none";
    }
  }, [form, link, state]);

  return (
    <div className="container mt-5 pt-5" style={styles}>
      <h1>{form}</h1>
      <form className="mt-4">
        {properties.map((property) => (
          <Input
            key={property.type}
            properties={property}
            handleChange={handleChange}
          />
        ))}
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
        Or
        <a href="/signup"> {link}</a>
      </p>
    </div>
  );
};

export default Form;
