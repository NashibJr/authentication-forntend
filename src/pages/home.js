import React, { useEffect, useRef, useState } from "react";
import { client } from "../app/app";
import { useSelector } from "react-redux";
import Row from "../components/row";

const Home = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const ref = useRef();
  const { token } = useSelector((state) => state.user.user);
  const getUsers = async () => {
    try {
      const data = await client.get("/getusers", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data.data.users);
    } catch (error) {
      setError(error.response.data.message);
      ref.current.style.display = "none";
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container mt-5">
      <h1 ref={ref}>Welcome user.</h1>
      <p style={{ color: "#f00" }} className="h2">
        {error}
      </p>
      <div className="table-responsive-sm mt-5">
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
    </div>
  );
};

export default Home;
