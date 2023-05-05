import React from "react";

const Row = ({ user, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
    </tr>
  );
};

export default Row;
