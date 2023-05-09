import React, { useEffect, useRef, useState } from "react";
import { client } from "../app/app";
import Input from "../components/inputComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Comfirmation = () => {
  const [code, setCode] = useState("");
  const [comment, setComment] = useState("");
  const ref_ = useRef();
  const state = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { token } = state;
  const properties = [
    {
      type: "number",
      name: "code",
      placeholder: "Enter comfirmation code",
      value: code,
    },
  ];
  const handleComfirmation = async (event) => {
    try {
      event.preventDefault();
      const confirmCode = { codeFromUser: +code };
      const data = await client.post("/comfirm", confirmCode, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      setComment(data.data.message);
      alert(comment);
      console.log(comment);
    } catch (error) {
      alert(error.response.data.message.map((element) => element));
    }
  };

  useEffect(() => {
    if (comment !== "Wrong code submitted!" && comment !== "") {
      ref_.current.style.display = "block";
    } else {
      ref_.current.style.display = "none";
    }
  }, [comment]);

  return (
    <div
      className="container mt-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p className="h2">
        Enter the 7 digit code sent to your email to activate your account
      </p>
      <div className="mt-5">
        {properties.map((property, index) => (
          <Input
            properties={property}
            handleChange={(event) => setCode(event.target.value)}
            key={index}
          />
        ))}
        <button
          type="button"
          className="btn btn-success mt-2 form-control"
          onClick={handleComfirmation}
        >
          comfirm
        </button>
      </div>
      <button
        type="button"
        className="btn btn-success mt-5"
        style={{ display: "none" }}
        ref={ref_}
        onClick={() => navigate("/")}
      >
        continue to the login page
      </button>
    </div>
  );
};

export default Comfirmation;
