import React, { useEffect, useRef, useState } from "react";
import { client } from "../app/app";
import { useSelector } from "react-redux";
import Row from "../components/row";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const ref = useRef();
  const ref2 = useRef();
  const { token, username } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const data = await client.get("/getusers", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data.data.users);
      ref2.current.style.display = "none";
    } catch (error) {
      setError(error.response.data.message);
      ref.current.style.display = "none";
      ref2.current.style.display = "block";
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-11">
          <h1 ref={ref}>Heyy {username}.</h1>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => navigate("/")}
            ref={ref}
          >
            Logout
          </button>
        </div>
      </div>
      <p style={{ color: "#f00" }} className="h2">
        {error}
      </p>
      <div className="table-responsive-sm mt-5" ref={ref}>
        <p>These are some of our users</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <Row user={user} key={user._id} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
      <input
        type="button"
        value="Activate account"
        className="btn btn-success mt-5"
        ref={ref2}
        onClick={() => navigate("/comfirmation")}
      />
    </div>
  );
};

export default Home;
